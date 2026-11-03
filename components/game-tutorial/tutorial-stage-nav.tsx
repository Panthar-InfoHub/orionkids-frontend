"use client";

import React from "react";
import { TutorialStageId } from "@/types/game-tutorial";
import { Check } from "lucide-react";

interface TutorialStageNavProps {
  currentStage: TutorialStageId;
  completedStages: TutorialStageId[];
  onSelectStage: (stage: TutorialStageId) => void;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

const STAGES: { id: TutorialStageId; label: string; icon: string }[] = [
  { id: "SHOW_ME", label: "Show Me", icon: "👁️" },
  { id: "LET_ME_TRY", label: "Let Me Try", icon: "🎮" },
  { id: "READY_TO_PLAY", label: "Ready!", icon: "🚀" },
];

export function TutorialStageNav({
  currentStage,
  completedStages,
  onSelectStage,
  className = "",
}: TutorialStageNavProps) {
  return (
    <nav
      aria-label="Tutorial Stages"
      className={`flex items-center justify-center gap-1.5 sm:gap-2.5 select-none ${className}`}
    >
      {STAGES.map((s, idx) => {
        const isCurrent = currentStage === s.id;
        const isDone = completedStages.includes(s.id);

        return (
          <React.Fragment key={s.id}>
            <button
              type="button"
              onClick={() => onSelectStage(s.id)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 text-[11px] sm:text-xs font-black transition-all cursor-pointer ${
                isCurrent
                  ? "bg-[#FFE066] text-[#0A1D3D] border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] scale-105"
                  : isDone
                  ? "bg-emerald-100 text-emerald-900 border-emerald-500 shadow-xs hover:bg-emerald-200"
                  : "bg-white text-slate-500 border-slate-300 hover:border-slate-400"
              }`}
              style={{ fontFamily: JAKARTA }}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isDone && !isCurrent ? (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              ) : (
                <span>{s.icon}</span>
              )}
              <span>{s.label}</span>
            </button>

            {idx < STAGES.length - 1 && (
              <span className="text-slate-300 text-xs font-bold" aria-hidden="true">
                →
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

