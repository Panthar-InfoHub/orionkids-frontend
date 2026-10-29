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

export function PatternGameArena({ level = 1 }: { level?: number }) {
  const router = useRouter();
  const trials = PATTERN_TRIALS[level] || PATTERN_TRIALS[1];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let isCancelled = false;
    async function init() {
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
  }, [level, router]);

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

  const handleSelectOption = async (chosen: string) => {
    if (submissionStatus !== "idle") return;
    const isCorrect = chosen === trials[currentIdx].answer;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        trialIdx: currentIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    if (currentIdx + 1 < trials.length) {
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
          setNextLevelRoute(
            result.nextLevelRoute ||
              (level < 3 ? `/games/pattern?level=${level + 1}` : "/games/odd-one-out?level=1")
          );
        } else {
          setSubmissionStatus("error");
          setErrorMessage(result.error?.message || "Failed to save pattern recognition results.");
        }
      } else {
        setSubmissionStatus("success");
        setNextLevelRoute(level < 3 ? `/games/pattern?level=${level + 1}` : "/games/odd-one-out?level=1");
      }
    }
  };

  const currentTrial = trials[currentIdx];
  const isFinished = currentIdx >= trials.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative z-10 w-full max-w-[840px] my-auto py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[460px]">
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
          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex items-center justify-between w-full max-w-[560px] text-white/90 text-sm font-bold">
              <span>Pattern {currentIdx + 1} of {trials.length}</span>
              <span>Score: {correctCount}</span>
            </div>

            {/* Sequence Display */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-[#1E0942]/60 border border-white/10">
              {currentTrial.sequence.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl ${
                    item === "❓" ? "bg-[#FFD028] animate-bounce text-[#0A1D3D] font-bold" : "bg-white/10 text-white"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {currentTrial.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-[18px] bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] hover:-translate-y-1 hover:bg-[#FFF8D6] transition-all flex items-center justify-center text-3xl sm:text-4xl cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
