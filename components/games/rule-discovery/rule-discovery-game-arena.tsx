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

interface SortItem {
  id: number;
  shape: "circle" | "square" | "triangle";
  color: "red" | "blue" | "yellow";
  count: number;
  label: string;
}

const TARGET_BUCKETS = [
  { id: 1, shape: "circle", color: "red", count: 1, label: "🔴 1 Red Circle" },
  { id: 2, shape: "square", color: "blue", count: 2, label: "🟦 2 Blue Squares" },
  { id: 3, shape: "triangle", color: "yellow", count: 3, label: "▲ 3 Yellow Triangles" },
];

const CARDS_TO_SORT: SortItem[] = [
  { id: 101, shape: "circle", color: "blue", count: 1, label: "🔵 1 Blue Circle" },
  { id: 102, shape: "square", color: "red", count: 2, label: "🟥 2 Red Squares" },
  { id: 103, shape: "triangle", color: "blue", count: 3, label: "▲ 3 Blue Triangles" },
  { id: 104, shape: "circle", color: "yellow", count: 2, label: "🟡 2 Yellow Circles" },
];

export function RuleDiscoveryGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  // Secret rule changes based on level:
  // Level 1: Match by Color
  // Level 2: Match by Shape
  // Level 3: Match by Count
  const currentRule: "color" | "shape" | "count" =
    level === 1 ? "color" : level === 2 ? "shape" : "count";

  const [cardIdx, setCardIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
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
      const res = await startQuestLevel(activeSessionId!, "rule-discovery", level);
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

  const handleSelectBucket = async (bucket: typeof TARGET_BUCKETS[0]) => {
    if (submissionStatus !== "idle" || isLocked) return;
    setIsLocked(true);
    const currentCard = CARDS_TO_SORT[cardIdx];

    const isMatch =
      currentRule === "color"
        ? bucket.color === currentCard.color
        : currentRule === "shape"
        ? bucket.shape === currentCard.shape
        : bucket.count === currentCard.count;

    const isLastTrial = cardIdx + 1 >= CARDS_TO_SORT.length;

    const newCorrect = isMatch ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);
    setFeedback(isMatch ? "✨ Rule Matched! +1 🌟" : "❌ Try another attribute!");

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        cardIdx: cardIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    const holdDuration = isLastTrial ? 2200 : 1200;
    setTimeout(async () => {
      setFeedback(null);
      setIsLocked(false);
      if (!isLastTrial) {
        setCardIdx((i) => i + 1);
      } else {
        setSubmissionStatus("submitting");
        const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
        const accuracy = Math.round((newCorrect / CARDS_TO_SORT.length) * 100);

        if (activeSessionId) {
          const result = await completeQuestLevel(activeSessionId, {
            gameKey: "rule-discovery",
            levelNumber: level,
            totalTrials: CARDS_TO_SORT.length,
            correctTrials: newCorrect,
            accuracy,
            durationMs,
            completedAt: new Date().toISOString(),
          });

          if (result.success) {
            setSubmissionStatus("success");
            let nextRoute =
              result.nextLevelRoute ||
              (level < 3 ? `/games/rule-discovery?level=${level + 1}` : "/games/story-sequencing?level=1");
            if (activeSessionId && !nextRoute.includes("sessionId=")) {
              nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(activeSessionId)}`;
            }
            setNextLevelRoute(nextRoute);
          } else {
            setSubmissionStatus("error");
            setErrorMessage(result.error?.message || "Failed to record Rule Discovery results.");
          }
        } else {
          setSubmissionStatus("success");
          setNextLevelRoute(level < 3 ? `/games/rule-discovery?level=${level + 1}` : "/games/story-sequencing?level=1");
        }
      }
    }, holdDuration);
  };

  const isFinished = cardIdx >= CARDS_TO_SORT.length || submissionStatus === "success" || submissionStatus === "error";

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
              {submissionStatus === "error" ? "Level Verification Required" : `Rule Discovery Level ${level} Complete!`}
            </h2>

            <p className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your cognitive flexibility score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Brilliant cognitive flexibility! You deduced the secret rule and sorted ${correctCount} items correctly.`}
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
                  : "Next Game: Story Sequencing 🚀"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex items-center justify-between w-full max-w-[560px] text-white/90 text-sm font-bold">
              <span>Card {cardIdx + 1} of {CARDS_TO_SORT.length}</span>
              <span>Matched: {correctCount}</span>
            </div>

            {/* Current card to sort */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-xs uppercase tracking-wider font-extrabold opacity-80">
                Current Cosmic Card to Sort:
              </span>
              <div className="w-48 h-28 rounded-[20px] bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] flex items-center justify-center text-lg font-extrabold text-[#0A1D3D] p-2 text-center">
                {CARDS_TO_SORT[cardIdx].label}
              </div>
              {feedback && (
                <span className="text-sm font-extrabold animate-bounce" style={{ color: feedback.startsWith("✨") ? "#65DCAA" : "#FF5B5B" }}>
                  {feedback}
                </span>
              )}
            </div>

            <p className="text-white/80 text-xs text-center font-bold">
              Which category does this card belong to? Discover the hidden rule!
            </p>

            {/* Target Buckets */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-[620px]">
              {TARGET_BUCKETS.map((bucket) => (
                <button
                  key={bucket.id}
                  type="button"
                  onClick={() => handleSelectBucket(bucket)}
                  className="px-4 py-3.5 rounded-[16px] bg-[#230C4D] hover:bg-[#32126D] border-2 border-white/20 text-white font-extrabold text-sm shadow-[2px_2px_0px_#0A1D3D] transition-all cursor-pointer"
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
