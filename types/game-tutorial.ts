import { QuestGameKey } from "@/lib/api/quest";

export type GameKey = QuestGameKey;
export type GameLevel = 1 | 2 | 3;
export type TutorialState = "NOT_STARTED" | "SHOWING" | "COMPLETED" | "SKIPPED";
export type TutorialStageId = "SHOW_ME" | "LET_ME_TRY" | "READY_TO_PLAY";

export interface TutorialStep {
  id: string;
  instruction: string;
  subInstruction?: string;
  targetDescription: string;
  pointerPosition: "top" | "bottom" | "left" | "right" | "center";
  simulatedActionText?: string;
  stepType: "observe" | "interact" | "confirm";
}

// -------------------------------------------------------------
// Practice Data Models (Isolated from production gameplay)
// -------------------------------------------------------------

export interface StroopPracticeData {
  word: string;
  inkColor: string;
  inkName: string;
  options: { label: string; dotColor: string; icon?: string }[];
  correctLabel: string;
  hintText: string;
}

export interface CardFlipPracticeCard {
  id: number;
  symbol: string;
  name: string;
  color: string;
  pairId: number;
}

export interface CardFlipPracticeData {
  cards: CardFlipPracticeCard[];
  hintPairId: number;
}

export interface PatternPracticeData {
  sequence: string[];
  missingIndex: number;
  options: string[];
  answer: string;
  hintText: string;
}

export interface OddOneOutPracticeItem {
  id: string;
  symbol: string;
  label: string;
  isOdd: boolean;
  reason?: string;
}

export interface OddOneOutPracticeData {
  items: OddOneOutPracticeItem[];
  categoryHint: string;
  hintItemId: string;
}

export interface RuleDiscoveryBucketData {
  id: number;
  shape: "circle" | "square" | "triangle";
  color: "red" | "blue" | "yellow";
  count: number;
  label: string;
}

export interface RuleDiscoveryCardData {
  id: number;
  shape: "circle" | "square" | "triangle";
  color: "red" | "blue" | "yellow";
  count: number;
  label: string;
}

export interface RuleDiscoveryPracticeData {
  sampleRuleExplanation: string;
  buckets: RuleDiscoveryBucketData[];
  cardToSort: RuleDiscoveryCardData;
  targetBucketId: number;
}

export interface StorySequencingPracticeStep {
  id: number;
  order: number;
  text: string;
  icon: string;
}

export interface StorySequencingPracticeData {
  missionTitle: string;
  steps: StorySequencingPracticeStep[];
  shuffledSteps: StorySequencingPracticeStep[];
}

// -------------------------------------------------------------
// Full 3-Stage Tutorial Config (SHOW ME -> LET ME TRY -> READY)
// -------------------------------------------------------------

export type PracticePayload =
  | { type: "stroop"; data: StroopPracticeData }
  | { type: "card-flip"; data: CardFlipPracticeData }
  | { type: "pattern"; data: PatternPracticeData }
  | { type: "odd-one-out"; data: OddOneOutPracticeData }
  | { type: "rule-discovery"; data: RuleDiscoveryPracticeData }
  | { type: "story-sequencing"; data: StorySequencingPracticeData };

export interface DemoConfig {
  instruction: string;
  subInstruction: string;
  demoType: QuestGameKey;
  demoPayload: PracticePayload;
  simulatedTarget: string; // Identifier or label to highlight
  actionExplanation: string;
}

export interface LevelTutorialConfig {
  gameKey: QuestGameKey;
  level: number;
  gameTitle: string;
  levelTitle: string;
  badgeIcon: string;
  ruleExplanation: string;
  readyMessage: string;
  readyTip?: string;
  steps: TutorialStep[]; // Backward compatibility
  demo: DemoConfig;
  practice: PracticePayload;
}
