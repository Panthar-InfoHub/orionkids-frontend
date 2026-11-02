"use client";

import React from "react";
import { RotateCcw } from "lucide-react";

interface PreviewReplayButtonProps {
  onReplay: () => void;
  className?: string;
  size?: "sm" | "md";
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function PreviewReplayButton({
  onReplay,
  className = "",
  size = "sm",
}: PreviewReplayButtonProps) {
  const isSm = size === "sm";

  return (
    <button
      type="button"
      onClick={onReplay}
      title="Reset and replay this demo"
      aria-label="Replay preview"
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-[#0A1D3D] border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer font-bold ${
        isSm ? "h-8 px-3 text-[11px]" : "h-10 px-4 text-xs"
      } ${className}`}
      style={{ fontFamily: JAKARTA }}
    >
      <RotateCcw className={isSm ? "w-3 h-3" : "w-4 h-4"} />
      <span>Replay</span>
    </button>
  );
}
