import { QuestGameKey } from "@/lib/api/quest";
import { LevelTutorialConfig } from "@/types/game-tutorial";

/**
 * OrionKids Canonical Game Tutorials (1 Preview & Tutorial Per Game for all 6 Games)
 *
 * Each of the 6 canonical games provides exactly 1 interactive 3-stage tutorial:
 * Stage 1: SHOW ME (Animated demonstration with guide hand pointer)
 * Stage 2: LET ME TRY (Isolated interactive practice with explicit correct/wrong feedback)
 * Stage 3: READY TO PLAY (Celebration & level launch)
 */
export const GAME_TUTORIALS: Record<QuestGameKey, LevelTutorialConfig> = {
  // =========================================================================
  // 1. STROOP COLOUR-WORD TUTORIAL
  // =========================================================================
  stroop: {
    gameKey: "stroop",
    level: 1,
    gameTitle: "Stroop Colour-Word",
    levelTitle: "Interactive Game Guide 🎨",
    badgeIcon: "🎨",
    ruleExplanation:
      "Look at the colour of the ink the word is drawn in. Ignore what the letters say, and tap the matching ink colour button below.",
    readyMessage: "Awesome! You know the clue. Look at the ink colour and tap fast!",
    readyTip: "Say the colour of the ink out loud in your head to ignore the written word!",
    steps: [
      {
        id: "step-1",
        instruction: "Look at the big word on the screen!",
        subInstruction: "Notice the colour of the ink it is drawn with.",
        targetDescription: "Stimulus Word",
        pointerPosition: "top",
        stepType: "observe",
      },
      {
        id: "step-2",
        instruction: "Find the button with that matching ink colour!",
        subInstruction: "Look at the colour dots on the buttons below.",
        targetDescription: "Colour Options",
        pointerPosition: "bottom",
        simulatedActionText: "Tapping matching colour button...",
        stepType: "interact",
      },
      {
        id: "step-3",
        instruction: "Your choice is registered smoothly!",
        subInstruction: "Keep your focus sharp as new words appear.",
        targetDescription: "Game Arena",
        pointerPosition: "center",
        stepType: "confirm",
      },
    ],
    demo: {
      instruction: "Look at the ink colour, then tap the matching button!",
      subInstruction: "Here the word is RED drawn in blue ink. Tap Blue!",
      demoType: "stroop",
      simulatedTarget: "Blue",
      actionExplanation: "Tapping matching Blue button!",
      demoPayload: {
        type: "stroop",
        data: {
          word: "RED",
          inkColor: "#3B82F6",
          inkName: "Blue",
          correctLabel: "Blue",
          hintText: "Ignore the letters R-E-D! The ink is BLUE!",
          options: [
            { label: "Red", dotColor: "#EF4444" },
            { label: "Blue", dotColor: "#3B82F6" },
            { label: "Green", dotColor: "#10B981" },
            { label: "Yellow", dotColor: "#F59E0B" },
          ],
        },
      },
    },
    practice: {
      type: "stroop",
      data: {
        word: "YELLOW",
        inkColor: "#EF4444",
        inkName: "Red",
        correctLabel: "Red",
        hintText: "Look at the color of the ink (Red), not what the letters spell! Try again 👆",
        options: [
          { label: "Red", dotColor: "#EF4444" },
          { label: "Yellow", dotColor: "#F59E0B" },
          { label: "Blue", dotColor: "#3B82F6" },
          { label: "Green", dotColor: "#10B981" },
        ],
      },
    },
  },

  // =========================================================================
  // 2. CARD FLIP TUTORIAL
  // =========================================================================
  "card-flip": {
    gameKey: "card-flip",
    level: 1,
    gameTitle: "Card Flip",
    levelTitle: "Interactive Game Guide 🃏",
    badgeIcon: "🃏",
    ruleExplanation:
      "Tap cards to flip them over. Find the matching pairs and remember where cards are hidden!",
    readyMessage: "Awesome memory skills! Match all the hidden pairs to win!",
    readyTip: "Watch carefully where each symbol is hiding when cards flip!",
    steps: [
      {
        id: "step-1",
        instruction: "Tap any card to turn it face up!",
        subInstruction: "Remember the picture and where it is placed.",
        targetDescription: "Card Grid",
        pointerPosition: "center",
        stepType: "interact",
      },
      {
        id: "step-2",
        instruction: "Now find its twin partner!",
        subInstruction: "Tap another card to see if it matches.",
        targetDescription: "Card Pair",
        pointerPosition: "bottom",
        simulatedActionText: "Flipping second card...",
        stepType: "interact",
      },
      {
        id: "step-3",
        instruction: "Matching pairs stay open!",
        subInstruction: "Clear the grid by finding all pairs.",
        targetDescription: "Matched Cards",
        pointerPosition: "center",
        stepType: "confirm",
      },
    ],
    demo: {
      instruction: "Watch how pairs match when both cards are revealed!",
      subInstruction: "Card 1 is a Lion, Card 4 is also a Lion. Pair found!",
      demoType: "card-flip",
      simulatedTarget: "card-4",
      actionExplanation: "Flipping twin Lion card to complete pair!",
      demoPayload: {
        type: "card-flip",
        data: {
          cards: [
            { id: 1, symbol: "🦁", name: "Lion", color: "#F59E0B", pairId: 1 },
            { id: 2, symbol: "🚀", name: "Rocket", color: "#3B82F6", pairId: 2 },
            { id: 3, symbol: "🚀", name: "Rocket", color: "#3B82F6", pairId: 2 },
            { id: 4, symbol: "🦁", name: "Lion", color: "#F59E0B", pairId: 1 },
          ],
          hintPairId: 1,
        },
      },
    },
    practice: {
      type: "card-flip",
      data: {
        cards: [
          { id: 1, symbol: "🦁", name: "Lion", color: "#F59E0B", pairId: 1 },
          { id: 2, symbol: "🚀", name: "Rocket", color: "#3B82F6", pairId: 2 },
          { id: 3, symbol: "🚀", name: "Rocket", color: "#3B82F6", pairId: 2 },
          { id: 4, symbol: "🦁", name: "Lion", color: "#F59E0B", pairId: 1 },
        ],
        hintPairId: 2,
      },
    },
  },

  // =========================================================================
  // 3. PATTERN RECOGNITION TUTORIAL
  // =========================================================================
  pattern: {
    gameKey: "pattern",
    level: 1,
    gameTitle: "Pattern Recognition",
    levelTitle: "Interactive Game Guide 🧩",
    badgeIcon: "🧩",
    ruleExplanation:
      "Look at the sequence of shapes. Figure out what comes next to complete the pattern!",
    readyMessage: "Great pattern detective work! Spot the sequence and complete the line!",
    readyTip: "Say the shapes in order (Circle, Square, Circle...) to hear what comes next!",
    steps: [
      {
        id: "step-1",
        instruction: "Look across the pattern row from left to right!",
        subInstruction: "Find the repeating rule in the shapes.",
        targetDescription: "Pattern Sequence",
        pointerPosition: "top",
        stepType: "observe",
      },
      {
        id: "step-2",
        instruction: "Notice the missing question mark tile!",
        subInstruction: "Think what shape fits there to keep the rhythm.",
        targetDescription: "Missing Slot",
        pointerPosition: "center",
        stepType: "observe",
      },
      {
        id: "step-3",
        instruction: "Tap the correct shape from the choices below!",
        subInstruction: "The matching tile flies in to complete the row.",
        targetDescription: "Shape Choices",
        pointerPosition: "bottom",
        simulatedActionText: "Selecting completing tile...",
        stepType: "interact",
      },
    ],
    demo: {
      instruction: "Follow the sequence: Circle, Diamond, Circle, Diamond...",
      subInstruction: "Next must be Circle! Watch the hand tap Circle.",
      demoType: "pattern",
      simulatedTarget: "🔴",
      actionExplanation: "Tapping Red Circle to finish pattern!",
      demoPayload: {
        type: "pattern",
        data: {
          sequence: ["🔴", "🔷", "🔴", "🔷", "?"],
          missingIndex: 4,
          options: ["🔴", "🔷", "⭐", "🟩"],
          answer: "🔴",
          hintText: "Circle, Diamond, Circle, Diamond... Circle comes next!",
        },
      },
    },
    practice: {
      type: "pattern",
      data: {
        sequence: ["⭐", "🌙", "⭐", "🌙", "?"],
        missingIndex: 4,
        options: ["⭐", "🌙", "☀️", "☁️"],
        answer: "⭐",
        hintText: "Look at what repeats in order: Star, Moon, Star, Moon... What's next? Try again 👆",
      },
    },
  },

  // =========================================================================
  // 4. ODD ONE OUT TUTORIAL
  // =========================================================================
  "odd-one-out": {
    gameKey: "odd-one-out",
    level: 1,
    gameTitle: "Odd One Out",
    levelTitle: "Interactive Game Guide 🔍",
    badgeIcon: "🔍",
    ruleExplanation:
      "Look at the four items. Three belong together, but one does not fit. Find the odd one out!",
    readyMessage: "Sharp eyes! Tap the item that is different from all the rest!",
    readyTip: "Ask yourself: what do three of these items have in common?",
    steps: [
      {
        id: "step-1",
        instruction: "Examine all four picture cards carefully!",
        subInstruction: "Three items share something in common.",
        targetDescription: "Card Grid",
        pointerPosition: "top",
        stepType: "observe",
      },
      {
        id: "step-2",
        instruction: "Identify the shared category!",
        subInstruction: "For example: animals, fruits, or vehicles.",
        targetDescription: "Common Category",
        pointerPosition: "center",
        stepType: "observe",
      },
      {
        id: "step-3",
        instruction: "Tap the item that does NOT belong!",
        subInstruction: "The outlier is your odd one out.",
        targetDescription: "Outlier Card",
        pointerPosition: "bottom",
        simulatedActionText: "Tapping outlier card...",
        stepType: "interact",
      },
    ],
    demo: {
      instruction: "Apple, Banana, and Grapes are fruits. Car is a vehicle!",
      subInstruction: "Tap Car because it is the odd one out!",
      demoType: "odd-one-out",
      simulatedTarget: "item-car",
      actionExplanation: "Tapping Car because it is not a fruit!",
      demoPayload: {
        type: "odd-one-out",
        data: {
          categoryHint: "Fruits",
          hintItemId: "item-car",
          items: [
            { id: "item-apple", symbol: "🍎", label: "Apple", isOdd: false },
            { id: "item-banana", symbol: "🍌", label: "Banana", isOdd: false },
            { id: "item-grapes", symbol: "🍇", label: "Grapes", isOdd: false },
            { id: "item-car", symbol: "🚗", label: "Car", isOdd: true, reason: "Car is a vehicle, not fruit!" },
          ],
        },
      },
    },
    practice: {
      type: "odd-one-out",
      data: {
        categoryHint: "Animals",
        hintItemId: "item-plane",
        items: [
          { id: "item-dog", symbol: "🐶", label: "Puppy", isOdd: false },
          { id: "item-cat", symbol: "🐱", label: "Kitten", isOdd: false },
          { id: "item-rabbit", symbol: "🐰", label: "Bunny", isOdd: false },
          { id: "item-plane", symbol: "✈️", label: "Airplane", isOdd: true, reason: "Airplane is a machine, not an animal!" },
        ],
      },
    },
  },

  // =========================================================================
  // 5. RULE DISCOVERY TUTORIAL
  // =========================================================================
  "rule-discovery": {
    gameKey: "rule-discovery",
    level: 1,
    gameTitle: "Rule Discovery",
    levelTitle: "Interactive Game Guide 🔀",
    badgeIcon: "🔀",
    ruleExplanation:
      "Discover the hidden sorting rule! Look at the card and find which bucket matches by Color, Shape, or Count.",
    readyMessage: "Brilliant discovery! Sort cards into the right buckets by finding the secret rule!",
    readyTip: "If a bucket doesn't match, test another rule like Color or Shape!",
    steps: [
      {
        id: "step-1",
        instruction: "Inspect the card shown in the center!",
        subInstruction: "Notice its color, its shape, and how many items are on it.",
        targetDescription: "Drawn Card",
        pointerPosition: "top",
        stepType: "observe",
      },
      {
        id: "step-2",
        instruction: "Look at the sorting buckets below!",
        subInstruction: "Each bucket represents a potential match rule.",
        targetDescription: "Bucket Row",
        pointerPosition: "bottom",
        stepType: "observe",
      },
      {
        id: "step-3",
        instruction: "Tap the bucket that follows the current rule!",
        subInstruction: "If it matches, the card slides right in smoothly.",
        targetDescription: "Target Bucket",
        pointerPosition: "center",
        simulatedActionText: "Sorting card into matching bucket...",
        stepType: "interact",
      },
    ],
    demo: {
      instruction: "Watch the card match Bucket 1 by Color (Red)!",
      subInstruction: "Red Circle matches Red Star bucket because both are Red.",
      demoType: "rule-discovery",
      simulatedTarget: "bucket-1",
      actionExplanation: "Sorting into Bucket 1 (Color Rule: Red)!",
      demoPayload: {
        type: "rule-discovery",
        data: {
          sampleRuleExplanation: "Rule is COLOR: Card is Red, so it goes into Red Bucket!",
          targetBucketId: 1,
          cardToSort: { id: 101, shape: "circle", color: "red", count: 1, label: "Red Circle" },
          buckets: [
            { id: 1, shape: "triangle", color: "red", count: 2, label: "Red Bucket" },
            { id: 2, shape: "square", color: "blue", count: 1, label: "Blue Bucket" },
            { id: 3, shape: "circle", color: "yellow", count: 3, label: "Yellow Bucket" },
          ],
        },
      },
    },
    practice: {
      type: "rule-discovery",
      data: {
        sampleRuleExplanation: "Both the card and bucket share the same Color (Red)! Try again 👆",
        targetBucketId: 1,
        cardToSort: { id: 201, shape: "circle", color: "red", count: 1, label: "🔴 Red Circle" },
        buckets: [
          { id: 1, shape: "triangle", color: "red", count: 1, label: "🔴 Red Bucket (Color)" },
          { id: 2, shape: "square", color: "blue", count: 1, label: "🔵 Blue Bucket" },
          { id: 3, shape: "triangle", color: "yellow", count: 1, label: "🟡 Yellow Bucket" },
        ],
      },
    },
  },

  // =========================================================================
  // 6. STORY SEQUENCING TUTORIAL
  // =========================================================================
  "story-sequencing": {
    gameKey: "story-sequencing",
    level: 1,
    gameTitle: "Story Sequencing",
    levelTitle: "Interactive Game Guide 📖",
    badgeIcon: "📖",
    ruleExplanation:
      "Put the story cards in order from beginning to middle to end!",
    readyMessage: "Wonderful storytelling! Order the events from first to last to complete each mission!",
    readyTip: "Think about what has to happen first before the next step can happen!",
    steps: [
      {
        id: "step-1",
        instruction: "Read the story mission at the top!",
        subInstruction: "Think about what event naturally happens first.",
        targetDescription: "Story Mission",
        pointerPosition: "top",
        stepType: "observe",
      },
      {
        id: "step-2",
        instruction: "Tap the event cards in chronological order!",
        subInstruction: "First step 1, then step 2, then step 3.",
        targetDescription: "Event Cards",
        pointerPosition: "bottom",
        simulatedActionText: "Selecting story events in order...",
        stepType: "interact",
      },
      {
        id: "step-3",
        instruction: "Watch the story come to life in order!",
        subInstruction: "Beginning to end unfolds step by step.",
        targetDescription: "Timeline",
        pointerPosition: "center",
        stepType: "confirm",
      },
    ],
    demo: {
      instruction: "Watch the story order: 1. Egg, 2. Hatching, 3. Little Bird!",
      subInstruction: "Events are ordered from beginning to end.",
      demoType: "story-sequencing",
      simulatedTarget: "step-1",
      actionExplanation: "Ordering: Egg -> Hatching -> Bird!",
      demoPayload: {
        type: "story-sequencing",
        data: {
          missionTitle: "Bird Hatching Lifecycle",
          steps: [
            { id: 1, order: 1, text: "Egg in nest", icon: "🥚" },
            { id: 2, order: 2, text: "Egg cracks open", icon: "🐣" },
            { id: 3, order: 3, text: "Bird takes flight", icon: "🐥" },
          ],
          shuffledSteps: [
            { id: 3, order: 3, text: "Bird takes flight", icon: "🐥" },
            { id: 1, order: 1, text: "Egg in nest", icon: "🥚" },
            { id: 2, order: 2, text: "Egg cracks open", icon: "🐣" },
          ],
        },
      },
    },
    practice: {
      type: "story-sequencing",
      data: {
        missionTitle: "Planting a Garden Flower",
        steps: [
          { id: 11, order: 1, text: "Plant the seed", icon: "🌱" },
          { id: 12, order: 2, text: "Water with sun", icon: "🌧️" },
          { id: 13, order: 3, text: "Blooming flower", icon: "🌸" },
        ],
        shuffledSteps: [
          { id: 13, order: 3, text: "Blooming flower", icon: "🌸" },
          { id: 11, order: 1, text: "Plant the seed", icon: "🌱" },
          { id: 12, order: 2, text: "Water with sun", icon: "🌧️" },
        ],
      },
    },
  },
};

// Backward-compatibility bridge: ensure GAME_TUTORIALS[gameKey][1], [2], [3] all resolve to the canonical game tutorial
for (const key of Object.keys(GAME_TUTORIALS) as QuestGameKey[]) {
  const tut = GAME_TUTORIALS[key];
  (tut as any)[1] = tut;
  (tut as any)[2] = tut;
  (tut as any)[3] = tut;
}

/**
 * Get canonical game tutorial for any game key (1 tutorial per game)
 */
export function getGameTutorial(gameKey: QuestGameKey): LevelTutorialConfig {
  return GAME_TUTORIALS[gameKey] || GAME_TUTORIALS.stroop;
}

/**
 * Get level tutorial (resolves to canonical game tutorial for backward compatibility)
 */
export function getLevelTutorial(
  gameKey: QuestGameKey,
  _level?: number
): LevelTutorialConfig {
  return GAME_TUTORIALS[gameKey] || GAME_TUTORIALS.stroop;
}
