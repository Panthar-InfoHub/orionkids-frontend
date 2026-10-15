"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

/* ------------------------------------------------------------------ */
/*  Demo Task Section Component                                         */
/* ------------------------------------------------------------------ */
export function ForSchoolsDemoTaskSection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState("0/3");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (option === "blue-sun") {
      setScore("1/3");
    } else {
      setScore("0/3");
    }
  };

  return (
    <section
      className="relative w-full py-16 lg:py-24 overflow-hidden border-b border-[#0A1D3D]"
      style={{ backgroundColor: "#EAF9F1" }}
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================= BIG WHITE CARD WITH BELL PEAKING ================= */}
        <div
          className="relative w-full bg-white rounded-[28px] p-6 sm:p-8 lg:p-10 border-2 border-[#0A1D3D]"
          style={{
            boxShadow: "6px 6px 0px 0px #0A1D3D",
          }}
        >
          {/* Peeking Bell GIF on Top-Right Corner */}
          <div className="absolute -top-7 right-6 sm:right-10 w-16 h-16 pointer-events-none select-none z-20">
            <Image
              src="/gif/bell.gif"
              alt="Animated cheerful bell"
              width={64}
              height={64}
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Top Pill Badges */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full select-none"
              style={{
                backgroundColor: "#65DCAA",
                color: "#0A1D3D",
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "14px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              ILLUSTRATIVE DEMO
            </span>
            <span
              style={{
                fontFamily: JAKARTA,
                fontWeight: 600,
                fontSize: "13px",
                color: "#526176",
              }}
            >
              Sample Play Task
            </span>
          </div>

          {/* Title */}
          <h2
            className="mb-2 flex items-center flex-wrap gap-2"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "clamp(24px, 3.5vw, 32px)",
              lineHeight: "40px",
              letterSpacing: "-0.6px",
              color: "#0A1D3D",
            }}
          >
            <span>Explore a Playful &ldquo;Rule Discovery&rdquo; Task</span>
            <span className="text-2xl select-none" aria-hidden="true">
              🧠
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mb-8 max-w-[680px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "23px",
              color: "#526176",
            }}
          >
            See how a simple sorting task invites children to notice patterns. Match the color shown in this example.
          </p>

          {/* ================= 2-COLUMN MAIN CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* ---------------- LEFT: Interactive Playful Task ---------------- */}
            <div
              className="rounded-[20px] p-5 sm:p-6 border border-[#0A1D3D]/10"
              style={{ backgroundColor: "#FFF9EA" }}
            >
              {/* Task Header: Current Rule + Score */}
              <div className="flex items-center justify-between mb-4">
                <div
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#0A1D3D",
                  }}
                >
                  <span className="text-[#526176]">Current Rule: </span>
                  <span className="text-[#0D9488]">Match by Color</span>
                </div>
                <div
                  className="px-2.5 py-0.5 rounded-full select-none"
                  style={{
                    backgroundColor: "#FFD54F",
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#0A1D3D",
                  }}
                >
                  Score: {score}
                </div>
              </div>

              {/* Target Item Card */}
              <div className="bg-white rounded-[14px] p-3 sm:p-3.5 mb-4 flex items-center justify-between shadow-sm border border-slate-100">
                <span
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#0A1D3D",
                  }}
                >
                  Target Alien:
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-white select-none"
                  style={{
                    backgroundColor: "#005B7F",
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  <span>★</span>
                  <span>Blue Star (3 Horns)</span>
                </span>
              </div>

              {/* 3 Selectable Cards */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {/* Option 1: Blue Sun (Correct by color) */}
                <button
                  type="button"
                  onClick={() => handleSelect("blue-sun")}
                  className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all cursor-pointer ${
                    selectedOption === "blue-sun"
                      ? "ring-2 ring-[#0A1D3D] shadow-md scale-102"
                      : "hover:scale-102 hover:shadow-sm"
                  }`}
                  style={{ backgroundColor: "#BCE5FF" }}
                >
                  <span className="text-xl mb-1 select-none" aria-hidden="true">
                    ⚙
                  </span>
                  <span
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "#0A1D3D",
                    }}
                  >
                    Blue Sun
                  </span>
                </button>

                {/* Option 2: Yellow Star */}
                <button
                  type="button"
                  onClick={() => handleSelect("yellow-star")}
                  className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all cursor-pointer ${
                    selectedOption === "yellow-star"
                      ? "ring-2 ring-[#0A1D3D] shadow-md scale-102"
                      : "hover:scale-102 hover:shadow-sm"
                  }`}
                  style={{ backgroundColor: "#FFE066" }}
                >
                  <span className="text-xl mb-1 select-none" aria-hidden="true">
                    ☆
                  </span>
                  <span
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "#0A1D3D",
                    }}
                  >
                    Yellow Star
                  </span>
                </button>

                {/* Option 3: Violet Cone */}
                <button
                  type="button"
                  onClick={() => handleSelect("violet-cone")}
                  className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all cursor-pointer ${
                    selectedOption === "violet-cone"
                      ? "ring-2 ring-[#0A1D3D] shadow-md scale-102"
                      : "hover:scale-102 hover:shadow-sm"
                  }`}
                  style={{ backgroundColor: "#D6BBFF" }}
                >
                  <span className="text-xl mb-1 select-none" aria-hidden="true">
                    △
                  </span>
                  <span
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "#0A1D3D",
                    }}
                  >
                    Violet Cone
                  </span>
                </button>
              </div>

              {/* Bottom hint text */}
              <div
                className="text-center"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#526176",
                }}
              >
                Match the target color, not its shape.
              </div>
            </div>

            {/* ---------------- RIGHT: Classroom View & Insights ---------------- */}
            <div className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between pb-1">
                <div
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#0A1D3D",
                  }}
                >
                  <span>📁</span>
                  <span>Sample Classroom View</span>
                </div>
                <span
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 600,
                    fontSize: "12px",
                    color: "#1E5FBF",
                  }}
                >
                  Illustrative Only
                </span>
              </div>

              {/* Student Card 1: Aarav M. */}
              <div className="bg-white rounded-[16px] p-3.5 border border-slate-100 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none"
                    style={{
                      backgroundColor: "#65DCAA",
                      color: "#0A1D3D",
                      fontFamily: JAKARTA,
                    }}
                  >
                    A.M.
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#0A1D3D",
                      }}
                    >
                      Aarav M. (Age 8)
                    </div>
                    <div
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#526176",
                      }}
                    >
                      Tries a new rule
                    </div>
                  </div>
                </div>

                <span
                  className="inline-flex items-center px-3 py-1 rounded-full shrink-0 select-none"
                  style={{
                    backgroundColor: "#EAF6FF",
                    color: "#1E5FBF",
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "11px",
                  }}
                >
                  Notices rule changes
                </span>
              </div>

              {/* Student Card 2: Kavya S. */}
              <div className="bg-white rounded-[16px] p-3.5 border border-slate-100 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none"
                    style={{
                      backgroundColor: "#F0E6FF",
                      color: "#0A1D3D",
                      fontFamily: JAKARTA,
                    }}
                  >
                    K.S.
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "18px",
                        color: "#0A1D3D",
                      }}
                    >
                      Kavya S. (Age 8)
                    </div>
                    <div
                      style={{
                        fontFamily: JAKARTA,
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#526176",
                      }}
                    >
                      Uses picture cues
                    </div>
                  </div>
                </div>

                <span
                  className="inline-flex items-center px-3 py-1 rounded-full shrink-0 select-none"
                  style={{
                    backgroundColor: "#E8F9F0",
                    color: "#059669",
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "11px",
                  }}
                >
                  Try: one step at a time
                </span>
              </div>

              {/* Blue Example Teaching Idea Callout */}
              <div
                className="rounded-[16px] p-4 text-white select-none mt-1"
                style={{
                  backgroundColor: "#1763BC",
                  fontFamily: JAKARTA,
                  fontSize: "13px",
                  lineHeight: "20px",
                }}
              >
                <p>
                  <strong className="font-bold">Example teaching idea:</strong> Use picture cues and short instructions in a shared sorting activity. Observe what helps each child take the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
