"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

/* ------------------------------------------------------------------ */
/*  Step Items Data                                                     */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    num: "1",
    numBg: "#65DCAA",
    numColor: "#0A1D3D",
    category: "SETUP",
    title: "Plan Your Class",
    description: "Select a class, set goals, and confirm needed support for the kids.",
    pillIcon: "📐",
    pillText: "Plan a Class",
  },
  {
    num: "2",
    numBg: "#F0E6FF",
    numColor: "#0A1D3D",
    category: "PLAY SESSION",
    title: "Play a Space Quest",
    description: "Children engage in sorting and memory tasks with teacher support during class.",
    pillIcon: "🎮",
    pillText: "Supported Play",
  },
  {
    num: "3",
    numBg: "#1763BC",
    numColor: "#FFFFFF",
    category: "INSIGHTS",
    title: "Notice Strategies",
    description: "Observe how kids tackle tasks, use cues, and adapt their strategies in class.",
    pillIcon: "📊",
    pillText: "Classroom Context",
  },
  {
    num: "4",
    numBg: "#FFD54F",
    numColor: "#0A1D3D",
    category: "ACTION",
    title: "Plan a Next Step",
    description: "Utilize a picture prompt or hands-on activity to share simple insights with families.",
    pillIcon: "📁",
    pillText: "Practical Ideas",
  },
];

/* ------------------------------------------------------------------ */
/*  Steps Section Component                                             */
/* ------------------------------------------------------------------ */
export function ForSchoolsStepsSection() {
  return (
    <section
      className="relative w-full py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================= HEADER AREA WITH GIF ================= */}
        <div className="relative w-full flex flex-col items-center text-center mb-12 lg:mb-16">
          {/* Top Yellow Pill */}
          <div
            className="inline-flex items-center justify-center rounded-full border border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-5 select-none"
            style={{
              height: "24px",
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: "#FFD54F",
              color: "#0E1C32",
              fontFamily: SPACE,
              fontWeight: 700,
              fontSize: "11px",
              lineHeight: "14px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            4 STEPS TO CLASSROOM PLAY
          </div>

          {/* Main Title */}
          <h2
            className="mb-3 max-w-[640px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: "48px",
              letterSpacing: "-0.8px",
              color: "#0A1D3D",
            }}
          >
            Bring OrionKids into Your School
          </h2>

          {/* Subtitle Description */}
          <p
            className="max-w-[566px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "24px",
              letterSpacing: "0px",
              color: "#526176",
            }}
          >
            Start with a school walkthrough. Plan a play session, review observations and choose a small teaching step that fits your classroom.
          </p>
        </div>

        {/* ================= 4 CARDS GRID (1,024px max width) ================= */}
        <div className="max-w-[1024px] mx-auto w-full relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 w-full relative">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="relative flex flex-col justify-between bg-white rounded-[24px] p-5 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  boxShadow: "3px 3px 0px 0px #0A1D3D",
                  minHeight: "270px",
                }}
              >
                {/* Horizontal green connector line between cards (desktop view) */}
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute -left-3 top-[44px] w-5 h-[8px] bg-[#65DCAA] z-10"
                  />
                )}

                <div>
                  {/* Card Top Row: Number Badge (48px x 48px) + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg shadow-sm"
                      style={{
                        backgroundColor: step.numBg,
                        color: step.numColor,
                        fontFamily: JAKARTA,
                      }}
                    >
                      {step.num}
                    </div>
                    <span
                      style={{
                        fontFamily: SPACE,
                        fontWeight: 700,
                        fontSize: "11px",
                        lineHeight: "14px",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        color: "#0A1D3D",
                      }}
                    >
                      {step.category}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "17px",
                      lineHeight: "24px",
                      color: "#0A1D3D",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Card Description */}
                  <p
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 500,
                      fontSize: "13px",
                      lineHeight: "19px",
                      color: "#526176",
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Bottom Pill Tag */}
                <div className="mt-5 pt-1">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] select-none"
                    style={{
                      backgroundColor: "#E8F9F0",
                      fontFamily: JAKARTA,
                      fontWeight: 700,
                      fontSize: "11px",
                      lineHeight: "15px",
                      color: "#0A1D3D",
                    }}
                  >
                    <span className="text-xs">{step.pillIcon}</span>
                    <span>{step.pillText}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
