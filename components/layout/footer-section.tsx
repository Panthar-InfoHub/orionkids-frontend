"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// OrionKids logo
const LOGO_SRC = "/svg/Logo.svg";

/* ------------------------------------------------------------------ */
/*  Doodle wall with Polaroid cards from /public/footer-images         */
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

// Compact Strip dimensions: Width 1350px, Height 205px matching Figma canvas
const STRIP_W = 1350;
const STRIP_H = 205;

// Exact 20 Figma-exported doodle cards matching the official design
const CARDS: DoodleSpec[] = [
  // 1. Star doodle (rotated 90deg sideways, lower-left flush)
  { src: "/footer-images/24.png", x: 48, y: 148, w: 90, h: 78, zIndex: 1, alt: "Star doodle" },
  // 2. Smiley face with flower bouquet (bottom row)
  { src: "/footer-images/21.png", x: 135, y: 144, w: 80, h: 81, zIndex: 2, alt: "Smiley and flower bouquet doodle" },
  // 3. Tilted swirl diamond (upper floating between cards 2 & 5)
  { src: "/footer-images/20.png", x: 218, y: 82, w: 110, h: 111, zIndex: 1, alt: "Abstract swirl doodle" },
  // 4. Boat / hat with red cross X (top row)
  { src: "/footer-images/19.png", x: 326, y: 55, w: 78, h: 87, zIndex: 1, alt: "Red cross boat doodle" },
  // 5. Tent / triangle doodle (bottom row below card 4)
  { src: "/footer-images/22.png", x: 318, y: 144, w: 80, h: 81, zIndex: 2, alt: "Tent doodle" },
  // 6. YOCHI stick figures family (bottom row)
  { src: "/footer-images/17.png", x: 412, y: 144, w: 80, h: 81, zIndex: 2, alt: "YOCHI family stick figures doodle" },
  // 7. YO! text doodle (top row)
  { src: "/footer-images/16.png", x: 495, y: 55, w: 78, h: 87, zIndex: 1, alt: "YO! doodle" },
  // 8. Walking smiling heart (bottom row below card 7)
  { src: "/footer-images/18.png", x: 504, y: 144, w: 80, h: 81, zIndex: 2, alt: "Walking smiling heart doodle" },
  // 9. Hello :) doodle (rotated 90deg sideways, bottom row)
  { src: "/footer-images/13.png", x: 618, y: 148, w: 94, h: 74, zIndex: 2, alt: "Hello smiley doodle" },
  // 10. Green and pink flower (top row)
  { src: "/footer-images/9.png", x: 712, y: 52, w: 78, h: 87, zIndex: 1, alt: "Flower doodle" },
  // 11. WOW <3 TEH (top row next to flower)
  { src: "/footer-images/8.png", x: 792, y: 52, w: 80, h: 89, zIndex: 2, alt: "WOW love doodle" },
  // 12. "hi, thanks for inspi" (bottom row below card 10)
  { src: "/footer-images/12.png", x: 712, y: 144, w: 80, h: 81, zIndex: 2, alt: "Inspirational thank you doodle" },
  // 13. Circle / stone outline (bottom row next to card 12)
  { src: "/footer-images/11.png", x: 802, y: 144, w: 80, h: 81, zIndex: 2, alt: "Stone outline doodle" },
  // 14. "SAYA LAWAT AKAN jkw" (top row, slightly tilted)
  { src: "/footer-images/7.png", x: 875, y: 58, w: 88, h: 95, zIndex: 3, alt: "Saya Lawat doodle" },
  // 15. "Gilan" signature (top row, tilted)
  { src: "/footer-images/6.png", x: 960, y: 72, w: 93, h: 99, zIndex: 4, alt: "Gilan signature doodle" },
  // 16. Red heart doodle (top row next to Gilan)
  { src: "/footer-images/5.png", x: 1045, y: 55, w: 78, h: 87, zIndex: 3, alt: "Red heart doodle" },
  // 17. "Bilal" signature (rotated 90deg sideways, bottom row)
  { src: "/footer-images/10.png", x: 1048, y: 148, w: 94, h: 74, zIndex: 2, alt: "Bilal signature doodle" },
  // 18. Squiggle "h" doodle (bottom row next to Bilal)
  { src: "/footer-images/3.png", x: 1140, y: 144, w: 80, h: 81, zIndex: 2, alt: "Squiggle doodle" },
  // 19. Tilted butterfly diamond (floating between cards 16/18 and 20)
  { src: "/footer-images/1.png", x: 1220, y: 75, w: 110, h: 109, zIndex: 3, alt: "Tilted butterfly doodle" },
  // 20. "Fener Bahçe" doodle (bottom row far right)
  { src: "/footer-images/2.png", x: 1305, y: 144, w: 76, h: 88, zIndex: 2, alt: "Fener Bahçe doodle" },
];

function DoodleCard({ spec }: { spec: DoodleSpec }) {
  return (
    <div
      className="absolute transition-transform duration-200 hover:scale-110 hover:!z-30 cursor-pointer pointer-events-auto"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(spec.w / STRIP_W) * 100}%`,
        height: `${(spec.h / STRIP_H) * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: spec.zIndex,
      }}
    >
      <Image
        src={spec.src}
        alt={spec.alt}
        fill
        sizes="(max-width: 768px) 80px, 120px"
        className="object-contain select-none pointer-events-none drop-shadow-none"
      />
    </div>
  );
}

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
      className="relative w-full bg-[#DAF5E9] text-[#0A1D3D] overflow-hidden select-none pt-10 sm:pt-12 pb-8 scroll-mt-16"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[44px]">
        {/* ================= TOP: Tagline + Links matching Figma ================= */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-10">
          {/* Left: Pill, Headline, Logo */}
          <div className="flex flex-col items-start w-full lg:max-w-[850px]">
            {/* Pill: • WHERE EVERY KIDS IS A STAR */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0A1D3D] text-[#0A1D3D] whitespace-nowrap uppercase"
              style={{
                backgroundColor: "#DAF5E9",
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: "14px",
                lineHeight: "17.5px",
                letterSpacing: "0px",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#E0D54F] shrink-0" />
              <span>WHERE EVERY KIDS IS A STAR</span>
            </div>

            {/* Headline */}
            <h2
              className="mt-5 text-[#0A1D3D] font-extrabold text-[28px] sm:text-[36px] lg:text-[44px] leading-tight lg:leading-[55px] tracking-[-1px] lg:tracking-[-2px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                color: "#0A1D3D",
              }}
            >
              <span className="block whitespace-normal lg:whitespace-nowrap">Before You Go, Doodle Something Fun!</span>
              <span className="block whitespace-normal lg:whitespace-nowrap">Tap The Star To Start Your Adventure.</span>
            </h2>

            {/* OrionKids Logo */}
            <Image
              src={LOGO_SRC}
              alt="OrionKids — Where Every Kid Is a Star"
              width={145}
              height={70}
              unoptimized
              className="mt-5 w-[145px] h-auto"
            />
          </div>

          {/* Right: Clean 2-column links matching Figma */}
          <nav
            aria-label="Footer Navigation"
            className="flex items-start gap-[40px] pt-2 lg:pt-4 shrink-0"
            style={{ fontFamily: INTER }}
          >
            {/* Column 1: Main Pages */}
            <div
              className="flex flex-col justify-between text-[#0A1D3D]"
              style={{
                width: "118px",
                height: "166px",
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: "21.75px",
                letterSpacing: "-0.5px",
              }}
            >
              <Link href="/#approach" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase">
                OUR APPROACH
              </Link>
              <Link href="/about-us" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase">
                ABOUT US
              </Link>
              <Link href="/for-schools" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase">
                FOR SCHOOL
              </Link>
              <Link href="/for-parents" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase">
                FOR PARENTS
              </Link>
              <Link href="/#blogs" className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase">
                BLOGS
              </Link>
            </div>

            {/* Column 2: Social / External Links with ↗ */}
            <div
              className="flex flex-col text-[#0A1D3D]"
              style={{
                width: "107px",
                height: "166px",
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: "21.75px",
                letterSpacing: "-0.5px",
                rowGap: "26.33px",
              }}
            >
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

        {/* ================= DOODLE WALL: Compact container without huge gap ================= */}
        <div className="w-full overflow-x-auto md:overflow-visible pb-2 pt-2 scrollbar-none">
          <div
            className="relative w-full min-w-[920px] md:min-w-0 max-w-[1350px] mx-auto mt-4 sm:mt-6"
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

        {/* ================= LEGAL ROW matching Figma screenshot ================= */}
        <div
          className="mt-8 sm:mt-12 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-[12px] text-[#0A1D3D] font-medium text-center md:text-left"
          style={{ fontFamily: INTER }}
        >
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd.</span>
          <span className="text-[#0A1D3D]">
            Design &amp; Development by PantharInfoHub Pvt. Ltd.
          </span>
          <span className="text-[#0A1D3D]">
            Copyright 2026 • All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
