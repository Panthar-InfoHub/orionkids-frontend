"use client";

import React from "react";
import { GameLevelPreviewMeta } from "@/types/quest-preview";

interface PreviewInstructionsProps {
  meta: GameLevelPreviewMeta;
  icon: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function PreviewInstructions({ meta, icon }: PreviewInstructionsProps) {
  return (
    <div className="w-full flex flex-col items-center text-center px-4 py-2 select-none">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        {/* Game Title Badge */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5FF] border border-[#0A1D3D] text-[#0A1D3D] text-[11px] font-black uppercase tracking-wider shadow-xs"
          style={{ fontFamily: JAKARTA }}
        >
          <span>{icon}</span>
          <span>{meta.gameTitle}</span>
        </span>

        {/* Preview Badge */}
        <span
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFE066] border border-[#0A1D3D] text-[#0A1D3D] text-[11px] font-black uppercase tracking-wider shadow-xs"
          style={{ fontFamily: JAKARTA }}
        >
          <span>Game Preview 🎮</span>
        </span>
      </div>

      {/* Objective Text */}
      <h3
        className="text-[#0A1D3D] text-sm sm:text-base font-extrabold max-w-[540px] leading-snug"
        style={{ fontFamily: JAKARTA }}
      >
        {meta.objective}
      </h3>

      {/* Hint Note */}
      <p className="text-slate-600 text-xs mt-1 font-semibold max-w-[500px]">
        {meta.hintInstruction}
      </p>
    </div>
  );
}
