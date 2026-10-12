"use client";

import React from "react";
import Image from "next/image";

const GAME_BADGES = [
  { name: "Stroop colour-word", bg: "bg-[#7DD3FC]" },
  { name: "Card flip", bg: "bg-[#86EFAC]" },
  { name: "Pattern recognition", bg: "bg-[#DDD6FE]" },
  { name: "Odd one out", bg: "bg-[#FBCFE8]" },
  { name: "Rule discovery", bg: "bg-[#FFD54F]" },
  { name: "Story sequencing", bg: "bg-[#A7F3D0]" },
];

const TICKER_ITEMS = [
  "STROOP COLOUR-WORD",
  "CARD FLIP",
  "PATTERN RECOGNITION",
  "ODD ONE OUT",
  "RULE DISCOVERY",
  "STORY SEQUENCING",
];

export function ConstellationSection() {
  return (
    <section
      id="constellation-section"
      className="relative w-full min-h-[700px] lg:h-screen lg:min-h-[620px] lg:max-h-[920px] bg-[#020817] bg-cover bg-center bg-no-repeat overflow-hidden text-white flex flex-col justify-between scroll-mt-0"
      style={{
        backgroundImage: "url('/background/milky_way_bg.png')",
      }}
    >
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-[#020817]/15 pointer-events-none" />

      {/* Main Content Container (Fits vertically in viewport on desktop) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 lg:pt-6 xl:pt-8 pb-2 lg:pb-3 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full my-auto">
          
          {/* Left Column: Text & Buttons */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6EE7B7] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-2.5 select-none hover:scale-105 transition-transform">
              <span className="w-4 h-4 rounded-full bg-[#0A1D3D] text-[#6EE7B7] inline-flex items-center justify-center text-[9px] font-bold">
                ✨
              </span>
              <span
                className="text-[10.5px] sm:text-[11px] font-black tracking-wider uppercase"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                🎮 6 GAMES · ONE UNIQUE MIND
              </span>
              <span className="text-[9px]">✨</span>
            </div>

            {/* Eyebrow with Orange Dash */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3.5 h-[3px] bg-[#FF7A00] rounded-full shrink-0"></span>
              <span
                className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[1.4px] text-slate-300"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                SIX GAMES, INFINITE PATTERNS.
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-[800] text-white leading-[1.12] tracking-[-1px] mb-2.5"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              No two constellations
              <br />
              are the same.
              <br />
              Neither are two learners
            </h2>

            {/* "THAT'S THE WHOLE POINT" Badge Button */}
            <div className="mb-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FBCFE8] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] text-[11px] sm:text-xs font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span>🧩</span>
                <span>THAT&apos;S THE WHOLE POINT</span>
                <span className="text-xs">→</span>
              </button>
            </div>

            {/* Descriptive Subtitle Paragraph */}
            <p
              className="text-[13px] sm:text-[14px] lg:text-[14.5px] font-[400] text-[#E2E8F0] leading-[1.5] max-w-lg mb-3"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Every child brings a unique pattern of abilities. OrionKids explores
              how they think, learn and connect through six games – so support
              can begin with understanding.
            </p>

            {/* 6 Game Filter / Interactive Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5 max-w-lg">
              {GAME_BADGES.map((game) => (
                <button
                  key={game.name}
                  type="button"
                  className={`inline-flex items-center gap-1 px-3 py-1 ${game.bg} text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] text-[11px] sm:text-xs font-bold tracking-tight hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none`}
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span className="text-[10px]">★</span>
                  <span>{game.name}</span>
                </button>
              ))}
            </div>

            {/* Bottom Learning Profile Callout Card */}
            <div className="w-full max-w-[430px] bg-[#E0F2FE] border-2 border-[#0A1D3D] rounded-[16px] p-2.5 sm:p-3 shadow-[3px_3px_0px_0px_#0A1D3D] flex items-center gap-2.5">
              <span className="text-xl shrink-0 select-none">⭐</span>
              <div className="flex flex-col">
                <p
                  className="text-xs sm:text-[12.5px] font-black text-[#0A1D3D] leading-tight"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  A learning profile, not a label.
                </p>
                <p
                  className="text-[10.5px] sm:text-[11.5px] font-semibold text-[#526176] leading-tight mt-0.5"
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}
                >
                  Personal growth, not comparison.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Constellation Graphic & eyes.gif */}
          <div className="lg:col-span-6 relative w-full flex flex-col justify-center select-none">
            
            {/* Top Right Badges */}
            <div className="flex items-center justify-end gap-2 mb-1 z-20">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] text-[11px] font-black select-none hover:scale-105 transition-transform"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span className="text-[10px] text-[#0A1D3D]">★</span>
                <span>6 games</span>
              </div>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#67E8F9] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] text-[11px] font-black select-none hover:scale-105 transition-transform"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span className="text-[10px]">✨</span>
                <span>Playful learning</span>
              </div>
            </div>

            {/* Constellation Canvas & Star Map (Exact structure matching Figma prototype) */}
            <div className="relative w-full aspect-[600/680] max-h-[460px] lg:max-h-[490px] xl:max-h-[550px] flex items-center justify-center">
              <svg
                viewBox="0 0 600 680"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle Glow Filter for Constellation Stars */}
                  <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="radiant-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ================= EXACT CONSTELLATION DASHED LINES ================= */}
                {/* 1. Top Club Arc of Orion */}
                <path
                  d="M 170 260 L 145 235 L 135 145 L 120 130 L 165 32 L 200 35 L 175 115 L 145 235"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 2. Left Shoulder (Rule discovery, 170,260) to Head (Stroop colour-word, 252,218) */}
                <line
                  x1="170"
                  y1="260"
                  x2="252"
                  y2="218"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 3. Head (252,218) to Center Chest Star (288,288) */}
                <line
                  x1="252"
                  y1="218"
                  x2="288"
                  y2="288"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 4. Left Shoulder (170,260) to Center Chest Star (288,288) */}
                <line
                  x1="170"
                  y1="260"
                  x2="288"
                  y2="288"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 5. Right Arm / Memory to Logic: */}
                {/* 5a. Incoming top dashed line into Memory (Card flip, 420,168) */}
                <line
                  x1="392"
                  y1="140"
                  x2="420"
                  y2="168"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 5b. Card flip (420,168) down-right to Intermediate Star (438,245) */}
                <line
                  x1="420"
                  y1="168"
                  x2="438"
                  y2="245"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 5c. Intermediate Star (438,245) down-left to Logic (Pattern recognition, 410,358) */}
                <line
                  x1="438"
                  y1="245"
                  x2="410"
                  y2="358"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 6. Center Chest Star (288,288) horizontal connector to right arm (at 426,288) */}
                <line
                  x1="288"
                  y1="288"
                  x2="426"
                  y2="288"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 7. Left Shoulder (170,260) down to Left Belt Star (202,438) */}
                <line
                  x1="170"
                  y1="260"
                  x2="202"
                  y2="438"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 8. Center Chest Star (288,288) down to Right Belt Star (242,410) */}
                <line
                  x1="288"
                  y1="288"
                  x2="242"
                  y2="410"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 9. Orion's Belt (3 Stars in a straight diagonal line) */}
                <line
                  x1="202"
                  y1="438"
                  x2="224"
                  y2="424"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.9"
                  strokeLinecap="round"
                />
                <line
                  x1="224"
                  y1="424"
                  x2="242"
                  y2="410"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.9"
                  strokeLinecap="round"
                />

                {/* 10. Orion's Sword (Vertical line from middle belt star 224,424 down to 226,486 and 224,500) */}
                <line
                  x1="224"
                  y1="424"
                  x2="226"
                  y2="486"
                  stroke="#00E5FF"
                  strokeWidth="1.6"
                  strokeDasharray="3 3"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />
                <line
                  x1="226"
                  y1="486"
                  x2="224"
                  y2="500"
                  stroke="#00E5FF"
                  strokeWidth="1.6"
                  strokeDasharray="3 3"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />

                {/* 11. Left Belt Star (202,438) down-left to Left Leg / Story sequencing (155,578) */}
                <line
                  x1="202"
                  y1="438"
                  x2="155"
                  y2="578"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 12. Right Belt Star (242,410) down-right to Right Leg / Odd one out (294,560) */}
                <line
                  x1="242"
                  y1="410"
                  x2="294"
                  y2="560"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* ================= INTERMEDIATE STARS ================= */}
                {/* Center Chest Star (288,288) */}
                <circle cx="288" cy="288" r="8" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                <circle cx="288" cy="288" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
                <circle cx="288" cy="288" r="1.5" fill="#FFFFFF" />

                {/* Right Arm Intermediate Star (438,245) */}
                <circle cx="438" cy="245" r="8" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                <circle cx="438" cy="245" r="4.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
                <circle cx="438" cy="245" r="1.5" fill="#FFFFFF" />

                {/* Orion's Belt (3 Stars) */}
                {/* Left Belt Star (202,438) */}
                <circle cx="202" cy="438" r="11" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                <circle cx="202" cy="438" r="5.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="202" cy="438" r="1.8" fill="#FFFFFF" />

                {/* Middle Belt Star (224,424) */}
                <circle cx="224" cy="424" r="11" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                <circle cx="224" cy="424" r="5.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                <circle cx="224" cy="424" r="1.8" fill="#FFFFFF" />

                {/* Right Belt Star (242,410) - Large Radiant Star with Double Aura */}
                <circle cx="242" cy="410" r="18" fill="#FDE047" fillOpacity="0.35" filter="url(#radiant-glow)" />
                <circle cx="242" cy="410" r="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.8" />
                <circle cx="242" cy="410" r="2.5" fill="#FFFFFF" />

                {/* Sword Stars */}
                <circle cx="226" cy="486" r="3" fill="#67E8F9" opacity="0.9" />
                <circle cx="224" cy="500" r="2.5" fill="#67E8F9" opacity="0.8" />

                {/* ORIONKIDS Tiny Brand Label */}
                <text
                  x="212"
                  y="612"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="7.5"
                  fontWeight="800"
                  letterSpacing="1.2"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  ORIONKIDS
                </text>

                {/* ================= 6 PRIMARY GAME CONSTELLATION NODES ================= */}

                {/* 1. FOCUS / Stroop colour-word */}
                <g className="cursor-pointer group">
                  <circle cx="252" cy="218" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="252" cy="218" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="252" cy="218" r="2" fill="#FFFFFF" />
                  {/* Badge & Title */}
                  <rect x="233" y="174" width="38" height="15" rx="7.5" fill="#FDE047" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="252" y="185" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">FOCUS</text>
                  <text x="252" y="204" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Stroop colour-word</text>
                </g>

                {/* 2. RULES / Rule discovery */}
                <g className="cursor-pointer group">
                  <circle cx="170" cy="260" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="170" cy="260" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="170" cy="260" r="2" fill="#FFFFFF" />
                  {/* Badge & Title */}
                  <rect x="105" y="268" width="36" height="15" rx="7.5" fill="#FDE047" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="123" y="279" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">RULES</text>
                  <text x="123" y="297" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Rule discovery</text>
                  <text x="123" y="310" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Abstract thinking & rules</text>
                </g>

                {/* 3. MEMORY / Card flip */}
                <g className="cursor-pointer group">
                  <circle cx="420" cy="168" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="420" cy="168" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="420" cy="168" r="2" fill="#FFFFFF" />
                  {/* Badge & Title */}
                  <rect x="442" y="142" width="46" height="15" rx="7.5" fill="#FFFFFF" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="465" y="153" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">MEMORY</text>
                  <text x="465" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Card flip</text>
                  <text x="465" y="183" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Working memory & recall</text>
                </g>

                {/* 4. LOGIC / Pattern recognition */}
                <g className="cursor-pointer group">
                  <circle cx="410" cy="358" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="410" cy="358" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="410" cy="358" r="2" fill="#FFFFFF" />
                  {/* Badge & Title */}
                  <rect x="432" y="334" width="36" height="15" rx="7.5" fill="#FDE047" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="450" y="345" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">LOGIC</text>
                  <text x="450" y="363" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Pattern recognition</text>
                  <text x="450" y="376" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Logic & visual reasoning</text>
                </g>

                {/* 5. NARRATIVE / Story sequencing */}
                <g className="cursor-pointer group">
                  <circle cx="155" cy="578" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="155" cy="578" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="155" cy="578" r="2" fill="#FFFFFF" />
                  {/* Badge & Title */}
                  <rect x="96" y="568" width="54" height="15" rx="7.5" fill="#FFFFFF" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="123" y="579" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">NARRATIVE</text>
                  <text x="123" y="597" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Story sequencing</text>
                  <text x="123" y="610" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Narrative & social</text>
                  <text x="123" y="621" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">reasoning</text>
                </g>

                {/* 6. LANGUAGE / Odd one out */}
                <g className="cursor-pointer group">
                  <circle cx="294" cy="560" r="14" fill="#FDE047" fillOpacity="0.3" filter="url(#star-glow)" />
                  <circle cx="294" cy="560" r="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <circle cx="294" cy="560" r="2" fill="#FFFFFF" />
                  {/* Title & Badge */}
                  <text x="300" y="592" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Odd one out</text>
                  <rect x="274" y="601" width="52" height="15" rx="7.5" fill="#FFFFFF" stroke="#0A1D3D" strokeWidth="1" />
                  <text x="300" y="612" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">LANGUAGE</text>
                </g>
              </svg>
            </div>

            {/* Bottom-Right: Watching Eyes GIF (Attached per user request) */}
            <div className="absolute -bottom-2 right-2 sm:bottom-0 sm:right-4 lg:bottom-1 lg:right-4 z-20 select-none pointer-events-none">
              <Image
                src="/gif/eyes.gif"
                alt="Watching eyes"
                width={120}
                height={75}
                unoptimized
                className="w-20 sm:w-24 md:w-28 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Ticker Marquee Bar */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-3 px-4 overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap text-[11px] sm:text-xs font-bold uppercase tracking-[2px] text-white/70">
          {TICKER_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-[#6EE7B7] text-xs">★</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
