"use client";

import React from "react";
import { QuestGameKey } from "@/lib/api/quest";
import { GameTutorialModal } from "./game-tutorial-modal";

export interface GameTutorialGuideProps {
  gameKey: QuestGameKey;
  level: number;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  className?: string;
}

/**
 * GameTutorialGuide: Reusable 3-Stage Animated & Interactive Tutorial Modal.
 * Stage 1: SHOW ME (Animated demonstration with guide hand pointer)
 * Stage 2: LET ME TRY (Isolated interactive practice with gentle feedback)
 * Stage 3: READY TO PLAY (Confetti celebration + explicit level launch)
 */
export function GameTutorialGuide(props: GameTutorialGuideProps) {
  return <GameTutorialModal {...props} />;
}
