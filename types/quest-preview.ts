export type PreviewGameKey =
  | "stroop"
  | "card-flip"
  | "pattern"
  | "odd-one-out"
  | "rule-discovery"
  | "story-sequencing";

export type PreviewLevel = 1 | 2 | 3;

export interface PreviewOption {
  id: string;
  label: string;
  color?: string;
  dotColor?: string;
  icon?: string;
  isCorrect: boolean;
}

export interface StroopPreviewConfig {
  word: string;
  inkColor: string;
  inkName: string;
  ruleDescription: string;
  options: { label: string; dotColor: string; isCorrect: boolean }[];
  hintOptionLabel: string;
}

export interface CardFlipPreviewCard {
  id: number;
  symbol: string;
  name: string;
  color: string;
  pairId: number;
}

export interface CardFlipPreviewConfig {
  cards: CardFlipPreviewCard[];
  pairsToMatch: number;
  hintCardId: number;
}

export interface PatternPreviewConfig {
  sequence: string[];
  options: { symbol: string; isCorrect: boolean }[];
  missingIndex: number;
  hintSymbol: string;
}

export interface OddOneOutPreviewItem {
  id: string;
  symbol: string;
  label: string;
  isOdd: boolean;
  reason?: string;
}

export interface OddOneOutPreviewConfig {
  categoryHint: string;
  items: OddOneOutPreviewItem[];
  hintItemId: string;
}

export interface RuleDiscoveryBucket {
  id: string;
  shape: "circle" | "square" | "triangle";
  color: "red" | "blue" | "yellow";
  count: number;
  label: string;
}

export interface RuleDiscoveryCard {
  id: string;
  shape: "circle" | "square" | "triangle";
  color: "red" | "blue" | "yellow";
  count: number;
  label: string;
}

export interface RuleDiscoveryPreviewConfig {
  ruleType: "color" | "shape" | "count";
  ruleExplanation: string;
  targetBuckets: RuleDiscoveryBucket[];
  cardToSort: RuleDiscoveryCard;
  hintBucketId: string;
}

export interface StorySequencingPreviewStep {
  id: number;
  order: number;
  text: string;
  icon: string;
}

export interface StorySequencingPreviewConfig {
  missionTitle: string;
  steps: StorySequencingPreviewStep[];
  shuffledSteps: StorySequencingPreviewStep[];
  hintStepId: number;
}

export interface GameLevelPreviewMeta {
  gameKey: PreviewGameKey;
  level: PreviewLevel;
  gameTitle: string;
  levelTitle: string;
  objective: string;
  hintInstruction: string;
}
