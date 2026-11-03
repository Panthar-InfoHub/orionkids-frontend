"use client";

import React from "react";
import type { QuestReportData } from "@/lib/api/quest";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function SuperpowersSection({
  report,
}: {
  report?: QuestReportData | null;
}) {
  const childName = report?.childName || "Your Child";
  const selectedClass = report?.selectedClass || "Class 1";
  const aiReport = report?.aiReport;
  const strengths = aiReport?.observedStrengths || [];

  // Default / fallback domain spotlights based on highest cognitive facets
  const facets = report?.cognitiveFacets;
  const focusScore = facets?.focusInhibition?.score ?? 89;
  const memoryScore = facets?.workingMemory?.score ?? 84;

  const strength1Title = strengths[0] ? "Observed Strength" : "Attention & Selective Focus";
  const strength1Desc =
    strengths[0] ||
    `${childName} stuck with the Stroop Colour-Word game with notable poise, choosing target cues accurately and showing mature executive filtering.`;

  const strength2Title = strengths[1] ? "Observed Strength" : "Spatial Memory & Recall";
  const strength2Desc =
    strengths[1] ||
    `${childName} navigated the Card Flip memory matches with calm persistence, demonstrating good recall of spatial object positions.`;

  return (
    <section className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#059669] text-white flex items-center justify-center text-lg shadow-xs">
          ★
        </div>
        <div>
          <h2
            className="text-[22px] sm:text-[26px] font-bold text-[#0A1D3D]"
            style={{ fontFamily: JAKARTA }}
          >
            {childName}’s Superpowers (Strengths)
          </h2>
          <p className="text-sm text-[#64748B]" style={{ fontFamily: JAKARTA }}>
            Core cognitive advantages that anchor learning progression in {selectedClass}
          </p>
        </div>
      </div>

      {/* 2 Strength Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Superpower 1 */}
        <div className="bg-white rounded-[22px] border border-[#A7F3D0] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
                DOMAIN SPOTLIGHT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#059669] text-white font-bold text-xs">
                {focusScore}% Accuracy
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              {strength1Title}
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              {strength1Desc}
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#059669] flex items-center gap-1.5">
              <span>🚀</span> KEEP THIS SUPERPOWER GROWING:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-1.5">
              <p>
                <strong>🏃 Movement & Rhythm:</strong> Play active games like &ldquo;Simon Says&rdquo; or &ldquo;Freeze Dance&rdquo; with changing verbal triggers.
              </p>
              <p>
                <strong>🎨 Creative Focus:</strong> Encourage drawing or coloring complex illustrations while listening to short audio stories.
              </p>
            </div>
          </div>
        </div>

        {/* Superpower 2 */}
        <div className="bg-white rounded-[22px] border border-[#A7F3D0] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
                DOMAIN SPOTLIGHT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#059669] text-white font-bold text-xs">
                {memoryScore}% Accuracy
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              {strength2Title}
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              {strength2Desc}
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#059669] flex items-center gap-1.5">
              <span>🚀</span> KEEP THIS SUPERPOWER GROWING:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-1.5">
              <p>
                <strong>🃏 Card Match Exploration:</strong> Play physical memory card pairs together, encouraging verbalization of card locations.
              </p>
              <p>
                <strong>🗺️ Cosmic Scavenger Hunt:</strong> Hide 3 toys in a room and give 2-step clue sequences from memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
