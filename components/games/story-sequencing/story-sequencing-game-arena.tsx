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

function seededShuffle<T>(items: T[], seedNumber: number): T[] {
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

export function StorySequencingGameArena({
  level = 1,
  sessionId,
}: {
  level?: number;
  sessionId?: string;
}) {
  const router = useRouter();
  const mission = STORY_MISSIONS[level] || STORY_MISSIONS[1];

  // Shuffled steps for user to order - seeded for SSR hydration safety, then client shuffled
  const [shuffled, setShuffled] = useState<StoryStep[]>(() => {
    return seededShuffle(mission.steps, level * 100);
  });

  useEffect(() => {
    const list = [...mission.steps];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setShuffled(list);
  }, [level, mission]);
  const [selectedOrder, setSelectedOrder] = useState<StoryStep[]>([]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId || null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nextLevelRoute, setNextLevelRoute] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<{ text: string; icon: string } | null>(null);
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
    setFeedbackBanner(null);
  };

  const handleVerifyStory = async () => {
    if (selectedOrder.length !== mission.steps.length || isVerifying) return;
    setIsVerifying(true);

    // Backend-authoritative and internal correctness calculation preserved
    let correctCount = 0;
    selectedOrder.forEach((step, idx) => {
      const isCorrect = step.order === idx + 1;
      if (isCorrect) correctCount++;
    });

    // Silent neutral interaction feedback: acknowledge submission without right/wrong marking
    setFeedbackBanner({
      icon: "✨",
      text: "Mission sequence registered...",
    });

    // Smooth fast transition
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
          // If final level of story sequencing (Game 6 Level 3) -> routes to homepage or report!
          let nextRoute =
            result.nextLevelRoute && !result.nextLevelRoute.includes("report")
              ? result.nextLevelRoute
              : (level < 3 ? `/games/story-sequencing?level=${level + 1}` : "/");
          if (activeSessionId && level < 3 && !nextRoute.includes("sessionId=")) {
            nextRoute += `${nextRoute.includes("?") ? "&" : "?"}sessionId=${encodeURIComponent(activeSessionId)}`;
          }
          setNextLevelRoute(nextRoute);

          // Auto-advance immediately without asking
          setTimeout(() => {
            router.push(nextRoute);
          }, level === 3 ? 1200 : 300);
        } else {
          setSubmissionStatus("error");
          setErrorMessage(result.error?.message || "Failed to record Story Sequencing results.");
        }
      } else {
        setSubmissionStatus("success");
        const nextRoute = level < 3 ? `/games/story-sequencing?level=${level + 1}` : "/";
        setNextLevelRoute(nextRoute);
        setTimeout(() => {
          router.push(nextRoute);
        }, level === 3 ? 1200 : 300);
      }
    }, 180);
  };

  const isAllPicked = selectedOrder.length === mission.steps.length;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Level Tutorial Guide */}
      <GameTutorialGuide
        gameKey="story-sequencing"
        level={level}
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      <div className="relative z-10 w-full max-w-[840px] my-auto py-3.5 sm:py-4 px-4 sm:px-8 rounded-[20px] bg-[#351870]/50 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px]">
        {submissionStatus === "success" || submissionStatus === "error" ? (
          <div className="py-4 flex flex-col items-center animate-in fade-in duration-300">
            <div
              className={`w-12 h-12 rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center text-2xl mb-2 ${
                submissionStatus === "error" ? "bg-[#FF5B5B]" : "bg-[#FFD028]"
              }`}
            >
              {submissionStatus === "error" ? "⚠️" : "🌟"}
            </div>
            <h2 className="text-[22px] sm:text-[24px] font-extrabold text-white mb-1 text-center" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error"
                ? "Level Verification Required"
                : level === 3
                ? "Thank You For Playing The Game 🎉"
                : `Story Sequencing Level ${level} Complete!`}
            </h2>

            <p className="text-[13px] text-[#E0D3F8] max-w-[440px] mb-4 text-center leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {submissionStatus === "error"
                ? errorMessage
                : level === 3
                ? "Congratulations Explorer! You have completed all 18 levels across all six cognitive games."
                : "Terrific narrative logic! You arranged the space exploration steps in sequence."}
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
                    {level < 3 ? `Moving to Level ${level + 1}... 🚀` : "Completing Quest... 🚀"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-2.5 sm:gap-3">
            <div className="flex items-center justify-between w-full max-w-[580px] text-white/90 text-xs sm:text-sm font-bold">
              <span>{mission.title}</span>
              <TutorialReplayButton onClick={() => setIsTutorialOpen(true)} />
            </div>

            {feedbackBanner ? (
              <div
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full font-extrabold text-[13px] sm:text-[14px] shadow-lg select-none bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]"
                style={{ fontFamily: JAKARTA }}
              >
                <span className="text-lg">{feedbackBanner.icon}</span>
                <span>{feedbackBanner.text}</span>
              </div>
            ) : (
              <h3 className="text-white text-xs sm:text-sm font-extrabold text-center">
                Tap the mission events in the order they happen (1st to last):
              </h3>
            )}

            {/* Sequence Slots */}
            <div className="flex flex-col gap-1 w-full max-w-[580px]">
              <span className="text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Your Story Sequence:</span>
              <div className="min-h-[58px] sm:min-h-[64px] p-2 rounded-[14px] bg-[#1E0942]/60 border border-white/10 flex flex-row flex-wrap gap-2 items-center justify-center">
                {selectedOrder.length === 0 ? (
                  <span className="text-white/40 text-xs text-center my-auto italic">
                    Tap the cards below to build your story...
                  </span>
                ) : (
                  selectedOrder.map((step, idx) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] font-bold text-xs border-[1.5px] transition-all bg-white text-[#0A1D3D] border-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D]"
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[10px] bg-[#FFD028] text-[#0A1D3D] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-base">{step.icon}</span>
                      <span className="max-w-[140px] truncate">{step.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Available Cards to Pick */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-[580px]">
              {shuffled.map((step) => {
                const isPicked = selectedOrder.some((s) => s.id === step.id);
                return (
                  <button
                    key={step.id}
                    type="button"
                    disabled={isPicked}
                    onClick={() => handlePickStep(step)}
                    className={`p-2 sm:p-2.5 rounded-[12px] border-[1.5px] border-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D] flex items-center gap-2 transition-all text-left text-xs font-bold ${
                      isPicked
                        ? "opacity-30 bg-gray-400 cursor-not-allowed text-gray-800"
                        : "bg-white text-[#0A1D3D] hover:-translate-y-0.5 hover:bg-[#FFF8D6] cursor-pointer"
                    }`}
                  >
                    <span className="text-xl shrink-0">{step.icon}</span>
                    <span className="leading-snug line-clamp-2">{step.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={handleResetOrder}
                disabled={selectedOrder.length === 0}
                className="px-4 py-1.5 rounded-full border border-white/30 text-white font-bold text-xs hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-40"
              >
                Reset Order 🔄
              </button>

              <button
                type="button"
                disabled={!isAllPicked || submissionStatus === "submitting"}
                onClick={handleVerifyStory}
                className="px-6 py-2 rounded-full bg-[#FFD028] text-[#0A1D3D] font-extrabold text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
