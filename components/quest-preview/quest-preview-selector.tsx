"use client";

import React from "react";
import { PreviewGameKey, PreviewLevel } from "@/types/quest-preview";
import { PREVIEW_GAMES_LIST } from "@/lib/data/quest-previews";

interface QuestPreviewSelectorProps {
  selectedGame: PreviewGameKey;
  selectedLevel?: PreviewLevel;
  onSelectGame: (game: PreviewGameKey) => void;
  onSelectLevel?: (level: PreviewLevel) => void;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function QuestPreviewSelector({
  selectedGame,
  onSelectGame,
}: QuestPreviewSelectorProps) {
  return (
    <div className="w-full flex flex-col gap-2 select-none">
      <div className="flex items-center justify-between px-1">
        <span
          className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          Choose a Game to Preview:
        </span>
        <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          6 Games · 6 Previews
        </span>
      </div>

      {/* 6 Game Selection Tabs (1 preview per game) */}
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
              className={`shrink-0 h-10 px-3.5 sm:px-4 rounded-xl flex items-center gap-2 text-xs sm:text-[13px] font-extrabold border-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#0A1D3D] text-white border-[#0A1D3D] shadow-[2px_2px_0_0_#FFE066] scale-[1.02]"
                  : "bg-white text-slate-700 hover:text-[#0A1D3D] border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
              style={{ fontFamily: JAKARTA }}
            >
              <span className="text-base">{game.icon}</span>
              <span className="whitespace-nowrap">{game.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
