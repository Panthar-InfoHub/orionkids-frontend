import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PlayJourneyHeader } from "@/components/games/play-journey-header";
import { GameLevelHeader } from "@/components/games/game-level-header";
import { GameLevelCallout } from "@/components/games/game-level-callout";
import { CardFlipGameArena } from "@/components/games/card-flip/card-flip-game-arena";
import { QUEST_GAMES_METADATA } from "@/lib/api/quest";

export const metadata: Metadata = {
  title: "Card Flip | OrionKids",
  description:
    "Game 2 of 6: Cosmic Card Flip working memory challenge for young explorers. Find matching cosmic symbols.",
};

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface PageProps {
  searchParams?: Promise<{ level?: string; sessionId?: string; childId?: string }>;
}

async function CardFlipContent({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentLevel = parseInt(resolvedParams.level || "1", 10) || 1;
  const meta = QUEST_GAMES_METADATA["card-flip"];

  const levelSubtitle =
    meta.subtitles[currentLevel] || `Level ${currentLevel} · Cosmic Pairs`;

  const nextLevelText =
    meta.callouts[currentLevel] || "Match all cosmic pairs to advance your journey.";

  return (
    <>
      <GameLevelHeader
        title={meta.title}
        subtitle={levelSubtitle}
        currentLevel={currentLevel}
        totalLevels={3}
      />

      <CardFlipGameArena
        key={`card-flip-arena-level-${currentLevel}-${resolvedParams.sessionId || "nosess"}`}
        level={currentLevel}
        sessionId={resolvedParams.sessionId}
      />

      <GameLevelCallout
        primaryText={nextLevelText}
        secondaryText="We'll help you move forward. You can take a break anytime you want."
      />
    </>
  );
}

function CardFlipSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse" aria-busy="true">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-48 bg-[#D8DFE8] rounded-full" />
          <div className="h-9 w-72 bg-[#D8DFE8] rounded-lg" />
          <div className="h-4 w-40 bg-[#D8DFE8] rounded-full" />
        </div>
      </div>
      <div className="w-full min-h-[460px] bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#0A1D3D] border-t-[#FFD028] animate-spin" />
      </div>
    </div>
  );
}

export default function CardFlipPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F6FA] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <PlayJourneyHeader
        activeGameIndex={1}
        completedLevelsCount={3}
        totalLevelsCount={18}
      />

      <main className="max-w-[1264px] w-full mx-auto px-4 sm:px-8 lg:px-0 py-4 sm:py-6 flex-1 flex flex-col gap-6">
        <Suspense fallback={<CardFlipSkeleton />}>
          <CardFlipContent searchParams={searchParams} />
        </Suspense>
      </main>

      <footer className="w-full border-t border-[#D8DFE8] bg-transparent mt-8">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px] py-[22px] min-h-[58px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "11px",
              color: "#526176",
            }}
          >
            © 2026 OrionKids Digital Solutions Pvt. Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
