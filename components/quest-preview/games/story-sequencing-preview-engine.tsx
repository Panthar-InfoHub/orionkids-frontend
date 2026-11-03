"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel, StorySequencingPreviewStep } from "@/types/quest-preview";
import { STORY_SEQUENCING_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";
import { RotateCcw } from "lucide-react";

interface StorySequencingPreviewEngineProps {
  level?: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function StorySequencingPreviewEngine({
  level = 1,
  onComplete,
  showHint = true,
}: StorySequencingPreviewEngineProps) {
  const config = STORY_SEQUENCING_PREVIEWS[level] || STORY_SEQUENCING_PREVIEWS[1];
  const [placedSteps, setPlacedSteps] = useState<StorySequencingPreviewStep[]>([]);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [isWrongOrder, setIsWrongOrder] = useState(false);
  const [isCompleteSuccess, setIsCompleteSuccess] = useState(false);

  useEffect(() => {
    setPlacedSteps([]);
    setHintDismissed(false);
    setIsWrongOrder(false);
    setIsCompleteSuccess(false);
  }, [level]);

  const handlePickStep = (step: StorySequencingPreviewStep) => {
    if (placedSteps.some((s) => s.id === step.id) || isCompleteSuccess) return;
    setHintDismissed(true);

    const newPlaced = [...placedSteps, step];
    setPlacedSteps(newPlaced);
    setIsWrongOrder(false);

    // Check if all steps have been placed
    if (newPlaced.length === config.steps.length) {
      const isAllCorrect = newPlaced.every(
        (s, idx) => s.order === idx + 1
      );

      if (isAllCorrect) {
        setIsCompleteSuccess(true);
        const timer = setTimeout(() => {
          onComplete();
        }, 900);
        return () => clearTimeout(timer);
      } else {
        setIsWrongOrder(true);
      }
    }
  };

  const handleRemovePlaced = (stepId: number) => {
    if (isCompleteSuccess) return;
    setPlacedSteps(placedSteps.filter((s) => s.id !== stepId));
    setIsWrongOrder(false);
  };

  const handleResetTimeline = () => {
    if (isCompleteSuccess) return;
    setPlacedSteps([]);
    setIsWrongOrder(false);
  };

  const unplacedSteps = config.shuffledSteps.filter(
    (step) => !placedSteps.some((p) => p.id === step.id)
  );

  const nextOrderNeeded = placedSteps.length + 1;
  const targetStepForHint = config.shuffledSteps.find(
    (s) => s.order === nextOrderNeeded
  );

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Mission Title */}
      <div className="mb-2 px-4 py-1.5 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200">
        <span>Mission: {config.missionTitle}</span>
      </div>

      {/* Clear Correct / Incorrect Feedback Badge */}
      <div className="h-10 my-1 flex items-center justify-center text-center">
        {isCompleteSuccess && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-[2px_2px_0_0_#059669] animate-in fade-in zoom-in-95 duration-150"
            style={{ fontFamily: JAKARTA }}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
            <span>CORRECT! Story sequence completed in order! +1 Star 🌟</span>
          </div>
        )}
        {isWrongOrder && (
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs bg-rose-100 text-rose-900 border-2 border-rose-500 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
            style={{ fontFamily: JAKARTA }}
          >
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✕</span>
            <span>INCORRECT! Story steps are out of order. Tap a card to re-order 👆</span>
          </div>
        )}
      </div>

      {/* Story Timeline Slots (Chronological 1 -> N) */}
      <div className="w-full max-w-[440px] mb-3">
        <span
          className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5 block text-center"
          style={{ fontFamily: JAKARTA }}
        >
          Storyline Sequence
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {config.steps.map((_, idx) => {
            const placed = placedSteps[idx];
            return (
              <div
                key={idx}
                className={`min-h-[72px] sm:min-h-[80px] p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  placed
                    ? isCompleteSuccess
                      ? "bg-emerald-50 border-emerald-500 shadow-[2px_2px_0_0_#10B981]"
                      : isWrongOrder
                      ? "bg-rose-50 border-rose-500 text-rose-950 animate-wobble cursor-pointer"
                      : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] cursor-pointer hover:bg-rose-50"
                    : "bg-slate-50 border-dashed border-slate-300 text-slate-400"
                }`}
                onClick={() => placed && handleRemovePlaced(placed.id)}
                title={placed ? "Click to remove from timeline" : `Step ${idx + 1}`}
              >
                {placed ? (
                  <>
                    <span className="text-lg sm:text-xl">{placed.icon}</span>
                    <span className="text-[10px] font-bold text-[#0A1D3D] leading-tight line-clamp-2 mt-0.5">
                      {placed.text}
                    </span>
                    {isCompleteSuccess && <span className="text-[9px] font-black text-emerald-700">✓</span>}
                    {isWrongOrder && <span className="text-[9px] font-black text-rose-700">✕</span>}
                  </>
                ) : (
                  <span className="text-xs font-black text-slate-400">
                    Step {idx + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Cards Pool */}
      <div className="w-full max-w-[440px] flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-1.5 px-1">
          <span
            className="text-[11px] font-black uppercase tracking-wider text-slate-500"
            style={{ fontFamily: JAKARTA }}
          >
            Available Steps:
          </span>
          {placedSteps.length > 0 && !isCompleteSuccess && (
            <button
              type="button"
              onClick={handleResetTimeline}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-[#0A1D3D] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          {unplacedSteps.map((step) => {
            const isHintTarget =
              showHint &&
              !hintDismissed &&
              targetStepForHint?.id === step.id;

            return (
              <div key={step.id} className="relative w-full">
                <button
                  type="button"
                  onClick={() => handlePickStep(step)}
                  className={`w-full p-2.5 sm:p-3 rounded-xl flex items-center gap-3 bg-white hover:bg-slate-50 text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] text-left transition-all cursor-pointer active:translate-y-0.5 ${
                    isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""
                  }`}
                >
                  <span className="text-xl shrink-0">{step.icon}</span>
                  <span
                    className="text-xs sm:text-[13px] font-bold text-[#0A1D3D]"
                    style={{ fontFamily: JAKARTA }}
                  >
                    {step.text}
                  </span>
                </button>

                {isHintTarget && (
                  <InteractiveHint
                    label="Place step! 🚀"
                    isVisible={true}
                    position="right"
                    onDismiss={() => setHintDismissed(true)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
