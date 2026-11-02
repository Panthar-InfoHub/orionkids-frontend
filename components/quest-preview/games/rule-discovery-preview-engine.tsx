"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel, RuleDiscoveryBucket } from "@/types/quest-preview";
import { RULE_DISCOVERY_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface RuleDiscoveryPreviewEngineProps {
  level: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function RuleDiscoveryPreviewEngine({
  level,
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
      }, 700);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Rule Explanation Banner */}
      <div className="mb-3 px-4 py-1.5 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200 text-center max-w-[420px]">
        <span>{config.ruleExplanation}</span>
      </div>

      {/* Card To Sort Container */}
      <div className="flex flex-col items-center gap-1.5 my-2">
        <span
          className="text-[11px] font-black uppercase tracking-wider text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          Card to Sort
        </span>
        <div className="px-6 py-3 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center gap-2">
          <span className="text-xl">{config.cardToSort.label}</span>
        </div>
      </div>

      {/* Feedback Banner */}
      <div className="h-7 my-2 flex items-center justify-center">
        {selectedBucketId !== null && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black animate-in fade-in zoom-in-95 duration-150 ${
              isCorrect
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-rose-100 text-rose-800 border border-rose-300 animate-wobble"
            }`}
            style={{ fontFamily: JAKARTA }}
          >
            {isCorrect ? "✨ Rule Matched! +1 Star" : "❌ Rule did not match. Check the rule hint!"}
          </span>
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
                className={`w-full py-3.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all cursor-pointer select-none text-center ${
                  isChosenCorrect
                    ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-[3px_3px_0_0_#10B981] scale-105"
                    : isChosenWrong
                    ? "bg-rose-50 text-rose-800 border-rose-400 shadow-[2px_2px_0_0_#F43F5E] animate-wobble"
                    : "bg-white text-[#0A1D3D] hover:bg-slate-50 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                <span className="text-xs sm:text-[13px] font-black leading-tight">
                  {bucket.label}
                </span>
                {isChosenCorrect && <span className="text-xs">🌟 Matched</span>}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label="Match here! 🔀"
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
