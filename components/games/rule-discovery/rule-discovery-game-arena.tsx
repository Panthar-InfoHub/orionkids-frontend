"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  startQuestLevel,
  saveQuestCheckpoint,
  completeQuestLevel,
} from "@/lib/api/quest";
import { fetchCurrentSession } from "@/lib/api/session";
import { CosmicShape, CosmicCardItem } from "./cosmic-shapes";
import { RuleDiscoveryLevelPreview } from "./rule-discovery-level-preview";
import { shouldAutoOpenTutorial, markTutorialAsSeen } from "@/lib/utils";
import {
  getRoundsForLevel,
  isRuleMatch,
  RuleDiscoveryRound,
} from "./rule-discovery-data";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function RuleDiscoveryGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  const rounds = getRoundsForLevel(level);

  // Preview / Tutorial screen state: only shown on initial entry to Level 1
  const [showPreview, setShowPreview] = useState(level === 1);
  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);

  const [cardIdx, setCardIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | number | null>(null);

  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const cardStartTimeRef = useRef<number>(Date.now());
  const reactionTimesRef = useRef<number[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scheduleTimeout = (fn: () => void, delayMs: number) => {
    const id = setTimeout(() => {
      timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
      fn();
    }, delayMs);
    timeoutsRef.current.push(id);
    return id;
  };

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // When level prop changes, show preview on initial Level 1 entry for this quest session
  useEffect(() => {
    setShowPreview(shouldAutoOpenTutorial("rule-discovery", level, sessionId || activeSessionId));
    setCardIdx(0);
    setCorrectCount(0);
    setSelectedOptionId(null);
    setFeedback(null);
    setSubmissionStatus("idle");
    setActiveAttemptId(null);
    setIsLocked(false);
    reactionTimesRef.current = [];
    startTimeRef.current = Date.now();
    cardStartTimeRef.current = Date.now();
  }, [level, sessionId, activeSessionId]);

  // Session retrieval
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
    return () => {
      isCancelled = true;
    };
  }, [level, sessionId]);

  // Handler when child clicks "Start Level" from the preview screen
  const handleStartGameplay = async () => {
    setShowPreview(false);
    markTutorialAsSeen("rule-discovery", sessionId || activeSessionId);
    startTimeRef.current = Date.now();
    cardStartTimeRef.current = Date.now();

    if (activeSessionId && !activeAttemptId) {
      try {
        const res = await startQuestLevel(activeSessionId, "rule-discovery", level);
        if (res.success && res.data?.attemptId) {
          setActiveAttemptId(res.data.attemptId);
        } else if (!res.success && res.error) {
          setSubmissionStatus("error");
          setErrorMessage(res.error.message);
        }
      } catch (err: any) {
        console.warn("Could not initiate quest level attempt:", err);
      }
    }
  };

  const currentRound: RuleDiscoveryRound = rounds[cardIdx] || rounds[0];

  const handleSelectOption = async (option: CosmicCardItem) => {
    if (submissionStatus !== "idle" || isLocked) return;

    // Record per-card reaction time
    const cardRT = Math.max(100, Date.now() - cardStartTimeRef.current);
    reactionTimesRef.current.push(cardRT);

    setIsLocked(true);
    setSelectedOptionId(option.id);

    // Record card reaction time
    const reactionTimeMs = Math.max(1, Date.now() - cardStartTimeRef.current);
    reactionTimesRef.current.push(reactionTimeMs);

    // Semantic correctness evaluation (calculated silently — never revealed to the player)
    const isMatch = isRuleMatch(currentRound.rule, currentRound.target, option);
    const newCorrect = isMatch ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    // Silent feedback: neutral acknowledgement without indicating right or wrong
    setFeedback("Choice registered...");

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        cardIdx: cardIdx + 1,
        correctCount: newCorrect,
        timestamp: new Date().toISOString(),
      });
    }

    const isLastRound = cardIdx + 1 >= rounds.length;
    // Snappy neutral transition delay (180ms) matching Stroop & Odd One Out
    const holdDuration = 180;

    scheduleTimeout(async () => {
      setFeedback(null);
      setSelectedOptionId(null);
      setIsLocked(false);

      if (!isLastRound) {
        cardStartTimeRef.current = Date.now();
        setCardIdx((i) => i + 1);
      } else {
        // Complete Level
        setSubmissionStatus("submitting");
        const durationMs = Math.max(1000, Date.now() - startTimeRef.current);
        const accuracy = Math.round((newCorrect / rounds.length) * 100);
        const avgRT =
          reactionTimesRef.current.length > 0
            ? Math.round(
                reactionTimesRef.current.reduce((a, b) => a + b, 0) /
                  reactionTimesRef.current.length
              )
            : Math.round(durationMs / Math.max(1, rounds.length));

        if (activeSessionId) {
          const result = await completeQuestLevel(activeSessionId, {
            gameKey: "rule-discovery",
            levelNumber: level,
            totalTrials: rounds.length,
            correctTrials: newCorrect,
            accuracy,
            durationMs,
            averageReactionTimeMs: avgRT,
            metrics: {
              reactionTimes: reactionTimesRef.current,
              levelType: level === 3 ? "cosmic_rule_switch" : level === 2 ? "shape" : "color",
            },
            completedAt: new Date().toISOString(),
          });

          if (result.success) {
            setSubmissionStatus("success");
            let nextRoute =
              result.nextLevelRoute ||
              (level < 3
                ? `/games/rule-discovery?level=${level + 1}`
                : "/games/story-sequencing?level=1");
            if (activeSessionId && !nextRoute.includes("sessionId=")) {
              nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(
                activeSessionId
              )}`;
            }
            setNextLevelRoute(nextRoute);

            // Auto-advance seamlessly to next level of game
            scheduleTimeout(() => {
              router.push(nextRoute);
            }, 300);
          } else {
            setSubmissionStatus("error");
            setErrorMessage(result.error?.message || "Failed to record Rule Discovery results.");
          }
        } else {
          setSubmissionStatus("success");
          const nextRoute =
            level < 3
              ? `/games/rule-discovery?level=${level + 1}`
              : "/games/story-sequencing?level=1";
          setNextLevelRoute(nextRoute);
          scheduleTimeout(() => {
            router.push(nextRoute);
          }, 300);
        }
      }
    }, holdDuration);
  };

  const isFinished =
    cardIdx >= rounds.length ||
    submissionStatus === "success" ||
    submissionStatus === "error";

  return (
    <div className="w-full flex flex-col items-center select-none" style={{ fontFamily: JAKARTA }}>
      {/* "How to Play" In-Game Modal Overlay */}
      {isHowToPlayModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A1D3D]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        >
          <RuleDiscoveryLevelPreview
            level={level}
            isModal={true}
            onStart={() => setIsHowToPlayModalOpen(false)}
            onClose={() => setIsHowToPlayModalOpen(false)}
          />
        </div>
      )}

      {/* BEFORE LEVEL STARTS: Show Full Dedicated Preview Screen */}
      {showPreview && !isFinished ? (
        <RuleDiscoveryLevelPreview
          level={level}
          onStart={handleStartGameplay}
          onOpenHowToPlay={() => setIsHowToPlayModalOpen(true)}
        />
      ) : (
        /* ACTUAL GAMEPLAY ARENA */
        <div className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-5 px-4 sm:px-8 rounded-[24px] bg-[#351870]/60 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px]">
          {isFinished ? (
            /* COMPLETION CARD */
            <div className="py-4 flex flex-col items-center animate-in fade-in duration-300">
              <div
                className={`w-14 h-14 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-2 ${
                  submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
                }`}
              >
                {submissionStatus === "error" ? "⚠️" : "🌟"}
              </div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-white mb-1">
                {submissionStatus === "error"
                  ? "Level Verification Required"
                  : `Rule Discovery Level ${level} Complete!`}
              </h2>

              <p className="text-[13px] sm:text-[14px] text-[#E0D3F8] max-w-[460px] mb-4 text-center leading-relaxed">
                {submissionStatus === "submitting"
                  ? "Recording your cognitive flexibility score..."
                  : submissionStatus === "error"
                  ? errorMessage
                  : level === 3
                  ? `Spectacular mental agility! You mastered the Cosmic Rule Switch across all ${rounds.length} challenges!`
                  : `Brilliant discovery! You successfully identified and completed all ${rounds.length} rule sorting challenges.`}
              </p>

              {submissionStatus === "success" && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
                  <div
                    data-testid="scored-badge"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#65DCAA] text-[#0A1D3D] font-extrabold text-xs sm:text-[13px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] select-none"
                  >
                    <span className="text-sm">✓</span>
                    <span>Scored</span>
                  </div>

                  <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#0A1D3D] font-extrabold text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] animate-pulse">
                    <span className="text-sm">✨</span>
                    <span>
                      {level < 3
                        ? `Moving to Level ${level + 1}... 🚀`
                        : "Moving to Next Game... 🚀"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* GAMEPLAY ACTIVE ROUND */
            <div className="w-full flex flex-col items-center gap-3 sm:gap-4">
              {/* Progress & How to Play Bar */}
              <div className="flex items-center justify-between w-full max-w-[620px] text-white/90 text-xs sm:text-sm font-bold">
                <span className="bg-[#1B0B38]/80 px-3 py-1 rounded-full border border-white/10">
                  Card {cardIdx + 1} of {rounds.length}
                </span>

                <button
                  type="button"
                  onClick={() => setIsHowToPlayModalOpen(true)}
                  className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>❓</span>
                  <span>How to Play</span>
                </button>
              </div>

              {/* LEVEL 3 PROMINENT VISUAL RULE INDICATOR */}
              {level === 3 ? (
                <div className="w-full flex justify-center animate-in fade-in duration-200">
                  {currentRound.rule === "COLOR" ? (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DBEAFE] text-[#1E40AF] border-2 border-[#1E40AF] shadow-[2.5px_2.5px_0px_#0A1D3D]">
                      <span className="text-base sm:text-lg">🎨</span>
                      <span className="font-black text-xs sm:text-sm tracking-wide">
                        RULE: MATCH COLOR 🎨
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] text-[#92400E] border-2 border-[#92400E] shadow-[2.5px_2.5px_0px_#0A1D3D]">
                      <span className="text-base sm:text-lg">🔷</span>
                      <span className="font-black text-xs sm:text-sm tracking-wide">
                        RULE: MATCH SHAPE 🔷
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[11px] sm:text-xs font-bold border border-white/20">
                  <span>{level === 1 ? "🎨 Match by Color" : "📐 Match by Shape"}</span>
                </div>
              )}

              {/* CURRENT TARGET CARD TO SORT */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-white text-[11px] sm:text-xs uppercase tracking-wider font-black opacity-85">
                  Current Cosmic Card to Sort:
                </span>

                <div className="px-6 py-3 rounded-[20px] bg-white border-2 border-[#0A1D3D] shadow-[3.5px_3.5px_0px_#0A1D3D] flex items-center justify-center gap-3 text-center min-w-[190px]">
                  <CosmicShape
                    shape={currentRound.target.shape}
                    color={currentRound.target.color}
                    size={38}
                  />
                  <span className="text-base sm:text-lg font-black text-[#0A1D3D]">
                    {currentRound.target.label}
                  </span>
                </div>

                {/* Silent Neutral Feedback Pill */}
                {feedback ? (
                  <div
                    className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border-2 border-[#0A1D3D] font-extrabold text-xs shadow-sm bg-white text-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] animate-in fade-in zoom-in duration-150"
                  >
                    <span>✨</span>
                    <span>{feedback}</span>
                  </div>
                ) : null}
              </div>

              {/* Instruction subtitle */}
              <p className="text-white/85 text-[12px] sm:text-[13px] text-center font-bold max-w-[480px]">
                {level === 1
                  ? "Select the card with the SAME COLOR! (Shape can be different)"
                  : level === 2
                  ? "Select the card with the SAME SHAPE! (Color can be different)"
                  : currentRound.rule === "COLOR"
                  ? "Active Rule is COLOR: Match the color of the target card!"
                  : "Active Rule is SHAPE: Match the shape of the target card!"}
              </p>

              {/* 3 ANSWER OPTIONS ROW */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-[660px]">
                {currentRound.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  let btnStyle =
                    "bg-[#230C4D] hover:bg-[#32126D] hover:-translate-y-0.5 border-white/20 text-white shadow-[2.5px_2.5px_0px_#0A1D3D]";

                  if (isSelected) {
                    btnStyle =
                      "bg-[#FFE066] text-[#0A1D3D] border-[#0A1D3D] shadow-[3px_3px_0px_#0A1D3D] scale-102 ring-3 ring-[#FFE066]/40";
                  } else if (selectedOptionId !== null) {
                    btnStyle =
                      "opacity-50 scale-98 bg-[#230C4D] border-white/10 text-white/70";
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => handleSelectOption(opt)}
                      className={`px-4 sm:px-5 py-3 rounded-[16px] border-2 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 active:translate-y-0 ${btnStyle}`}
                    >
                      <CosmicShape shape={opt.shape} color={opt.color} size={28} />
                      <span className="whitespace-nowrap">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
