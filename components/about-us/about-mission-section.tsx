"use client";

import React from "react";
import Image from "next/image";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const NAVY = "#1B204A";

interface Pillar {
  tag: string;
  emoji: string;
  emojiLabel: string;
  title: string;
  text: string;
  footer: string;
  cardBg: string;
  titleColor: string;
  textColor: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  pillShadow: string;
  dash: string;
  footerText: string;
  iconBg: string;
  iconBorder: string;
  icon: "star" | "bang" | "check";
}

const PILLARS: Pillar[] = [
  {
    tag: "Our Mission",
    emoji: "🎯",
    emojiLabel: "Target",
    title: "Making children\u2019s cognitive progress easier to understand.",
    text: "To demystify child cognitive development by transforming rich, playful observations into accessible, practical knowledge that empowers families and teachers to guide every child with confidence.",
    footer: "Clarity for every family and classroom",
    cardBg: "#FFFFFF",
    titleColor: NAVY,
    textColor: "#475467",
    pillBg: "#FFCA28",
    pillText: NAVY,
    pillBorder: NAVY,
    pillShadow: `3px 3px 0 ${NAVY}`,
    dash: "rgba(27,32,74,0.2)",
    footerText: NAVY,
    iconBg: "#FFF0BF",
    iconBorder: NAVY,
    icon: "star",
  },
  {
    tag: "Our Vision",
    emoji: "🔭",
    emojiLabel: "Telescope",
    title: "A world where every learner is understood for how their brain unfolds.",
    text: "We envision educational communities where children are never defined by a single label, but celebrated as unique constellations of focus, curiosity, memory, and creative problem-solving.",
    footer: "Moving past one-size-fits-all education",
    cardBg: NAVY,
    titleColor: "#FFFFFF",
    textColor: "rgba(255,255,255,0.8)",
    pillBg: "#FF6B4A",
    pillText: "#FFFFFF",
    pillBorder: "#FFFFFF",
    pillShadow: "none",
    dash: "rgba(255,255,255,0.22)",
    footerText: "rgba(255,255,255,0.92)",
    iconBg: "#31365C",
    iconBorder: "rgba(255,255,255,0.3)",
    icon: "bang",
  },
  {
    tag: "Our Promise",
    emoji: "🤝",
    emojiLabel: "Handshake",
    title: "Honest, evidence-conscious, and joyful at every turn.",
    text: "We promise never to make clinical claims we cannot back, never to sell child data, never to induce parental panic, and always to celebrate what a child can do while offering constructive, gentle ideas for what comes next.",
    footer: "Responsible, private, and kid-safe always",
    cardBg: "#E6F8F1",
    titleColor: NAVY,
    textColor: "#475467",
    pillBg: "#10B981",
    pillText: "#FFFFFF",
    pillBorder: NAVY,
    pillShadow: `3px 3px 0 ${NAVY}`,
    dash: "rgba(27,32,74,0.2)",
    footerText: NAVY,
    iconBg: "#BBEBDB",
    iconBorder: NAVY,
    icon: "check",
  },
];

function FooterIcon({ kind }: { kind: Pillar["icon"] }) {
  if (kind === "star") {
    return (
      <span className="text-[14px] leading-none" style={{ color: NAVY }} aria-hidden="true">
        ★
      </span>
    );
  }
  if (kind === "bang") {
    return (
      <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
        <rect x="6.5" y="2.5" width="3" height="7" rx="1.5" fill="#FFCA28" />
        <circle cx="8" cy="12.5" r="1.7" fill="#FFCA28" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-4 h-4"
      fill="none"
      stroke="#10B981"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8.5 6.8 11.8 12.5 4.8" />
    </svg>
  );
}

export function AboutMissionSection() {
  return (
    <section className="w-full bg-[#F7F5ED] border-b-2 border-[#1B204A] py-16 sm:py-20 lg:py-24 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px] relative">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="relative flex flex-col items-center text-center max-w-[760px] mx-auto mb-14 sm:mb-16">
          
          {/* Pill Tag */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-[#1B204A] bg-[#FFCA28] text-[#1B204A] select-none shadow-[2px_2px_0px_#1B204A] mb-4"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            OUR NORTH STAR
          </div>

          {/* Heading */}
          <h2
            className="text-[34px] sm:text-[44px] lg:text-[48px] font-[800] text-[#1B204A] tracking-[-1px] leading-[1.15]"
            style={{ fontFamily: JAKARTA }}
          >
            Mission, Vision &amp; Promise
          </h2>

          {/* Subtitle */}
          <p
            className="mt-3.5 text-[15px] sm:text-[17px] leading-[26px] sm:leading-[28px] font-normal text-[#475467] max-w-[620px]"
            style={{ fontFamily: INTER }}
          >
            Three guiding commitments that anchor our daily product choices and educational roadmap.
          </p>

          {/* Floating Robot Image on the right of header */}
          <div
            className=" md:block absolute -right-12 lg:-right-24 -top-15 lg:-top-10 w-[140px] lg:w-[190px] pointer-events-none select-none z-10"
            style={{
              transform: "rotate(21.18deg)",
            }}
          >
            <Image
              src="/icons/photoroom.png"
              alt="OrionKids Cute Robot"
              width={259}
              height={194}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(27,32,74,0.15)"
            />
          </div>
        </div>

        {/* ================= THREE CARDS GRID ================= */}
        {/* 1 col (mobile) → 2 cols + centred 3rd card (tablet) → 3 cols (≥1280px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PILLARS.map((p, i) => (
            <article
              key={p.tag}
              className={[
                "relative w-full mx-auto flex flex-col rounded-[24px]",
                "max-w-[384px] sm:max-w-[440px] md:max-w-[384px]",
                "px-6 pt-8 pb-6 sm:px-8 sm:pt-9 sm:pb-8 min-[1440px]:px-10 min-[1440px]:pt-11 min-[1440px]:pb-10",
                "min-[1440px]:h-[554px]",
                "shadow-[3px_3px_0_#1B204A] sm:shadow-[4px_4px_0_#1B204A]",
                "transition-transform duration-200 motion-reduce:transition-none hover:-translate-y-1.5",
                i === PILLARS.length - 1 ? "md:col-span-2 xl:col-span-1" : "",
              ].join(" ")}
              style={{ backgroundColor: p.cardBg }}
            >
              {/* Pill + emoji */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center h-[26px] px-[13px] rounded-full uppercase select-none"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "12px",
                    lineHeight: "16px",
                    letterSpacing: "0.3px",
                    backgroundColor: p.pillBg,
                    color: p.pillText,
                    border: `2px solid ${p.pillBorder}`,
                    boxShadow: p.pillShadow,
                  }}
                >
                  {p.tag}
                </span>
                <span
                  className="text-[24px] sm:text-[28px] leading-none -mr-1 sm:-mr-2 select-none"
                  role="img"
                  aria-label={p.emojiLabel}
                >
                  {p.emoji}
                </span>
              </div>

              {/* Title */}
              <h3
                className="mt-6 sm:mt-8 text-[25px] sm:text-[28px] min-[1440px]:text-[32px] text-balance"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  lineHeight: "1.125",
                  letterSpacing: "-0.03em",
                  color: p.titleColor,
                }}
              >
                {p.title}
              </h3>

              {/* Body */}
              <p
                className="mt-4 sm:mt-6 text-[15px] min-[1440px]:text-[16px]"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  lineHeight: "1.65",
                  color: p.textColor,
                }}
              >
                {p.text}
              </p>

              {/* Divider + footer (pinned to the bottom) */}
              <div className="mt-auto pt-6">
                <div
                  aria-hidden="true"
                  style={{
                    height: "1px",
                    backgroundImage: `repeating-linear-gradient(90deg, ${p.dash} 0 6px, transparent 6px 10px)`,
                  }}
                />
                <div className="mt-[25px] flex items-center gap-3.5">
                  <span
                    className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: p.iconBg,
                      border: `1.5px solid ${p.iconBorder}`,
                    }}
                  >
                    <FooterIcon kind={p.icon} />
                  </span>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: p.footerText,
                    }}
                  >
                    {p.footer}
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
