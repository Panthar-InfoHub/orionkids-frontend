"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PreviewGameKey, PreviewLevel } from "@/types/quest-preview";
import { GAME_PREVIEW_METADATA, PREVIEW_METADATA, PREVIEW_GAMES_LIST } from "@/lib/data/quest-previews";
import { QuestPreviewSelector } from "./quest-preview-selector";
import { PreviewInstructions } from "./preview-instructions";
import { PreviewCompletion } from "./preview-completion";
import { PreviewReplayButton } from "./preview-replay-button";
import { StroopPreviewEngine } from "./games/stroop-preview-engine";
import { CardFlipPreviewEngine } from "./games/card-flip-preview-engine";
import { PatternPreviewEngine } from "./games/pattern-preview-engine";
import { OddOneOutPreviewEngine } from "./games/odd-one-out-preview-engine";
import { RuleDiscoveryPreviewEngine } from "./games/rule-discovery-preview-engine";
import { StorySequencingPreviewEngine } from "./games/story-sequencing-preview-engine";
import { fetchCurrentUserProfile, getRouteForUserProfile } from "@/lib/api/auth";

interface QuestPreviewContainerProps {
  initialGame?: PreviewGameKey;
  initialLevel?: PreviewLevel;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function QuestPreviewContainer({
  initialGame = "stroop",
  className = "",
}: QuestPreviewContainerProps) {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<PreviewGameKey>(initialGame);
  const [isCompleted, setIsCompleted] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  const activeGameMeta = PREVIEW_GAMES_LIST.find((g) => g.key === selectedGame) || PREVIEW_GAMES_LIST[0];
  const previewMeta = GAME_PREVIEW_METADATA[selectedGame] || PREVIEW_METADATA[selectedGame][1];

  const handleGameChange = (game: PreviewGameKey) => {
    setSelectedGame(game);
    setIsCompleted(false);
    setReplayKey((k) => k + 1);
  };

  const handleReplay = useCallback(() => {
    setIsCompleted(false);
    setReplayKey((k) => k + 1);
  }, []);

  const handleLaunchFullQuest = async () => {
    if (isLaunching) return;
    setIsLaunching(true);
    try {
      const profile = await fetchCurrentUserProfile();
      if (!profile) {
        router.push("/login?redirect=%2Fonboarding");
        return;
      }

      const destination = getRouteForUserProfile(profile);
      router.push(destination);
    } catch {
      router.push("/login?redirect=%2Fonboarding");
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div
      className={`w-full bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.06)] border-2 border-[#0A1D3D] ${className}`}
    >
      {/* 1. Header Bar: 6 Games Selection (1 preview per game) */}
      <div className="w-full bg-[#F8FAFC] border-b-2 border-slate-200 p-3 sm:p-4">
        <QuestPreviewSelector
          selectedGame={selectedGame}
          onSelectGame={handleGameChange}
        />
      </div>

      {/* 2. Sub-header: Active Game Meta & Objective */}
      <div className="w-full bg-white border-b border-slate-100 pt-3 pb-2 px-3 sm:px-4 flex items-center justify-between gap-2">
        <div className="flex-1">
          <PreviewInstructions meta={previewMeta} icon={activeGameMeta.icon} />
        </div>
        {!isCompleted && (
          <div className="shrink-0 self-start mt-2">
            <PreviewReplayButton onReplay={handleReplay} size="sm" />
          </div>
        )}
      </div>

      {/* 3. Main Interactive Screen (Mini-Game Arena for Selected Game) */}
      <div className="relative w-full min-h-[380px] sm:min-h-[420px] bg-linear-to-b from-slate-50/60 to-white flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {isCompleted ? (
          <PreviewCompletion
            levelTitle={`${activeGameMeta.title} Preview`}
            feedbackMessage={`Great focus! You've mastered the core mechanic of ${activeGameMeta.title}. Ready for the complete 18-level journey?`}
            onReplay={handleReplay}
            onLaunchFullQuest={handleLaunchFullQuest}
            isLaunching={isLaunching}
          />
        ) : (
          <div key={`${selectedGame}-${replayKey}`} className="w-full flex items-center justify-center">
            {selectedGame === "stroop" && (
              <StroopPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
            {selectedGame === "card-flip" && (
              <CardFlipPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
            {selectedGame === "pattern" && (
              <PatternPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
            {selectedGame === "odd-one-out" && (
              <OddOneOutPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
            {selectedGame === "rule-discovery" && (
              <RuleDiscoveryPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
            {selectedGame === "story-sequencing" && (
              <StorySequencingPreviewEngine
                level={1}
                onComplete={() => setIsCompleted(true)}
              />
            )}
          </div>
        )}
      </div>

      {/* 4. Footer Bar */}
      <div className="w-full bg-[#FCE5DE]/60 border-t-2 border-slate-200 py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-slate-600 text-xs font-semibold text-center sm:text-left leading-normal"
          style={{ fontFamily: INTER }}
        >
          🎮 Interactive Game Preview · Completely isolated from actual quest records.
        </p>

        <button
          type="button"
          onClick={handleLaunchFullQuest}
          disabled={isLaunching}
          className="inline-flex items-center gap-1.5 px-5 h-9 bg-[#FFD243] hover:bg-[#FBC02D] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:scale-105 active:scale-95 transition-all cursor-pointer font-black text-xs shrink-0 disabled:opacity-60"
          style={{ fontFamily: JAKARTA }}
        >
          <span>{isLaunching ? "Opening Quest..." : "Play Full Quest"}</span>
          <span className="font-bold">→</span>
        </button>
      </div>
    </div>
  );
}
