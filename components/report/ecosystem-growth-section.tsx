"use client";

import React from "react";
import { EcosystemVennDiagram } from "./ecosystem-venn-diagram";

const INTER = "var(--font-inter), 'Inter', sans-serif";

/* ------------------------------ Icons ------------------------------ */
const HubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    className="w-3.5 h-3.5 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 9.8V6.3M13.9 10.9l3.4-1.2M13.1 13.9l2.1 2.9M10.9 13.9l-2.1 2.9M10.1 10.9 6.7 9.7" />
    <circle cx="12" cy="4.6" r="1.8" />
    <circle cx="19.2" cy="9.7" r="1.8" />
    <circle cx="16.4" cy="18.2" r="1.8" />
    <circle cx="7.6" cy="18.2" r="1.8" />
    <circle cx="4.8" cy="9.7" r="1.8" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="#0EA5E9"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[11px] h-[11px] mt-[3px] shrink-0"
    aria-hidden="true"
  >
    <path d="M2.5 8.8 6 12.3 13.5 3.5" />
  </svg>
);

/* ------------------------------ Data -------------------------------- */
const TEACHER_TIPS = [
  {
    title: "Reasoning Counters:",
    text: "Offer physical manipulative cubes and bead racks during early arithmetic. Tactile props build pattern comprehension.",
  },
  {
    title: "Visual Schedule:",
    text: "Position icon-based daily agenda strips near the whiteboard so transitions feel predictable and simple to sequence.",
  },
  {
    title: "Process Praise:",
    text: "Recognize Ananya’s persistence when solving intricate puzzles rather than solely praising instant right answers.",
  },
];

/* --------------------------- Component ------------------------------ */
export function EcosystemGrowthSection() {
  return (
    <section
      className="w-full bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(10,29,61,0.04)] p-6 sm:p-8 lg:p-10"
      style={{ fontFamily: INTER }}
    >
      {/* ================= Header ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-[660px]">
          <span
            className="inline-flex items-center gap-1.5 h-6 px-3 rounded-full border border-[#D9E1FE] bg-[#EEF2FF] text-[#4338CA]"
            style={{ fontWeight: 600, fontSize: "13px", lineHeight: "16px" }}
          >
            <HubIcon />
            Unified Ecosystem Model
          </span>

          <h2
            className="mt-2 text-[#0F172A] text-[26px] sm:text-[30px]"
            style={{ fontWeight: 600, lineHeight: "36px", letterSpacing: "-0.75px" }}
          >
            Everyone Plays a Part in Ananya’s Growth
          </h2>

          <p
            className="mt-1.5 text-[#475569]"
            style={{ fontWeight: 400, fontSize: "14px", lineHeight: "22.75px" }}
          >
            Child cognition does not develop in isolation. When home, school, and
            active outdoor community experiences align, flexible reasoning
            blossoms effortlessly.
          </p>
        </div>

        {/* Why Sport Matters */}
        <div className="w-full lg:w-[458px] shrink-0 flex items-start gap-3.5 rounded-2xl border border-[#E5EBFF] bg-[#F2F7FF] p-5">
          <div
            className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center text-[18px] leading-none shrink-0"
            aria-hidden="true"
          >
            ⚽
          </div>
          <div className="min-w-0">
            <h3
              className="text-[#1E1B4B]"
              style={{ fontWeight: 500, fontSize: "15px", lineHeight: "20px" }}
            >
              Why Sport &amp; Playground Action Matter
            </h3>
            <p
              className="mt-1 text-[#475569]"
              style={{ fontWeight: 400, fontSize: "12px", lineHeight: "19.5px" }}
            >
              Tracking a ball, evading a friend in tag, and balancing on beams
              stimulate the very same frontal-lobe networks that oversee mental
              flexibility and working memory!
            </p>
          </div>
        </div>
      </div>

      {/* ================= Diagram + cards ================= */}
      <div className="mt-[34px] pt-[17px] border-t border-[#F1F5F9] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Venn */}
        <div className="col-span-12 lg:col-span-5 w-full lg:max-w-[453.83px] rounded-2xl border border-[#E7ECF2] bg-[#F9FBFD]">
          <EcosystemVennDiagram />
        </div>

        {/* Stakeholder cards */}
        <div className="col-span-12 lg:col-span-7 w-full lg:max-w-[648.17px] flex flex-col gap-[17px]">
          {/* Teachers */}
          <div className="rounded-2xl border border-[#C6EAFD] bg-[#F5FBFF] p-5">
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-lg bg-[#0284C7] flex items-center justify-center text-[13px] leading-none shrink-0"
                aria-hidden="true"
              >
                🍎
              </span>
              <h4
                className="text-[#082F49]"
                style={{ fontWeight: 500, fontSize: "15px", lineHeight: "20px" }}
              >
                For Classroom Teachers &amp; Educators
              </h4>
            </div>

            <ul
              className="mt-2.5 pl-[3px] flex flex-col gap-2 text-[#334155]"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              {TEACHER_TIPS.map((tip) => (
                <li key={tip.title} className="flex items-start gap-0.5">
                  <span className="w-4 shrink-0 flex justify-start">
                    <CheckIcon />
                  </span>
                  <p className="min-w-0">
                    <strong className="font-semibold">{tip.title}</strong> {tip.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Family & Community */}
          <div className="rounded-2xl border border-[#FFDDE1] bg-[#FFF6F6] p-5">
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-lg bg-[#E11D48] flex items-center justify-center text-[13px] leading-none shrink-0"
                aria-hidden="true"
              >
                🏡
              </span>
              <h4
                className="text-[#4C0519]"
                style={{ fontWeight: 500, fontSize: "15px", lineHeight: "20px" }}
              >
                For Family &amp; Community Circle
              </h4>
            </div>

            <p
              className="mt-2.5 pl-[3px] text-[#334155]"
              style={{ fontWeight: 400, fontSize: "14px", lineHeight: "20px" }}
            >
              Embrace weekend library puppet hours, junior badminton rallies,
              origami workshops, and bedtime &ldquo;what happened first in the
              day&rdquo; reflections. These warm shared interactions continuously
              cultivate social flexibility and emotional safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
