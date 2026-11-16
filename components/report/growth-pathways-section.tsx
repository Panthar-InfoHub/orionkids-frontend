"use client";

import React from "react";
import type { QuestReportData } from "@/lib/api/quest";
import { formatChildName } from "@/lib/utils/format-child-name";
import { Sparkles, Heart, Compass, CheckCircle2, RefreshCw } from "lucide-react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function GrowthPathwaysSection({
  report,
}: {
  report?: QuestReportData | null;
}) {
  const childName = formatChildName(report?.childName, "Your Child");
  const aiReport = report?.aiReport;
  const practiceAreas = aiReport?.areasForPractice || [];
  const recs = aiReport?.parentRecommendations || [];
  const startHere = aiReport?.startHere;
  const whatDoesThisMean = aiReport?.whatDoesThisMean;
  const shouldIWorry = aiReport?.shouldIWorry;
  const cardFlipRetryNote = aiReport?.cardFlipRetryNote;

  const extractPractice = (item: unknown) => {
    if (!item) return null;
    if (typeof item === "string") return item;
    const obj = item as Record<string, string>;
    return obj.observedPattern || obj.recommendedApproach || obj.heading || "";
  };

  const getPracticeTitle = (item: any, fallback: string) => {
    if (!item) return fallback;
    if (typeof item === "string") return fallback;
    return item.heading || fallback;
  };

  const getPracticeDesc = (item: any, fallback: string) => {
    if (!item) return fallback;
    if (typeof item === "string") return item;
    return `${item.observedPattern || ""} ${
      item.recommendedApproach ? `Recommendation: ${item.recommendedApproach}` : ""
    }`.trim() || fallback;
  };

  const getRecDesc = (rec: any) => {
    if (!rec) return "";
    if (rec.description) return rec.description;
    if (rec.learningOpportunity) return rec.learningOpportunity;
    if (Array.isArray(rec.instructions)) return rec.instructions.join(" ");
    return "";
  };

  const practice1Title = getPracticeTitle(practiceAreas[0], "Reasoning & Adaptive Flexibility");
  const practice1 = getPracticeDesc(
    practiceAreas[0],
    `${childName} displayed persistent curiosity with multi-step rule discovery and pattern extrapolation.`
  );

  const practice2Title = getPracticeTitle(practiceAreas[1], "Narrative & Causal Sequencing");
  const practice2 = getPracticeDesc(
    practiceAreas[1],
    `Introduce everyday sorting, storytelling, and sequential puzzles to reinforce conceptual flexibility.`
  );

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center text-lg shadow-sm">
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
            Everyday, screen-free ideas that build confidence and developing skills through family play
          </p>
        </div>
      </div>

      {/* Prominent "START HERE" Card */}
      {startHere && (
        <div className="w-full rounded-[24px] bg-gradient-to-br from-[#FEFCE8] via-[#FFFBEB] to-[#FEF3C7] border-2 border-[#F59E0B] shadow-sm p-6 sm:p-7 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#FDE68A] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F59E0B] text-white text-xs font-black shadow-xs">
                ★
              </span>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#92400E]">
                Start Here: Your Best First Step at Home
              </span>
            </div>
            <span className="text-xs font-bold text-[#B45309] bg-white/80 px-3 py-1 rounded-full border border-[#FDE68A] w-fit">
              Duration: {startHere.suggestedDuration || "10 minutes"}
            </span>
          </div>

          <div>
            <h3
              className="text-xl sm:text-22px font-black text-[#0A1D3D] flex flex-wrap items-center gap-2"
              style={{ fontFamily: JAKARTA }}
            >
              <span>{startHere.activityTitle}</span>
              <span className="text-xs font-bold text-[#475569] bg-white/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                {startHere.relatedDomain}
              </span>
            </h3>
            <p className="text-sm leading-relaxed text-[#334155] mt-2" style={{ fontFamily: JAKARTA }}>
              {startHere.whyThisFirst}
            </p>
            {startHere.evidenceCitation && (
              <p className="text-xs font-bold text-[#0A1D3D] mt-1.5 flex items-center gap-1.5 bg-amber-100/60 p-2 rounded-xl">
                <span>🔍 Evidence:</span>
                <span>{startHere.evidenceCitation}</span>
              </p>
            )}
          </div>

          {/* Quick Steps */}
          {startHere.quickSteps && startHere.quickSteps.length > 0 && (
            <div className="rounded-2xl bg-white/90 border border-[#FDE68A] p-4 flex flex-col gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#B45309]">
                Quick 10-Minute Steps to Try:
              </span>
              <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-[#334155]">
                {startHere.quickSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
              {practice1Title}
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
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2.5">
              {recs[0] ? (
                <div>
                  <p>
                    <strong>🧩 {recs[0].title}:</strong> {getRecDesc(recs[0])}
                  </p>
                  {recs[0].observedFinding && (
                    <p className="text-[11px] font-medium text-blue-700 bg-blue-50/70 p-1.5 rounded-lg mt-1">
                      💡 Why this helps: {recs[0].observedFinding}
                    </p>
                  )}
                </div>
              ) : (
                <p>
                  <strong>🍎 Blocks & Chains:</strong> Build simple physical ABAB rhythms (Red block, Blue block, Red block) and prompt: &ldquo;What goes next?&rdquo;
                </p>
              )}
              {recs[1] ? (
                <div>
                  <p>
                    <strong>🔀 {recs[1].title}:</strong> {getRecDesc(recs[1])}
                  </p>
                  {recs[1].observedFinding && (
                    <p className="text-[11px] font-medium text-blue-700 bg-blue-50/70 p-1.5 rounded-lg mt-1">
                      💡 Why this helps: {recs[1].observedFinding}
                    </p>
                  )}
                </div>
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
              {practice2Title}
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
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2.5">
              {recs[2] ? (
                <div>
                  <p>
                    <strong>📖 {recs[2].title}:</strong> {getRecDesc(recs[2])}
                  </p>
                  {recs[2].observedFinding && (
                    <p className="text-[11px] font-medium text-blue-700 bg-blue-50/70 p-1.5 rounded-lg mt-1">
                      💡 Why this helps: {recs[2].observedFinding}
                    </p>
                  )}
                </div>
              ) : (
                <p>
                  <strong>📖 Bedtime Story Steps:</strong> Pause mid-book and playfully ask: &ldquo;What happened first, next, and what might happen now?&rdquo;
                </p>
              )}
              {recs[3] ? (
                <div>
                  <p>
                    <strong>🎲 {recs[3].title}:</strong> {getRecDesc(recs[3])}
                  </p>
                  {recs[3].observedFinding && (
                    <p className="text-[11px] font-medium text-blue-700 bg-blue-50/70 p-1.5 rounded-lg mt-1">
                      💡 Why this helps: {recs[3].observedFinding}
                    </p>
                  )}
                </div>
              ) : (
                <p>
                  <strong>🎲 Daily Timeline Riddle:</strong> Retell three fun moments of the day in reverse order together.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Flip Retry Callout (When Card Flip was unassessed or skipped) */}
      {cardFlipRetryNote && (
        <div className="w-full rounded-[20px] bg-blue-50 border border-blue-200 p-5 flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-sm">
            🃏
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-blue-950">
              Cosmic Card Flip · Try at Home Whenever Ready!
            </h4>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed" style={{ fontFamily: JAKARTA }}>
              {cardFlipRetryNote}
            </p>
          </div>
        </div>
      )}

      {/* "What Does This Mean?" & "Should I Worry?" Parent Guidance Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* What Does This Mean? */}
        <div className="rounded-[22px] bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-white border border-blue-200/80 p-6 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-base">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>What Does This Mean?</span>
          </div>
          <p className="text-sm leading-relaxed text-[#334155]" style={{ fontFamily: JAKARTA }}>
            {whatDoesThisMean ||
              `Think of this quest like a fun obstacle course for the brain! The games gave ${childName} different types of playful challenges: holding pictures in mind, pausing before clicking, spotting patterns, and trying new rules. The scores show where ${childName} felt confident today and highlight natural areas where playful practice can help build even greater confidence.`}
          </p>
        </div>

        {/* Should I Worry? */}
        <div className="rounded-[22px] bg-gradient-to-br from-emerald-50/70 via-teal-50/50 to-white border border-emerald-200/80 p-6 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <Heart className="w-5 h-5 text-emerald-600" />
            <span>Should I Worry? Not at all!</span>
          </div>
          <p className="text-sm leading-relaxed text-emerald-950 font-medium" style={{ fontFamily: JAKARTA }}>
            {shouldIWorry?.reassurance ||
              `Every child's brain grows at its own unique pace, and this report is simply a helpful snapshot of one playful day—not a diagnosis or a test of intelligence.`}
          </p>
          <div className="flex flex-col gap-1.5 text-xs text-slate-700 mt-1">
            {shouldIWorry?.keyPoints ? (
              shouldIWorry.keyPoints.map((kp, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{kp}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Scores naturally go up and down based on tiredness, familiarity, and time of day.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A lower score in any activity is simply an exciting new skill to explore, not a weakness.</span>
                </div>
              </>
            )}
          </div>
          {shouldIWorry?.teacherPartnershipGuidance && (
            <p className="text-xs text-blue-900 bg-blue-100/60 p-2.5 rounded-xl mt-2 font-medium">
              <strong>🏫 Teacher Partnership:</strong> {shouldIWorry.teacherPartnershipGuidance}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
