"use client";

import React from "react";
import Image from "next/image";

const CHECKLIST_ITEMS = [
  "Simple, age-appropriate instructions",
  "Encouragement without rankings",
  "Different activities, a richer learning picture",
  "Activities and Assessments are suggested by Expert",
];

export function GameAssessmentSection() {
  return (
    <section
      id="game-assessment-section"
      className="relative w-full min-h-[796px] bg-[#DAF5E9] overflow-hidden py-16 lg:py-20 px-4 sm:px-8 lg:px-[88px] flex items-center select-none scroll-mt-16"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 85% 15%, rgba(254, 215, 226, 0.45) 0%, rgba(218, 245, 233, 1) 75%)",
      }}
    >
      <div className="relative z-10 w-full max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 xl:gap-14">

          {/* ================= LEFT COLUMN: FIGMA GAME TABLET CARD ================= */}
          <div className="w-full max-w-[668px] lg:w-[668px] shrink-0 flex flex-col items-center lg:items-start relative">

            {/* Background Decorative Soft Cyan Glow/Blob */}
            <div className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D8F3FE]/70 blur-2xl pointer-events-none -z-0" />

            {/* Main Outer Tablet: #FDE3DA Peach Backplate, rounded-[36px], No harsh black borders */}
            <div className="relative z-10 w-full max-w-[668px] bg-[#FDE3DA] rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-white/60">

              {/* Inner Pure White Card */}
              <div className="w-full bg-white rounded-t-[36px] rounded-b-[28px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)]">

                {/* Header Bar */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 select-none">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[#0A1D3D]"
                      style={{
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontWeight: 800,
                        fontSize: "18px",
                        lineHeight: "100%",
                      }}
                    >
                      OrionKids Games 🎮
                    </span>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-[#526176] hover:text-[#0A1D3D] transition-colors cursor-pointer"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <svg
                      className="w-4 h-4 text-[#526176]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span>Listen</span>
                  </button>
                </div>

                {/* Game Screen Image Container (Cyan Border: #00B4D8) */}
                <div className="relative w-full aspect-[16/10.4] my-2 sm:my-3 rounded-[24px] overflow-hidden border-[2.5px] border-[#00B4D8] bg-slate-900 shadow-sm">
                  <Image
                    src={encodeURI("/images/bernard creek.png")}
                    alt="Bernard of the Creek Part 2 Game Preview"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 608px"
                    priority
                  />
                </div>

                {/* Footer Bar */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 gap-3 flex-wrap select-none">
                  <p
                    className="text-[#0A1D3D]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "13.5px",
                      lineHeight: "100%",
                    }}
                  >
                    Keep exploring. You&apos;re finding the pattern! 🌟
                  </p>

                  {/* Continue Button: Bright Candy Pink #FF6EAE */}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 px-6 h-[40px] bg-[#FF6EAE] text-[#0A1D3D] rounded-full shadow-[0_4px_14px_rgba(255,110,174,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "13px",
                    }}
                  >
                    <span>Continue</span>
                    <span className="text-sm font-bold">→</span>
                  </button>
                </div>

              </div>

              {/* Bottom Peach Strip with Disclaimer */}
              <div className="py-2.5 sm:py-3 px-4 text-center select-none">
                <p
                  className="text-[#526176] text-[12px] leading-normal"
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Conceptual game preview · Illustrative activity, not a live assessment
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: FEATURES & RABBIT MASCOT ================= */}
          <div className="w-full max-w-[516px] lg:w-[516px] shrink-0 flex flex-col items-start text-left pt-14 lg:pt-0">

            {/* Top Pill Badge + Animated Rabbit Mascot Container */}
            <div className="relative mb-5 select-none">

              {/* Animated Rabbit Mascot GIF: Width 107px, Height 143px, Top 71px, Left 1008px (rel: top -69px, left 172.42px) */}
              <div
                className="absolute pointer-events-none z-10"
                style={{
                  left: "172.42px",
                  top: "-69px",
                  width: "107px",
                  height: "143px",
                }}
              >
                <Image
                  src={encodeURI("/gif/rabbit.gif")}
                  alt="Playful rabbit mascot"
                  width={107}
                  height={143}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Pill Badge: Width 164px, Height 24px, Radius 9999px, Border 2px, Padding 5px 14px, Rotation -1° */}
              <div
                className="inline-flex items-center justify-center gap-1.5 bg-[#DDF4FF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:scale-105 transition-transform"
                style={{
                  width: "164px",
                  height: "24px",
                  paddingTop: "5px",
                  paddingRight: "14px",
                  paddingBottom: "5px",
                  paddingLeft: "14px",
                  transform: "rotate(-1deg)",
                  borderRadius: "9999px",
                }}
              >
                <span
                  className="text-[10.5px] font-[800] uppercase tracking-wider leading-none whitespace-nowrap flex items-center gap-1"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span>🎮</span>
                  <span>PLAY → DISCOVER</span>
                  <span>✨</span>
                </span>
              </div>

            </div>

            {/* Main Headline */}
            <h2
              className="text-[#0A1D3D] mb-4 text-left max-w-[420px]"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "44px",
                lineHeight: "112%",
                letterSpacing: "-1.6px",
              }}
            >
              Assessment that
              <br />
              <span className="whitespace-nowrap">feels like play. 🎉</span>
            </h2>

            {/* Subtitle Description */}
            <p
              className="text-[#526176] mb-6 max-w-[516px]"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "160%",
                letterSpacing: "0%",
              }}
            >
              A pattern to spot. A story to explore. A puzzle to solve. Interactive
              games invite curiosity while helping us observe how each child
              approaches a challenge.
            </p>

            {/* Feature Checklist */}
            <div className="flex flex-col gap-2.5 mb-6">
              {CHECKLIST_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="text-[#0A1D3D] font-black text-sm select-none">
                    ✓
                  </span>
                  <span
                    className="text-xs sm:text-[14px] font-medium text-[#0A1D3D]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Explore Link */}
            <div className="mb-7">
              <a
                href="#games"
                className="group inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-[800] text-[#0A1D3D] hover:underline"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <span>Explore OrionKids Games</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>

            {/* Bottom 3 Circular Sticker Badges */}
            <div className="flex items-center gap-3.5 select-none">
              
              {/* Sticker 1: Smiley inside concentric ring */}
              <div className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-[52px] h-[52px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <circle cx="26" cy="26" r="16.5" stroke="#0A1D3D" strokeWidth="2.5" fill="none" />
                  <circle cx="21" cy="22.5" r="2" fill="#0A1D3D" />
                  <circle cx="31" cy="22.5" r="2" fill="#0A1D3D" />
                  <path
                    d="M 20.5 28 C 22 32.5 30 32.5 31.5 28"
                    stroke="#0A1D3D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Sticker 2: 4-pointed Sparkle Star with + and ○ */}
              <div className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-[52px] h-[52px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <path
                    d="M 26 12 C 26 19.5 20.5 25 13 26 C 20.5 27 26 32.5 26 40 C 26 32.5 31.5 27 39 26 C 31.5 25 26 19.5 26 12 Z"
                    stroke="#0A1D3D"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 38 12.5 V 17.5 M 35.5 15 H 40.5"
                    stroke="#0A1D3D"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="14"
                    cy="37.5"
                    r="2.5"
                    stroke="#0A1D3D"
                    strokeWidth="2.4"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Sticker 3: Cute Heart Outline */}
              <div className="relative group cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-[52px] h-[52px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <path
                    d="M 26 38.5 C 25.3 37.8 14 28.5 14 20 C 14 15.2 17.5 12.5 21.8 12.5 C 24.4 12.5 25.8 13.8 26 14.5 C 26.2 13.8 27.6 12.5 30.2 12.5 C 34.5 12.5 38 15.2 38 20 C 38 28.5 26.7 37.8 26 38.5 Z"
                    stroke="#0A1D3D"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
