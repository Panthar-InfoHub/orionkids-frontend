"use client";

import React, { useState, useEffect } from "react";
import { CosmicShape, CosmicCardItem, CosmicCardBadge } from "./cosmic-shapes";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface LevelPreviewProps {
  level: number;
  onStart: () => void;
  onOpenHowToPlay?: () => void;
  isModal?: boolean;
  onClose?: () => void;
}

export function RuleDiscoveryLevelPreview({
  level,
  onStart,
  onOpenHowToPlay,
  isModal = false,
  onClose,
}: LevelPreviewProps) {
  // Level 3 interactive rule switch toggle (allows child to toggle between Example 1 and Example 2)
  const [level3Step, setLevel3Step] = useState<1 | 2>(1);
  const [isReplaying, setIsReplaying] = useState(false);

  // Auto-cycle Level 3 example if user hasn't toggled manually
  useEffect(() => {
    if (level !== 3) return;
    const interval = setInterval(() => {
      setLevel3Step((prev) => (prev === 1 ? 2 : 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [level]);

  const handleReplay = () => {
    setIsReplaying(true);
    if (level === 3) {
      setLevel3Step(1);
    }
    setTimeout(() => {
      setIsReplaying(false);
    }, 600);
  };

  const previewConfig = getPreviewData(level, level3Step);

  return (
    <div
      className={`w-full flex flex-col items-center select-none ${
        isModal
          ? "p-4 sm:p-6 max-w-[760px] w-full bg-[#1F0C42]/95 backdrop-blur-xl rounded-[28px] border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "max-w-[840px] w-full py-4 sm:py-5 px-4 sm:px-6 rounded-[24px] bg-[#351870]/60 backdrop-blur-md border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.35)]"
      }`}
      style={{ fontFamily: JAKARTA }}
    >
      {/* Top Header Row with Badge & Level Info */}
      <div className="w-full flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE066] text-[#0A1D3D] font-extrabold text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]">
          <span>{previewConfig.badgeEmoji}</span>
          <span>Level {level} Tutorial</span>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-colors text-sm"
            aria-label="Close instructions"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Preview Title & Subtitle */}
      <h2 className="text-[22px] sm:text-[26px] font-black text-white text-center tracking-tight mb-1">
        {previewConfig.title}
      </h2>
      <p className="text-[13px] sm:text-[14px] text-[#E0D3F8] text-center font-medium max-w-[560px] leading-relaxed mb-4">
        {previewConfig.subtitle}
      </p>

      {/* Level 3 Specific: Rule Switch Mode Toggle */}
      {level === 3 && (
        <div className="flex items-center gap-2 mb-3 bg-[#1B0B38] p-1.5 rounded-full border border-white/20">
          <button
            type="button"
            onClick={() => setLevel3Step(1)}
            className={`px-3.5 py-1.5 rounded-full font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              level3Step === 1
                ? "bg-[#2563EB] text-white shadow-[2px_2px_0px_#0A1D3D] scale-102"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span>🎨</span>
            <span>Example 1: Color Rule</span>
          </button>
          <button
            type="button"
            onClick={() => setLevel3Step(2)}
            className={`px-3.5 py-1.5 rounded-full font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              level3Step === 2
                ? "bg-[#D97706] text-white shadow-[2px_2px_0px_#0A1D3D] scale-102"
                : "text-white/70 hover:text-white"
            }`}
          >
            <span>🔷</span>
            <span>Example 2: Shape Rule</span>
          </button>
        </div>
      )}

      {/* Demonstration Card Container (Frosted / Light Card) */}
      <div
        className={`w-full rounded-[20px] bg-white/95 border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] p-4 sm:p-5 flex flex-col items-center gap-3.5 transition-all ${
          isReplaying ? "opacity-70 scale-98" : "opacity-100 scale-100"
        }`}
      >
        {/* Active Rule Indicator (Very prominent for Level 3) */}
        {previewConfig.activeRuleIndicator && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] animate-in fade-in zoom-in duration-200 bg-[#FFE066] text-[#0A1D3D]">
            <span className="text-base">{previewConfig.activeRuleIndicator.icon}</span>
            <span>{previewConfig.activeRuleIndicator.text}</span>
          </div>
        )}

        {/* Target Card vs Options Layout */}
        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 sm:gap-6">
          {/* Target Card Column */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
              Target Card
            </span>
            <div className="px-5 py-3 rounded-[16px] bg-[#F8FAFC] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center gap-2.5">
              <CosmicShape
                shape={previewConfig.target.shape}
                color={previewConfig.target.color}
                size={36}
              />
              <span className="text-sm sm:text-base font-black text-[#0A1D3D]">
                {previewConfig.target.label}
              </span>
            </div>
          </div>

          {/* Animated Matching Connector Arrow */}
          <div className="flex flex-col items-center justify-center">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-[#0A1D3D] text-[11px] font-extrabold shadow-xs">
              <span>{previewConfig.connectorLabel}</span>
              <span className="animate-pulse text-base">➔</span>
            </div>
            <div className="md:hidden flex items-center gap-1 text-[#0A1D3D] text-[11px] font-extrabold">
              <span>{previewConfig.connectorLabel}</span>
              <span className="animate-bounce text-base">⬇</span>
            </div>
          </div>

          {/* Three Options Row */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-0.5">
              Choose the Matching Card
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {previewConfig.options.map((opt) => {
                const isMatch = opt.id === previewConfig.correctAnswerId;
                return (
                  <CosmicCardBadge
                    key={opt.id}
                    card={opt}
                    size="md"
                    highlight={isMatch}
                    highlightColor="green"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Clear Educational Explanation Note */}
        <div className="w-full py-2.5 px-4 rounded-[14px] bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-[13px] font-bold text-center leading-relaxed flex items-center justify-center gap-2">
          <span>💡</span>
          <span>{previewConfig.explanation}</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-4 sm:mt-5 pt-1">
        {/* Left: Replay & How to Play */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplay}
            className="py-2.5 px-4 rounded-full font-extrabold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>🔄</span>
            <span>Replay Demo</span>
          </button>

          {onOpenHowToPlay && !isModal && (
            <button
              type="button"
              onClick={onOpenHowToPlay}
              className="py-2.5 px-4 rounded-full font-extrabold text-xs text-[#0A1D3D] bg-white hover:bg-slate-100 border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>❓</span>
              <span>How to Play</span>
            </button>
          )}
        </div>

        {/* Right: Big Start Level Button */}
        <button
          type="button"
          onClick={onStart}
          className="py-3 px-7 rounded-full font-black text-sm sm:text-base bg-[#FFD028] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[3.5px_3.5px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer flex items-center gap-2"
        >
          <span>{isModal ? "Back to Game" : `Start Level ${level}`}</span>
          <span>🚀</span>
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// PREVIEW DATA GENERATOR (Accurate to specification)
// =============================================================================
function getPreviewData(level: number, level3Step: 1 | 2) {
  if (level === 1) {
    // Level 1: Color Matching
    return {
      badgeEmoji: "🎨",
      title: "Let's Match the Colors!",
      subtitle:
        "Look at the color of the card. Find another card with the same color. The shape can be different!",
      activeRuleIndicator: {
        icon: "🎨",
        text: "ACTIVE RULE: MATCH COLOR",
      },
      target: {
        id: "p1-target",
        shape: "circle" as const,
        color: "blue" as const,
        label: "Blue Circle",
      },
      options: [
        { id: "p1-opt-1", shape: "circle" as const, color: "red" as const, label: "Red Circle" },
        { id: "p1-opt-2", shape: "square" as const, color: "blue" as const, label: "Blue Square" },
        { id: "p1-opt-3", shape: "triangle" as const, color: "yellow" as const, label: "Yellow Triangle" },
      ],
      correctAnswerId: "p1-opt-2",
      connectorLabel: "Match Blue Color",
      explanation: "See! Both cards are blue, even though their shapes are different.",
    };
  }

  if (level === 2) {
    // Level 2: Shape Matching
    return {
      badgeEmoji: "📐",
      title: "Now Let's Match the Shapes!",
      subtitle:
        "Look carefully at the shape of the card. Find another card with the same shape. Its color can be different!",
      activeRuleIndicator: {
        icon: "🔷",
        text: "ACTIVE RULE: MATCH SHAPE",
      },
      target: {
        id: "p2-target",
        shape: "circle" as const,
        color: "blue" as const,
        label: "Blue Circle",
      },
      options: [
        { id: "p2-opt-1", shape: "circle" as const, color: "red" as const, label: "Red Circle" },
        { id: "p2-opt-2", shape: "square" as const, color: "blue" as const, label: "Blue Square" },
        { id: "p2-opt-3", shape: "triangle" as const, color: "yellow" as const, label: "Yellow Triangle" },
      ],
      correctAnswerId: "p2-opt-1",
      connectorLabel: "Match Circle Shape",
      explanation: "Great! Both cards are circles, even though their colors are different.",
    };
  }

  // Level 3: Cosmic Rule Switch
  if (level3Step === 1) {
    // Example 1: Color Rule
    return {
      badgeEmoji: "🔀",
      title: "Ready for the Cosmic Rule Switch?",
      subtitle:
        "Sometimes you must match colors, and sometimes you must match shapes. Watch the symbol carefully before choosing!",
      activeRuleIndicator: {
        icon: "🎨",
        text: "ACTIVE RULE: MATCH COLOR (Example 1)",
      },
      target: {
        id: "p3-target-1",
        shape: "circle" as const,
        color: "blue" as const,
        label: "Blue Circle",
      },
      options: [
        { id: "p3-opt-1", shape: "circle" as const, color: "red" as const, label: "Red Circle" },
        { id: "p3-opt-2", shape: "square" as const, color: "blue" as const, label: "Blue Square" },
        { id: "p3-opt-3", shape: "triangle" as const, color: "yellow" as const, label: "Yellow Triangle" },
      ],
      correctAnswerId: "p3-opt-2",
      connectorLabel: "Color Rule Active",
      explanation: "When you see the Color icon 🎨, match the color: Blue Circle matches Blue Square!",
    };
  }

  // Example 2: Shape Rule
  return {
    badgeEmoji: "🔀",
    title: "Ready for the Cosmic Rule Switch?",
    subtitle:
      "Sometimes you must match colors, and sometimes you must match shapes. Watch the symbol carefully before choosing!",
    activeRuleIndicator: {
      icon: "🔷",
      text: "ACTIVE RULE: MATCH SHAPE (Example 2)",
    },
    target: {
      id: "p3-target-2",
      shape: "circle" as const,
      color: "blue" as const,
      label: "Blue Circle",
    },
    options: [
      { id: "p3-opt-1", shape: "circle" as const, color: "red" as const, label: "Red Circle" },
      { id: "p3-opt-2", shape: "square" as const, color: "blue" as const, label: "Blue Square" },
      { id: "p3-opt-3", shape: "triangle" as const, color: "yellow" as const, label: "Yellow Triangle" },
    ],
    correctAnswerId: "p3-opt-1",
    connectorLabel: "Shape Rule Active",
    explanation:
      "When you see the Shape icon 🔷, match the shape: Blue Circle matches Red Circle!",
  };
}

