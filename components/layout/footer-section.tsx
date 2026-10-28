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
  // 10. WOW <3 TEH (top row next to flower)
  { src: "/svg/007.svg", x: 800, y: 92, w: 140, h: 154, zIndex: 2, alt: "WOW love doodle" },
  // 11. "hi, thanks for inspi" (bottom row below card 10)
  { src: "/svg/011.svg", x: 795, y: 205, w: 138, h: 140, zIndex: 2, alt: "Inspirational thank you doodle" },
  // 12. Circle / stone outline (bottom row next to card 11)
  { src: "/svg/010.svg", x: 932, y: 205, w: 138, h: 140, zIndex: 2, alt: "Stone outline doodle" },
  // 13. "SAYA LAWAT AKAN jkw" (top row, slightly tilted)
  { src: "/svg/006.svg", x: 912, y: 92, w: 148, h: 160, zIndex: 3, alt: "Saya Lawat doodle" },
  // 14. "Gilan" signature (top row, tilted)
  { src: "/svg/005.svg", x: 1030, y: 104, w: 156, h: 166, zIndex: 4, alt: "Gilan signature doodle" },
  // 15. Red heart doodle (top row next to Gilan)
  { src: "/svg/004.svg", x: 1145, y: 104, w: 138, h: 152, zIndex: 3, alt: "Red heart doodle" },
  // 16. "Bilal" signature (rotated 90deg sideways, bottom row)
  { src: "/svg/009.svg", x: 1127, y: 215, w: 156, h: 122, zIndex: 2, alt: "Bilal signature doodle" },
  // 17. Tilted butterfly diamond (floating between cards 15 and 18)
  { src: "/svg/001.svg", x: 1272, y: 80, w: 185, h: 184, zIndex: 3, alt: "Tilted butterfly doodle" },
  // 18. "Fener Bahçe" doodle (bottom row far right)
  { src: "/svg/002.svg", x: 1290, y: 205, w: 134, h: 152, zIndex: 2, alt: "Fener Bahçe doodle" },
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
  // 0. Star doodle (x: 90, y: 215)
  { startY: -440, driftX: -20, startRot: 18, dropDuration: 0.60, bounceHeight: -14, bounceRot: -3, hoverTilt: 4, delay: 0.18 },
  // 1. Smiley bouquet (x: 200, y: 205)
  { startY: -420, driftX: 18, startRot: -16, dropDuration: 0.58, bounceHeight: -12, bounceRot: 2, hoverTilt: -3, delay: 0.42 },
  // 2. Swirl diamond (x: 230, y: 90)
  { startY: -340, driftX: -15, startRot: 24, dropDuration: 0.54, bounceHeight: -16, bounceRot: -4, hoverTilt: 5, delay: 0.05 },
  // 3. Red cross boat (x: 358, y: 92)
  { startY: -360, driftX: 22, startRot: -20, dropDuration: 0.58, bounceHeight: -13, bounceRot: 3, hoverTilt: -4, delay: 0.28 },
  // 4. Tent doodle (x: 315, y: 205)
  { startY: -450, driftX: -16, startRot: 14, dropDuration: 0.62, bounceHeight: -15, bounceRot: -2, hoverTilt: 3, delay: 0.50 },
  // 5. YOCHI family (x: 434, y: 205)
  { startY: -430, driftX: 14, startRot: -18, dropDuration: 0.58, bounceHeight: -11, bounceRot: 2.5, hoverTilt: -3, delay: 0.35 },
  // 6. YO! text (x: 520, y: 96)
  { startY: -350, driftX: -24, startRot: 22, dropDuration: 0.55, bounceHeight: -15, bounceRot: -3.5, hoverTilt: 4, delay: 0.12 },
  // 7. Walking smiling heart (x: 545, y: 205)
  { startY: -460, driftX: 20, startRot: -15, dropDuration: 0.62, bounceHeight: -14, bounceRot: 2, hoverTilt: -4, delay: 0.62 },
  // 8. Hello :) (x: 680, y: 215)
  { startY: -440, driftX: -18, startRot: 16, dropDuration: 0.60, bounceHeight: -12, bounceRot: -2.5, hoverTilt: 3, delay: 0.22 },
  // 9. WOW <3 TEH (x: 800, y: 92)
  { startY: -370, driftX: 16, startRot: -22, dropDuration: 0.56, bounceHeight: -16, bounceRot: 3.5, hoverTilt: -5, delay: 0.08 },
  // 10. hi thanks for inspi (x: 795, y: 205)
  { startY: -450, driftX: -22, startRot: 19, dropDuration: 0.64, bounceHeight: -13, bounceRot: -3, hoverTilt: 4, delay: 0.55 },
  // 11. Circle outline (x: 932, y: 205)
  { startY: -420, driftX: 15, startRot: -14, dropDuration: 0.57, bounceHeight: -11, bounceRot: 2, hoverTilt: -3, delay: 0.70 },
  // 12. Saya Lawat (x: 912, y: 92)
  { startY: -360, driftX: -18, startRot: 21, dropDuration: 0.55, bounceHeight: -15, bounceRot: -3, hoverTilt: 4, delay: 0.32 },
  // 13. Gilan signature (x: 1030, y: 104)
  { startY: -380, driftX: 25, startRot: -25, dropDuration: 0.60, bounceHeight: -17, bounceRot: 4, hoverTilt: -5, delay: 0.15 },
  // 14. Red heart doodle (x: 1145, y: 104)
  { startY: -350, driftX: -14, startRot: 17, dropDuration: 0.54, bounceHeight: -14, bounceRot: -2.5, hoverTilt: 3, delay: 0.48 },
  // 15. Bilal signature (x: 1127, y: 215)
  { startY: -460, driftX: 19, startRot: -19, dropDuration: 0.62, bounceHeight: -12, bounceRot: 3, hoverTilt: -4, delay: 0.66 },
  // 16. Tilted butterfly (x: 1272, y: 80)
  { startY: -340, driftX: -26, startRot: 26, dropDuration: 0.56, bounceHeight: -18, bounceRot: -4.5, hoverTilt: 5, delay: 0.25 },
  // 17. Fener Bahçe (x: 1290, y: 205)
  { startY: -430, driftX: 16, startRot: -16, dropDuration: 0.59, bounceHeight: -13, bounceRot: 2.5, hoverTilt: -3, delay: 0.76 },
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
      className="absolute cursor-pointer pointer-events-auto filter hover:drop-shadow-md select-none will-change-transform"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(spec.w / STRIP_W) * 100}%`,
        height: `${(spec.h / STRIP_H) * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: spec.zIndex,
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
        loading="lazy"
        decoding="async"
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
/*  Footer Component with Curtain Reveal & Falling Doodle Animation     */
/* ------------------------------------------------------------------ */

export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State machine values
  const [isRevealed, setIsRevealed] = useState(false);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Synchronous refs for smooth 60fps scroll tracking without race conditions
  const isRevealedRef = useRef(false);
  const cardsLandedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  const desktopTouchTimer = useRef<NodeJS.Timeout | null>(null);
  const mobileTouchTimer = useRef<NodeJS.Timeout | null>(null);

  // Trigger reveal transition (waits 2 seconds before whole footer appears)
  const triggerReveal = useCallback((immediate = false) => {
    if (isRevealedRef.current || revealTimerRef.current) return;

    if (immediate || isReducedMotion) {
      isRevealedRef.current = true;
      setIsRevealed(true);
      return;
    }

    revealTimerRef.current = setTimeout(() => {
      revealTimerRef.current = null;
      isRevealedRef.current = true;
      setIsRevealed(true);
    }, 80);
  }, [isReducedMotion]);

  // Trigger conceal transition (when user scrolls far back up the page)
  const triggerConceal = useCallback(() => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (!isRevealedRef.current) return;
    isRevealedRef.current = false;
    setIsRevealed(false);
    cardsLandedRef.current = false;
    isAnimatingRef.current = false;
    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
      masterTimelineRef.current = null;
    }
  }, []);

  // Play realistic paper-dropping animation
  const playFallingAnimation = useCallback(() => {
    if (cardsLandedRef.current || isAnimatingRef.current) return;

    if (isReducedMotion) {
      // Instantly position at resting layout with no motion
      desktopCardsRef.current.forEach((el) => {
        if (!el) return;
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          y: 0,
          x: 0,
          rotation: 0,
          autoAlpha: 1,
          scale: 1,
        });
        el.dataset.landed = "true";
      });
      mobileCardsRef.current.forEach((el, i) => {
        if (!el) return;
        const baseRot = parseFloat(MOBILE_CARD_ROTATIONS[i] || "0");
        gsap.set(el, {
          y: 0,
          x: 0,
          rotation: baseRot,
          autoAlpha: 1,
          scale: 1,
        });
        el.dataset.landed = "true";
      });
      cardsLandedRef.current = true;
      return;
    }

    isAnimatingRef.current = true;
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    if (masterTimelineRef.current) {
      masterTimelineRef.current.kill();
    }

    const masterTl = gsap.timeline({
      delay: 0.8,
      onComplete: () => {
        cardsLandedRef.current = true;
        isAnimatingRef.current = false;
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

        // 1. Initial airborne state
        gsap.set(cardEl, {
          xPercent: -50,
          yPercent: -50,
          y: scaledStartY,
          x: scaledDriftX,
          rotation: physics.startRot,
          autoAlpha: 0,
          scale: 1.05,
        });

        const cardTl = gsap.timeline();

        // 2. Gravitational fall with air resistance drift
        cardTl.to(cardEl, {
          y: 0,
          x: scaledDriftX * 0.15,
          rotation: physics.bounceRot * 1.3,
          scale: 1.0,
          autoAlpha: 1,
          duration: physics.dropDuration,
          ease: "power2.in",
        });

        // 3. Surface impact rebound bounce
        cardTl.to(cardEl, {
          y: scaledBounceH,
          x: 0,
          rotation: physics.bounceRot,
          duration: 0.18,
          ease: "power2.out",
        });

        // 4. Soft settle into exact final position
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

        gsap.set(cardEl, {
          y: scaledStartY,
          x: scaledDriftX,
          rotation: baseRot + physics.startRot,
          autoAlpha: 0,
          scale: 1.04,
        });

        const cardTl = gsap.timeline();

        cardTl.to(cardEl, {
          y: 0,
          x: scaledDriftX * 0.15,
          rotation: baseRot + physics.bounceRot * 1.3,
          scale: 1.0,
          autoAlpha: 1,
          duration: physics.dropDuration,
          ease: "power2.in",
        });

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
  }, [isReducedMotion]);

  // When revealed, play falling animation
  useEffect(() => {
    if (isRevealed) {
      playFallingAnimation();
    }
  }, [isRevealed, playFallingAnimation]);

  // Robust scroll state machine with hysteresis
  const updateScrollState = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentScrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Edge case 1: Page is shorter than the viewport
    if (docHeight <= viewportHeight + 60) {
      triggerReveal(true);
      return;
    }

    // Edge case 3 & 4: At or near absolute bottom of document
    const distanceToBottom = docHeight - (currentScrollY + viewportHeight);
    const isAtBottom = distanceToBottom <= 25;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    // Reveal zone: when top of footer enters the lower region of viewport
    const inRevealZone = rect.top <= viewportHeight + 60 && rect.bottom >= 0;

    const delta = currentScrollY - lastScrollYRef.current;
    const DIRECTION_THRESHOLD = 8; // px threshold to eliminate micro-jitter

    let direction: "up" | "down" | "none" = "none";
    if (delta > DIRECTION_THRESHOLD) {
      direction = "down";
    } else if (delta < -DIRECTION_THRESHOLD) {
      direction = "up";
    }

    if (Math.abs(delta) >= DIRECTION_THRESHOLD || isAtBottom || currentScrollY <= 10) {
      lastScrollYRef.current = currentScrollY;
    }

    if (isAtBottom) {
      // Bottom reached: smoothly reveal
      triggerReveal();
    } else if (inRevealZone) {
      if (direction === "up") {
        // Reached bottom area and scrolling upward: trigger smooth curtain reveal
        triggerReveal();
      }
      // If scrolling downward, keep concealed under main content until upward scroll or bottom
    } else {
      // Scrolled far back up into the page: smoothly conceal and reset
      if (rect.top > viewportHeight + 250) {
        triggerConceal();
      }
    }
  }, [triggerReveal, triggerConceal]);

  // Setup lifecycle, resize observer, and scroll listeners
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(reducedQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    reducedQuery.addEventListener("change", handleReducedMotionChange);

    setMounted(true);
    lastScrollYRef.current = window.scrollY || window.pageYOffset || 0;

    // Dynamically measure footer rendered height
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    // Passive, RAF-debounced scroll listener
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          updateScrollState();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeight, { passive: true });
    window.addEventListener("orientationchange", updateHeight, { passive: true });

    // Initial check on mount
    updateScrollState();

    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      reducedQuery.removeEventListener("change", handleReducedMotionChange);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
      if (desktopTouchTimer.current) clearTimeout(desktopTouchTimer.current);
      if (mobileTouchTimer.current) clearTimeout(mobileTouchTimer.current);
      if (masterTimelineRef.current) {
        masterTimelineRef.current.kill();
      }
    };
  }, [updateScrollState]);

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
    const el = desktopCardsRef.current[index] || mobileCardsRef.current[index];
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
    <div
      ref={containerRef}
      id="footer-reveal-container"
      className="relative w-full overflow-hidden select-none"
      style={{
        minHeight: footerHeight > 0 ? `${footerHeight}px` : "auto",
      }}
    >
      {/* Subtle top curtain depth shadow */}
      <div
        className="absolute top-0 left-0 right-0 h-4 pointer-events-none z-20 bg-gradient-to-b from-black/[0.05] to-transparent transition-opacity duration-300"
        style={{ opacity: isRevealed ? 1 : 0 }}
        aria-hidden="true"
      />

      <footer
        ref={footerRef}
        id="footer-section"
        onFocusCapture={() => triggerReveal(true)}
        className="w-full bg-[#DAF5E9] text-[#0A1D3D] select-none pt-7 sm:pt-8 scroll-mt-16 will-change-transform"
        style={{
          paddingBottom:
            "max(1.25rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))",
          transform:
            mounted && !isReducedMotion
              ? isRevealed
                ? "translateY(0%)"
                : "translateY(100%)"
              : "none",
          transition:
            mounted && !isReducedMotion
              ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          boxShadow: isRevealed
            ? "0 -12px 32px -8px rgba(10, 29, 61, 0.07)"
            : "none",
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
          {/* Desktop & iPad (>=768px): Exact collage layout using CARDS coordinates with falling animation */}
          <div className="hidden md:block relative w-full overflow-visible pb-2 pt-3 sm:pt-4 select-none">
            <div
              ref={desktopContainerRef}
              className="relative w-full max-w-[1400px] mx-auto overflow-visible"
              style={{
                aspectRatio: `${STRIP_W} / ${STRIP_H}`,
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
                  className="relative shrink-0 cursor-pointer select-none filter hover:drop-shadow-md will-change-transform block"
                  style={{
                    width: "clamp(64px, 20vw, 105px)",
                    aspectRatio: `${card.w} / ${card.h}`,
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
    </div>
  );
}
