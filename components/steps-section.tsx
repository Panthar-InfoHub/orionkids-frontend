"use client";

import React from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Font family shortcuts                                               */
/* ------------------------------------------------------------------ */
const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

const NAVY = "#0A1D3D";
const GREEN = "#2DD4BF";

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
      className="relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================= HEADER AREA WITH GIF ================= */}
        <div className="relative w-full flex flex-col items-center text-center mb-10 lg:mb-16">
          {/* Top Yellow Pill */}
          <div
            className="inline-flex items-center justify-center rounded-full border shadow-[2px_2px_0px_0px_#0A1D3D] mb-5 select-none"
            style={{
              height: "24px",
              paddingLeft: "16px",
              paddingRight: "16px",
              backgroundColor: "#FFD54F",
              borderColor: NAVY,
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
            className="mb-3 max-w-[640px] text-[28px] leading-[36px] sm:text-[34px] sm:leading-[42px] lg:text-[40px] lg:leading-[48px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              letterSpacing: "-0.8px",
              color: NAVY,
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
              color: "#526176",
            }}
          >
            Start with a school walkthrough. Plan a play session, review observations and choose a small teaching step that fits your classroom.
          </p>

          {/* Animated Animals GIF (top-right of header area, desktop only) */}
          <div className="hidden lg:block absolute right-0 -top-4 w-[150px] h-[150px] pointer-events-none select-none">
            <Image
              src="/gif/animals.gif"
              alt="Friendly playful animals illustration"
              width={150}
              height={150}
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* ================= 4 CARDS GRID ================= */}
        <div className="max-w-[1024px] mx-auto w-full relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-9 sm:gap-y-8 lg:gap-x-4 w-full relative pr-1 pb-1">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="relative flex flex-col justify-between bg-white rounded-[24px] p-5 transition-transform duration-200 hover:-translate-y-1 min-h-[250px] lg:min-h-[270px]"
                style={{
                  border: `1px solid rgba(10, 29, 61, 0.12)`,
                  boxShadow: `4px 4px 0px 0px ${NAVY}`,
                }}
              >
                {/* Horizontal green connector (desktop, between cards) */}
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block absolute -left-[19px] top-[57px] w-[19px] h-[4px] z-10"
                    style={{ backgroundColor: GREEN }}
                  />
                )}

                {/* Vertical green connector (mobile, stacked cards) */}
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="sm:hidden absolute left-1/2 -top-9 -translate-x-1/2 w-[4px] h-9 z-10"
                    style={{ backgroundColor: GREEN }}
                  />
                )}

                <div>
                  {/* Top Row: Number Badge + Category */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div
                      className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-extrabold text-lg"
                      style={{
                        backgroundColor: step.numBg,
                        color: step.numColor,
                        fontFamily: JAKARTA,
                        border: `1.5px solid ${NAVY}`,
                        boxShadow: `2px 2px 0px 0px ${NAVY}`,
                      }}
                    >
                      {step.num}
                    </div>
                    <span
                      className="text-right"
                      style={{
                        fontFamily: SPACE,
                        fontWeight: 700,
                        fontSize: "11px",
                        lineHeight: "14px",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        color: NAVY,
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
                      color: NAVY,
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
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 rounded-[8px] select-none"
                    style={{
                      backgroundColor: "#E8F9F0",
                      fontFamily: JAKARTA,
                      fontWeight: 600,
                      fontSize: "11px",
                      lineHeight: "15px",
                      color: NAVY,
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
