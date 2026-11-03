"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoConfig } from "@/types/game-tutorial";
import { RotateCcw, ArrowRight, Sparkles } from "lucide-react";

interface TutorialShowMeStageProps {
  demo: DemoConfig;
  onProceedToPractice: () => void;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function TutorialShowMeStage({
  demo,
  onProceedToPractice,
  className = "",
}: TutorialShowMeStageProps) {
  const [animationCycle, setAnimationCycle] = useState(0);
  const [phase, setPhase] = useState<"pointing" | "tapping" | "success">("pointing");

  // Run a 3.5s looped demonstration animation
  useEffect(() => {
    setPhase("pointing");

    const tapTimer = setTimeout(() => {
      setPhase("tapping");
    }, 1400);

    const successTimer = setTimeout(() => {
      setPhase("success");
    }, 2000);

    return () => {
      clearTimeout(tapTimer);
      clearTimeout(successTimer);
    };
  }, [animationCycle, demo]);

  const handleReplay = () => {
    setAnimationCycle((c) => c + 1);
  };

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${className}`}>
      {/* 1. Demonstration Arena Box */}
      <div className="relative w-full max-w-[520px] min-h-[260px] p-5 rounded-3xl bg-linear-to-b from-sky-50 via-white to-amber-50/50 border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] flex flex-col items-center justify-center overflow-hidden">
        {/* "Watch the Demo" Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[#0A1D3D] text-[11px] font-black shadow-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Demonstration 👁️</span>
        </div>

        {/* Replay Demo icon on top right */}
        <button
          type="button"
          onClick={handleReplay}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-[#0A1D3D] border border-slate-200 shadow-xs text-xs font-bold transition-all cursor-pointer"
          title="Watch demonstration again"
          aria-label="Watch demo again"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Render Specific Demo Interactive Visuals based on demoType */}
        <div className="w-full flex flex-col items-center justify-center py-4">
          {renderDemoVisual(demo, phase)}
        </div>

        {/* Phase Feedback Pill */}
        <div className="h-7 mt-2 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "success" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-black shadow-xs"
                style={{ fontFamily: JAKARTA }}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{demo.actionExplanation}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Short Action Footer */}
      <div className="w-full max-w-[520px] flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Watch Again</span>
        </button>

        <button
          type="button"
          onClick={onProceedToPractice}
          className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
          style={{ fontFamily: JAKARTA }}
        >
          <span>Now Let Me Try!</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visual Demo Renderers per Game Type
// -------------------------------------------------------------

function renderDemoVisual(demo: DemoConfig, phase: "pointing" | "tapping" | "success") {
  const { demoPayload } = demo;

  switch (demoPayload.type) {
    case "stroop": {
      const data = demoPayload.data;
      return (
        <div className="flex flex-col items-center gap-4 relative">
          {/* Word in ink color */}
          <div className="px-8 py-3 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center">
            <span
              className="text-4xl sm:text-5xl font-black tracking-widest"
              style={{ color: data.inkColor, fontFamily: JAKARTA }}
            >
              {data.word}
            </span>
          </div>

          {/* Options Row */}
          <div className="flex items-center gap-3 relative">
            {data.options.map((opt) => {
              const isTarget = opt.label === data.correctLabel;
              return (
                <div key={opt.label} className="relative">
                  <div
                    className={`px-4 sm:px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 font-black text-sm select-none transition-all ${
                      isTarget && phase === "success"
                        ? "bg-emerald-100 border-emerald-600 text-emerald-900 shadow-[2px_2px_0_0_#059669] scale-105"
                        : "bg-white border-[#0A1D3D] text-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: opt.dotColor }}
                    />
                    <span>{opt.label}</span>
                  </div>

                  {/* Animated Hand Pointing to Target */}
                  {isTarget && (
                    <motion.div
                      animate={
                        phase === "pointing"
                          ? { y: [16, 4, 16], x: 0 }
                          : phase === "tapping"
                          ? { scale: [1, 0.85, 1], y: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-3xl pointer-events-none select-none z-30"
                    >
                      👆
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "card-flip": {
      const { cards } = demoPayload.data;
      const sampleCards = cards.slice(0, 2);
      return (
        <div className="flex flex-col items-center gap-3 relative">
          <div className="flex items-center gap-4">
            {sampleCards.map((card, idx) => {
              const isRevealed = phase === "tapping" || phase === "success";
              return (
                <motion.div
                  key={card.id}
                  animate={isRevealed ? { rotateY: 0 } : { rotateY: 180 }}
                  transition={{ duration: 0.4 }}
                  className={`w-20 h-24 sm:w-24 sm:h-28 rounded-2xl border-2 border-[#0A1D3D] flex flex-col items-center justify-center text-3xl shadow-[3px_3px_0_0_#0A1D3D] transition-colors ${
                    isRevealed
                      ? "bg-white text-[#0A1D3D]"
                      : "bg-[#0A1D3D] text-[#FFE066]"
                  }`}
                >
                  {isRevealed ? card.symbol : "❓"}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            animate={
              phase === "pointing"
                ? { y: [14, 0, 14] }
                : phase === "tapping"
                ? { scale: [1, 0.85, 1], y: -5 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
            className="text-3xl pointer-events-none select-none"
          >
            👆
          </motion.div>
        </div>
      );
    }

    case "pattern": {
      const data = demoPayload.data;
      return (
        <div className="flex flex-col items-center gap-3 relative">
          {/* Sequence Bar */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]">
            {data.sequence.map((sym, idx) => {
              const isMissing = idx === data.missingIndex;
              return (
                <div
                  key={idx}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl border-2 ${
                    isMissing
                      ? phase === "success"
                        ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                        : "bg-amber-100 border-dashed border-[#0A1D3D] text-[#0A1D3D]"
                      : "bg-slate-50 border-slate-300 text-[#0A1D3D]"
                  }`}
                >
                  {isMissing ? (phase === "success" ? data.answer : "❓") : sym}
                </div>
              );
            })}
          </div>

          {/* Answer choices */}
          <div className="flex items-center gap-2 mt-2 relative">
            {data.options.map((opt) => {
              const isTarget = opt === data.answer;
              return (
                <div key={opt} className="relative">
                  <div
                    className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-2xl ${
                      isTarget && phase === "success"
                        ? "bg-emerald-100 border-emerald-500 shadow-xs"
                        : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]"
                    }`}
                  >
                    {opt}
                  </div>

                  {isTarget && (
                    <motion.div
                      animate={
                        phase === "pointing"
                          ? { y: [14, 0, 14] }
                          : phase === "tapping"
                          ? { scale: [1, 0.85, 1], y: -4 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-2xl pointer-events-none select-none z-30"
                    >
                      👆
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "odd-one-out": {
      const data = demoPayload.data;
      return (
        <div className="flex flex-col items-center gap-3 relative">
          <div className="grid grid-cols-2 gap-3">
            {data.items.slice(0, 4).map((item) => {
              return (
                <div key={item.id} className="relative">
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                      item.isOdd && phase === "success"
                        ? "bg-emerald-100 border-emerald-500 shadow-[2px_2px_0_0_#059669] scale-105"
                        : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{item.symbol}</span>
                    <span className="text-[10px] font-black text-[#0A1D3D]">{item.label}</span>
                  </div>

                  {item.isOdd && (
                    <motion.div
                      animate={
                        phase === "pointing"
                          ? { y: [14, 0, 14] }
                          : phase === "tapping"
                          ? { scale: [1, 0.85, 1], y: -4 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-2xl pointer-events-none select-none z-30"
                    >
                      👆
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "rule-discovery": {
      const data = demoPayload.data;
      return (
        <div className="flex flex-col items-center gap-3 relative">
          {/* Card to sort */}
          <div className="px-5 py-2.5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center gap-2">
            <span className="text-xs font-black uppercase text-slate-500">Card to Match:</span>
            <span className="text-base font-black text-[#0A1D3D]">{data.cardToSort.label}</span>
          </div>

          {/* Buckets */}
          <div className="flex items-center gap-2 sm:gap-3 mt-2 relative">
            {data.buckets.map((b) => {
              const isTarget = b.id === data.targetBucketId;
              return (
                <div key={b.id} className="relative">
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border-2 text-xs font-black transition-all ${
                      isTarget && phase === "success"
                        ? "bg-emerald-100 border-emerald-500 shadow-[2px_2px_0_0_#059669] scale-105"
                        : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]"
                    }`}
                  >
                    {b.label}
                  </div>

                  {isTarget && (
                    <motion.div
                      animate={
                        phase === "pointing"
                          ? { y: [14, 0, 14] }
                          : phase === "tapping"
                          ? { scale: [1, 0.85, 1], y: -4 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-2xl pointer-events-none select-none z-30"
                    >
                      👆
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "story-sequencing": {
      const data = demoPayload.data;
      return (
        <div className="flex flex-col items-center gap-3 relative">
          <div className="flex items-center gap-2">
            {data.steps.map((step, idx) => {
              const isDone = phase === "success" || (phase === "tapping" && idx === 0);
              return (
                <div
                  key={step.id}
                  className={`px-3 py-2 rounded-xl border-2 flex items-center gap-1.5 text-xs font-black ${
                    isDone
                      ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-current flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="text-base">{step.icon}</span>
                </div>
              );
            })}
          </div>

          <motion.div
            animate={
              phase === "pointing"
                ? { y: [14, 0, 14] }
                : phase === "tapping"
                ? { scale: [1, 0.85, 1], y: -4 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.6, repeat: phase === "pointing" ? Infinity : 0 }}
            className="text-2xl pointer-events-none select-none"
          >
            👆
          </motion.div>
        </div>
      );
    }

    default:
      return null;
  }
}

