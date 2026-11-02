"use client";

import React from "react";

interface TutorialProgressIndicatorProps {
  currentStepIndex: number;
  totalSteps: number;
  onSelectStep?: (index: number) => void;
}

export function TutorialProgressIndicator({
  currentStepIndex,
  totalSteps,
  onSelectStep,
}: TutorialProgressIndicatorProps) {
  return (
    <div
      role="tablist"
      aria-label="Tutorial Progress"
      className="flex items-center justify-center gap-2 select-none"
    >
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const isCurrent = idx === currentStepIndex;
        const isPassed = idx < currentStepIndex;

        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            aria-label={`Tutorial step ${idx + 1}`}
            onClick={() => onSelectStep?.(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              isCurrent
                ? "w-8 bg-[#FFD028] border border-[#0A1D3D]"
                : isPassed
                ? "w-2.5 bg-emerald-400 border border-[#0A1D3D]"
                : "w-2.5 bg-slate-200"
            }`}
          />
        );
      })}
    </div>
  );
}
