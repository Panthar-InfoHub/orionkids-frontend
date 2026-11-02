"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

interface TutorialReplayButtonProps {
  onReplayTutorial?: () => void;
  onClick?: () => void;
  className?: string;
  label?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function TutorialReplayButton({
  onReplayTutorial,
  onClick,
  className = "",
  label = "How to Play",
}: TutorialReplayButtonProps) {
  const handleClick = onClick || onReplayTutorial;
  return (
    <button
      type="button"
      onClick={handleClick}
      title="View animated game tutorial"
      aria-label="View tutorial guide"
      className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/90 hover:bg-white text-[#0A1D3D] border border-slate-200 shadow-xs text-[11px] font-extrabold transition-all cursor-pointer hover:border-[#0A1D3D] active:scale-95 ${className}`}
      style={{ fontFamily: JAKARTA }}
    >
      <HelpCircle className="w-3.5 h-3.5 text-[#0A1D3D]" />
      <span>{label}</span>
    </button>
  );
}
