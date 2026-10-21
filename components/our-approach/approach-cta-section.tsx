"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function ApproachCtaSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      {/*MAIN DIV*/}
      <div
        className="w-full max-w-[1216px] mx-auto rounded-[24px] border border-[#E2E8F0] pt-[58px] pb-[56px] px-4 sm:px-8 lg:px-[56px] shadow-sm flex flex-col justify-center items-center"
        style={{
          background: "linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 50%, #FFFBEB 100%)",
        }}
      >
        {/* INNER DIV*/}
        <div className="w-full max-w-[1102px] mx-auto rounded-[36px] border-[2px] border-[#0F172A] bg-[#FFD028] shadow-[6px_6px_0px_0px_#0F172A] pt-[53px] pb-[56px] px-6 sm:px-12 md:px-16 lg:px-[120px] xl:px-[213px] flex flex-col items-center justify-center text-center gap-5 sm:gap-6">
          {/* Top Pill*/}
          <div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#0A1D3D] rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] select-none"
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
            <span>TAKE THE NEXT STEP</span>
          </div>

          {/* Heading */}
          <h2
            className="text-[30px] sm:text-[38px] lg:text-[44px] font-[800] text-[#0A1D3D] leading-[1.15] tracking-[-1.5px] max-w-[680px]"
            style={{ fontFamily: JAKARTA }}
          >
            See how the approach comes together in practice.
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
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] px-6 sm:px-7 rounded-[14px] bg-[#0284C7] text-white font-[800] text-[13.5px] sm:text-[14px] border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_1px_0px_#0F172A] transition-all cursor-pointer whitespace-nowrap" 
              style={{ fontFamily: JAKARTA }}
            >
              <span>See How OrionKids Works</span>
              <span className="text-sm font-bold">→</span>
            </Link>

            {/* Secondary White Button */}
            <Button
              
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[48px] px-6 sm:px-7 rounded-[14px] bg-white text-[#0A1D3D] font-[800] text-[13.5px] sm:text-[14px] border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] active:translate-y-0.5 active:shadow-[1px_1px_0px_#0F172A] transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: JAKARTA }}
            >
              <span>Join the Pilot</span>
              <span className="text-sm font-bold">⚡</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
