"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const INK = "#0A1D3D";

interface DimensionCard {
  id: string;
  num: string;
  icon: string;
  iconBg: string;
  cardBg: string;
  cornerBg: string;
  tag: string;
  title: string;
  description: string;
  quest: string;
  questBg: string;
}

const DIMENSIONS: DimensionCard[] = [
  {
    id: "memory",
    num: "01",
    icon: "🧩",
    iconBg: "#DCFCE7",
    cardBg: "#F4FBF6",
    cornerBg: "#BBF7D0",
    tag: "RETENTION",
    title: "Memory",
    description: "Remembering, retaining and working with information across daily learning tasks.",
    quest: "Quest: Pattern Recall",
    questBg: "#E8F8EE",
  },
  {
    id: "attention",
    num: "02",
    icon: "🎯",
    iconBg: "#FED7AA",
    cardBg: "#FFF9F3",
    cornerBg: "#FDBA74",
    tag: "FOCUS",
    title: "Attention",
    description: "Sustaining focus and responding to relevant signals without getting sidetracked.",
    quest: "Quest: Star Seeker",
    questBg: "#FFEDD5",
  },
  {
    id: "reasoning",
    num: "03",
    icon: "🔍",
    iconBg: "#BAE6FD",
    cardBg: "#F2F8FF",
    cornerBg: "#7DD3FC",
    tag: "LOGIC",
    title: "Reasoning",
    description: "Recognizing patterns, logical relationships, and discovering hidden connections.",
    quest: "Quest: Logic Mazes",
    questBg: "#E0F2FE",
  },
  {
    id: "processing",
    num: "04",
    icon: "⚡",
    iconBg: "#FECDD3",
    cardBg: "#FFF3F5",
    cornerBg: "#FDA4AF",
    tag: "AGILITY",
    title: "Processing",
    description: "Responding to information with speed, clarity, and adaptive precision.",
    quest: "Quest: Sound & Signal",
    questBg: "#FFE4E6",
  },
  {
    id: "problem-solving",
    num: "05",
    icon: "💡",
    iconBg: "#FEF08A",
    cardBg: "#FEFCF0",
    cornerBg: "#FDE047",
    tag: "STRATEGY",
    title: "Problem Solving",
    description: "Planning, testing possibilities, and adapting when a playful challenge shifts.",
    quest: "Quest: Bridge Builder",
    questBg: "#FEF3C7",
  },
  {
    id: "language",
    num: "06",
    icon: "📖",
    iconBg: "#E9D5FF",
    cardBg: "#FAF6FF",
    cornerBg: "#D8B4FE",
    tag: "VERBAL",
    title: "Language & Verbal Skills",
    description: "Expressing thoughts, interpreting meaning, and structuring verbal ideas.",
    quest: "Quest: Fable Tracks",
    questBg: "#EDE9FE",
  },
  {
    id: "visual-spatial",
    num: "07",
    icon: "📐",
    iconBg: "#A7F3D0",
    cardBg: "#F2FDF9",
    cornerBg: "#6EE7B7",
    tag: "SPATIAL",
    title: "Visual-Spatial Skills",
    description: "Visualizing transformations, space relationships, and geometric forms.",
    quest: "Quest: Astro Tangrams",
    questBg: "#CCFBF1",
  },
  {
    id: "executive-functions",
    num: "08",
    icon: "🕹️",
    iconBg: "#FFD0C7",
    cardBg: "#FFF5F2",
    cornerBg: "#FFB3A6",
    tag: "CONTROL",
    title: "Executive Functions",
    description: "Self-regulation, cognitive flexibility, and goal-directed decision making.",
    quest: "Quest: Chameleon Shift",
    questBg: "#FFEBE6",
  },
];

export function DimensionsSection() {
  return (
    <section className="w-full bg-[#FBFCFF] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1216px] flex flex-col gap-8">
        {/* ================= Header ================= */}
        <div className="flex flex-col items-start">
          <span
            className="inline-flex items-center gap-2 max-w-full min-h-[33px] px-3.5 py-2 rounded-[10px] border-2 bg-[#0284C7] text-white -rotate-1 shadow-[2px_3px_0_#0A1D3D]"
            style={{
              borderColor: INK,
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "10px",
              lineHeight: "14px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
                <svg
                  width="16"
                  height="5"
                  viewBox="0 0 16 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-270 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M0 4.70312V0H15.5312V4.70312H0V4.70312M1.53125 1.25781H1.09375V3.44531H1.53125V1.97559L2.39941 3.44531H2.84375V1.25781H2.40625V2.73438L1.53125 1.25781V1.25781M5.03125 1.25781H3.28125V3.44531H5.03125V1.25781V1.25781M3.71875 3.00781V1.69531H4.59375V3.00781H3.71875V3.00781M7.65625 1.25781H5.90625V3.44531H7.65625V2.13281H6.78125V2.57031H7.21875V3.00781H6.34375V1.69531H7.65625V1.25781V1.25781M8.53125 1.25781H8.09375V3.44531H9.625V3.00781H8.53125V1.25781V1.25781M9.40625 1.25781H8.96875V2.57031H10.0625V3.44531H10.5V1.25781H10.0625V2.13281H9.40625V1.25781V1.25781M11.375 2.13281V1.69531H12.0312V2.13281H11.375V2.13281M12.4688 1.25781H10.9375V3.44531H11.375V2.57031H12.4688V1.25781V1.25781M13.3438 1.25781H12.9062V3.44531H13.3438V2.46094H14V3.44531H14.4375V1.25781H14V2.02344H13.3438V1.25781V1.25781"
                    fill="#FFFFFF"
                  />
                </svg>
            <span>Developmental Horizons</span>
          </span>

          <h2
            className="mt-3 max-w-none text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.08]"
            style={{ fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.04em", color: INK }}
          >
            What We Explore Across Every Quest?
          </h2>

          <p
            className="mt-3 max-w-[700px] text-[15px] sm:text-[16px] leading-7"
            style={{ fontFamily: JAKARTA, fontWeight: 500, color: "#1E2A4A" }}
          >
            Eight foundational cognitive dimensions observed through joyful, purpose-built
            interactive play.
          </p>
        </div>

        {/* ================= Scope notice ================= */}
        <div
          className="w-full flex items-center gap-4 sm:gap-5 rounded-[20px] sm:rounded-[24px] border-2 border-dashed bg-[#FFF3C0] px-4 py-5 sm:px-7 sm:py-7 shadow-[3px_3px_0_#0A1D3D]"
          style={{ borderColor: INK }}
        >
          <span
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-[14px] bg-[#0A1D3D] flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg width="26" height="24" viewBox="0 0 24 22" fill="none">
              <path d="M12 2 1.5 20.5h21L12 2Z" fill="#FFC727" stroke="#FFC727" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 8.5v5M12 16.8h.01" stroke="#0A1D3D" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>

          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className="inline-flex items-center h-[26px] px-2.5 rounded-md border-[1.5px] bg-[#FFC727] uppercase"
                style={{
                  borderColor: INK,
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "10px",
                  letterSpacing: "0.03em",
                  color: INK,
                }}
              >
                Scope &amp; Ethical Guardrails
              </span>
              <span
                style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "10px", color: "#C2410C" }}
              >
                ★ Play First
              </span>
            </div>

            <p
              className="text-[13px] sm:text-[14px] xl:text-[15px] leading-[22px] sm:leading-6"
              style={{ fontFamily: INTER, fontWeight: 500, color: "#1B204A" }}
            >
              <span className="underline underline-offset-2 decoration-[#92400E]">
                Note on Scope:
              </span>{" "}
              These eight dimensions are development-related thinking areas designed to guide
              encouragement at home and in school. They are not a measure of overall
              intelligence, not an IQ score, and strictly not a clinical or neurological
              diagnosis.
            </p>
          </div>
        </div>

        {/* ================= 8 cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 sm:gap-5 xl:gap-6 w-full">
          {DIMENSIONS.map((d) => (
            <article
              key={d.id}
              className="group relative flex flex-col justify-between rounded-[24px] border-[2px] p-5 sm:p-6 min-h-[310px] overflow-hidden shadow-[4px_5px_0px_0px_#0A1D3D] hover:-translate-y-1.5 hover:shadow-[6px_8px_0px_0px_#0A1D3D] transition-all duration-200 select-none"
              style={{
                backgroundColor: d.cardBg,
                borderColor: INK,
                fontFamily: JAKARTA,
              }}
            >
              {/* Corner Number Tab (01, 02, ..., 08) */}
              <div
                className="absolute top-0 right-0 w-[42px] h-[40px] rounded-tr-[22px] rounded-bl-[24px] border-l-[2px] border-b-[2px] border-[#0A1D3D] flex items-center justify-center font-[800] text-[12px] text-[#0A1D3D] z-10 select-none"
                style={{ backgroundColor: d.cornerBg }}
              >
                {d.num}
              </div>

              {/* Top Section: Icon & Category Tag */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between w-full pr-10">
                  <div
                    className="w-[46px] h-[46px] rounded-[14px] border-[2px] border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center text-[22px] shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: d.iconBg }}
                    aria-hidden="true"
                  >
                    <span>{d.icon}</span>
                  </div>

                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full border-[1.5px] border-[#0A1D3D] bg-white text-[9.5px] font-[800] tracking-[0.5px] uppercase text-[#0A1D3D] shadow-[1.5px_1.5px_0px_0px_#0A1D3D]"
                  >
                    {d.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    className="mt-1 text-[19px] sm:text-[20px] font-[800] text-[#0A1D3D] leading-snug tracking-[-0.4px]"
                  >
                    {d.title}
                  </h3>
                  <p
                    className="mt-2 text-[13px] sm:text-[13.5px] font-[500] text-[#526176] leading-[155%]"
                    style={{ fontFamily: INTER }}
                  >
                    {d.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Separator & Quest Pill */}
              <div className="mt-auto pt-5 w-full">
                <div
                  aria-hidden="true"
                  className="mb-3.5 w-full border-t-[1.5px] border-dashed border-[#0A1D3D]/30"
                />
                <div
                  className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-[12px] border-[2px] border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_0px_#0A1D3D] transition-all cursor-default select-none max-w-full"
                  style={{ backgroundColor: d.questBg }}
                >
                  <span className="text-xs">🎮</span>
                  <span className="font-[800] text-[11px] text-[#0A1D3D] tracking-tight truncate">
                    {d.quest}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
