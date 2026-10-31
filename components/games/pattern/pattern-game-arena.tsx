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

  // Flying Tile & Interaction States
  const arenaRef = useRef<HTMLDivElement>(null);
  const targetSlotRef = useRef<HTMLDivElement>(null);
  const [flyingTile, setFlyingTile] = useState<FlyingTileState | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [filledSlot, setFilledSlot] = useState<{ symbol: string; isCorrect: boolean } | null>(null);
  const [selectedOptionInfo, setSelectedOptionInfo] = useState<{ option: string; isCorrect: boolean } | null>(null);
  const [isCelebratingCorrect, setIsCelebratingCorrect] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; icon: string; isCorrect: boolean } | null>(null);

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

      // Once the tile lands on the question mark slot (420ms):
      setTimeout(async () => {
        setFlyingTile(null);
        setIsFlying(false);
        setFilledSlot({ symbol: chosen, isCorrect });
        setSelectedOptionInfo({ option: chosen, isCorrect });

        if (isCorrect) {
          setIsCelebratingCorrect(true);
          setFeedbackBanner({
            icon: "✅",
            text: "CORRECT! Super Logic! +1 🌟",
            isCorrect: true,
          });
        } else {
          setFeedbackBanner({
            icon: "❌",
            text: `Oops, Wrong! `,
            isCorrect: false,
          });
        }

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

        // Wait comfortable duration (2200ms on last pattern, 1250ms on interim patterns) so user clearly absorbs outcome
        const holdDuration = isLastTrial ? 2200 : 1250;
        setTimeout(async () => {
          // Slide out the completed pattern box to the left
          setIsSlidingOut(true);

          // After slide-out transition completes (350ms), advance to next pattern or complete
          setTimeout(async () => {
            if (!isLastTrial) {
              setFilledSlot(null);
              setIsCelebratingCorrect(false);
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
                } else {
                  setSubmissionStatus("error");
                  setErrorMessage(result.error?.message || "Failed to save pattern recognition results.");
                }
              } else {
                setSubmissionStatus("success");
                setNextLevelRoute(level < 3 ? `/games/pattern?level=${level + 1}` : "/games/odd-one-out?level=1");
              }
            }
          }, 350);
        }, holdDuration);
      }, 420);
    }
  };

  const currentTrial = trials[currentIdx];
  const isFinished = currentIdx >= trials.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        ref={arenaRef}
        className="relative z-10 w-full max-w-[840px] my-auto py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[460px] overflow-hidden"
      >
        {/* Flying Tile Animated Clone */}
        {flyingTile && (
          <div
            className="absolute z-50 pointer-events-none rounded-[16px] bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] flex items-center justify-center text-3xl sm:text-4xl transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              width: "60px",
              height: "60px",
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
          <div className="py-6 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-16 h-16 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-4 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-white mb-2" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error" ? "Level Verification Required" : `Pattern Recognition Level ${level} Complete!`}
            </h2>

            <p className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your pattern logic score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Super spatial reasoning! You correctly solved ${correctCount} out of ${trials.length} patterns.`}
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
                  : "Next Game: Odd One Out 🚀"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-7">
            {/* Header / Score */}
            <div className="flex items-center justify-between w-full max-w-[560px] text-white/90 text-sm font-bold">
              <span>Pattern {currentIdx + 1} of {trials.length}</span>
              <span>Score: {correctCount}</span>
            </div>

            {/* Notification / Feedback Banner (Clear Green or Red Alert) */}
            {feedbackBanner ? (
              <div
                className={`inline-flex items-center gap-2.5 px-6 py-2 rounded-full font-extrabold text-[15px] sm:text-[16px] shadow-lg select-none animate-celebration-pop border-2 border-[#0A1D3D] ${
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
              <div
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] font-extrabold text-[13px] sm:text-[14px] select-none"
                style={{ fontFamily: JAKARTA }}
              >
                <span className="text-base">🧩</span>
                <span>Find what comes next in the pattern!</span>
              </div>
            )}

            {/* Sequence Display with Carousel Slide Transitions & Snap Landing Slot */}
            <div
              key={currentIdx}
              className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-[#1E0942]/60 border border-white/10 ${
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
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] border-2 border-[#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl relative ${
                        filledSlot.isCorrect
                          ? "bg-[#10B981] text-white animate-bounce-pop shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                          : "bg-[#F43F5E] text-white animate-wobble shadow-[0_0_20px_rgba(244,63,94,0.8)]"
                      }`}
                    >
                      {filledSlot.symbol}
                      <span className="absolute -top-1.5 -right-1.5 text-xs">
                        {filledSlot.isCorrect ? "✅" : "❌"}
                      </span>
                    </div>
                  );
                }

                if (isTargetSlot) {
                  return (
                    <div
                      key={idx}
                      ref={targetSlotRef}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl bg-[#FFD028] text-[#0A1D3D] font-bold animate-shape-slide-right"
                      style={{ animationDelay: `${idx * 85}ms` }}
                    >
                      <span className="animate-bounce inline-block">❓</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl bg-white/10 text-white transition-transform animate-shape-slide-right ${
                      isCelebratingCorrect ? "animate-bounce" : ""
                    }`}
                    style={
                      isCelebratingCorrect
                        ? { animationDelay: `${idx * 80}ms` }
                        : { animationDelay: `${idx * 85}ms` }
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {/* Options Row with Clear Correct/Wrong Feedback Badges & Staggered Slide */}
            <div
              key={`options-${currentIdx}`}
              className={`flex flex-wrap items-center justify-center gap-4 ${
                isSlidingOut ? "animate-slide-out-left" : ""
              }`}
            >
              {currentTrial.options.map((opt, idx) => {
                const isChosenThis = selectedOptionInfo?.option === opt;
                const isChosenRight = isChosenThis && selectedOptionInfo.isCorrect;
                const isChosenWrong = isChosenThis && !selectedOptionInfo.isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isInteractionLocked}
                    onClick={(e) => handleSelectOption(opt, e)}
                    style={{ animationDelay: `${currentTrial.sequence.length * 85 + idx * 60}ms` }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[18px] border-2 flex items-center justify-center text-3xl sm:text-4xl transition-all cursor-pointer animate-shape-slide-right ${
                      isChosenRight
                        ? "bg-[#EEFBF3] border-[#10B981] shadow-[3px_3px_0px_#059669] scale-105 animate-bounce-pop text-[#065F46]"
                        : isChosenWrong
                        ? "bg-[#FFF1F2] border-[#F43F5E] shadow-[3px_3px_0px_#BE123C] scale-100 animate-wobble text-[#9F1239]"
                        : isInteractionLocked
                        ? "opacity-40 cursor-not-allowed bg-white border-[#0A1D3D]"
                        : "bg-white border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0A1D3D] hover:bg-[#FFF8D6] active:translate-y-0"
                    }`}
                  >
                    {opt}
                    {isChosenRight && (
                      <span className="absolute -top-2 -right-2 text-lg animate-in zoom-in-75">
                        ✅
                      </span>
                    )}
                    {isChosenWrong && (
                      <span className="absolute -top-2 -right-2 text-lg animate-in zoom-in-75">
                        ❌
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
