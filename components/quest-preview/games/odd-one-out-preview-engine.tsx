"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel, OddOneOutPreviewItem } from "@/types/quest-preview";
import { ODD_ONE_OUT_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface OddOneOutPreviewEngineProps {
  level: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

function seededShuffleCards<T>(items: T[], seedNumber: number): T[] {
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

function shuffleCards<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function OddOneOutPreviewEngine({
  level,
  onComplete,
  showHint = true,
}: OddOneOutPreviewEngineProps) {
  const config = ODD_ONE_OUT_PREVIEWS[level] || ODD_ONE_OUT_PREVIEWS[1];
  const [shuffledItems, setShuffledItems] = useState(() =>
    seededShuffleCards(config.items, level * 100)
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    setShuffledItems(shuffleCards(config.items));
    setSelectedId(null);
    setIsCorrect(null);
    setHintDismissed(false);
  }, [config.items, level]);

  const handleSelect = (item: OddOneOutPreviewItem) => {
    setHintDismissed(true);
    setSelectedId(item.id);
    setIsCorrect(item.isOdd);

    if (item.isOdd) {
      const timer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(timer);
    }
  };

  const selectedItem = config.items.find((i) => i.id === selectedId);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Category Hint Banner */}
      <div className="mb-3 px-4 py-1.5 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200">
        <span>Category: {config.categoryHint}</span>
      </div>

      {/* 4 Cards Grid */}
      <div
        role="group"
        aria-label="Odd One Out Choices"
        className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[360px]"
      >
        {shuffledItems.map((item) => {
          const isThisSelected = selectedId === item.id;
          const isChosenOdd = isThisSelected && item.isOdd;
          const isChosenWrong = isThisSelected && !item.isOdd;
          const isHintTarget =
            showHint && !hintDismissed && item.id === config.hintItemId;

          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className={`w-full py-4 px-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all cursor-pointer select-none ${
                  isChosenOdd
                    ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-[3px_3px_0_0_#10B981] scale-105"
                    : isChosenWrong
                    ? "bg-rose-50 text-rose-800 border-rose-400 shadow-[2px_2px_0_0_#F43F5E] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                <span className="text-3xl sm:text-4xl">{item.symbol}</span>
                <span
                  className="text-xs font-black text-center mt-1"
                  style={{ fontFamily: JAKARTA }}
                >
                  {item.label}
                </span>
                {isChosenOdd && <span className="text-xs font-bold">✨ Anomaly!</span>}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Spot the odd one! 🔍"
                  isVisible={true}
                  position="top"
                  onDismiss={() => setHintDismissed(true)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation Banner */}
      <div className="min-h-9 my-2 flex items-center justify-center max-w-[380px] text-center">
        {selectedItem && (
          <p
            className={`text-xs font-bold px-3 py-1 rounded-lg ${
              isCorrect
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
            style={{ fontFamily: JAKARTA }}
          >
            {isCorrect
              ? selectedItem.reason || "Spot on! That item does not belong."
              : "This belongs in the category. Look for the different one!"}
          </p>
        )}
      </div>
    </div>
  );
}
