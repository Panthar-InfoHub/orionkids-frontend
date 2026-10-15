"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

/* ------------------------------------------------------------------ */
/*  Custom SVGs for the 6 Mini Games                                   */
/* ------------------------------------------------------------------ */
function StroopFocusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="#FFFFFF" strokeWidth="1.8" />
      <path d="M10 2 A8 8 0 0 1 10 18 Z" fill="#FFFFFF" />
    </svg>
  );
}

function CardFlipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="6"
        y="4"
        width="10"
        height="13"
        rx="2"
        transform="rotate(-10 6 4)"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <rect x="7" y="3" width="10" height="13" rx="2" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

function PatternHuntIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {/* Triangle top */}
      <polygon points="10,2 14,8 6,8" stroke="#FFFFFF" strokeWidth="1.6" fill="none" />
      {/* Square bottom-left */}
      <rect x="4" y="11" width="5" height="5" stroke="#FFFFFF" strokeWidth="1.6" />
      {/* Circle bottom-right */}
      <circle cx="14" cy="13.5" r="3" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

function OddOneOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="#FFFFFF" strokeWidth="1.8" />
      <path d="M13.5 13.5L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RuleShifterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2C6 2 4 4.5 4 8C4 10.5 5.5 12 7 13.5V16H13V13.5C14.5 12 16 10.5 16 8C16 4.5 14 2 10 2Z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 7C9 6 10 5.5 10.5 6C11 6.5 10.5 7.5 10 8V9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="11" r="0.75" fill="#FFFFFF" />
    </svg>
  );
}

function StoryChainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 5.5C5.5 4.5 8 5 10 6.5C12 5 14.5 4.5 17 5.5V16.5C14.5 15.5 12 16 10 17.5C8 16 5.5 15.5 3 16.5V5.5Z"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="10" y1="6.5" x2="10" y2="17.5" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Mini-Games Data                                                     */
/* ------------------------------------------------------------------ */
const MINI_GAMES = [
  {
    icon: <StroopFocusIcon />,
    title: "Stroop Focus",
    subtitle: "Cognitive Control",
  },
  {
    icon: <CardFlipIcon />,
    title: "Card Flip",
    subtitle: "Working Memory",
  },
  {
    icon: <PatternHuntIcon />,
    title: "Pattern Hunt",
    subtitle: "Spatial Logic",
  },
  {
    icon: <OddOneOutIcon />,
    title: "Odd One Out",
    subtitle: "Categorization",
  },
  {
    icon: <RuleShifterIcon />,
    title: "Rule Shifter",
    subtitle: "Mental Flexibility",
  },
  {
    icon: <StoryChainIcon />,
    title: "Story Chain",
    subtitle: "Narrative Logic",
  },
];

/* ------------------------------------------------------------------ */
/*  Mini Games Section Component                                        */
/* ------------------------------------------------------------------ */
export function ForParentsMiniGamesSection() {
  return (
    <section className="relative w-full bg-white pt-2 pb-12 lg:pt-4 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================= HEADER AREA (2 COLUMNS) ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-12">
          {/* Left Column: Tag + Headline */}
          <div className="max-w-[740px]">
            {/* Top Tag */}
            <div
              className="flex items-center gap-2 mb-3 select-none"
              style={{
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "#0A1D3D",
              }}
            >
              <span className="text-sm select-none" aria-hidden="true">
                ✪
              </span>
              <span>6 MINI-GAMES • ZERO INTIMIDATION</span>
            </div>

            {/* Main Headline */}
            <h2
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "clamp(26px, 3.6vw, 40px)",
                lineHeight: "clamp(36px, 4.4vw, 56px)",
                letterSpacing: "-0.8px",
                color: "#0A1D3D",
              }}
            >
              <span className="block lg:whitespace-nowrap">No two constellations are the same.</span>
              <span className="block lg:whitespace-nowrap">Neither are two learners.</span>
            </h2>
          </div>

          {/* Right Column: Description Text */}
          <div className="max-w-[508px] lg:pb-2">
            <p
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "24px",
                letterSpacing: "0px",
                color: "#0A1D3D",
              }}
            >
              OrionKids explores how children approach uncertainty, synthesize stories, and pivot strategies across playful mini-adventures.
            </p>
          </div>
        </div>

        {/* ================= 6 BOXES ROW / GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
          {MINI_GAMES.map((game) => (
            <div
              key={game.title}
              className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-[16px] transition-transform duration-200 hover:-translate-y-1 select-none cursor-default"
              style={{
                minHeight: "92px",
                backgroundColor: "#0A1D3D",
                boxShadow: "4px 4px 0px 0px #FFD028",
              }}
            >
              {/* Icon */}
              <div className="mb-1.5 flex items-center justify-center text-white">
                {game.icon}
              </div>

              {/* Main Heading inside box */}
              <h3
                className="text-center"
                style={{
                  fontFamily: SPACE,
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "20px",
                  letterSpacing: "0px",
                  color: "#FFFFFF",
                }}
              >
                {game.title}
              </h3>

              {/* Subtitle / category inside box */}
              <p
                className="text-center"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "16.5px",
                  letterSpacing: "0px",
                  color: "#94A3B8",
                }}
              >
                {game.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
