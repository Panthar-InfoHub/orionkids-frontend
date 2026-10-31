"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import confetti from "canvas-confetti";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

// OrionKids logo
const LOGO_SRC = "/svg/Logo.svg";

/* ------------------------------------------------------------------ */
/*  Doodle wall with Polaroid cards from /public/svg/001.svg - 021.svg */
/* ------------------------------------------------------------------ */

type DoodleSpec = {
  src: string;
  x: number; // center x in 1400px coordinate space
  y: number; // center y in 300px coordinate space
  w: number; // display width in 1400px coordinate space
  h: number; // display height in 300px coordinate space
  zIndex: number;
  alt: string;
};

// Strip dimensions: Width 1440px, Height 345px for well-spaced, generous doodle cards with breathable gapping
const STRIP_W = 1440;
const STRIP_H = 345;

// High-visibility vector doodle cards with enlarged dimensions, balanced spatial distribution, and natural polaroid overlaps
const CARDS: DoodleSpec[] = [
  // 1. Star doodle (rotated 90deg sideways, lower-left flush)
  { src: "/svg/021.svg", x: 88, y: 242, w: 175, h: 136, zIndex: 1, alt: "Star doodle" },
  // 2. Smiley face with flower bouquet (bottom row)
  { src: "/svg/019.svg", x: 212, y: 236, w: 156, h: 150, zIndex: 2, alt: "Smiley and flower bouquet doodle" },
  // 3. Tilted swirl diamond (upper floating between cards 2 & 5)
  { src: "/svg/018.svg", x: 260, y: 104, w: 205, h: 178, zIndex: 1, alt: "Abstract swirl doodle" },
  // 4. Boat / hat with red cross X (top row)
  { src: "/svg/017.svg", x: 402, y: 106, w: 156, h: 172, zIndex: 1, alt: "Red cross boat doodle" },
  // 5. Tent / triangle doodle (bottom row below card 4)
  { src: "/svg/020.svg", x: 338, y: 238, w: 156, h: 158, zIndex: 2, alt: "Tent doodle" },
  // 6. YOCHI stick figures family (bottom row)
  { src: "/svg/015.svg", x: 466, y: 238, w: 156, h: 158, zIndex: 2, alt: "YOCHI family stick figures doodle" },
  // 7. YO! text doodle (top row)
  { src: "/svg/013.svg", x: 572, y: 110, w: 156, h: 138, zIndex: 1, alt: "YO! doodle" },
  // 8. Walking smiling heart (bottom row below card 7)
  { src: "/svg/016.svg", x: 596, y: 238, w: 156, h: 158, zIndex: 2, alt: "Walking smiling heart doodle" },
  // 9. Hello :) doodle (rotated 90deg sideways, bottom row)
  { src: "/svg/012.svg", x: 742, y: 246, w: 175, h: 136, zIndex: 2, alt: "Hello smiley doodle" },
  // 10. WOW <3 TEH (top row next to flower)
  { src: "/svg/007.svg", x: 878, y: 108, w: 158, h: 174, zIndex: 3, alt: "WOW love doodle" },
  // 11. "hi, thanks for inspi" (bottom row below card 10)
  { src: "/svg/011.svg", x: 874, y: 238, w: 156, h: 158, zIndex: 2, alt: "Inspirational thank you doodle" },
  // 12. Circle / stone outline (bottom row next to card 11)
  { src: "/svg/010.svg", x: 1014, y: 238, w: 156, h: 158, zIndex: 2, alt: "Stone outline doodle" },
  // 13. "SAYA LAWAT AKAN Anonymous" (top row, slightly tilted)
  { src: "/svg/006.svg", x: 1012, y: 108, w: 164, h: 178, zIndex: 2, alt: "Saya Lawat doodle" },
  // 14. "Gilan" signature (top row, tilted)
  { src: "/svg/005.svg", x: 1128, y: 118, w: 172, h: 184, zIndex: 4, alt: "Gilan signature doodle" },
  // 15. Red heart doodle (top row next to Gilan)
  { src: "/svg/004.svg", x: 1248, y: 118, w: 156, h: 172, zIndex: 3, alt: "Red heart doodle" },
  // 16. "Bilal" signature (rotated 90deg sideways, bottom row)
  { src: "/svg/009.svg", x: 1204, y: 246, w: 175, h: 136, zIndex: 2, alt: "Bilal signature doodle" },
  // 17. Tilted butterfly diamond (floating between cards 15 and 18)
  { src: "/svg/001.svg", x: 1358, y: 96, w: 205, h: 205, zIndex: 3, alt: "Tilted butterfly doodle" },
  // 18. "Fener Bahçe" doodle (bottom row far right)
  { src: "/svg/002.svg", x: 1356, y: 238, w: 150, h: 170, zIndex: 2, alt: "Fener Bahçe doodle" },
];

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
/*  Physics & Stagger profiles for realistic paper-dropping animation   */
/* ------------------------------------------------------------------ */

interface CardPhysics {
  startY: number; // initial drop height (negative px)
  driftX: number; // in-flight horizontal drift (px)
  startRot: number; // in-flight tumbling rotation (deg)
  dropDuration: number; // gravitational fall duration (seconds)
  bounceHeight: number; // surface impact rebound (negative px)
  bounceRot: number; // impact rebound wobble angle (deg)
  hoverTilt: number; // playful tilt angle when hovered (deg)
  delay: number; // natural staggered sequence delay (seconds)
}

const DESKTOP_PHYSICS: CardPhysics[] = [
  // 0. Star doodle (x: 88, y: 242)
  { startY: -460, driftX: -20, startRot: 18, dropDuration: 0.60, bounceHeight: -14, bounceRot: -3, hoverTilt: 4, delay: 0.18 },
  // 1. Smiley bouquet (x: 212, y: 236)
  { startY: -440, driftX: 18, startRot: -16, dropDuration: 0.58, bounceHeight: -12, bounceRot: 2, hoverTilt: -3, delay: 0.42 },
  // 2. Swirl diamond (x: 260, y: 104)
  { startY: -380, driftX: -15, startRot: 24, dropDuration: 0.54, bounceHeight: -16, bounceRot: -4, hoverTilt: 5, delay: 0.05 },
  // 3. Red cross boat (x: 402, y: 106)
  { startY: -390, driftX: 22, startRot: -20, dropDuration: 0.58, bounceHeight: -13, bounceRot: 3, hoverTilt: -4, delay: 0.28 },
  // 4. Tent doodle (x: 338, y: 238)
  { startY: -470, driftX: -16, startRot: 14, dropDuration: 0.62, bounceHeight: -15, bounceRot: -2, hoverTilt: 3, delay: 0.50 },
  // 5. YOCHI family (x: 466, y: 238)
  { startY: -450, driftX: 14, startRot: -18, dropDuration: 0.58, bounceHeight: -11, bounceRot: 2.5, hoverTilt: -3, delay: 0.35 },
  // 6. YO! text (x: 572, y: 110)
  { startY: -380, driftX: -24, startRot: 22, dropDuration: 0.55, bounceHeight: -15, bounceRot: -3.5, hoverTilt: 4, delay: 0.12 },
  // 7. Walking smiling heart (x: 596, y: 238)
  { startY: -480, driftX: 20, startRot: -15, dropDuration: 0.62, bounceHeight: -14, bounceRot: 2, hoverTilt: -4, delay: 0.62 },
  // 8. Hello :) (x: 742, y: 246)
  { startY: -460, driftX: -18, startRot: 16, dropDuration: 0.60, bounceHeight: -12, bounceRot: -2.5, hoverTilt: 3, delay: 0.22 },
  // 9. WOW <3 TEH (x: 878, y: 108)
  { startY: -390, driftX: 16, startRot: -22, dropDuration: 0.56, bounceHeight: -16, bounceRot: 3.5, hoverTilt: -5, delay: 0.08 },
  // 10. hi thanks for inspi (x: 874, y: 238)
  { startY: -470, driftX: -22, startRot: 19, dropDuration: 0.64, bounceHeight: -13, bounceRot: -3, hoverTilt: 4, delay: 0.55 },
  // 11. Circle outline (x: 1014, y: 238)
  { startY: -450, driftX: 15, startRot: -14, dropDuration: 0.57, bounceHeight: -11, bounceRot: 2, hoverTilt: -3, delay: 0.70 },
  // 12. Saya Lawat (x: 1004, y: 108)
  { startY: -390, driftX: -18, startRot: 21, dropDuration: 0.55, bounceHeight: -15, bounceRot: -3, hoverTilt: 4, delay: 0.32 },
  // 13. Gilan signature (x: 1128, y: 118)
  { startY: -410, driftX: 25, startRot: -25, dropDuration: 0.60, bounceHeight: -17, bounceRot: 4, hoverTilt: -5, delay: 0.15 },
  // 14. Red heart doodle (x: 1248, y: 118)
  { startY: -380, driftX: -14, startRot: 17, dropDuration: 0.54, bounceHeight: -14, bounceRot: -2.5, hoverTilt: 3, delay: 0.48 },
  // 15. Bilal signature (x: 1204, y: 246)
  { startY: -470, driftX: 19, startRot: -19, dropDuration: 0.62, bounceHeight: -12, bounceRot: 3, hoverTilt: -4, delay: 0.66 },
  // 16. Tilted butterfly (x: 1358, y: 96)
  { startY: -380, driftX: -26, startRot: 26, dropDuration: 0.56, bounceHeight: -18, bounceRot: -4.5, hoverTilt: 5, delay: 0.25 },
  // 17. Fener Bahçe (x: 1356, y: 238)
  { startY: -450, driftX: 16, startRot: -16, dropDuration: 0.59, bounceHeight: -13, bounceRot: 2.5, hoverTilt: -3, delay: 0.76 },
];

const MOBILE_PHYSICS: CardPhysics[] = [
  { startY: -280, driftX: -12, startRot: 14, dropDuration: 0.52, bounceHeight: -10, bounceRot: -2, hoverTilt: 3, delay: 0.05 },
  { startY: -310, driftX: 10, startRot: -12, dropDuration: 0.54, bounceHeight: -8, bounceRot: 2, hoverTilt: -3, delay: 0.18 },
  { startY: -260, driftX: -14, startRot: 16, dropDuration: 0.50, bounceHeight: -11, bounceRot: -3, hoverTilt: 4, delay: 0.10 },
  { startY: -290, driftX: 12, startRot: -14, dropDuration: 0.53, bounceHeight: -9, bounceRot: 2, hoverTilt: -3, delay: 0.28 },
  { startY: -320, driftX: -10, startRot: 12, dropDuration: 0.55, bounceHeight: -10, bounceRot: -2, hoverTilt: 3, delay: 0.35 },
  { startY: -270, driftX: 14, startRot: -15, dropDuration: 0.51, bounceHeight: -8, bounceRot: 2.5, hoverTilt: -3, delay: 0.22 },
  { startY: -300, driftX: -12, startRot: 15, dropDuration: 0.54, bounceHeight: -10, bounceRot: -2.5, hoverTilt: 3, delay: 0.42 },
  { startY: -280, driftX: 10, startRot: -11, dropDuration: 0.52, bounceHeight: -9, bounceRot: 2, hoverTilt: -3, delay: 0.48 },
];

function DoodleCard({
  spec,
  index,
  cardRef,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  onClick,
}: {
  spec: DoodleSpec;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onClick: () => void;
}) {
  return (
    // Outer positioning wrapper: Strictly handles CSS coordinates and center alignment
    <div
      className="absolute pointer-events-auto select-none"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(spec.w / STRIP_W) * 100}%`,
        height: `${(spec.h / STRIP_H) * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: spec.zIndex,
      }}
    >
      {/* Inner animated element: Target of GSAP falling, bouncing, settling, hover & click */}
      <div
        ref={cardRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
        role={index === 0 ? "button" : undefined}
        tabIndex={index === 0 ? 0 : undefined}
        aria-label={index === 0 ? "Tap the star doodle to start your adventure" : spec.alt}
        onKeyDown={(e) => {
          if (index === 0 && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick();
          }
        }}
        className="w-full h-full cursor-pointer filter hover:drop-shadow-md select-none will-change-transform"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTouchCallout: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spec.src}
          alt={spec.alt}
          width={spec.w}
          height={spec.h}
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          }}
          loading="eager"
          decoding="async"
        />
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
/*  Sticky Layered Reveal Footer with Falling Doodle Cards             */
/* ------------------------------------------------------------------ */

export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State & Stable Refs
  const [isFlowMode, setIsFlowMode] = useState<boolean>(false);
  const isFlowModeRef = useRef(false);
  const isReducedMotionRef = useRef(false);
  const cardsLandedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const tickingRef = useRef(false);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const desktopTouchTimer = useRef<NodeJS.Timeout | null>(null);
  const mobileTouchTimer = useRef<NodeJS.Timeout | null>(null);

  // Instantly place cards at resting layout
  const resetCardsToResting = useCallback(() => {
    desktopCardsRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        visibility: "visible",
      });
      el.dataset.landed = "true";
    });
    mobileCardsRef.current.forEach((el, i) => {
      if (!el) return;
      const baseRot = parseFloat(MOBILE_CARD_ROTATIONS[i] || "0");
      gsap.set(el, {
        x: 0,
        y: 0,
        rotation: baseRot,
        scale: 1,
        opacity: 1,
        visibility: "visible",
      });
      el.dataset.landed = "true";
    });
  }, []);

  // Play realistic paper-dropping animation
  const playFallingAnimation = useCallback(() => {
    if (cardsLandedRef.current || isAnimatingRef.current) return;

    if (isReducedMotionRef.current) {
      resetCardsToResting();
      cardsLandedRef.current = true;
      return;
    }

    isAnimatingRef.current = true;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
    }

    const masterTl = gsap.timeline({
      delay: 0.1, // Prompt start as footer begins to be unveiled
      onComplete: () => {
        cardsLandedRef.current = true;
        isAnimatingRef.current = false;
        resetCardsToResting();
      },
    });
    masterTimelineRef.current = masterTl;

    if (isDesktop) {
      const containerH = desktopContainerRef.current?.offsetHeight || 300;
      const responsiveScale = Math.min(1.15, Math.max(0.55, containerH / 300));

      desktopCardsRef.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const physics = DESKTOP_PHYSICS[i];
        if (!physics) return;

        const scaledStartY = physics.startY * responsiveScale;
        const scaledBounceH = physics.bounceHeight * responsiveScale;
        const scaledDriftX = physics.driftX * responsiveScale;

        // Smooth drop animation on the inner element
        const cardTl = gsap.timeline();

        // 1. Initial fall from airborne position with drift & tumbling rotation
        cardTl.fromTo(
          cardEl,
          {
            y: scaledStartY,
            x: scaledDriftX,
            rotation: physics.startRot,
            opacity: 0,
            visibility: "visible",
            scale: 1.05,
          },
          {
            y: 0,
            x: scaledDriftX * 0.15,
            rotation: physics.bounceRot * 1.3,
            scale: 1.0,
            opacity: 1,
            duration: physics.dropDuration,
            ease: "power2.in",
          }
        );

        // 2. Surface impact rebound bounce
        cardTl.to(cardEl, {
          y: scaledBounceH,
          x: 0,
          rotation: physics.bounceRot,
          duration: 0.18,
          ease: "power2.out",
        });

        // 3. Soft settle into exact resting position
        cardTl.to(cardEl, {
          y: 0,
          rotation: 0,
          duration: 0.22,
          ease: "power1.inOut",
          onComplete: () => {
            cardEl.dataset.landed = "true";
          },
        });

        masterTl.add(cardTl, physics.delay);
      });
    } else {
      // Mobile falling animation (< 768px)
      const containerW =
        mobileContainerRef.current?.offsetWidth ||
        (typeof window !== "undefined" ? window.innerWidth : 390);
      const mobileScale = Math.min(1.1, Math.max(0.65, containerW / 390));

      mobileCardsRef.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        const physics = MOBILE_PHYSICS[i];
        if (!physics) return;
        const baseRot = parseFloat(MOBILE_CARD_ROTATIONS[i] || "0");

        const scaledStartY = physics.startY * mobileScale;
        const scaledBounceH = physics.bounceHeight * mobileScale;
        const scaledDriftX = physics.driftX * mobileScale;

        const cardTl = gsap.timeline();

        cardTl.fromTo(
          cardEl,
          {
            y: scaledStartY,
            x: scaledDriftX,
            rotation: baseRot + physics.startRot,
            opacity: 0,
            visibility: "visible",
            scale: 1.04,
          },
          {
            y: 0,
            x: scaledDriftX * 0.15,
            rotation: baseRot + physics.bounceRot * 1.3,
            scale: 1.0,
            opacity: 1,
            duration: physics.dropDuration,
            ease: "power2.in",
          }
        );

        cardTl.to(cardEl, {
          y: scaledBounceH,
          x: 0,
          rotation: baseRot + physics.bounceRot,
          duration: 0.16,
          ease: "power2.out",
        });

        cardTl.to(cardEl, {
          y: 0,
          rotation: baseRot,
          duration: 0.20,
          ease: "power1.inOut",
          onComplete: () => {
            cardEl.dataset.landed = "true";
          },
        });

        masterTl.add(cardTl, physics.delay);
      });
    }
  }, [resetCardsToResting]);

  // Trigger conceal & reset when user scrolls up away from footer
  const triggerConceal = useCallback(() => {
    if (cardsLandedRef.current || isAnimatingRef.current) {
      if (masterTimelineRef.current) {
        masterTimelineRef.current.kill();
        masterTimelineRef.current = null;
      }
      cardsLandedRef.current = false;
      isAnimatingRef.current = false;
      desktopCardsRef.current.forEach((el) => {
        if (el) el.dataset.landed = "false";
      });
      mobileCardsRef.current.forEach((el) => {
        if (el) el.dataset.landed = "false";
      });
    }
  }, []);

  // Update scroll positioning, accessibility inert state, and animation triggers
  const updateScrollAndReveal = useCallback(() => {
    if (typeof window === "undefined") return;

    const footer = footerRef.current;
    if (!footer) return;

    const innerH = window.innerHeight;
    const fHeight = footer.offsetHeight;

    // Footer stays sticky beneath the sliding page curtain unless prefers-reduced-motion is active
    const flow = isReducedMotionRef.current;
    if (flow !== isFlowModeRef.current) {
      isFlowModeRef.current = flow;
      setIsFlowMode(flow);
    }

    // Locate the page curtain element sitting above the footer
    const curtain =
      document.getElementById("page-content-curtain") ||
      (footer.previousElementSibling as HTMLElement | null);

    const docHeight = document.documentElement.scrollHeight;
    const currentScrollY = window.scrollY || window.pageYOffset;

    // Edge case: Short document where footer is immediately visible
    if (docHeight <= innerH + 40) {
      if ("inert" in footer) {
        (footer as HTMLElement & { inert: boolean }).inert = false;
      }
      playFallingAnimation();
      return;
    }

    if (!curtain) {
      if ("inert" in footer) {
        (footer as HTMLElement & { inert: boolean }).inert = false;
      }
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top <= innerH) {
        playFallingAnimation();
      } else if (footerRect.top > innerH + 200) {
        triggerConceal();
      }
      return;
    }

    const curtainRect = curtain.getBoundingClientRect();
    const paperEdge = curtainRect.bottom;
    const galleryTop = footer.getBoundingClientRect().top;

    // 1. Accessibility: Footer is inert only when it is strictly hidden under the paper curtain
    const isInert = !flow && paperEdge > galleryTop + 2;
    if ("inert" in footer) {
      (footer as HTMLElement & { inert: boolean }).inert = isInert;
    }

    // 2. Trigger doodle animation as the curtain begins to reveal the footer
    const isNearBottom = currentScrollY + innerH >= docHeight - 80;
    const isRevealing = flow ? galleryTop <= innerH : paperEdge <= innerH + 120;

    if (isRevealing || isNearBottom) {
      playFallingAnimation();
    } else if (flow ? galleryTop > innerH + 150 : paperEdge > innerH + 250) {
      // User scrolled up away from footer: reset so that when they scroll down again, the drop animation replays!
      triggerConceal();
    }
  }, [playFallingAnimation, triggerConceal]);

  // Setup lifecycle, observers, and scroll listener
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = reducedQuery.matches;

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        resetCardsToResting();
        cardsLandedRef.current = true;
      }
    };
    reducedQuery.addEventListener("change", handleReducedMotionChange);

    // Initial check on mount
    updateScrollAndReveal();

    // 1. ResizeObserver to keep scroll measurements in sync with DOM changes
    const resizeObserver = new ResizeObserver(() => {
      updateScrollAndReveal();
    });
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }
    const curtain = document.getElementById("page-content-curtain");
    if (curtain) {
      resizeObserver.observe(curtain);
    }

    // 2. IntersectionObserver for reliable viewport entry/exit
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playFallingAnimation();
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Footer scrolled away up out of viewport
            triggerConceal();
          }
        });
      },
      { threshold: [0.05, 0.2] }
    );
    if (footerRef.current) intersectionObserver.observe(footerRef.current);
    if (desktopContainerRef.current) intersectionObserver.observe(desktopContainerRef.current);
    if (mobileContainerRef.current) intersectionObserver.observe(mobileContainerRef.current);

    // 3. Passive, RAF-debounced scroll listener
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          updateScrollAndReveal();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    const handleResize = () => {
      updateScrollAndReveal();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateScrollAndReveal);
    }

    // 4. Safety fallback: if footer ever enters viewport, guarantee cards are triggered and visible
    const safetyCheck = setTimeout(() => {
      const footer = footerRef.current;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !cardsLandedRef.current && !isAnimatingRef.current) {
          playFallingAnimation();
        }
      }
    }, 2000);

    return () => {
      clearTimeout(safetyCheck);
      reducedQuery.removeEventListener("change", handleReducedMotionChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (desktopTouchTimer.current) clearTimeout(desktopTouchTimer.current);
      if (mobileTouchTimer.current) clearTimeout(mobileTouchTimer.current);
      if (masterTimelineRef.current) {
        masterTimelineRef.current.kill();
        masterTimelineRef.current = null;
      }
      // Reset animating flag on unmount to prevent blocking on remount in React Strict Mode
      isAnimatingRef.current = false;
      if (!cardsLandedRef.current) {
        resetCardsToResting();
      }
    };
  }, [resetCardsToResting, updateScrollAndReveal, playFallingAnimation, triggerConceal]);

  // Subtle interactive hover & touch effects after cards have settled
  const handleDesktopEnter = (index: number) => {
    const el = desktopCardsRef.current[index];
    if (!el || el.dataset.landed !== "true") return;
    const physics = DESKTOP_PHYSICS[index];
    gsap.to(el, {
      scale: 1.08,
      rotation: physics?.hoverTilt || 4,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleDesktopLeave = (index: number) => {
    const el = desktopCardsRef.current[index];
    if (!el || el.dataset.landed !== "true") return;
    gsap.to(el, {
      scale: 1,
      rotation: 0,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleDesktopTouchStart = (index: number) => {
    if (desktopTouchTimer.current) clearTimeout(desktopTouchTimer.current);
    handleDesktopEnter(index);
  };

  const handleDesktopTouchEnd = (index: number) => {
    if (desktopTouchTimer.current) clearTimeout(desktopTouchTimer.current);
    desktopTouchTimer.current = setTimeout(() => {
      handleDesktopLeave(index);
    }, 350);
  };

  const handleMobileEnter = (index: number) => {
    const el = mobileCardsRef.current[index];
    if (!el || el.dataset.landed !== "true") return;
    const physics = MOBILE_PHYSICS[index];
    const baseRot = parseFloat(MOBILE_CARD_ROTATIONS[index] || "0");
    gsap.to(el, {
      scale: 1.08,
      rotation: baseRot + (physics?.hoverTilt || 3),
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMobileLeave = (index: number) => {
    const el = mobileCardsRef.current[index];
    if (!el || el.dataset.landed !== "true") return;
    const baseRot = parseFloat(MOBILE_CARD_ROTATIONS[index] || "0");
    gsap.to(el, {
      scale: 1,
      rotation: baseRot,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMobileTouchStart = (index: number) => {
    if (mobileTouchTimer.current) clearTimeout(mobileTouchTimer.current);
    handleMobileEnter(index);
  };

  const handleMobileTouchEnd = (index: number) => {
    if (mobileTouchTimer.current) clearTimeout(mobileTouchTimer.current);
    mobileTouchTimer.current = setTimeout(() => {
      handleMobileLeave(index);
    }, 350);
  };

  // Click interaction: Tap the star doodle (card 0) to celebrate with confetti
  const handleCardClick = (index: number, isStar: boolean) => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    const el = isDesktop ? desktopCardsRef.current[index] : mobileCardsRef.current[index];
    if (el) {
      gsap.to(el, {
        scale: 1.2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }

    if (isStar) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.85 },
          colors: ["#FFE15D", "#48CAE4", "#FF6B6B", "#06D6A0", "#B5179E"],
        });
      } catch {
        // Safe fallback if canvas is restricted
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer-section"
      onFocusCapture={() => {
        if ("inert" in (footerRef.current || {})) {
          (footerRef.current as HTMLElement & { inert: boolean }).inert = false;
        }
      }}
      className={`w-full bg-[#DAF5E9] text-[#0A1D3D] select-none pt-7 sm:pt-8 scroll-mt-16 ${
        isFlowMode
          ? "relative z-10 orion-footer-flow"
          : "sticky bottom-0 left-0 z-0 orion-footer-sticky"
      }`}
      style={{
        position: isFlowMode ? "relative" : "sticky",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: isFlowMode ? 10 : 0,
        paddingBottom:
          "max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))",
        boxShadow: "inset 0 10px 24px -10px rgba(10, 29, 61, 0.08)",
      }}
    >
      {/* Top subtle border sheet line */}
      <div
        className="w-full h-px bg-[#0A1D3D]/10 mb-2 pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[44px]">
        {/* ================= TOP: Tagline + Links ================= */}
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

            {/* Headline */}
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

          {/* Right: Clean 3-column links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-start gap-6 sm:gap-10 lg:gap-12 pt-1 lg:pt-2 shrink-0"
            style={{ fontFamily: INTER }}
          >
            {/* Column 1: Main Pages */}
            <div className="flex flex-col space-y-2 sm:space-y-2.5 text-[#0A1D3D] text-xs sm:text-[13px] font-bold tracking-tight">
              <Link
                href="/our-approach"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                OUR APPROACH
              </Link>
              <Link
                href="/for-schools"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                FOR SCHOOL
              </Link>
              <Link
                href="/for-parents"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                FOR PARENTS
              </Link>
              <Link
                href="/about-us"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                ABOUT US
              </Link>
              <Link
                href="/blog"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                BLOGS
              </Link>
              <Link
                href="/printables"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                PRINTABLES
              </Link>
            </div>

            {/* Column 2: Support & Legal */}
            <div className="flex flex-col space-y-2 sm:space-y-2.5 text-[#0A1D3D] text-xs sm:text-[13px] font-bold tracking-tight">
              <Link
                href="#"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                HELP &amp; SUPPORT
              </Link>
              <Link
                href="#"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                CONTACT US
              </Link>
              <Link
                href="#"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                PRIVACY POLICY
              </Link>
              <Link
                href="#"
                className="hover:text-[#00BCD4] transition-colors whitespace-nowrap uppercase cursor-pointer"
              >
                TERMS &amp; CONDITIONS
              </Link>
            </div>

            {/* Column 3: Social / External Links with ↗ */}
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
        {/* Desktop & iPad (>=768px): Exact collage layout using CARDS coordinates with falling animation */}
        <div className="hidden md:block relative w-full overflow-visible pb-2 pt-3 sm:pt-4 select-none">
          <div
            ref={desktopContainerRef}
            className="relative w-full max-w-[1440px] mx-auto overflow-visible"
            style={{
              aspectRatio: `${STRIP_W} / ${STRIP_H}`,
              minHeight: "260px",
            }}
            aria-label="Children's creative doodles gallery"
          >
            {CARDS.map((c, i) => (
              <DoodleCard
                key={i}
                spec={c}
                index={i}
                cardRef={(el) => {
                  desktopCardsRef.current[i] = el;
                }}
                onMouseEnter={() => handleDesktopEnter(i)}
                onMouseLeave={() => handleDesktopLeave(i)}
                onTouchStart={() => handleDesktopTouchStart(i)}
                onTouchEnd={() => handleDesktopTouchEnd(i)}
                onClick={() => handleCardClick(i, i === 0)}
              />
            ))}
          </div>
        </div>

        {/* iPhone & Mobile (<768px): Centered wrapping flex layout with no horizontal overflow */}
        <div
          ref={mobileContainerRef}
          className="block md:hidden relative w-full overflow-visible pb-3 pt-3 select-none"
        >
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 max-w-[680px] mx-auto"
            aria-label="Children's creative doodles gallery mobile"
          >
            {CARDS.slice(0, 8).map((card, i) => (
              <div
                key={i}
                className="relative shrink-0 select-none block"
                style={{
                  width: "clamp(76px, 22vw, 126px)",
                  aspectRatio: `${card.w} / ${card.h}`,
                }}
              >
                <div
                  ref={(el) => {
                    mobileCardsRef.current[i] = el;
                  }}
                  onClick={() => handleCardClick(i, i === 0)}
                  onMouseEnter={() => handleMobileEnter(i)}
                  onMouseLeave={() => handleMobileLeave(i)}
                  onTouchStart={() => handleMobileTouchStart(i)}
                  onTouchEnd={() => handleMobileTouchEnd(i)}
                  role={i === 0 ? "button" : undefined}
                  tabIndex={i === 0 ? 0 : undefined}
                  aria-label={
                    i === 0
                      ? "Tap the star doodle to start your adventure"
                      : card.alt
                  }
                  className="w-full h-full cursor-pointer select-none filter hover:drop-shadow-md will-change-transform block"
                  style={{
                    transform: `rotate(${MOBILE_CARD_ROTATIONS[i] || "0deg"})`,
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitTouchCallout: "none",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    width={card.w}
                    height={card.h}
                    className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs"
                    style={{
                      WebkitUserSelect: "none",
                      userSelect: "none",
                      WebkitTouchCallout: "none",
                    }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= LEGAL ROW ================= */}
        <div
          className="mt-6 pt-4 border-t border-[#F0E6FF] flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-[#0A1D3D] font-medium text-center md:text-left"
          style={{ fontFamily: INTER }}
        >
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd.</span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[#526176]">
            <Link href="#" className="hover:text-[#00BCD4] transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="#" className="hover:text-[#00BCD4] transition-colors cursor-pointer">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="#" className="hover:text-[#00BCD4] transition-colors cursor-pointer">
              Help &amp; Support
            </Link>
            <span aria-hidden="true">•</span>
            <Link href="#" className="hover:text-[#00BCD4] transition-colors cursor-pointer">
              Contact Us
            </Link>
          </div>
          <span>Design &amp; Development by PantharInfoHub Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
