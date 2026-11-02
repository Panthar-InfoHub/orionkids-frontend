"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function ApproachCtaSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      {/* MAIN OUTER CARD */}
      <div
        className="w-full max-w-[1216px] mx-auto rounded-[24px] border border-[#E2E8F0] pt-[58px] pb-[56px] px-4 sm:px-8 lg:px-[56px] shadow-sm flex flex-col justify-center items-center"
        style={{
          background: "linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 50%, #FFFBEB 100%)",
        }}
      >
        {/* INNER YELLOW HERO CARD */}
        <div className="relative w-full max-w-[1102px] mx-auto rounded-[36px] border-[2.5px] border-[#0F172A] bg-[#FFD028] shadow-[7px_7px_0px_0px_#0F172A] pt-[56px] pb-[58px] px-6 sm:px-12 md:px-16 lg:px-[120px] xl:px-[213px] flex flex-col items-center justify-center text-center gap-5 sm:gap-6">
          
          {/* Peeking Playful Mascot GIF on top edge */}
          <div className="pointer-events-none absolute left-6 sm:left-12 -top-12 sm:-top-14 z-20 select-none w-20 sm:w-24 aspect-square transition-transform duration-300 hover:scale-105">
            <Image
              src="/gif/rabbit.gif"
              alt="Playful mascot"
              width={96}
              height={96}
              unoptimized
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          {/* Top-Right Floating NEP 2020 Stamp Badge */}
          <div
            className="pointer-events-none absolute -top-4 sm:-top-5 right-4 sm:right-8 z-20 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#0A1D3D] rounded-full border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] rotate-[3.5deg] select-none text-[11px] font-black uppercase tracking-wider"
            style={{ fontFamily: JAKARTA }}
          >
            <span className="text-sm">🌟</span>
            <span>NEP 2020 Aligned</span>
          </div>

          {/* Bottom-Left Floating Zero Pressure Stamp Badge */}
          <div
            className="pointer-events-none absolute -bottom-3.5 left-6 sm:left-10 z-20 hidden md:inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#BAE6FD] text-[#0A1D3D] rounded-full border-2 border-[#0F172A] shadow-[2.5px_2.5px_0px_#0F172A] rotate-[-2.5deg] select-none text-[11px] font-black uppercase tracking-wider"
            style={{ fontFamily: JAKARTA }}
          >
            <span>🎮</span>
            <span>Zero Test Pressure</span>
          </div>

          {/* Ambient Sparkles & Constellation Accents */}
          <div className="pointer-events-none absolute top-6 right-12 text-2xl text-[#0A1D3D]/30 select-none animate-pulse">
            ✦
          </div>
          <div className="pointer-events-none absolute bottom-8 right-16 text-base text-[#0A1D3D]/35 select-none">
            ★
          </div>
          <div className="pointer-events-none absolute bottom-10 left-16 text-xl text-[#0A1D3D]/30 select-none animate-pulse">
            ✦
          </div>
          <div className="pointer-events-none absolute top-12 left-28 text-sm text-[#0A1D3D]/35 select-none">
            ★
          </div>

          {/* Top Pill */}
          <div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#0A1D3D] rounded-full border-2 border-[#0F172A] shadow-[2.5px_2.5px_0px_#0F172A] select-none rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <span className="text-xs font-black">🚀</span>
            <span>Take The Next Step</span>
          </div>

          {/* Heading */}
          <h2
            className="text-[30px] sm:text-[38px] lg:text-[44px] font-[800] text-[#0A1D3D] leading-[1.15] tracking-[-1.5px] max-w-[680px]"
            style={{ fontFamily: JAKARTA }}
          >
            See How The Approach Comes Together In Practice
          </h2>

          {/* Subtitle */}
          <p
            className="text-[14px] sm:text-[15.5px] font-[600] text-[#0F172A] leading-[150%] max-w-[620px]"
            style={{ fontFamily: JAKARTA }}
          >
            Explore interactive game previews or learn how schools and families use our insight reports every day.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-1 sm:mt-2 w-full select-none">
            {/* Primary Blue Button */}
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] px-6 sm:px-7 rounded-[14px] bg-[#0284C7] hover:bg-[#0369A1] text-white font-[800] text-[13.5px] sm:text-[14px] border-2 border-[#0F172A] shadow-[3.5px_3.5px_0px_#0F172A] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#0F172A] active:translate-y-0 active:shadow-[1px_1px_0px_#0F172A] transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: JAKARTA }}
            >
              <span>See How OrionKids Works</span>
              <span className="text-sm">→</span>
            </Link>

            {/* Secondary White Button */}
            <Button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] px-6 sm:px-7 rounded-[14px] bg-white hover:bg-slate-50 text-[#0A1D3D] font-[800] text-[13.5px] sm:text-[14px] border-2 border-[#0F172A] shadow-[3.5px_3.5px_0px_#0F172A] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#0F172A] active:translate-y-0 active:shadow-[1px_1px_0px_#0F172A] transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: JAKARTA }}
            >
              <span>Join The Pilot</span>
              <span className="text-sm font-bold">⚡</span>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
