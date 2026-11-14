import { CosmicColor, CosmicShapeType, CosmicCardItem, getCardLabel } from "./cosmic-shapes";

export type RuleType = "COLOR" | "SHAPE";

export interface RuleDiscoveryRound {
  id: number;
  rule: RuleType;
  target: CosmicCardItem;
  options: CosmicCardItem[];
  correctAnswer: CosmicCardItem;
  explanation: string;
}

/**
 * Pure semantic rule evaluation:
 * - COLOR: option.color must match target.color
 * - SHAPE: option.shape must match target.shape
 */
export function isRuleMatch(
  rule: RuleType,
  target: { color: CosmicColor; shape: CosmicShapeType },
  option: { color: CosmicColor; shape: CosmicShapeType }
): boolean {
  if (rule === "COLOR") {
    return option.color === target.color;
  }
  if (rule === "SHAPE") {
    return option.shape === target.shape;
  }
  return false;
}

/**
 * Builds a valid round dynamically where:
 * 1. Exactly one option matches the active rule (and differs on the other attribute).
 * 2. Another option is the classic distractor (matches on the OTHER rule attribute).
 * 3. The third option differs on both attributes.
 * 4. Correct answer is semantically derived and verified.
 */
export function createRound({
  id,
  rule,
  targetColor,
  targetShape,
  correctColor,
  correctShape,
  distractorColor,
  distractorShape,
  otherColor,
  otherShape,
  shuffleOrder = [0, 1, 2],
}: {
  id: number;
  rule: RuleType;
  targetColor: CosmicColor;
  targetShape: CosmicShapeType;
  correctColor: CosmicColor;
  correctShape: CosmicShapeType;
  distractorColor: CosmicColor;
  distractorShape: CosmicShapeType;
  otherColor: CosmicColor;
  otherShape: CosmicShapeType;
  shuffleOrder?: [number, number, number];
}): RuleDiscoveryRound {
  const target: CosmicCardItem = {
    id: `target-${id}`,
    color: targetColor,
    shape: targetShape,
    label: getCardLabel(targetColor, targetShape),
  };

  const correctCard: CosmicCardItem = {
    id: `opt-${id}-correct`,
    color: correctColor,
    shape: correctShape,
    label: getCardLabel(correctColor, correctShape),
  };

  const distractorCard: CosmicCardItem = {
    id: `opt-${id}-distractor`,
    color: distractorColor,
    shape: distractorShape,
    label: getCardLabel(distractorColor, distractorShape),
  };

  const otherCard: CosmicCardItem = {
    id: `opt-${id}-other`,
    color: otherColor,
    shape: otherShape,
    label: getCardLabel(otherColor, otherShape),
  };

  // Validate semantic correctness
  if (!isRuleMatch(rule, target, correctCard)) {
    throw new Error(`Invalid round generation: correctCard does not match rule ${rule}`);
  }
  if (isRuleMatch(rule, target, distractorCard)) {
    throw new Error(`Invalid round generation: distractorCard unexpectedly matches rule ${rule}`);
  }
  if (isRuleMatch(rule, target, otherCard)) {
    throw new Error(`Invalid round generation: otherCard unexpectedly matches rule ${rule}`);
  }

  const rawOptions = [correctCard, distractorCard, otherCard];
  const options = shuffleOrder.map((idx) => rawOptions[idx]);

  const explanation =
    rule === "COLOR"
      ? `Both cards share the color ${COSMIC_COLORS_NAME(targetColor)}, even though their shapes are different.`
      : `Both cards share the shape ${targetShape}, even though their colors are different.`;

  return {
    id,
    rule,
    target,
    options,
    correctAnswer: correctCard,
    explanation,
  };
}

function COSMIC_COLORS_NAME(c: CosmicColor): string {
  return c.charAt(0).toUpperCase() + c.slice(1);
}

// =============================================================================
// LEVEL 1: COLOR MATCHING ROUNDS (Rule is strictly COLOR)
// =============================================================================
export const LEVEL_1_ROUNDS: RuleDiscoveryRound[] = [
  // Round 1: Target = Blue Circle. Correct = Blue Square (Pos 1).
  createRound({
    id: 1,
    rule: "COLOR",
    targetColor: "blue",
    targetShape: "circle",
    correctColor: "blue",
    correctShape: "square",
    distractorColor: "red",
    distractorShape: "circle",
    otherColor: "yellow",
    otherShape: "triangle",
    shuffleOrder: [1, 0, 2], // Pos 0: Red Circle, Pos 1: Blue Square (Correct), Pos 2: Yellow Triangle
  }),
  // Round 2: Target = Red Square. Correct = Red Triangle (Pos 0).
  createRound({
    id: 2,
    rule: "COLOR",
    targetColor: "red",
    targetShape: "square",
    correctColor: "red",
    correctShape: "triangle",
    distractorColor: "blue",
    distractorShape: "square",
    otherColor: "yellow",
    otherShape: "circle",
    shuffleOrder: [0, 1, 2], // Pos 0: Red Triangle (Correct), Pos 1: Blue Square, Pos 2: Yellow Circle
  }),
  // Round 3: Target = Yellow Triangle. Correct = Yellow Circle (Pos 2).
  createRound({
    id: 3,
    rule: "COLOR",
    targetColor: "yellow",
    targetShape: "triangle",
    correctColor: "yellow",
    correctShape: "circle",
    distractorColor: "blue",
    distractorShape: "triangle",
    otherColor: "red",
    otherShape: "square",
    shuffleOrder: [1, 2, 0], // Pos 0: Blue Triangle, Pos 1: Red Square, Pos 2: Yellow Circle (Correct)
  }),
  // Round 4: Target = Blue Triangle. Correct = Blue Circle (Pos 1).
  createRound({
    id: 4,
    rule: "COLOR",
    targetColor: "blue",
    targetShape: "triangle",
    correctColor: "blue",
    correctShape: "circle",
    distractorColor: "red",
    distractorShape: "triangle",
    otherColor: "yellow",
    otherShape: "square",
    shuffleOrder: [1, 0, 2], // Pos 0: Red Triangle, Pos 1: Blue Circle (Correct), Pos 2: Yellow Square
  }),
];

// =============================================================================
// LEVEL 2: SHAPE MATCHING ROUNDS (Rule is strictly SHAPE)
// =============================================================================
export const LEVEL_2_ROUNDS: RuleDiscoveryRound[] = [
  // Round 1: Target = Blue Circle. Correct = Red Circle (Pos 0).
  createRound({
    id: 1,
    rule: "SHAPE",
    targetColor: "blue",
    targetShape: "circle",
    correctColor: "red",
    correctShape: "circle",
    distractorColor: "blue",
    distractorShape: "square",
    otherColor: "yellow",
    otherShape: "triangle",
    shuffleOrder: [0, 1, 2], // Pos 0: Red Circle (Correct), Pos 1: Blue Square, Pos 2: Yellow Triangle
  }),
  // Round 2: Target = Red Square. Correct = Blue Square (Pos 2).
  createRound({
    id: 2,
    rule: "SHAPE",
    targetColor: "red",
    targetShape: "square",
    correctColor: "blue",
    correctShape: "square",
    distractorColor: "red",
    distractorShape: "triangle",
    otherColor: "yellow",
    otherShape: "circle",
    shuffleOrder: [1, 2, 0], // Pos 0: Red Triangle, Pos 1: Yellow Circle, Pos 2: Blue Square (Correct)
  }),
  // Round 3: Target = Yellow Triangle. Correct = Blue Triangle (Pos 1).
  createRound({
    id: 3,
    rule: "SHAPE",
    targetColor: "yellow",
    targetShape: "triangle",
    correctColor: "blue",
    correctShape: "triangle",
    distractorColor: "yellow",
    distractorShape: "circle",
    otherColor: "red",
    otherShape: "square",
    shuffleOrder: [1, 0, 2], // Pos 0: Yellow Circle, Pos 1: Blue Triangle (Correct), Pos 2: Red Square
  }),
  // Round 4: Target = Yellow Circle. Correct = Blue Circle (Pos 0).
  createRound({
    id: 4,
    rule: "SHAPE",
    targetColor: "yellow",
    targetShape: "circle",
    correctColor: "blue",
    correctShape: "circle",
    distractorColor: "yellow",
    distractorShape: "square",
    otherColor: "red",
    otherShape: "triangle",
    shuffleOrder: [0, 1, 2], // Pos 0: Blue Circle (Correct), Pos 1: Yellow Square, Pos 2: Red Triangle
  }),
];

// =============================================================================
// LEVEL 3: COSMIC RULE SWITCH (Rule switches dynamically per round!)
// =============================================================================
export const LEVEL_3_ROUNDS: RuleDiscoveryRound[] = [
  // Round 1: Rule = COLOR. Target = Blue Circle. Correct = Blue Square.
  createRound({
    id: 1,
    rule: "COLOR",
    targetColor: "blue",
    targetShape: "circle",
    correctColor: "blue",
    correctShape: "square",
    distractorColor: "red",
    distractorShape: "circle",
    otherColor: "yellow",
    otherShape: "triangle",
    shuffleOrder: [1, 0, 2], // Pos 0: Red Circle, Pos 1: Blue Square (Correct), Pos 2: Yellow Triangle
  }),
  // Round 2: Rule = SHAPE. Target = Yellow Triangle. Correct = Blue Triangle.
  createRound({
    id: 2,
    rule: "SHAPE",
    targetColor: "yellow",
    targetShape: "triangle",
    correctColor: "blue",
    correctShape: "triangle",
    distractorColor: "yellow",
    distractorShape: "circle",
    otherColor: "red",
    otherShape: "square",
    shuffleOrder: [1, 0, 2], // Pos 0: Yellow Circle, Pos 1: Blue Triangle (Correct), Pos 2: Red Square
  }),
  // Round 3: Rule = COLOR. Target = Red Square. Correct = Red Circle.
  createRound({
    id: 3,
    rule: "COLOR",
    targetColor: "red",
    targetShape: "square",
    correctColor: "red",
    correctShape: "circle",
    distractorColor: "blue",
    distractorShape: "square",
    otherColor: "yellow",
    otherShape: "triangle",
    shuffleOrder: [1, 0, 2], // Pos 0: Blue Square, Pos 1: Red Circle (Correct), Pos 2: Yellow Triangle
  }),
  // Round 4: Rule = SHAPE. Target = Blue Circle. Correct = Red Circle.
  createRound({
    id: 4,
    rule: "SHAPE",
    targetColor: "blue",
    targetShape: "circle",
    correctColor: "red",
    correctShape: "circle",
    distractorColor: "blue",
    distractorShape: "square",
    otherColor: "yellow",
    otherShape: "triangle",
    shuffleOrder: [0, 1, 2], // Pos 0: Red Circle (Correct), Pos 1: Blue Square, Pos 2: Yellow Triangle
  }),
  // Round 5: Rule = COLOR. Target = Yellow Square. Correct = Yellow Triangle.
  createRound({
    id: 5,
    rule: "COLOR",
    targetColor: "yellow",
    targetShape: "square",
    correctColor: "yellow",
    correctShape: "triangle",
    distractorColor: "red",
    distractorShape: "square",
    otherColor: "blue",
    otherShape: "circle",
    shuffleOrder: [0, 1, 2], // Pos 0: Yellow Triangle (Correct), Pos 1: Red Square, Pos 2: Blue Circle
  }),
  // Round 6: Rule = SHAPE. Target = Red Triangle. Correct = Blue Triangle.
  createRound({
    id: 6,
    rule: "SHAPE",
    targetColor: "red",
    targetShape: "triangle",
    correctColor: "blue",
    correctShape: "triangle",
    distractorColor: "red",
    distractorShape: "square",
    otherColor: "yellow",
    otherShape: "circle",
    shuffleOrder: [1, 0, 2], // Pos 0: Red Square, Pos 1: Blue Triangle (Correct), Pos 2: Yellow Circle
  }),
];

export function getRoundsForLevel(level: number): RuleDiscoveryRound[] {
  if (level === 1) return LEVEL_1_ROUNDS;
  if (level === 2) return LEVEL_2_ROUNDS;
  return LEVEL_3_ROUNDS;
}

