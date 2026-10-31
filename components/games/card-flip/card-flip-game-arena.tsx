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
  const [introPhase, setIntroPhase] = useState<"deal" | "reveal" | "ready">("deal");

  const startTimeRef = useRef<number>(Date.now());
  const totalPairs = level === 1 ? 4 : level === 2 ? 6 : 8;

 
  useEffect(() => {
    setIntroPhase("deal");

    // After deal animation lands (600ms), flip cards face-up to reveal
    const revealTimer = setTimeout(() => {
      setIntroPhase("reveal");
    }, 600);

    // After 2.4s sneak peek, flip cards back face-down
    const flipBackTimer = setTimeout(() => {
      setIntroPhase("deal");
    }, 3000);

    // Once flip-back completes (600ms transition), mark as ready to play
    const readyTimer = setTimeout(() => {
      setIntroPhase("ready");
      startTimeRef.current = Date.now();
    }, 3650);

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
      setMoves((m) => m + 1);

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
        }, 1100);

        const newMatched = matchedCount + 1;
        setMatchedCount(newMatched);

        // Checkpoint save
        if (activeSessionId && activeAttemptId) {
          saveQuestCheckpoint(activeSessionId, activeAttemptId, {
            matchedPairs: newMatched,
            totalMoves: moves + 1,
            timestamp: new Date().toISOString(),
          });
        }

        // Completion check
        if (newMatched === totalPairs) {
          setIsLocked(true);
          setTimeout(() => {
            handleLevelFinished(moves + 1);
          }, 2000);
        }
      } else {
        // No match -> flip back after 900ms
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const handleLevelFinished = async (finalMoves: number) => {
    setSubmissionStatus("submitting");
    const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
    // Accuracy based on moves vs optimal pairs
    const accuracy = Math.min(100, Math.round((totalPairs / Math.max(totalPairs, finalMoves)) * 100));

    if (activeSessionId) {
      const result = await completeQuestLevel(activeSessionId, {
        gameKey: "card-flip",
        levelNumber: level,
        totalTrials: totalPairs,
        correctTrials: totalPairs,
        accuracy,
        durationMs,
        averageReactionTimeMs: Math.round(durationMs / Math.max(1, finalMoves)),
        metrics: {
          totalMoves: finalMoves,
          optimalPairs: totalPairs,
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
      } else {
        setSubmissionStatus("error");
        setErrorMessage(result.error?.message || "Failed to record card flip progress on the server.");
      }
    } else {
      // Offline fallback
      setSubmissionStatus("success");
      setNextLevelRoute(level < 3 ? `/games/card-flip?level=${level + 1}` : "/games/pattern?level=1");
    }
  };

  const isComplete = matchedCount === totalPairs;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative z-10 w-full max-w-[840px] my-auto py-6 sm:py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[460px]">
        {isComplete || submissionStatus === "error" ? (
          /* Completion or Error Modal */
          <div className="py-6 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-16 h-16 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-4 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2
              className="text-[26px] sm:text-[30px] font-extrabold text-white mb-2"
              style={{ fontFamily: JAKARTA }}
            >
              {submissionStatus === "error"
                ? "Level Verification Required"
                : `Card Flip Level ${level} Complete!`}
            </h2>
            <p
              className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 text-center leading-relaxed"
              style={{ fontFamily: JAKARTA }}
            >
              {submissionStatus === "submitting"
                ? "Recording your cosmic memory score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Stellar memory! You matched all ${totalPairs} cosmic pairs in ${moves} moves.`}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
              {submissionStatus === "success" && nextLevelRoute && (
                <button
                  type="button"
                  disabled={isNavigating}
                  onClick={() => {
                    if (isNavigating) return;
                    setIsNavigating(true);
                    router.push(nextLevelRoute);
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-extrabold text-[15px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer"
                  style={{ fontFamily: JAKARTA }}
                >
                  {isNavigating
                    ? "Launching Next Challenge... 🚀"
                    : level < 3
                    ? `Next Level (${level + 1} of 3) 🚀`
                    : "Next Game: Pattern Recognition 🚀"}
                </button>
              )}

              {submissionStatus === "error" && (
                <button
                  type="button"
                  onClick={() => router.push(`/games/card-flip?level=1`)}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-extrabold text-[15px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer"
                  style={{ fontFamily: JAKARTA }}
                >
                  Go to Level 1 🎨
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Gameplay Arena */
          <div className="w-full flex flex-col items-center gap-5 relative">
            {/* Pairs & Moves Header */}
            <div className="flex items-center justify-between w-full max-w-[560px] px-2 text-white/90 text-sm font-bold">
              <span>Pairs: {matchedCount} / {totalPairs}</span>
              <span>Moves: {moves}</span>
            </div>

            {/* Notification Banner: Initial Sneak Peek & Match Toast */}
            {introPhase === "reveal" ? (
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFD028] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] font-extrabold text-[13px] sm:text-[14px] select-none animate-in fade-in duration-200">
                <span className="text-lg animate-bounce">👀</span>
                <span>Memorize the cards! Flipping soon...</span>
              </div>
            ) : showMatchToast ? (
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FFD028] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] font-extrabold text-[14px] select-none animate-celebration-pop">
                <span className="text-xl animate-bounce">🌟</span>
                <span>Stellar Match! Cosmic Pair Found! 🎯</span>
              </div>
            ) : null}

            <div
              className={`grid gap-3 sm:gap-4 w-full max-w-[620px] justify-center ${
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
                    style={{ animationDelay: `${idx * 55}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleCardClick(idx)}
                      disabled={isFlipped || isLocked || introPhase !== "ready"}
                      className={`relative w-[70px] h-[85px] sm:w-[95px] sm:h-[115px] rounded-[16px] transition-transform duration-500 preserve-3d cursor-pointer select-none ${
                        isFlipped
                          ? "[transform:rotateY(180deg)]"
                          : "hover:-translate-y-1 hover:shadow-lg"
                      } ${
                        isRecentlyMatched ? "animate-match-celebration" : ""
                      }`}
                    >
                      {/* Back Face (Unflipped - Dark Cosmic Star Pattern) */}
                      <div className="absolute inset-0 w-full h-full rounded-[16px] bg-[#230C4D] border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] flex items-center justify-center backface-hidden">
                        <span className="text-2xl sm:text-3xl text-[#FFD028] opacity-75 drop-shadow-[0_0_6px_rgba(255,208,40,0.5)]">
                          ★
                        </span>
                      </div>

                      {/* Front Face (Flipped - Bright Symbol & Colour with Clean UI Matching Border & Shadow) */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-[16px] border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] flex items-center justify-center backface-hidden [transform:rotateY(180deg)]"
                        style={{ backgroundColor: card.color }}
                      >
                        <span className="text-3xl sm:text-4xl filter drop-shadow-md select-none">
                          {card.symbol}
                        </span>
                        {card.isMatched && (
                          <span className="absolute top-1 right-1.5 text-xs">✨</span>
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
    </div>
  );
}
