"use client";

import React, { useEffect } from "react";
import { RotateCcw, ArrowRight, Sparkles } from "lucide-react";

interface PreviewCompletionProps {
  levelTitle: string;
  feedbackMessage?: string;
  onReplay: () => void;
  onLaunchFullQuest: () => void;
  isLaunching?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function PreviewCompletion({
  levelTitle,
  feedbackMessage = "You completed this interactive demo! Ready to explore the full 18-level journey?",
  onReplay,
  onLaunchFullQuest,
  isLaunching = false,
}: PreviewCompletionProps) {
  useEffect(() => {
    // Fire safe confetti celebration
    try {
      import("canvas-confetti").then((confettiModule) => {
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#FFD028", "#FF5B5B", "#65DCAA", "#00B4D8", "#B88CFF"],
        });
      });
    } catch {
      // Non-blocking fallback
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300 select-none">
      {/* Star Mascot Badge */}
      <div className="w-16 h-16 rounded-full bg-[#FFD028] border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center text-3xl mb-4 animate-bounce">
        🌟
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#10B981] text-[#065F46] text-xs font-black uppercase tracking-wider mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Demo Completed</span>
      </div>

      <h3
        className="text-xl sm:text-2xl font-black text-[#0A1D3D] mb-2"
        style={{ fontFamily: JAKARTA }}
      >
        {levelTitle} Complete! 🎉
      </h3>

      <p className="text-slate-600 text-xs sm:text-sm max-w-[420px] mb-6 leading-relaxed font-medium">
        {feedbackMessage}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white hover:bg-slate-50 text-[#0A1D3D] font-extrabold text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] transition-transform active:translate-y-0.5 cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Preview</span>
        </button>

        <button
          type="button"
          onClick={onLaunchFullQuest}
          disabled={isLaunching}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-extrabold text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] transition-transform active:translate-y-0.5 cursor-pointer disabled:opacity-60"
          style={{ fontFamily: JAKARTA }}
        >
          <span>{isLaunching ? "Opening Quest..." : "Play Full Quest"}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
