"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  StroopTrial,
  StroopTrialRecord,
  submitStroopLevelResults,
} from "@/lib/api/stroop";

interface StroopGameArenaProps {
  trials: StroopTrial[];
  level?: number;
  initialTrialIndex?: number;
  initialRecords?: StroopTrialRecord[];
  sessionId?: string;
  attemptId?: string;
  onLevelComplete?: (records: StroopTrialRecord[]) => void;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function StroopGameArena({
  trials,
  level = 1,
  initialTrialIndex,
  initialRecords,
  sessionId,
  attemptId,
  onLevelComplete,
}: StroopGameArenaProps) {
  const router = useRouter();
  // Start on initialTrialIndex if provided, or index 0 for level 1
  const [currentTrialIdx, setCurrentTrialIdx] = useState(
    initialTrialIndex !== undefined ? initialTrialIndex : 0
  );
  const [records, setRecords] = useState<StroopTrialRecord[]>(
    initialRecords || []
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    sessionId || null
  );
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(
    attemptId || null
  );
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const isSubmitting = submissionStatus === "submitting";

  const trialStartTimeRef = useRef<number>(0);
  const currentTrial = trials[currentTrialIdx] || trials[0];
  const totalTrials = trials.length;

  // Reset arena state whenever level changes or re-initialized
  useEffect(() => {
    setCurrentTrialIdx(initialTrialIndex !== undefined ? initialTrialIndex : 0);
    setRecords(initialRecords || []);
    setSelectedOption(null);
    setIsLevelFinished(false);
    setSubmissionStatus("idle");
    setErrorMessage(null);
    setNextLevelRoute(null);
    setIsNavigating(false);
  }, [level, initialTrialIndex, initialRecords]);

  // Synchronize or resolve active quest session ID
  useEffect(() => {
    let isCancelled = false;

    if (sessionId) {
      setActiveSessionId(sessionId);
      return;
    }

    async function initSession() {
      try {
        const { fetchCurrentSession } = await import("@/lib/api/session");
        const session = await fetchCurrentSession();
        if (!isCancelled && session?.id) {
          setActiveSessionId(session.id);

          // Check if session has already completed this level or prior level
          const completedNums = new Set(
            (session.completedLevels || []).map(
              (l: { levelNumber?: number }) => l.levelNumber
            )
          );
          const isPriorLevelCompleted =
            level === 1 || completedNums.has(level - 1);

          // Progression Security: Only redirect if user attempted to jump ahead to a locked stage
          // without having completed prior stages
          if (
            session.status === "IN_PROGRESS" &&
            session.currentGame === 1 &&
            level > session.currentLevel &&
            !isPriorLevelCompleted
          ) {
            router.replace(`/games/stroop?level=${session.currentLevel}`);
          }
        }
      } catch {
        // Fall back gracefully; submission will attempt resolution via cookie
      }
    }

    initSession();

    return () => {
      isCancelled = true;
    };
  }, [sessionId, level, router]);

  // Initialize trial timer when a new trial appears
  useEffect(() => {
    trialStartTimeRef.current = performance.now();
    setSelectedOption(null);
  }, [currentTrialIdx]);

  const submitResults = useCallback(
    async (trialsToSubmit: StroopTrialRecord[]) => {
      if (submissionStatus === "submitting") return;

      setSubmissionStatus("submitting");
      setErrorMessage(null);
      try {
        const correctCount = trialsToSubmit.filter((r) => r.isCorrect).length;
        const avgRT =
          trialsToSubmit.length > 0
            ? Math.round(
                trialsToSubmit.reduce((acc, cur) => acc + cur.reactionTimeMs, 0) /
                  trialsToSubmit.length
              )
            : 0;
        const totalDuration = trialsToSubmit.reduce(
          (acc, cur) => acc + (cur.reactionTimeMs || 0),
          0
        );

        const result = await submitStroopLevelResults({
          gameId: "stroop",
          sessionId: activeSessionId || undefined,
          level,
          totalTrials,
          correctTrials: correctCount,
          accuracy: Math.round((correctCount / totalTrials) * 100),
          durationMs: totalDuration,
          averageReactionTimeMs: avgRT,
          trials: trialsToSubmit,
          completedAt: new Date().toISOString(),
        });

        if (result.success) {
          // Authoritative forward destination resolution: never route to completed level
          const resolvedNextRoute =
            result.nextLevelRoute &&
            result.nextLevelRoute !== `/games/stroop?level=${level}`
              ? result.nextLevelRoute
              : level < 3
              ? `/games/stroop?level=${level + 1}`
              : "/games/card-flip?level=1";

          setSubmissionStatus("success");
          setNextLevelRoute(resolvedNextRoute);
          if (result.sessionId) {
            setActiveSessionId(result.sessionId);
          }
          if (onLevelComplete) {
            onLevelComplete(trialsToSubmit);
          }
        } else {
          setSubmissionStatus("error");
          setErrorMessage(
            result.message ||
              "Failed to record level progress on the server. Please try again."
          );
        }
      } catch (err: unknown) {
        console.error("Error submitting level results:", err);
        setSubmissionStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while saving your score."
        );
      }
    },
    [activeSessionId, level, onLevelComplete, submissionStatus, totalTrials]
  );

  // Initialize level attempt in the backend to enable checkpointing
  useEffect(() => {
    if (!activeSessionId || activeAttemptId || isLevelFinished) return;
    let isCancelled = false;

    async function initAttempt() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;
        const res = await fetch(
          `${apiUrl}/api/quest/sessions/${activeSessionId}/levels/start`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameKey: "stroop", levelNumber: level }),
          }
        );
        if (res.ok && !isCancelled) {
          const data = await res.json();
          if (data?.data?.attemptId) {
            setActiveAttemptId(data.data.attemptId);
          }
        } else if (res.status === 403 && !isCancelled) {
          const errData = await res.json().catch(() => null);
          const msg =
            errData?.error?.message ||
            `Level progression violation: Game 1 Level ${level} is locked.`;
          setSubmissionStatus("error");
          setErrorMessage(msg);
          setIsLevelFinished(true);
        }
      } catch {
        // Non-blocking; checkpointing is best-effort and final submission is authoritative
      }
    }

    initAttempt();
    return () => {
      isCancelled = true;
    };
  }, [activeSessionId, activeAttemptId, isLevelFinished, level]);

  const handleSelectAnswer = useCallback(
    async (chosenOption: string) => {
      if (selectedOption !== null || isLevelFinished) return;

      const reactionTimeMs = Math.max(1, Math.round(performance.now() - trialStartTimeRef.current));
      const isCorrect = chosenOption.toLowerCase() === currentTrial.inkName.toLowerCase();

      setSelectedOption(chosenOption);

      const newRecord: StroopTrialRecord = {
        trialId: currentTrial.id,
        word: currentTrial.word,
        inkName: currentTrial.inkName,
        selectedAnswer: chosenOption,
        isCorrect,
        reactionTimeMs,
        timestamp: new Date().toISOString(),
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);

      // Advance after a brief micro-transition for natural gameplay feedback
      setTimeout(async () => {
        if (currentTrialIdx < totalTrials - 1) {
          const nextIdx = currentTrialIdx + 1;
          setCurrentTrialIdx(nextIdx);

          // Save in-game checkpoint if active session and attempt exist
          if (activeSessionId && activeAttemptId) {
            import("@/lib/api/session").then(({ saveAttemptCheckpoint }) => {
              saveAttemptCheckpoint(activeSessionId, activeAttemptId, {
                currentTrialIdx: nextIdx,
                records: updatedRecords,
                timestamp: new Date().toISOString(),
              }).catch(() => {});
            });
          }
        } else {
          // Level finished
          setIsLevelFinished(true);
          await submitResults(updatedRecords);
        }
      }, 180);
    },
    [
      activeAttemptId,
      activeSessionId,
      currentTrial,
      currentTrialIdx,
      isLevelFinished,
      records,
      selectedOption,
      submitResults,
      totalTrials,
    ]
  );

  // Keyboard accessibility: 1, 2, 3 or Left, Down, Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLevelFinished || selectedOption !== null) return;
      if (e.key === "1" || e.key === "ArrowLeft") {
        if (currentTrial.options[0]) handleSelectAnswer(currentTrial.options[0].label);
      } else if (e.key === "2" || e.key === "ArrowDown") {
        if (currentTrial.options[1]) handleSelectAnswer(currentTrial.options[1].label);
      } else if (e.key === "3" || e.key === "ArrowRight") {
        if (currentTrial.options[2]) handleSelectAnswer(currentTrial.options[2].label);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTrial, handleSelectAnswer, isLevelFinished, selectedOption]);

  const badgeText =
    level === 1
      ? "🎨 2 Colours · Matching Words"
      : level === 2
      ? "🎨 3 Colours · Matching & Mismatched Words"
      : "⚡ 3 Colours · Speed Challenge";

  return (
    <div className="w-full rounded-[28px] overflow-hidden relative border-2 border-[#0A1D3D] shadow-2xl min-h-[540px] p-5 sm:p-8 md:p-10 flex flex-col justify-between items-center text-center select-none bg-[#1C093D]">
      {/* 1. Cosmic Background Atmosphere & Planets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Galaxy Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, #43178C 0%, #200B4B 45%, #0F0326 100%)",
          }}
        />

        {/* Planet Left (Pink/Purple with Rings) */}
        <div className="absolute -left-12 top-6 w-48 h-48 rounded-full opacity-90 blur-[0.3px]">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="planetPink" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FF77C6" />
                <stop offset="60%" stopColor="#C9358E" />
                <stop offset="100%" stopColor="#6C1450" />
              </radialGradient>
            </defs>
            <circle cx="80" cy="80" r="70" fill="url(#planetPink)" />
            {/* Crater shadows */}
            <circle cx="65" cy="55" r="14" fill="#6C1450" opacity="0.4" />
            <circle cx="105" cy="95" r="18" fill="#6C1450" opacity="0.4" />
            {/* Planet ring */}
            <ellipse
              cx="80"
              cy="80"
              rx="92"
              ry="20"
              stroke="#FFA8DC"
              strokeWidth="4.5"
              opacity="0.75"
              transform="rotate(-25 80 80)"
            />
          </svg>
        </div>

        {/* Planet Right (Purple/Cyan Cosmic Sphere with ring) */}
        <div className="absolute -right-12 top-4 w-52 h-52 rounded-full opacity-85 blur-[0.3px]">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <defs>
              <radialGradient id="planetPurple" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#B388FF" />
                <stop offset="55%" stopColor="#6D3BD8" />
                <stop offset="100%" stopColor="#321475" />
              </radialGradient>
            </defs>
            <circle cx="80" cy="80" r="70" fill="url(#planetPurple)" />
            {/* Crater shadows */}
            <circle cx="95" cy="65" r="15" fill="#240D55" opacity="0.5" />
            <circle cx="60" cy="100" r="12" fill="#240D55" opacity="0.4" />
            <ellipse
              cx="80"
              cy="80"
              rx="90"
              ry="18"
              stroke="#D1B8FF"
              strokeWidth="4"
              opacity="0.65"
              transform="rotate(22 80 80)"
            />
          </svg>
        </div>

        {/* Floating Twinkling Stars (✦, ★) */}
        <span className="absolute left-[20%] top-[15%] text-[#FFDE59] text-2xl opacity-90 animate-pulse">
          ✦
        </span>
        <span className="absolute left-[31%] top-[38%] text-[#FF85C0] text-sm opacity-80">
          ★
        </span>
        <span className="absolute right-[21%] top-[14%] text-[#FFDE59] text-2xl opacity-95 animate-pulse">
          ✦
        </span>
        <span className="absolute right-[32%] top-[42%] text-[#A8FFB2] text-xs opacity-70">
          ✦
        </span>
        <span className="absolute left-[48%] top-[6%] text-[#FFFFFF] text-xs opacity-75">
          ★
        </span>
        <span className="absolute right-[46%] top-[10%] text-[#FFD028] text-sm opacity-85">
          ★
        </span>
        <span className="absolute left-[12%] top-[60%] text-[#FFFFFF] text-xs opacity-60">
          ✦
        </span>
        <span className="absolute right-[14%] top-[62%] text-[#FFDE59] text-sm opacity-70">
          ✦
        </span>

        {/* Bottom Lunar Surface & Soft Clouds */}
        <div className="absolute bottom-0 inset-x-0 h-32 flex items-end">
          <svg
            viewBox="0 0 1000 160"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full opacity-95"
          >
            <defs>
              <linearGradient id="lunarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4D2799" />
                <stop offset="60%" stopColor="#311466" />
                <stop offset="100%" stopColor="#1E0A40" />
              </linearGradient>
            </defs>
            {/* Crater surface curve */}
            <path
              d="M0,80 Q250,20 500,70 T1000,60 L1000,160 L0,160 Z"
              fill="url(#lunarGrad)"
            />
            {/* Moon craters */}
            <ellipse cx="280" cy="110" rx="35" ry="12" fill="#240D55" opacity="0.6" />
            <ellipse cx="440" cy="130" rx="28" ry="9" fill="#240D55" opacity="0.6" />
            <ellipse cx="610" cy="115" rx="42" ry="14" fill="#240D55" opacity="0.5" />
            {/* Soft pink clouds at edges */}
            <circle cx="90" cy="135" r="50" fill="#FF85C0" opacity="0.35" />
            <circle cx="160" cy="145" r="40" fill="#FF85C0" opacity="0.35" />
            <circle cx="880" cy="135" r="50" fill="#FF85C0" opacity="0.35" />
            <circle cx="940" cy="140" r="45" fill="#FF85C0" opacity="0.35" />
          </svg>
        </div>
      </div>

      {/* 2. Top Header Badges */}
      <div className="relative z-10 w-full flex items-center justify-between">
        {/* Left Badge */}
        <span
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border-2 border-[#0A1D3D] text-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "12px",
            lineHeight: "100%",
          }}
        >
          {badgeText}
        </span>

        {/* Right Badge: Word 3 of 8 ★ */}
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#0A1D3D] text-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "12px",
            lineHeight: "100%",
          }}
        >
          <span>
            Word {currentTrialIdx + 1} of {totalTrials}
          </span>
          <span className="text-[#0A1D3D] text-xs">★</span>
        </span>
      </div>

      {/* 3. Header Section (Title & Subtitle ABOVE the glass card) */}
      <div className="relative z-10 flex flex-col items-center mt-3 sm:mt-4 mb-2">
        <h2
          className="text-[24px] sm:text-[30px] font-extrabold text-white flex items-center justify-center gap-2 tracking-[-0.4px]"
          style={{ fontFamily: JAKARTA }}
        >
          <span>🎭</span>
          <span>The word can play a little trick!</span>
        </h2>
        <p
          className="text-[14px] sm:text-[15px] font-medium text-[#E0D3F8] mt-1 max-w-[620px]"
          style={{ fontFamily: JAKARTA }}
        >
          Look at the ink colour. Choose its colour, even if the word names a different colour.
        </p>
      </div>

      {/* 4. Central Translucent Cosmic Glass Card */}
      <div className="relative z-10 w-full max-w-[840px] my-auto py-6 sm:py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center">
        {isLevelFinished ? (
          /* Level Completed Feedback State */
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
                : `Level ${level} Complete!`}
            </h2>
            <p
              className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 leading-relaxed"
              style={{ fontFamily: JAKARTA }}
            >
              {isSubmitting
                ? "Saving your score to the star log..."
                : submissionStatus === "error"
                ? errorMessage
                : `Awesome ink spotting! You got ${
                    records.filter((r) => r.isCorrect).length
                  } out of ${totalTrials} right.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
              {submissionStatus === "success" && nextLevelRoute && (
                <button
                  type="button"
                  disabled={isSubmitting || isNavigating}
                  onClick={() => {
                    if (isNavigating) return;
                    setIsNavigating(true);
                    router.push(nextLevelRoute);
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-extrabold text-[15px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: JAKARTA }}
                >
                  {isNavigating
                    ? "Launching Next Challenge... 🚀"
                    : level < 3
                    ? `Next Level (${level + 1} of 3) 🚀`
                    : "Next Game: Card Flip 🚀"}
                </button>
              )}

              {submissionStatus === "error" && (
                <>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => submitResults(records)}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-extrabold text-[15px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: JAKARTA }}
                  >
                    {isSubmitting ? "Retrying..." : "Retry Submission 🔄"}
                  </button>
                  {level > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/games/stroop?level=1");
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-bold text-[14px] text-white bg-white/20 hover:bg-white/30 border border-white/40 transition-colors cursor-pointer"
                      style={{ fontFamily: JAKARTA }}
                    >
                      Go to Level 1 🎨
                    </button>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  setCurrentTrialIdx(0);
                  setIsLevelFinished(false);
                  setRecords([]);
                  setSubmissionStatus("idle");
                  setErrorMessage(null);
                  setNextLevelRoute(null);
                  setIsNavigating(false);
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-bold text-[14px] text-white bg-white/10 hover:bg-white/20 border border-white/30 transition-colors cursor-pointer"
                style={{ fontFamily: JAKARTA }}
              >
                Replay Level 🔄
              </button>
            </div>
          </div>
        ) : (
          /* Active Trial Display */
          <>
            {/* Pill prompt inside card */}
            <div
              className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white text-[#0A1D3D] font-extrabold text-[13px] shadow-sm select-none"
              style={{ fontFamily: JAKARTA }}
            >
              <span>🤔</span>
              <span>What colour is the INK?</span>
            </div>

            {/* Big Stimulus Word */}
            <div
              className="my-3 font-extrabold text-[62px] sm:text-[76px] tracking-[2px] transition-all duration-150 select-none drop-shadow-md"
              style={{
                fontFamily: JAKARTA,
                color: currentTrial.inkColor,
              }}
            >
              {currentTrial.word}
            </div>

            {/* Three Large Response Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 my-4 w-full max-w-[620px]">
              {currentTrial.options.map((option) => {
                const isSelected = selectedOption === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleSelectAnswer(option.label)}
                    disabled={selectedOption !== null}
                    className={`h-[58px] sm:h-[62px] px-6 rounded-[16px] bg-white border-2 border-[#0A1D3D] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-[2.5px_2.5px_0px_#0A1D3D] ${
                      isSelected
                        ? "scale-[0.97] bg-slate-100"
                        : "hover:-translate-y-1 hover:shadow-[3.5px_3.5px_0px_#0A1D3D] active:translate-y-0"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: option.dotColor }}
                    />
                    <span
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 800,
                        fontSize: "17px",
                        color: "#0A1D3D",
                      }}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-note inside card */}
            <p
              className="text-[13px] text-[#D8CCF0] mt-1"
              style={{ fontFamily: JAKARTA }}
            >
              ✨ A fresh look for every new word
            </p>
          </>
        )}
      </div>

      {/* Spacer for bottom balance */}
      <div className="h-1" />
    </div>
  );
}
