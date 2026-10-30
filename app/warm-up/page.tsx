"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WARM_UP_QUESTIONS } from "@/components/warm-up/warm-up-data";
import { WarmUpHeader } from "@/components/warm-up/warm-up-header";
import { WarmUpSidebar } from "@/components/warm-up/warm-up-sidebar";
import { OptionCard } from "@/components/warm-up/option-card";
import { StroopIntroCard } from "@/components/warm-up/stroop-intro-card";
import { submitWarmUpAnswers } from "@/lib/api/warmup";
import { fetchCurrentUserProfile, getRouteForUserProfile } from "@/lib/api/auth";
import { setActiveChildId, getActiveChildId } from "@/lib/api/children";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const LORA = "var(--font-lora), 'Lora', Georgia, serif";

function WarmUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramSessionId = searchParams.get("sessionId");
  const paramChildId = searchParams.get("childId");

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    async function verifyQuestAccess() {
      try {
        if (paramChildId) {
          setActiveChildId(paramChildId);
        }

        const profile = await fetchCurrentUserProfile();
        if (isCancelled) return;
        if (!profile) {
          router.replace("/login?redirect=/warm-up");
          return;
        }
        const destination = getRouteForUserProfile(profile, "/warm-up");
        if (destination !== "/warm-up") {
          router.replace(destination);
          return;
        }

        const targetChildId = paramChildId || getActiveChildId() || undefined;
        const { fetchCurrentSession } = await import("@/lib/api/session");
        const currentSession = await fetchCurrentSession(targetChildId);

        // If this specific session is already past warm-up, route forward
        if (currentSession && currentSession.isWarmUpCompleted && currentSession.currentStage !== "WARM_UP") {
          const gameMap: Record<number, string> = {
            1: "stroop",
            2: "card-flip",
            3: "pattern",
            4: "odd-one-out",
            5: "rule-discovery",
            6: "story-sequencing",
          };
          const gKey = gameMap[currentSession.currentGame] || "stroop";
          router.replace(`/games/${gKey}?level=${currentSession.currentLevel}&sessionId=${currentSession.id}`);
          return;
        }

        setIsVerifying(false);
      } catch {
        router.replace("/login?redirect=/warm-up");
      }
    }
    verifyQuestAccess();
    return () => {
      isCancelled = true;
    };
  }, [router, paramChildId, paramSessionId]);

  const totalSteps = WARM_UP_QUESTIONS.length;
  const currentQuestion = WARM_UP_QUESTIONS[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const selectedAnswer = answers[currentQuestion.id] || "";

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleStartStroopGame = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      let resolvedSessionId = paramSessionId || undefined;
      const targetChildId = paramChildId || getActiveChildId() || undefined;

      if (!resolvedSessionId) {
        const { fetchCurrentSession } = await import("@/lib/api/session");
        const activeSess = await fetchCurrentSession(targetChildId);
        resolvedSessionId = activeSess?.id;
      }

      const response = await submitWarmUpAnswers({
        sessionId: resolvedSessionId,
        answers,
        completedAt: new Date().toISOString(),
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to persist warm-up answers.");
      }

      const targetSessionId = response.sessionId || resolvedSessionId;
      const destination = targetSessionId
        ? `/games/stroop?level=1&sessionId=${encodeURIComponent(targetSessionId)}${paramChildId ? `&childId=${encodeURIComponent(paramChildId)}` : ""}`
        : response.nextGameRoute || "/games/stroop?level=1";

      router.push(destination);
    } catch (err) {
      console.error("Failed to submit warm-up answers:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not save warm-up to the server. Please check your connection and retry."
      );
      setIsSubmitting(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#F0F6FA] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center animate-pulse mb-3">
          <span className="text-xl">🎮</span>
        </div>
        <p className="text-xs font-bold text-slate-500">Checking quest access permissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F6FA] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* 1. Header with Breadcrumb & Progress Stepper */}
      <WarmUpHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        isLastStep={isLastStep}
        isCompleted={isCompleted}
      />

      {/* 2. Main Content Area: Standard 2-column layout matching other pages */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-[88px] py-3 sm:py-4 lg:py-4 flex-1 flex flex-col md:flex-row items-start justify-between gap-6 lg:gap-[28px]">
        {/* Left Column: Sidebar with Mascot */}
        <WarmUpSidebar
          tag={
            isCompleted
              ? "WARM-UP COMPLETE"
              : isLastStep
              ? "HOW YOU FEEL"
              : currentQuestion.tag
          }
          title={
            isCompleted ? (
              <>
                You’re ready
                <br />
                for a little play!
              </>
            ) : isLastStep ? (
              <>
                Tell us what
                <br />
                feels like you.
              </>
            ) : (
              <>
                Let’s Get To
                <br />
                Know You.
              </>
            )
          }
          subtitle={
            isCompleted ? (
              <>
                Thanks for sharing what makes you, you. Next comes a simple
                colour game.
              </>
            ) : isLastStep ? (
              <>
                Everyone learns differently.
                <br />
                Tell us what feels right for you.
              </>
            ) : (
              "There are no right or wrong answers. Just tell us what feels like you."
            )
          }
          bottomCardTitle={isLastStep ? "All feelings belong here." : "Take your time."}
          bottomCardBody={
            isLastStep
              ? "Need a moment? Rest or ask a grown-up to stay beside you."
              : "You can ask a grown-up to read the question with you."
          }
          plainBottomNote={
            isCompleted
              ? "Your answers help us understand you. They are not a score."
              : undefined
          }
        />

        {/* Right Column: Question Card or Stroop Intro Screen */}
        {isCompleted ? (
          <div className="w-full md:max-w-[916px] flex-1 flex flex-col gap-3">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => handleStartStroopGame()}
                  className="px-3 py-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700 text-xs font-bold cursor-pointer"
                >
                  Retry Save
                </button>
              </div>
            )}
            <StroopIntroCard
              onBack={() => setIsCompleted(false)}
              onPause={() => setIsPauseModalOpen(true)}
              onStartGame={handleStartStroopGame}
              isLoading={isSubmitting}
            />
          </div>
        ) : (
          <div className="w-full md:max-w-[916px] flex-1 bg-white rounded-[20px] sm:rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(10,29,61,0.03)] p-4 sm:p-5 lg:p-6 flex flex-col justify-between min-h-[440px] lg:min-h-[480px] gap-3 sm:gap-4">
            <div className="flex flex-col flex-1 h-full justify-between gap-3 sm:gap-4">
              {/* Question Header */}
              <div className="flex flex-col gap-[4px] sm:gap-[6px]">
                {/* Content: A LITTLE ABOUT YOU, Plus Jakarta Sans, 800 ExtraBold, 11px, 100% line height, 100% letter spacing, #526176 */}
                <span
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "10.5px",
                    lineHeight: "100%",
                    letterSpacing: "1px",
                    color: "#526176",
                    textTransform: "uppercase",
                  }}
                >
                  A LITTLE ABOUT YOU
                </span>

                {/* Question: Lora, 700 Bold, 26px, 125% line height, -0.6px letter spacing */}
                <h2
                  className="text-[20px] sm:text-[24px] lg:text-[26px]"
                  style={{
                    fontFamily: LORA,
                    fontWeight: 700,
                    lineHeight: "120%",
                    letterSpacing: "-0.5px",
                    color: "#0A1D3D",
                  }}
                >
                  {currentQuestion.question}
                </h2>

                {/* Subtitle: Plus Jakarta Sans, 400 Regular, 13.5px */}
                <p
                  className="text-[13px] sm:text-[13.5px]"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 400,
                    lineHeight: "140%",
                    letterSpacing: "0%",
                    color: "#526176",
                  }}
                >
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options Container: 2-column grid on desktop (lg:) matching Figma, 1-column on mobile & tablet */}
              <div
                className={`w-full max-w-[852px] my-auto ${
                  currentQuestion.layout === "grid-4"
                    ? "grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5"
                    : currentQuestion.layout === "grid-3"
                    ? "grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-2.5"
                    : "grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-2.5"
                }`}
              >
                {currentQuestion.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    isSelected={selectedAnswer === option.id}
                    onSelect={handleSelectOption}
                    layout={currentQuestion.layout}
                  />
                ))}
              </div>

              {/* Bottom Area: Pinned to bottom so buttons never shift position between steps */}
              <div className="flex flex-col gap-2 sm:gap-2.5 mt-auto pt-1">
                {/* Helper Micro-text */}
                <p
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#526176",
                  }}
                >
                  {currentQuestion.helperText}
                </p>

                {/* Navigation Controls: Back Button & Next / Finish Actions */}
                <div className="pt-1 flex items-center justify-between gap-3">
                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center gap-2 sm:gap-[10px] h-[40px] sm:h-[46px] px-4 sm:px-[20px] rounded-[12px] border border-[#0A1D3D] text-[#0A1D3D] bg-white hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer select-none"
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "13.5px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A1D3D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>Back</span>
                  </button>

                  {/* Right Actions: Take a pause & Finish/Continue */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Take a pause button on Step 6 */}
                    {isLastStep && (
                      <button
                        type="button"
                        onClick={() => setIsPauseModalOpen(true)}
                        className="inline-flex items-center justify-center h-[40px] sm:h-[46px] px-3 sm:px-[18px] rounded-[12px] border border-[#D8DFE8] text-[#0A1D3D] bg-white hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer select-none font-bold text-[13px] sm:text-[14px]"
                        style={{ fontFamily: JAKARTA }}
                      >
                        Take a pause
                      </button>
                    )}

                    {/* Continue Button / Finish warm-up Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!selectedAnswer}
                      className={`inline-flex items-center justify-center gap-2 sm:gap-[10px] h-[40px] sm:h-[46px] px-4 sm:px-[22px] rounded-[12px] border-2 border-[#0A1D3D] transition-all select-none ${
                        selectedAnswer
                          ? "bg-[#FFD028] text-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 cursor-pointer"
                          : "bg-[#E2E8F0] text-[#94A3B8] border-transparent cursor-not-allowed"
                      }`}
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 800,
                        fontSize: "13.5px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      <span>{isLastStep ? "Finish warm-up" : "Continue"}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Bottom Footer */}
      <footer className="w-full border-t border-[#D8DFE8] bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-[88px] py-3 sm:py-3.5 min-h-[44px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#526176",
            }}
          >
            © 2026 OrionKids Digital Solutions Pvt. Ltd.
          </p>
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#526176",
            }}
          >
            Assessment insights for learning and development. Not clinical diagnosis.
          </p>
        </div>
      </footer>

      {/* 4. Pause Modal */}
      {isPauseModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A1D3D]/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPauseModalOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 max-w-[440px] w-full text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#EAF7EF] flex items-center justify-center text-3xl shadow-sm">
              🌱
            </div>

            <h3
              className="text-[22px] font-bold text-[#0A1D3D]"
              style={{ fontFamily: LORA }}
            >
              Take a Little Pause
            </h3>

            <p
              className="text-[14px] leading-[160%] text-[#526176]"
              style={{ fontFamily: JAKARTA }}
            >
              Every feeling is okay. Take a deep, slow breath and relax for a moment. There is no rush at all!
            </p>

            <button
              type="button"
              onClick={() => setIsPauseModalOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-[14px] text-[#0A1D3D] bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 transition-transform cursor-pointer"
              style={{ fontFamily: JAKARTA }}
            >
              I&apos;m Ready to Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WarmUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0F6FA] flex flex-col items-center justify-center p-6">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center animate-pulse mb-3">
            <span className="text-xl">🎮</span>
          </div>
          <p className="text-xs font-bold text-slate-500">Loading warm-up session...</p>
        </div>
      }
    >
      <WarmUpContent />
    </Suspense>
  );
}
