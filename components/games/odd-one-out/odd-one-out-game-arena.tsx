"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  startQuestLevel,
  saveQuestCheckpoint,
  completeQuestLevel,
} from "@/lib/api/quest";
import { fetchCurrentSession } from "@/lib/api/session";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface OddTrial {
  items: Array<{ symbol: string; label: string; isOdd: boolean }>;
  categoryHint: string;
}

const ODD_TRIALS: Record<number, OddTrial[]> = {
  1: [
    {
      items: [
        { symbol: "🪐", label: "Saturn", isOdd: false },
        { symbol: "🌍", label: "Earth", isOdd: false },
        { symbol: "🔴", label: "Mars", isOdd: false },
        { symbol: "🚀", label: "Rocket", isOdd: true },
      ],
      categoryHint: "Planets vs Vehicles",
    },
    {
      items: [
        { symbol: "⭐", label: "Star", isOdd: false },
        { symbol: "🌟", label: "Glowing Star", isOdd: false },
        { symbol: "✨", label: "Sparkles", isOdd: false },
        { symbol: "🛸", label: "UFO", isOdd: true },
      ],
      categoryHint: "Starlight vs Spacecraft",
    },
    {
      items: [
        { symbol: "🚀", label: "Spaceship", isOdd: false },
        { symbol: "🛰️", label: "Satellite", isOdd: false },
        { symbol: "🛸", label: "Flying Saucer", isOdd: false },
        { symbol: "🌙", label: "Crescent Moon", isOdd: true },
      ],
      categoryHint: "Machines vs Celestial Bodies",
    },
  ],
  2: [
    {
      items: [
        { symbol: "☀️", label: "Sun", isOdd: false },
        { symbol: "🔥", label: "Fireball", isOdd: false },
        { symbol: "⚡", label: "Lightning", isOdd: false },
        { symbol: "❄️", label: "Ice Crystal", isOdd: true },
      ],
      categoryHint: "Hot Energy vs Freezing Cold",
    },
    {
      items: [
        { symbol: "🪐", label: "Ringed Planet", isOdd: false },
        { symbol: "🌕", label: "Moon", isOdd: false },
        { symbol: "☄️", label: "Comet", isOdd: false },
        { symbol: "🚗", label: "Car", isOdd: true },
      ],
      categoryHint: "Space Objects vs Earth Vehicle",
    },
  ],
  3: [
    {
      items: [
        { symbol: "🔭", label: "Telescope", isOdd: false },
        { symbol: "📡", label: "Radar Dish", isOdd: false },
        { symbol: "🔬", label: "Spectrometer", isOdd: false },
        { symbol: "🎸", label: "Guitar", isOdd: true },
      ],
      categoryHint: "Astronomy Tools vs Musical Instrument",
    },
    {
      items: [
        { symbol: "👨‍🚀", label: "Astronaut", isOdd: false },
        { symbol: "👩‍🚀", label: "Cosmonaut", isOdd: false },
        { symbol: "👽", label: "Space Explorer", isOdd: false },
        { symbol: "🐠", label: "Fish", isOdd: true },
      ],
      categoryHint: "Space Inhabitants vs Sea Creature",
    },
  ],
};

export function OddOneOutGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  const trials = ODD_TRIALS[level] || ODD_TRIALS[1];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; icon: string; isCorrect: boolean } | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let isCancelled = false;
    async function init() {
      if (sessionId) {
        setActiveSessionId(sessionId);
        return;
      }
      const session = await fetchCurrentSession();
      if (!isCancelled && session?.id) {
        setActiveSessionId(session.id);
      }
    }
    init();
    return () => { isCancelled = true; };
  }, [level, sessionId]);

  useEffect(() => {
    if (!activeSessionId || activeAttemptId) return;
    let isCancelled = false;
    async function start() {
      const res = await startQuestLevel(activeSessionId!, "odd-one-out", level);
      if (!isCancelled && res.success && res.data?.attemptId) {
        setActiveAttemptId(res.data.attemptId);
      } else if (!isCancelled && !res.success && res.error) {
        setSubmissionStatus("error");
        setErrorMessage(res.error.message);
      }
    }
    start();
    return () => { isCancelled = true; };
  }, [activeSessionId, activeAttemptId, level]);

  const handleSelectItem = async (itemIdx: number, isOdd: boolean) => {
    if (submissionStatus !== "idle" || isLocked) return;
    setIsLocked(true);
    setSelectedIdx(itemIdx);

    const isLastTrial = currentIdx + 1 >= trials.length;

    if (isOdd) {
      setFeedbackBanner({
        icon: "🛸",
        text: "CORRECT! Odd item beamed away! +1 🌟",
        isCorrect: true,
      });
    } else {
      setFeedbackBanner({
        icon: "❌",
        text: "Ye toh group ka dost hai! Alag wala dhoondho 🔍",
        isCorrect: false,
      });
    }

    const newCorrect = isOdd ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        trialIdx: currentIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    // Hold duration: 2200ms on final challenge, 1350ms on interim challenges
    const holdDuration = isLastTrial ? 2200 : 1350;
    setTimeout(async () => {
      // Carousel Slide-Out to left before new challenge slides in from right
      setIsSlidingOut(true);

      setTimeout(async () => {
        setSelectedIdx(null);
        setFeedbackBanner(null);
        setIsLocked(false);
        setIsSlidingOut(false);

        if (!isLastTrial) {
          setCurrentIdx((i) => i + 1);
        } else {
          setSubmissionStatus("submitting");
          const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
          const accuracy = Math.round((newCorrect / trials.length) * 100);

          if (activeSessionId) {
            const result = await completeQuestLevel(activeSessionId, {
              gameKey: "odd-one-out",
              levelNumber: level,
              totalTrials: trials.length,
              correctTrials: newCorrect,
              accuracy,
              durationMs,
              completedAt: new Date().toISOString(),
            });

            if (result.success) {
              setSubmissionStatus("success");
              let nextRoute =
                result.nextLevelRoute ||
                (level < 3 ? `/games/odd-one-out?level=${level + 1}` : "/games/rule-discovery?level=1");
              if (activeSessionId && !nextRoute.includes("sessionId=")) {
                nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(activeSessionId)}`;
              }
              setNextLevelRoute(nextRoute);
            } else {
              setSubmissionStatus("error");
              setErrorMessage(result.error?.message || "Failed to record Odd One Out results.");
            }
          } else {
            setSubmissionStatus("success");
            setNextLevelRoute(level < 3 ? `/games/odd-one-out?level=${level + 1}` : "/games/rule-discovery?level=1");
          }
        }
      }, 350);
    }, holdDuration);
  };

  const currentTrial = trials[currentIdx];
  const isFinished = currentIdx >= trials.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative z-10 w-full max-w-[840px] my-auto py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[460px] overflow-hidden">
        {isFinished ? (
          <div className="py-6 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-16 h-16 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-4 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-white mb-2" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error" ? "Level Verification Required" : `Odd One Out Level ${level} Complete!`}
            </h2>

            <p className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your categorization score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Eagle eyes! You spotted the anomaly in ${correctCount} out of ${trials.length} challenges.`}
            </p>
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
                  : "Next Game: Rule Discovery 🚀"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-7">
            <div className="flex items-center justify-between w-full max-w-[560px] text-white/90 text-sm font-bold">
              <span>Challenge {currentIdx + 1} of {trials.length}</span>
              <span>Score: {correctCount}</span>
            </div>

            {/* Notification / Feedback Banner */}
            {feedbackBanner ? (
              <div
                className={`inline-flex items-center gap-2.5 px-6 py-2 rounded-full font-extrabold text-[14px] sm:text-[15px] shadow-lg select-none animate-celebration-pop border-2 border-[#0A1D3D] ${
                  feedbackBanner.isCorrect
                    ? "bg-[#10B981] text-white shadow-[0_0_18px_rgba(16,185,129,0.5)]"
                    : "bg-[#FFE4E6] text-[#9F1239] shadow-[0_0_18px_rgba(244,63,94,0.4)]"
                }`}
                style={{ fontFamily: JAKARTA }}
              >
                <span className="text-xl animate-bounce">{feedbackBanner.icon}</span>
                <span>{feedbackBanner.text}</span>
              </div>
            ) : (
              <p className="text-white text-base font-extrabold text-center">
                Tap the symbol that doesn&apos;t belong in this group!
              </p>
            )}

            {/* Items Grid with Carousel Slide Transitions & Alien Abduction Effect */}
            <div
              key={currentIdx}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[620px] justify-center ${
                isSlidingOut ? "animate-slide-out-left" : ""
              }`}
            >
              {currentTrial.items.map((item, idx) => {
                const isSelected = selectedIdx === idx;
                const isOddSelected = selectedIdx !== null && currentTrial.items[selectedIdx]?.isOdd;
                const isCorrectChosen = isSelected && item.isOdd;
                const isWrongChosen = isSelected && !item.isOdd;
                const isOtherWhileCorrect = isOddSelected && !isSelected;
                const showOddReveal = selectedIdx !== null && !isOddSelected && item.isOdd;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleSelectItem(idx, item.isOdd)}
                    style={{ animationDelay: `${idx * 75}ms` }}
                    className={`relative h-32 rounded-[20px] border-2 transition-all flex flex-col items-center justify-center gap-2 p-3 animate-shape-slide-right select-none ${
                      isCorrectChosen
                        ? "animate-alien-beam-up bg-[#EEFBF3] border-[#10B981] text-[#065F46] z-20"
                        : isWrongChosen
                        ? "animate-wobble bg-[#FFF1F2] border-[#F43F5E] shadow-[3px_3px_0px_#BE123C] text-[#9F1239]"
                        : isOtherWhileCorrect
                        ? "opacity-35 scale-95 bg-white/70 border-[#0A1D3D]"
                        : showOddReveal
                        ? "bg-[#FFF8D6] border-[#FFD028] shadow-[3px_3px_0px_#D97706] scale-102"
                        : isLocked
                        ? "opacity-50 cursor-not-allowed bg-white border-[#0A1D3D]"
                        : "bg-white border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] hover:-translate-y-1.5 hover:rotate-1 hover:bg-[#FFF8D6] active:scale-95 cursor-pointer"
                    }`}
                  >
                    <span className={`text-4xl transition-transform ${isCorrectChosen ? "animate-pulse" : ""}`}>
                      {item.symbol}
                    </span>
                    <span className="text-xs font-bold text-[#0A1D3D]">{item.label}</span>

                    {/* Alien Beam-Up Overlays */}
                    {isCorrectChosen && (
                      <>
                        <span className="absolute -top-3.5 -right-2 text-2xl animate-bounce">🛸</span>
                        <span className="absolute -bottom-2 -left-2 text-base animate-pulse">✨</span>
                        <span className="absolute inset-0 rounded-[20px] bg-[#10B981]/15 animate-pulse pointer-events-none" />
                      </>
                    )}

                    {/* Wrong Jelly Wobble Overlay */}
                    {isWrongChosen && (
                      <span className="absolute -top-2 -right-2 text-xl animate-in zoom-in-75">❌</span>
                    )}

                    {/* Gentle Clue on Wrong */}
                    {showOddReveal && (
                      <span className="absolute -top-2 -right-2 text-xs bg-[#FFD028] text-[#0A1D3D] px-2 py-0.5 rounded-full font-black border border-[#0A1D3D] shadow-sm animate-bounce">
                        Odd One! 💡
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
