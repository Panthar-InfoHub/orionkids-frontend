"use client";

import React from "react";

interface StroopIntroCardProps {
  onBack: () => void;
  onPause: () => void;
  onStartGame: () => void;
  isLoading?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const LORA = "var(--font-lora), 'Lora', Georgia, serif";

export function StroopIntroCard({
  onBack,
  onPause,
  onStartGame,
  isLoading = false,
}: StroopIntroCardProps) {
  return (
    <div className="w-full md:max-w-[916px] flex-1 bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(10,29,61,0.03)] p-6 sm:p-[32px] flex flex-col justify-between min-h-[660px] gap-[24px]">
      <div className="flex flex-col h-full justify-between gap-[24px]">
        {/* Top Header Section */}
        <div className="flex flex-col gap-[8px]">
          {/* Overline tag: YOUR FIRST GAME · 1 OF 6 */}
          <span
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "1px",
              color: "#526176",
              textTransform: "uppercase",
            }}
          >
            YOUR FIRST GAME · 1 OF 6
          </span>

          {/* Title: Stroop colour-word */}
          <h2
            style={{
              fontFamily: LORA,
              fontWeight: 700,
              fontSize: "34px",
              lineHeight: "125%",
              letterSpacing: "-0.6px",
              color: "#0A1D3D",
            }}
          >
            Stroop colour-word
          </h2>

          {/* Subtitle: Level 1 · Spot the ink colour */}
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "140%",
              color: "#526176",
            }}
          >
            Level 1 · Spot the ink colour
          </p>
        </div>

        {/* Center: Interactive Practice Preview Box */}
        <div className="w-full rounded-[20px] bg-[#EEF6FC] border border-[#DCEBF6] p-6 sm:py-8 sm:px-10 flex flex-col items-center justify-center text-center my-auto shadow-sm">
          {/* Instruction */}
          <h3
            style={{
              fontFamily: JAKARTA,
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "140%",
              color: "#0A1D3D",
            }}
          >
            Notice the ink colour, then tap its name.
          </h3>

          {/* Ink Colour Word: RED */}
          <div
            className="my-5 select-none"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "44px",
              lineHeight: "100%",
              letterSpacing: "1.5px",
              color: "#E04F5F",
            }}
          >
            RED
          </div>

          {/* Two Sample Option Chips */}
          <div className="flex items-center justify-center gap-4 mb-4 select-none">
            {/* Red Option Chip */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border border-[#D8DFE8] shadow-[0_2px_4px_rgba(10,29,61,0.04)]">
              <span className="w-3 h-3 rounded-full bg-[#E04F5F] shrink-0" />
              <span
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#0A1D3D",
                }}
              >
                Red
              </span>
            </div>

            {/* Blue Option Chip */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border border-[#D8DFE8] shadow-[0_2px_4px_rgba(10,29,61,0.04)]">
              <span className="w-3 h-3 rounded-full bg-[#2563EB] shrink-0" />
              <span
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#0A1D3D",
                }}
              >
                Blue
              </span>
            </div>
          </div>

          {/* Footnote inside preview box */}
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "140%",
              color: "#526176",
            }}
          >
            Practice preview · Instructions come first.
          </p>
        </div>

        {/* Pace Callout Banner */}
        <div className="w-full bg-[#EAF7EF] border border-[#D1F2DD] rounded-[16px] px-5 py-4 flex items-center gap-3.5">
          {/* Pause / Cards Symbol */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A1D3D"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>

          <p
            className="text-[14px] leading-relaxed"
            style={{ fontFamily: JAKARTA }}
          >
            <strong className="font-extrabold text-[#0A1D3D]">
              Let’s go at your pace.
            </strong>{" "}
            <span className="text-[#526176]">
              Pause whenever you need to. A grown-up can help you get started.
            </span>
          </p>
        </div>

        {/* Bottom Actions Row */}
        <div className="pt-2 flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center gap-[12px] h-[54px] px-[24px] rounded-[12px] border border-[#0A1D3D] text-[#0A1D3D] bg-white hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer select-none"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "15px",
              lineHeight: "100%",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0A1D3D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          {/* Right Actions: Take a pause & Start Stroop */}
          <div className="flex items-center gap-3">
            {/* Take a pause */}
            <button
              type="button"
              onClick={onPause}
              className="inline-flex items-center justify-center h-[54px] px-[24px] rounded-[12px] border border-[#D8DFE8] text-[#0A1D3D] bg-white hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer select-none font-bold text-[15px]"
              style={{ fontFamily: JAKARTA }}
            >
              Take a pause
            </button>

            {/* Start Stroop - Level 1 */}
            <button
              type="button"
              onClick={onStartGame}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-[12px] h-[54px] px-[28px] rounded-[12px] border-2 border-[#0A1D3D] bg-[#FFD028] text-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer select-none disabled:opacity-75 disabled:cursor-not-allowed"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "15px",
                lineHeight: "100%",
              }}
            >
              <span>Start Stroop · Level 1</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
