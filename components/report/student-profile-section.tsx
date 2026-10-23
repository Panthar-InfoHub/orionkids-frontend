"use client";

import React from "react";
import { NormativeCurveChart } from "./normative-curve-chart";

const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

/* ------------------------------ Icons ------------------------------ */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const CheckCircleIcon = () => (
  <svg {...iconProps} strokeWidth="2.4" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="9.5" />
    <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
  </svg>
);

const StarCircleIcon = () => (
  <svg {...iconProps} strokeWidth="2" className="w-4 h-4 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <path
      d="M12 7l1.4 3.1 3.4.4-2.5 2.3.7 3.3L12 14.3 9 16.1l.7-3.3-2.5-2.3 3.4-.4z"
      fill="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const SparkPinIcon = () => (
  <svg {...iconProps} strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6.8a3.2 3.2 0 0 1 3.2 3.2c0 2.3-3.2 5.2-3.2 5.2S8.8 12.3 8.8 10A3.2 3.2 0 0 1 12 6.8z" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
  </svg>
);

const InfoIcon = () => (
  <svg {...iconProps} strokeWidth="2" className="w-4 h-4 shrink-0 text-[#0284C7] mt-px">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 11v5" />
    <circle cx="12" cy="7.8" r="0.6" fill="currentColor" />
  </svg>
);

/* ----------------------------- Component ---------------------------- */
export function StudentProfileSection() {
  return (
    <section
      className="relative w-full max-w-[1214px] min-h-[595px] mx-auto bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_8px_30px_rgba(10,29,61,0.04)] p-6 lg:p-10 flex flex-col justify-between gap-8 select-none box-border"
    >
      {/* ================= TOP: avatar + student info ================= */}
      <div className="w-full max-w-[1134px] min-h-[143px] pb-6 border-b border-[#F1F5F9] flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className="relative shrink-0 sm:pt-[15px]">
          <div
            className="w-[80px] h-[80px] rounded-[20px] p-[2.5px] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #FBBF24 0%, #FB7185 50%, #A855F7 100%)",
            }}
          >
            <div className="w-full h-full rounded-[17.5px] bg-white flex items-center justify-center text-[34px] leading-none">
              👧🏽
            </div>
          </div>
          <span className="absolute -bottom-[5px] -right-[3px] w-[22px] h-[22px] rounded-full bg-[#10B981] text-white border-2 border-white flex items-center justify-center">
            <CheckCircleIcon />
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1
              className="text-[#0F172A]"
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: "30px",
                lineHeight: "36px",
                letterSpacing: "-0.75px",
              }}
            >
              Ananya Verma
            </h1>

            <span
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 min-w-[160.78px] h-[22px] border border-[#BAE0FD] bg-[#F0F7FF] text-[#0369A1]"
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: "11px",
                lineHeight: "14px",
              }}
            >
              Class 1 • Grade Explorer
            </span>
          </div>

          <p
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[#64748B]"
            style={{ fontFamily: INTER, fontWeight: 400, fontSize: "14px", lineHeight: "20px" }}
          >
            <span>
              Age: <strong className="font-semibold text-[#334155]">6 Years</strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" aria-hidden="true" />
            <span>
              Session: <strong className="font-semibold text-[#334155]">October 2026</strong>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" aria-hidden="true" />
            <span>
              Cohort: <strong className="font-semibold text-[#334155]">Class 1 Benchmark Group</strong>
            </span>
          </p>

          <div
            className="mt-[30px] flex items-center gap-1.5 text-[#D97706]"
            style={{ fontFamily: INTER, fontWeight: 500, fontSize: "12px", lineHeight: "16px" }}
          >
            <StarCircleIcon />
            <span>Where Every Kid Is a Star — OrionKids Assessment Lab</span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM: 12-col grid ================= */}
      <div className="w-full max-w-[1134px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ---------- LEFT (5 cols) ---------- */}
        <div className="col-span-12 lg:col-span-5 w-full lg:max-w-[453.83px] flex flex-col items-start">
          {/* Pill */}
          <div
            className="inline-flex items-center gap-1.5 px-3 h-[26px] rounded-full whitespace-nowrap border border-[#BAE6FD] bg-[#F0F9FF] text-[#075985]"
            style={{ fontFamily: INTER, fontWeight: 600, fontSize: "12px", lineHeight: "16px" }}
          >
            <SparkPinIcon />
            <span>Overall Spark &amp; Development Profile</span>
          </div>

          {/* 57th + Overall Percentile */}
          <div className="mt-0.5 flex items-baseline gap-2.5">
            <span
              className="text-[#0F172A] whitespace-nowrap"
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "60px",
                lineHeight: "60px",
                letterSpacing: "-1.5px",
              }}
            >
              57
              <span style={{ fontSize: "28px", letterSpacing: 0, color: "#0369A1" }}>th</span>
            </span>

            <div className="flex flex-col">
              <span
                className="text-[#1E293B]"
                style={{ fontFamily: INTER, fontWeight: 600, fontSize: "14px", lineHeight: "20px" }}
              >
                Overall Percentile
              </span>
              <span
                className="mt-1 text-[#64748B]"
                style={{ fontFamily: INTER, fontWeight: 400, fontSize: "12px", lineHeight: "16px" }}
              >
                Benchmark across Class 1 peers
              </span>
            </div>
          </div>

          {/* Band pill */}
          <span
            className="mt-[9px] inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ECF7FE] text-[#075985] max-w-full"
            style={{ fontFamily: INTER, fontWeight: 600, fontSize: "12px", lineHeight: "16px" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#0284C7] shrink-0" />
            <span>Steady &amp; Confident Growth Band (25th – 75th percentile)</span>
          </span>

          {/* Narrative */}
          <p
            className="mt-[15px] text-[#475569]"
            style={{ fontFamily: INTER, fontWeight: 400, fontSize: "14px", lineHeight: "22.75px" }}
          >
            Ananya played six short interactive games measuring attention, memory, spatial reasoning, and rule-switching. She demonstrated exceptional focus and recall, with emerging strengths in pattern problem solving that will thrive through playful daily practice.
          </p>

          {/* Family note */}
          <div className="mt-[17px] w-full max-w-[453.83px] min-h-[78.9px] p-3.5 flex items-start gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
            <InfoIcon />
            <p
              className="text-[#475569]"
              style={{ fontFamily: INTER, fontWeight: 400, fontSize: "12px", lineHeight: "17px" }}
            >
              <strong className="font-semibold">Family Note:</strong> Percentiles reflect a single joyful play session to celebrate natural talents and guide encouragement—never a clinical diagnosis or fixed label.
            </p>
          </div>
        </div>

        {/* ---------- RIGHT (7 cols) ---------- */}
        <div className="col-span-12 lg:col-span-7 w-full lg:max-w-[648.17px] min-h-[324.58px] p-5 sm:p-6 flex flex-col justify-between gap-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFCB2]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span
              className="flex items-center gap-2 uppercase text-[#334155]"
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.6px",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#0369A1] shrink-0" />
              Normative Distribution Curve (Class 1)
            </span>

            <span
              className="text-[#64748B]"
              style={{ fontFamily: MONO, fontWeight: 400, fontSize: "12px", lineHeight: "16px" }}
            >
              Sample: Class 1 Active Cohort
            </span>
          </div>

          {/* Chart */}
          <NormativeCurveChart />

          {/* Footer */}
          <div
            className="pt-2.5 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-x-3 gap-y-1"
            style={{ fontFamily: MONO, fontSize: "11px", lineHeight: "14px" }}
          >
            <span className="text-[#64748B]">
              Standard Distribution Model • OrionKids Engine v4.2
            </span>
            <span className="text-[#334155] font-bold">
              Typical Range: 25th – 75th percentile
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
