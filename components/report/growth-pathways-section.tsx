"use client";

import React from "react";
import type { QuestReportData } from "@/lib/api/quest";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function GrowthPathwaysSection({
  report,
}: {
  report?: QuestReportData | null;
}) {
  const childName = report?.childName || "Your Child";
  const aiReport = report?.aiReport;
  const practiceAreas = aiReport?.areasForPractice || [];
  const recs = aiReport?.parentRecommendations || [];

  const practice1 =
    practiceAreas[0] ||
    `${childName} displayed persistent curiosity with multi-step rule discovery and pattern extrapolation.`;

  const practice2 =
    practiceAreas[1] ||
    `Introduce everyday sorting, storytelling, and sequential puzzles to reinforce conceptual flexibility.`;

  return (
    <section className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F59E0B] text-white flex items-center justify-center text-lg shadow-xs">
          🌱
        </div>
        <div>
          <h2
            className="text-[22px] sm:text-[26px] font-bold text-[#0A1D3D]"
            style={{ fontFamily: JAKARTA }}
          >
            Growth Pathways & Playful Practice
          </h2>
          <p className="text-sm text-[#64748B]" style={{ fontFamily: JAKARTA }}>
            Developing skills that blossom rapidly with playful family & home routines
          </p>
        </div>
      </div>

      {/* 2 Growth Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pathway 1 */}
        <div className="bg-white rounded-[22px] border border-[#FDE68A] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
                EMERGING FRONTIER
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#F59E0B] text-white font-bold text-xs">
                Focus Area
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Reasoning & Adaptive Flexibility
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              {practice1}
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#D97706] flex items-center gap-1.5">
              <span>💡</span> PLAYFUL IDEAS FOR HOME:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2">
              {recs[0] ? (
                <p>
                  <strong>🧩 {recs[0].title}:</strong> {recs[0].description}
                </p>
              ) : (
                <p>
                  <strong>🍎 Blocks & Chains:</strong> Build simple physical ABAB rhythms (Red block, Blue block, Red block) and prompt: &ldquo;What goes next?&rdquo;
                </p>
              )}
              {recs[1] ? (
                <p>
                  <strong>🔀 {recs[1].title}:</strong> {recs[1].description}
                </p>
              ) : (
                <p>
                  <strong>🥣 Kitchen Sorting Helpers:</strong> Sort spoons by size or organize spice jars during weekend cooking.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pathway 2 */}
        <div className="bg-white rounded-[22px] border border-[#FDE68A] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
                EMERGING FRONTIER
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#F59E0B] text-white font-bold text-xs">
                Growth Pathway
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Narrative & Causal Sequencing
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              {practice2}
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#D97706] flex items-center gap-1.5">
              <span>💡</span> PLAYFUL IDEAS FOR HOME:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2">
              {recs[2] ? (
                <p>
                  <strong>📖 {recs[2].title}:</strong> {recs[2].description}
                </p>
              ) : (
                <p>
                  <strong>📖 Bedtime Story Steps:</strong> Pause mid-book and playfully ask: &ldquo;What happened first, next, and what might happen now?&rdquo;
                </p>
              )}
              <p>
                <strong>🎲 Daily Timeline Riddle:</strong> Retell three fun moments of the day in reverse order together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
