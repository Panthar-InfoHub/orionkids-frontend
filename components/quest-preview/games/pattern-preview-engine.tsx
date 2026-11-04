"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel } from "@/types/quest-preview";
import { PATTERN_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface PatternPreviewEngineProps {
  level?: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function PatternPreviewEngine({
  level = 1,
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
      }, 850);
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
                      ? "bg-rose-100 text-rose-800 border-rose-400 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
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

      {/* Prominent High-Visibility Feedback Banner */}
      <div className="h-10 my-2 flex items-center justify-center">
        {selectedSymbol !== null && (
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
                <span>CORRECT! Pattern Completed! +1 Star 🌟</span>
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✕</span>
                <span>INCORRECT! Look closely at the repeating symbols! Try again 👆</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Options Row */}
      <div
        role="group"
        aria-label="Pattern Choices"
        className="flex items-center justify-center gap-3 sm:gap-4 mt-1"
      >
        {config.options.map((opt) => {
          const isThisSelected = selectedSymbol === opt.symbol;
          const isChosenCorrect = isThisSelected && isCorrect === true;
          const isChosenWrong = isThisSelected && isCorrect === false;
          const isHintTarget =
            showHint && !hintDismissed && opt.symbol === config.hintSymbol;

          return (
            <div key={opt.symbol} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(opt.symbol, opt.isCorrect)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl border-2 transition-all cursor-pointer select-none ${
                  isChosenCorrect
                    ? "bg-emerald-100 border-emerald-600 shadow-[2px_2px_0_0_#059669] scale-105"
                    : isChosenWrong
                    ? "bg-rose-100 border-rose-500 text-rose-900 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                <span>{opt.symbol}</span>
                {isChosenCorrect && <span className="text-emerald-700 text-xs font-black absolute top-1 right-1">✓</span>}
                {isChosenWrong && <span className="text-rose-700 text-xs font-black absolute top-1 right-1">✕</span>}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Pick next! 🧩"
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
