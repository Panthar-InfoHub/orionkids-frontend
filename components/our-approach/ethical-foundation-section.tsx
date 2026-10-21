"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const GOLD = "#FFC72C";
const SKY = "#38BDF8";
const NAVY = "#0A1D3D";

/* ---- Emojis: swap any of these for your own ---- */
const EMOJI = {
  pill: "🛡️",
  boundary: "🛡️",
  nep: "🌱",
  ncf: "📖",
  home: "🏠",
  coppa: "🌱",
  ads: "🚫",
  records: "🔒",
};

const FRAMEWORK = [
  {
    icon: EMOJI.nep,
    title: "NEP 2020:",
    text: "Regular, formative, competency-based assessment that looks beyond marks to the whole child.",
  },
  {
    icon: EMOJI.ncf,
    title: "NCF for the Foundational Stage (2022):",
    text: "Cognitive development is one part of holistic early learning.",
  },
  {
    icon: EMOJI.home,
    title: "Home-language and self-paced learning:",
    text: "Language field, picture-based option for early readers, and no visible time pressure.",
  },
];

const TRUST = [
  { icon: EMOJI.coppa, title: "COPPA & Kid-Safe Aligned", sub: "Child safety audited", color: GOLD },
  { icon: EMOJI.ads, title: "No Commercial Ads", sub: "Zero advertiser tracking", color: "#FF6B6B" },
  { icon: EMOJI.records, title: "Encrypted Records", sub: "Private to parents & schools", color: SKY },
];

export function EthicalFoundationSection() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 overflow-hidden">
      {/* ================= Card (1216 wide, radius 24) ================= */}
      <div className="relative mx-auto w-full max-w-[1216px] overflow-hidden rounded-[24px] bg-[#0C2240] px-5 pt-12 pb-12 sm:px-10 lg:px-16 xl:px-40 xl:pt-[63px] xl:pb-16">
        {/* Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#38BDF8] opacity-[0.16] blur-[90px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-28 w-[340px] h-[340px] rounded-full bg-[#FFC72C] opacity-[0.12] blur-[90px] pointer-events-none"
        />

        <div className="relative z-10 mx-auto w-full max-w-[896px] flex flex-col">
          {/* Pill */}
          <span
            className="self-start inline-flex items-center gap-1.5 max-w-full min-h-[34px] px-3.5 py-2 rounded-lg bg-[#FFC72C] -rotate-1 shadow-[0_0_14px_rgba(255,255,255,0.18)] select-none"
            style={{
              color: NAVY,
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "10.5px",
              lineHeight: "14px",
              letterSpacing: "0.4px",
              textTransform: "uppercase",
            }}
          >
            <span className="text-[12px] leading-none" aria-hidden="true">
              {EMOJI.pill}
            </span>
            <span>Ethical &amp; Evidence-Conscious Foundation</span>
          </span>

          {/* Heading */}
          <h2
            className="mt-[29px] text-white text-[30px] sm:text-[40px] xl:text-[44px] leading-[1.15]"
            style={{ fontFamily: JAKARTA, fontWeight: 800, letterSpacing: "-0.03em" }}
          >
            Built to be used{" "}
            <span
              className="underline decoration-[#FF6B4A] decoration-[3px] sm:decoration-4 underline-offset-[6px]"
              style={{ color: GOLD }}
            >
              responsibly.
            </span>
          </h2>

          {/* Intro */}
          <p
            className="mt-5 max-w-[820px] text-[15px] sm:text-[16px] leading-[26px] sm:leading-7 text-white/95"
            style={{ fontFamily: JAKARTA, fontWeight: 500 }}
          >
            We hold ourselves to high ethical standards in children&rsquo;s digital experiences.
            This low-stakes, self-paced learning experience supports learning and growth while
            respecting children&rsquo;s well-being and data privacy.
          </p>

          {/* Boundary box */}
          <div
            className="mt-7 w-full flex items-start gap-4 rounded-[20px] sm:rounded-3xl border-2 bg-[#1B2D4D] p-5 sm:p-8"
            style={{ borderColor: GOLD }}
          >
            <span
              className="w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-xl bg-[#FFC72C] flex items-center justify-center text-[22px] leading-none shrink-0 select-none"
              aria-hidden="true"
            >
              {EMOJI.boundary}
            </span>

            <div className="flex flex-col items-start gap-2 min-w-0">
              <span
                className="inline-flex items-center min-h-[26px] px-2.5 py-1 rounded-md border-[1.5px] bg-[#0C2240] text-white uppercase"
                style={{
                  borderColor: GOLD,
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "9.5px",
                  lineHeight: "13px",
                  letterSpacing: "0.04em",
                }}
              >
                Mandatory Clinical &amp; Diagnostic Boundary
              </span>
              <p
                className="text-[14.5px] sm:text-[16px] leading-[24px] sm:leading-7 text-white italic"
                style={{ fontFamily: JAKARTA, fontWeight: 600 }}
              >
                &ldquo;OrionKids is a screening and learning-support tool. It does not diagnose,
                label or rank children, and it does not replace teacher observation or
                professional assessment.&rdquo;
              </p>
            </div>
          </div>

          {/* Framework */}
          <h3
            className="mt-10 text-white uppercase"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.05em",
            }}
          >
            Aligned with India&apos;s Education Framework
          </h3>

          <div className="mt-[18px] grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-0 xl:w-[921px] xl:max-w-none">
            {FRAMEWORK.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5 lg:pr-4 xl:pr-0">
                <span className="text-[20px] leading-6 shrink-0 w-6 select-none" aria-hidden="true">
                  {f.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[13px] leading-5"
                    style={{ fontFamily: JAKARTA, fontWeight: 700, color: GOLD }}
                  >
                    {f.title}
                  </p>
                  <p
                    className="mt-[5px] text-[13px] leading-5 text-white/90"
                    style={{ fontFamily: JAKARTA, fontWeight: 500 }}
                  >
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mt-[30px] h-0.5 w-full bg-white/25" aria-hidden="true" />

          {/* Trust cards */}
          <div className="mt-[22px] grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {TRUST.map((t) => (
              <div
                key={t.title}
                className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#1B3152] px-5 py-3.5 min-h-[69px]"
              >
                <span className="text-[24px] leading-none shrink-0 select-none" aria-hidden="true">
                  {t.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[13px] leading-[18px]"
                    style={{ fontFamily: JAKARTA, fontWeight: 700, color: t.color }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="mt-0.5 text-[11px] leading-4 text-white/90"
                    style={{ fontFamily: INTER, fontWeight: 400 }}
                  >
                    {t.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
