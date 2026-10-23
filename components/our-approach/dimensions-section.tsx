"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const INK = "#0A1D3D";

interface DimensionCard {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  quest: string;
  questBorder: string;
  questBg: string;
}

const DIMENSIONS: DimensionCard[] = [
  {
    id: "memory",
    icon: "🧩",
    iconBg: "#E1F5DE",
    title: "Memory",
    description: "remembering, retaining and working with information.",
    quest: "Quest: Pattern Recall",
    questBorder: "#0F172A",
    questBg: "#EEF2FF",
  },
  {
    id: "attention",
    icon: "🎯",
    iconBg: "#FFEBD9",
    title: "Attention",
    description: "sustaining focus and responding to relevant information.",
    quest: "Quest: Star Seeker",
    questBorder: "#0F172A",
    questBg: "#FFF7DB",
  },
  {
    id: "reasoning",
    icon: "🔍",
    iconBg: "#E3EEFF",
    title: "Reasoning",
    description: "recognizing patterns, relationships and logical connections.",
    quest: "Quest: Logic Mazes",
    questBorder: "#0F172A",
    questBg: "#E4F8FA",
  },
  {
    id: "processing",
    icon: "⚡",
    iconBg: "#FFE6E8",
    title: "Processing",
    description: "responding to information efficiently and accurately.",
    quest: "Quest: Sound & Signal",
    questBorder: "#0F172A",
    questBg: "#FFEDEE",
  },
  {
    id: "problem-solving",
    icon: "💡",
    iconBg: "#DFF7E8",
    title: "Problem Solving",
    description: "planning, adapting and finding possible solutions.",
    quest: "Quest: Bridge Builder",
    questBorder: "#0F172A",
    questBg: "#E3F8EF",
  },
  {
    id: "language",
    icon: "📖",
    iconBg: "#EEE9FF",
    title: "Language and Verbal Skills",
    description: "working with words, meaning and verbal information.",
    quest: "Quest: Fable Tracks",
    questBorder: "#0F172A",
    questBg: "#F1EAFF",
  },
  {
    id: "visual-spatial",
    icon: "📐",
    iconBg: "#D9F0EE",
    title: "Visual-Spatial Skills",
    description: "understanding visual relationships, patterns and space.",
    quest: "Quest: Astro Tangrams",
    questBorder: "#0F172A",
    questBg: "#E4F8FA",
  },
  {
    id: "executive-functions",
    icon: "🕹️",
    iconBg: "#FFE3DD",
    title: "Executive Functions",
    description: "planning, flexibility, inhibition and goal-directed thinking.",
    quest: "Quest: Chameleon Shift",
    questBorder: "#0F172A",
    questBg: "#FFEBDD",
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
            className="mt-3 max-w-[720px] text-[30px] sm:text-[38px] lg:text-[44px] leading-[1.08]"
            style={{ fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.04em", color: INK }}
          >
            What We Explore Across Every Quest
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-y-6 xl:gap-y-[68px] xl:[grid-template-rows:minmax(269px,auto)_minmax(320px,auto)]">
          {DIMENSIONS.map((d) => (
            <article
              key={d.id}
              className="relative flex flex-col rounded-3xl border-2 bg-white p-5 xl:p-6 shadow-[3px_4px_0_#0A1D3D] transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-1"
              style={{ borderColor: INK }}
            >
              <span
                className="w-14 h-14 rounded-[14px] border-[2px] flex items-center justify-center text-[24px] leading-none shrink-0"
                style={{ backgroundColor: d.iconBg, borderColor: "#0F172A" }}
                aria-hidden="true"
              >
                {d.icon}
              </span>

              <h3
                className="mt-3.5 text-[18px] leading-7"
                style={{ fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.01em", color: INK }}
              >
                {d.title}
              </h3>

              <p
                className="mt-1 text-[13px] leading-6"
                style={{ fontFamily: INTER, fontWeight: 400, color: "#526176" }}
              >
                {d.description}
              </p>

              <div className="mt-auto pt-6">
                <div
                  aria-hidden="true"
                  style={{
                    height: "1.5px",
                    backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 4px, transparent 4px 7px)`,
                  }}
                />
                <span
                  className="mt-3 inline-flex items-center h-[31px] px-3 rounded-lg border-2 bg-white max-w-full"
                  style={{
                    borderColor: d.questBorder,
                    backgroundColor: d.questBg,
                    fontFamily: JAKARTA,
                    fontWeight: 700,
                    fontSize: "10.5px",
                    color: INK,
                  }}
                >
                  {d.quest}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
