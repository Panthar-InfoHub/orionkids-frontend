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

interface StoryStep {
  id: number;
  order: number;
  text: string;
  icon: string;
}

const STORY_MISSIONS: Record<number, { title: string; steps: StoryStep[] }> = {
  1: {
    title: "Rocket Launch Mission (3 Steps)",
    steps: [
      { id: 1, order: 1, text: "Build the Rocket on the launchpad", icon: "🛠️" },
      { id: 2, order: 2, text: "Astronauts board & 3-2-1 Blast off!", icon: "🚀" },
      { id: 3, order: 3, text: "Reach orbit and look back at Earth", icon: "🌍" },
    ],
  },
  2: {
    title: "Lunar Landing Expedition (4 Steps)",
    steps: [
      { id: 1, order: 1, text: "Enter Moon orbit", icon: "🛸" },
      { id: 2, order: 2, text: "Touch down on the lunar surface", icon: "🌕" },
      { id: 3, order: 3, text: "Collect moon rocks in samples", icon: "🪨" },
      { id: 4, order: 4, text: "Plant the Orion flag and salute", icon: "🚩" },
    ],
  },
  3: {
    title: "Interstellar Discovery (4 Steps)",
    steps: [
      { id: 1, order: 1, text: "Fly past Mars into the asteroid belt", icon: "☄️" },
      { id: 2, order: 2, text: "Discover glowing alien crystals", icon: "💎" },
      { id: 3, order: 3, text: "Transmit deep space data to Earth", icon: "📡" },
      { id: 4, order: 4, text: "Safe return to space station base", icon: "🛰️" },
    ],
  },
};

export function StorySequencingGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  const mission = STORY_MISSIONS[level] || STORY_MISSIONS[1];

  // Shuffled steps for user to order
  const [shuffled, setShuffled] = useState<StoryStep[]>(() => {
    const list = [...mission.steps];
    return list.sort(() => Math.random() - 0.5);
  });
  const [selectedOrder, setSelectedOrder] = useState<StoryStep[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [stepResults, setStepResults] = useState<Record<number, boolean> | null>(null);
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
      const res = await startQuestLevel(activeSessionId!, "story-sequencing", level);
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

  const handlePickStep = (step: StoryStep) => {
    if (isVerifying || selectedOrder.some((s) => s.id === step.id)) return;
    const newSelected = [...selectedOrder, step];
    setSelectedOrder(newSelected);

    if (activeSessionId && activeAttemptId) {
      saveQuestCheckpoint(activeSessionId, activeAttemptId, {
        placedCount: newSelected.length,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleResetOrder = () => {
    if (isVerifying) return;
    setSelectedOrder([]);
    setStepResults(null);
    setFeedbackBanner(null);
  };

  const handleVerifyStory = async () => {
    if (selectedOrder.length !== mission.steps.length || isVerifying) return;
    setIsVerifying(true);

    // Check correctness of chronological sequence
    let correctCount = 0;
    const results: Record<number, boolean> = {};
    selectedOrder.forEach((step, idx) => {
      const isCorrect = step.order === idx + 1;
      results[step.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    const isPerfect = correctCount === mission.steps.length;
    setStepResults(results);
    setFeedbackBanner({
      icon: isPerfect ? "✅" : "💡",
      text: isPerfect
        ? "PERFECT STORY! All events placed in order! 🌟"
        : `Story Check: ${correctCount} of ${mission.steps.length} events in order!`,
      isCorrect: isPerfect,
    });

    // Hold visual feedback for 2200ms so child sees which cards are right/wrong!
    setTimeout(async () => {
      setSubmissionStatus("submitting");
      const accuracy = Math.round((correctCount / mission.steps.length) * 100);
      const durationMs = Math.max(1000, Date.now() - startTimeRef.current);

      if (activeSessionId) {
        const result = await completeQuestLevel(activeSessionId, {
          gameKey: "story-sequencing",
          levelNumber: level,
          totalTrials: mission.steps.length,
          correctTrials: correctCount,
          accuracy,
          durationMs,
          completedAt: new Date().toISOString(),
        });

        if (result.success) {
          setSubmissionStatus("success");
          // If final level of story sequencing (Game 6 Level 3) -> routes to homepage!
          let nextRoute =
            result.nextLevelRoute && !result.nextLevelRoute.includes("report")
              ? result.nextLevelRoute
              : (level < 3 ? `/games/story-sequencing?level=${level + 1}` : "/");
          if (activeSessionId && level < 3 && !nextRoute.includes("sessionId=")) {
            nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(activeSessionId)}`;
          }
          setNextLevelRoute(nextRoute);
        } else {
          setSubmissionStatus("error");
          setErrorMessage(result.error?.message || "Failed to record Story Sequencing results.");
        }
      } else {
        setSubmissionStatus("success");
        setNextLevelRoute(level < 3 ? `/games/story-sequencing?level=${level + 1}` : "/");
      }
    }, 2200);
  };

  const isAllPicked = selectedOrder.length === mission.steps.length;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div className="relative z-10 w-full max-w-[840px] my-auto py-8 px-6 sm:px-12 rounded-[24px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[460px]">
        {submissionStatus === "success" || submissionStatus === "error" ? (
          <div className="py-6 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-16 h-16 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-3xl mb-4 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-white mb-2 text-center" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error"
                ? "Level Verification Required"
                : level === 3
                ? "Thank You For Playing The Game 🎉"
                : `Story Sequencing Level ${level} Complete!`}
            </h2>

            <p className="text-[15px] text-[#E0D3F8] max-w-[460px] mb-6 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error"
                ? errorMessage
                : level === 3
                ? "Congratulations Explorer! You have completed all 18 levels across all six cognitive games."
                : "Terrific narrative logic! You arranged the space exploration steps in sequence."}
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
                  ? "Loading... 🚀"
                  : level < 3
                  ? `Next Level (${level + 1} of 3) 🚀`
                  : "Back to Home 🏠"}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-6">
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
              <h3 className="text-white text-base font-extrabold text-center">
                Tap the mission events in the order they happen (1st to last):
              </h3>
            )}

            {/* Sequence Slots */}
            <div className="flex flex-col gap-2 w-full max-w-[560px]">
              <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Your Story Sequence:</span>
              <div className="min-h-[100px] p-3 rounded-[16px] bg-[#1E0942]/60 border border-white/10 flex flex-col gap-2">
                {selectedOrder.length === 0 ? (
                  <span className="text-white/40 text-xs text-center my-auto italic">
                    Tap the cards below to build your story...
                  </span>
                ) : (
                  selectedOrder.map((step, idx) => {
                    const isEvaluated = stepResults !== null;
                    const isStepRight = stepResults?.[step.id];

                    return (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-2.5 rounded-[12px] font-bold text-xs sm:text-sm border-2 transition-all ${
                          !isEvaluated
                            ? "bg-white text-[#0A1D3D] border-[#0A1D3D]"
                            : isStepRight
                            ? "bg-[#EEFBF3] text-[#065F46] border-[#10B981] shadow-[2px_2px_0px_#059669]"
                            : "bg-[#FFF1F2] text-[#9F1239] border-[#F43F5E] shadow-[2px_2px_0px_#BE123C]"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs ${
                            !isEvaluated
                              ? "bg-[#FFD028] text-[#0A1D3D]"
                              : isStepRight
                              ? "bg-[#10B981] text-white"
                              : "bg-[#F43F5E] text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xl">{step.icon}</span>
                        <span className="flex-1">{step.text}</span>
                        {isEvaluated && (
                          <span className="text-base font-bold">
                            {isStepRight ? "✅" : "❌"}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Available Cards to Pick */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-[560px]">
              {shuffled.map((step) => {
                const isPicked = selectedOrder.some((s) => s.id === step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    disabled={isPicked}
                    onClick={() => handlePickStep(step)}
                    className={`p-3 rounded-[16px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center gap-2.5 transition-all text-left text-xs sm:text-sm font-bold ${
                      isPicked
                        ? "opacity-30 bg-gray-400 cursor-not-allowed text-gray-800"
                        : "bg-white text-[#0A1D3D] hover:-translate-y-1 hover:bg-[#FFF8D6] cursor-pointer"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span className="leading-snug">{step.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={handleResetOrder}
                disabled={selectedOrder.length === 0}
                className="px-5 py-2.5 rounded-full border border-white/30 text-white font-bold text-xs hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-40"
              >
                Reset Order 🔄
              </button>

              <button
                type="button"
                disabled={!isAllPicked || submissionStatus === "submitting"}
                onClick={handleVerifyStory}
                className="px-8 py-3 rounded-full bg-[#FFD028] text-[#0A1D3D] font-extrabold text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submissionStatus === "submitting" ? "Checking Mission..." : "Complete Mission 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
