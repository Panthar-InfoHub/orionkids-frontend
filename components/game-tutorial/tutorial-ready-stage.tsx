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
    <div className={`w-full flex flex-col items-center gap-3 sm:gap-4 ${className}`}>
      {/* 1. Celebratory Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-[500px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-linear-to-b from-[#FFFDF0] via-white to-amber-50/60 border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex flex-col items-center text-center gap-2.5 sm:gap-3.5 select-none"
      >
        {/* Animated Trophy / Star Badge */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] flex items-center justify-center text-2xl sm:text-3xl"
        >
          🏆
        </motion.div>

        {/* Celebratory Heading */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-[10px] sm:text-[11px] font-black uppercase tracking-wider"
            style={{ fontFamily: JAKARTA }}
          >
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
            <span>Tutorial Mastered!</span>
          </span>

          <h3
            className="text-base sm:text-xl font-black text-[#0A1D3D] mt-0.5 sm:mt-1"
            style={{ fontFamily: JAKARTA }}
          >
            You're All Set to Play! 🚀
          </h3>

          <p
            className="text-xs sm:text-sm font-bold text-slate-600 max-w-[380px] leading-snug sm:leading-relaxed"
            style={{ fontFamily: JAKARTA }}
          >
            {readyMessage}
          </p>
        </div>

        {/* Optional Pro Tip */}
        {readyTip && (
          <div className="w-full p-2.5 sm:p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-2 text-left">
            <span className="text-base sm:text-lg shrink-0">💡</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-900 leading-snug">
              <strong>Quick Tip:</strong> {readyTip}
            </span>
          </div>
        )}
      </motion.div>

      {/* 2. Action Controls */}
      <div className="w-full max-w-[500px] flex items-center justify-between gap-3 pt-0.5 sm:pt-1">
        <button
          type="button"
          onClick={onReplayTutorial}
          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
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
          className="inline-flex items-center gap-2 h-10 sm:h-12 px-5 sm:px-7 rounded-xl sm:rounded-2xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-xs sm:text-base border-2 border-[#0A1D3D] shadow-[2.5px_2.5px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0A1D3D]" />
          <span>Start Game! 🚀</span>
        </motion.button>
      </div>
    </div>
  );
}

