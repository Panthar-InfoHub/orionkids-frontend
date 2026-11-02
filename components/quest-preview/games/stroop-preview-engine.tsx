"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel } from "@/types/quest-preview";
import { STROOP_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface StroopPreviewEngineProps {
  level: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function StroopPreviewEngine({
  level,
  onComplete,
  showHint = true,
}: StroopPreviewEngineProps) {
  const config = STROOP_PREVIEWS[level] || STROOP_PREVIEWS[1];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  // Reset when level changes
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
      }, 700);
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

      {/* Feedback Badge */}
      <div className="h-7 my-2 flex items-center justify-center">
        {selectedOption !== null && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black animate-in fade-in zoom-in-95 duration-150 ${
              isCorrect
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-rose-100 text-rose-800 border border-rose-300 animate-wobble"
            }`}
            style={{ fontFamily: JAKARTA }}
          >
            {isCorrect ? "🌟 Spot on! +1 Star" : "🙈 Oops! Look at the ink colour!"}
          </span>
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
                    ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-[2px_2px_0_0_#10B981] scale-105"
                    : isChosenWrong
                    ? "bg-rose-50 text-rose-800 border-rose-400 shadow-[2px_2px_0_0_#F43F5E] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
                style={{ fontFamily: JAKARTA }}
              >
                <span
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 border-2 border-[#0A1D3D] shadow-sm"
                  style={{ backgroundColor: opt.dotColor }}
                />
                <span>{opt.label}</span>
                {isChosenCorrect && <span>🌟</span>}
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
