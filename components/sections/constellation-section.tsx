"use client";

import React from "react";

const GAME_BADGES = [
  { name: "Stroop Colour-Word", bg: "bg-[#56CCF2]" },
  { name: "Card Flip", bg: "bg-[#65DCAA]" },
  { name: "Pattern Recognition", bg: "bg-[#D5B6FF]" },
  { name: "Odd One Out", bg: "bg-[#FF8CC7]" },
  { name: "Rule Discovery", bg: "bg-[#FFCF70]" },
  { name: "Story Sequencing", bg: "bg-[#65DCAA]" },
];

const TICKER_ITEMS = [
  "STROOP COLOUR-WORD",
  "CARD FLIP",
  "PATTERN RECOGNITION",
  "ODD ONE OUT",
  "RULE DISCOVERY",
  "STORY SEQUENCING",
];

// Shining Background Star Particles (Light shine blue & crisp white only, no yellow)
const CONSTELLATION_SHINING_PARTICLES = [
  // Upper region
  { top: "6%", left: "10%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "2.3s", delay: "0.2s" },
  { top: "14%", left: "18%", size: "w-1 h-1", bg: "bg-white", glow: "#E0F2FE", duration: "2.4s", delay: "0s" },
  { top: "8%", left: "34%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "3.0s", delay: "1.3s" },
  { top: "18%", left: "48%", size: "w-[3px] h-[3px]", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.2s", delay: "1.8s" },
  { top: "5%", left: "62%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "2.7s", delay: "0.5s" },
  { top: "10%", right: "28%", size: "w-1 h-1", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.6s", delay: "0.8s" },
  { top: "6%", right: "16%", size: "w-1.5 h-1.5", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.1s", delay: "1.4s" },
  { top: "15%", right: "8%", size: "w-[3px] h-[3px]", bg: "bg-white", glow: "#FFFFFF", duration: "2.2s", delay: "0.3s" },

  // Upper-middle region
  { top: "25%", left: "6%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "3.2s", delay: "1.1s" },
  { top: "32%", left: "26%", size: "w-1 h-1", bg: "bg-sky-200", glow: "#38BDF8", duration: "2.8s", delay: "0.7s" },
  { top: "26%", right: "14%", size: "w-1.5 h-1.5", bg: "bg-white", glow: "#FFFFFF", duration: "2.8s", delay: "1.5s" },
  { top: "35%", right: "32%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.9s", delay: "1.9s" },
  { top: "38%", right: "6%", size: "w-1 h-1", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.1s", delay: "0.5s" },

  // Center & Middle region
  { top: "45%", left: "14%", size: "w-1.5 h-1.5", bg: "bg-white", glow: "#FFFFFF", duration: "2.7s", delay: "0.6s" },
  { top: "52%", left: "32%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "3.3s", delay: "1.0s" },
  { top: "48%", left: "54%", size: "w-1 h-1", bg: "bg-sky-200", glow: "#38BDF8", duration: "2.5s", delay: "0.4s" },
  { top: "52%", right: "24%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "3.0s", delay: "1.6s" },
  { top: "48%", right: "12%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.6s", delay: "0.9s" },

  // Lower-middle region
  { top: "64%", left: "8%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "3.0s", delay: "1.2s" },
  { top: "68%", left: "22%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.4s", delay: "0.1s" },
  { top: "62%", left: "44%", size: "w-1 h-1", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.4s", delay: "1.5s" },
  { top: "66%", right: "18%", size: "w-1 h-1", bg: "bg-white", glow: "#E0F2FE", duration: "2.5s", delay: "1.2s" },
  { top: "62%", right: "36%", size: "w-1.5 h-1.5", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.9s", delay: "0.6s" },
  { top: "70%", right: "6%", size: "w-[3px] h-[3px]", bg: "bg-white", glow: "#FFFFFF", duration: "2.7s", delay: "2.0s" },

  // Lower region
  { top: "76%", left: "12%", size: "w-1 h-1", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.5s", delay: "0.2s" },
  { top: "82%", left: "24%", size: "w-[3px] h-[3px]", bg: "bg-white", glow: "#E0F2FE", duration: "2.9s", delay: "1.4s" },
  { top: "78%", left: "38%", size: "w-1 h-1", bg: "bg-cyan-200", glow: "#67E8F9", duration: "3.1s", delay: "0.8s" },
  { top: "88%", left: "46%", size: "w-[3px] h-[3px]", bg: "bg-sky-200", glow: "#38BDF8", duration: "2.8s", delay: "1.7s" },
  { top: "78%", right: "30%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "2.9s", delay: "1.7s" },
  { top: "84%", right: "16%", size: "w-1.5 h-1.5", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.4s", delay: "0.9s" },
  { top: "82%", right: "4%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "2.3s", delay: "0.4s" },
  { top: "90%", left: "16%", size: "w-[3px] h-[3px]", bg: "bg-cyan-200", glow: "#67E8F9", duration: "3.2s", delay: "1.1s" },
  { top: "92%", right: "26%", size: "w-1 h-1", bg: "bg-white", glow: "#FFFFFF", duration: "2.6s", delay: "1.3s" },
  { top: "90%", right: "44%", size: "w-[3px] h-[3px]", bg: "bg-sky-200", glow: "#38BDF8", duration: "3.0s", delay: "0.3s" },
];

export function ConstellationSection() {
  return (
    <section
      id="constellation-section"
      className="relative w-full min-h-[720px] lg:min-h-[820px] bg-[#020817] bg-cover bg-center bg-no-repeat overflow-hidden text-white flex flex-col justify-between scroll-mt-0"
      style={{
        backgroundImage: "url('/background/milky_way_bg.png')",
      }}
    >
      {/* Subtle Milky Way Space Overlay */}
      <div className="absolute inset-0 bg-[#020817]/15 pointer-events-none" />

      {/* Shining Particles (Exact same glowing & blinking style as CTA, delicate size) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
        {CONSTELLATION_SHINING_PARTICLES.map((particle, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full ${particle.size} ${particle.bg} animate-twinkle`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
              boxShadow: `0 0 6px 1.5px ${particle.glow}`,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content Container matching Figma spacing and dimensions */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 lg:pt-10 pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center w-full my-auto">
          
          {/* ================= LEFT COLUMN: Text, Buttons, & Callout ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Top Pill Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFD028] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-3 select-none hover:scale-105 transition-transform"
            >
              <span className="text-xs">✨</span>
              <span
                className="text-[11px] sm:text-[11.5px] font-black tracking-wider uppercase flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span>🎮</span>
                <span>6 GAMES · ONE UNIQUE MIND</span>
              </span>
            </div>

            {/* Eyebrow with Orange Dash */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-[3px] bg-[#FF9800] rounded-full shrink-"></span>
              <span
                className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[1.4px] text-slate-300"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                SIX GAMES. INFINITE PATTERNS.
              </span>
            </div>

            {/* Main Headline matching Figma */}
            <h2
              className="text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[50px] font-[800] text-white leading-[1.08] tracking-[-1.5px] mb-3.5"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              No Two Constellations Are
              <br />
              The Same.
              <br />
              Neither Are Two Learners.
            </h2>

            {/* "THAT'S THE WHOLE POINT" Pink Badge Button */}
            <div className="mb-3.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF8CC7] text-[#0A1D3D] rounded-full border-2 border-[#FFFFFF] shadow-[2px_2px_0px_0px_#FFFFFF] text-[11px] sm:text-xs font-black uppercase tracking-wide hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span>🌸</span>
                <span>THAT&apos;S THE WHOLE POINT</span>
                <span className="text-xs">→</span>
              </button>
            </div>

            {/* Descriptive Paragraph */}
            <p
              className="text-[14px] sm:text-[15px] font-[400] text-[#CBD5E1] leading-[1.6] max-w-[520px] mb-4 sm:mb-5"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Every child brings a unique pattern of abilities. OrionKids explores
              how they think, learn and connect through six games, so support
              can begin with understanding.
            </p>

            {/* 6 Game Filter / Interactive Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5 max-w-[650px]">
              {GAME_BADGES.map((game) => (
                <button
                  key={game.name}
                  type="button"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 ${game.bg} text-[#0A1D3D] rounded-full border-2 border-[#FFFFFF] shadow-[2px_2px_0px_0px_##FFFFFF] text-[11px] sm:text-xs font-bold tracking-tight hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none`}
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span className="text-[10px] text-[#0A1D3D]">★</span>
                  <span>{game.name}</span>
                </button>
              ))}
            </div>

            {/* Bottom Learning Profile Callout Card (Single-line rounded pill) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#EBF8FF] text-[#0A1D3D] rounded-2xl border-2 border-[#FFFFFF] shadow-[2px_2px_0px_0px_#FFFFFF] select-none max-w-full">
              <span className="text-base select-none">⭐</span>
              <p
                className="text-[12px] sm:text-[13px] font-bold text-[#0A1D3D] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                A learning profile, not a label. Personal growth, not comparison.
              </p>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: Constellation Star Map ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full flex flex-col justify-center select-none">
            
            {/* Top Right Badges */}
            <div className="flex items-center justify-end gap-2.5 mb-2 z-20">
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#65DCAA] text-[#0A1D3D] rounded-full border-2 border-[#FFFFFF] shadow-[2px_2px_0px_#FFFFFF] text-xs font-black select-none hover:scale-105 transition-transform"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span className="text-[11px] text-[#0A1D3D]">★</span>
                <span>6 Games</span>
              </div>

              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#38BDF8] text-[#0A1D3D] rounded-full border-2 border-[#FFFFFF] shadow-[2px_2px_0px_#FFFFFF] text-xs font-black select-none hover:scale-105 transition-transform"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span className="text-[11px]">✨</span>
                <span>Playful Learning</span>
              </div>
            </div>

            {/* Constellation Canvas & Star Map (Exact structure matching Figma prototype) */}
            <div className="relative w-full aspect-[600/680] max-h-[500px] lg:max-h-[540px] xl:max-h-[600px] flex items-center justify-center">
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

                {/* Club Arc Vertices Dots */}
                <circle cx="165" cy="32" r="2.5" fill="#00E5FF" opacity="0.8" />
                <circle cx="200" cy="35" r="2.5" fill="#00E5FF" opacity="0.8" />
                <circle cx="120" cy="130" r="2.5" fill="#00E5FF" opacity="0.8" />
                <circle cx="135" cy="145" r="2.5" fill="#00E5FF" opacity="0.8" />
                <circle cx="145" cy="235" r="2.5" fill="#00E5FF" opacity="0.8" />

                {/* 2. Left Shoulder (Rule discovery, 170,260) to Head (Stroop colour-word, 252,226) */}
                <line
                  x1="170"
                  y1="260"
                  x2="252"
                  y2="226"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 3. Head (252,226) to Center Chest Star (288,290) */}
                <line
                  x1="252"
                  y1="226"
                  x2="288"
                  y2="290"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="4 4"
                  strokeOpacity="0.85"
                  strokeLinecap="round"
                />

                {/* 4. Left Shoulder (170,260) to Center Chest Star (288,290) */}
                <line
                  x1="170"
                  y1="260"
                  x2="288"
                  y2="290"
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

                {/* 6. Center Chest Star (288,290) horizontal connector to right arm (at 438,245) */}
                <line
                  x1="288"
                  y1="290"
                  x2="438"
                  y2="245"
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

                {/* 8. Center Chest Star (288,290) down to Right Belt Star (242,410) */}
                <line
                  x1="288"
                  y1="290"
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

                {/* 10. Orion's Sword */}
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
                {/* Center Chest Star (288,290) */}
                <circle cx="288" cy="290" r="8" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                <circle cx="288" cy="290" r="4.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />

                {/* Right Arm Intermediate Star (438,245) */}
                <circle cx="438" cy="245" r="8" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                <circle cx="438" cy="245" r="4.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                

                {/* Orion's Belt (3 Stars) */}
                {/* Left Belt Star (202,438) */}
                <circle cx="202" cy="438" r="11" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                <circle cx="202" cy="438" r="5.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />

                {/* Middle Belt Star (224,424) */}
                <circle cx="224" cy="424" r="11" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                <circle cx="224" cy="424" r="5.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />

                {/* Right Belt Star (242,410) - Large Radiant Star with Double Aura */}
                <circle cx="242" cy="410" r="18" fill="#ffffffff" fillOpacity="0.1" filter="url(#radiant-glow)" />
                <circle cx="242" cy="410" r="7" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />

                {/* Sword Stars */}
                <circle cx="226" cy="486" r="3" fill="#67E8F9" opacity="0.9" />
                <circle cx="224" cy="500" r="2.5" fill="#67E8F9" opacity="0.8" />

                {/* ORIONKIDS Tiny Brand Label */}
                <text
                  x="214"
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
                  {/* Badge & Title above star */}
                  <rect x="233" y="166" width="42" height="17" rx="8.5" fill="#65DCAA" stroke="#ffffffff" strokeWidth="2" />
                  <text x="254" y="178" textAnchor="middle" fill="#0A1D3D" fontSize="8.5" fontWeight="800" fontFamily="var(--font-plus-jakarta)">FOCUS</text>
                  <text x="254" y="196" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Stroop Colour-Word.</text>

                  {/* Star */}
                  <circle cx="254" cy="216" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="254" cy="216" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  
                </g>

                {/* 2. RULES / Rule discovery */}
                <g className="cursor-pointer group">
                  {/* Star */}
                  <circle cx="170" cy="260" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="170" cy="260" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  {/* Badge & Title */}
                  <rect x="100" y="260" width="40" height="17" rx="8.5" fill="#65DCAA" stroke="#ffffffff" strokeWidth="2" />
                  <text x="120" y="272" textAnchor="middle" fill="#0A1D3D" fontSize="8.5" fontWeight="800" fontFamily="var(--font-plus-jakarta)">RULES</text>
                  <text x="100" y="291" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Rule Discovery.</text>
                  <text x="95" y="304" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Abstract thinking & rules</text>
                </g>

                {/* 3. MEMORY / Card flip */}
                <g className="cursor-pointer group">
                  {/* Star */}
                  <circle cx="420" cy="168" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="420" cy="168" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  {/* Badge & Title */}
                  <rect x="446" y="142" width="50" height="17" rx="8.5" fill="#E6F4FF" stroke="#ffffffff" strokeWidth="2" />
                  <text x="471" y="154" textAnchor="middle" fill="#0A1D3D" fontSize="8.5" fontWeight="800" fontFamily="var(--font-plus-jakarta)">MEMORY</text>
                  <text x="471" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Card Flip.</text>
                  <text x="495" y="185" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Working memory & recall</text>
                </g>

                {/* 4. LOGIC / Pattern recognition */}
                <g className="cursor-pointer group">
                  {/* Star */}
                  <circle cx="410" cy="358" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="410" cy="358" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  {/* Badge & Title */}
                  <rect x="460" y="332" width="40" height="17" rx="8.5" fill="#65DCAA" stroke="#ffffffff" strokeWidth="2" />
                  <text x="480" y="344" textAnchor="middle" fill="#0A1D3D" fontSize="8.5" fontWeight="800" fontFamily="var(--font-plus-jakarta)">LOGIC</text>
                  <text x="490" y="363" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Pattern Recognition.</text>
                  <text x="490" y="376" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Logic & visual reasoning</text>
                </g>

                {/* 5. NARRATIVE / Story sequencing */}
                <g className="cursor-pointer group">
                  {/* Star */}
                  <circle cx="155" cy="578" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="155" cy="578" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  {/* Badge & Title */}
                  <rect x="80" y="562" width="56" height="17" rx="8.5" fill="#E6F4FF" stroke="#ffffffff" strokeWidth="2" />
                  <text x="110" y="574" textAnchor="middle" fill="#0A1D3D" fontSize="8" fontWeight="800" fontFamily="var(--font-plus-jakarta)">NARRATIVE</text>
                  <text x="80" y="593" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Story Sequencing.</text>
                  <text x="95" y="606" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">· Narrative & social</text>
                  <text x="110" y="618" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontWeight="400" fontFamily="var(--font-inter)">reasoning</text>
                </g>

                {/* 6. LANGUAGE / Odd one out */}
                <g className="cursor-pointer group">
                  {/* Star */}
                  <circle cx="294" cy="560" r="14" fill="#ffffffff" fillOpacity="0.1" filter="url(#star-glow)" />
                  <circle cx="294" cy="560" r="6.5" fill="#FEF08A" stroke="#ffffffff" strokeWidth="2" />
                  
                  {/* Title & White LANGUAGE Badge */}
                  <text x="296" y="592" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="var(--font-plus-jakarta)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">Odd One Out.</text>
                  <rect x="268" y="602" width="56" height="18" rx="9" fill="#E6F4FF" stroke="#ffffffff" strokeWidth="2" />
                  <text x="296" y="614" textAnchor="middle" fill="#0A1D3D" fontSize="8.5" fontWeight="800" fontFamily="var(--font-plus-jakarta)">LANGUAGE</text>
                </g>
              </svg>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Ticker Marquee Bar */}
      <div className="relative z-10 w-full bg-[#EAF7EF]/10 opacity-[0.8] backdrop-blur-md border-t border-white/10 py-3.5 px-4 overflow-hidden select-none">
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap text-[11px] sm:text-xs font-bold uppercase tracking-[2px] text-white/80">
          {TICKER_ITEMS.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2">
                <span className="text-white text-xs select-none">✦</span>
                <span className="whitespace-nowrap">{item}</span>
              </div>
              {idx !== TICKER_ITEMS.length - 1 && (
                <span className="text-white/40 select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
