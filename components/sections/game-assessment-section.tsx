"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="relative w-full lg:min-h-[760px] overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-[88px] flex items-center select-none scroll-mt-16 bg-[#DAF5EA]"
    >
      {/* Dreamy pink radial glow in top-right corner */}
      <div
        className="absolute -top-16 -right-16 w-[450px] h-[450px] lg:w-[550px] lg:h-[550px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 182, 218, 0.55) 0%, rgba(255, 182, 218, 0) 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1320px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-12 xl:gap-16">

          {/* ================= LEFT COLUMN: GAME TABLET CARD ================= */}
          <div className="w-full min-w-0 max-w-[620px] lg:flex-[1.25] relative">

            {/* Peach backplate */}
            <div className="relative z-10 w-full bg-[#FCE5DE] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-white/60">

              {/* Inner white card */}
              <div className="w-full bg-white rounded-t-[28px] sm:rounded-t-[36px] rounded-b-[22px] sm:rounded-b-[28px] p-4 sm:p-6 lg:p-7 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)]">

                {/* Header bar */}
                <div className="flex items-center justify-between gap-3 pb-3 sm:pb-3.5">
                  <span
                    className="text-[#0A1D3D] text-base sm:text-[18px] font-extrabold leading-none"
                    style={{ fontFamily: JAKARTA }}
                  >
                    OrionKids Games 🎮
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs sm:text-[13px] text-[#526176] hover:text-[#0A1D3D] transition-colors cursor-pointer shrink-0"
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
                <div className="relative w-full aspect-[16/10.2] my-2 sm:my-3 rounded-[16px] sm:rounded-[22px] overflow-hidden border-2 sm:border-[2.5px] border-[#00B4D8] bg-slate-900 shadow-sm">
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
                    className="text-[#0A1D3D] text-[13px] sm:text-[13.5px] font-medium leading-snug flex-1 min-w-[180px]"
                    style={{ fontFamily: INTER }}
                  >
                    Keep exploring. You&apos;re finding the pattern 🌟
                  </p>

                  <Link
                    href="/warm-up"
                    className="inline-flex items-center justify-center gap-1.5 px-6 h-[40px] bg-[#FFD243] hover:bg-[#FBC02D] text-[#0A1D3D] rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer font-extrabold text-[13px]"
                    style={{ fontFamily: JAKARTA }}
                  >
                    <span>Continue</span>
                    <span className="text-sm font-bold">→</span>
                  </Link>
                </div>
              </div>

              {/* Disclaimer strip */}
              <div className="py-2.5 sm:py-3 px-4 text-center">
                <p
                  className="text-[#64748B] text-[11px] sm:text-[12px] font-medium leading-normal"
                  style={{ fontFamily: INTER }}
                >
                  Conceptual Game Preview · Illustrative Activity, Not A Live Assessment
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: FEATURES & BADGE ================= */}
          <div className="w-full min-w-0 max-w-[620px] lg:max-w-[500px] lg:flex-1 flex flex-col items-start text-left">

            {/* Pill badge + Party Popper */}
            <div className="relative flex items-center gap-3 mb-6 select-none">
              {/* Pill */}
              <div
                className="inline-flex items-center justify-center gap-1.5 bg-[#DDF4FF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:scale-105 transition-transform"
                style={{
                  height: "26px",
                  padding: "4px 14px",
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

              {/* Party Popper SVG */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 -mt-3 pointer-events-none">
                <Image
                  src="/icons/party-popper.svg"
                  alt="Party Popper"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Headline */}
            <h2
              className="text-[#0A1D3D] mb-4 text-left font-extrabold"
              style={{
                fontFamily: JAKARTA,
                fontSize: "clamp(32px, 3vw + 16px, 46px)",
                lineHeight: "112%",
                letterSpacing: "-0.03em",
              }}
            >
              Assessment that
              <br />
              <span>feels like play</span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-[#526176] mb-6 max-w-[500px] text-base sm:text-[17px] leading-[1.65]"
              style={{ fontFamily: INTER }}
            >
              A pattern to recognize. A narrative to delve into. A puzzle to crack.
              Interactive games spark curiosity and allow us to see how each child
              tackles a challenge.
            </p>

            {/* Checklist */}
            <ul className="flex flex-col gap-2.5 mb-6 list-none p-0 m-0">
              {CHECKLIST_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="text-[#0A1D3D] font-bold text-sm leading-[21px] shrink-0"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span
                    className="text-[14px] sm:text-[15px] leading-[21px] font-medium text-[#0A1D3D]"
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
            <div className="flex items-center gap-3 sm:gap-3.5 select-none">
              {/* Sticker 1: Smiley */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-11 h-11 sm:w-[50px] sm:h-[50px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <circle cx="21" cy="22" r="2.2" fill="#0A1D3D" />
                  <circle cx="31" cy="22" r="2.2" fill="#0A1D3D" />
                  <path
                    d="M 19.5 29 C 21.5 33.5 30.5 33.5 32.5 29"
                    stroke="#0A1D3D"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Sticker 2: 4-pointed Sparkle Star */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-11 h-11 sm:w-[50px] sm:h-[50px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <path
                    d="M 26 13 C 26 19.5 21 25 14 26 C 21 27 26 32.5 26 39 C 26 32.5 31 27 38 26 C 31 25 26 19.5 26 13 Z"
                    stroke="#0A1D3D"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 37 13.5 V 17.5 M 35 15.5 H 39"
                    stroke="#0A1D3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="15"
                    cy="36.5"
                    r="2"
                    stroke="#0A1D3D"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Sticker 3: Heart */}
              <div className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                <svg
                  className="w-11 h-11 sm:w-[50px] sm:h-[50px]"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="26" cy="26" r="24.5" fill="#FFD243" stroke="#0A1D3D" strokeWidth="2.5" />
                  <path
                    d="M 26 38 C 25.3 37.3 15 28.5 15 20.5 C 15 16 18.2 13 22.2 13 C 24.5 13 25.6 14.1 26 14.8 C 26.4 14.1 27.5 13 29.8 13 C 33.8 13 37 16 37 20.5 C 37 28.5 26.7 37.3 26 38 Z"
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
