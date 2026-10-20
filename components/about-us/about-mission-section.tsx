"use client";

import React from "react";
import Image from "next/image";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function AboutMissionSection() {
  return (
    <section className="w-full bg-[#F7F5ED] border-b-2 border-[#1B204A] py-16 sm:py-20 lg:py-24 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px] relative">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="relative flex flex-col items-center text-center max-w-[760px] mx-auto mb-14 sm:mb-16">
          
          {/* Pill Tag */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-[#1B204A] bg-[#FFCA28] text-[#1B204A] select-none shadow-[2px_2px_0px_#1B204A] mb-4"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            OUR NORTH STAR
          </div>

          {/* Heading */}
          <h2
            className="text-[34px] sm:text-[44px] lg:text-[48px] font-[800] text-[#1B204A] tracking-[-1px] leading-[1.15]"
            style={{ fontFamily: JAKARTA }}
          >
            Mission, Vision &amp; Promise
          </h2>

          {/* Subtitle */}
          <p
            className="mt-3.5 text-[15px] sm:text-[17px] leading-[26px] sm:leading-[28px] font-normal text-[#475467] max-w-[620px]"
            style={{ fontFamily: INTER }}
          >
            Three guiding commitments that anchor our daily product choices and educational roadmap.
          </p>

          {/* Floating Robot Image on the right of header */}
          <div
            className="hidden md:block absolute -right-12 lg:-right-24 -top-8 lg:-top-10 w-[140px] lg:w-[190px] pointer-events-none select-none z-10"
            style={{
              transform: "rotate(-21.18deg)",
            }}
          >
            <Image
              src="/icons/photoroom.png"
              alt="OrionKids Cute Robot"
              width={259}
              height={194}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(27,32,74,0.15)] animate-pulse"
              style={{ animationDuration: "4s" }}
            />
          </div>
        </div>

        {/* ================= THREE CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center">
          
          {/* ----- CARD 1: OUR MISSION (White) ----- */}
          <div className="w-full max-w-[384px] mx-auto min-h-[520px] lg:h-[554px] rounded-[24px] border-2 border-[#1B204A] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[4px_6px_0px_#1B204A] transition-transform hover:-translate-y-1.5 duration-200">
            <div>
              {/* Header: Pill & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full border border-[#1B204A] bg-[#FFCA28] text-[#1B204A] text-[10px] sm:text-[11px] font-[800] tracking-wider uppercase select-none"
                  style={{ fontFamily: JAKARTA }}
                >
                  OUR MISSION
                </div>
                <span className="text-xl select-none" aria-label="Target">🎯</span>
              </div>

              {/* Title */}
              <h3
                className="text-[21px] sm:text-[23px] font-[800] text-[#1B204A] tracking-[-0.4px] leading-[1.25] mb-4"
                style={{ fontFamily: JAKARTA }}
              >
                Making children&apos;s cognitive progress easier to understand.
              </h3>

              {/* Body */}
              <p
                className="text-[13px] sm:text-[14px] leading-[22px] sm:leading-[23px] text-[#475467] font-normal"
                style={{ fontFamily: INTER }}
              >
                To demystify child cognitive development by transforming rich, playful observations into accessible, practical knowledge that empowers families and teachers to guide every child with confidence.
              </p>
            </div>

            {/* Bottom Footer Pill */}
            <div
              className="mt-6 p-3 rounded-[14px] border border-[#1B204A1F] bg-[#F8FAFC] flex items-center gap-2.5 text-[11px] sm:text-[12px] font-semibold text-[#1B204A]"
              style={{ fontFamily: INTER }}
            >
              <span className="w-4 h-4 rounded-full bg-[#FFCA28] border border-[#1B204A] flex items-center justify-center text-[9px] shrink-0">
                ★
              </span>
              <span className="truncate">Clarity for every family and classroom</span>
            </div>
          </div>

          {/* ----- CARD 2: OUR VISION (Navy Dark #1B204A) ----- */}
          <div className="w-full max-w-[384px] mx-auto min-h-[520px] lg:h-[554px] rounded-[24px] border-2 border-[#1B204A] bg-[#1B204A] p-6 sm:p-8 flex flex-col justify-between shadow-[4px_6px_0px_#1B204A] transition-transform hover:-translate-y-1.5 duration-200 text-white">
            <div>
              {/* Header: Pill & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-[#FF6B4A] text-white text-[10px] sm:text-[11px] font-[800] tracking-wider uppercase select-none"
                  style={{ fontFamily: JAKARTA }}
                >
                  OUR VISION
                </div>
                <span className="text-xl select-none" aria-label="Telescope">🔭</span>
              </div>

              {/* Title */}
              <h3
                className="text-[21px] sm:text-[23px] font-[800] text-white tracking-[-0.4px] leading-[1.25] mb-4"
                style={{ fontFamily: JAKARTA }}
              >
                A world where every learner is understood for how their brain unfolds.
              </h3>

              {/* Body */}
              <p
                className="text-[13px] sm:text-[14px] leading-[22px] sm:leading-[23px] text-[#CBD5E1] font-normal"
                style={{ fontFamily: INTER }}
              >
                We envision educational communities where children are never defined by a single label, but celebrated as unique constellations of focus, curiosity, memory, and creative problem-solving.
              </p>
            </div>

            {/* Bottom Footer Pill */}
            <div
              className="mt-6 p-3 rounded-[14px] border border-white/15 bg-white/10 flex items-center gap-2.5 text-[11px] sm:text-[12px] font-semibold text-white"
              style={{ fontFamily: INTER }}
            >
              <span className="w-4 h-4 rounded-full bg-[#00BCD4] flex items-center justify-center text-[10px] text-[#1B204A] font-bold shrink-0">
                !
              </span>
              <span className="truncate">Moving past one-size-fits-all education</span>
            </div>
          </div>

          {/* ----- CARD 3: OUR PROMISE (Mint Green #E6F8F1) ----- */}
          <div className="w-full max-w-[384px] mx-auto min-h-[520px] lg:h-[554px] rounded-[24px] border-2 border-[#1B204A] bg-[#E6F8F1] p-6 sm:p-8 flex flex-col justify-between shadow-[4px_6px_0px_#1B204A] transition-transform hover:-translate-y-1.5 duration-200">
            <div>
              {/* Header: Pill & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full border border-[#1B204A] bg-[#65DCAA] text-[#0A1D3D] text-[10px] sm:text-[11px] font-[800] tracking-wider uppercase select-none"
                  style={{ fontFamily: JAKARTA }}
                >
                  OUR PROMISE
                </div>
                <span className="text-xl select-none" aria-label="Ribbon">🤝</span>
              </div>

              {/* Title */}
              <h3
                className="text-[21px] sm:text-[23px] font-[800] text-[#1B204A] tracking-[-0.4px] leading-[1.25] mb-4"
                style={{ fontFamily: JAKARTA }}
              >
                Honest, evidence-conscious, and joyful at every turn.
              </h3>

              {/* Body */}
              <p
                className="text-[13px] sm:text-[14px] leading-[22px] sm:leading-[23px] text-[#475467] font-normal"
                style={{ fontFamily: INTER }}
              >
                We promise never to make clinical claims we cannot back, never to sell child data, never to induce parental panic, and always to celebrate what a child can do while offering constructive, gentle ideas for what comes next.
              </p>
            </div>

            {/* Bottom Footer Pill */}
            <div
              className="mt-6 p-3 rounded-[14px] border border-[#1B204A1F] bg-white flex items-center gap-2.5 text-[11px] sm:text-[12px] font-semibold text-[#1B204A]"
              style={{ fontFamily: INTER }}
            >
              <span className="w-4 h-4 rounded-full bg-[#EAF7EF] border border-[#00BFA5] flex items-center justify-center text-[10px] text-[#00BFA5] shrink-0 font-bold">
                ✓
              </span>
              <span className="truncate">Responsible, private, and kid-safe always</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
