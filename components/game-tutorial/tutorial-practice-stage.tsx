"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PracticePayload } from "@/types/game-tutorial";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";

interface TutorialPracticeStageProps {
  practice: PracticePayload;
  onPracticeComplete: () => void;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function TutorialPracticeStage({
  practice,
  onPracticeComplete,
  className = "",
}: TutorialPracticeStageProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  const handleSuccess = (msg = "Spot on! That's how it's done! ✨") => {
    setFeedback({ text: msg, isCorrect: true });
    setIsCompleted(true);
  };

  const handleMistake = (hint = "Almost! Look closely and try once more.") => {
    setFeedback({ text: hint, isCorrect: false });
  };

  return (
    <div className={`w-full flex flex-col items-center gap-3.5 ${className}`}>
      {/* 1. Interactive Practice Arena Box */}
      <div className="relative w-full max-w-[520px] min-h-[260px] p-4 sm:p-5 rounded-3xl bg-linear-to-b from-amber-50/50 via-white to-sky-50 border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] flex flex-col items-center justify-center overflow-hidden">
        {/* "Your Turn" Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-[#0A1D3D] text-[11px] font-black shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Your Turn to Practice 🎮</span>
        </div>

        {/* Practice Arena Content */}
        <div className="w-full flex flex-col items-center justify-center pt-6 pb-2">
          {renderPracticeArena(practice, handleSuccess, handleMistake, isCompleted)}
        </div>

        {/* Prominent High-Visibility Feedback Banner (Explicit Correct / Incorrect) */}
        <div className="min-h-11 my-1.5 flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                key={`${feedback.text}-${feedback.isCorrect}`}
                initial={{ opacity: 0, scale: 0.92, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-sm select-none text-center ${
                  feedback.isCorrect
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-950 shadow-[2px_2px_0_0_#059669]"
                    : "bg-rose-100 border-2 border-rose-500 text-rose-950 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                }`}
                style={{ fontFamily: JAKARTA }}
              >
                {feedback.isCorrect ? (
                  <>
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      ✓
                    </span>
                    <span>CORRECT! {feedback.text}</span>
                  </>
                ) : (
                  <>
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      ✕
                    </span>
                    <span>INCORRECT! {feedback.text}</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Bottom Controls */}
      <div className="w-full max-w-[520px] flex items-center justify-between gap-3 pt-1">
        <span
          className="text-xs font-bold text-slate-500"
          style={{ fontFamily: JAKARTA }}
        >
          {isCompleted ? "Practice mastered! 🎉" : "Tap your answer above 👆"}
        </span>

        {isCompleted && (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            type="button"
            onClick={onPracticeComplete}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-[#4ADE80] hover:bg-[#3ecb72] text-[#0A1D3D] font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            style={{ fontFamily: JAKARTA }}
          >
            <span>Ready for the Game!</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Practice Arenas for Each Game Type
// -------------------------------------------------------------

function renderPracticeArena(
  practice: PracticePayload,
  onSuccess: (msg?: string) => void,
  onMistake: (hint?: string) => void,
  isCompleted: boolean
) {
  switch (practice.type) {
    case "stroop":
      return (
        <StroopPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    case "card-flip":
      return (
        <CardFlipPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    case "pattern":
      return (
        <PatternPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    case "odd-one-out":
      return (
        <OddOneOutPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    case "rule-discovery":
      return (
        <RuleDiscoveryPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    case "story-sequencing":
      return (
        <StorySequencingPracticeArena
          data={practice.data}
          onSuccess={onSuccess}
          onMistake={onMistake}
          isCompleted={isCompleted}
        />
      );
    default:
      return null;
  }
}

// 1. STROOP PRACTICE
function StroopPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelected(label);
    if (label === data.correctLabel) {
      onSuccess("Spot on! Ink color identified! 🎨");
    } else {
      onMistake(data.hintText || "Look at the color of the ink, not what the letters spell! Try again 👆");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="px-8 py-3 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex items-center justify-center">
        <span
          className="text-4xl sm:text-5xl font-black tracking-widest"
          style={{ color: data.inkColor, fontFamily: JAKARTA }}
        >
          {data.word}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {data.options.map((opt: any) => {
          const isSelected = selected === opt.label;
          const isCorrect = opt.label === data.correctLabel;
          const isChosenCorrect = isSelected && isCorrect;
          const isChosenWrong = isSelected && !isCorrect;

          return (
            <motion.button
              key={opt.label}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSelect(opt.label)}
              disabled={isCompleted}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl border-2 flex items-center gap-2 font-black text-sm select-none transition-all cursor-pointer ${
                isChosenCorrect
                  ? "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[2px_2px_0_0_#059669] scale-105"
                  : isChosenWrong
                  ? "bg-rose-100 border-rose-500 text-rose-950 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                  : "bg-white border-[#0A1D3D] text-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:bg-slate-50"
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: opt.dotColor }}
              />
              <span>{opt.label}</span>
              {isChosenCorrect && <span className="text-emerald-700 font-extrabold text-xs">✓</span>}
              {isChosenWrong && <span className="text-rose-700 font-extrabold text-xs">✕</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// 2. CARD FLIP PRACTICE
function CardFlipPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isMismatched, setIsMismatched] = useState(false);

  const handleCardClick = (cardId: number) => {
    if (flipped.includes(cardId) || matched.includes(cardId) || isCompleted || isMismatched) return;

    const nextFlipped = [...flipped, cardId];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const [id1, id2] = nextFlipped;
      const c1 = data.cards.find((c: any) => c.id === id1);
      const c2 = data.cards.find((c: any) => c.id === id2);

      if (c1 && c2 && c1.pairId === c2.pairId) {
        setMatched([...matched, c1.pairId]);
        setFlipped([]);
        onSuccess("Pair matched! Fantastic memory! 🃏");
      } else {
        setIsMismatched(true);
        onMistake("Cards didn't match! Remember their locations and try again 👆");
        setTimeout(() => {
          setFlipped([]);
          setIsMismatched(false);
        }, 900);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      {data.cards.slice(0, 4).map((card: any) => {
        const isOpen = flipped.includes(card.id) || matched.includes(card.pairId);
        const isMatchedCard = matched.includes(card.pairId);
        const isMismatchedCard = isMismatched && flipped.includes(card.id);

        return (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleCardClick(card.id)}
            disabled={isMatchedCard || isMismatched}
            className={`w-18 h-22 sm:w-20 sm:h-26 rounded-2xl border-2 flex flex-col items-center justify-center text-3xl transition-all cursor-pointer ${
              isMatchedCard
                ? "bg-emerald-50 border-emerald-500 text-[#0A1D3D] shadow-[3px_3px_0_0_#059669]"
                : isMismatchedCard
                ? "bg-rose-50 border-rose-500 text-rose-800 shadow-[3px_3px_0_0_#E11D48] animate-wobble"
                : isOpen
                ? "bg-white border-[#0A1D3D] text-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]"
                : "bg-[#0A1D3D] text-[#FFE066] border-[#0A1D3D] hover:bg-[#132c58] shadow-[3px_3px_0_0_#0A1D3D]"
            }`}
          >
            {isOpen ? card.symbol : "❓"}
            {isMatchedCard && <span className="text-[10px] font-black text-emerald-700 mt-0.5">✓</span>}
            {isMismatchedCard && <span className="text-[10px] font-black text-rose-700 mt-0.5">✕</span>}
          </motion.button>
        );
      })}
    </div>
  );
}

// 3. PATTERN PRACTICE
function PatternPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [chosen, setChosen] = useState<string | null>(null);

  const handleSelect = (sym: string) => {
    setChosen(sym);
    if (sym === data.answer) {
      onSuccess("Pattern completed perfectly! You found the next symbol! 🧩");
    } else {
      onMistake(data.hintText || "Notice what repeats in order! Try again 👆");
    }
  };

  const isChosenCorrect = chosen === data.answer;
  const isChosenWrong = chosen !== null && chosen !== data.answer;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Sequence */}
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D]">
        {data.sequence.map((sym: string, idx: number) => {
          const isMissing = idx === data.missingIndex;
          return (
            <div
              key={idx}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl border-2 transition-all ${
                isMissing
                  ? isCompleted
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900 font-black shadow-xs"
                    : isChosenWrong
                    ? "bg-rose-100 border-rose-500 text-rose-800 animate-wobble"
                    : "bg-[#FFE066] border-dashed border-[#0A1D3D] text-[#0A1D3D]"
                  : "bg-slate-50 border-slate-300 text-[#0A1D3D]"
              }`}
            >
              {isMissing ? (isCompleted ? data.answer : chosen || "❓") : sym}
            </div>
          );
        })}
      </div>

      {/* Options */}
      <div className="flex items-center gap-2.5 mt-2">
        {data.options.map((opt: string) => {
          const isThisChosen = chosen === opt;
          const isThisCorrect = isThisChosen && isChosenCorrect;
          const isThisWrong = isThisChosen && isChosenWrong;

          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSelect(opt)}
              disabled={isCompleted}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl transition-all cursor-pointer ${
                isThisCorrect
                  ? "bg-emerald-100 border-emerald-600 shadow-[2px_2px_0_0_#059669] scale-105"
                  : isThisWrong
                  ? "bg-rose-100 border-rose-500 text-rose-950 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                  : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:bg-slate-50"
              }`}
            >
              <span>{opt}</span>
              {isThisCorrect && <span className="text-emerald-700 text-xs font-black ml-0.5">✓</span>}
              {isThisWrong && <span className="text-rose-700 text-xs font-black ml-0.5">✕</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// 4. ODD ONE OUT PRACTICE
function OddOneOutPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: any) => {
    setSelectedId(item.id);
    if (item.isOdd) {
      onSuccess("Found the odd one out! Sharp eyes! 🔍");
    } else {
      onMistake(data.categoryHint ? `Hint: ${data.categoryHint} belong together. Find the outlier!` : "This item belongs to the group. Find the one that is different! Try again 👆");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {data.items.slice(0, 4).map((item: any) => {
        const isSelected = selectedId === item.id;
        const isChosenOdd = isSelected && item.isOdd;
        const isChosenWrong = isSelected && !item.isOdd;

        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleSelect(item)}
            disabled={isCompleted}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isChosenOdd
                ? "bg-emerald-100 border-emerald-600 shadow-[3px_3px_0_0_#059669] scale-105"
                : isChosenWrong
                ? "bg-rose-100 border-rose-500 text-rose-950 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:bg-slate-50"
            }`}
          >
            <span className="text-2xl sm:text-3xl">{item.symbol}</span>
            <span className="text-[10px] font-black text-[#0A1D3D]">{item.label}</span>
            {isChosenOdd && <span className="text-[10px] font-black text-emerald-800">✓ Odd One</span>}
            {isChosenWrong && <span className="text-[10px] font-black text-rose-800">✕ Belongs</span>}
          </motion.button>
        );
      })}
    </div>
  );
}

// 5. RULE DISCOVERY PRACTICE
function RuleDiscoveryPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);

  const handleSelectBucket = (bucketId: number) => {
    setSelectedBucket(bucketId);
    if (bucketId === data.targetBucketId) {
      onSuccess("Correct rule applied! Great sorting! 🔀");
    } else {
      onMistake(data.sampleRuleExplanation || "Rule didn't match. Look closely at shapes, colors, or count! Try again 👆");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="px-5 py-2 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center gap-2">
        <span className="text-xs font-black uppercase text-slate-500">Card to Match:</span>
        <span className="text-sm sm:text-base font-black text-[#0A1D3D]">{data.cardToSort.label}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-1">
        {data.buckets.map((b: any) => {
          const isSelected = selectedBucket === b.id;
          const isCorrect = b.id === data.targetBucketId;
          const isChosenCorrect = isSelected && isCorrect;
          const isChosenWrong = isSelected && !isCorrect;

          return (
            <motion.button
              key={b.id}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleSelectBucket(b.id)}
              disabled={isCompleted}
              className={`px-3.5 py-2.5 sm:px-4 rounded-xl border-2 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                isChosenCorrect
                  ? "bg-emerald-100 border-emerald-600 text-emerald-950 shadow-[2px_2px_0_0_#059669] scale-105"
                  : isChosenWrong
                  ? "bg-rose-100 border-rose-500 text-rose-950 shadow-[2px_2px_0_0_#E11D48] animate-wobble"
                  : "bg-white border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:bg-slate-50"
              }`}
            >
              <span>{b.label}</span>
              {isChosenCorrect && <span className="text-emerald-700 text-xs font-black">✓</span>}
              {isChosenWrong && <span className="text-rose-700 text-xs font-black">✕</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// 6. STORY SEQUENCING PRACTICE
function StorySequencingPracticeArena({
  data,
  onSuccess,
  onMistake,
  isCompleted,
}: {
  data: any;
  onSuccess: (msg?: string) => void;
  onMistake: (hint?: string) => void;
  isCompleted: boolean;
}) {
  const [placed, setPlaced] = useState<any[]>([]);
  const [isWrongOrder, setIsWrongOrder] = useState(false);

  const handlePick = (step: any) => {
    if (placed.some((p) => p.id === step.id) || isCompleted) return;

    const nextPlaced = [...placed, step];
    setPlaced(nextPlaced);
    setIsWrongOrder(false);

    if (nextPlaced.length === data.steps.length) {
      const isAllCorrect = nextPlaced.every((s, idx) => s.order === idx + 1);
      if (isAllCorrect) {
        onSuccess("Story is in perfect order! From beginning to end! 📖");
      } else {
        setIsWrongOrder(true);
        onMistake("Check what happens first, second, and last! Tap Reset or remove a card to re-order 👆");
      }
    }
  };

  const handleRemoveStep = (stepId: number) => {
    setPlaced(placed.filter((p) => p.id !== stepId));
    setIsWrongOrder(false);
  };

  const handleReset = () => {
    setPlaced([]);
    setIsWrongOrder(false);
  };

  const unplaced = data.shuffledSteps.filter(
    (step: any) => !placed.some((p) => p.id === step.id)
  );

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Placed timeline */}
      <div className="flex items-center gap-2">
        {data.steps.map((_: any, idx: number) => {
          const item = placed[idx];
          return (
            <div
              key={idx}
              onClick={() => item && !isCompleted && handleRemoveStep(item.id)}
              className={`w-20 h-14 sm:w-24 sm:h-16 rounded-xl border-2 flex flex-col items-center justify-center p-1 text-center transition-all ${
                item
                  ? isCompleted
                    ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs cursor-default"
                    : isWrongOrder
                    ? "bg-rose-50 border-rose-500 text-rose-900 animate-wobble cursor-pointer"
                    : "bg-white border-[#0A1D3D] text-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] cursor-pointer hover:bg-rose-50"
                  : "bg-slate-100 border-dashed border-slate-300 text-slate-400"
              }`}
              title={item && !isCompleted ? "Tap to remove" : `Step ${idx + 1}`}
            >
              {item ? (
                <>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[9px] font-bold truncate max-w-[80px]">{item.text}</span>
                  {isCompleted && <span className="text-[8px] font-black text-emerald-700">✓</span>}
                  {isWrongOrder && <span className="text-[8px] font-black text-rose-700">✕</span>}
                </>
              ) : (
                <span className="text-xs font-bold">Step {idx + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Available steps below */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
        {unplaced.map((step: any) => (
          <motion.button
            key={step.id}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handlePick(step)}
            className="px-3 py-1.5 rounded-xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center gap-1.5 text-xs font-black cursor-pointer hover:bg-slate-50 active:translate-y-0.5"
          >
            <span className="text-base">{step.icon}</span>
            <span className="text-[10px]">{step.text}</span>
          </motion.button>
        ))}

        {placed.length > 0 && !isCompleted && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
