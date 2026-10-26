"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="relative w-full overflow-hidden border-b-2 border-[#1B204A]/10"
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
              href="/our-approach"
              className="mt-8 sm:mt-10 inline-flex items-center justify-center gap-2 w-full sm:w-[261.8px] h-14 px-6 rounded-2xl border-2 border-[#1B204A] bg-[#FF6B4A] text-white shadow-[4px_4px_0_#1B204A] hover:shadow-[2px_2px_0_#1B204A] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all select-none cursor-pointer"
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

          {/* ================= RIGHT COLUMN – hero photograph card ================= */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-start lg:pl-3">
            <div
              className="relative flex flex-col w-full max-w-[478.66px] rounded-[24px] border-4 border-[#1B204A] bg-white p-3.5 sm:p-4 shadow-[6px_6px_0_#1B204A] rotate-[1deg] transition-transform duration-300 hover:rotate-0"
              role="img"
              aria-label="Children learning and collaborating with tactile materials at OrionKids"
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[478/360] overflow-hidden rounded-[18px] border-2 border-[#1B204A]/20 bg-[#F1F5F9] shadow-inner group">
                <Image
                  src="/images/child.jpeg"
                  alt="Children learning together with tactile blocks at OrionKids"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle soft gradient overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Top-left badge pill */}
                <span
                  className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 h-[24px] px-2.5 rounded-full border border-[#1B204A] bg-white/95 text-[#1B204A] shadow-sm select-none backdrop-blur-sm"
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "15px",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>#LEARNING-STUDIO</span>
                </span>

                {/* Decorative sticker badge in bottom-right */}
                <div className="absolute right-3.5 bottom-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFCA28] border-2 border-[#1B204A] shadow-[2px_2px_0_#1B204A] text-[#1B204A] text-[11px] font-black select-none pointer-events-none">
                  <span>✨</span>
                  <span style={{ fontFamily: JAKARTA }}>Active Discovery</span>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="mt-3 flex items-center justify-between gap-3 px-1 min-h-6 text-[12px] leading-4"
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
