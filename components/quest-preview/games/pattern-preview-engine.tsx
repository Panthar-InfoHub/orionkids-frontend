"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel } from "@/types/quest-preview";
import { PATTERN_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface PatternPreviewEngineProps {
  level: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function PatternPreviewEngine({
  level,
  onComplete,
  showHint = true,
}: PatternPreviewEngineProps) {
  const config = PATTERN_PREVIEWS[level] || PATTERN_PREVIEWS[1];
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    setSelectedSymbol(null);
    setIsCorrect(null);
    setHintDismissed(false);
  }, [level]);

  const handleSelect = (symbol: string, correct: boolean) => {
    setHintDismissed(true);
    setSelectedSymbol(symbol);
    setIsCorrect(correct);

    if (correct) {
      const timer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Sequence Display Box */}
      <div className="w-full max-w-[440px] p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-inner flex flex-col items-center gap-2">
        <span
          className="text-xs font-black uppercase tracking-wider text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          Cosmic Sequence
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
          {config.sequence.map((item, idx) => {
            const isMissingSlot = idx === config.missingIndex;
            const filledContent =
              isMissingSlot && isCorrect ? selectedSymbol : item;

            return (
              <div
                key={idx}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black border-2 transition-all duration-200 ${
                  isMissingSlot
                    ? isCorrect
                      ? "bg-emerald-100 text-emerald-800 border-emerald-500 shadow-[2px_2px_0_0_#10B981] animate-in zoom-in-75"
                      : isCorrect === false
                      ? "bg-rose-100 text-rose-800 border-rose-400 animate-wobble"
                      : "bg-[#FFE066] text-[#0A1D3D] border-[#0A1D3D] border-dashed shadow-[2px_2px_0_0_#0A1D3D] animate-pulse"
                    : "bg-white text-[#0A1D3D] border-slate-300 shadow-xs"
                }`}
              >
                {filledContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Alert */}
      <div className="h-7 my-2 flex items-center justify-center">
        {selectedSymbol !== null && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black animate-in fade-in zoom-in-95 duration-150 ${
              isCorrect
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-rose-100 text-rose-800 border border-rose-300 animate-wobble"
            }`}
            style={{ fontFamily: JAKARTA }}
          >
            {isCorrect ? "✨ Pattern Completed! +1 Star" : "🧩 Look closer at the sequence!"}
          </span>
        )}
      </div>

      {/* Options Row */}
      <div
        role="group"
        aria-label="Pattern Options"
        className="flex items-center justify-center gap-3 sm:gap-4 mt-1"
      >
        {config.options.map((opt) => {
          const isThisSelected = selectedSymbol === opt.symbol;
          const isHintTarget =
            showHint && !hintDismissed && opt.symbol === config.hintSymbol;

          return (
            <div key={opt.symbol} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(opt.symbol, opt.isCorrect)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl border-2 transition-all cursor-pointer select-none ${
                  isThisSelected && isCorrect
                    ? "bg-emerald-50 border-emerald-500 shadow-[2px_2px_0_0_#10B981] scale-105"
                    : isThisSelected && isCorrect === false
                    ? "bg-rose-50 border-rose-400 shadow-[2px_2px_0_0_#F43F5E] animate-wobble"
                    : "bg-white hover:bg-slate-50 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                {opt.symbol}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Pick this! 🧩"
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
