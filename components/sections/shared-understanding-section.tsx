"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";
const NAVY = "#0A1D3D";

/**
 * Corner badge — measured from the Figma export (1:1 px, origin = card's inner top-left).
 *
 *  - Three concentric circles centred at (13.5, 21.5): outer Ø104 (outerColor),
 *    middle Ø86 (ring colour), inner Ø64 (dot colour); all with a 2px navy border.
 *    They are clipped by the card (card = overflow-hidden), so only the corner shows.
 *  - One white pill: 29px tall, 2px navy border, hard 4px bottom shadow, running
 *    underneath the circles. Emoji starts at x≈65, label is 15px / 800 / tracking-wider.
 *
 * Must be rendered inside a `relative overflow-hidden` card.
 */
function CornerBadge({
  emoji,
  label,
  ringColor,
  dotColor,
  outerColor,
}: {
  emoji: string;
  label: string;
  ringColor: string;
  dotColor: string;
  outerColor: string;
}) {
  return (
    <div className="absolute top-0 left-0 z-10 select-none pointer-events-none">
      {/* White pill (drawn first so the circles sit on top of its left end) */}
      <div
        className="absolute left-[30px] top-[25.5px] h-[29px] flex items-center gap-[7px] pl-[33.5px] pr-[17px] bg-white rounded-full border-2 whitespace-nowrap"
        style={{
          borderColor: NAVY,
          boxShadow: `0px 4px 0px 0px ${NAVY}`,
          color: NAVY,
        }}
      >
        <span className="text-[12px] leading-none">{emoji}</span>
        <span
          className="text-[15px] font-extrabold uppercase tracking-wider leading-none"
          style={{ fontFamily: JAKARTA }}
        >
          {label}
        </span>
      </div>

      {/* Outer circle Ø104 */}
      <div
        className="absolute left-[-38.5px] top-[-30.5px] w-[104px] h-[104px] rounded-full border-2 flex items-center justify-center"
        style={{ backgroundColor: outerColor, borderColor: NAVY }}
      >
        {/* Middle ring Ø86 */}
        <div
          className="w-[86px] h-[86px] rounded-full border-2 flex items-center justify-center"
          style={{ backgroundColor: ringColor, borderColor: NAVY }}
        >
          {/* Inner dot Ø64 */}
          <div
            className="w-[64px] h-[64px] rounded-full border-2"
            style={{ backgroundColor: dotColor, borderColor: NAVY }}
          />
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="text-[#4B5563] text-base leading-[1.6] shrink-0">•</span>
      <span>{children}</span>
    </li>
  );
}

export function SharedUnderstandingSection() {
  return (
    <section
      id="shared-understanding-section"
      className="relative w-full bg-[#FFF0F6] text-[#0A1D3D] py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden select-none scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-[1224px] mx-auto flex flex-col gap-6 lg:gap-8">
        {/* ================= HEADER ROW ================= */}
        <div className="flex flex-col gap-1.5 text-left w-full">
          <span
            className="text-[11px] sm:text-xs font-black tracking-[1.2px] uppercase text-[#0A1D3D]/80"
            style={{ fontFamily: JAKARTA, lineHeight: "100%" }}
          >
            SCHOOL AND FAMILY PATHWAYS
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-[38px] font-[800] text-[#0A1D3D] tracking-[-0.8px] flex items-center gap-2.5"
              style={{ fontFamily: JAKARTA, lineHeight: "115%" }}
            >
              <span>One child. A shared understanding.</span>
              <span className="text-2xl lg:text-3xl">🤝</span>
            </h2>

            <div
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:scale-105 transition-transform cursor-default whitespace-nowrap self-start sm:self-auto"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "11px",
                lineHeight: "100%",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
              }}
            >
              <span>BETTER TOGETHER</span>
            </div>
          </div>
        </div>

        {/* ================= DUAL CARDS ROW ================= */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-[24px]">
          {/* ================= CARD 1: FOR SCHOOLS & EDUCATORS ================= */}
          {/* Figma: 600 wide, radius 24, border 2, padding 20, gap 12, fill #E8F9F0 */}
          <div className="relative overflow-hidden w-full lg:w-[600px] min-h-[361px] bg-[#E8F9F0] rounded-[24px] border-2 border-[#0A1D3D] shadow-[5px_6px_0px_0px_#0A1D3D] p-5 pt-[74px] flex flex-col justify-between gap-3 text-left transition-transform hover:-translate-y-0.5">
            <CornerBadge
              emoji="🎒"
              label="FOR SCHOOLS & EDUCATORS"
              ringColor="#D8F3FF"
              dotColor="#FF8CC7"
              outerColor="#E8F9F0"
            />

            <div className="flex flex-col gap-3">
              <h3
                className="text-[#0A1D3D] tracking-tight"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "28px",
                  lineHeight: "115%",
                }}
              >
                For schools &amp; educators
              </h3>

              <ul
                className="flex flex-col gap-0 text-[#4B5563] list-none pl-0 m-0"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "160%",
                }}
              >
                <Bullet>
                  Structured assessment insights improve classroom observations by offering a clearer view of each student&apos;s needs.
                </Bullet>
                <Bullet>
                  This method helps in customizing individual support and promotes a more inclusive learning environment.
                </Bullet>
                <Bullet>
                  Schools can boost student engagement, enhance academic performance, and address learning gaps early.
                </Bullet>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3">
              <span
                className="text-[13px] font-medium text-[#374151]"
                style={{ fontFamily: INTER }}
              >
                Understand learners · Plan support · Follow progress
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 h-[30px] px-3 bg-white text-[#0A1D3D] text-[13px] font-bold rounded-full border-2 border-[#0A1D3D] hover:scale-105 active:scale-95 transition-transform cursor-pointer self-start shrink-0 whitespace-nowrap"
                style={{ fontFamily: JAKARTA }}
              >
                <span>Explore OrionKids for schools</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* ================= CARD 2: FOR PARENTS ================= */}
          <div className="relative overflow-hidden w-full lg:w-[600px] min-h-[361px] bg-[#F0E6FF] rounded-[24px] border-2 border-[#0A1D3D] shadow-[5px_6px_0px_0px_#0A1D3D] p-5 pt-[74px] flex flex-col justify-between gap-3 text-left transition-transform hover:-translate-y-0.5">
            <CornerBadge
              emoji="✨"
              label="FOR PARENTS & FAMILIES"
              ringColor="#FF8CC7"
              dotColor="#EAF7EF"
              outerColor="#D8F3FF"
            />

            <div className="flex flex-col gap-3">
              <h3
                className="text-[#0A1D3D] tracking-tight"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "28px",
                  lineHeight: "115%",
                }}
              >
                For parents
              </h3>

              <ul
                className="flex flex-col gap-0 text-[#4B5563] list-none pl-0 m-0"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "160%",
                }}
              >
                <Bullet>Encourage curiosity by asking open-ended questions during playtime.</Bullet>
                <Bullet>Create a routine that includes time for reading together every day.</Bullet>
                <Bullet>Provide a variety of learning materials, such as books, puzzles, and art supplies.</Bullet>
                <Bullet>Celebrate small achievements to boost your child&apos;s confidence.</Bullet>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-3">
              <span
                className="text-[13px] font-medium text-[#374151]"
                style={{ fontFamily: INTER }}
              >
                Recognize strengths · Find next steps · Grow together
              </span>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 h-[30px] px-3 bg-white text-[#0A1D3D] text-[13px] font-bold rounded-full border-2 border-[#0A1D3D] hover:scale-105 active:scale-95 transition-transform cursor-pointer self-start shrink-0 whitespace-nowrap"
                style={{ fontFamily: JAKARTA }}
              >
                <span>Explore OrionKids for parents</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
