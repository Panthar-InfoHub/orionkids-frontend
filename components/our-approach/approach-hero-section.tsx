"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const INK = "#0F172A";

interface Phase {
  no: string;
  title: string;
  sub: string;
  emoji: string;
  bg: string;
  chipBg: string;
  chipColor: string;
  subColor: string;
}

const PHASES: Phase[] = [
  {
    no: "01",
    title: "Observe",
    sub: "Unforced joyful play",
    emoji: "🎮",
    bg: "#E0F2FE",
    chipBg: "#38BDF8",
    chipColor: "#0F172A",
    subColor: "#0C4A6E",
  },
  {
    no: "02",
    title: "Understand",
    sub: "Holistic cognitive map",
    emoji: "🧠",
    bg: "#FEF3C7",
    chipBg: "#FBBF24",
    chipColor: "#0F172A",
    subColor: "#78350F",
  },
  {
    no: "03",
    title: "Personalize",
    sub: "Home & school routines",
    emoji: "🎨",
    bg: "#FFEDD5",
    chipBg: "#FF6B4A",
    chipColor: "#0F172A",
    subColor: "#431407",
  },
  {
    no: "04",
    title: "Track",
    sub: "Longitudinal growth arc",
    emoji: "📈",
    bg: "#D9F6E9",
    chipBg: "#34D399",
    chipColor: "#0F172A",
    subColor: "#022C22",
  },
];

export function ApproachHeroSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 overflow-hidden">
      {/* MAIN CARD*/}
      <div
        className="relative mx-auto w-full max-w-[1216px] lg:min-h-[674px] overflow-hidden rounded-[24px] sm:rounded-[32px] border-[2px] bg-white px-5 pt-14 pb-8 sm:px-10 sm:pt-16 sm:pb-10 lg:px-16 lg:pt-20 lg:pb-[52px] shadow-[4px_4px_0_#0F172A] sm:shadow-[6px_6px_0_#0F172A]"
        style={{ borderColor: INK }}
      >
        {/* Corner sticker: ★ JOYFUL SCIENCE! ★ */}
        <div
          className="absolute z-20 -top-[6px] -right-[10px] w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] rounded-full border-[3px] bg-[#FFD028] shadow-[3px_3px_0_#0F172A] flex items-center justify-center pointer-events-none select-none"
          style={{ borderColor: INK }}
          aria-hidden="true"
        >
          <span
            className="block text-center uppercase rotate-[10deg] pr-2 pt-2"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "9px",
              lineHeight: "12px",
              letterSpacing: "0.3px",
              color: INK,
            }}
          >
            ★ Joyful
            <br />
            Science! ★
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 w-full min-w-0">
            {/* Methodology pill */}
            <div
              className="inline-flex items-center gap-2 max-w-full min-h-9 px-3.5 py-2 rounded-[10px] border-2 bg-[#0284C7] text-white -rotate-2 shadow-[3px_3px_0_#0F172A]"
              style={{
                borderColor: INK,
                fontFamily: JAKARTA,
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
              }}
            >
              <div className="shrink-0 flex items-center justify-center w-[6px] h-[16px] overflow-visible mr-0.5">
                <svg
                  width="16"
                  height="5"
                  viewBox="0 0 16 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-270 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M0 4.70312V0H15.5312V4.70312H0V4.70312M1.53125 1.25781H1.09375V3.44531H1.53125V1.97559L2.39941 3.44531H2.84375V1.25781H2.40625V2.73438L1.53125 1.25781V1.25781M5.03125 1.25781H3.28125V3.44531H5.03125V1.25781V1.25781M3.71875 3.00781V1.69531H4.59375V3.00781H3.71875V3.00781M7.65625 1.25781H5.90625V3.44531H7.65625V2.13281H6.78125V2.57031H7.21875V3.00781H6.34375V1.69531H7.65625V1.25781V1.25781M8.53125 1.25781H8.09375V3.44531H9.625V3.00781H8.53125V1.25781V1.25781M9.40625 1.25781H8.96875V2.57031H10.0625V3.44531H10.5V1.25781H10.0625V2.13281H9.40625V1.25781V1.25781M11.375 2.13281V1.69531H12.0312V2.13281H11.375V2.13281M12.4688 1.25781H10.9375V3.44531H11.375V2.57031H12.4688V1.25781V1.25781M13.3438 1.25781H12.9062V3.44531H13.3438V2.46094H14V3.44531H14.4375V1.25781H14V2.02344H13.3438V1.25781V1.25781"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <span>Methodology &amp; Cognitive Pathways &bull; 02</span>
            </div>

            {/* Headline */}
            <h1
              className="text-[36px] sm:text-[46px] lg:text-[44px] xl:text-[52px] leading-[1.05]"
              style={{ fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-1.4px" }}
            >
              <span className="block">
                <span className="text-[#0284C7]">Observe.</span>{" "}
                <span
                  className="text-[#D97706] rounded-xl bg-[#FFD028]/30 px-2.5"
                  style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
                >
                  Understand.
                </span> 
              </span>
              <span className="block">
                <span className="text-[#FF6B4A]">Personalize.</span>{" "}
                <span className="text-[#059669]">Track.</span>
              </span>
            </h1>

            {/* Yellow statement bar */}
            <div
              className="w-full rounded-lg border-2 bg-[#FFD028] px-4 py-3 shadow-[2px_3px_0_#0F172A]"
              style={{ borderColor: INK }}
            >
              <p
                className="text-[24px] sm:text-[24px] xl:text-[26px] leading-[1.35]"
                style={{ fontFamily: JAKARTA, fontWeight: 900, color: INK, letterSpacing: "-0.01em" }}
              >
                From observation to insight, from insight to action, and from action to
                measurable progress.
              </p>
            </div>

            {/* Body copy */}
            <div className="w-full rounded-[14px] border-2 border-[#E2E8F0] bg-white px-4 py-4 sm:px-5">
              <p
                className="text-[16px] sm:text-[17px] xl:text-[18px] leading-[24px] sm:leading-[26px] xl:leading-7 text-[#334155] sm:text-justify"
                style={{ fontFamily: INTER, fontWeight: 600 }}
              >
                A child&apos;s thinking skills do not show up in one test on one day. They show up
                in how a child remembers, focuses, solves problems and adapts, and they change as
                the child grows. Our approach is built around that idea: look closely, explain
                clearly, support thoughtfully, and keep watching how things change.
              </p>
            </div>

            {/* Bottom badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
              <span
                className="inline-flex items-center gap-2 h-10 px-3.5 rounded-[10px] border-2 bg-white shadow-[3px_3px_0_#0F172A]"
                style={{
                  borderColor: INK,
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "12px",
                  color: INK,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="8" cy="8" r="8" fill="#0D9488" />
                  <text
                    x="8"
                    y="11.5"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill="#fff"
                    fontFamily="sans-serif"
                  >
                    ?
                  </text>
                </svg>
                Zero Stakes &bull; Joy-First
              </span>

              <span
                className="inline-flex items-center gap-2 h-10 px-3.5 rounded-[10px] border-2 bg-[#14B887] -rotate-3 shadow-[3px_3px_0_#0F172A]"
                style={{
                  borderColor: INK,
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "12px",
                  color: INK,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A] shrink-0" aria-hidden="true" />
                Zero High-Stakes Pressure!
              </span>
            </div>
          </div>

          {/* ================= RIGHT – Constellation Engine ================= */}
          <div className="lg:col-span-5 w-full min-w-0 lg:mt-[74px] flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[460px] lg:max-w-[420px] rounded-3xl border-[3px] bg-white p-5 sm:p-6 shadow-[4px_4px_0_#0F172A] sm:shadow-[6px_6px_0_#0F172A]"
              style={{ borderColor: INK }}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 pb-4 border-b border-[#0F172A]/10">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span
                    className="w-8 h-8 rounded-lg border-2 bg-[#FFCA28] flex items-center justify-center shrink-0"
                    style={{ borderColor: INK }}
                    aria-hidden="true"
                  >
                    <svg
                      width="18"
                      height="6"
                      viewBox="0 0 16 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <path
                        d="M0 4.70312V0H15.5312V4.70312H0V4.70312M1.53125 1.25781H1.09375V3.44531H1.53125V1.97559L2.39941 3.44531H2.84375V1.25781H2.40625V2.73438L1.53125 1.25781V1.25781M5.03125 1.25781H3.28125V3.44531H5.03125V1.25781V1.25781M3.71875 3.00781V1.69531H4.59375V3.00781H3.71875V3.00781M7.65625 1.25781H5.90625V3.44531H7.65625V2.13281H6.78125V2.57031H7.21875V3.00781H6.34375V1.69531H7.65625V1.25781V1.25781M8.53125 1.25781H8.09375V3.44531H9.625V3.00781H8.53125V1.25781V1.25781M9.40625 1.25781H8.96875V2.57031H10.0625V3.44531H10.5V1.25781H10.0625V2.13281H9.40625V1.25781V1.25781M11.375 2.13281V1.69531H12.0312V2.13281H11.375V2.13281M12.4688 1.25781H10.9375V3.44531H11.375V2.57031H12.4688V1.25781V1.25781M13.3438 1.25781H12.9062V3.44531H13.3438V2.46094H14V3.44531H14.4375V1.25781H14V2.02344H13.3438V1.25781V1.25781"
                        fill={INK}
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3
                      className="uppercase"
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 800,
                        fontSize: "11px",
                        lineHeight: "14px",
                        letterSpacing: "0.03em",
                        color: INK,
                      }}
                    >
                      Constellation Engine
                    </h3>
                    <p
                      className="mt-0.5 max-w-[190px] text-[10px] leading-[14px] text-[#64748B]"
                      style={{ fontFamily: INTER }}
                    >
                      Continuous 4-Phase Developmental Flow
                    </p>
                  </div>
                </div>

                <span
                  className="inline-flex items-center h-7 px-3 rounded-full border-2 bg-[#14B887] uppercase shrink-0 shadow-[2px_2px_0_#0F172A]"
                  style={{
                    borderColor: INK,
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "9px",
                    letterSpacing: "0.04em",
                    color: INK,
                  }}
                >
                  Non-Clinical
                </span>
              </div>

              {/* 2x2 grid */}
              <div className="relative mt-5 grid grid-cols-2 gap-3.5">
                {/* Center junction badge */}
                <span
                  className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#0F172A] flex items-center justify-center shadow-md select-none"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="7"
                    viewBox="0 0 16 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M0 4.70312V0H15.5312V4.70312H0V4.70312M1.53125 1.25781H1.09375V3.44531H1.53125V1.97559L2.39941 3.44531H2.84375V1.25781H2.40625V2.73438L1.53125 1.25781V1.25781M5.03125 1.25781H3.28125V3.44531H5.03125V1.25781V1.25781M3.71875 3.00781V1.69531H4.59375V3.00781H3.71875V3.00781M7.65625 1.25781H5.90625V3.44531H7.65625V2.13281H6.78125V2.57031H7.21875V3.00781H6.34375V1.69531H7.65625V1.25781V1.25781M8.53125 1.25781H8.09375V3.44531H9.625V3.00781H8.53125V1.25781V1.25781M9.40625 1.25781H8.96875V2.57031H10.0625V3.44531H10.5V1.25781H10.0625V2.13281H9.40625V1.25781V1.25781M11.375 2.13281V1.69531H12.0312V2.13281H11.375V2.13281M12.4688 1.25781H10.9375V3.44531H11.375V2.57031H12.4688V1.25781V1.25781M13.3438 1.25781H12.9062V3.44531H13.3438V2.46094H14V3.44531H14.4375V1.25781H14V2.02344H13.3438V1.25781V1.25781"
                      fill="#FFD028"
                    />
                  </svg>
                </span>

                {PHASES.map((p) => (
                  <div
                    key={p.no}
                    className="rounded-[14px] border-2 p-3 sm:p-3.5 shadow-[3px_3px_0_#0F172A] flex flex-col"
                    style={{ backgroundColor: p.bg, borderColor: INK }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center justify-center h-5 min-w-[34px] px-1.5 rounded-md border"
                        style={{
                          backgroundColor: p.chipBg,
                          borderColor: p.chipColor,
                          color: p.chipColor,
                          fontFamily: JAKARTA,
                          fontWeight: 800,
                          fontSize: "9px",
                        }}
                      >
                        {p.no}
                      </span>
                      <span className="text-[18px] leading-none" aria-hidden="true">
                        {p.emoji}
                      </span>
                    </div>
                    <h4
                      className="mt-3 text-[15px] sm:text-[16px] leading-tight"
                      style={{ fontFamily: JAKARTA, fontWeight: 700, color: INK }}
                    >
                      {p.title}
                    </h4>
                    <p
                      className="mt-1 text-[11px] sm:text-[11.5px] leading-[15px]"
                      style={{ fontFamily: INTER, fontWeight: 500, color: p.subColor }}
                    >
                      {p.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dashed divider */}
              <div
                aria-hidden="true"
                className="mt-4"
                style={{
                  height: "2px",
                  backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 5px, transparent 5px 8px)`,
                }}
              />

              {/* Bottom tags */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
                <span
                  className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md border bg-[#E8F2FF] border-[#9CC8F0] text-[11px]"
                  style={{ fontFamily: INTER, fontWeight: 600, color: INK }}
                >
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.5 6.5 12 13 4.5"
                      stroke="#10B981"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Centered on child curiosity
                </span>
                <span
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border-[1.5px] bg-[#FFE98F] text-[11px]"
                  style={{ borderColor: INK, fontFamily: INTER, fontWeight: 700, color: INK }}
                >
                  100% Kid-Safe <span aria-hidden="true">🛡️</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
