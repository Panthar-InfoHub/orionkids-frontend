"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function GrowthPathwaysSection() {
  return (
    <section className="flex flex-col gap-5">
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
            Developing skills that blossom rapidly with playful family & school routines
          </p>
        </div>
      </div>

      {/* 2 Growth Pathway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pathway 1: Reasoning & Pattern Discovery */}
        <div className="bg-white rounded-[22px] border border-[#FDE68A] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
                EMERGING FRONTIER
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#F59E0B] text-white font-bold text-xs">
                22nd percentile
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Reasoning & Pattern Discovery
            </h3>
            <span className="text-xs font-mono text-[#64748B] block mt-0.5">
              Pattern Puzzle 14th • Odd One Out 33rd
            </span>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              Ananya persisted without frustration on difficult patterns—a high indicator of grit. Abstract pattern rules (e.g. alternating color and rotation) are newly budding concepts in Grade 1.
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#D97706] flex items-center gap-1.5">
              <span>💡</span> PLAYFUL IDEAS FOR HOME & CLASS:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2">
              <p>
                <strong>🍎 Beads & Lego Chains:</strong> Build simple physical ABAB rhythms (Red block, Blue block, Red block) and prompt: &ldquo;What goes next?&rdquo;
              </p>
              <p>
                <strong>🍎 Dinner Table Riddle:</strong> Present 3 fruits and 1 spoon. Ask &ldquo;Which one does not belong, and why?&rdquo; Let her invent funny reasons.
              </p>
              <p>
                <strong>🧦 Sorting Helpers:</strong> Sort socks by color or organize spice jars by height during weekend cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Pathway 2: Flexible Rule-Switching & Narrative Order */}
        <div className="bg-white rounded-[22px] border border-[#FDE68A] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
                EMERGING FRONTIER
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#F59E0B] text-white font-bold text-xs">
                23rd percentile
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Flexible Rule-Switching & Narrative Order
            </h3>
            <span className="text-xs font-mono text-[#64748B] block mt-0.5">
              Rule Detective 38th • Story Order 12th
            </span>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              Ananya solved the baseline sorting cues effectively. When rules shifted dynamically, she wanted to keep the old rule. Developing mental flexibility builds strong adaptation skills for classroom transitions.
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#D97706] flex items-center gap-1.5">
              <span>💡</span> PLAYFUL IDEAS FOR HOME & CLASS:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-2">
              <p>
                <strong>🍱 Comic Strip Scramble:</strong> Cut a 3-panel comic into cards, mix them up, and guide her to reorder &ldquo;Beginning, Middle, and Finale&rdquo;.
              </p>
              <p>
                <strong>🎲 Rule Twist Board Games:</strong> Play Snakes and Ladders with one funny surprise rule: &ldquo;Rolling a 6 means you must moonwalk 2 tiles!&rdquo;
              </p>
              <p>
                <strong>🌅 Morning Visual Flow:</strong> Create a cheerful visual timeline (Brush teeth → School clothes → Backpack) to solidify multi-step anticipation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Alias for convenience in case singular naming is used
export const GrowthPathwaySection = GrowthPathwaysSection;
