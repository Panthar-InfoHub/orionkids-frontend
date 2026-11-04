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
  const [selectedBucketId, setSelectedBucketId] = useState<number | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("orion_tut_seen_rule_discovery");
      if (!seen && level === 1 && cardIdx === 0) {
        setIsTutorialOpen(true);
      }
    } catch {}
  }, [level, cardIdx]);

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
    setSelectedBucketId(bucket.id);
    const currentCard = CARDS_TO_SORT[cardIdx];

    // Backend-authoritative and internal correctness calculation preserved
    const isMatch =
      currentRule === "color"
        ? bucket.color === currentCard.color
        : currentRule === "shape"
        ? bucket.shape === currentCard.shape
        : bucket.count === currentCard.count;

    const isLastTrial = cardIdx + 1 >= CARDS_TO_SORT.length;

    const newCorrect = isMatch ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    // Silent neutral interaction feedback
    setFeedback("Choice registered...");

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        cardIdx: cardIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    const holdDuration = 180;
    setTimeout(async () => {
      setFeedback(null);
      setSelectedBucketId(null);
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

            // Auto-advance immediately without asking
            setTimeout(() => {
              router.push(nextRoute);
            }, 250);
          } else {
            setSubmissionStatus("error");
            setErrorMessage(result.error?.message || "Failed to record Rule Discovery results.");
          }
        } else {
          setSubmissionStatus("success");
          const nextRoute = level < 3 ? `/games/rule-discovery?level=${level + 1}` : "/games/story-sequencing?level=1";
          setNextLevelRoute(nextRoute);
          setTimeout(() => {
            router.push(nextRoute);
          }, 250);
        }
      }
    }, holdDuration);
  };

  const isFinished = cardIdx >= CARDS_TO_SORT.length || submissionStatus === "success" || submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Level Tutorial Guide */}
      <GameTutorialGuide
        gameKey="rule-discovery"
        level={level}
        isOpen={isTutorialOpen}
        onClose={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem("orion_tut_seen_rule_discovery", "1"); } catch {}
        }}
        onComplete={() => {
          setIsTutorialOpen(false);
          startTimeRef.current = Date.now();
          try { sessionStorage.setItem("orion_tut_seen_rule_discovery", "1"); } catch {}
        }}
      />

      <div className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-4 px-4 sm:px-8 rounded-[20px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px]">
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
              {submissionStatus === "error" ? "Level Verification Required" : `Rule Discovery Level ${level} Complete!`}
            </h2>

            <p className="text-[13px] text-[#E0D3F8] max-w-[440px] mb-4 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "submitting"
                ? "Recording your cognitive flexibility score..."
                : submissionStatus === "error"
                ? errorMessage
                : `Brilliant cognitive flexibility! You completed all ${CARDS_TO_SORT.length} rule sorting challenges.`}
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
          <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between w-full max-w-[580px] text-white/90 text-xs sm:text-sm font-bold">
              <span>Card {cardIdx + 1} of {CARDS_TO_SORT.length}</span>
              <TutorialReplayButton onClick={() => setIsTutorialOpen(true)} />
            </div>

            {/* Current card to sort */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-white text-[11px] sm:text-xs uppercase tracking-wider font-extrabold opacity-80">
                Current Cosmic Card to Sort:
              </span>
              <div className="w-40 h-20 sm:w-44 sm:h-22 rounded-[16px] bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] flex items-center justify-center text-base sm:text-lg font-extrabold text-[#0A1D3D] p-2 text-center">
                {CARDS_TO_SORT[cardIdx].label}
              </div>
              {feedback && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#0A1D3D] border border-[#0A1D3D] font-extrabold text-xs shadow-sm">
                  <span>✨</span>
                  <span>{feedback}</span>
                </div>
              )}
            </div>

            <p className="text-white/80 text-[11px] sm:text-xs text-center font-bold">
              Which category does this card belong to? Discover the hidden rule!
            </p>

            {/* Target Buckets */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full max-w-[620px]">
              {TARGET_BUCKETS.map((bucket) => {
                const isChosen = selectedBucketId === bucket.id;
                return (
                  <button
                    key={bucket.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() => handleSelectBucket(bucket)}
                    className={`px-3.5 py-2.5 rounded-[14px] border-2 font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                      isChosen
                        ? "bg-[#FFE066] text-[#0A1D3D] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] scale-102 ring-2 ring-[#0A1D3D]/30"
                        : "bg-[#230C4D] hover:bg-[#32126D] border-white/20 text-white shadow-[2px_2px_0px_#0A1D3D]"
                    }`}
                  >
                    {bucket.label}
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
