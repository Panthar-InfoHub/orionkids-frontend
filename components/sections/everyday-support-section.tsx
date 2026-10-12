"use client";

import React from "react";
import Image from "next/image";

export function EverydaySupportSection() {
  return (
    <section
      id="everyday-support-section"
      className="relative w-full bg-white text-[#0A1D3D] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden select-none scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-left lg:pr-4 xl:pr-8">
            
            {/* Image Wrapper Container with Peeking Mascot */}
            <div className="relative w-full max-w-[540px]">
              
              {/* Peeking GIF Mascot (Half visible above the top border) */}
              <div className="absolute -top-15 sm:-top-20 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 z-0 pointer-events-none">
                <Image
                  src={encodeURI("/gif/rotating head child.gif")}
                  alt="Peeking animated mascot"
                  width={96}
                  height={96}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Main Photo Card */}
              <div className="relative z-10 w-full aspect-[1/0.92] sm:aspect-[1/0.88] rounded-[32px] sm:rounded-[36px] overflow-hidden border-2 border-[#0A1D3D] shadow-[4px_6px_0px_0px_#0A1D3D] bg-slate-100">
                <Image
                  src={encodeURI("/images/child with laptop.jpg")}
                  alt="Child interacting with laptop learning activity"
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                  priority
                />

                {/* Floating Badge 1: BLAST OFF! (Top Right) */}
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#EDE9FE] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span className="text-xs">👾</span>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                      BLAST OFF!
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2: SUPERSTAR APPROVED! (Bottom Left) */}
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-20">
                  <div
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#DDF4FF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span className="text-xs">✨</span>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                      SUPERSTAR APPROVED!
                    </span>
                  </div>
                </div>
              </div>

              {/* Sub-caption beneath photo */}
              <p
                className="text-[11px] sm:text-xs text-[#526176] mt-3 font-normal text-left"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}
              >
                Small moments of discovery. Meaningful opportunities for support.
              </p>

            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Pill Tag - Exact User Typography Specs */}
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D5B6FF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] mb-4 hover:scale-105 transition-transform cursor-default select-none"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "11px",
                lineHeight: "100%",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[10px]">⭐</span>
              <span>SUPPORT → GROW → SHINE</span>
              <span className="text-[10px]">🚀</span>
            </div>

            {/* Main Headline with Target Icon */}
            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] font-[800] text-[#0A1D3D] leading-[1.15] tracking-[-1px] mb-4 flex flex-wrap items-center gap-x-2"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>Turn understanding</span>
              <span className="flex items-center gap-2">
                <span>into everyday support.</span>
                <span className="inline-block relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src={encodeURI("/icons/🎯.png")}
                    alt="Target bullseye"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </span>
              </span>
            </h2>

            {/* Subtitle Description */}
            <p
              className="text-[15px] sm:text-[16px] font-normal text-[#526176] leading-[1.6] max-w-xl mb-7"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Personalized development plans connect a child&apos;s learning profile to manageable activities at school and at home.
            </p>

            {/* Support Card Container (#F0E6FF) */}
            <div className="w-full max-w-[560px] bg-[#F0E6FF] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 text-left border border-[#E9D5FF] shadow-sm">
              
              {/* Header Row */}
              <div className="flex items-center justify-between pb-3 select-none">
                <span
                  className="text-xs sm:text-[13px] font-extrabold text-[#0A1D3D] flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span>A next step to try</span>
                  <span className="text-sm">🧮</span>
                </span>
                <span
                  className="text-[11px] sm:text-xs text-[#6B7280] font-normal"
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}
                >
                  Illustrative plan
                </span>
              </div>

              {/* Activity Headline */}
              <h3
                className="text-[18px] sm:text-[20px] font-[800] text-[#0A1D3D] leading-snug mb-2"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                Make a story, one step at a time.
              </h3>

              {/* Activity Description */}
              <p
                className="text-xs sm:text-[13px] text-[#526176] leading-relaxed mb-5 font-normal"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}
              >
                Build on visual strengths: use picture cards to tell a short story, then invite your child to recall the sequence.
              </p>

              {/* Dual Scenario Boxes (At home & In the classroom) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                
                {/* Scenario 1: At home */}
                <div className="flex flex-col">
                  <span
                    className="text-xs font-black text-[#0A1D3D] flex items-center gap-1 mb-1"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span>🏡</span>
                    <span>At home</span>
                  </span>
                  <p
                    className="text-[11px] sm:text-xs text-[#526176] leading-relaxed font-normal"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    }}
                  >
                    Start with a few cards. Let your child choose the story.
                  </p>
                </div>

                {/* Scenario 2: In the classroom */}
                <div className="flex flex-col">
                  <span
                    className="text-xs font-black text-[#0A1D3D] flex items-center gap-1 mb-1"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span>🏫</span>
                    <span>In the classroom</span>
                  </span>
                  <p
                    className="text-[11px] sm:text-xs text-[#526176] leading-relaxed font-normal"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    }}
                  >
                    Pair spoken instructions with a simple visual sequence.
                  </p>
                </div>

              </div>

              {/* Divider Line */}
              <div className="w-full border-t border-[#D8B4FE]/60 pt-3.5">
                <p
                  className="text-[11px] sm:text-xs text-[#526176] leading-relaxed font-normal"
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  }}
                >
                  Notice together: Which cues helped? What felt enjoyable? Adapt the next activity from there.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
