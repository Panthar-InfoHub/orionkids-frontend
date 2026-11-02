"use client";

import React from "react";
import { TutorialStep } from "@/types/game-tutorial";

interface TutorialInstructionProps {
  step: TutorialStep;
  currentStepIndex: number;
  totalSteps: number;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function TutorialInstruction({
  step,
  currentStepIndex,
  totalSteps,
}: TutorialInstructionProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-[520px] mx-auto p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] flex flex-col items-center text-center gap-2 select-none"
    >
      {/* Step Pill */}
      <span
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFE066] border border-[#0A1D3D] text-[#0A1D3D] text-[11px] font-black uppercase tracking-wider"
        style={{ fontFamily: JAKARTA }}
      >
        <span>Step {currentStepIndex + 1} of {totalSteps}</span>
      </span>

      {/* Main Instruction Headline */}
      <h3
        className="text-base sm:text-lg font-black text-[#0A1D3D] leading-snug"
        style={{ fontFamily: JAKARTA }}
      >
        {step.instruction}
      </h3>

      {/* Clarifying Sub-instruction */}
      {step.subInstruction && (
        <p
          className="text-xs sm:text-[13px] text-slate-600 font-semibold leading-relaxed"
          style={{ fontFamily: INTER }}
        >
          {step.subInstruction}
        </p>
      )}

      {/* Simulated Action Tag */}
      {step.simulatedActionText && (
        <div className="mt-1 px-3 py-1 rounded-full bg-[#EBF5FF] border border-[#00B4D8] text-[#0A1D3D] text-[11px] font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-ping" />
          <span>{step.simulatedActionText}</span>
        </div>
      )}
    </div>
  );
}
