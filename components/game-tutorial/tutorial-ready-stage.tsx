"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Play, RotateCcw, Award, CheckCircle } from "lucide-react";

interface TutorialReadyStageProps {
  readyMessage: string;
  readyTip?: string;
  gameTitle: string;
  levelTitle?: string;
  onStartGame: () => void;
  onReplayTutorial: () => void;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function TutorialReadyStage({
  readyMessage,
  readyTip,
  gameTitle,
  levelTitle,
  onStartGame,
  onReplayTutorial,
  className = "",
}: TutorialReadyStageProps) {
  useEffect(() => {
    // Gentle celebration confetti burst on mount
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFD028", "#FFE066", "#4ADE80", "#60A5FA", "#F472B6"],
      });
    } catch {
      // Fallback silently if canvas-confetti is not supported
    }
  }, []);

  return (
    <div className={`w-full flex flex-col items-center gap-5 ${className}`}>
      {/* 1. Celebratory Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-[520px] p-6 rounded-3xl bg-linear-to-b from-[#FFFDF0] via-white to-amber-50/60 border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] flex flex-col items-center text-center gap-4 select-none"
      >
        {/* Animated Trophy / Star Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center text-3xl"
        >
          🏆
        </motion.div>

        {/* Celebratory Heading */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-[11px] font-black uppercase tracking-wider"
            style={{ fontFamily: JAKARTA }}
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tutorial Mastered!</span>
          </span>

          <h3
            className="text-lg sm:text-xl font-black text-[#0A1D3D] mt-1"
            style={{ fontFamily: JAKARTA }}
          >
            You're All Set to Play! 🚀
          </h3>

          <p
            className="text-xs sm:text-sm font-bold text-slate-600 max-w-[400px] leading-relaxed"
            style={{ fontFamily: JAKARTA }}
          >
            {readyMessage}
          </p>
        </div>

        {/* Optional Pro Tip */}
        {readyTip && (
          <div className="w-full p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-2 text-left">
            <span className="text-lg shrink-0">💡</span>
            <span className="text-[11px] font-bold text-amber-900 leading-snug">
              <strong>Quick Tip:</strong> {readyTip}
            </span>
          </div>
        )}
      </motion.div>

      {/* 2. Action Controls */}
      <div className="w-full max-w-[520px] flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={onReplayTutorial}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay Tutorial</span>
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onStartGame}
          className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-sm sm:text-base border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <Play className="w-4 h-4 fill-[#0A1D3D]" />
          <span>Start Game! 🚀</span>
        </motion.button>
      </div>
    </div>
  );
}

