import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PlayJourneyHeader } from "@/components/games/play-journey-header";
import { GameLevelHeader } from "@/components/games/game-level-header";
import { GameLevelCallout } from "@/components/games/game-level-callout";
import { PatternGameArena } from "@/components/games/pattern/pattern-game-arena";
import { QUEST_GAMES_METADATA } from "@/lib/api/quest";

export const metadata: Metadata = {
  title: "Pattern Recognition | OrionKids",
  description: "Game 3 of 6: Spot glowing cosmic sequence patterns and complete the constellation.",
};

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface PageProps {
  searchParams?: Promise<{ level?: string; sessionId?: string; childId?: string }>;
}

async function PatternContent({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentLevel = parseInt(resolvedParams.level || "1", 10) || 1;
  const meta = QUEST_GAMES_METADATA["pattern"];

  return (
    <>
      <GameLevelHeader
        title={meta.title}
        subtitle={meta.subtitles[currentLevel] || `Level ${currentLevel}`}
        currentLevel={currentLevel}
        totalLevels={3}
      />
      <PatternGameArena
        key={`pattern-arena-${currentLevel}-${resolvedParams.sessionId || "nosess"}`}
        level={currentLevel}
        sessionId={resolvedParams.sessionId}
      />
      <GameLevelCallout
        primaryText={meta.callouts[currentLevel] || "Find the missing piece in the sequence."}
        secondaryText="We'll help you move forward. You can take a break anytime you want."
      />
    </>
  );
}

export default function PatternPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F6FA] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <PlayJourneyHeader activeGameIndex={2} completedLevelsCount={6} totalLevelsCount={18} />
      <main className="max-w-[1264px] w-full mx-auto px-4 sm:px-8 lg:px-0 py-4 sm:py-6 flex-1 flex flex-col gap-6">
        <Suspense fallback={<div className="w-full min-h-[460px] flex items-center justify-center"><div className="w-12 h-12 rounded-full border-4 border-t-[#FFD028] animate-spin" /></div>}>
          <PatternContent searchParams={searchParams} />
        </Suspense>
      </main>
      <footer className="w-full border-t border-[#D8DFE8] py-4 text-center text-xs text-[#526176]" style={{ fontFamily: JAKARTA }}>
        © 2026 OrionKids Digital Solutions Pvt. Ltd.
      </footer>
    </div>
  );
}
