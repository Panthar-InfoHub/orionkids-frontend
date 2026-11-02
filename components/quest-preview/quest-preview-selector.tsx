"use client";

import React from "react";
import { PreviewGameKey, PreviewLevel } from "@/types/quest-preview";
import { PREVIEW_GAMES_LIST } from "@/lib/data/quest-previews";

interface QuestPreviewSelectorProps {
  selectedGame: PreviewGameKey;
  selectedLevel: PreviewLevel;
  onSelectGame: (game: PreviewGameKey) => void;
  onSelectLevel: (level: PreviewLevel) => void;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function QuestPreviewSelector({
  selectedGame,
  selectedLevel,
  onSelectGame,
  onSelectLevel,
}: QuestPreviewSelectorProps) {
  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* 1. Game Selection Tabs */}
      <div
        role="tablist"
        aria-label="Select Game Preview"
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none px-1"
      >
        {PREVIEW_GAMES_LIST.map((game) => {
          const isSelected = selectedGame === game.key;
          return (
            <button
              key={game.key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectGame(game.key)}
              className={`shrink-0 h-9 sm:h-10 px-3 sm:px-4 rounded-xl flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[13px] font-extrabold border-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0A1D3D] text-white border-[#0A1D3D] shadow-[2px_2px_0_0_#FFE066] scale-[1.02]"
                  : "bg-white text-slate-700 hover:text-[#0A1D3D] border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
              style={{ fontFamily: JAKARTA }}
            >
              <span className="text-sm">{game.icon}</span>
              <span className="whitespace-nowrap">{game.shortTitle}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Level Pills (1, 2, 3) */}
      <div className="flex items-center justify-between gap-2 px-1">
        <span
          className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          Select Level:
        </span>
        <div
          role="group"
          aria-label="Select Game Level"
          className="flex items-center gap-1.5"
        >
          {([1, 2, 3] as PreviewLevel[]).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => onSelectLevel(lvl)}
                className={`h-7 sm:h-8 px-3 rounded-lg text-xs font-black border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#FFD028] text-[#0A1D3D] border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]"
                    : "bg-slate-50 hover:bg-white text-slate-600 border-slate-200"
                }`}
                style={{ fontFamily: JAKARTA }}
              >
                Level {lvl}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
