"use client";

import React from "react";
import Link from "next/link";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function AboutHeroSection() {
  return (
    <section className="w-full bg-white border-b-2 border-[#1B204A] overflow-hidden">
      <div className="max-w-[1440px] min-h-[650px] mx-auto px-4 sm:px-8 lg:px-[88px] py-12 lg:py-14 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN (Span 7) ================= */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-[782.67px] w-full">
            
            {/* 1. Yellow Tag / Pill */}
            <div
              className="inline-flex items-center gap-2 h-[32px] px-4 rounded-full border-2 border-[#1B204A] bg-[#FFCA28] text-[#1B204A] select-none shadow-[2px_2px_0px_#1B204A]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[13px] leading-none" aria-hidden="true">★</span>
              <span>WHO WE ARE &amp; WHY IT MATTERS</span>
            </div>

            {/* 2. Main Heading: Built around one simple belief. */}
            <h1
              className="mt-5 sm:mt-6 text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.05] tracking-[-1.5px] font-[800] text-[#1B204A] max-w-[650px]"
              style={{
                fontFamily: JAKARTA,
              }}
            >
              Built around one simple belief<span className="text-[#FF6B4A]">.</span>
            </h1>

            {/* 3. Sub-headline: SemiBold 24px */}
            <h2
              className="mt-4 sm:mt-5 text-[19px] sm:text-[22px] lg:text-[24px] leading-[1.35] sm:leading-[32px] font-[600] text-[#1B204A] max-w-[668px]"
              style={{
                fontFamily: JAKARTA,
              }}
            >
              Every child learns, thinks and responds to the world in their own way.
            </h2>

            {/* 4. Body Description: Inter 18px */}
            <p
              className="mt-3 text-[15px] sm:text-[17px] lg:text-[18px] leading-[26px] sm:leading-[28px] font-normal text-[#475467] max-w-[619px]"
              style={{
                fontFamily: INTER,
              }}
            >
              Understanding that can help the adults around them give better support.
            </p>

            {/* 5. CTA Button: Discover Our Approach → */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="#approach"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-[261.8px] h-[56px] px-6 rounded-[16px] border-2 border-[#1B204A] bg-[#FF6B4A] text-white font-[700] text-[16px] leading-[24px] shadow-[3px_3px_0px_#1B204A] hover:shadow-[1px_1px_0px_#1B204A] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer select-none"
                style={{
                  fontFamily: JAKARTA,
                }}
              >
                <span>Discover Our Approach</span>
                <span className="text-lg leading-none" aria-hidden="true">→</span>
              </Link>
            </div>

            {/* 6. Footnote / Trust Indicator */}
            <div className="mt-4 sm:mt-5 flex items-center gap-2 text-[12px] leading-[16px] text-[#1B204AB2] font-medium max-w-[482.61px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" fill="#E6F8F1" stroke="#00BFA5" strokeWidth="1.5" />
                <path
                  d="M5 8.2L7 10.2L11.2 5.8"
                  stroke="#00BFA5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontFamily: INTER }}>
                Designed with developmental psychologists, child educators, and parent advocates.
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Span 5: Illustration Card) ================= */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
            {/* Outer Tilted Card (-1 deg) */}
            <div
              className="relative w-full max-w-[478.66px] min-h-[440px] sm:h-[451.5px] rounded-[24px] border-[4px] border-[#1B204A] bg-white p-3.5 sm:p-5 flex flex-col justify-between shadow-[6px_8px_0px_#1B204A] rotate-[-1deg] transition-transform duration-300"
            >
              {/* Inner Dashed Card with Gradient Background */}
              <div
                className="w-full h-full min-h-[384px] rounded-[16px] border-[2px] border-dashed border-[#1B204A4D] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #EFF2FF 0%, #FFFBEB 50%, #E6F8F1 100%)",
                }}
              >
                {/* Decorative Shapes */}
                {/* Yellow Arc (Left edge) */}
                <div
                  className="absolute left-0 top-[45%] -translate-y-1/2 w-6 h-12 rounded-r-full bg-[#FFCA28] border-r-2 border-y-2 border-[#1B204A] opacity-90 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Sprout 🌱 (Bottom Left) */}
                <div
                  className="absolute left-4 bottom-10 pointer-events-none select-none text-xl"
                  aria-hidden="true"
                >
                  🌱
                </div>

                {/* Soft Beige Pebble / Rounded Shape (Right edge) */}
                <div
                  className="absolute -right-3 top-[48%] -translate-y-1/2 w-11 h-11 rounded-[16px] bg-[#FCE7D6] border-2 border-[#1B204A4D] rotate-12 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Row: Pill & Sparkle */}
                <div className="flex items-center justify-between z-10">
                  <div
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-[#1B204A] bg-white/90 text-[#1B204A] text-[10px] font-bold tracking-[0.4px] shadow-xs select-none"
                    style={{ fontFamily: JAKARTA }}
                  >
                    ABOUT • HERO • 01
                  </div>
                  <span className="text-[#1B204A] text-sm select-none" aria-hidden="true">
                    ✦
                  </span>
                </div>

                {/* Center Content: Illustration Placeholder & Typography */}
                <div className="flex flex-col items-center justify-center text-center my-auto py-4 z-10">
                  {/* Yellow Rounded Icon Box */}
                  <div className="w-[56px] h-[56px] rounded-[16px] bg-[#FFCA28] border-[2.5px] border-[#1B204A] shadow-[2.5px_2.5px_0px_#1B204A] flex items-center justify-center">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1B204A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>

                  {/* Navy Tag */}
                  <span
                    className="mt-2.5 px-2.5 py-0.5 rounded-full bg-[#1B204A] text-white text-[9px] font-extrabold uppercase tracking-wider select-none"
                    style={{ fontFamily: JAKARTA }}
                  >
                    ASSET PLACEHOLDER
                  </span>

                  {/* Title */}
                  <h3
                    className="mt-3 text-[17px] sm:text-[18px] font-bold text-[#1B204A] leading-tight"
                    style={{ fontFamily: JAKARTA }}
                  >
                    Every Child&apos;s Unique Rhythm
                  </h3>

                  {/* Subtitle / Description */}
                  <p
                    className="mt-1.5 text-[11px] sm:text-[12px] leading-[17px] text-[#475467] max-w-[320px] font-normal"
                    style={{ fontFamily: INTER }}
                  >
                    Playful illustration block: Diverse children exploring tactile puzzle blocks
                    while parents and educators observe with care.
                  </p>
                </div>

                {/* Bottom Bar: Studio & Audience */}
                <div
                  className="flex items-center justify-between pt-2 border-t border-[#1B204A1A] z-10 text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: INTER }}
                >
                  <div className="flex items-center gap-1.5 text-[#1B204A]">
                    <span className="w-2 h-2 rounded-full bg-[#00BCD4] inline-block shrink-0" />
                    <span>OrionKids Learning Studio</span>
                  </div>
                  <span className="text-[#475467]">For Families &amp; Classrooms</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
