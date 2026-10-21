"use client";

import React from "react";
import Link from "next/link";

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
Wave farewell to unclear report cards and percentile stress. OrionKids transforms 15-minute engaging games into transparent, AI-driven insights and conversation starters for your family discussions.            </p>
          </div>

      {/* ================= RIGHT COLUMN (INSIGHT CARD) ================= */}
<div className="lg:col-span-5 relative w-full pt-8 lg:pt-6 pr-6 pb-6">
  <div
    className="relative w-full bg-white rounded-[24px] border-[2.5px] border-[#0A1D3D] p-6"
    style={{ boxShadow: "7px 7px 0px 0px #0A1D3D" }}
  >
    {/* Top-right testimonial badge */}
    <div
      className="absolute -top-6 -right-10 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-[#0A1D3D] select-none whitespace-nowrap rotate-[2deg]"
      style={{
        boxShadow: "3px 3px 0px 0px #0A1D3D",
        fontFamily: JAKARTA,
        fontWeight: 700,
        fontSize: "13px",
        color: "#0A1D3D",
      }}
    >
      <span>❤️</span>
      <span>&quot;Gave us peace of mind&quot; — Priya M., Mom of 2</span>
    </div>

    {/* Header */}
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#BFE3FA] flex items-center justify-center text-xl select-none">
          👦
        </div>
        <div>
          <h3
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "17px",
              lineHeight: "22px",
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
              lineHeight: "16px",
              color: "#4B5563",
            }}
          >
            Age 8 • Last played: Yesterday 4:15 PM
          </p>
        </div>
      </div>

      <span
        className="px-2.5 py-1 rounded-[6px] select-none uppercase"
        style={{
          backgroundColor: "#DDEFFC",
          color: "#0A1D3D",
          fontFamily: SPACE,
          fontWeight: 700,
          fontSize: "10px",
          lineHeight: "14px",
          letterSpacing: "0.3px",
        }}
      >
        WEEK 2 DIGEST
      </span>
    </div>

    {/* Box 1: Star strength */}
    <div className="rounded-[14px] px-4 py-3.5 bg-[#E8F5EC] border border-[#8FD3E3] mb-4">
      <div
        className="mb-2 flex items-center gap-1.5"
        style={{
          fontFamily: SPACE,
          fontWeight: 700,
          fontSize: "11px",
          lineHeight: "14px",
          letterSpacing: "0.4px",
          color: "#0A1D3D",
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
          fontSize: "15px",
          lineHeight: "22px",
          color: "#1F2937",
        }}
      >
        Aarav prefers non-linear shortcuts to solve complex puzzles, staying
        focused and synthesizing ideas!
      </p>
    </div>

    {/* Box 2: Dinner prompt */}
    <div className="rounded-[14px] px-4 py-3.5 bg-white border-2 border-[#12B5CB] mb-5">
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center gap-1.5"
          style={{
            fontFamily: SPACE,
            fontWeight: 700,
            fontSize: "11px",
            lineHeight: "14px",
            letterSpacing: "0.3px",
            color: "#0A1D3D",
            textTransform: "uppercase",
          }}
        >
          <span>🍴</span>
          <span>TONIGHT&apos;S 5-MINUTE DINNER PROMPT 🍝</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-[5px] select-none whitespace-nowrap"
          style={{
            backgroundColor: "#4FC3F7",
            color: "#0A1D3D",
            fontFamily: JAKARTA,
            fontWeight: 700,
            fontSize: "11px",
            lineHeight: "16px",
          }}
        >
          Try Tonight
        </span>
      </div>

      <p
        className="mb-2"
        style={{
          fontFamily: JAKARTA,
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#0A1D3D",
        }}
      >
        Ask him:{" "}
        <em>&quot;If a clock ran backwards, what would happen to breakfast?&quot;</em>
      </p>
      <p
        className="italic"
        style={{
          fontFamily: JAKARTA,
          fontWeight: 500,
          fontSize: "11px",
          lineHeight: "15px",
          color: "#4B5563",
        }}
      >
        💡 Encourages his temporal sequencing strength naturally.
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pb-1">
      <div
        className="flex items-center gap-2"
        style={{
          fontFamily: JAKARTA,
          fontWeight: 700,
          fontSize: "12px",
          color: "#3F3D56",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <span>3 quests completed this week</span>
      </div>

      <Link
        href="/report"
        className="cursor-pointer hover:underline"
        style={{
          fontFamily: JAKARTA,
          fontWeight: 700,
          fontSize: "13px",
          color: "#6D3FC0",
        }}
      >
        Full Report →
      </Link>
    </div>

    {/* Bottom-left stress badge */}
    <div
      className="absolute -bottom-6 -left-7 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full border-[2.5px] border-[#0A1D3D] select-none whitespace-nowrap rotate-[-2deg]"
      style={{
        backgroundColor: "#4FC3F7",
        color: "#0A1D3D",
        boxShadow: "3px 3px 0px 0px #0A1D3D",
        fontFamily: SPACE,
        fontWeight: 700,
        fontSize: "13px",
        lineHeight: "16px",
        letterSpacing: "0.6px",
        textTransform: "uppercase",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A1D3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      <span>✨ 0% TEST STRESS • 100% JOYFUL PLAY</span>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}
