"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedDartTargetProps {
  className?: string;
  style?: React.CSSProperties;
  /** Allow clicking the target to replay the entrance animation */
  interactiveReplay?: boolean;
}

/**
 * AnimatedDartTarget
 * 
 * High-performance, premium vector illustration and motion sequence:
 * - Stage A: Target entrance & initial scale-in
 * - Stage B: Diagonal dart entrance flight with natural easing & speed trail
 * - Stage C: Precision bullseye impact with target pulse, micro shaft-vibration, shockwave & sparks
 * - Stage D: Calming subtle floating idle loop
 * - Viewport intersection triggered (plays once when scrolled into view)
 * - Accessible: role="img", aria-label, <title>, <desc>
 * - prefers-reduced-motion respected
 */
export function AnimatedDartTarget({
  className = "",
  style,
  interactiveReplay = true,
}: AnimatedDartTargetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // Trigger animation when the element enters viewport
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Play once on entrance
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleReplay = () => {
    if (!interactiveReplay || reducedMotion) return;
    setInView(false);
    // Force a re-render tick to restart CSS animation keyframes
    requestAnimationFrame(() => {
      setReplayKey((k) => k + 1);
      setInView(true);
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{
        ...style,
        cursor: interactiveReplay ? "pointer" : "default",
      }}
      onClick={handleReplay}
      role="img"
      aria-label="Target with dart hitting bullseye"
      title={interactiveReplay ? "Click to replay animation" : undefined}
    >
      <div
        key={replayKey}
        className={`w-full h-full relative ${
          inView && !reducedMotion ? "dart-idle-float" : ""
        }`}
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Dart hitting a bullseye</title>
          <desc>
            Premium red and white target with turquoise-blue dart embedded in the center, on a transparent background.
          </desc>

          <defs>
            {/* Ambient drop shadow for high contrast on dark navy background */}
            <filter id="bullseye-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
            </filter>

            {/* Subtle glow filter for spark highlights */}
            <filter id="spark-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Red concentric ring gradient with rich warmth */}
            <radialGradient id="ring-red" cx="42%" cy="42%" r="58%">
              <stop offset="0%" stopColor="#FF4155" />
              <stop offset="68%" stopColor="#EF1A35" />
              <stop offset="100%" stopColor="#C70D24" />
            </radialGradient>

            {/* White concentric ring gradient with subtle highlights */}
            <radialGradient id="ring-white" cx="42%" cy="42%" r="58%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </radialGradient>

            {/* Metallic steel gradient for needle and collars */}
            <linearGradient id="dart-steel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="45%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Turquoise/cyan dart barrel gradient matching brand aesthetics */}
            <linearGradient id="dart-barrel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#00B4D8" />
              <stop offset="80%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Aerodynamic flight fins gradients */}
            <linearGradient id="fin-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="40%" stopColor="#00A8E8" />
              <stop offset="100%" stopColor="#0077B6" />
            </linearGradient>

            <linearGradient id="fin-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            <linearGradient id="fin-center" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            {/* Speed motion trail gradient */}
            <linearGradient id="motion-trail" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#7DD3FC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* ================= STAGE A: TARGET BASE ================= */}
          <g
            className={
              inView && !reducedMotion ? "dart-target-entrance" : ""
            }
          >
            <g
              className={
                inView && !reducedMotion ? "dart-target-pulse" : ""
              }
              filter="url(#bullseye-shadow)"
            >
              {/* Outer Red Ring (r=105) */}
              <circle cx="150" cy="170" r="105" fill="url(#ring-red)" />
              {/* White Ring 1 (r=84) */}
              <circle cx="150" cy="170" r="84" fill="url(#ring-white)" />
              {/* Red Ring 2 (r=63) */}
              <circle cx="150" cy="170" r="63" fill="url(#ring-red)" />
              {/* White Ring 2 (r=42) */}
              <circle cx="150" cy="170" r="42" fill="url(#ring-white)" />
              {/* Bullseye Center Red (r=21) */}
              <circle cx="150" cy="170" r="21" fill="url(#ring-red)" />

              {/* Cast Shadow under dart across target rings */}
              <path
                className={
                  inView && !reducedMotion ? "dart-shadow-in" : ""
                }
                d="M 150 170 L 195 240 L 250 205 L 175 160 Z"
                fill="#000000"
                opacity="0.22"
              />
            </g>
          </g>

          {/* ================= STAGE B: MOTION TRAIL ================= */}
          {inView && !reducedMotion && (
            <g className="dart-trail-anim" pointerEvents="none">
              <path
                d="M 320 62 L 150 170"
                stroke="url(#motion-trail)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="160"
              />
              <path
                d="M 305 45 L 165 135"
                stroke="url(#motion-trail)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="140"
                opacity="0.6"
              />
              <path
                d="M 335 75 L 190 170"
                stroke="url(#motion-trail)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="140"
                opacity="0.5"
              />
            </g>
          )}

          {/* ================= STAGE B & C: DART PROJECTILE ================= */}
          <g
            className={
              inView && !reducedMotion
                ? "dart-fly-in"
                : "dart-resting-state"
            }
          >
            {/* Soft contact shadow beneath dart body */}
            <path
              d="M 4 2 L 135 18 L 130 28 L 30 10 Z"
              fill="#000000"
              opacity="0.16"
            />

            {/* Sharp Needle Tip hitting dead-center (0, 0) */}
            <polygon points="0,0 24,-1.8 24,1.8" fill="url(#dart-steel)" />

            {/* Stepped Metallic Collar */}
            <path
              d="M 24 -2 L 28 -3.2 L 36 -3.2 L 36 3.2 L 28 3.2 L 24 2 Z"
              fill="url(#dart-steel)"
              stroke="#475569"
              strokeWidth="0.5"
            />
            <line x1="28" y1="-3" x2="28" y2="3" stroke="#CBD5E1" strokeWidth="0.8" />
            <line x1="32" y1="-3" x2="32" y2="3" stroke="#475569" strokeWidth="0.8" />

            {/* Contoured Aerodynamic Barrel */}
            <path
              d="M 36 -3.2 C 48 -6.5, 66 -6.5, 78 -3.8 L 78 3.8 C 66 6.5, 48 6.5, 36 3.2 Z"
              fill="url(#dart-barrel)"
            />

            {/* Sleek light reflection stripe & grip grooves */}
            <path
              d="M 37 -1.5 C 48 -4, 66 -4, 77 -2"
              stroke="#BAE6FD"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line x1="46" y1="-4.5" x2="46" y2="4.5" stroke="#0369A1" strokeWidth="0.8" opacity="0.6" />
            <line x1="54" y1="-5" x2="54" y2="5" stroke="#0369A1" strokeWidth="0.8" opacity="0.6" />
            <line x1="62" y1="-4.8" x2="62" y2="4.8" stroke="#0369A1" strokeWidth="0.8" opacity="0.6" />
            <line x1="70" y1="-4.2" x2="70" y2="4.2" stroke="#0369A1" strokeWidth="0.8" opacity="0.6" />

            {/* Tail Stem */}
            <rect x="78" y="-2.2" width="14" height="4.4" rx="0.8" fill="url(#dart-steel)" />

            {/* Back Perspective Fin (peeking from behind) */}
            <path
              d="M 90 -2 C 95 -6, 102 -9, 114 -9 C 122 -9, 128 -7, 131 -5 C 126 -3, 122 -2, 118 -2 Z"
              fill="#0369A1"
              opacity="0.9"
            />

            {/* Bottom Fin with aerodynamic contour */}
            <path
              d="M 88 1.8 C 96 9, 105 18, 114 18 C 124 18, 132 16, 135 12 C 129 9, 126 5, 122 1.8 Z"
              fill="url(#fin-bottom)"
            />
            <path
              d="M 92 3 C 100 9, 108 15, 116 15"
              stroke="#38BDF8"
              strokeWidth="0.9"
              fill="none"
              opacity="0.6"
            />

            {/* Top Fin with vibrant turquoise gradient */}
            <path
              d="M 88 -1.8 C 96 -11, 104 -22, 114 -22 C 124 -22, 133 -19, 137 -14 C 130 -11, 126 -6, 121 -1.8 Z"
              fill="url(#fin-top)"
            />
            {/* Top Fin Aerodynamic Highlight Edge */}
            <path
              d="M 92 -3 C 98 -10, 106 -18, 116 -18 C 124 -18, 130 -16, 133 -13"
              stroke="#BAE6FD"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Center Fin (3D perspective face) */}
            <path
              d="M 90 -1 C 99 -4.5, 115 -4.5, 128 -1.5 C 124 1.5, 115 3.5, 90 1.2 Z"
              fill="url(#fin-center)"
            />
            <path
              d="M 92 0 L 126 0"
              stroke="#E0F2FE"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Central Tail Cap */}
            <polygon points="121,-1.5 128,0 121,1.5" fill="#38BDF8" />
          </g>

          {/* ================= STAGE C: IMPACT EFFECTS ================= */}
          {inView && !reducedMotion && (
            <>
              {/* Radial shockwave wave */}
              <circle
                className="dart-impact-ring"
                cx="150"
                cy="170"
                r="8"
                fill="none"
                stroke="#FFD028"
                opacity="0"
                pointerEvents="none"
              />

              {/* 4 Tasteful Spark Starlets */}
              <g className="dart-sparks" filter="url(#spark-glow)" pointerEvents="none">
                <path
                  d="M 150 148 L 151 154 L 157 155 L 151 156 L 150 162 L 149 156 L 143 155 L 149 154 Z"
                  fill="#FFF59D"
                />
                <path
                  d="M 166 162 L 167 167 L 172 168 L 167 169 L 166 174 L 165 169 L 160 168 L 165 167 Z"
                  fill="#38BDF8"
                />
                <path
                  d="M 134 178 L 135 183 L 140 184 L 135 185 L 134 190 L 133 185 L 128 184 L 133 183 Z"
                  fill="#FFD028"
                />
                <path
                  d="M 152 192 L 153 196 L 157 197 L 153 198 L 152 202 L 151 198 L 147 197 L 151 196 Z"
                  fill="#FFFFFF"
                />
              </g>
            </>
          )}
        </svg>
      </div>

      {/* Scoped CSS Animation Keyframes */}
      <style jsx>{`
        /* Stage A: Target entrance */
        .dart-target-entrance {
          transform-origin: 150px 170px;
          animation: targetPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes targetPop {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Stage C: Target impact pulse */
        .dart-target-pulse {
          transform-origin: 150px 170px;
          animation: targetPulse 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both;
        }

        @keyframes targetPulse {
          0% {
            transform: scale(1);
          }
          40% {
            transform: scale(1.025);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Stage B: Dart flight entrance & impact settle wobble */
        .dart-fly-in {
          transform-origin: 0px 0px;
          animation: dartFlight 0.68s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        @keyframes dartFlight {
          0% {
            opacity: 0;
            transform: translate(320px, 64px) rotate(-32deg) scale(1.15);
          }
          15% {
            opacity: 1;
          }
          88% {
            transform: translate(150px, 170px) rotate(-32deg) scale(1);
          }
          92% {
            /* Shaft settle micro-vibration */
            transform: translate(150px, 170px) rotate(-29.5deg) scale(0.99);
          }
          96% {
            transform: translate(150px, 170px) rotate(-33deg) scale(1.005);
          }
          100% {
            transform: translate(150px, 170px) rotate(-32deg) scale(1);
          }
        }

        .dart-resting-state {
          transform-origin: 0px 0px;
          transform: translate(150px, 170px) rotate(-32deg);
        }

        /* Cast shadow entrance */
        .dart-shadow-in {
          animation: shadowIn 0.25s ease-out 0.88s both;
        }

        @keyframes shadowIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.22;
          }
        }

        /* Speed motion trail */
        .dart-trail-anim {
          animation: trailAnim 0.68s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        @keyframes trailAnim {
          0% {
            opacity: 0;
            stroke-dashoffset: 160;
          }
          20% {
            opacity: 0.75;
            stroke-dashoffset: 80;
          }
          75% {
            opacity: 0.5;
            stroke-dashoffset: 15;
          }
          88% {
            opacity: 0;
            stroke-dashoffset: 0;
          }
          100% {
            opacity: 0;
          }
        }

        /* Stage C: Impact ring */
        .dart-impact-ring {
          animation: ringAnim 0.38s ease-out 0.9s both;
        }

        @keyframes ringAnim {
          0% {
            r: 6px;
            opacity: 0.9;
            stroke-width: 3.5px;
          }
          100% {
            r: 38px;
            opacity: 0;
            stroke-width: 0.5px;
          }
        }

        /* Stage C: Spark burst */
        .dart-sparks {
          transform-origin: 150px 170px;
          animation: sparksBurst 0.35s ease-out 0.9s both;
        }

        @keyframes sparksBurst {
          0% {
            opacity: 1;
            transform: scale(0.3);
          }
          70% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }

        /* Stage D: Gentle floating idle movement */
        .dart-idle-float {
          animation: gentleFloat 4s ease-in-out 1.25s infinite alternate;
        }

        @keyframes gentleFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-3.5px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dart-target-entrance,
          .dart-target-pulse,
          .dart-fly-in,
          .dart-shadow-in,
          .dart-trail-anim,
          .dart-impact-ring,
          .dart-sparks,
          .dart-idle-float {
            animation: none !important;
          }
          .dart-fly-in {
            transform: translate(150px, 170px) rotate(-32deg) !important;
          }
          .dart-shadow-in {
            opacity: 0.22 !important;
          }
          .dart-trail-anim,
          .dart-impact-ring,
          .dart-sparks {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedDartTarget;
