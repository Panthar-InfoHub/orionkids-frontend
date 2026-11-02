"use client";

import React, { useEffect, useState } from "react";

interface AnimatedHandPointerProps {
  position?: "top" | "bottom" | "left" | "right" | "center";
  label?: string;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function AnimatedHandPointer({
  position = "bottom",
  label,
  className = "",
}: AnimatedHandPointerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const positionStyles = {
    top: "-top-14 left-1/2 -translate-x-1/2 flex-col-reverse",
    bottom: "-bottom-14 left-1/2 -translate-x-1/2 flex-col",
    left: "-left-16 top-1/2 -translate-y-1/2 flex-row-reverse",
    right: "-right-16 top-1/2 -translate-y-1/2 flex-row",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col",
  }[position];

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`absolute z-40 pointer-events-none flex items-center justify-center gap-2 select-none ${positionStyles} ${className}`}
    >
      {/* Animated Floating Pointer Hand */}
      <div
        className={`text-3xl sm:text-4xl filter drop-shadow-[0_6px_12px_rgba(10,29,61,0.35)] transition-transform ${
          prefersReducedMotion ? "" : "animate-bounce"
        }`}
      >
        <span className="inline-block transform -rotate-12">👆</span>
      </div>

      {/* Optional Speech Pill */}
      {label && (
        <div
          className="px-3.5 py-1.5 rounded-full bg-[#0A1D3D] text-[#FFE066] border-2 border-[#FFE066] text-xs font-black shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95"
          style={{ fontFamily: JAKARTA }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
