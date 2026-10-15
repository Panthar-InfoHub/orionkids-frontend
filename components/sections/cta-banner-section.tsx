"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { QuestModal } from "@/components/ui/quest-modal";

/*
  Measured from the Figma screenshot (a 1440px frame shown at ~80%, so every value is screenshot px ÷ 0.8):
    section height ........ 334px         gutters ............ 88px
    pill .................. 260 × 30, top 48px, 13px text, sits ~81px right of centre
    heading ............... 48px / 112%, top at 105px
    subtitle .............. 18px / 160%, 36px below heading, wraps after "look"
    button ................ 304 × 54, YELLOW, label centred, right edge at 1296px
*/

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// Dotted background, measured pixel-by-pixel from the Figma screenshot (1156px wide = 1440px frame, scale 0.8028).
// It is a staggered lattice: dots every 96.35px, alternate rows shifted by half, first dot at (24.3, 80.7).
// Dot = 12px circle, solid #1B6EC5 on the #1763BC background.
const DOT = 12; // diameter, px
const DOT_PITCH = 96.35; // horizontal and vertical distance between neighbours, px
const DOT_X0 = 24.3; // first dot centre, px from the left
const DOT_Y0 = 80.7; // first dot centre, px from the top
const DOT_COLOR = "#1B6EC5";

const dotLayer = (cx: number, cy: number) =>
  `radial-gradient(circle at ${cx}px ${cy}px, ${DOT_COLOR} ${DOT / 2 - 0.5}px, transparent ${DOT / 2 + 0.5}px)`;

const DOT_PATTERN = {
  backgroundImage: [
    dotLayer(DOT_X0, DOT_Y0),
    dotLayer(DOT_X0 + DOT_PITCH / 2, DOT_Y0 + DOT_PITCH),
  ].join(","),
  backgroundSize: `${DOT_PITCH}px ${DOT_PITCH * 2}px`,
  backgroundRepeat: "repeat",
  backgroundPosition: "0 0",
} as const;

export function CtaBannerSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCtaClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#65DCAA", "#FFCE38", "#1763BC"],
    });
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="cta-banner-section"
        className="relative w-full bg-[#1763BC] text-white overflow-hidden select-none scroll-mt-16"
      >
        {/* Dotted background (full width, anchored top-left like the design) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={DOT_PATTERN} />

        {/* Floating stickers (kept inside a 1440px frame so they line up on wide screens) */}
        <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden" aria-hidden="true">
          <div className="relative mx-auto h-full w-full max-w-[1440px]">
            {/* 🪐 top-left */}
            <span className="absolute top-[56px] left-4 sm:top-[31px] sm:left-[34px] text-2xl sm:text-3xl opacity-80 -rotate-12">
              🪐
            </span>
            {/* 👾 top-right */}
            <span className="absolute top-[58px] right-4 sm:top-[50px] sm:right-[72px] text-xl sm:text-2xl opacity-75">
              👾
            </span>
            {/* 🛸 bottom-right */}
            <span className="absolute bottom-3 right-4 sm:bottom-6 sm:right-[52px] text-xl sm:text-2xl opacity-80 rotate-6">
              🛸
            </span>
          </div>
        </div>

        {/* Content frame */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-[88px] pt-[84px] sm:pt-[92px] lg:pt-[105px] pb-10 lg:pb-[30px]">

          {/* Top pill: centred on small screens, nudged right of centre on desktop like the design.
              (Remove `lg:ml-[76px]` to centre it exactly.) */}
          <div className="absolute top-6 lg:top-12 left-1/2 -translate-x-1/2 lg:ml-[76px] z-30">
            <div
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-[7px] sm:py-0 sm:h-8 bg-[#D8F3FF] text-[#0A1D3D] rounded-[16px] border-2 border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] -rotate-1 hover:rotate-0 transition-transform cursor-default whitespace-nowrap text-[11px] sm:text-[13px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span aria-hidden="true">🚀</span>
              <span>STAR MISSION ACTIVATED</span>
              <span aria-hidden="true">⭐</span>
            </div>
          </div>

          {/* Row */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10 text-left">

            {/* Left: heading + subtitle */}
            <div className="flex flex-col items-start w-full lg:flex-1 min-w-0 max-w-[760px]">
              <h2
                className="text-white text-left"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "clamp(30px, 4vw, 48px)",
                  lineHeight: "112%",
                  letterSpacing: "-0.0333em",
                }}
              >
                Let&apos;s Discover What Makes
                <br className="hidden sm:block" />{" "}
                Your Child Shine 🌟
              </h2>

              <p
                className="text-[#C9D6E6] text-left mt-4 sm:mt-6 lg:mt-9 max-w-[760px] text-base sm:text-lg"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  lineHeight: "160%",
                }}
              >
                See the games, explore the insights and talk through what thoughtful
                support could look like for your school or family.
              </p>
            </div>

            {/* Right: yellow CTA, inset 56px from the gutter on large desktops (matches the design) */}
            <div className="shrink-0 flex items-center w-full lg:w-auto min-[1400px]:mr-14">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-[304px] h-[54px] rounded-[16px] bg-[#FFD028] text-[#0A1D3D] text-sm shadow-[5px_5px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#0A1D3D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_#0A1D3D] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                style={{ fontFamily: JAKARTA, fontWeight: 800 }}
              >
                <span>Request a demo</span>
                <span className="text-sm" aria-hidden="true">🎉</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / quest modal */}
      <QuestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule an OrionKids Demo 🚀"
      />
    </>
  );
}
