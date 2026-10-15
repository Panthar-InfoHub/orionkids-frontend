"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

export function ForParentsHeroSection() {
  return (
    <section className="relative w-full bg-white pt-8 pb-6 lg:pt-10 lg:pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Top Green Pill */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-6 select-none"
              style={{
                height: "28px",
                paddingLeft: "20px",
                paddingRight: "20px",
                backgroundColor: "#65DCAA",
                color: "#0A1D3D",
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.72px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-sm select-none" aria-hidden="true">
                🏡
              </span>
              <span>THE PARENT PORTAL • GENTLE CHILD UNDERSTANDING</span>
            </div>

            {/* Headline with Yellow Badge */}
            <h1
              className="mb-6"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                color: "#0A1D3D",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                lineHeight: "1.15",
                letterSpacing: "-1.4px",
              }}
            >
              <span>Understand How Your</span>
              <br />
              <span>Child Thinks ,</span>
              <br />
              {/* Yellow tilted badge box */}
              <span className="inline-block relative mt-2 mb-1">
                <span
                  className="inline-flex flex-col justify-center rounded-[16px] border-[2.5px] border-[#0A1D3D]"
                  style={{
                    backgroundColor: "#FFD028",
                    color: "#0A1D3D",
                    paddingTop: "6px",
                    paddingBottom: "8px",
                    paddingLeft: "20px",
                    paddingRight: "36px",
                    transform: "rotate(-1deg)",
                    boxShadow: "2px 2px 0px 0px #0A1D3D",
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "clamp(30px, 4.2vw, 54px)",
                    lineHeight: "1.15",
                    letterSpacing: "-1.4px",
                  }}
                >
                  <span>Over Dinner, Not Doctor</span>
                  <span>Visits.</span>
                </span>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p
              className="mb-2"
              style={{
                maxWidth: "560px",
                fontFamily: JAKARTA,
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "28px",
                letterSpacing: "0px",
                color: "#4E4633",
              }}
            >
              Say goodbye to ambiguous report cards and percentile anxiety. OrionKids turns 15-minute playful games into clear, loving insights and conversation starters for your kitchen table.
            </p>
          </div>

          {/* ================= RIGHT COLUMN (INSIGHT CARD) ================= */}
          <div className="lg:col-span-5 relative w-full pt-4 lg:pt-2">
            {/* Main Insight Card */}
            <div
              className="relative w-full bg-white rounded-[24px] border-[2.5px] border-[#0A1D3D] p-5 sm:p-6"
              style={{
                boxShadow: "7px 7px 0px 0px #0A1D3D",
              }}
            >
              {/* Top-Right Floating Testimonial Badge */}
              <div
                className="absolute -top-4 right-2 sm:right-5 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-[#0A1D3D] select-none whitespace-nowrap"
                style={{
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#0A1D3D",
                }}
              >
                <span className="text-red-500">❤️</span>
                <span>&ldquo;Gave us peace of mind&rdquo; — Priya M., Mom of 2</span>
              </div>

              {/* Card Header: Avatar, Name & Week 2 Digest */}
              <div className="flex items-center justify-between mb-4 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#38BDF8] flex items-center justify-center text-lg select-none">
                    👦
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 800,
                        fontSize: "15px",
                        lineHeight: "20px",
                        color: "#0A1D3D",
                      }}
                    >
                      Aarav&apos;s Sunday Discovery
                    </h3>
                    <p
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#64748B",
                      }}
                    >
                      Age 8 • Last played: Yesterday 4:15 PM
                    </p>
                  </div>
                </div>

                <span
                  className="px-2.5 py-0.5 rounded-[6px] select-none uppercase tracking-wider"
                  style={{
                    backgroundColor: "#EAF6FF",
                    color: "#1E5FBF",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "14px",
                  }}
                >
                  WEEK 2 DIGEST
                </span>
              </div>

              {/* Box 1: Star Strength */}
              <div className="rounded-[14px] p-3.5 bg-[#F2FBF7] border border-[#A7F3D0]/70 mb-3">
                <div
                  className="mb-1.5 flex items-center gap-1"
                  style={{
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "10.5px",
                    lineHeight: "14px",
                    letterSpacing: "0.6px",
                    color: "#065F46",
                    textTransform: "uppercase",
                  }}
                >
                  <span>☆</span>
                  <span>STAR STRENGTH: SPATIAL LOGIC &amp; DIVERGENT THINKING</span>
                </div>
                <p
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#334155",
                  }}
                >
                  Aarav prefers non-linear shortcuts to solve complex puzzles, staying focused and synthesizing ideas!
                </p>
              </div>

              {/* Box 2: Tonight's 5-Minute Dinner Prompt */}
              <div className="rounded-[14px] p-3.5 bg-[#F0FDF4] border border-[#65DCAA] relative mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: SPACE,
                      fontWeight: 700,
                      fontSize: "10.5px",
                      lineHeight: "14px",
                      letterSpacing: "0.5px",
                      color: "#0A1D3D",
                      textTransform: "uppercase",
                    }}
                  >
                    <span>🍴</span>
                    <span>TONIGHT&apos;S 5-MINUTE DINNER PROMPT 🍝</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full select-none"
                    style={{
                      backgroundColor: "#38BDF8",
                      color: "#FFFFFF",
                      fontFamily: SPACE,
                      fontWeight: 700,
                      fontSize: "9.5px",
                      lineHeight: "12px",
                    }}
                  >
                    Try Tonight
                  </span>
                </div>

                <p
                  className="mb-1.5 italic"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#0A1D3D",
                  }}
                >
                  Ask him: &ldquo;If a clock ran backwards, what would happen to breakfast?&rdquo;
                </p>
                <p
                  className="italic"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 500,
                    fontSize: "11px",
                    lineHeight: "15px",
                    color: "#64748B",
                  }}
                >
                  💡 Encourages his temporal sequencing strength naturally.
                </p>
              </div>

              {/* Card Footer: Quests completed & Full Report */}
              <div className="flex items-center justify-between pt-1">
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#7C3AED",
                  }}
                >
                  <span>✔</span>
                  <span>3 quests completed this week</span>
                </div>

                <button
                  type="button"
                  className="cursor-pointer font-bold text-xs hover:underline"
                  style={{
                    fontFamily: JAKARTA,
                    color: "#7C3AED",
                  }}
                >
                  Full Report →
                </button>
              </div>

              {/* Bottom-Left Floating Stress Badge */}
              <div
                className="absolute -bottom-3.5 -left-3 sm:-left-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 border-[#0A1D3D] select-none whitespace-nowrap"
                style={{
                  backgroundColor: "#38BDF8",
                  color: "#0A1D3D",
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                  fontFamily: SPACE,
                  fontWeight: 700,
                  fontSize: "11px",
                  lineHeight: "14px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                <span className="text-xs">🛡️</span>
                <span>0% TEST STRESS • 100% JOYFUL PLAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
