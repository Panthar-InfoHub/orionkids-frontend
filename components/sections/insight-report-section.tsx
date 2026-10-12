"use client";

import React from "react";
import Image from "next/image";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// Collage metrics (cqw = 1% of the collage width, so they scale with it)
const BORDER = "max(1.5px, 0.26cqw)";            // 2px at Figma size
const SHADOW = "clamp(3px, 0.78cqw, 6px)";       // 6px hard yellow shadow at Figma size
const RADIUS_MAIN = "clamp(14px, 4.16cqw, 32px)";
const RADIUS_SECOND = "clamp(12px, 3.8cqw, 28px)";

/** Light-blue sticker pill with navy border + hard shadow; centred on (left, top) and tilted. */
function StickerPill({
  emoji,
  text,
  left,
  top,
  rotate,
}: {
  emoji: string;
  text: string;
  left: string;
  top: string;
  rotate: number;
}) {
  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{ left, top, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
    >
      <div
        className="inline-flex items-center whitespace-nowrap rounded-full bg-[#D8F3FF] text-[#0A1D3D]"
        style={{
          fontFamily: JAKARTA,
          fontSize: "clamp(9px, 1.7cqw, 13px)",
          fontWeight: 900,
          lineHeight: 1,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          gap: "0.5em",
          padding: "0.7em 1.05em",
          border: `${BORDER} solid #0A1D3D`,
          boxShadow: "0.22em 0.22em 0 #0A1D3D",
        }}
      >
        <span style={{ fontSize: "1.1em", lineHeight: 1 }}>{emoji}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

export function InsightReportSection() {
  return (
    <section
      id="insight-report-section"
      className="relative w-full bg-[#6739B7] text-white py-12 lg:py-16 overflow-hidden select-none scroll-mt-16"
    >
      {/* Decorative Constellation Stars & Sparkles in the Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="absolute top-12 left-[5%] text-white/40 text-xs">✦</span>
        <span className="absolute top-28 left-[22%] text-white/30 text-[10px]">★</span>
        <span className="absolute top-14 right-[38%] text-white/35 text-xs">✦</span>
        <span className="absolute top-20 right-[10%] text-white/45 text-[12px]">★</span>
        <span className="absolute bottom-28 left-[10%] text-white/30 text-xs">★</span>
        <span className="absolute bottom-16 left-[44%] text-white/35 text-[10px]">✦</span>
        <span className="absolute bottom-24 right-[16%] text-white/30 text-xs">✦</span>
        <span className="absolute top-[48%] left-[2%] text-white/20 text-[8px]">●</span>
        <span className="absolute bottom-[6%] right-[38%] text-white/20 text-[8px]">●</span>
      </div>
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center w-full">

          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            {/* Top Pill Badge (Width: 208px, Height: 24px, Radius: 9999px, Border: 2px #FFD54F, Rotate: 1deg, Bg: #65DCAA, Text: #0A1D3D) */}
            <div
              className="inline-flex items-center justify-center gap-1.5 w-[208px] h-[24px] rounded-full bg-[#65DCAA] text-[#0A1D3D] border-2 border-[#FFD54F] px-2.5 py-[3px] rotate-[1deg] origin-left select-none mb-4 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontSize: "10px",
                fontWeight: 800,
                lineHeight: "100%",
                textTransform: "uppercase",
              }}
            >
              <span className="text-[11px] leading-none">🔍</span>
              <span className="tracking-wider leading-none">UNDERSTAND → SUPPORT</span>
              <span className="text-[11px] leading-none">✨</span>
            </div>

            {/* Main Headline (Plus Jakarta Sans, ExtraBold 800, 44px, Line height: 112%, Letter spacing: -1.6px, Max-w: 340px) */}
            <h2
              className="text-white max-w-[340px] mb-4"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "44px",
                lineHeight: "112%",
                letterSpacing: "-1.6px",
              }}
            >
              Every child is a<br />
              constellation<br />
              of potential. 🌟
            </h2>

            {/* Subtitle Content (Inter, Regular 400, 18px, Line height: 160%, Letter spacing: 0%, Text: #E2E2E2, Max-w: 446px) */}
            <p
              className="text-[#E2E2E2] max-w-[446px] mb-5"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "0%",
              }}
            >
              The OrionKids Insight Report maps strengths, areas that need support,
              and progress into one readable learning profile — no rankings, no labels.
            </p>

            {/* Left Div / Callout Box (Width: 446px, Radius: 16px, Border: 2px #FFD54F, Padding: 16px, Gap: 8px, Bg: #FFFFFF) */}
            <div className="w-full max-w-[446px] bg-white rounded-[16px] border-2 border-[#FFD54F] p-[16px] sm:p-[18px] flex flex-col gap-[8px] text-left shadow-md mb-5">
              <h3
                className="text-black flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                <span>🎨</span>
                <span>Thoughtful technology. Human context.</span>
              </h3>
              <p
                className="text-[#526176]"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "13.5px",
                  lineHeight: "160%",
                  letterSpacing: "0%",
                }}
              >
                AI observes patterns in game performance over time. Teachers and parents connect those insights to everyday learning — not a fixed label.
              </p>
            </div>

            {/* Left Big Pill (Width: 258px, Height: 24px, Radius: 99px, Border: 1px, Padding: 5px 12px, Gap: 6px, Bg: #132847, Text: #00B4C6) */}
            <div
              className="inline-flex items-center gap-[6px] w-[258px] h-[24px] rounded-[99px] bg-[#132847] border border-[#1E3A5F] px-[12px] py-[5px] mb-2.5 select-none"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#00B4C6",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4C6] shrink-0" />
              <span className="whitespace-nowrap">Orion Constellation · Growth journey map</span>
            </div>

            {/* Small Four Divs (Width: 102px, Height: 23px, Radius: 10px, Padding: 6px 10px, Gap: 2px) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 select-none">
              {/* 1. Curiosity sparks (Bg: #FFFFFF) */}
              <div
                className="w-[102px] h-[23px] rounded-[10px] bg-[#FFFFFF] text-[#0A1D3D] border border-[#0A1D3D] flex items-center justify-center gap-1 px-1.5 py-[3px] shadow-sm hover:scale-105 transition-transform cursor-default whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "9px",
                  lineHeight: "100%",
                }}
              >
                <span className="text-[10px] leading-none shrink-0">✨</span>
                <span className="leading-none">Curiosity sparks</span>
              </div>

              {/* 2. First discoveries (Bg: #FF8CC7) */}
              <div
                className="w-[102px] h-[23px] rounded-[10px] bg-[#FF8CC7] text-[#0A1D3D] border border-[#0A1D3D] flex items-center justify-center gap-1 px-1.5 py-[3px] shadow-sm hover:scale-105 transition-transform cursor-default whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "9px",
                  lineHeight: "100%",
                }}
              >
                <span className="text-[10px] leading-none shrink-0">🌸</span>
                <span className="leading-none">First discoveries</span>
              </div>

              {/* 3. Patterns emerge (Bg: #7DD3FC) */}
              <div
                className="w-[102px] h-[23px] rounded-[10px] bg-[#7DD3FC] text-[#0A1D3D] border border-[#0A1D3D] flex items-center justify-center gap-1 px-1.5 py-[3px] shadow-sm hover:scale-105 transition-transform cursor-default whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "9px",
                  lineHeight: "100%",
                }}
              >
                <span className="text-[10px] leading-none shrink-0">⭐</span>
                <span className="leading-none">Patterns emerge</span>
              </div>

              {/* 4. Confident learner (Bg: #EAF7EF) */}
              <div
                className="w-[102px] h-[23px] rounded-[10px] bg-[#EAF7EF] text-[#0A1D3D] border border-[#0A1D3D] flex items-center justify-center gap-1 px-1.5 py-[3px] shadow-sm hover:scale-105 transition-transform cursor-default whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "9px",
                  lineHeight: "100%",
                }}
              >
                <span className="text-[10px] leading-none shrink-0">🚀</span>
                <span className="leading-none">Confident learner</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: Visual Collage & Caption ================= */}
          {/*
            The collage lives on a fixed design canvas measured from Figma (546 x 544 units).
            Every child is positioned and sized in % of that canvas, and borders / shadows /
            radii use `cqw` (container-query width), so the whole composition scales as ONE
            piece and looks identical at every viewport width.
          */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full mt-6 lg:mt-0">
            <div
              className="relative w-full max-w-[620px] select-none"
              style={{ containerType: "inline-size", aspectRatio: "546 / 544" }}
            >
              {/* Photo 1: main image (Figma: 430 x 400, 2px yellow border + hard 6px yellow shadow) */}
              <div
                className="absolute z-10"
                style={{ left: "0%", top: "8.456%", width: "78.75%", aspectRatio: "430 / 400" }}
              >
                <div
                  className="relative w-full h-full overflow-hidden bg-[#0A1D3D]/30"
                  style={{
                    borderRadius: RADIUS_MAIN,
                    border: `${BORDER} solid #FFD54F`,
                    boxShadow: `${SHADOW} ${SHADOW} 0 0 #FFD54F`,
                  }}
                >
                  <Image
                    src="/images/children-learning-together.png"
                    alt="Children learning together in computer lab"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 620px"
                    priority
                  />
                </div>
              </div>

              {/* Floating Badge 1: BLAST OFF! (top right of main image, tilted +5deg) */}
              <StickerPill emoji="👾" text="BLAST OFF!" left="67.22%" top="16.82%" rotate={5} />

              {/* Floating Badge 2: SUPERSTAR APPROVED! (bottom left of main image, tilted -4deg) */}
              <StickerPill emoji="✨" text="SUPERSTAR APPROVED!" left="18.04%" top="75.37%" rotate={-4} />

              {/* 3D Floating Cartoon Letter "A" (top right corner of main image, rotated -41.5deg) */}
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: "81.68%",
                  top: "5.24%",
                  width: "17%",
                  aspectRatio: "1 / 1",
                  transform: "translate(-50%, -50%) rotate(-41.5deg)",
                }}
              >
                <Image
                  src="/gif/A.gif"
                  alt="Cartoon Letter A"
                  width={150}
                  height={150}
                  unoptimized
                  className="w-full h-full object-contain drop-shadow-[2px_6px_10px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Photo 2: secondary image, offset right of the main image (Figma: 230 x 214) */}
              <div
                className="absolute z-20"
                style={{ left: "49.08%", top: "59.93%", width: "42.12%", aspectRatio: "230 / 214" }}
              >
                <div
                  className="relative w-full h-full overflow-hidden bg-[#0A1D3D]/30"
                  style={{
                    borderRadius: RADIUS_SECOND,
                    border: `${BORDER} solid #FFD54F`,
                    boxShadow: `${SHADOW} ${SHADOW} 0 0 #FFD54F`,
                  }}
                >
                  <Image
                    src="/images/children-learning-tactile.png"
                    alt="Child learning through tactile shape play"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 260px"
                  />
                </div>
              </div>

              {/* 3D Bullseye Target Sticker with Dart: sits on the top-right corner of Photo 2 */}
              <div
                className="absolute z-30 pointer-events-none"
                style={{
                  left: "90.93%",
                  top: "60.39%",
                  width: "15.9%",
                  aspectRatio: "100 / 112",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Image
                  src={encodeURI("/icons/🎯.png")}
                  alt="Bullseye Target"
                  width={100}
                  height={112}
                  unoptimized
                  className="w-full h-full object-contain drop-shadow-[2px_6px_10px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Caption: centred between the left edge of Photo 1 and the left edge of Photo 2 */}
              <p
                className="absolute z-10 text-white text-center whitespace-nowrap"
                style={{
                  left: "24.54%",
                  top: "86%",
                  transform: "translateX(-50%)",
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "clamp(10px, 2.35cqw, 18px)",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                }}
              >
                Small moments of discovery.<br />
                Meaningful opportunities for<br />
                support.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
