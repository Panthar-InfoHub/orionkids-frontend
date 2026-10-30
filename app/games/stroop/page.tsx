import React, { Suspense } from "react";
import type { Metadata } from "next";
import { PlayJourneyHeader } from "@/components/games/play-journey-header";
import { GameLevelHeader } from "@/components/games/game-level-header";
import { GameLevelCallout } from "@/components/games/game-level-callout";
import { StroopGameArena } from "@/components/games/stroop/stroop-game-arena";
import { getStroopTrials } from "@/lib/api/stroop";

export const metadata: Metadata = {
  title: "Stroop Colour-Word | OrionKids",
  description:
    "Game 1 of 6: Stroop colour-word cognitive skills activity for young learners. Spot the ink colour.",
};

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface PageProps {
  searchParams?: Promise<{ level?: string }>;
}

/**
 * Async Content component that awaits searchParams within a Suspense boundary.
 * Next.js PPR prerenders the static page shell and streams this component when dynamic parameters resolve.
 */
async function StroopGameContent({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentLevel = parseInt(resolvedParams.level || "1", 10) || 1;
  const trials = getStroopTrials(currentLevel);

  const levelSubtitle =
    currentLevel === 1
      ? "Level 1 · Colour Clues 🎨"
      : currentLevel === 2
      ? "Level 2 · Mixed-up words 🔮"
      : "Level 3 · Reverse Rules ⚡";

  const nextLevelText =
    currentLevel === 1
      ? "After you complete this level, you'll immediately start Level 2 · Mixed-up Words."
      : currentLevel === 2
      ? "After you complete this level, you'll immediately start Level 3 · Speed Challenge."
      : "You're playing the final level of Stroop! Reach for the stars.";

  return (
    <>
      {/* Game Title & Level 1/3 Indicators (Server Component) */}
      <GameLevelHeader
        title="Stroop colour-word ✨"
        subtitle={levelSubtitle}
        currentLevel={currentLevel}
        totalLevels={3}
      />

      {/* Interactive Cosmic Game Arena (Client Component) */}
      <StroopGameArena
        key={`stroop-arena-level-${currentLevel}`}
        trials={trials}
        level={currentLevel}
      />

      {/* Level Progression Callout Prompt (Server Component) */}
      <GameLevelCallout
        primaryText={nextLevelText}
        secondaryText="We'll help you move forward. You can take a break anytime you want."
      />
    </>
  );
}

function StroopGameSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse" aria-busy="true">
      {/* Header skeleton */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-48 bg-[#D8DFE8] rounded-full" />
          <div className="h-9 w-72 bg-[#D8DFE8] rounded-lg" />
          <div className="h-4 w-40 bg-[#D8DFE8] rounded-full" />
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <div className="h-4 w-32 bg-[#D8DFE8] rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] rounded-full bg-[#D8DFE8]" />
            <div className="w-[36px] h-[36px] rounded-full bg-[#D8DFE8]" />
            <div className="w-[36px] h-[36px] rounded-full bg-[#D8DFE8]" />
          </div>
        </div>
      </div>

      {/* Arena skeleton */}
      <div className="w-full min-h-[500px] bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(10,29,61,0.03)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#0A1D3D] border-t-[#FFD028] animate-spin" />
          <span
            className="text-sm font-bold text-[#526176]"
            style={{ fontFamily: JAKARTA }}
          >
            Loading challenge...
          </span>
        </div>
      </div>

      {/* Callout skeleton */}
      <div className="w-full h-16 rounded-[16px] bg-[#E2E8F0]/60" />
    </div>
  );
}

/**
 * Server Component: Orchestrates the Stroop Game Page.
 * Handles page framing, metadata, journey indicators, and wraps runtime searchParams access in Suspense.
 */
export default function StroopGamePage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F6FA] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* 1. Header with Journey Pathway & 6 Game Stepper (Server Component) */}
      <PlayJourneyHeader
        activeGameIndex={0}
        completedLevelsCount={0}
        totalLevelsCount={18}
      />

      {/* 2. Main Content Container */}
      <main className="max-w-[1264px] w-full mx-auto px-4 sm:px-8 lg:px-0 py-4 sm:py-6 flex-1 flex flex-col gap-6">
        <Suspense fallback={<StroopGameSkeleton />}>
          <StroopGameContent searchParams={searchParams} />
        </Suspense>
      </main>

      {/* 3. Bottom Legal & Diagnostic Disclaimer Footer (Server Component) */}
      <footer className="w-full border-t border-[#D8DFE8] bg-transparent mt-8">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px] py-[22px] min-h-[58px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "11px",
              lineHeight: "100%",
              color: "#526176",
            }}
          >
            © 2026 OrionKids Digital Solutions Pvt. Ltd.
          </p>
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "11px",
              lineHeight: "100%",
              color: "#526176",
            }}
          >
            Assessment insights for learning and development. Not clinical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
}
