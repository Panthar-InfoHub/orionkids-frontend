"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  startQuestLevel,
  saveQuestCheckpoint,
  completeQuestLevel,
} from "@/lib/api/quest";
import { fetchCurrentSession } from "@/lib/api/session";
import { GameTutorialGuide } from "@/components/game-tutorial/game-tutorial-guide";
import { TutorialReplayButton } from "@/components/game-tutorial/tutorial-replay-button";

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
        { symbol: "🚀", label: "Rocket", isOdd: true },
        { symbol: "🌍", label: "Earth", isOdd: false },
        { symbol: "🔴", label: "Mars", isOdd: false },
      ],
      categoryHint: "Planets vs Vehicles",
    },
    {
      items: [
        { symbol: "⭐", label: "Star", isOdd: false },
        { symbol: "🌟", label: "Glowing Star", isOdd: false },
        { symbol: "🛸", label: "UFO", isOdd: true },
        { symbol: "✨", label: "Sparkles", isOdd: false },
      ],
      categoryHint: "Starlight vs Spacecraft",
    },
    {
      items: [
        { symbol: "🌙", label: "Crescent Moon", isOdd: true },
        { symbol: "🚀", label: "Spaceship", isOdd: false },
        { symbol: "🛰️", label: "Satellite", isOdd: false },
        { symbol: "🛸", label: "Flying Saucer", isOdd: false },
      ],
      categoryHint: "Machines vs Celestial Bodies",
    },
  ],
  2: [
    {
      items: [
        { symbol: "☀️", label: "Sun", isOdd: false },
        { symbol: "❄️", label: "Ice Crystal", isOdd: true },
        { symbol: "🔥", label: "Fireball", isOdd: false },
        { symbol: "⚡", label: "Lightning", isOdd: false },
      ],
      categoryHint: "Hot Energy vs Freezing Cold",
    },
    {
      items: [
        { symbol: "🪐", label: "Ringed Planet", isOdd: false },
        { symbol: "🌕", label: "Moon", isOdd: false },
        { symbol: "🚗", label: "Car", isOdd: true },
        { symbol: "☄️", label: "Comet", isOdd: false },
      ],
      categoryHint: "Space Objects vs Earth Vehicle",
    },
  ],
  3: [
    {
      items: [
        { symbol: "🎸", label: "Guitar", isOdd: true },
        { symbol: "🔭", label: "Telescope", isOdd: false },
        { symbol: "📡", label: "Radar Dish", isOdd: false },
        { symbol: "🔬", label: "Spectrometer", isOdd: false },
      ],
      categoryHint: "Astronomy Tools vs Musical Instrument",
    },
    {
      items: [
        { symbol: "👨‍🚀", label: "Astronaut", isOdd: false },
        { symbol: "👩‍🚀", label: "Cosmonaut", isOdd: false },
        { symbol: "🐠", label: "Fish", isOdd: true },
        { symbol: "👽", label: "Space Explorer", isOdd: false },
      ],
      categoryHint: "Space Inhabitants vs Sea Creature",
    },
  ],
};

function seededShuffleCards<T>(items: T[], seedNumber: number): T[] {
  const result = [...items];
  let seed = seedNumber * 104729 + 17;
  for (let i = result.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const j = Math.floor(rnd * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleCards<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

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
  // Deterministic seeded shuffle for SSR and initial hydration to eliminate React hydration mismatch
  const [currentItems, setCurrentItems] = useState(() =>
    seededShuffleCards(trials[0]?.items || [], level * 100)
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; icon: string } | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(`orion_tut_seen_odd_one_out_${level}`);
      if (!seen && currentIdx === 0) {
        setIsTutorialOpen(true);
      }
    } catch {}
  }, [level, currentIdx]);

  // Shuffle cards whenever the trial index, level, or trials list changes
  useEffect(() => {
    if (trials[currentIdx]?.items) {
      setCurrentItems(shuffleCards(trials[currentIdx].items));
    }
  }, [currentIdx, level, trials]);

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

    // Silent neutral interaction feedback: acknowledges tap without disclosing correctness
    setFeedbackBanner({
      icon: "✨",
      text: "Choice registered...",
    });

    // Backend-authoritative and internal correctness calculation preserved
    const newCorrect = isOdd ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        trialIdx: currentIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    // Smooth fast neutral transition delay (180ms)
    const holdDuration = 180;
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

              // Auto-advance immediately without asking
              setTimeout(() => {
                router.push(nextRoute);
              }, 250);
            } else {
              setSubmissionStatus("error");
              setErrorMessage(result.error?.message || "Failed to record Odd One Out results.");
            }
          } else {
            setSubmissionStatus("success");
            const nextRoute = level < 3 ? `/games/odd-one-out?level=${level + 1}` : "/games/rule-discovery?level=1";
            setNextLevelRoute(nextRoute);
            setTimeout(() => {
              router.push(nextRoute);
            }, 250);
          }
        }
      }, 120);
    }, holdDuration);
  };

  const currentTrial = trials[currentIdx];
  const isFinished = currentIdx >= trials.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Level Tutorial Guide */}
      <GameTutorialGuide
        gameKey="odd-one-out"
        level={level}
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_odd_one_out_${level}`, "1"); } catch {}
        }}
        onComplete={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_odd_one_out_${level}`, "1"); } catch {}
        }}
      />

      <div className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-4 px-4 sm:px-8 rounded-[20px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px] overflow-hidden">
        {isFinished ? (
          <div className="py-4 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-12 h-12 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl mb-2 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2 className="text-[22px] sm:text-[24px] font-extrabold text-white mb-1" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error" ? "Level Verification Required" : `Odd One Out Level ${level} Complete!`}
            </h2>

            <p className="text-[13px] text-[#E0D3F8] max-w-[440px] mb-4 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your categorization score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Eagle eyes! You analyzed all ${trials.length} challenges.`}
            </p>
            {submissionStatus === "success" && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
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
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-between w-full max-w-[580px] text-white/90 text-xs sm:text-sm font-bold">
              <span>Challenge {currentIdx + 1} of {trials.length}</span>
              <TutorialReplayButton onClick={() => setIsTutorialOpen(true)} />
            </div>

            {/* Notification / Neutral Feedback Banner */}
            {feedbackBanner ? (
              <div
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-extrabold text-[13px] sm:text-[14px] shadow-lg select-none bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]"
                style={{ fontFamily: JAKARTA }}
              >
                <span className="text-lg">{feedbackBanner.icon}</span>
                <span>{feedbackBanner.text}</span>
              </div>
            ) : (
              <p className="text-white text-xs sm:text-sm font-extrabold text-center">
                Tap the symbol that doesn&apos;t belong in this group!
              </p>
            )}

            {/* Items Grid with Carousel Slide Transitions & Neutral Selection Highlight */}
            <div
              key={currentIdx}
              className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-[620px] justify-center ${
                isSlidingOut ? "animate-slide-out-left" : ""
              }`}
            >
              {currentItems.map((item, idx) => {
                const isSelected = selectedIdx === idx;

                return (
                  <button
                    key={`${currentIdx}-${idx}-${item.label}`}
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleSelectItem(idx, item.isOdd)}
                    style={{ animationDelay: `${idx * 75}ms` }}
                    className={`relative h-24 sm:h-28 rounded-[16px] border-2 transition-all flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 animate-shape-slide-right select-none ${
                      isSelected
                        ? "bg-[#FFE066] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] scale-102 ring-2 ring-[#0A1D3D]/30"
                        : isLocked
                        ? "opacity-50 cursor-not-allowed bg-white border-[#0A1D3D]"
                        : "bg-white border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-1 hover:bg-[#FFF8D6] active:scale-95 cursor-pointer"
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-[#0A1D3D]">{item.label}</span>
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
