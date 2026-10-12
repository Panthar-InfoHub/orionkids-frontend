"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function QuestModal({
  isOpen,
  onClose,
  title = "Quick 2-Minute Cognitive Adventure",
}: QuestModalProps) {
  const [currentStep, setCurrentStep] = useState<"game" | "result">("game");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const puzzleSequence = ["⭐", "🔷", "⭐", "🔷", "⭐"];
  const puzzleOptions = [
    { id: 1, symbol: "🔶", label: "Orange Diamond", correct: false },
    { id: 2, symbol: "🔷", label: "Blue Diamond", correct: true },
    { id: 3, symbol: "⭐", label: "Gold Star", correct: false },
    { id: 4, symbol: "🔴", label: "Red Circle", correct: false },
  ];

  const handleSelect = (optionId: number, correct: boolean) => {
    setSelectedOption(optionId);
    setIsCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFCE38", "#00BCD4", "#0A1D3D"],
      });
      setTimeout(() => {
        setCurrentStep("result");
      }, 700);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentStep("game");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1D3D]/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] border-3 border-[#0A1D3D] shadow-[8px_8px_0px_0px_#0A1D3D] p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-500 hover:text-[#0A1D3D] rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {currentStep === "game" ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎮</span>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#0A1D3D] border border-[#0A1D3D] text-[10px] font-black uppercase">
                  Class 1–4 Micro-Quest
                </span>
                <h3 className="text-xl font-black text-[#0A1D3D] mt-1">{title}</h3>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border-2 border-dashed border-[#0A1D3D]/30 rounded-2xl p-5 text-center space-y-3">
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
                Which shape comes next in the sequence?
              </p>
              
              {/* The Sequence */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-3">
                {puzzleSequence.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-11 h-11 sm:w-13 sm:h-13 bg-white border-2 border-[#0A1D3D] rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-[2px_2px_0px_0px_#0A1D3D]"
                  >
                    {item}
                  </div>
                ))}
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#FFCE38] border-2 border-dashed border-[#0A1D3D] rounded-xl flex items-center justify-center text-xl font-black text-[#0A1D3D] animate-pulse">
                  ?
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {puzzleOptions.map((opt) => {
                const isThisSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id, opt.correct)}
                    className={`p-3.5 rounded-2xl border-[2.5px] border-[#0A1D3D] flex items-center justify-center gap-3 font-black text-lg transition-all cursor-pointer ${
                      isThisSelected
                        ? opt.correct
                          ? "bg-emerald-300 shadow-[3px_3px_0px_0px_#0A1D3D]"
                          : "bg-rose-200 shadow-[3px_3px_0px_0px_#0A1D3D]"
                        : "bg-white hover:bg-slate-50 shadow-[3px_3px_0px_0px_#0A1D3D] hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="text-2xl">{opt.symbol}</span>
                    <span className="text-xs font-bold text-[#0A1D3D] hidden sm:inline">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {isCorrect === false && (
              <p className="text-xs font-bold text-rose-600 text-center animate-bounce">
                Try again! Look closely at the repeating pattern!
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#00BCD4] border-3 border-[#0A1D3D] rounded-2xl mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#0A1D3D]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="px-3 py-1 bg-[#FEF3C7] text-[#0A1D3D] border-2 border-[#0A1D3D] rounded-full text-xs font-black uppercase">
                Mind Mastery 96th Percentile 🎉
              </span>
              <h3 className="text-2xl font-black text-[#0A1D3D] mt-2">
                Brilliant Observation!
              </h3>
              <p className="text-sm font-medium text-slate-600 max-w-sm mx-auto mt-1">
                Your child demonstrated strong abstract sequence reasoning and fluid problem-solving!
              </p>
            </div>

            <div className="bg-[#F8FAFC] border-2 border-[#0A1D3D] rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#0A1D3D]">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Pattern Recognition: Advanced</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-[#0A1D3D]">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Reaction Velocity: 1.4s (Top 5%)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-black text-[#0A1D3D]">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Focus Retention: Sustained</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-3 rounded-2xl bg-white border-2 border-[#0A1D3D] font-black text-xs text-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[#FFCE38] border-2 border-[#0A1D3D] font-black text-xs sm:text-sm text-[#0A1D3D] shadow-[3px_3px_0px_0px_#0A1D3D] hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock Full 14-Day Free Play</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
