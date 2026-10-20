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

type CardSpec = {
  x: number;
  y: number;
  rot: number;
  imageSrc?: string;
  label?: string;
  author?: string;
  isSpecialFrame?: boolean;
};

// Compact Strip dimensions: Width 1350px, Height 205px (eliminating huge empty gap)
const STRIP_W = 1350;
const STRIP_H = 205;

// Exact Photo Frame specs: Width 80px, Height 92px, Colour #F5F0E8
const CARD_W = 80;
const CARD_H = 92;

// Compact card coordinates: Upper row center Y ~ 53px, Lower row center Y ~ 144px
const CARDS: CardSpec[] = [
  // 1. Star (rotated -90deg, lower-left flush)
  { x: 48, y: 148, rot: -90, imageSrc: "/footer-images/star.jpg", label: "Star doodle" },
  // 2. Book (upright, bottom row)
  { x: 138, y: 144, rot: 0, imageSrc: "/footer-images/book.jpg", label: "Book doodle" },
  // 3. Butterfly (tilted, between book and plant)
  { x: 218, y: 80, rot: -39.61, imageSrc: "/footer-images/butterfly.jpg", label: "Butterfly doodle" },
  // 4. Plant (top row above rocket)
  { x: 330, y: 48, rot: 0, imageSrc: "/footer-images/plant.jpg", label: "Plant doodle" },
  // 5. Rocket (bottom row below plant)
  { x: 318, y: 144, rot: 0, imageSrc: "/footer-images/rocket.jpg", label: "Rocket doodle" },
  // 6. Cubes (bottom row)
  { x: 419, y: 144, rot: 0, imageSrc: "/footer-images/cubes.jpg", label: "Cubes doodle" },
  // 7. Boat (top row above planet)
  { x: 499, y: 48, rot: 0, imageSrc: "/footer-images/boat.jpg", label: "Boat doodle" },
  // 8. Planet (bottom row below boat)
  { x: 506, y: 144, rot: 0, imageSrc: "/footer-images/planet.jpg", label: "Planet doodle" },
  // 9. Dinosaur (rotated -90deg, bottom row)
  { x: 626, y: 148, rot: -90, imageSrc: "/footer-images/dinasaur.jpg", label: "Dinosaur doodle" },
  // 10. Puzzle (top row above kite)
  { x: 721, y: 48, rot: 0, imageSrc: "/footer-images/puzzle.jpg", label: "Puzzle doodle" },
  // 11. Kite (bottom row below puzzle)
  { x: 717, y: 144, rot: 0, imageSrc: "/footer-images/kite.jpg", label: "Kite doodle" },
  // 12. House (top row above tortoise)
  { x: 803, y: 48, rot: -2, imageSrc: "/footer-images/house.jpg", label: "House doodle" },
  // 13. Tortoise (bottom row below house)
  { x: 844, y: 144, rot: 0, imageSrc: "/footer-images/tortoise.jpg", label: "Tortoise doodle" },
  // 14. Heart (top row, author: "", gold frame)
  { x: 893, y: 48, rot: 9, imageSrc: "/footer-images/heart.jpg", label: "Heart doodle", isSpecialFrame: true },
  // 15. Fruit-pencil (tilted between heart and rainbow)
  { x: 983, y: 72, rot: -15, imageSrc: "/footer-images/fruit-pencil.jpg", label: "Pencil doodle" },
  // 16. Rainbow (top row above flower)
  { x: 1078, y: 60, rot: 0, imageSrc: "/footer-images/rainbow.jpg", label: "Rainbow doodle" },
  // 17. Flower (rotated -90deg, bottom row below rainbow)
  { x: 1070, y: 150, rot: -90, imageSrc: "/footer-images/flower.jpg", label: "Flower doodle" },
  // 18. Fish (bottom row)
  { x: 1160, y: 144, rot: 0, imageSrc: "/footer-images/fish.jpg", label: "Fish doodle" },
  // 19. Stars (tilted between fish and telescope)
  { x: 1230, y: 68, rot: -30, imageSrc: "/footer-images/stars.jpg", label: "Stars doodle" },
  // 20. Telescope (far right, bottom row)
  { x: 1325, y: 144, rot: 0, imageSrc: "/footer-images/telescope.jpg", label: "Telescope doodle" },
];

function DoodleCard({ spec }: { spec: CardSpec }) {
  return (
    <div
      className="absolute transition-transform hover:scale-110 hover:z-20 cursor-pointer"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(CARD_W / STRIP_W) * 100}%`,
        aspectRatio: `${CARD_W} / ${CARD_H}`,
        transform: `translate(-50%, -50%) rotate(${spec.rot}deg)`,
      }}
    >
      {/* Photo Frame: Width 80px, Height 92px, Colour #F5F0E8
          Exact Figma Drop Shadow: X: 0, Y: 3, Blur: 14, Spread: 0, #000000 22%
      */}
      <div
        className={`relative w-full h-full rounded-[2px] overflow-hidden ${
          spec.isSpecialFrame
            ? "bg-[#F5F0E8] border border-[#D4AF37]/70"
            : "bg-[#F5F0E8] border border-white/60"
        }`}
        style={{

          boxShadow: "0px 3px 14px 0px rgba(0, 0, 0, 0.22)",
        }}
      >
        {/* Image: Width 70px, Height 54px, Top 5px, Centered horizontally (Left 5px) */}
        <div
          className="absolute overflow-hidden bg-white rounded-[1px]"
          style={{
            top: `${(5 / CARD_H) * 100}%`,
            left: `${(5 / CARD_W) * 100}%`,
            width: `${(70 / CARD_W) * 100}%`,
            height: `${(54 / CARD_H) * 100}%`,
          }}
        >
          {spec.imageSrc && (
            <Image
              src={spec.imageSrc}
              alt={spec.label || "Children doodle"}
              fill
              sizes="(max-width: 768px) 70px, 90px"
              className="object-cover object-center"
            />
          )}
        </div>

        {/* Anonymous: Width 70px, Height 13px, Font Georgia 400 Regular 9px, Line height 9px, #71717A */}
        <div
          className="absolute flex items-center justify-center text-center"
          style={{
            bottom: `${(8 / CARD_H) * 100}%`,
            left: `${(5 / CARD_W) * 100}%`,
            width: `${(70 / CARD_W) * 100}%`,
            height: `${(13 / CARD_H) * 100}%`,
          }}
        >
          <span
            className="truncate select-none"
            style={{
              fontFamily: spec.isSpecialFrame
                ? "'Brush Script MT', cursive, Georgia, serif"
                : "Georgia, 'Times New Roman', serif",
              fontWeight: 400,
              fontSize: "clamp(6px, 0.725cqw, 9px)",
              lineHeight: "9px",
              letterSpacing: "0px",
              color: spec.isSpecialFrame ? "#8B5A2B" : "#71717A",
              textAlign: "center",
            }}
          >
            {spec.author || "Anonymous"}
          </span>
        </div>
      </div>
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
        <div
          className="relative w-full max-w-[1350px] mx-auto mt-4 sm:mt-6"
          style={{
            containerType: "inline-size",
            aspectRatio: `${STRIP_W} / ${STRIP_H}`,
          }}
          aria-label="Children's creative doodles gallery"
        >
          {CARDS.map((c, i) => (
            <DoodleCard key={i} spec={c} />
          ))}
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
