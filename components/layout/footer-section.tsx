"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// OrionKids logo
const LOGO_SRC = "/svg/Logo.svg";

/* ------------------------------------------------------------------ */
/*  Doodle wall with Polaroid cards from /public/svg/001.svg - 021.svg */
/* ------------------------------------------------------------------ */

type DoodleSpec = {
  src: string;
  x: number; // center x in 1350px coordinate space
  y: number; // center y in 205px coordinate space
  w: number; // display width in 1350px coordinate space
  h: number; // display height in 205px coordinate space
  zIndex: number;
  alt: string;
};

// Strip dimensions: Width 1400px, Height 300px for generous, high-visibility doodle cards
const STRIP_W = 1400;
const STRIP_H = 300;

// High-visibility vector doodle cards with enlarged dimensions and playful, layered polaroid collage spacing
const CARDS: DoodleSpec[] = [
  // 1. Star doodle (rotated 90deg sideways, lower-left flush)
  { src: "/svg/021.svg", x: 90, y: 215, w: 156, h: 122, zIndex: 1, alt: "Star doodle" },
  // 2. Smiley face with flower bouquet (bottom row)
  { src: "/svg/019.svg", x: 200, y: 205, w: 138, h: 130, zIndex: 2, alt: "Smiley and flower bouquet doodle" },
  // 3. Tilted swirl diamond (upper floating between cards 2 & 5)
  { src: "/svg/018.svg", x: 230, y: 90, w: 185, h: 160, zIndex: 1, alt: "Abstract swirl doodle" },
  // 4. Boat / hat with red cross X (top row)
  { src: "/svg/017.svg", x: 358, y: 92, w: 138, h: 152, zIndex: 1, alt: "Red cross boat doodle" },
  // 5. Tent / triangle doodle (bottom row below card 4)
  { src: "/svg/020.svg", x: 315, y: 205, w: 138, h: 140, zIndex: 2, alt: "Tent doodle" },
  // 6. YOCHI stick figures family (bottom row)
  { src: "/svg/015.svg", x: 434, y: 205, w: 138, h: 140, zIndex: 2, alt: "YOCHI family stick figures doodle" },
  // 7. YO! text doodle (top row)
  { src: "/svg/013.svg", x: 520, y: 96, w: 138, h: 120, zIndex: 1, alt: "YO! doodle" },
  // 8. Walking smiling heart (bottom row below card 7)
  { src: "/svg/016.svg", x: 545, y: 205, w: 138, h: 140, zIndex: 2, alt: "Walking smiling heart doodle" },
  // 9. Hello :) doodle (rotated 90deg sideways, bottom row)
  { src: "/svg/012.svg", x: 680, y: 215, w: 156, h: 122, zIndex: 2, alt: "Hello smiley doodle" },
  // 10. Green and pink flower (top row)
  // { src: "/svg/008.svg", x: 726, y: 92, w: 138, h: 152, zIndex: 1, alt: "Flower doodle" },
  // 11. WOW <3 TEH (top row next to flower)
  { src: "/svg/007.svg", x: 800, y: 92, w: 140, h: 154, zIndex: 2, alt: "WOW love doodle" },
  // 12. "hi, thanks for inspi" (bottom row below card 10)
  { src: "/svg/011.svg", x: 795, y: 205, w: 138, h: 140, zIndex: 2, alt: "Inspirational thank you doodle" },
  // 13. Circle / stone outline (bottom row next to card 12)
  { src: "/svg/010.svg", x: 932, y: 205, w: 138, h: 140, zIndex: 2, alt: "Stone outline doodle" },
  // 14. "SAYA LAWAT AKAN jkw" (top row, slightly tilted)
  { src: "/svg/006.svg", x: 912, y: 92, w: 148, h: 160, zIndex: 3, alt: "Saya Lawat doodle" },
  // 15. "Gilan" signature (top row, tilted)
  { src: "/svg/005.svg", x: 1030, y: 104, w: 156, h: 166, zIndex: 4, alt: "Gilan signature doodle" },
  // 16. Red heart doodle (top row next to Gilan)
  { src: "/svg/004.svg", x: 1145, y: 104, w: 138, h: 152, zIndex: 3, alt: "Red heart doodle" },
  // 17. "Bilal" signature (rotated 90deg sideways, bottom row)
  { src: "/svg/009.svg", x: 1127, y: 215, w: 156, h: 122, zIndex: 2, alt: "Bilal signature doodle" },
  // 18. Squiggle "h" doodle (bottom row next to Bilal)
  // { src: "/svg/003.svg", x: 1142, y: 205, w: 138, h: 140, zIndex: 2, alt: "Squiggle doodle" },
  // 19. Tilted butterfly diamond (floating between cards 16/18 and 20)
  { src: "/svg/001.svg", x: 1272, y: 80, w: 185, h: 184, zIndex: 3, alt: "Tilted butterfly doodle" },
  // 20. "Fener Bahçe" doodle (bottom row far right)
  { src: "/svg/002.svg", x: 1290, y: 205, w: 134, h: 152, zIndex: 2, alt: "Fener Bahçe doodle" },
];

function DoodleCard({ spec }: { spec: DoodleSpec }) {
  return (
    <div
      className="absolute transition-transform duration-200 hover:scale-115 active:scale-105 hover:!z-30 cursor-pointer pointer-events-auto filter hover:drop-shadow-md"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(spec.w / STRIP_W) * 100}%`,
        height: `${(spec.h / STRIP_H) * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: spec.zIndex,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spec.src}
        alt={spec.alt}
        width={spec.w}
        height={spec.h}
        className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// Gentle rotations for responsive grid on smaller screens
const MOBILE_CARD_ROTATIONS = [
  "-2deg",
  "3deg",
  "-4deg",
  "2deg",
  "-3deg",
  "3deg",
  "-2deg",
  "2deg",
];

/* ------------------------------------------------------------------ */
/*  External Arrow Icon (↗)                                            */
/* ------------------------------------------------------------------ */

const ArrowDiagonal = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className="inline-block ml-1 shrink-0"
  >
    <path
      d="M3.5 8.5L8.5 3.5M4.5 3.5H8.5V7.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Footer Component                                                    */
/* ------------------------------------------------------------------ */

export function FooterSection() {
  return (
    <footer
      id="footer-section"
      className="relative w-full bg-[#DAF5E9] text-[#0A1D3D] overflow-hidden select-none pt-7 sm:pt-8 scroll-mt-16"
      style={{
        paddingBottom: "max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))",
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[44px]">
        {/* ================= TOP: Tagline + Links matching Figma ================= */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
          {/* Left: Pill, Headline, Logo */}
          <div className="flex flex-col items-start w-full lg:max-w-[850px]">
            {/* Pill: • WHERE EVERY KIDS IS A STAR */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0A1D3D] text-[#0A1D3D] whitespace-nowrap uppercase text-xs font-bold"
              style={{
                backgroundColor: "#DAF5E9",
                fontFamily: INTER,
                letterSpacing: "0.2px",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E0D54F] shrink-0" />
              <span>WHERE EVERY KIDS IS A STAR</span>
            </div>

            {/* Headline matching reference image */}
            <h2
              className="mt-2.5 sm:mt-3 text-[#0A1D3D] font-extrabold text-xl sm:text-2xl lg:text-[30px] leading-snug tracking-tight"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                color: "#0A1D3D",
              }}
            >
              <span className="block whitespace-normal lg:whitespace-nowrap">
                Before You Go, Doodle Something Fun!
              </span>
              <span className="block whitespace-normal lg:whitespace-nowrap">
                Tap The Star To Start Your Adventure.
              </span>
            </h2>

            {/* OrionKids Logo */}
            <Link href="/" className="inline-block cursor-pointer">
              <Image
                src={LOGO_SRC}
                alt="OrionKids — Where Every Kid Is a Star"
                width={125}
                height={60}
                unoptimized
                className="mt-3 sm:mt-4 w-[115px] sm:w-[125px] h-auto"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>

          {/* Right: Clean 2-column links matching reference image */}
          <nav
            aria-label="Footer Navigation"
            className="flex items-start gap-8 sm:gap-12 pt-1 lg:pt-2 shrink-0"
            style={{ fontFamily: INTER }}
          >
            {/* Column 1: Main Pages (OUR APPROACH, FOR SCHOOL, FOR PARENTS, BLOGS) */}
            <div className="flex flex-col space-y-2 sm:space-y-2.5 text-[#0A1D3D] text-xs sm:text-[13px] font-bold tracking-tight">
              <Link href="/our-approach" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer">
                OUR APPROACH
              </Link>
              <Link href="/for-schools" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer">
                FOR SCHOOL
              </Link>
              <Link href="/for-parents" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer">
                FOR PARENTS
              </Link>
              <Link href="/about-us" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer">
                ABOUT US
              </Link>
              <Link href="/blog" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer">
                BLOGS
              </Link>
            </div>

            {/* Column 2: Social / External Links with ↗ (LINKEDIN, EMAIL, INSTAGRAM) */}
            <div className="flex flex-col space-y-2 sm:space-y-2.5 text-[#0A1D3D] text-xs sm:text-[13px] font-bold tracking-tight">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase"
              >
                <span>LINKEDIN</span>
                <ArrowDiagonal />
              </a>
              <a
                href="mailto:contact@orionkids.in"
                className="inline-flex items-center hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase"
              >
                <span>EMAIL</span>
                <ArrowDiagonal />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase"
              >
                <span>INSTAGRAM</span>
                <ArrowDiagonal />
              </a>
            </div>
          </nav>
        </div>

        {/* ================= DOODLE WALL: Fully responsive doodle gallery ================= */}
        {/* Desktop (>768px): Exact collage layout using CARDS coordinates */}
        <div className="hidden md:block relative w-full overflow-hidden pb-2 pt-3 sm:pt-4 select-none">
          <div
            className="relative w-full max-w-[1400px] mx-auto"
            style={{
              aspectRatio: `${STRIP_W} / ${STRIP_H}`,
            }}
            aria-label="Children's creative doodles gallery"
          >
            {CARDS.map((c, i) => (
              <DoodleCard key={i} spec={c} />
            ))}
          </div>
        </div>

        {/* Tablet & Mobile (<=768px): Centered wrapping flex layout with no horizontal overflow */}
        <div className="block md:hidden relative w-full overflow-x-hidden pb-3 pt-3 select-none">
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 max-w-[680px] mx-auto"
            aria-label="Children's creative doodles gallery mobile"
          >
            {CARDS.slice(0, 8).map((card, i) => (
              <div
                key={i}
                className={`relative shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 ${
                  i >= 6 ? "hidden min-[481px]:block" : "block"
                }`}
                style={{
                  width: "clamp(72px, 22vw, 110px)",
                  aspectRatio: `${card.w} / ${card.h}`,
                  transform: `rotate(${MOBILE_CARD_ROTATIONS[i] || "0deg"})`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt}
                  width={card.w}
                  height={card.h}
                  className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= LEGAL ROW matching reference screenshot ================= */}
        <div
          className="mt-4 sm:mt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#0A1D3D] font-medium text-center md:text-left"
          style={{ fontFamily: INTER }}
        >
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd.</span>
          <span>
            Design &amp; Development by PantharInfoHub Pvt. Ltd.
          </span>
          <span>
            Copyright 2026 • All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
