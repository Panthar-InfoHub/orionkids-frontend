"use client";

import React, { useEffect, useState } from "react";

interface InteractiveHintProps {
  label?: string;
  isVisible: boolean;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  onDismiss?: () => void;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function InteractiveHint({
  label = "Tap here! ✨",
  isVisible,
  className = "",
  position = "bottom",
  onDismiss,
}: InteractiveHintProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  if (!isVisible) return null;

  const positionClasses = {
    top: "-top-12 left-1/2 -translate-x-1/2 flex-col-reverse",
    bottom: "-bottom-12 left-1/2 -translate-x-1/2 flex-col",
    left: "-left-14 top-1/2 -translate-y-1/2 flex-row-reverse",
    right: "-right-14 top-1/2 -translate-y-1/2 flex-row",
  }[position];

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onDismiss}
      className={`absolute z-30 pointer-events-none flex items-center justify-center gap-1.5 select-none ${positionClasses} ${className}`}
    >
      {/* Animated Pointer Hand */}
      <div
        className={`flex items-center justify-center text-2xl filter drop-shadow-[0_4px_8px_rgba(10,29,61,0.25)] ${
          prefersReducedMotion ? "" : "animate-bounce"
        }`}
        aria-hidden="true"
      >
        <span className="inline-block transform -rotate-12 transition-transform">
          👆
        </span>
      </div>

      {/* Speech Pill */}
      <div
        className="px-3 py-1 rounded-full bg-[#0A1D3D] text-[#FFE066] border border-[#FFE066] text-[11px] font-black tracking-wide shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-200"
        style={{ fontFamily: JAKARTA }}
      >
        <span>{label}</span>
      </div>
    </div>
  );
}
