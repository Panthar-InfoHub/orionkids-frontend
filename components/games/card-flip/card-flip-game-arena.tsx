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

  // Deterministic-ish shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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

  const startTimeRef = useRef<number>(Date.now());
  const totalPairs = level === 1 ? 4 : level === 2 ? 6 : 8;

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
    if (isLocked || cards[index].isFlipped || cards[index].isMatched || submissionStatus === "error") {
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
          handleLevelFinished(moves + 1);
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
          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex items-center justify-between w-full max-w-[560px] px-2 text-white/90 text-sm font-bold">
              <span>Pairs: {matchedCount} / {totalPairs}</span>
              <span>Moves: {moves}</span>
            </div>

            <div
              className={`grid gap-3 sm:gap-4 w-full max-w-[620px] justify-center ${
                totalPairs === 4
                  ? "grid-cols-4"
                  : totalPairs === 6
                  ? "grid-cols-4"
                  : "grid-cols-4"
              }`}
            >
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleCardClick(idx)}
                  className={`w-[70px] h-[85px] sm:w-[95px] sm:h-[115px] rounded-[16px] border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] flex items-center justify-center transition-all duration-300 transform cursor-pointer ${
                    card.isFlipped || card.isMatched
                      ? "bg-white scale-100"
                      : "bg-[#230C4D] hover:-translate-y-1 hover:bg-[#2C1060] scale-95"
                  }`}
                  style={{
                    backgroundColor: card.isFlipped || card.isMatched ? card.color : undefined,
                  }}
                >
                  {card.isFlipped || card.isMatched ? (
                    <span className="text-3xl sm:text-4xl filter drop-shadow-md animate-in zoom-in-75 duration-200">
                      {card.symbol}
                    </span>
                  ) : (
                    <span className="text-2xl sm:text-3xl text-[#FFD028] opacity-70">
                      ★
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
