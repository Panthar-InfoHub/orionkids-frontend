"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  startQuestLevel,
  saveQuestCheckpoint,
  completeQuestLevel,
  QUEST_GAMES_METADATA,
} from "@/lib/api/quest";
import { fetchCurrentSession } from "@/lib/api/session";
import { GameTutorialGuide } from "@/components/game-tutorial/game-tutorial-guide";
import { TutorialReplayButton } from "@/components/game-tutorial/tutorial-replay-button";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface CardItem {
  id: number;
  symbol: string;
  name: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const COSMIC_SYMBOLS = [
  { symbol: "🪐", name: "Saturn", color: "#FFD028" },
  { symbol: "🚀", name: "Rocket", color: "#FF5B5B" },
  { symbol: "🌟", name: "Star", color: "#FFE066" },
  { symbol: "🛸", name: "UFO", color: "#65DCAA" },
  { symbol: "☄️", name: "Comet", color: "#FF8CC7" },
  { symbol: "🌙", name: "Moon", color: "#80E9FF" },
  { symbol: "🔭", name: "Telescope", color: "#B88CFF" },
  { symbol: "🛰️", name: "Satellite", color: "#FFA450" },
];

function generateCards(level: number): CardItem[] {
  const pairCount = level === 1 ? 4 : level === 2 ? 6 : 8;
  const selected = COSMIC_SYMBOLS.slice(0, pairCount);
  const deck: CardItem[] = [];

  selected.forEach((item, index) => {
    deck.push({
      id: index * 2,
      symbol: item.symbol,
      name: item.name,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
    deck.push({
      id: index * 2 + 1,
      symbol: item.symbol,
      name: item.name,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Truly deterministic seeded shuffle so SSR matches client hydration perfectly
  let seed = level * 104729 + 17;
  for (let i = deck.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const j = Math.floor(rnd * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

interface CardFlipArenaProps {
  level?: number;
  sessionId?: string;
}

export function CardFlipGameArena({ level = 1, sessionId }: CardFlipArenaProps) {
  const router = useRouter();
  const [cards, setCards] = useState<CardItem[]>(() => generateCards(level));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [lastMatchedPair, setLastMatchedPair] = useState<[number, number] | null>(null);
  const [showMatchToast, setShowMatchToast] = useState(false);
  const [showTiredModal, setShowTiredModal] = useState(false);
  const [hasPromptedTired, setHasPromptedTired] = useState(false);
  const [introPhase, setIntroPhase] = useState<"deal" | "reveal" | "ready">("deal");
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const totalPairs = level === 1 ? 4 : level === 2 ? 6 : 8;

 
  useEffect(() => {
    setShowTiredModal(false);
    setHasPromptedTired(false);
    setIntroPhase("deal");

    // Auto-prompt tutorial only for first-time level entry without interrupting resumed trials
    try {
      const seen = sessionStorage.getItem(`orion_tut_seen_card_flip_${level}`);
      if (!seen && matchedCount === 0 && moves === 0) {
        setIsTutorialOpen(true);
      }
    } catch {}

    // Fast deal animation lands (100ms), flip cards face-up to reveal
    const revealTimer = setTimeout(() => {
      setIntroPhase("reveal");
    }, 100);

    // Fast sneak peek (750ms), flip cards back face-down
    const flipBackTimer = setTimeout(() => {
      setIntroPhase("deal");
    }, 850);

    // Ready to play in 1050ms total (instead of 3650ms)
    const readyTimer = setTimeout(() => {
      setIntroPhase("ready");
      startTimeRef.current = Date.now();
    }, 1050);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(flipBackTimer);
      clearTimeout(readyTimer);
    };
  }, [level]);

  // Session bootstrap & stage validation
  useEffect(() => {
    let isCancelled = false;

    async function init() {
      try {
        const session = await fetchCurrentSession();
        if (isCancelled || !session) return;
        setActiveSessionId(session.id);

        // Security check: redirect if user tries to jump ahead
        const requestedIndex = (2 - 1) * 3 + level; // Game 2
        const authorizedIndex = (session.currentGame - 1) * 3 + session.currentLevel;

        if (session.status === "IN_PROGRESS" && requestedIndex > authorizedIndex) {
          const gameMap: Record<number, string> = {
            1: "stroop",
            2: "card-flip",
            3: "pattern",
            4: "odd-one-out",
            5: "rule-discovery",
            6: "story-sequencing",
          };
          const targetGame = gameMap[session.currentGame] || "stroop";
          router.replace(`/games/${targetGame}?level=${session.currentLevel}`);
        }
      } catch {
        // Fallback
      }
    }

    if (!activeSessionId) {
      init();
    }

    return () => {
      isCancelled = true;
    };
  }, [activeSessionId, level, router]);

  // Level start attempt
  useEffect(() => {
    if (!activeSessionId || activeAttemptId) return;
    let isCancelled = false;

    async function start() {
      const res = await startQuestLevel(activeSessionId!, "card-flip", level);
      if (isCancelled) return;

      if (res.success && res.data?.attemptId) {
        setActiveAttemptId(res.data.attemptId);
      } else if (!res.success && res.error) {
        setSubmissionStatus("error");
        setErrorMessage(res.error.message);
      }
    }

    start();
    return () => {
      isCancelled = true;
    };
  }, [activeSessionId, activeAttemptId, level]);

  const handleCardClick = (index: number) => {
    if (
      isLocked ||
      showTiredModal ||
      introPhase !== "ready" ||
      cards[index].isFlipped ||
      cards[index].isMatched ||
      submissionStatus === "error"
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const nextMoves = moves + 1;
      setMoves(nextMoves);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.symbol === secondCard.symbol) {
        // Match!
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
        setLastMatchedPair([firstIdx, secondIdx]);
        setShowMatchToast(true);
        setTimeout(() => {
          setShowMatchToast(false);
          setLastMatchedPair(null);
        }, 500);

        const newMatched = matchedCount + 1;
        setMatchedCount(newMatched);

        // Checkpoint save
        if (activeSessionId && activeAttemptId) {
          saveQuestCheckpoint(activeSessionId, activeAttemptId, {
            matchedPairs: newMatched,
            totalMoves: nextMoves,
            timestamp: new Date().toISOString(),
          });
        }

        // Completion check
        if (newMatched === totalPairs) {
          setIsLocked(true);
          setTimeout(() => {
            handleLevelFinished(nextMoves);
          }, 300);
        } else if (nextMoves > 4 && !hasPromptedTired) {
          // If moves > 4, prompt "Are you tired?"
          setHasPromptedTired(true);
          setTimeout(() => {
            setShowTiredModal(true);
          }, 350);
        }
      } else {
        // No match -> quick flip back after 450ms
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);

          // Check if moves > 4 and tired modal should trigger
          if (nextMoves > 4 && !hasPromptedTired) {
            setHasPromptedTired(true);
            setTimeout(() => {
              setShowTiredModal(true);
            }, 100);
          }
        }, 450);
      }
    }
  };

  const handleSkipToNextLevelFromTired = async () => {
    setShowTiredModal(false);
    setIsLocked(true);
    await handleLevelFinished(moves, true);
  };

  const handleContinuePlayingFromTired = () => {
    setShowTiredModal(false);
    setIsLocked(false);
  };

  const handleLevelFinished = async (finalMoves: number, isTiredSkip: boolean = false) => {
    setSubmissionStatus("submitting");
    const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
    // Accuracy based on moves vs optimal pairs
    const accuracy = isTiredSkip
      ? Math.max(50, Math.round((Math.max(1, matchedCount) / Math.max(totalPairs, finalMoves)) * 100))
      : Math.min(100, Math.round((totalPairs / Math.max(totalPairs, finalMoves)) * 100));

    const correctPairs = isTiredSkip ? Math.max(1, matchedCount) : totalPairs;

    if (activeSessionId) {
      const result = await completeQuestLevel(activeSessionId, {
        gameKey: "card-flip",
        levelNumber: level,
        totalTrials: totalPairs,
        correctTrials: correctPairs,
        accuracy,
        durationMs,
        averageReactionTimeMs: Math.round(durationMs / Math.max(1, finalMoves)),
        metrics: {
          totalMoves: finalMoves,
          optimalPairs: totalPairs,
          skippedViaTiredPrompt: isTiredSkip,
        },
        completedAt: new Date().toISOString(),
      });

      if (result.success) {
        setSubmissionStatus("success");
        let nextRoute =
          result.nextLevelRoute ||
          (level < 3 ? `/games/card-flip?level=${level + 1}` : "/games/pattern?level=1");
        if (activeSessionId && !nextRoute.includes("sessionId=")) {
          nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(activeSessionId)}`;
        }
        setNextLevelRoute(nextRoute);

        // Auto-advance to next level immediately without asking
        setTimeout(() => {
          router.push(nextRoute);
        }, 300);
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error?.message || "Failed to record card flip progress on the server.");
      }
    } else {
      // Offline fallback: auto-advance
      setSubmissionStatus("success");
      const nextRoute = level < 3 ? `/games/card-flip?level=${level + 1}` : "/games/pattern?level=1";
      setNextLevelRoute(nextRoute);
      setTimeout(() => {
        router.push(nextRoute);
      }, 300);
    }
  };

  const isComplete = matchedCount === totalPairs;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Level Tutorial Guide */}
      <GameTutorialGuide
        gameKey="card-flip"
        level={level}
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_card_flip_${level}`, "1"); } catch {}
        }}
        onComplete={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_card_flip_${level}`, "1"); } catch {}
        }}
      />

      <div className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-4 px-4 sm:px-8 rounded-[20px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px]">
        {isComplete || submissionStatus === "error" ? (
          /* Completion or Error Transition */
          <div className="py-4 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-12 h-12 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl mb-2 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2
              className="text-[22px] sm:text-[24px] font-extrabold text-white mb-1"
              style={{ fontFamily: JAKARTA }}
            >
              {submissionStatus === "error"
                ? "Level Verification Required"
                : `Card Flip Level ${level} Complete!`}
            </h2>
            <p
              className="text-[13px] text-[#E0D3F8] max-w-[440px] mb-4 text-center leading-relaxed"
              style={{ fontFamily: JAKARTA }}
            >
              {submissionStatus === "submitting"
                ? "Recording your cosmic memory score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Stellar memory! You matched all ${totalPairs} cosmic pairs in ${moves} moves.`}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              {submissionStatus === "success" && (
                <>
                  <div
                    data-testid="scored-badge"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#65DCAA] text-[#0A1D3D] font-extrabold text-xs sm:text-[13px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] select-none"
                    style={{ fontFamily: JAKARTA }}
                  >
                    <span className="text-sm">✓</span>
                    <span>Scored</span>
                  </div>

                  <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#0A1D3D] font-extrabold text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] animate-pulse">
                    <span className="text-sm">✨</span>
                    <span>
                      {level < 3 ? `Moving to Level ${level + 1}... 🚀` : "Moving to Next Game... 🚀"}
                    </span>
                  </div>
                </>
              )}

              {submissionStatus === "error" && (
                <button
                  type="button"
                  onClick={() => router.push(`/games/card-flip?level=1`)}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full font-extrabold text-[13px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer"
                  style={{ fontFamily: JAKARTA }}
                >
                  Go to Level 1 🎨
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Gameplay Arena */
          <div className="w-full flex flex-col items-center gap-3 sm:gap-3.5 relative">
            {/* Pairs & Moves Header */}
            <div className="flex items-center justify-between w-full max-w-[580px] px-2 text-white/90 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2.5">
                <span>Pairs: {matchedCount} / {totalPairs}</span>
                <TutorialReplayButton onReplayTutorial={() => setIsTutorialOpen(true)} />
              </div>
              <span>Moves: {moves}</span>
            </div>

            {/* Notification Banner: Initial Sneak Peek */}
            {introPhase === "reveal" && (
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFD028] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] font-extrabold text-xs sm:text-[13px] select-none animate-in fade-in duration-200">
                <span className="text-base animate-bounce">👀</span>
                <span>Memorize the cards! Flipping soon...</span>
              </div>
            )}

            <div
              className={`grid gap-2 sm:gap-3 w-full max-w-[580px] justify-center ${
                totalPairs === 4
                  ? "grid-cols-4"
                  : totalPairs === 6
                  ? "grid-cols-4"
                  : "grid-cols-4"
              }`}
            >
              {cards.map((card, idx) => {
                const isFlipped = introPhase === "reveal" || card.isFlipped || card.isMatched;
                const isRecentlyMatched =
                  lastMatchedPair !== null &&
                  (lastMatchedPair[0] === idx || lastMatchedPair[1] === idx);

                return (
                  <div
                    key={card.id}
                    className="perspective-1000 animate-card-deal"
                    style={{ animationDelay: `${idx * 45}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleCardClick(idx)}
                      disabled={isFlipped || isLocked || introPhase !== "ready"}
                      className={`relative w-[62px] h-[76px] sm:w-[82px] sm:h-[98px] rounded-[14px] transition-transform duration-500 preserve-3d cursor-pointer select-none ${
                        isFlipped
                          ? "[transform:rotateY(180deg)]"
                          : "hover:-translate-y-0.5 hover:shadow-lg"
                      } ${
                        isRecentlyMatched ? "animate-match-celebration" : ""
                      }`}
                    >
                      {/* Back Face (Unflipped - Dark Cosmic Star Pattern) */}
                      <div className="absolute inset-0 w-full h-full rounded-[14px] bg-[#230C4D] border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center backface-hidden">
                        <span className="text-xl sm:text-2xl text-[#FFD028] opacity-75 drop-shadow-[0_0_6px_rgba(255,208,40,0.5)]">
                          ★
                        </span>
                      </div>

                      {/* Front Face (Flipped - Bright Symbol & Colour with Clean UI Matching Border & Shadow) */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-[14px] border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center backface-hidden [transform:rotateY(180deg)]"
                        style={{ backgroundColor: card.color }}
                      >
                        <span className="text-2xl sm:text-3xl filter drop-shadow-md select-none">
                          {card.symbol}
                        </span>
                        {card.isMatched && (
                          <span className="absolute top-1 right-1 text-[10px]">✨</span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>


      {/* "Are you tired?" Modal when moves > 4 */}
      {showTiredModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tired-modal-title"
          className="fixed inset-0 z-50 bg-[#0A1D3D]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-[420px] rounded-[24px] bg-white border-3 border-[#0A1D3D] shadow-[6px_6px_0px_#0A1D3D] p-6 sm:p-7 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {/* Friendly Sleeping / Relaxed Mascot Icon */}
            <div className="w-16 h-16 rounded-full bg-[#FFE066] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-3">
              😴
            </div>

            <h3
              id="tired-modal-title"
              className="text-[22px] sm:text-[24px] font-extrabold text-[#0A1D3D] mb-1.5"
              style={{ fontFamily: JAKARTA }}
            >
              Are you tired?
            </h3>

            <p
              className="text-[13px] sm:text-[14px] text-[#526176] font-medium leading-relaxed max-w-[320px] mb-6"
              style={{ fontFamily: JAKARTA }}
            >
              You&apos;ve made {moves} moves! Would you like to move forward to the next level or keep playing?
            </p>

            <div className="w-full flex flex-col gap-2.5">
              {/* Option 1: Yes, move to next level */}
              <button
                type="button"
                onClick={handleSkipToNextLevelFromTired}
                className="w-full py-3 px-5 rounded-full font-extrabold text-[15px] bg-[#FFD028] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: JAKARTA }}
              >
                <span>Yes, next level</span>
                <span>🚀</span>
              </button>

              {/* Option 2: No, continue playing */}
              <button
                type="button"
                onClick={handleContinuePlayingFromTired}
                className="w-full py-2.5 px-5 rounded-full font-bold text-[14px] bg-[#F0F6FA] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: JAKARTA }}
              >
                <span>No, keep playing!</span>
                <span>💪</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
