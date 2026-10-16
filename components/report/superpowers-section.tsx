"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function SuperpowersSection() {
  return (
    <section className="flex flex-col gap-5">
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
            Ananya’s Superpowers (Strengths)
          </h2>
          <p className="text-sm text-[#64748B]" style={{ fontFamily: JAKARTA }}>
            Core cognitive advantages that can anchor her learning journey in Class 1
          </p>
        </div>
      </div>

      {/* 2 Strength Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Superpower 1: Attention & Selective Focus */}
        <div className="bg-white rounded-[22px] border border-[#A7F3D0] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
                DOMAIN SPOTLIGHT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#059669] text-white font-bold text-xs">
                89th percentile
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Attention & Selective Focus
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              Ananya stuck with the Colour Tap game with notable poise. She reliably chose the target cue even when mismatched text attempted to distract her, showing mature executive filtering for a 6-year-old.
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#059669] flex items-center gap-1.5">
              <span>🚀</span> KEEP THIS SUPERPOWER GROWING:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-1.5">
              <p>
                <strong>🏃 Movement & Sport:</strong> Play park games like &ldquo;Simon Says&rdquo; or &ldquo;Freeze Dance&rdquo; with changing auditory triggers (e.g., &lsquo;hop when I clap twice&rsquo;).
              </p>
              <p>
                <strong>🎨 Creative Play:</strong> Color complex illustrations while listening to short audio-tales, then recall two distinct story moments.
              </p>
            </div>
          </div>
        </div>

        {/* Superpower 2: Spatial Memory & Recall */}
        <div className="bg-white rounded-[22px] border border-[#A7F3D0] shadow-xs p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669]">
                DOMAIN SPOTLIGHT
              </span>
              <span className="px-3 py-0.5 rounded-full bg-[#059669] text-white font-bold text-xs">
                84th percentile
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
              Spatial Memory & Recall
            </h3>

            <p className="text-[14px] leading-[165%] text-[#475569] mt-2.5" style={{ fontFamily: JAKARTA }}>
              Ananya swiftly indexed where flipped cards were located, preventing redundant attempts. Such robust short-term visual memory directly assists fast sight-word recognition and math equations.
            </p>
          </div>

          {/* Action Box */}
          <div className="rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] p-4 flex flex-col gap-2 mt-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#059669] flex items-center gap-1.5">
              <span>🚀</span> KEEP THIS SUPERPOWER GROWING:
            </span>
            <div className="text-[13px] leading-[160%] text-[#334155] flex flex-col gap-1.5">
              <p>
                <strong>🎲 Memory Hopscotch:</strong> Create a chalk tile path. Call out 3 steps, then have Ananya leap the pattern from memory.
              </p>
              <p>
                <strong>🧸 Tray Detective:</strong> Place 5 household items on a tray for 10 seconds, hide it under a cloth, and ask her to name or sketch what disappeared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
