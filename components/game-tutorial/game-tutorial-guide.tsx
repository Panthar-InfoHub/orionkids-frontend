"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QuestGameKey } from "@/lib/api/quest";
import { LevelTutorialConfig } from "@/types/game-tutorial";
import { GAME_TUTORIALS } from "@/lib/data/game-tutorials";
import { AnimatedHandPointer } from "./animated-hand-pointer";
import { TutorialInstruction } from "./tutorial-instruction";
import { TutorialProgressIndicator } from "./tutorial-progress-indicator";
import { ArrowRight, Play, X, RotateCcw } from "lucide-react";

interface GameTutorialGuideProps {
  gameKey: QuestGameKey;
  level: number;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function GameTutorialGuide({
  gameKey,
  level,
  isOpen,
  onClose,
  onComplete,
}: GameTutorialGuideProps) {
  const tutorialConfig: LevelTutorialConfig =
    GAME_TUTORIALS[gameKey]?.[level] || GAME_TUTORIALS[gameKey]?.[1] || GAME_TUTORIALS.stroop[1];

  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // Reset step whenever opened or level changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIdx(0);
    }
  }, [isOpen, level, gameKey]);

  const handleNextStep = useCallback(() => {
    if (currentStepIdx + 1 < tutorialConfig.steps.length) {
      setCurrentStepIdx((idx) => idx + 1);
    } else {
      if (onComplete) {
        onComplete();
      } else {
        onClose();
      }
    }
  }, [currentStepIdx, onComplete, onClose, tutorialConfig.steps.length]);

  const handlePreviousStep = useCallback(() => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((idx) => idx - 1);
    }
  }, [currentStepIdx]);

  if (!isOpen) return null;

  const currentStep = tutorialConfig.steps[currentStepIdx] || tutorialConfig.steps[0];
  const isFinalStep = currentStepIdx === tutorialConfig.steps.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1D3D]/75 backdrop-blur-sm animate-in fade-in duration-200 select-none"
    >
      <div className="relative w-full max-w-[620px] bg-white rounded-[28px] border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#FFE066] overflow-hidden flex flex-col justify-between min-h-[460px] animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="w-full bg-[#F8FAFC] border-b-2 border-slate-200 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <div>
              <h2
                id="tutorial-title"
                className="text-sm sm:text-base font-black text-[#0A1D3D]"
                style={{ fontFamily: JAKARTA }}
              >
                {tutorialConfig.gameTitle} Tutorial
              </h2>
              <span className="text-[11px] font-bold text-slate-500">
                {tutorialConfig.levelTitle}
              </span>
            </div>
          </div>

          {/* Skip Button (never blocks the child) */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-500 hover:text-[#0A1D3D] hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <span>Skip Guide</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Demonstration Canvas */}
        <div className="relative flex-1 p-6 flex flex-col items-center justify-center gap-6 overflow-hidden">
          {/* Active Tutorial Instruction Bubble */}
          <TutorialInstruction
            step={currentStep}
            currentStepIndex={currentStepIdx}
            totalSteps={tutorialConfig.steps.length}
          />

          {/* Interactive Simulated Demonstration Box */}
          <div className="relative w-full max-w-[460px] py-6 px-4 rounded-2xl bg-linear-to-b from-slate-50 to-[#EEF6FC] border-2 border-slate-200 shadow-inner flex flex-col items-center justify-center min-h-[160px]">
            {/* Animated Pointer demonstrating the target interaction */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center gap-2.5">
                <span className="text-2xl animate-pulse">🎯</span>
                <span
                  className="text-xs sm:text-sm font-black text-[#0A1D3D]"
                  style={{ fontFamily: JAKARTA }}
                >
                  Target: {currentStep.targetDescription}
                </span>
              </div>

              {/* Animated Floating Pointer */}
              <AnimatedHandPointer
                position={currentStep.pointerPosition}
                label={isFinalStep ? "Ready to play! 🚀" : "Look here! ✨"}
              />
            </div>
          </div>

          {/* Step Progress Dots */}
          <TutorialProgressIndicator
            currentStepIndex={currentStepIdx}
            totalSteps={tutorialConfig.steps.length}
            onSelectStep={(idx) => setCurrentStepIdx(idx)}
          />
        </div>

        {/* Bottom Actions Bar */}
        <div className="w-full bg-[#F8FAFC] border-t-2 border-slate-200 p-4 flex items-center justify-between gap-3">
          {/* Back Step or Reset */}
          {currentStepIdx > 0 ? (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="h-10 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              style={{ fontFamily: JAKARTA }}
            >
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStepIdx(0)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          )}

          {/* Forward Action: Next or Start Playing */}
          {isFinalStep ? (
            <button
              type="button"
              onClick={onComplete || onClose}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] transition-transform active:translate-y-0.5 cursor-pointer"
              style={{ fontFamily: JAKARTA }}
            >
              <Play className="w-4 h-4 fill-[#0A1D3D]" />
              <span>Start Playing! 🚀</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#0A1D3D] hover:bg-[#132c58] text-white font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#FFE066] transition-transform active:translate-y-0.5 cursor-pointer"
              style={{ fontFamily: JAKARTA }}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
