"use client";

import React from "react";
import Image from "next/image";
import { StarIcon } from "@/components/ui/star-icon";

const CHECKLIST_ITEMS = [
  "Simple, age-appropriate instructions",
  "Encouragement without rankings",
  "Different activities, a richer learning picture",
  "Activities and Assessments are suggested by Expert",
];

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function GameAssessmentSection() {
  return (
    <section
      id="game-assessment-section"
      className="relative w-full lg:min-h-[796px] overflow-hidden py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-10 xl:px-[88px] flex items-center select-none scroll-mt-16"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 85% 15%, rgba(254, 215, 226, 0.45) 0%, rgba(218, 245, 233, 1) 75%)",
      }}
    >
      <div className="relative z-10 w-full max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-10 xl:gap-14">

          {/* ================= LEFT COLUMN: GAME TABLET CARD ================= */}
          <div className="w-full min-w-0 max-w-[668px] lg:flex-[1.3] relative">

            {/* Soft cyan glow */}
            <div className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-[#D8F3FE]/70 blur-2xl pointer-events-none" />

            {/* Peach backplate */}
            <div className="relative z-10 w-full bg-[#FDE3DA] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-white/60">

              {/* Inner white card */}
              <div className="w-full bg-white rounded-t-[24px] sm:rounded-t-[36px] rounded-b-[20px] sm:rounded-b-[28px] p-4 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)]">

                {/* Header bar */}
                <div className="flex items-center justify-between gap-3 pb-3 sm:pb-4">
                  <span
                    className="text-[#0A1D3D] text-base sm:text-[18px] font-extrabold leading-none"
                    style={{ fontFamily: JAKARTA }}
                  >
                    OrionKids Games 🎮
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-[#526176] hover:text-[#0A1D3D] transition-colors cursor-pointer shrink-0 min-h-[32px]"
                    style={{ fontFamily: INTER }}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                    <span>Listen</span>
                  </button>
                </div>

                {/* Game screen */}
                <div className="relative w-full aspect-[16/10.4] my-2 sm:my-3 rounded-[16px] sm:rounded-[24px] overflow-hidden border-2 sm:border-[2.5px] border-[#00B4D8] bg-slate-900 shadow-sm">
                  <Image
                    src={encodeURI("/images/bernard creek.png")}
                    alt="Bernard of the Creek Part 2 Game Preview"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 608px"
                    priority
                  />
                </div>

                {/* Footer bar */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 gap-3 flex-wrap">
                  <p
                    className="text-[#0A1D3D] text-[13px] sm:text-[13.5px] leading-snug flex-1 min-w-[180px]"
                    style={{ fontFamily: INTER }}
                  >
                    Keep exploring. You&apos;re finding the pattern! 🌟
                  </p>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 px-6 h-[40px] bg-[#FFD54F] text-[#0A1D3D] rounded-full shadow-[0_4px_14px_rgba(255,110,174,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer max-[420px]:w-full"
                    style={{ fontFamily: JAKARTA, fontWeight: 800, fontSize: "13px" }}
                  >
                    <span>Continue</span>
                    <span className="text-sm font-bold">→</span>
                  </button>
                </div>
              </div>

              {/* Disclaimer strip */}
              <div className="py-2.5 sm:py-3 px-4 text-center">
                <p
                  className="text-[#526176] text-[11px] sm:text-[12px] leading-normal"
                  style={{ fontFamily: INTER }}
                >
                  Conceptual game preview · Illustrative activity, not a live assessment
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: FEATURES & MASCOT ================= */}
          <div className="w-full min-w-0 max-w-[668px] lg:max-w-[516px] lg:flex-1 flex flex-col items-start text-left pt-16 sm:pt-20 lg:pt-0">

            {/* Pill badge + rabbit (anchored together on all viewports) */}
            <div className="relative inline-block mb-5 select-none">

              {/* Rabbit: stays right beside the pill and above headline on ALL views */}
              <div
                className="absolute pointer-events-none z-10 left-[155px] sm:left-[172.42px] -top-[76px] sm:-top-[84px] w-[95px] h-[127px] sm:w-[107px] sm:h-[143px]"
              >
                <Image
                  src={encodeURI("/gif/rabbit.webp")}
                  alt="Playful rabbit mascot"
                  width={107}
                  height={143}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Pill */}
              <div
                className="inline-flex items-center justify-center gap-1.5 bg-[#DDF4FF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:scale-105 transition-transform"
                style={{
                  width: "164px",
                  height: "24px",
                  padding: "5px 14px",
                  transform: "rotate(-1deg)",
                  borderRadius: "9999px",
                }}
              >
                <span
                  className="text-[10.5px] font-[800] uppercase tracking-wider leading-none whitespace-nowrap flex items-center gap-1"
                  style={{ fontFamily: JAKARTA }}
                >
                  <span>🎮</span>
                  <span>PLAY → DISCOVER</span>
                  <span>✨</span>
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2
              className="text-[#0A1D3D] mb-4 text-left max-w-[420px] font-extrabold"
              style={{
                fontFamily: JAKARTA,
                fontSize: "clamp(30px, 2.5vw + 20px, 44px)",
                lineHeight: "112%",
                letterSpacing: "-0.036em",
              }}
            >
              Assessment That
              <br />
              <span className="sm:whitespace-nowrap">Feels Like Play. 🎉</span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-[#526176] mb-6 max-w-[516px] text-base sm:text-lg leading-[1.6]"
              style={{ fontFamily: INTER }}
            >
              A pattern to spot. A story to explore. A puzzle to solve. Interactive
              games invite curiosity while helping us observe how each child
              approaches a challenge.
            </p>

            {/* Checklist */}
            <ul className="flex flex-col gap-2.5 mb-6 list-none p-0 m-0">
              {CHECKLIST_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="text-[#0A1D3D] font-black text-sm leading-[21px] shrink-0"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span
                    className="text-[13px] sm:text-[14px] leading-[21px] font-medium text-[#0A1D3D]"
                    style={{ fontFamily: INTER }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Explore link */}
            <div className="mb-7">
              <a
                href="#games"
                className="group inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-[800] text-[#0A1D3D] hover:underline"
                style={{ fontFamily: JAKARTA }}
              >
                <span>Explore OrionKids Games</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Sticker badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
              {/* Smiley */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg className="w-11 h-11 sm:w-[52px] sm:h-[52px]" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <circle cx="26" cy="26" r="16.5" stroke="#0A1D3D" strokeWidth="2.5" fill="none" />
                  <circle cx="21" cy="22.5" r="2" fill="#0A1D3D" />
                  <circle cx="31" cy="22.5" r="2" fill="#0A1D3D" />
                  <path d="M 20.5 28 C 22 32.5 30 32.5 31.5 28" stroke="#0A1D3D" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Sparkle */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full bg-[#FFD243] border-[2.5px] border-[#0A1D3D] flex items-center justify-center select-none shadow-sm">
                  <StarIcon className="w-6 h-6 sm:w-7 sm:h-7" strokeColor="#0A1D3D" strokeWidth={1.8} />
                </div>
              </div>

              {/* Heart */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg className="w-11 h-11 sm:w-[52px] sm:h-[52px]" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <path
                    d="M 26 38.5 C 25.3 37.8 14 28.5 14 20 C 14 15.2 17.5 12.5 21.8 12.5 C 24.4 12.5 25.8 13.8 26 14.5 C 26.2 13.8 27.6 12.5 30.2 12.5 C 34.5 12.5 38 15.2 38 20 C 38 28.5 26.7 37.8 26 38.5 Z"
                    stroke="#0A1D3D" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
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
