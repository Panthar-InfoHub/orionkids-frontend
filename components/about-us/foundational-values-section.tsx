"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

const NAVY = "#1B204A";

interface Value {
  no: string;
  title: string;
  text: string;
  tag: string;
  cardBg: string;
  badgeBg: string;
  badgeText: string;
}

const VALUES: Value[] = [
  {
    no: "01",
    title: "Every child is different.",
    text: "Developmental rhythms vary widely. We celebrate distinct thinking styles rather than forcing rigid conformity.",
    tag: "VAL_01 • DIVERSITY",
    cardBg: "#FDFBF7",
    badgeBg: "#FFCA28",
    badgeText: NAVY,
  },
  {
    no: "02",
    title: "Progress over perfection.",
    text: "We value persistence, curiosity, and individual step-by-step strides far more than flawless one-off scores.",
    tag: "VAL_02 • GROWTH",
    cardBg: "#F6F8FF",
    badgeBg: "#0EA5E9",
    badgeText: "#FFFFFF",
  },
  {
    no: "03",
    title: "Honesty about what we measure.",
    text: "We are transparent about our scope. We never exaggerate findings or label exploratory play as clinical diagnosis.",
    tag: "VAL_03 • INTEGRITY",
    cardBg: "#FDFBF7",
    badgeBg: "#FF6B4A",
    badgeText: "#FFFFFF",
  },
  {
    no: "04",
    title: "Children first.",
    text: "The child’s emotional safety, privacy, and joyful experience take precedence over every other consideration.",
    tag: "VAL_04 • ETHICS",
    cardBg: "#E6F8F1",
    badgeBg: "#10B981",
    badgeText: "#FFFFFF",
  },
  {
    no: "05",
    title: "Adults are partners.",
    text: "Technology cannot replace human affection. We equip parents and educators with insights to deepen connection.",
    tag: "VAL_05 • PARTNERSHIP",
    cardBg: "#FDFBF7",
    badgeBg: "#FFCA28",
    badgeText: NAVY,
  },
];

export function FoundationalValuesSection() {
  return (
    <section className="w-full bg-white border-b  border-b-[#1B204A]/40 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[88px]">
        {/* ================= Header ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <span
              className="inline-flex items-center h-7 px-3 rounded-lg border-[2px] border-[#1B204A] bg-[#FFE9E4] text-[#FF6B4A] uppercase select-none"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "16px",
                letterSpacing: "-0.2px",
              }}
            >
              Core Principles
            </span>

            <h2
              className="mt-3 text-[#1B204A] text-[30px] sm:text-[38px] lg:text-[42px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                lineHeight: "1.15",
                letterSpacing: "-1px",
              }}
            >
              Our Five Foundational Values
            </h2>
          </div>

          <div className="lg:w-[448px] shrink-0">
            <p
              className="max-w-[432px] text-[#475467]"
              style={{
                fontFamily: INTER,
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "24px",
              }}
            >
              These shared commitments guide how we build our games, phrase our
              reports, and collaborate with parents and schools.
            </p>
          </div>
        </div>

        {/* ================= Cards ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {VALUES.map((v) => (
            <article
              key={v.no}
              className="flex flex-col rounded-[20px]  p-6 shadow-[3px_4px_0_#1B204A] transition-transform hover:-translate-y-1 duration-200"
              style={{ backgroundColor: v.cardBg }}
            >
              <span
                className="w-10 h-10 rounded-[10px] border-2 border-[#1B204A] shadow-[2px_2px_0_#1B204A] flex items-center justify-center shrink-0 select-none"
                style={{
                  backgroundColor: v.badgeBg,
                  color: v.badgeText,
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "13px",
                  lineHeight: "16px",
                }}
              >
                {v.no}
              </span>

              <h3
                className="mt-4 text-[#1B204A]"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 700,
                  fontSize: "17px",
                  lineHeight: "23px",
                  letterSpacing: "-0.2px",
                }}
              >
                {v.title}
              </h3>

              <p
                className="mt-3 text-[#475467]"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "19.8px",
                }}
              >
                {v.text}
              </p>

              <div className="mt-auto pt-5">
                <div
                  className="pt-3 border-t border-[#1B204A]/10 text-[#64748B] uppercase select-none"
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "10px",
                    lineHeight: "16px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {v.tag}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
