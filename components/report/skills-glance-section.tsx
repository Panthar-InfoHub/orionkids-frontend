"use client";

import React from "react";

const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
type Tone = "strong" | "growth";

interface Skill {
  icon: string;
  tile: string;
  title: string;
  games: string;
  score: number;
  badge: string;
  percentile: string;
  tone: Tone;
  note: string;
}

const SKILLS: Skill[] = [
  {
    icon: "🎯",
    tile: "#A7F3D0",
    title: "Attention & Focus",
    games: "Game: Colour Tap",
    score: 89,
    badge: "89th • Strong",
    percentile: "89th Percentile",
    tone: "strong",
    note: "Maintained rapid, accurate responses and resisted distractions even when colour names and ink conflicted. High natural inhibition control!",
  },
  {
    icon: "🧩",
    tile: "#D1FAE5",
    title: "Memory & Recall",
    games: "Game: Card Flip",
    score: 84,
    badge: "84th • Strong",
    percentile: "84th Percentile",
    tone: "strong",
    note: "Quickly remembered spatial placements and almost never revisited mistaken cards. Strong working visual memory for early reading and numbers.",
  },
  {
    icon: "🔍",
    tile: "#FEF3C7",
    title: "Reasoning & Problem Solving",
    games: "Games: Pattern Puzzle, Odd One Out",
    score: 22,
    badge: "22nd • Growing Focus",
    percentile: "22nd Percentile",
    tone: "growth",
    note: "Showed tenacity on every attempt. Decoding multi-step color/shape sequences is actively forming and accelerates swiftly with physical toys.",
  },
  {
    icon: "🔄",
    tile: "#FEF3C7",
    title: "Flexible Thinking & Planning",
    games: "Games: Rule Detective, Story Order",
    score: 23,
    badge: "23rd • Growing Focus",
    percentile: "23rd Percentile",
    tone: "growth",
    note: "Demonstrated great curiosity figuring out first rules. Adapting when rules switch and sequencing narrative picture steps are next developmental horizons.",
  },
];

const TONES: Record<
  Tone,
  {
    border: string;
    glow: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    dot: string;
    pct: string;
    fill: string;
  }
> = {
  strong: {
    border: "#D1FAE5",
    glow: "rgba(209,250,229,0.2)",
    badgeBg: "#D1FAE5",
    badgeBorder: "#A7F3D0",
    badgeText: "#065F46",
    dot: "#059669",
    pct: "#047857",
    fill: "linear-gradient(90deg, #10B981 0%, #14B8A6 100%)",
  },
  growth: {
    border: "#FEF6D5",
    glow: "rgba(254,243,199,0.2)",
    badgeBg: "#FEF3C7",
    badgeBorder: "#FDE68A",
    badgeText: "#92400E",
    dot: "#F59E0B",
    pct: "#B45309",
    fill: "linear-gradient(90deg, #FBBF24 0%, #F8953B 100%)",
  },
};

/* 0–25 pale amber · 25–75 pale blue · 75–100 pale green */
const TRACK =
  "linear-gradient(90deg, #F4E5BA 0%, #F4E5BA 25%, #BAE4F9 25%, #BAE4F9 75%, #B9EBDC 75%, #B9EBDC 100%)";

import type { QuestReportData } from "@/lib/api/quest";

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export function SkillsGlanceSection({ report }: { report?: QuestReportData | null }) {
  const dynamicSkills: Skill[] = report?.cognitiveFacets ? [
    {
      icon: "🎯",
      tile: "#A7F3D0",
      title: "Attention & Focus (Stroop)",
      games: "Game 1: Stroop Colour-Word",
      score: report.cognitiveFacets.focusInhibition?.score ?? 89,
      badge: `${report.cognitiveFacets.focusInhibition?.score ?? 89}% Accuracy`,
      percentile: `${report.cognitiveFacets.focusInhibition?.score ?? 89}th Percentile`,
      tone: (report.cognitiveFacets.focusInhibition?.score ?? 89) >= 75 ? "strong" : "growth",
      note: "Maintained focus and resisted colour-word interference across all 3 Stroop levels.",
    },
    {
      icon: "🧩",
      tile: "#D1FAE5",
      title: "Visual Working Memory",
      games: "Game 2: Cosmic Card Flip",
      score: report.cognitiveFacets.workingMemory?.score ?? 84,
      badge: `${report.cognitiveFacets.workingMemory?.score ?? 84}% Accuracy`,
      percentile: `${report.cognitiveFacets.workingMemory?.score ?? 84}th Percentile`,
      tone: (report.cognitiveFacets.workingMemory?.score ?? 84) >= 75 ? "strong" : "growth",
      note: "Efficiently remembered card locations with minimal revisit errors across 4, 6, and 8 card pairs.",
    },
    {
      icon: "🔍",
      tile: "#FEF3C7",
      title: "Pattern Reasoning & Spotting",
      games: "Games 3 & 4: Pattern & Odd One Out",
      score: Math.round(((report.cognitiveFacets.patternReasoning?.score ?? 70) + (report.cognitiveFacets.visualDiscrimination?.score ?? 70)) / 2),
      badge: `${Math.round(((report.cognitiveFacets.patternReasoning?.score ?? 70) + (report.cognitiveFacets.visualDiscrimination?.score ?? 70)) / 2)}% Accuracy`,
      percentile: `${Math.round(((report.cognitiveFacets.patternReasoning?.score ?? 70) + (report.cognitiveFacets.visualDiscrimination?.score ?? 70)) / 2)}th Percentile`,
      tone: Math.round(((report.cognitiveFacets.patternReasoning?.score ?? 70) + (report.cognitiveFacets.visualDiscrimination?.score ?? 70)) / 2) >= 75 ? "strong" : "growth",
      note: "Successfully extrapolated sequence rules and spotted anomalies in geometric formations.",
    },
    {
      icon: "🔄",
      tile: "#FEF3C7",
      title: "Cognitive Flexibility & Sequencing",
      games: "Games 5 & 6: Rule Discovery & Story",
      score: Math.round(((report.cognitiveFacets.conceptualFlexibility?.score ?? 75) + (report.cognitiveFacets.temporalSequencing?.score ?? 75)) / 2),
      badge: `${Math.round(((report.cognitiveFacets.conceptualFlexibility?.score ?? 75) + (report.cognitiveFacets.temporalSequencing?.score ?? 75)) / 2)}% Accuracy`,
      percentile: `${Math.round(((report.cognitiveFacets.conceptualFlexibility?.score ?? 75) + (report.cognitiveFacets.temporalSequencing?.score ?? 75)) / 2)}th Percentile`,
      tone: Math.round(((report.cognitiveFacets.conceptualFlexibility?.score ?? 75) + (report.cognitiveFacets.temporalSequencing?.score ?? 75)) / 2) >= 75 ? "strong" : "growth",
      note: "Adapted quickly to shifting sorting rules and organized multi-step mission steps chronologically.",
    },
  ] : SKILLS;

  return (
    <section className="flex flex-col gap-4 w-full" style={{ fontFamily: INTER }}>
      {/* ================= Header row ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h2
              className="text-[#0F172A]"
              style={{
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-0.6px",
              }}
            >
              Skills at a Glance
            </h2>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E2E8F0] text-[#334155] font-bold"
              style={{ fontFamily: MONO, fontSize: "12px", lineHeight: "16px" }}
            >
              4 Core Dimensions
            </span>
          </div>
          <p
            className="text-[#64748B]"
            style={{ fontWeight: 400, fontSize: "14px", lineHeight: "20px" }}
          >
            Breakdown of foundational cognitive games played during the session.
          </p>
        </div>

        {/* Legend */}
        <div
          className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-white shadow-xs text-[#475569] shrink-0"
          style={{ fontWeight: 500, fontSize: "12px", lineHeight: "16px" }}
        >
          <LegendItem color="#10B981">Strong (75+)</LegendItem>
          <LegendItem color="#0EA5E9">Steady (25-75)</LegendItem>
          <LegendItem color="#F59E0B">Growth (0-25)</LegendItem>
        </div>
      </div>

      {/* ================= Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dynamicSkills.map((s) => {
          const t = TONES[s.tone];
          return (
            <article
              key={s.title}
              className="min-h-[208px] flex flex-col rounded-[20px] border px-5 sm:px-6 pt-[27px] pb-6 shadow-xs"
              style={{
                borderColor: t.border,
                background: `radial-gradient(circle at 100% 0%, ${t.glow} 0%, rgba(255,255,255,0) 55%), #FFFFFF`,
              }}
            >
              {/* Title row */}
              <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[18px] leading-none shrink-0"
                    style={{ backgroundColor: s.tile }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-[#0F172A]"
                      style={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px" }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-[#64748B]"
                      style={{ fontFamily: MONO, fontSize: "12px", lineHeight: "16px" }}
                    >
                      {s.games}
                    </p>
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 h-[22px] px-3 rounded-full border whitespace-nowrap mt-px"
                  style={{
                    backgroundColor: t.badgeBg,
                    borderColor: t.badgeBorder,
                    color: t.badgeText,
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: t.dot }}
                  />
                  {s.badge}
                </span>
              </div>

              {/* Benchmark + bar */}
              <div className="mt-[18px]">
                <div
                  className="flex items-center justify-between gap-2 text-[#64748B]"
                  style={{ fontFamily: MONO, fontSize: "12px", lineHeight: "16px" }}
                >
                  <span>Benchmark: 0</span>
                  <span className="font-bold" style={{ color: t.pct }}>
                    {s.percentile}
                  </span>
                  <span>100</span>
                </div>

                <div
                  className="relative mt-[13px] h-3 w-full rounded-full overflow-hidden"
                  style={{ background: TRACK }}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={s.score}
                  aria-label={`${s.title} percentile`}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${s.score}%`, background: t.fill }}
                  />
                  <span
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.06)]"
                    style={{ left: `calc(${s.score}% - 11px)` }}
                  />
                </div>
              </div>

              {/* Narrative */}
              <p
                className="mt-[13px] text-[#475569]"
                style={{ fontWeight: 400, fontSize: "14px", lineHeight: "20px" }}
              >
                {s.note}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function LegendItem({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      {children}
    </span>
  );
}
