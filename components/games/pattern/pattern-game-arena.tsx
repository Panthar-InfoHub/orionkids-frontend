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

interface PatternTrial {
  sequence: string[];
  options: string[];
  answer: string;
}

const PATTERN_TRIALS: Record<number, PatternTrial[]> = {
  1: [
    { sequence: ["⭐", "🔷", "⭐", "🔷", "❓"], options: ["⭐", "🔷", "🟢", "🔺"], answer: "⭐" },
    { sequence: ["🪐", "🚀", "🪐", "🚀", "❓"], options: ["🪐", "🚀", "🛸", "🌙"], answer: "🪐" },
    { sequence: ["🔴", "🔴", "🟡", "🔴", "🔴", "❓"], options: ["🔴", "🟡", "🔵", "🟢"], answer: "🟡" },
    { sequence: ["🛸", "🛸", "🛸", "⭐", "🛸", "🛸", "🛸", "❓"], options: ["🛸", "⭐", "🚀", "🪐"], answer: "⭐" },
  ],
  2: [
    { sequence: ["🔺", "🔷", "🟢", "🔺", "🔷", "❓"], options: ["🟢", "🔺", "🔷", "🟡"], answer: "🟢" },
    { sequence: ["🚀", "🌙", "⭐", "🚀", "🌙", "❓"], options: ["⭐", "🚀", "🪐", "☄️"], answer: "⭐" },
    { sequence: ["🪐", "🪐", "🛸", "🪐", "🪐", "❓"], options: ["🛸", "🪐", "🚀", "⭐"], answer: "🛸" },
    { sequence: ["🔵", "🔴", "🔵", "🔴", "🔵", "❓"], options: ["🔴", "🔵", "🟡", "🟢"], answer: "🔴" },
  ],
  3: [
    { sequence: ["⭐", "⭐", "🌙", "🌙", "⭐", "⭐", "❓"], options: ["🌙", "⭐", "🪐", "🚀"], answer: "🌙" },
    { sequence: ["🔺", "🔺", "🔷", "🔺", "🔺", "❓"], options: ["🔷", "🔺", "🟢", "🟡"], answer: "🔷" },
    { sequence: ["🪐", "🚀", "🛸", "🪐", "🚀", "❓"], options: ["🛸", "🪐", "🚀", "⭐"], answer: "🛸" },
    { sequence: ["☄️", "🌟", "☄️", "🌟", "☄️", "❓"], options: ["🌟", "☄️", "🌙", "🪐"], answer: "🌟" },
  ],
};

interface FlyingTileState {
  symbol: string;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  isCorrect: boolean;
}

export function PatternGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  const trials = PATTERN_TRIALS[level] || PATTERN_TRIALS[1];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Flying Tile & Interaction States
  const arenaRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const [flyingTile, setFlyingTile] = useState<FlyingTileState | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [filledSlot, setFilledSlot] = useState<{ symbol: string; isCorrect: boolean } | null>(null);
  const [selectedOptionInfo, setSelectedOptionInfo] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; icon: string } | null>(null);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(`orion_tut_seen_pattern_${level}`);
      if (!seen && currentIdx === 0) {
        setIsTutorialOpen(true);
      }
    } catch {}
  }, [level, currentIdx]);

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
        const reqIdx = (3 - 1) * 3 + level;
        const authIdx = (session.currentGame - 1) * 3 + session.currentLevel;
        if (session.status === "IN_PROGRESS" && reqIdx > authIdx) {
          router.replace(`/games/stroop?level=1`);
        }
      }
    }
    init();
    return () => { isCancelled = true; };
  }, [level, router, sessionId]);

  useEffect(() => {
    if (!activeSessionId || activeAttemptId) return;
    let isCancelled = false;
    async function start() {
      const res = await startQuestLevel(activeSessionId!, "pattern", level);
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

  const handleSelectOption = async (chosen: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (submissionStatus !== "idle" || isInteractionLocked) return;

    const buttonEl = e.currentTarget;
    const targetEl = targetSlotRef.current;
    const arenaEl = arenaRef.current;

    // Backend-authoritative and internal correctness calculation preserved
    const isCorrect = chosen === trials[currentIdx].answer;
    setIsInteractionLocked(true);

    if (buttonEl && targetEl && arenaEl) {
      const arenaRect = arenaEl.getBoundingClientRect();
      const bRect = buttonEl.getBoundingClientRect();
      const tRect = targetEl.getBoundingClientRect();

      const startX = bRect.left - arenaRect.left;
      const startY = bRect.top - arenaRect.top;
      const targetX = tRect.left - arenaRect.left;
      const targetY = tRect.top - arenaRect.top;

      setFlyingTile({
        symbol: chosen,
        startX,
        startY,
        targetX,
        targetY,
        isCorrect,
      });

      // Trigger flight animation in next render frame
      requestAnimationFrame(() => {
        setIsFlying(true);
      });

      // Once the tile lands on the question mark slot (180ms):
      setTimeout(async () => {
        setFlyingTile(null);
        setIsFlying(false);
        setFilledSlot({ symbol: chosen, isCorrect });
        setSelectedOptionInfo({ option: chosen, isCorrect });

        // Silent neutral interaction feedback: confirm registration without disclosing correctness
        setFeedbackBanner({
          icon: "✨",
          text: "Choice registered...",
        });

        const isLastTrial = currentIdx + 1 >= trials.length;
        const newCorrect = isCorrect ? correctCount + 1 : correctCount;
        setCorrectCount(newCorrect);

        if (activeSessionId && activeAttemptId) {
          saveQuestCheckpoint(activeSessionId, activeAttemptId, {
            trialIdx: currentIdx + 1,
            correctCount: newCorrect,
            timestamp: new Date().toISOString(),
          });
        }

        // Fast neutral transition hold (180ms)
        const holdDuration = 180;
        setTimeout(async () => {
          // Slide out the completed pattern box to the left
          setIsSlidingOut(true);

          // After slide-out transition completes (120ms), advance to next pattern or complete
          setTimeout(async () => {
            if (!isLastTrial) {
              setFilledSlot(null);
              setFeedbackBanner(null);
              setSelectedOptionInfo(null);
              setIsSlidingOut(false);
              setIsInteractionLocked(false);
              setCurrentIdx((i) => i + 1);
            } else {
              // Completed!
              setSubmissionStatus("submitting");
              const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
              const accuracy = Math.round((newCorrect / trials.length) * 100);

              if (activeSessionId) {
                const result = await completeQuestLevel(activeSessionId, {
                  gameKey: "pattern",
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
                    (level < 3 ? `/games/pattern?level=${level + 1}` : "/games/odd-one-out?level=1");
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
                  setErrorMessage(result.error?.message || "Failed to save pattern recognition results.");
                }
              } else {
                setSubmissionStatus("success");
                const nextRoute = level < 3 ? `/games/pattern?level=${level + 1}` : "/games/odd-one-out?level=1";
                setNextLevelRoute(nextRoute);
                setTimeout(() => {
                  router.push(nextRoute);
                }, 250);
              }
            }
          }, 120);
        }, holdDuration);
      }, 180);
    }
  };

  const currentTrial = trials[currentIdx];
  const isFinished = currentIdx >= trials.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Level Tutorial Guide */}
      <GameTutorialGuide
        gameKey="pattern"
        level={level}
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_pattern_${level}`, "1"); } catch {}
        }}
        onComplete={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem(`orion_tut_seen_pattern_${level}`, "1"); } catch {}
        }}
      />

      <div
        ref={arenaRef}
        className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-4 px-4 sm:px-8 rounded-[20px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px] overflow-hidden"
      >
        {/* Flying Tile Animated Clone */}
        {flyingTile && (
          <div
            className="absolute z-50 pointer-events-none rounded-[14px] bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: "52px",
              height: "52px",
              left: `${isFlying ? flyingTile.targetX : flyingTile.startX}px`,
              top: `${isFlying ? flyingTile.targetY : flyingTile.startY}px`,
              transform: isFlying ? "scale(1.08) rotate(4deg)" : "scale(1) rotate(0deg)",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.35))",
            }}
          >
            {flyingTile.symbol}
          </div>
        )}

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
              {submissionStatus === "error" ? "Level Verification Required" : `Pattern Recognition Level ${level} Complete!`}
            </h2>

            <p className="text-[13px] text-[#E0D3F8] max-w-[440px] mb-4 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your pattern logic score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Super spatial reasoning! You completed all ${trials.length} pattern challenges.`}
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
          <div className="w-full flex flex-col items-center gap-3 sm:gap-3.5">
            {/* Header / Replay Guide / Neutral Progress */}
            <div className="flex items-center justify-between w-full max-w-[580px] text-white/90 text-xs sm:text-sm font-bold">
              <span>Pattern {currentIdx + 1} of {trials.length}</span>
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
              <div
                className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D] font-extrabold text-xs sm:text-[13px] select-none"
                style={{ fontFamily: JAKARTA }}
              >
                <span className="text-base">🧩</span>
                <span>Find what comes next in the pattern!</span>
              </div>
            )}

            {/* Sequence Display with Carousel Slide Transitions & Snap Landing Slot */}
            <div
              key={currentIdx}
              className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 rounded-[16px] bg-[#1E0942]/60 border border-white/10 ${
                isSlidingOut ? "animate-slide-out-left" : ""
              }`}
            >
              {currentTrial.sequence.map((item, idx) => {
                const isTargetSlot = item === "❓";

                if (isTargetSlot && filledSlot) {
                  return (
                    <div
                      key={idx}
                      ref={targetSlotRef}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] border-2 border-[#0A1D3D] bg-white text-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-xl sm:text-2xl relative"
                    >
                      {filledSlot.symbol}
                    </div>
                  );
                }

                if (isTargetSlot) {
                  return (
                    <div
                      key={idx}
                      ref={targetSlotRef}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-xl sm:text-2xl bg-[#FFD028] text-[#0A1D3D] font-bold animate-shape-slide-right"
                      style={{ animationDelay: `${idx * 85}ms` }}
                    >
                      <span className="animate-bounce inline-block">❓</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-xl sm:text-2xl bg-white/10 text-white transition-transform animate-shape-slide-right"
                    style={{ animationDelay: `${idx * 85}ms` }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Options Row with Neutral Interaction Feedback */}
            <div
              key={`options-${currentIdx}`}
              className={`flex flex-wrap items-center justify-center gap-3 ${
                isSlidingOut ? "animate-slide-out-left" : ""
              }`}
            >
              {currentTrial.options.map((opt, idx) => {
                const isChosenThis = selectedOptionInfo?.option === opt;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isInteractionLocked}
                    onClick={(e) => handleSelectOption(opt, e)}
                    style={{ animationDelay: `${currentTrial.sequence.length * 85 + idx * 60}ms` }}
                    className={`relative w-13 h-13 sm:w-15 sm:h-15 rounded-[14px] border-2 flex items-center justify-center text-2xl sm:text-3xl transition-all cursor-pointer animate-shape-slide-right ${
                      isChosenThis
                        ? "bg-[#FFE066] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] scale-105 ring-2 ring-[#0A1D3D]/30 text-[#0A1D3D]"
                        : isInteractionLocked
                        ? "opacity-40 cursor-not-allowed bg-white border-[#0A1D3D]"
                        : "bg-white border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#0A1D3D] hover:bg-[#FFF8D6] active:translate-y-0"
                    }`}
                  >
                    {opt}
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
