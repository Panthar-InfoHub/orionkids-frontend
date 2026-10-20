"use client";

import React from "react";
import Link from "next/link";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

const NAVY = "#1B204A";
const CORAL = "#FF6B4A";
const YELLOW = "#FFCA28";

/* Page background: lavender top → warm cream, with a yellow glow (top-left)
   and a soft sky-blue glow (bottom-right), exactly like the Figma frame. */
const HERO_BG = [
  "radial-gradient(circle 300px at 0% 0%, rgba(253,230,138,0.45) 0%, rgba(253,230,138,0.36) 40%, rgba(253,230,138,0) 100%)",
  "radial-gradient(ellipse 360px 300px at 100% 88%, rgba(125,211,252,0.30) 0%, rgba(125,211,252,0.22) 45%, rgba(125,211,252,0) 100%)",
  "linear-gradient(180deg, #F6F7FB 0%, #FDFBF7 52%, #FDFBF7 100%)",
].join(", ");

/* 5-point star outline used for the little sparkle cluster */
const STAR = "0,-1 0.2245,-0.309 0.9511,-0.309 0.363,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.363,0.118 -0.9511,-0.309 -0.2245,-0.309";

export function AboutHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden border-b-2 border-[#1B204A]"
      style={{ background: HERO_BG }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 pt-12 pb-14 lg:pt-[94px] lg:pb-[52px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 flex flex-col items-start w-full max-w-[782.67px]">
            {/* Pill */}
            <div
              className="inline-flex items-center gap-2 h-8 px-4 rounded-full border-2 border-[#1B204A] bg-[#FFCA28] text-[#1B204A] select-none shadow-[3px_3px_0_#1B204A] max-w-full"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[13px] leading-none" aria-hidden="true">
                ★
              </span>
              <span>Who we are &amp; why it matters</span>
            </div>

            {/* Heading */}
            <h1
              className="mt-6 max-w-[650px] text-[#1B204A] text-[40px] sm:text-[52px] lg:text-[48px] xl:text-[60px] leading-[1.02]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                letterSpacing: "-0.033em",
              }}
            >
              Built around one simple belief
              <span style={{ color: CORAL }}>.</span>
            </h1>

            {/* Sub-headline */}
            <h2
              className="mt-[22px] max-w-[668px] text-[#1B204A] text-[19px] sm:text-[22px] xl:text-[24px] leading-[1.35] sm:leading-8"
              style={{ fontFamily: JAKARTA, fontWeight: 600 }}
            >
              Every child learns, thinks and responds to the world in their own way.
            </h2>

            {/* Body */}
            <p
              className="mt-3.5 max-w-[619px] text-[#475467] text-[16px] sm:text-[17px] xl:text-[18px] leading-[26px] sm:leading-7"
              style={{ fontFamily: INTER, fontWeight: 400 }}
            >
              Understanding that can help the adults around them give better support.
            </p>

            {/* CTA */}
            <Link
              href="#approach"
              className="mt-8 sm:mt-10 inline-flex items-center justify-center gap-2 w-full sm:w-[261.8px] h-14 px-6 rounded-2xl border-2 border-[#1B204A] bg-[#FF6B4A] text-white shadow-[4px_4px_0_#1B204A] hover:shadow-[2px_2px_0_#1B204A] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all select-none"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-0.2px",
              }}
            >
              <span>Discover Our Approach</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Trust line */}
            <div
              className="mt-8 flex items-start sm:items-center gap-3 max-w-[482.61px] text-[12px] leading-4"
              style={{ fontFamily: INTER, fontWeight: 500, color: "rgba(27,32,74,0.7)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 -mt-0.5 sm:mt-0"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" fill="#E6F8F1" stroke="#10B981" strokeWidth="1.2" />
                <path
                  d="M5 8.2 7 10.2 11.2 5.8"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                Designed with developmental psychologists, child educators, and parent advocates.
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN – illustration card ================= */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-start lg:pl-3">
            <div
              className="relative flex flex-col w-full max-w-[478.66px] min-h-[440px] lg:min-h-[451.5px] rounded-[24px] border-4 border-[#1B204A] bg-white p-4 pb-3.5 shadow-[6px_6px_0_#1B204A] rotate-[1deg]"
              role="img"
              aria-label="Illustration placeholder: Every Child's Unique Rhythm"
            >
              {/* Dashed gradient panel */}
              <div
                className="relative flex-1 min-h-[360px] overflow-hidden rounded-2xl border-2 border-dashed border-[#1B204A]/30 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #EFF2FF 0%, #FFFBEB 50%, #E6F8F1 100%)",
                }}
              >
                {/* Decorative shapes */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[18px] top-[55%] -translate-y-1/2 w-[50px] h-[50px] rounded-full border-2 border-[#1B204A]/15 pointer-events-none"
                  style={{ backgroundColor: "#FDDC79" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute right-[33px] bottom-11 w-14 h-14 rounded-[18px] border-[1.5px] border-[#1B204A]/30 rotate-[14deg] pointer-events-none"
                  style={{ backgroundColor: "#F1DCCE" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-3 bottom-7 text-[22px] leading-none select-none pointer-events-none"
                >
                  🌱
                </span>

                {/* Top-left ref pill */}
                <span
                  className="absolute left-3.5 top-3.5 inline-flex items-center h-[22px] px-2.5 rounded-full border-[1px] border-[#1B204A] bg-white text-[#1B204A] select-none"
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "15px",
                  }}
                >
                  #ART-HERO-01
                </span>

                {/* Top-right sparkle cluster */}
                <svg
                  aria-hidden="true"
                  className="absolute right-4 top-7 pointer-events-none"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="1"
                  strokeLinejoin="round"
                >
                  <g transform="translate(7 7) scale(5.6)">
                    <polygon points={STAR} vectorEffect="non-scaling-stroke" />
                  </g>
                  <g transform="translate(16 8.5) scale(3)">
                    <polygon points={STAR} vectorEffect="non-scaling-stroke" />
                  </g>
                  <g transform="translate(11.5 16) scale(2.8)">
                    <polygon points={STAR} vectorEffect="non-scaling-stroke" />
                  </g>
                </svg>

                {/* Centre content */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 py-10">
                  <div className="w-16 h-16 rounded-[18px] border-[3px] border-[#1B204A] bg-[#FFCA28] shadow-[3px_3px_0_#1B204A] flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={NAVY}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2.5" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>

                  <span
                    className="mt-3.5 inline-flex items-center h-[26px] px-2.5 rounded-lg bg-[#1B204A] text-white uppercase select-none"
                    style={{
                      fontFamily: MONO,
                      fontWeight: 700,
                      fontSize: "11px",
                      lineHeight: "16px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Asset Placeholder
                  </span>

                  <h3
                    className="mt-[3px] text-[17px] sm:text-[18px] leading-tight text-[#1B204A]"
                    style={{ fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.2px" }}
                  >
                    Every Child&apos;s Unique Rhythm
                  </h3>

                  <p
                    className="mt-1 max-w-[320px] text-[11.5px] leading-[17px] text-[#475467]"
                    style={{ fontFamily: INTER, fontWeight: 400 }}
                  >
                    Playful illustration block: Diverse children exploring tactile puzzle
                    blocks while parents and educators observe with care.
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="mt-2 flex items-center justify-between gap-3 pl-1 pr-3 min-h-6 text-[12px] leading-4"
                style={{ fontFamily: INTER, fontWeight: 600 }}
              >
                <span className="flex items-center gap-1.5 text-[#1B204A]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                  OrionKids Learning Studio
                </span>
                <span className="text-right text-[#475467]">For Families &amp; Classrooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
