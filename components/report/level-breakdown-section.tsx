"use client";

import React from "react";
import { CheckCircle2, Clock, Zap, Target } from "lucide-react";
import type { QuestReportData } from "@/lib/api/quest";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

const CANONICAL_GAMES_INFO: Record<
  string,
  { name: string; domain: string; emoji: string }
> = {
  stroop: {
    name: "Stroop Colour-Word",
    domain: "Focus & Interference Resistance",
    emoji: "🎨",
  },
  "card-flip": {
    name: "Card Flip Memory",
    domain: "Visual Working Memory",
    emoji: "🃏",
  },
  pattern: {
    name: "Pattern Recognition",
    domain: "Pattern Induction & Extrapolation",
    emoji: "🧩",
  },
  "odd-one-out": {
    name: "Odd One Out",
    domain: "Visual Feature Acuity",
    emoji: "🔍",
  },
  "rule-discovery": {
    name: "Rule Discovery",
    domain: "Hypothesis Testing & Flexibility",
    emoji: "🔀",
  },
  "story-sequencing": {
    name: "Story Sequencing",
    domain: "Temporal & Narrative Sequencing",
    emoji: "📖",
  },
};

export function LevelBreakdownSection({
  report,
}: {
  report?: QuestReportData | null;
}) {
  const childName = report?.childName || "Your Child";
  const aiReport = report?.aiReport;
  const gameSummaries = report?.gameSummaries || {};
  const levelWise = aiReport?.levelWisePerformance || [];

  const gameKeys = [
    "stroop",
    "card-flip",
    "pattern",
    "odd-one-out",
    "rule-discovery",
    "story-sequencing",
  ];

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#00BCD4] text-white flex items-center justify-center text-lg shadow-xs">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2
            className="text-[22px] sm:text-[26px] font-bold text-[#0A1D3D]"
            style={{ fontFamily: JAKARTA }}
          >
            18-Level Exploration Breakdown
          </h2>
          <p className="text-sm text-[#64748B]" style={{ fontFamily: JAKARTA }}>
            Actual measured progression across all 6 games and 18 levels completed by {childName}
          </p>
        </div>
      </div>

      {/* Grid of 6 Games with 3 Levels each */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameKeys.map((gKey) => {
          const info = CANONICAL_GAMES_INFO[gKey] || {
            name: gKey,
            domain: "Cognitive Domain",
            emoji: "🎮",
          };
          const summary = gameSummaries[gKey];
          const gameAnalysis = aiReport?.gameWiseAnalysis?.find(
            (g) => g.gameKey === gKey
          );

          const gameLevels = levelWise.filter((l) => l.gameKey === gKey);

          return (
            <div
              key={gKey}
              className="bg-white rounded-[22px] border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] p-5 flex flex-col justify-between gap-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl select-none">{info.emoji}</span>
                    <div>
                      <h3
                        className="text-base font-black text-[#0A1D3D]"
                        style={{ fontFamily: JAKARTA }}
                      >
                        {info.name}
                      </h3>
                      <p className="text-[11px] font-bold text-[#00838F]">
                        {info.domain}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shrink-0">
                    {summary?.averageAccuracy !== null && summary?.averageAccuracy !== undefined
                      ? `${Math.round(summary.averageAccuracy)}% Avg`
                      : "Completed"}
                  </span>
                </div>

                {/* AI / Observational summary */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {gameAnalysis?.summary ||
                    `${childName} successfully completed all 3 levels of ${info.name}, displaying focus and engagement.`}
                </p>

                {/* 3 Level Rows */}
                <div className="space-y-2">
                  {[1, 2, 3].map((lvlNum) => {
                    const matchedLevel = gameLevels.find(
                      (l) => l.levelNumber === lvlNum
                    );
                    const acc = matchedLevel?.accuracy;
                    const duration = matchedLevel?.durationMs;
                    const rt = matchedLevel?.averageReactionTimeMs;

                    return (
                      <div
                        key={lvlNum}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-black text-[#0A1D3D]">
                            Level {lvlNum}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px]">
                          {acc !== null && acc !== undefined && (
                            <span className="font-black text-emerald-700">
                              {acc}% Acc
                            </span>
                          )}
                          {duration && (
                            <span className="text-slate-500 font-medium inline-flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {Math.round(duration / 1000)}s
                            </span>
                          )}
                          {rt && (
                            <span className="text-slate-500 font-medium inline-flex items-center gap-0.5">
                              <Zap className="w-3 h-3 text-amber-500" />
                              {(rt / 1000).toFixed(1)}s
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

