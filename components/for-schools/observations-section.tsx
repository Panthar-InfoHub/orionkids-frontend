"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

/* ------------------------------------------------------------------ */
/*  SVGs: Controller Doodle & Card Icons                                */
/* ------------------------------------------------------------------ */
function GameControllerDoodle() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 -rotate-12 select-none"
      aria-hidden="true"
    >
      {/* Outer Controller Body */}
      <path
        d="M13 15C8 15 5 19 5 25C5 31 7 38 12 38C15.5 38 17.5 34 20 31H28C30.5 31 32.5 38 36 38C41 38 43 31 43 25C43 19 40 15 35 15C31 15 28 17 24 17C20 17 17 15 13 15Z"
        fill="#FFFFFF"
        stroke="#0A1D3D"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* D-Pad */}
      <path
        d="M12 21V29M8 25H16"
        stroke="#0A1D3D"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Action Buttons */}
      <circle cx="34" cy="22" r="1.6" fill="#0A1D3D" />
      <circle cx="38" cy="25" r="1.6" fill="#0A1D3D" />
      <circle cx="34" cy="28" r="1.6" fill="#0A1D3D" />
      <circle cx="30" cy="25" r="1.6" fill="#0A1D3D" />
    </svg>
  );
}

function TriangleRulerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20L20 4V20H4Z"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17L17 9V17H9Z"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="17" y1="13" x2="15" y2="13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="16" x2="14" y2="16" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="17" x2="13" y2="15" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="17" x2="10" y2="14" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6H14M18 6H20" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="6" r="2.5" stroke="#FFFFFF" strokeWidth="2" fill="#1E5FBF" />
      <path d="M4 12H7M11 12H20" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9" cy="12" r="2.5" stroke="#FFFFFF" strokeWidth="2" fill="#1E5FBF" />
      <path d="M4 18H13M17 18H20" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="15" cy="18" r="2.5" stroke="#FFFFFF" strokeWidth="2" fill="#1E5FBF" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19L8.5 15.5M19 5C17.5 3.5 13 4 9.5 7.5C7.5 9.5 6.5 12 6.5 13.5L10.5 17.5C12 17.5 14.5 16.5 16.5 14.5C20 11 20.5 6.5 19 5Z"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="13.5" cy="10.5" r="1.5" fill="#FFFFFF" />
      <path
        d="M6.5 13.5L4 15L3 18L6 17L7.5 14.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 17.5L9 20L12 21L13.5 18"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                   */
/* ------------------------------------------------------------------ */
export function ForSchoolsObservationsSection() {
  return (
    <section
      className="relative w-full py-16 lg:py-20 overflow-hidden border-t border-b border-[#0A1D3D]"
      style={{ backgroundColor: "#F3EBFF" }}
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        {/* ================= UPPER PILL ================= */}
        <div
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-6 select-none"
          style={{
            maxWidth: "484px",
            minHeight: "28px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "4px",
            paddingBottom: "4px",
            backgroundColor: "#D6BBFF",
            color: "#0E1C32",
          }}
        >
          {/* Left menu icon */}
          <span className="text-xs opacity-80" aria-hidden="true">
            ☰
          </span>
          <span
            style={{
              fontFamily: SPACE,
              fontWeight: 700,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
            }}
          >
            CLASSROOM DISCOVERY • PLAY, NOTICE, SUPPORT
          </span>
          {/* Right card / ticket icon */}
          <span className="text-xs opacity-80" aria-hidden="true">
            ✉
          </span>
        </div>

        {/* ================= MAIN HEADING ================= */}
        <div className="relative w-full flex flex-col items-center text-center mb-12 sm:mb-14">
          {/* Game controller doodle on the left of title */}
          <div className="hidden md:block absolute left-2 lg:left-8 top-1">
            <GameControllerDoodle />
          </div>

          <h2
            className="flex flex-col items-center"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: "48px",
              letterSpacing: "-0.8px",
              color: "#0E1C32",
            }}
          >
            <span>Turn Classroom Observation into</span>

            {/* "Everyday Support" Dark Badge */}
            <span className="inline-block mt-2">
              <span
                className="inline-flex items-center justify-center px-6 py-1"
                style={{
                  backgroundColor: "#0E1C32",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  border: "2px solid #0E1C32",
                  boxShadow: "3px 4px 0px 0px #0A1D3D",
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  lineHeight: "48px",
                  letterSpacing: "-0.8px",
                }}
              >
                Everyday Support
              </span>
            </span>
          </h2>
        </div>

        {/* ================= 3 CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 w-full">
          {/* ---------------- CARD 1: Playful Discovery ---------------- */}
          <div
            className="flex flex-col justify-between rounded-[24px] p-6 sm:p-7 border-[1.5px] border-[#0A1D3D] transition-transform duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "rgba(234, 246, 255, 0.8)",
              boxShadow: "6px 6px 0px 0px #0A1D3D",
              minHeight: "380px",
            }}
          >
            <div>
              {/* Blue Icon Square with offset navy drop shadow */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5 border border-[#0A1D3D]"
                style={{
                  backgroundColor: "#1E5FBF",
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                }}
              >
                <TriangleRulerIcon />
              </div>

              {/* Tag Pill */}
              <div className="mb-3">
                <span
                  className="inline-flex items-center px-3 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "#DDF1FD",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "18px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "#1E5FBF",
                  }}
                >
                  PLAY, NOT LABELS
                </span>
              </div>

              {/* Title */}
              <h3
                className="mb-3 flex items-center gap-1.5"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "22px",
                  lineHeight: "28px",
                  color: "#0A1D3D",
                }}
              >
                <span>Playful Discovery</span>
                <span className="text-base select-none">📐</span>
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                }}
              >
                Watch children explore patterns, remember steps and try new rules. Play offers a starting point for noticing learning strategies, not a test score or a diagnosis.
              </p>
            </div>

            {/* Bottom Pill */}
            <div
              className="mt-6 w-full flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white border border-[#0A1D3D]/10 select-none shadow-[0px_2px_4px_rgba(10,29,61,0.04)]"
              style={{ minHeight: "44px" }}
            >
              <span className="text-sm select-none" style={{ color: "#7C3AED" }}>
                ⚡
              </span>
              <span
                className="truncate"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#0A1D3D",
                }}
              >
                Playful Tasks, Not Test-Paper Pressure.
              </span>
            </div>
          </div>

          {/* ---------------- CARD 2: Everyday Support ---------------- */}
          <div
            className="flex flex-col justify-between rounded-[24px] p-6 sm:p-7 border-[1.5px] border-[#0A1D3D] transition-transform duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "rgba(232, 249, 240, 0.8)",
              boxShadow: "6px 6px 0px 0px #0A1D3D",
              minHeight: "380px",
            }}
          >
            <div>
              {/* Blue Icon Square with offset navy drop shadow */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5 border border-[#0A1D3D]"
                style={{
                  backgroundColor: "#1E5FBF",
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                }}
              >
                <SlidersIcon />
              </div>

              {/* Tag Pill */}
              <div className="mb-3">
                <span
                  className="inline-flex items-center px-3 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "#D8F3FF",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "18px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "#1763BC",
                  }}
                >
                  TEACHER-LED SUPPORT
                </span>
              </div>

              {/* Title */}
              <h3
                className="mb-3 flex items-center gap-1.5"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "22px",
                  lineHeight: "28px",
                  color: "#0A1D3D",
                }}
              >
                <span>Everyday Support</span>
                <span className="text-base select-none">🎯</span>
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                }}
              >
                Bring play observations into everyday teaching. Try picture prompts, counting blocks or shorter instructions, then watch what helps. Your knowledge of each child guides the next step.
              </p>
            </div>

            {/* Bottom Pill */}
            <div
              className="mt-6 w-full flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white border border-[#0A1D3D]/10 select-none shadow-[0px_2px_4px_rgba(10,29,61,0.04)]"
              style={{ minHeight: "44px" }}
            >
              <span className="text-sm select-none" style={{ color: "#0D9488" }}>
                👥
              </span>
              <span
                className="truncate"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#0A1D3D",
                }}
              >
                Ideas For Our Next Small-Group Session.
              </span>
            </div>
          </div>

          {/* ---------------- CARD 3: Joyful Exploration ---------------- */}
          <div
            className="flex flex-col justify-between rounded-[24px] p-6 sm:p-7 border-[1.5px] border-[#0A1D3D] transition-transform duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: "rgba(255, 240, 246, 0.8)",
              boxShadow: "6px 6px 0px 0px #0A1D3D",
              minHeight: "380px",
            }}
          >
            <div>
              {/* Blue Icon Square with offset navy drop shadow */}
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5 border border-[#0A1D3D]"
                style={{
                  backgroundColor: "#1E5FBF",
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                }}
              >
                <RocketIcon />
              </div>

              {/* Tag Pill */}
              <div className="mb-3">
                <span
                  className="inline-flex items-center px-3 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "#D8F3FF",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "18px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "#1763BC",
                  }}
                >
                  JOYFUL PARTICIPATION
                </span>
              </div>

              {/* Title */}
              <h3
                className="mb-3 flex items-center gap-1.5"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "22px",
                  lineHeight: "28px",
                  color: "#0A1D3D",
                }}
              >
                <span>Joyful Exploration</span>
                <span className="text-base select-none">🚀</span>
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#475569",
                }}
              >
                Make room for curiosity in the school day. Children explore playful space challenges, try different approaches and share discoveries. Celebrate effort, not comparison.
              </p>
            </div>

            {/* Bottom Pill */}
            <div
              className="mt-6 w-full flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-white border border-[#0A1D3D]/10 select-none shadow-[0px_2px_4px_rgba(10,29,61,0.04)]"
              style={{ minHeight: "44px" }}
            >
              <span className="text-sm select-none" style={{ color: "#9333EA" }}>
                🟣
              </span>
              <span
                className="truncate"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#0A1D3D",
                }}
              >
                Room To Explore, Try Again And Grow
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
