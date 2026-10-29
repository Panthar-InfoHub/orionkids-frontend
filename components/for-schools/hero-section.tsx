"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

/* ------------------------------------------------------------------ */
/*  Feature pills at bottom of left column                             */
/* ------------------------------------------------------------------ */
const FEATURE_PILLS = [
  { icon: "✅", text: "PLAY-BASED CLASSROOM OBSERVATIONS", bg: "#E8F9F0" },
  { icon: "📜", text: "NEP 2020 ALIGNED", bg: "#E0EAFF" },
  { icon: "🛡️", text: "NOT A CLINICAL TOOL", bg: "#E8F9F0" },
  { icon: "✨", text: "TEACHER-LED SUPPORT", bg: "#E8F9F0" },
];

/* ------------------------------------------------------------------ */
/*  Small inline icons for the Insights card                           */
/* ------------------------------------------------------------------ */
function RadarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="11" fill="#1E5FBF" />
      <circle cx="12" cy="12" r="7" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1" fill="#FFFFFF" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#1E5FBF" aria-hidden="true" className="shrink-0">
      <rect x="1" y="9" width="3" height="6" rx="0.8" />
      <rect x="6.5" y="5" width="3" height="10" rx="0.8" />
      <rect x="12" y="1.5" width="3" height="13.5" rx="0.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section Component                                              */
/* ------------------------------------------------------------------ */
export function ForSchoolsHeroSection() {
  const [isLabOpen, setIsLabOpen] = useState(true);

  return (
    <section className="relative w-full bg-white pt-6 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
      {/* Soft mint glow behind bottom-right of the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(101,220,170,0.20) 0%, rgba(101,220,170,0.10) 40%, rgba(101,220,170,0) 70%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_472px] gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="relative flex flex-col items-start text-left z-10 pt-2 lg:pt-4">
            {/* Upper Pill: FOR EDUCATORS & SCHOOLS • CLASSES 1–8 */}
            <div
              className="inline-flex items-center gap-2 rounded-full select-none mb-5"
              style={{
                height: "28px",
                paddingLeft: "14px",
                paddingRight: "14px",
                backgroundColor: "#F0E6FF",
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.6px",
                textTransform: "uppercase" as const,
                color: "#0E1C32",
              }}
            >
              <span className="text-sm select-none">🪐</span>
              <span>FOR EDUCATORS & SCHOOLS • CLASSES 1–8</span>
            </div>

            {/* Headline and Robot Wrapper */}
            <div className="relative w-full max-w-[640px]">
              {/* Main Headline */}
              <h1
                className="mb-4"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  color: "#0A1D3D",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  lineHeight: "1.18",
                  letterSpacing: "-1.2px",
                }}
              >
                <span>Every Child is a</span>
                <br />
                {/* "Constellation" badge */}
                <span className="inline-block relative mt-1">
                  <span
                    className="inline-flex items-center justify-center px-3 py-0.5"
                    style={{
                      backgroundColor: "#0A1D3D",
                      color: "#FFFFFF",
                      borderRadius: "12px",
                      border: "3px solid #0E1C32",
                      boxShadow: "4px 5px 0px 0px #0E1C32",
                      transform: "rotate(1deg)",
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "clamp(28px, 4vw, 48px)",
                      lineHeight: "inherit",
                      letterSpacing: "-1.2px",
                    }}
                  >
                    Constellation
                  </span>
                </span>{" "}
                <span>of</span>
                <br />
                <span>Potential.</span>
              </h1>

              {/* Waving Robot (robo5.png) matching Figma placement */}
              <div
                className="absolute pointer-events-none select-none z-20 transition-transform hover:scale-105 duration-300
                           w-[85px] h-[85px] top-0 right-0 sm:right-auto
                           sm:w-[110px] sm:h-[110px] sm:top-1 sm:left-[340px]
                           md:w-[130px] md:h-[130px] md:top-1 md:left-[360px]
                           lg:w-[150px] lg:h-[150px] lg:top-1 lg:left-[360px]
                           xl:w-[170px] xl:h-[170px] xl:top-0 xl:left-[390px]"
              >
                <Image
                  src="/robots/robo5.png"
                  alt="Waving OrionKids Robot"
                  width={170}
                  height={170}
                  className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(14,28,50,0.15)]"
                  priority
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="mb-6 max-w-[580px] lg:max-w-[500px] xl:max-w-[560px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "29.25px",
                letterSpacing: "0px",
                color: "#526176",
              }}
            >
              Explore how children learn through play with OrionKids. Our AI platform helps educators
              identify strategies and plan daily classroom support, providing insights without needing
              diagnosis or medical screening.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Primary CTA */}
              <button
                type="button"
                className="inline-flex items-center justify-center cursor-pointer select-none hover:scale-105 active:scale-95 transition-transform"
                style={{
                  height: "52px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderRadius: "9999px",
                  backgroundColor: "#FFD54F",
                  border: "3px solid #0A1D3D",
                  boxShadow: "4px 4px 0px 0px #0A1D3D",
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "15px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  color: "#0A1D3D",
                  whiteSpace: "nowrap" as const,
                }}
              >
                Request School Demo & Pilot Kit 🏫 →
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                className="inline-flex items-center justify-center cursor-pointer select-none hover:scale-105 active:scale-95 transition-transform"
                style={{
                  height: "49px",
                  paddingLeft: "22px",
                  paddingRight: "24px",
                  borderRadius: "9999px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #0A1D3D",
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "14px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                  color: "#0A1D3D",
                  whiteSpace: "nowrap" as const,
                }}
              >
                📄 Sample Student Report
              </button>
            </div>

            {/* Feature Pills Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {FEATURE_PILLS.map((pill) => (
                <div
                  key={pill.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full select-none"
                  style={{
                    backgroundColor: pill.bg,
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.72px",
                    textTransform: "uppercase" as const,
                    color: "#0E1C32",
                  }}
                >
                  <span className="text-xs leading-none">{pill.icon}</span>
                  <span>{pill.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          {/*
            Measured from the Figma screenshot (1.25x zoom), values in Figma px:
              card        ~472 wide, white, radius 24, hard navy shadow 6/6, padding 16 (bottom 20)
              photo       full width, 256 tall, radius 20
              badge       24 tall, mint, top 15 / right 8
              caption     28 tall translucent navy pill, left 12 / bottom 12
              insights    full width, #F5F9FF, radius 16, padding 12, 20px below photo
              chart box   white, radius 12, ~94 tall
          */}
          <div className="relative w-full lg:ml-auto" style={{ maxWidth: "472px" }}>
            {/* Card */}
            <div
              className="relative w-full bg-white"
              style={{
                borderRadius: "24px",
                padding: "16px 16px 20px 16px",
                boxShadow: "6px 6px 0 0 #0A1D3D",
              }}
            >
              {/* Photo */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: "20px",
                  aspectRatio: "440 / 256",
                }}
              >
                <Image
                  src="/svg/school-hero.png"
                  alt="Classroom play session — children learning together"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 440px"
                  priority
                />

                {/* Badge: top-right */}
                <div
                  className="absolute z-10 inline-flex items-center gap-1.5 rounded-full select-none whitespace-nowrap"
                  style={{
                    top: "15px",
                    right: "8px",
                    height: "24px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    backgroundColor: "#65DCAA",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.72px",
                    textTransform: "uppercase" as const,
                    color: "#0A1D3D",
                  }}
                >
                  <span className="text-xs leading-none">✿</span>
                  <span>LEARNING TOGETHER 🎯</span>
                </div>

                {/* Caption pill: bottom-left, on top of the photo */}
                <div
                  className="absolute z-10 inline-flex items-center gap-2 select-none"
                  style={{
                    left: "12px",
                    bottom: "12px",
                    maxWidth: "calc(100% - 24px)",
                    height: "28px",
                    paddingLeft: "10px",
                    paddingRight: "14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(10, 29, 61, 0.55)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    className="shrink-0 rounded-full"
                    style={{ width: "9px", height: "9px", backgroundColor: "#65DCAA" }}
                  />
                  <span
                    className="truncate"
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 500,
                      fontSize: "13px",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Example classroom play session
                  </span>
                </div>
              </div>

              {/* Sample Class Insights panel */}
              <div
                className="w-full"
                style={{
                  marginTop: "20px",
                  backgroundColor: "#F5F9FF",
                  borderRadius: "16px",
                  padding: "12px",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2" style={{ marginBottom: "10px" }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <RadarIcon />
                    <span
                      className="truncate"
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 800,
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "#0A1D3D",
                      }}
                    >
                      Sample Class Insights
                    </span>
                  </div>
                  <span
                    className="inline-flex shrink-0 items-center justify-center"
                    style={{
                      height: "20px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      borderRadius: "6px",
                      backgroundColor: "#DDF1FD",
                      fontFamily: SPACE,
                      fontWeight: 700,
                      fontSize: "11px",
                      lineHeight: "14px",
                      letterSpacing: "0.4px",
                      textTransform: "uppercase" as const,
                      color: "#1E5FBF",
                    }}
                  >
                    ILLUSTRATIVE
                  </span>
                </div>

                {/* Chart box */}
                <div
                  className="w-full bg-white"
                  style={{ borderRadius: "12px", aspectRatio: "519 / 118" }}
                >
                  <svg
                    viewBox="0 0 519 118"
                    className="block h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Illustrative learning pattern chart"
                  >
                    {/* Guide lines */}
                    <line x1="109" y1="5" x2="409" y2="5" stroke="#D5EAF5" strokeWidth="1.5" />
                    <line
                      x1="109"
                      y1="58"
                      x2="409"
                      y2="58"
                      stroke="#C6D2DE"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />

                    {/* Wave */}
                    <path
                      d="M109 71 C135 45 190 28 234 52 C255 63 262 64 285 60 C315 54 322 36 334 33 C350 24 358 17 372 17 C392 17 404 45 409 64"
                      stroke="#00698F"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Mint points on the line */}
                    <circle cx="109" cy="71" r="5" fill="#65DCAA" />
                    <circle cx="234" cy="52" r="5" fill="#65DCAA" />
                    <circle cx="409" cy="64" r="5" fill="#65DCAA" />

                    {/* Blue points */}
                    <circle cx="172" cy="30" r="5" fill="#1E5FBF" />
                    <circle cx="334" cy="33" r="6.5" fill="#1E5FBF" />

                    {/* Labels */}
                    <text
                      x="197"
                      y="98"
                      textAnchor="middle"
                      fill="#475569"
                      style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "11px", letterSpacing: "0.2px" }}
                    >
                      WORKING MEMORY
                    </text>
                    <text
                      x="347"
                      y="98"
                      textAnchor="middle"
                      fill="#475569"
                      style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "11px", letterSpacing: "0.2px" }}
                    >
                      RULE DISCOVERY
                    </text>
                  </svg>
                </div>

                {/* Bottom row */}
                <div
                  className="flex items-center justify-between gap-2"
                  style={{ marginTop: "12px", paddingLeft: "2px", paddingRight: "6px" }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BarsIcon />
                    <span
                      className="truncate"
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#1E5FBF",
                      }}
                    >
                      Example: spots patterns
                    </span>
                  </div>
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "#0A1D3D",
                    }}
                  >
                    Try picture cues
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NEP 2020 INNOVATIVE LABS INTEGRATED BLOCK ================= */}
        <div className="relative mt-14 lg:mt-20 pt-10 lg:pt-14 border-t border-[#F0E6FF] flex flex-col items-center">
          {/* Eyebrow badge matching Screenshot 2 */}
          <div
            className="inline-flex items-center gap-2 rounded-full select-none mb-3.5 shadow-[2px_2px_0px_0px_#0A1D3D]"
            style={{
              height: "28px",
              paddingLeft: "14px",
              paddingRight: "14px",
              backgroundColor: "#E0EAFF",
              fontFamily: SPACE,
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "#1E5FBF",
              border: "1.5px solid #0A1D3D",
            }}
          >
            <span>🏛️</span>
            <span>NEP 2020 FOR SCHOOLS</span>
          </div>

          {/* Heading matching Screenshot 2 */}
          <h2
            className="mb-8 sm:mb-10 text-center max-w-[840px] mx-auto"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              color: "#0A1D3D",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              lineHeight: "1.25",
              letterSpacing: "-0.8px",
            }}
          >
            Upgrade Your School With{" "}
            <span className="relative inline-block">
              <span
                className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-[12px]"
                style={{
                  backgroundColor: "#1E5FBF",
                  color: "#FFFFFF",
                  border: "2px solid #0A1D3D",
                  boxShadow: "3px 4px 0px 0px #0A1D3D",
                  transform: "rotate(-0.5deg)",
                }}
              >
                NEP 2020–Based
              </span>
            </span>{" "}
            Fun Brain Labs
          </h2>

          {/* 2-Column Grid for Screenshots 3 & 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch w-full max-w-[1240px] mx-auto">
            {/* Left Card: OrionKids NEP 2020 Brain Lab */}
            <div
              className="flex flex-col justify-between rounded-[24px] p-6 sm:p-8 bg-white transition-all duration-200"
              style={{
                border: "2.5px solid #F59E0B",
                boxShadow: "6px 6px 0px 0px #0A1D3D",
              }}
            >
              <div>
                {/* Header row with interactive toggle */}
                <button
                  type="button"
                  onClick={() => setIsLabOpen(!isLabOpen)}
                  className="w-full flex items-center justify-between text-left gap-3 group cursor-pointer"
                >
                  <h3
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "clamp(18px, 2vw, 22px)",
                      lineHeight: "1.35",
                      color: "#0A1D3D",
                    }}
                  >
                    What is the OrionKids NEP 2020 Brain Lab?
                  </h3>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg select-none transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: "#FEF3C7",
                      color: "#D97706",
                      border: "1.5px solid #F59E0B",
                    }}
                    aria-label={isLabOpen ? "Collapse answer" : "Expand answer"}
                  >
                    {isLabOpen ? "—" : "+"}
                  </span>
                </button>

                {/* Answer body */}
                {isLabOpen && (
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 500,
                      fontSize: "15px",
                      lineHeight: "1.7",
                      color: "#475569",
                    }}
                  >
                    It&apos;s an in-school cognitive discovery program where students explore{" "}
                    <strong className="font-bold text-[#0A1D3D]">OrionKids&apos; play-based learning quests</strong>{" "}
                    — strengthening working memory, pattern recognition, spatial reasoning, and creative problem solving — guided by teachers and aligned with NEP 2020 competency standards.
                  </p>
                )}
              </div>

              {/* Curriculum Skill Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-[#F3F4F6]">
                {[
                  { label: "Working Memory", icon: "🧠" },
                  { label: "Pattern Discovery", icon: "🔍" },
                  { label: "Spatial Reasoning", icon: "🧩" },
                  { label: "Creative Thinking", icon: "💡" },
                  { label: "Focus & Attention", icon: "🎯" },
                ].map((skill) => (
                  <span
                    key={skill.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full select-none"
                    style={{
                      backgroundColor: "#FEF3C7",
                      color: "#92400E",
                      border: "1px solid #FDE68A",
                      fontFamily: SPACE,
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
                    <span>{skill.icon}</span>
                    <span>{skill.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Card: Meets NEP 2020 Requirements */}
            <div
              className="flex flex-col justify-between rounded-[24px] p-6 sm:p-8 text-white transition-all duration-200"
              style={{
                backgroundColor: "#1E5FBF",
                border: "2.5px solid #0A1D3D",
                boxShadow: "6px 6px 0px 0px #0A1D3D",
              }}
            >
              <div>
                {/* Title with Scroll Emoji */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-2xl select-none" aria-hidden="true">
                    📜
                  </span>
                  <h3
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                      lineHeight: "1.3",
                      color: "#FFFFFF",
                    }}
                  >
                    Meets NEP 2020 Requirements
                  </h3>
                </div>

                {/* Paragraph */}
                <p
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "1.65",
                    color: "rgba(255, 255, 255, 0.94)",
                  }}
                >
                  OrionKids directly supports NEP 2020&apos;s mandate for{" "}
                  <strong className="font-bold text-white">regular, formative, and competency-based assessment</strong>{" "}
                  — moving beyond rote marks to help teachers understand each child&apos;s unique thinking strategies and potential.
                </p>
              </div>

              {/* Bottom Highlight Callout */}
              <div
                className="mt-6 flex items-center gap-3 p-4 rounded-[16px] select-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.14)",
                  border: "1.5px solid rgba(255, 255, 255, 0.28)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  ⭐
                </span>
                <span
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "15px",
                    lineHeight: "22px",
                    color: "#FFD54F",
                  }}
                >
                  Designed for Classes 1–8 • Play-Based, Non-Clinical & Teacher-Led.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
