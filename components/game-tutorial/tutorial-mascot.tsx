"use client";

import React from "react";
import { motion } from "framer-motion";

interface TutorialMascotProps {
  message: string;
  subMessage?: string;
  mood?: "happy" | "thinking" | "cheering" | "pointing";
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function TutorialMascot({
  message,
  subMessage,
  mood = "happy",
  className = "",
}: TutorialMascotProps) {
  const mascotIcon =
    mood === "cheering"
      ? "🌟"
      : mood === "pointing"
      ? "👉"
      : mood === "thinking"
      ? "🧐"
      : "🦉";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFFBEB] border-2 border-[#0A1D3D] rounded-2xl shadow-[2.5px_2.5px_0_0_#0A1D3D] select-none ${className}`}
    >
      {/* Mascot Avatar Pill */}
      <motion.div
        animate={
          mood === "cheering"
            ? { rotate: [0, -8, 8, -8, 0], scale: [1, 1.1, 1] }
            : { y: [0, -3, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border-2 border-[#0A1D3D] flex items-center justify-center text-xl sm:text-2xl shadow-[2px_2px_0_0_#FFE066] shrink-0"
        aria-hidden="true"
      >
        {mascotIcon}
      </motion.div>

      {/* Speech Bubble Content */}
      <div className="flex-1 flex flex-col justify-center gap-0.5">
        <span
          className="text-xs sm:text-sm font-black text-[#0A1D3D] leading-tight"
          style={{ fontFamily: JAKARTA }}
        >
          {message}
        </span>
        {subMessage && (
          <span className="text-[10px] sm:text-xs font-semibold text-slate-600 leading-snug">
            {subMessage}
          </span>
        )}
      </div>
    </motion.div>
  );
}

