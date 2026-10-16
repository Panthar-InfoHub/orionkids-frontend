"use client";

import React from "react";

const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

/*
 * Geometry is taken from the Figma frame (design px, 232 x 232 canvas):
 *   Family    (76, 76)      School (156, 76)     Community (116, 154.4)
 *   every circle r = 76 · child disc centred at (116, 103.2)
 */
const R = 75; // 76 minus half of the 2px stroke

export function EcosystemVennDiagram() {
  return (
    <div className="flex flex-col items-center w-full min-h-[392px] select-none">
      {/* Diagram */}
      <div className="flex-1 w-full flex items-center justify-center px-4 pt-4">
        <svg
          viewBox="0 0 232 232"
          className="w-full max-w-[232px] h-auto overflow-visible"
          fill="none"
          role="img"
          aria-label="Venn diagram: Family, School and Community overlapping around the child, Ananya"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="eco-family" cx="76" cy="76" r="76" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FDE047" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FDE047" stopOpacity="0.13" />
            </radialGradient>
            <radialGradient id="eco-school" cx="156" cy="76" r="76" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#38BDF8" stopOpacity="0.28" />
              <stop offset="1" stopColor="#38BDF8" stopOpacity="0.09" />
            </radialGradient>
            <radialGradient id="eco-community" cx="116" cy="154.4" r="76" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#EC4899" stopOpacity="0.21" />
              <stop offset="1" stopColor="#EC4899" stopOpacity="0.08" />
            </radialGradient>
          </defs>

          {/* Family */}
          <circle cx="76" cy="76" r={R} fill="url(#eco-family)" stroke="#EAB308" strokeWidth="2" strokeDasharray="5 4" />
          {/* School */}
          <circle cx="156" cy="76" r={R} fill="url(#eco-school)" stroke="#0284C7" strokeWidth="2" strokeDasharray="5 4" />
          {/* Community */}
          <circle cx="116" cy="154.4" r={R} fill="url(#eco-community)" stroke="#EC4899" strokeWidth="2" strokeDasharray="5 4" />

          {/* Ring labels */}
          <text x="49.6" y="46" textAnchor="middle" fill="#854D0E" fontSize="12" fontWeight="700" fontFamily={INTER}>
            🏡 Family
          </text>
          <text x="186.8" y="46" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="700" fontFamily={INTER}>
            🏫 School
          </text>
          <text x="116" y="183.5" textAnchor="middle" fill="#9D174D" fontSize="12" fontWeight="700" fontFamily={INTER}>
            🌳 Community
          </text>

          {/* Child – centre */}
          <circle cx="116" cy="103.2" r="33.6" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="116" cy="103.2" r="29.6" fill="#0F172A" />
          <text x="116" y="99.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily={INTER}>
            CHILD
          </text>
          <text x="116" y="113" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="700" fontFamily={INTER}>
            Ananya
          </text>
        </svg>
      </div>

      {/* Caption */}
      <p
        className="px-4 pb-[27px] pt-2 text-center text-[11px] leading-4 tracking-wide text-[#64748B]"
        style={{ fontFamily: MONO }}
      >
        Interlocking Support Mesh for Grade 1 Success
      </p>
    </div>
  );
}
