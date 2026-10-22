"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";


const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// Collage metrics (cqw = 1% of the collage width, so they scale with it)
const BORDER = "max(1.5px, 0.3cqw)"; // ~2px at 610px wide
const SHADOW = "clamp(3px, 0.95cqw, 8px)"; // ~6px hard yellow shadow at 610px wide
const RADIUS_MAIN = "clamp(14px, 4.16cqw, 32px)";
const RADIUS_SECOND = "clamp(12px, 3.8cqw, 28px)";

// Tiny background dots, positioned in % of the section
const DOTS: { left: string; top: string; size: number; opacity: number }[] = [
  { left: "3.2%", top: "1.6%", size: 2, opacity: 0.5 },
  { left: "36.2%", top: "0.8%", size: 2, opacity: 0.4 },
  { left: "55.7%", top: "5.1%", size: 2, opacity: 0.4 },
  { left: "89%", top: "3.3%", size: 2, opacity: 0.45 },
  { left: "98.6%", top: "49.2%", size: 2, opacity: 0.35 },
  { left: "9.2%", top: "51.9%", size: 2, opacity: 0.3 },
  { left: "4.9%", top: "95.4%", size: 2, opacity: 0.4 },
  { left: "95.2%", top: "92.7%", size: 2, opacity: 0.4 },
  { left: "82.1%", top: "97.5%", size: 2, opacity: 0.35 },
  { left: "62.6%", top: "97%", size: 2, opacity: 0.3 },
];

const CHIPS = [
  { emoji: "✨", text: "Curiosity sparks", bg: "#FFFFFF", color: "#0A1D3D" },
  { emoji: "🔭", text: "First discoveries", bg: "#FF8CC7", color: "#FFFFFF" },
  { emoji: "🌟", text: "Patterns emerge", bg: "#7DD3FC", color: "#FFFFFF" },
  { emoji: "🚀", text: "Confident learner", bg: "#EAF7EF", color: "#0A1D3D" },
];

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
      className="relative w-full bg-[#0A1D3D] text-white overflow-hidden select-none scroll-mt-16 pt-12 pb-24 sm:pb-32 lg:pt-[38px] lg:pb-40"
    >
      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {DOTS.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>

      {/* Content frame*/}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:pl-[88px] xl:pr-[108px]">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,446px)_minmax(0,610px)] lg:justify-between lg:items-start lg:gap-x-10">

          <div className="flex w-full flex-col items-start text-left">
            {/* Top pill badge */}
            <div
              className="mb-6 lg:mb-[30px] inline-flex h-[24px] w-[208px] origin-left -rotate-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-[#0A1D3D] bg-[#65DCAA] px-2.5 text-[#0A1D3D]"
              style={{
                fontFamily: JAKARTA,
                fontSize: "10px",
                fontWeight: 800,
                lineHeight: "100%",
                textTransform: "uppercase",
                boxShadow: "2px 2px 0 #FFD54F",
              }}
            >
              <span className="text-[11px] leading-none">🔍</span>
              <span className="leading-none tracking-wider">UNDERSTAND → SUPPORT</span>
              <span className="text-[11px] leading-none">✨</span>
            </div>

            <h2
              className="mb-6 lg:mb-[44px] max-w-[340px] text-[34px] sm:text-[40px] lg:text-[44px] text-white"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                lineHeight: "112%",
                letterSpacing: "-0.0364em",
              }}
            >
              Every Child Is A<br />
              Constellation<br />
              Of Potential. 🌟
            </h2>

            <p
              className="mb-6 lg:mb-[34px] max-w-[446px] text-[16px] sm:text-[18px] text-[#8E9BB3]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 600,
                lineHeight: "160%",
                letterSpacing: "0%",
              }}
            >
              The OrionKids Insight Report maps strengths,
              <br className="hidden sm:block" /> areas that need support, and progress into one
              <br className="hidden sm:block" /> readable learning profile — no rankings, no labels.
            </p>

            {/* Callout: 446 wide, radius 16, 2px #FFD54F border, padding 16, gap 8 */}
            <div className="mb-8 lg:mb-[46px] flex w-full max-w-[446px] flex-col gap-[8px] rounded-[16px] border-2 border-[#FFD54F] bg-white p-[16px] text-left">
              <h3
                className="flex items-center gap-1.5 text-black"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "14px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                }}
              >
                <span>🎨</span>
                <span>Thoughtful Technology. Human Context.</span>
              </h3>
              <p
                className="text-[#526176]"
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                }}
              >
                AI observes patterns in game performance over time.
                <br className="hidden sm:block" /> Teachers and parents connect those insights to everyday
                <br className="hidden sm:block" /> learning — not a fixed label.
              </p>
            </div>

            {/* Big pill: 258 x 24, radius 99, 1px border */}
            <div
              className="mb-[14px] inline-flex h-[24px] w-[258px] max-w-full items-center gap-[6px] rounded-[99px] border border-[#4FA9C9] bg-[#0A1D3D] px-[12px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "100%",
                color: "#00B4C6",
              }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00B4C6]" />
              <span className="whitespace-nowrap">Orion Constellation · Growth Journey Map</span>
            </div>

            {/* Four chips: 102 x 23, radius 10, gap 8 */}
            <div className="flex flex-wrap items-center gap-2">
              {CHIPS.map((c) => (
                <div
                  key={c.text}
                  className="flex h-[23px] w-[102px] items-center justify-center gap-[3px] whitespace-nowrap rounded-[10px]"
                  style={{
                    background: c.bg,
                    color: c.color,
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    fontSize: "8.5px",
                    lineHeight: "100%",
                    boxShadow: "3px 3px 0 #000000",
                  }}
                >
                  <span className="shrink-0 text-[9px] leading-none">{c.emoji}</span>
                  <span className="leading-none">{c.text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: collage ================= */}
          <div className="flex w-full justify-center lg:mt-[18px] lg:justify-end">
            <div
              className="relative w-full max-w-[610px] select-none"
              style={{ containerType: "inline-size", aspectRatio: "546 / 544" }}
            >
              {/* Photo 1 */}
              <div
                className="absolute z-10"
                style={{ left: "0%", top: "8.456%", width: "78.75%", aspectRatio: "430 / 400" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden bg-[#0A1D3D]/30"
                  style={{
                    borderRadius: RADIUS_MAIN,
                  }}
                >
                  <Image
                    src="/images/children-learning-together.png"
                    alt="Children learning together in computer lab"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 610px"
                    priority
                  />
                </div>
              </div>

              <StickerPill emoji="👾" text="BLAST OFF!" left="67.4%" top="16.8%" rotate={5} />
              <StickerPill emoji="✨" text="SUPERSTAR APPROVED!" left="19%" top="75.8%" rotate={-4} />

              <div
                className="pointer-events-none absolute z-30"
                style={{
                  left: "82.2%",
                  top: "5.5%",
                  width: "30.5%",
                  aspectRatio: "1 / 1",
                  transform: "translate(-50%, -50%) rotate(-41.5deg)",
                }}
              >
                <Image
                  src="/gif/ABC.webp"
                  alt="Cartoon Letter A"
                  width={150}
                  height={150}
                  unoptimized
                  className="h-full w-full object-contain drop-shadow-[2px_6px_10px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Photo 2 */}
              <div
                className="absolute z-20"
                style={{ left: "49.3%", top: "58%", width: "42%", aspectRatio: "230 / 214" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden bg-[#0A1D3D]/30"
                  style={{
                    borderRadius: RADIUS_SECOND,
                    border: "2.5px solid #FFD028",
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

              {/* Bullseye sticker on Photo 2's top-right corner */}
              <div
                className="pointer-events-none absolute z-30"
                style={{
                  left: "91.4%",
                  top: "60.5%",
                  width: "16.4%",
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
                  className="h-full w-full object-contain drop-shadow-[2px_6px_10px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Caption: left-aligned with Photo 1's left edge */}
              <p
                className="absolute z-10 whitespace-nowrap text-left text-white"
                style={{
                  left: "0%",
                  top: "85.6%",
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: "clamp(10px, 2.8cqw, 18px)",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                }}
              >
                Small moments of discovery.
                <br />
                Meaningful opportunities for
                <br />
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Robot Hand (Positioned in bottom-right corner) */}
      <div
        className="pointer-events-none absolute z-20 select-none bottom-0 right-0
                   w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px] xl:w-[230px] xl:h-[230px]"
      >
        <Image
          src="/robots/robo2.png"
          alt="Robot hand holding AI processor chip"
          width={310}
          height={310}
          className="h-full w-full object-contain object-right-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
          priority
        />
      </div>
    </section>
  );
}
