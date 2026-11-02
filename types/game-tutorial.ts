import { QuestGameKey } from "@/lib/api/quest";

export type GameKey = QuestGameKey;
export type GameLevel = 1 | 2 | 3;
export type TutorialState = "NOT_STARTED" | "SHOWING" | "COMPLETED" | "SKIPPED";

export interface TutorialStep {
  id: string;
  instruction: string;
  subInstruction?: string;
  targetDescription: string;
  pointerPosition: "top" | "bottom" | "left" | "right" | "center";
  simulatedActionText?: string;
  stepType: "observe" | "interact" | "confirm";
}

export interface LevelTutorialConfig {
  gameKey: QuestGameKey;
  level: number;
  gameTitle: string;
  levelTitle: string;
  ruleExplanation: string;
  steps: TutorialStep[];
  readyMessage: string;
}
