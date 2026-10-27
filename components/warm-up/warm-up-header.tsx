"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface WarmUpHeaderProps {
  currentStep: number;
  totalSteps: number;
  isLastStep?: boolean;
  isCompleted?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

export function WarmUpHeader({ currentStep, totalSteps, isLastStep, isCompleted = false }: WarmUpHeaderProps) {
  return (
    <header className="w-full">
      {/* 1. Topmost accent line: bg #FF8CC7, height 6px */}
      <div className="w-full h-[6px] bg-[#FF8CC7]" />

      {/* 2. Main Navigation Bar */}
      <div className="w-full bg-[#FFFFFF] border-b border-[#D8DFE8]">
        <div className="max-w-[1440px] w-full mx-auto h-[64px] sm:h-[72px] px-4 sm:px-6 lg:px-8 xl:px-[88px] flex items-center gap-[24px] sm:gap-[35px]">
          <Link href="/" className="flex items-center shrink-0" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={126}
              height={60}
              priority
              className="w-[115px] h-[54px] sm:w-[130px] sm:h-[62px] object-contain"
            />
          </Link>

          {/* Pill in navbar: Hug (141px), Hug (23px), Radius 100px, Padding T/B 5px, L/R 10px, bg #EAF7EF, Text #0A1D3D */}
          <span
            className="inline-flex items-center justify-center w-[130px] sm:w-[141px] h-[22px] rounded-[100px] text-[#0A1D3D] whitespace-nowrap shrink-0 select-none"
            style={{
              backgroundColor: "#EAF7EF",
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingLeft: "8px",
              paddingRight: "8px",
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "9.5px",
              lineHeight: "100%",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
            }}
          >
            A WORLD OF POTENTIAL
          </span>
        </div>
      </div>

      {/* 3. Sub-header: Breadcrumb & Progress Stepper */}
      <div className="w-full bg-[#F0F6FA] pt-2.5 sm:pt-3 pb-2">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-[88px] flex flex-col gap-[10px] sm:gap-[12px]">
          {/* Top Row: Breadcrumbs on Left, Step Indicator on Right */}
          <div className="flex items-center justify-between">
            {/* Breadcrumb Steps */}
            <div className="flex items-center gap-1.5" style={{ fontFamily: JAKARTA }}>
              {/* Profile ready: 400 Regular, 12px, #526176 */}
              <span
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#526176",
                }}
              >
                Profile ready
              </span>

              <span className="text-[#526176] text-[12px] select-none">›</span>

              {/* Your warm-up: 800 ExtraBold during warm-up, 400 Regular when completed */}
              <span
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: isCompleted ? 400 : 800,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: isCompleted ? "#526176" : "#0A1D3D",
                }}
              >
                Your warm-up
              </span>

              <span className="text-[#526176] text-[12px] select-none">›</span>

              {/* Stroop colour-word: 800 ExtraBold when warm-up completed, 400 Regular during warm-up */}
              <span
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: isCompleted ? 800 : 400,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: isCompleted ? "#0A1D3D" : "#526176",
                }}
              >
                Stroop colour-word
              </span>
            </div>

            {/* Right step indicator: Warm-up • 6 of 6 OR Warm-up complete · 6 of 6 */}
            <div
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#0A1D3D",
              }}
            >
              {isCompleted
                ? `Warm-up complete · ${totalSteps} of ${totalSteps}`
                : `Warm-up • ${currentStep + 1} of ${totalSteps}`}
            </div>
          </div>

          {/* 6-Segment Progress Bar: Yellow line height 6px */}
          <div className="grid grid-cols-6 gap-2 w-full">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const isCompletedOrActive = isCompleted || idx <= currentStep;
              return (
                <div
                  key={idx}
                  className="h-[6px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isCompletedOrActive ? "#FFD54F" : "#E2E8F0",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
