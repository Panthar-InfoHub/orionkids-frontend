"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestGameKey } from "@/lib/api/quest";
import { TutorialStageId, LevelTutorialConfig } from "@/types/game-tutorial";
import { GAME_TUTORIALS, getGameTutorial } from "@/lib/data/game-tutorials";
import { TutorialStageNav } from "./tutorial-stage-nav";
import { TutorialMascot } from "./tutorial-mascot";
import { TutorialShowMeStage } from "./tutorial-show-me-stage";
import { TutorialPracticeStage } from "./tutorial-practice-stage";
import { TutorialReadyStage } from "./tutorial-ready-stage";
import { X } from "lucide-react";

interface GameTutorialModalProps {
  gameKey: QuestGameKey;
  level?: number;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  className?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function GameTutorialModal({
  gameKey,
  level = 1,
  isOpen,
  onClose,
  onComplete,
  className = "",
}: GameTutorialModalProps) {
  // Always use the canonical 1-game tutorial (1 preview per game, not per level)
  const tutorialConfig: LevelTutorialConfig = getGameTutorial(gameKey);

  const [currentStage, setCurrentStage] = useState<TutorialStageId>("SHOW_ME");
  const [completedStages, setCompletedStages] = useState<TutorialStageId[]>([]);
  const [practiceFeedback, setPracticeFeedback] = useState<{
    text: string;
    isCorrect: boolean;
  } | null>(null);

  // Reset stage state when modal opens or game changes
  useEffect(() => {
    if (isOpen) {
      setCurrentStage("SHOW_ME");
      setCompletedStages([]);
      setPracticeFeedback(null);
    }
  }, [isOpen, gameKey]);

  // Handle escape key to skip
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleStageComplete = useCallback((stage: TutorialStageId) => {
    setCompletedStages((prev) => (prev.includes(stage) ? prev : [...prev, stage]));
  }, []);

  const handleProceedToPractice = useCallback(() => {
    handleStageComplete("SHOW_ME");
    setCurrentStage("LET_ME_TRY");
    setPracticeFeedback(null);
  }, [handleStageComplete]);

  const handlePracticeComplete = useCallback(() => {
    handleStageComplete("LET_ME_TRY");
    setCurrentStage("READY_TO_PLAY");
  }, [handleStageComplete]);

  const handleReplayAll = useCallback(() => {
    setCurrentStage("SHOW_ME");
    setPracticeFeedback(null);
  }, []);

  const handleStartGame = useCallback(() => {
    handleStageComplete("READY_TO_PLAY");
    if (onComplete) {
      onComplete();
    } else {
      onClose();
    }
  }, [handleStageComplete, onComplete, onClose]);

  if (!isOpen) return null;

  // Determine active mascot message and mood
  let mascotMessage = tutorialConfig.demo.instruction;
  let mascotSub = tutorialConfig.demo.subInstruction;
  let mascotMood: "happy" | "thinking" | "cheering" | "pointing" = "pointing";

  if (currentStage === "LET_ME_TRY") {
    if (!practiceFeedback) {
      mascotMessage = "Your turn! Tap the correct choice to complete the practice.";
      mascotSub = "No rush! Take your time and explore.";
      mascotMood = "pointing";
    } else if (practiceFeedback.isCorrect) {
      mascotMessage = "🎉 Spot on! That's completely correct!";
      mascotSub = "Awesome job! Tap 'Ready for the Game' below to continue!";
      mascotMood = "cheering";
    } else {
      mascotMessage = "❌ Not quite right! Give it another try!";
      mascotSub = practiceFeedback.text || "Look closely at the clue and tap again!";
      mascotMood = "thinking";
    }
  } else if (currentStage === "READY_TO_PLAY") {
    mascotMessage = "Awesome job! You are ready to start playing!";
    mascotSub = "Tap 'Start Game' whenever you're ready.";
    mascotMood = "cheering";
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#0A1D3D]/80 backdrop-blur-xs select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`relative w-full max-w-[620px] max-h-[92vh] overflow-y-auto bg-white rounded-[28px] sm:rounded-[36px] border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#FFE066] flex flex-col justify-between ${className}`}
      >
        {/* Top Header Bar: 1 Tutorial per Game (No Level-Specific Confusion) */}
        <div className="w-full bg-[#F8FAFC] border-b-2 border-slate-200 p-3 sm:p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">
              {tutorialConfig.badgeIcon || "🎓"}
            </span>
            <div>
              <h2
                id="tutorial-modal-title"
                className="text-sm sm:text-base font-black text-[#0A1D3D]"
                style={{ fontFamily: JAKARTA }}
              >
                {tutorialConfig.gameTitle} Tutorial
              </h2>
              <span className="text-[11px] sm:text-xs font-bold text-slate-500">
                Interactive Game Guide · Learn How to Play 🌟
              </span>
            </div>
          </div>

          {/* Skip Button (never traps child) */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-slate-500 hover:text-[#0A1D3D] hover:bg-slate-200/70 border border-transparent hover:border-slate-300 transition-all cursor-pointer"
            aria-label="Skip tutorial guide"
          >
            <span>Skip</span>
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 flex flex-col items-center gap-3">
          {/* Stage Progress Stepper */}
          <TutorialStageNav
            currentStage={currentStage}
            completedStages={completedStages}
            onSelectStage={(stage) => {
              setCurrentStage(stage);
              setPracticeFeedback(null);
            }}
          />

          {/* Friendly Mascot Guide Bubble (Stages 1 and 2; Stage 3 has its own celebratory card) */}
          {currentStage !== "READY_TO_PLAY" && (
            <TutorialMascot
              message={mascotMessage}
              subMessage={mascotSub}
              mood={mascotMood}
              className="w-full max-w-[540px]"
            />
          )}

          {/* Dynamic Stage Views */}
          <div className="w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              {currentStage === "SHOW_ME" && (
                <motion.div
                  key="stage-show-me"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <TutorialShowMeStage
                    demo={tutorialConfig.demo}
                    onProceedToPractice={handleProceedToPractice}
                  />
                </motion.div>
              )}

              {currentStage === "LET_ME_TRY" && (
                <motion.div
                  key="stage-let-me-try"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <TutorialPracticeStage
                    practice={tutorialConfig.practice}
                    onPracticeComplete={handlePracticeComplete}
                    onFeedbackChange={setPracticeFeedback}
                  />
                </motion.div>
              )}

              {currentStage === "READY_TO_PLAY" && (
                <motion.div
                  key="stage-ready"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <TutorialReadyStage
                    readyMessage={tutorialConfig.readyMessage}
                    readyTip={tutorialConfig.readyTip}
                    gameTitle={tutorialConfig.gameTitle}
                    levelTitle={tutorialConfig.levelTitle}
                    onStartGame={handleStartGame}
                    onReplayTutorial={handleReplayAll}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
