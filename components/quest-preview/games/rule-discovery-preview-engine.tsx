"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel, RuleDiscoveryBucket } from "@/types/quest-preview";
import { RULE_DISCOVERY_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface RuleDiscoveryPreviewEngineProps {
  level?: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function RuleDiscoveryPreviewEngine({
  level = 1,
  onComplete,
  showHint = true,
}: RuleDiscoveryPreviewEngineProps) {
  const config = RULE_DISCOVERY_PREVIEWS[level] || RULE_DISCOVERY_PREVIEWS[1];
  const [selectedBucketId, setSelectedBucketId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    setSelectedBucketId(null);
    setIsCorrect(null);
    setHintDismissed(false);
  }, [level]);

  const handleSelectBucket = (bucket: RuleDiscoveryBucket) => {
    setHintDismissed(true);
    setSelectedBucketId(bucket.id);

    const card = config.cardToSort;
    const matchesRule =
      config.ruleType === "color"
        ? bucket.color === card.color
        : config.ruleType === "shape"
        ? bucket.shape === card.shape
        : bucket.count === card.count;

    setIsCorrect(matchesRule);

    if (matchesRule) {
      const timer = setTimeout(() => {
        onComplete();
      }, 850);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Rule Explanation Banner */}
      <div className="mb-2 px-4 py-1.5 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200 text-center max-w-[420px]">
        <span>{config.ruleExplanation}</span>
      </div>

      {/* Card To Sort Container */}
      <div className="flex flex-col items-center gap-1.5 my-1.5">
        <span
          className="text-[11px] font-black uppercase tracking-wider text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          Card to Sort
        </span>
        <div className="px-6 py-2.5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center gap-2">
          <span className="text-xl">{config.cardToSort.label}</span>
        </div>
      </div>

      {/* Clear Correct / Incorrect Feedback Badge */}
      <div className="h-10 my-1.5 flex items-center justify-center text-center">
        {selectedBucketId !== null && (
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
                <span>CORRECT! Rule Matched! +1 Star 🌟</span>
              </>
            ) : (
              <>
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✕</span>
                <span>INCORRECT! Rule did not match. Check color, shape or count 👆</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Target Buckets Row */}
      <div
        role="group"
        aria-label="Target Sorting Buckets"
        className="grid grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-[420px]"
      >
        {config.targetBuckets.map((bucket) => {
          const isThisSelected = selectedBucketId === bucket.id;
          const isChosenCorrect = isThisSelected && isCorrect === true;
          const isChosenWrong = isThisSelected && isCorrect === false;
          const isHintTarget =
            showHint && !hintDismissed && bucket.id === config.hintBucketId;

          return (
            <div key={bucket.id} className="relative">
              <button
                type="button"
                onClick={() => handleSelectBucket(bucket)}
                className={`w-full py-3.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all cursor-pointer select-none ${
                  isChosenCorrect
                    ? "bg-emerald-50 border-emerald-500 shadow-[3px_3px_0_0_#10B981] scale-105"
                    : isChosenWrong
                    ? "bg-rose-50 text-rose-900 border-rose-500 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-black/20"
                  style={{ backgroundColor: bucket.color }}
                />
                <span
                  className="text-xs font-black text-center"
                  style={{ fontFamily: JAKARTA }}
                >
                  {bucket.label}
                </span>
                {isChosenCorrect && <span className="text-[10px] font-black text-emerald-700">✓ Matched</span>}
                {isChosenWrong && <span className="text-[10px] font-black text-rose-700">✕ Mismatch</span>}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Match rule! 🔀"
                  isVisible={true}
                  position="top"
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
