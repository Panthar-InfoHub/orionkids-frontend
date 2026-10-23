"use client";

import React from "react";
import Link from "next/link";

/**
 * Measured from the Figma screenshot (frame 1440 wide, 100% zoom, shown at 1.25x).
 * Every number is in Figma px (what Dev Mode shows).
 *
 *   content frame        left 88 / right 104, 1440 max width
 *   section              top padding 59 (headline starts here)
 *   headline             60px / line-height 115% (~69px pitch)
 *   yellow badge         border 3, rotate -1deg, 2 lines, right padding 48
 *   card                 446 x 352, border 3, radius 24, hard shadow 8px
 *   card top             46px lower than the headline top
 *   card inner           padding 18  ->  header 40 / box1 84 / box2 102 / footer 20
 */

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const NAVY = "#0A1D3D";

export function ForParentsHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7FBFF] pt-10 pb-14 lg:pt-[59px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:pl-[88px] xl:pr-[104px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_clamp(340px,31vw,446px)] lg:gap-x-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="z-10 flex min-w-0 flex-col items-start text-left">
            {/* Headline with yellow badge */}
            <h1
              className="mb-7"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                color: NAVY,
                fontSize: "clamp(32px, 4.17vw, 60px)",
                lineHeight: "1.15",
                letterSpacing: "-0.025em",
              }}
            >
              <span>Understand How Your</span>
              <br />
              <span>Child Thinks ,</span>
              <br />
              <span className="relative mb-1 mt-[5px] inline-block max-w-full">
                <span
                  className="inline-flex max-w-full flex-col justify-center rounded-[16px] border-[3px]"
                  style={{
                    backgroundColor: "#FFD028",
                    borderColor: NAVY,
                    color: NAVY,
                    paddingTop: "4px",
                    paddingBottom: "5px",
                    paddingLeft: "20px",
                    paddingRight: "clamp(24px, 3.3vw, 48px)",
                    transform: "rotate(-1deg)",
                    boxShadow: `3px 3px 0px 0px ${NAVY}`,
                  }}
                >
                  <span>Over Dinner, Not Doctor</span>
                  <span>Visits.</span>
                </span>
              </span>
            </h1>

            {/* Green pill */}
            <div
              className="mb-5 inline-flex max-w-full select-none items-center gap-1.5 rounded-full border border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D]"
              style={{
                height: "28px",
                paddingLeft: "20px",
                paddingRight: "20px",
                backgroundColor: "#65DCAA",
                color: NAVY,
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.72px",
                textTransform: "uppercase",
              }}
            >
              <span className="select-none text-sm" aria-hidden="true">
                🏡
              </span>
              <span className="truncate">THE PARENT PORTAL • GENTLE CHILD UNDERSTANDING</span>
            </div>

            {/* Subtitle */}
            <p
              style={{
                maxWidth: "560px",
                fontFamily: JAKARTA,
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "28px",
                letterSpacing: "0px",
                color: "#4E4633",
              }}
            >
              Wave farewell to unclear report cards and percentile stress. OrionKids transforms
              15-minute engaging games into transparent, AI-driven insights and conversation
              starters for your family discussions.
            </p>
          </div>

          {/* ================= RIGHT COLUMN (INSIGHT CARD) ================= */}
          <div className="relative w-full lg:mt-[46px]">
            <div
              className="relative mx-auto w-full max-w-[446px] rounded-[24px] lg:ml-auto lg:mr-0 border-[3px] bg-white px-[18px] pb-[33px] pt-[18px]"
              style={{
                borderColor: NAVY,
                boxShadow: `8px 8px 0px 0px ${NAVY}`,
              }}
            >
              {/* Top-right testimonial badge */}
              <div
                className="absolute right-[-10px] top-[-24px] z-20 inline-flex rotate-[2deg] select-none items-center gap-[6px] whitespace-nowrap rounded-full border-[2.5px] bg-white sm:right-[-20px] lg:right-[-27px]"
                style={{
                  borderColor: NAVY,
                  boxShadow: `3px 3px 0px 0px ${NAVY}`,
                  padding: "4px 14px",
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: "12.5px",
                  lineHeight: "16px",
                  letterSpacing: "-0.01em",
                  color: NAVY,
                }}
              >
                <span className="text-[14px] leading-none">❤️</span>
                <span>&quot;Gave us peace of mind&quot; — Priya M., Mom of 2</span>
              </div>

              {/* Header: avatar, title, week badge */}
              <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#E5E7EB] pb-[6px]">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full border-2 border-[#22B8E0] bg-[#BDE6FA] text-[20px] leading-none">
                    👦
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="truncate"
                      style={{
                        fontFamily: INTER,
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
                        letterSpacing: "-0.015em",
                        color: NAVY,
                      }}
                    >
                      Aarav&apos;s Sunday Discovery
                    </h3>
                    <p
                      className="truncate"
                      style={{
                        fontFamily: INTER,
                        fontWeight: 400,
                        fontSize: "11.5px",
                        lineHeight: "16px",
                        letterSpacing: "-0.01em",
                        color: "#374151",
                      }}
                    >
                      Age 8 • Last played: Yesterday 4:15 PM
                    </p>
                  </div>
                </div>

                <span
                  className="inline-flex h-[18px] shrink-0 select-none items-center whitespace-nowrap rounded-[4px] px-2 uppercase"
                  style={{
                    backgroundColor: "#DDEFFC",
                    color: NAVY,
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "14px",
                  }}
                >
                  WEEK 2 DIGEST
                </span>
              </div>

              {/* Box 1: Star strength (84px tall) */}
              <div className="mb-[13px] rounded-[14px] border border-[#8FD3E3] bg-[#E8F5EC] px-3 pb-[11px] pt-[13px]">
                <div
                  className="mb-[7px] flex items-center gap-[7px]"
                  style={{
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "14px",
                    color: NAVY,
                    textTransform: "uppercase",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={NAVY}
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.4l-5.9 3.3 1.2-6.6L2.5 9.5l6.6-.9z" />
                  </svg>
                  <span>STAR STRENGTH: SPATIAL LOGIC &amp; DIVERGENT THINKING</span>
                </div>
                <p
                  style={{
                    fontFamily: INTER,
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "18.4px",
                    letterSpacing: "-0.01em",
                    color: "#1F2937",
                  }}
                >
                  Aarav prefers non-linear shortcuts to solve complex puzzles, staying focused and
                  synthesizing ideas!
                </p>
              </div>

              {/* Box 2: Dinner prompt (102px tall) */}
              <div className="rounded-[14px] border-[1.5px] border-[#12B5CB] bg-white px-3 pb-3 pt-[11px]">
                <div className="mb-[5px] flex items-center justify-between gap-2">
                  <div
                    className="flex min-w-0 items-center gap-1.5"
                    style={{
                      fontFamily: SPACE,
                      fontWeight: 700,
                      fontSize: "10px",
                      lineHeight: "14px",
                      color: NAVY,
                      textTransform: "uppercase",
                    }}
                  >
                    <span className="shrink-0 text-[11px] leading-none">🍴</span>
                    <span className="truncate">TONIGHT&apos;S 5-MINUTE DINNER PROMPT</span>
                    <span className="shrink-0 text-[8px] leading-none">🍝</span>
                  </div>
                  <span
                    className="inline-flex h-[19px] shrink-0 select-none items-center whitespace-nowrap rounded-[4px] px-[6px]"
                    style={{
                      backgroundColor: "#7ACFF5",
                      color: NAVY,
                      fontFamily: INTER,
                      fontWeight: 600,
                      fontSize: "11px",
                      lineHeight: "16px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Try Tonight
                  </span>
                </div>

                <p
                  className="mb-[6px]"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "16px",
                    letterSpacing: "-0.01em",
                    color: NAVY,
                  }}
                >
                  Ask him:{" "}
                  <em>&quot;If a clock ran backwards, what would happen to breakfast?&quot;</em>
                </p>
                <p
                  className="italic"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 400,
                    fontSize: "10px",
                    lineHeight: "14px",
                    letterSpacing: "-0.01em",
                    color: "#4B5563",
                  }}
                >
                  💡 Encourages his temporal sequencing strength naturally.
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex h-5 items-center justify-between">
                <div
                  className="flex items-center gap-[6px]"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: "11.5px",
                    letterSpacing: "-0.01em",
                    color: "#1E293B",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6D4FD8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <span>3 quests completed this week</span>
                </div>

                <Link
                  href="/report"
                  className="cursor-pointer whitespace-nowrap hover:underline"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: "11.5px",
                    letterSpacing: "-0.01em",
                    color: "#6D3FC0",
                  }}
                >
                  Full Report →
                </Link>
              </div>

              {/* Bottom-left stress badge */}
              <div
                className="absolute bottom-[-16px] left-[-8px] z-20 inline-flex -rotate-2 select-none items-center gap-[6px] whitespace-nowrap rounded-full border-[2.5px] sm:left-[-16px] lg:left-[-22px]"
                style={{
                  backgroundColor: "#52C3F2",
                  borderColor: NAVY,
                  color: NAVY,
                  boxShadow: `3px 3px 0px 0px ${NAVY}`,
                  padding: "5px 16px",
                  fontFamily: SPACE,
                  fontWeight: 700,
                  fontSize: "11px",
                  lineHeight: "15px",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-[10px] leading-none">✨</span>
                <span>0% TEST STRESS • 100% JOYFUL PLAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
