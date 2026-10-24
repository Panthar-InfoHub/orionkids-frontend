"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

interface CycleStep {
  phase: string;
  phaseNum: string;
  title: string;
  icon: string;
  iconBg: string;
  badgeBg: string;
  cornerBg: string;
  bottomBg: string;
  description: string;
  keyFocus: string;
}

const CYCLE_STEPS: CycleStep[] = [
  {
    phase: "PHASE 1",
    phaseNum: "01",
    title: "Play",
    icon: "🎮",
    iconBg: "#E0F2FE",
    badgeBg: "#38BDF8",
    cornerBg: "#38BDF8",
    bottomBg: "#E0F2FE",
    description:
      "Children take part in joyful, age-appropriate games and activities designed around key cognitive areas. The experience is built to feel like exploration and play, not an exam.",
    keyFocus: "Low-pressure play • Natural reaction patterns",
  },
  {
    phase: "PHASE 2",
    phaseNum: "02",
    title: "Discover",
    icon: "🔍",
    iconBg: "#F3E8FF",
    badgeBg: "#C084FC",
    cornerBg: "#C084FC",
    bottomBg: "#F5F3FF",
    description:
      "Through spontaneous problem-solving, we uncover natural thinking rhythms, curiosity triggers, and unique cognitive strengths in real-time.",
    keyFocus: "Curiosity triggers • Natural thinking styles",
  },
  {
    phase: "PHASE 3",
    phaseNum: "03",
    title: "Understand",
    icon: "🧠",
    iconBg: "#FEF3C7",
    badgeBg: "#FFD028",
    cornerBg: "#FFD028",
    bottomBg: "#FEF9C3",
    description:
      "Performance is organized into meaningful indicators that are easy for adults to interpret. Instead of a bare number, parents and educators see strengths and areas for practice.",
    keyFocus: "Clear parent profiles • Classroom dashboards",
  },
  {
    phase: "PHASE 4",
    phaseNum: "04",
    title: "Support",
    icon: "🤝",
    iconBg: "#FFE7DD",
    badgeBg: "#FF7043",
    cornerBg: "#FF7043",
    bottomBg: "#FFEDD5",
    description:
      "Insights inform personalized activities and practice opportunities based on the child's evolving profile. Support follows the child, not a one-size-fits-all plan.",
    keyFocus: "Real-world activities • Low-cost home routines",
  },
  {
    phase: "PHASE 5",
    phaseNum: "05",
    title: "Growth",
    icon: "🌱",
    iconBg: "#D1FAE5",
    badgeBg: "#00C48C",
    cornerBg: "#00C48C",
    bottomBg: "#DCFCE7",
    description:
      "Repeated interactions build a longitudinal view of progress and changing patterns, so adults can celebrate milestones and support continuous progress.",
    keyFocus: "Progress over perfection • Longitudinal growth",
  },
];

export function CycleSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-[1360px] mx-auto flex flex-col gap-[40px]">
        {/* Header Block */}
        <div className="flex flex-col items-start gap-2.5">
          {/* Tag Pill: THE ORIONKIDS CYCLE */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD028] text-[#0A1D3D] rounded-full border-[2px] border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] select-none"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <span className="text-xs">⚡</span>
            <span>THE ORIONKIDS CYCLE</span>
          </div>

          {/* Heading */}
          <h2
            className="text-[32px] sm:text-[40px] lg:text-[44px] font-[800] text-[#0A1D3D] leading-[1.12] tracking-[-1.2px]"
            style={{ fontFamily: JAKARTA }}
          >
            How the five steps work together
          </h2>

          {/* Subtitle */}
          <p
            className="text-[15px] sm:text-[17px] font-[500] text-[#526176] max-w-3xl leading-[150%]"
            style={{ fontFamily: JAKARTA }}
          >
            A continuous loop of joyful discovery, actionable clarity, and steady progress.
          </p>
        </div>

        {/* ================= 5 CARDS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 xl:gap-5 w-full">
          {CYCLE_STEPS.map((step) => (
            <div
              key={step.phaseNum}
              className="relative bg-white rounded-[24px] border-[2px] border-[#0A1D3D] p-5 sm:p-6 flex flex-col justify-between min-h-[410px] overflow-hidden shadow-[4px_6px_0px_0px_#0A1D3D] transition-all duration-200 select-none group last:sm:col-span-2 last:lg:col-span-1"
              style={{
                fontFamily: JAKARTA,
              }}
            >
              {/* Corner Phase Number Tab (01, 02, 03, 04, 05) */}
              <div
                className="absolute top-0 right-0 w-[42px] h-[42px] rounded-tr-[22px] rounded-bl-[28px] border-l-[2px] border-b-[2px] border-[#0A1D3D] flex items-center justify-center font-[800] text-[12.5px] text-[#0A1D3D] z-10"
                style={{ backgroundColor: step.cornerBg }}
              >
                {step.phaseNum}
              </div>

              {/* Top Section: Icon & Phase Pill Badge */}
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between w-full pr-8">
                  {/* Icon Box */}
                  <div
                    className="w-[44px] h-[44px] rounded-[14px] border-[2px] border-[#0A1D3D] flex items-center justify-center text-[20px] shrink-0"
                    style={{ backgroundColor: step.iconBg }}
                  >
                    <span>{step.icon}</span>
                  </div>

                  {/* Phase Pill Badge */}
                  <div
                    className="inline-flex items-center justify-center px-2.5 py-1 rounded-full border-[2px] border-[#0A1D3D] text-[10px] font-[800] uppercase tracking-[0.5px] text-[#0A1D3D] shrink-0"
                    style={{ backgroundColor: step.badgeBg }}
                  >
                    {step.phase}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[22px] font-[800] text-[#0A1D3D] leading-tight"
                    style={{ fontFamily: JAKARTA }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[12.5px] sm:text-[13px] font-[400] text-[#526176] leading-[155%]"
                    style={{ fontFamily: INTER }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Bottom Box: Key Focus */}
              <div
                className="w-full rounded-[14px] p-3 border-t-[2px] border-dashed border-[#0A1D3D] flex flex-col gap-1 mt-4"
                style={{ backgroundColor: step.bottomBg }}
              >
                <span
                  className="text-[10px] font-[800] tracking-[0.5px] uppercase text-[#0A1D3D]"
                  style={{ fontFamily: JAKARTA }}
                >
                  KEY FOCUS:
                </span>
                <p
                  className="text-[11.5px] font-[600] leading-[135%] text-[#334155]"
                  style={{ fontFamily: JAKARTA }}
                >
                  {step.keyFocus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
