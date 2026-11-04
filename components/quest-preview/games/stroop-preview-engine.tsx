"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel } from "@/types/quest-preview";
import { STROOP_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface StroopPreviewEngineProps {
  level?: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function StroopPreviewEngine({
  level = 1,
  onComplete,
  showHint = true,
}: StroopPreviewEngineProps) {
  const config = STROOP_PREVIEWS[level] || STROOP_PREVIEWS[1];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  // Reset when level or game changes
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setHintDismissed(false);
  }, [level]);

  const handleSelect = (optionLabel: string, isOptionCorrect: boolean) => {
    setHintDismissed(true);
    setSelectedOption(optionLabel);
    setIsCorrect(isOptionCorrect);

    if (isOptionCorrect) {
      const timer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Rule Banner */}
      <div className="mb-3 px-4 py-1.5 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200">
        <span>{config.ruleDescription}</span>
      </div>

      {/* Stimulus Word Container */}
      <div className="relative my-2 py-4 px-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner flex items-center justify-center min-w-[200px]">
        <span
          className="text-4xl sm:text-5xl font-black tracking-wider transition-transform duration-200"
          style={{
            fontFamily: JAKARTA,
            color: config.inkColor,
          }}
        >
          {config.word}
        </span>
      </div>

      {/* Clear Correct / Incorrect Feedback Badge */}
      <div className="h-10 my-2 flex items-center justify-center">
        {selectedOption !== null && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-xs animate-in fade-in zoom-in-95 duration-150 ${
              isCorrect
                ? "bg-emerald-100 text-emerald-900 border-2 border-emerald-500 shadow-[2px_2px_0_0_#059669]"
                : "bg-rose-100 text-rose-900 border-2 border-rose-500 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
            }`}
            style={{ fontFamily: JAKARTA }}
          >
            {isCorrect ? (
              <>
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                <span>CORRECT! Spot on! +1 Star 🌟</span>
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✕</span>
                <span>INCORRECT! Look at the ink colour, not what the word says!</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Options Row */}
      <div
        role="group"
        aria-label="Color Options"
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 max-w-[420px]"
      >
        {config.options.map((opt) => {
          const isThisSelected = selectedOption === opt.label;
          const isChosenCorrect = isThisSelected && isCorrect === true;
          const isChosenWrong = isThisSelected && isCorrect === false;
          const isHintTarget =
            showHint && !hintDismissed && opt.label === config.hintOptionLabel;

          return (
            <div key={opt.label} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(opt.label, opt.isCorrect)}
                className={`relative h-12 sm:h-14 px-5 sm:px-6 rounded-2xl flex items-center justify-center gap-2.5 font-black text-sm sm:text-base border-2 transition-all cursor-pointer select-none ${
                  isChosenCorrect
                    ? "bg-emerald-100 text-emerald-900 border-emerald-600 shadow-[2px_2px_0_0_#059669] scale-105"
                    : isChosenWrong
                    ? "bg-rose-100 text-rose-900 border-rose-500 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
                style={{ fontFamily: JAKARTA }}
              >
                <span
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 border-2 border-[#0A1D3D] shadow-sm"
                  style={{ backgroundColor: opt.dotColor }}
                />
                <span>{opt.label}</span>
                {isChosenCorrect && <span className="text-emerald-700 font-extrabold">✓</span>}
                {isChosenWrong && <span className="text-rose-700 font-extrabold">✕</span>}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Tap here! 🎨"
                  isVisible={true}
                  position="bottom"
                  onDismiss={() => setHintDismissed(true)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
