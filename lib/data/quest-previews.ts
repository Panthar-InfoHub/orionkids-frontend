import {
  PreviewGameKey,
  PreviewLevel,
  GameLevelPreviewMeta,
  StroopPreviewConfig,
  CardFlipPreviewConfig,
  PatternPreviewConfig,
  OddOneOutPreviewConfig,
  RuleDiscoveryPreviewConfig,
  StorySequencingPreviewConfig,
} from "@/types/quest-preview";

export const PREVIEW_GAMES_LIST: {
  key: PreviewGameKey;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  badgeColor: string;
}[] = [
  {
    key: "stroop",
    title: "Stroop Colour-Word",
    shortTitle: "Stroop",
    icon: "🎨",
    tagline: "Selective attention & inhibition",
    badgeColor: "#FFE066",
  },
  {
    key: "card-flip",
    title: "Cosmic Card Flip",
    shortTitle: "Card Flip",
    icon: "🃏",
    tagline: "Visual working memory",
    badgeColor: "#A7F3D0",
  },
  {
    key: "pattern",
    title: "Pattern Recognition",
    shortTitle: "Pattern",
    icon: "🧩",
    tagline: "Inductive reasoning & spatial logic",
    badgeColor: "#BAE6FD",
  },
  {
    key: "odd-one-out",
    title: "Odd One Out",
    shortTitle: "Odd One Out",
    icon: "🔍",
    tagline: "Categorization & cognitive flexibility",
    badgeColor: "#FED7AA",
  },
  {
    key: "rule-discovery",
    title: "Rule Discovery",
    shortTitle: "Rule Discovery",
    icon: "🔀",
    tagline: "Rule shifting & mental flexibility",
    badgeColor: "#DDD6FE",
  },
  {
    key: "story-sequencing",
    title: "Story Sequencing",
    shortTitle: "Story Sequencing",
    icon: "📖",
    tagline: "Working memory & temporal logic",
    badgeColor: "#FBCFE8",
  },
];

export const GAME_PREVIEW_METADATA: Record<PreviewGameKey, GameLevelPreviewMeta> = {
  stroop: {
    gameKey: "stroop",
    level: 1,
    gameTitle: "Stroop Colour-Word ✨",
    levelTitle: "Game Introduction 🎨",
    objective: "Look at the colour, not the word! Tap the button matching the ink colour.",
    hintInstruction: "The word plays a trick: the letters spell one colour, but the ink is different! Choose the ink.",
  },
  "card-flip": {
    gameKey: "card-flip",
    level: 1,
    gameTitle: "Cosmic Card Flip 🃏",
    levelTitle: "Game Introduction 🃏",
    objective: "Remember where pictures hide and flip matching pairs!",
    hintInstruction: "Tap one card, then tap a second card to find its matching twin.",
  },
  pattern: {
    gameKey: "pattern",
    level: 1,
    gameTitle: "Pattern Recognition 🧩",
    levelTitle: "Game Introduction 🧩",
    objective: "Follow the cosmic pattern and find what comes next in the sequence!",
    hintInstruction: "Look at the repeating rhythm, then choose the missing symbol below.",
  },
  "odd-one-out": {
    gameKey: "odd-one-out",
    level: 1,
    gameTitle: "Odd One Out 🔍",
    levelTitle: "Game Introduction 🔍",
    objective: "Three items belong together in a category, but one is different. Spot the outlier!",
    hintInstruction: "Look closely at the pictures and tap the one that does not belong.",
  },
  "rule-discovery": {
    gameKey: "rule-discovery",
    level: 1,
    gameTitle: "Rule Discovery 🔀",
    levelTitle: "Game Introduction 🔀",
    objective: "Discover the hidden rule and sort your card into the matching bucket!",
    hintInstruction: "Observe the shape, colour, or count on your card to match the bucket rule.",
  },
  "story-sequencing": {
    gameKey: "story-sequencing",
    level: 1,
    gameTitle: "Story Sequencing 📖",
    levelTitle: "Game Introduction 📖",
    objective: "Arrange the shuffled story cards in chronological order from first to last!",
    hintInstruction: "Tap the cards in sequence to build the timeline: Step 1, Step 2, and Step 3.",
  },
};

export const PREVIEW_METADATA: Record<PreviewGameKey, Record<PreviewLevel, GameLevelPreviewMeta>> = {
  stroop: {
    1: {
      gameKey: "stroop",
      level: 1,
      gameTitle: "Stroop Colour-Word ✨",
      levelTitle: "Level 1 · Colour Clues 🎨",
      objective: "Spot the ink colour and tap the matching button.",
      hintInstruction: "Look at the colour of the ink, not the word itself!",
    },
    2: {
      gameKey: "stroop",
      level: 2,
      gameTitle: "Stroop Colour-Word ✨",
      levelTitle: "Level 2 · Mixed-up Words 🔮",
      objective: "The word plays a trick! Name the ink colour, ignoring what the word spells.",
      hintInstruction: "Tricky word! Focus strictly on the ink colour.",
    },
    3: {
      gameKey: "stroop",
      level: 3,
      gameTitle: "Stroop Colour-Word ✨",
      levelTitle: "Level 3 · Reverse Rules ⚡",
      objective: "Reverse Challenge: The rule switched! Name the written WORD, not the ink.",
      hintInstruction: "Read what the letters spell! The reverse rule is active.",
    },
  },
  "card-flip": {
    1: {
      gameKey: "card-flip",
      level: 1,
      gameTitle: "Cosmic Card Flip 🃏",
      levelTitle: "Level 1 · 2 Cosmic Pairs 🪐",
      objective: "Flip cards and remember where cosmic symbols hide. Match both pairs!",
      hintInstruction: "Tap a card to flip it over, then find its partner.",
    },
    2: {
      gameKey: "card-flip",
      level: 2,
      gameTitle: "Cosmic Card Flip 🃏",
      levelTitle: "Level 2 · 3 Cosmic Pairs 🚀",
      objective: "More planets and constellations! Test your working memory with 3 pairs.",
      hintInstruction: "Remember where each planet and star was placed.",
    },
    3: {
      gameKey: "card-flip",
      level: 3,
      gameTitle: "Cosmic Card Flip 🃏",
      levelTitle: "Level 3 · 4 Cosmic Pairs 🛸",
      objective: "Deep space memory challenge! Match all 4 cosmic pairs.",
      hintInstruction: "Match all cosmic pairs to clear the galaxy board.",
    },
  },
  pattern: {
    1: {
      gameKey: "pattern",
      level: 1,
      gameTitle: "Pattern Recognition 🧩",
      levelTitle: "Level 1 · Alternating Sequence 🔷",
      objective: "Observe the repeating cosmic pattern and pick the missing symbol.",
      hintInstruction: "Look at the rhythm: Star, Diamond, Star, Diamond...",
    },
    2: {
      gameKey: "pattern",
      level: 2,
      gameTitle: "Pattern Recognition 🧩",
      levelTitle: "Level 2 · 3-Step Rotation 🔄",
      objective: "A 3-shape orbit cycle! Identify which shape comes next in rotation.",
      hintInstruction: "Triangle, Diamond, Circle... which shape repeats next?",
    },
    3: {
      gameKey: "pattern",
      level: 3,
      gameTitle: "Pattern Recognition 🧩",
      levelTitle: "Level 3 · Double Pair Pattern 🌌",
      objective: "Double Star, Double Moon! Solve the paired sequence.",
      hintInstruction: "Two stars, two moons... notice the pattern repeats in pairs.",
    },
  },
  "odd-one-out": {
    1: {
      gameKey: "odd-one-out",
      level: 1,
      gameTitle: "Odd One Out 🔍",
      levelTitle: "Level 1 · Planetary Spotting 🌍",
      objective: "Find the symbol that does not belong in this cosmic category.",
      hintInstruction: "Three are natural planets... one is a manufactured vehicle!",
    },
    2: {
      gameKey: "odd-one-out",
      level: 2,
      gameTitle: "Odd One Out 🔍",
      levelTitle: "Level 2 · Category Discovery 🛰️",
      objective: "Look at energy and temperature. Spot the item with the opposite property.",
      hintInstruction: "Sun, fire, and lightning are hot energy. Which one is ice cold?",
    },
    3: {
      gameKey: "odd-one-out",
      level: 3,
      gameTitle: "Odd One Out 🔍",
      levelTitle: "Level 3 · Subtle Variations 💫",
      objective: "Examine the tools of astronomy and find the anomaly.",
      hintInstruction: "Telescopes and radar scan deep space. What doesn't fit in an observatory?",
    },
  },
  "rule-discovery": {
    1: {
      gameKey: "rule-discovery",
      level: 1,
      gameTitle: "Rule Discovery 🔀",
      levelTitle: "Level 1 · Match by Colour 🎨",
      objective: "Discover the secret rule! In Level 1, items sort by their COLOUR.",
      hintInstruction: "The card has blue color. Tap the target bucket that also has blue!",
    },
    2: {
      gameKey: "rule-discovery",
      level: 2,
      gameTitle: "Rule Discovery 🔀",
      levelTitle: "Level 2 · Match by Shape 📐",
      objective: "The secret rule just shifted! Now sort items by their SHAPE.",
      hintInstruction: "The card is a square. Tap the bucket with squares, regardless of color!",
    },
    3: {
      gameKey: "rule-discovery",
      level: 3,
      gameTitle: "Rule Discovery 🔀",
      levelTitle: "Level 3 · Match by Quantity 🔢",
      objective: "Rule shift! Count the items. Sort by how many items appear on the card.",
      hintInstruction: "Count them: 3 triangles. Tap the bucket that also has 3 items!",
    },
  },
  "story-sequencing": {
    1: {
      gameKey: "story-sequencing",
      level: 1,
      gameTitle: "Story Sequencing 📖",
      levelTitle: "Level 1 · Rocket Launch (3 Steps) 🚀",
      objective: "Arrange the mission cards in chronological order from first to last.",
      hintInstruction: "First build the rocket, then blast off, then reach space orbit!",
    },
    2: {
      gameKey: "story-sequencing",
      level: 2,
      gameTitle: "Story Sequencing 📖",
      levelTitle: "Level 2 · Lunar Landing (4 Steps) 🌕",
      objective: "Order the astronaut's expedition from arrival in orbit to planting the flag.",
      hintInstruction: "Orbit the moon, touch down, collect moon rocks, then plant the flag.",
    },
    3: {
      gameKey: "story-sequencing",
      level: 3,
      gameTitle: "Story Sequencing 📖",
      levelTitle: "Level 3 · Deep Space Journey (4 Steps) 🛸",
      objective: "Chronicle the voyage from Mars flyby to returning safely home.",
      hintInstruction: "Fly past Mars, discover crystals, transmit data, and return to base.",
    },
  },
};

export const STROOP_PREVIEWS: Record<PreviewLevel, StroopPreviewConfig> = {
  1: {
    word: "RED",
    inkColor: "#DC2626", // Crisp Ruby Red
    inkName: "Red",
    ruleDescription: "What colour is the INK? Tap its matching colour.",
    options: [
      { label: "Red", dotColor: "#DC2626", isCorrect: true },
      { label: "Blue", dotColor: "#2563EB", isCorrect: false },
    ],
    hintOptionLabel: "Red",
  },
  2: {
    word: "BLUE",
    inkColor: "#D97706", // Crisp Warm Amber
    inkName: "Yellow",
    ruleDescription: "The word says BLUE, but look at the INK colour!",
    options: [
      { label: "Yellow", dotColor: "#D97706", isCorrect: true },
      { label: "Blue", dotColor: "#2563EB", isCorrect: false },
      { label: "Green", dotColor: "#059669", isCorrect: false },
    ],
    hintOptionLabel: "Yellow",
  },
  3: {
    word: "GREEN",
    inkColor: "#DC2626", // Red ink
    inkName: "Green",
    ruleDescription: "Reverse Mode: Name the written WORD, not the ink!",
    options: [
      { label: "Green", dotColor: "#059669", isCorrect: true },
      { label: "Red", dotColor: "#DC2626", isCorrect: false },
      { label: "Blue", dotColor: "#2563EB", isCorrect: false },
    ],
    hintOptionLabel: "Green",
  },
};

export const CARD_FLIP_PREVIEWS: Record<PreviewLevel, CardFlipPreviewConfig> = {
  1: {
    pairsToMatch: 2,
    hintCardId: 0,
    cards: [
      { id: 0, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 1, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
      { id: 2, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 3, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
    ],
  },
  2: {
    pairsToMatch: 3,
    hintCardId: 0,
    cards: [
      { id: 0, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 1, symbol: "🌟", name: "Star", color: "#FFE066", pairId: 3 },
      { id: 2, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
      { id: 3, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 4, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
      { id: 5, symbol: "🌟", name: "Star", color: "#FFE066", pairId: 3 },
    ],
  },
  3: {
    pairsToMatch: 4,
    hintCardId: 0,
    cards: [
      { id: 0, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 1, symbol: "🛸", name: "UFO", color: "#65DCAA", pairId: 4 },
      { id: 2, symbol: "🌟", name: "Star", color: "#FFE066", pairId: 3 },
      { id: 3, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
      { id: 4, symbol: "🪐", name: "Saturn", color: "#FFD028", pairId: 1 },
      { id: 5, symbol: "🛸", name: "UFO", color: "#65DCAA", pairId: 4 },
      { id: 6, symbol: "🚀", name: "Rocket", color: "#FF5B5B", pairId: 2 },
      { id: 7, symbol: "🌟", name: "Star", color: "#FFE066", pairId: 3 },
    ],
  },
};

export const PATTERN_PREVIEWS: Record<PreviewLevel, PatternPreviewConfig> = {
  1: {
    sequence: ["⭐", "🔷", "⭐", "🔷", "❓"],
    options: [
      { symbol: "⭐", isCorrect: true },
      { symbol: "🔷", isCorrect: false },
      { symbol: "🟢", isCorrect: false },
      { symbol: "🔺", isCorrect: false },
    ],
    missingIndex: 4,
    hintSymbol: "⭐",
  },
  2: {
    sequence: ["🔺", "🔷", "🟢", "🔺", "🔷", "❓"],
    options: [
      { symbol: "🟢", isCorrect: true },
      { symbol: "🔺", isCorrect: false },
      { symbol: "🔷", isCorrect: false },
      { symbol: "🟡", isCorrect: false },
    ],
    missingIndex: 5,
    hintSymbol: "🟢",
  },
  3: {
    sequence: ["⭐", "⭐", "🌙", "🌙", "⭐", "⭐", "❓"],
    options: [
      { symbol: "🌙", isCorrect: true },
      { symbol: "⭐", isCorrect: false },
      { symbol: "🪐", isCorrect: false },
      { symbol: "🚀", isCorrect: false },
    ],
    missingIndex: 6,
    hintSymbol: "🌙",
  },
};

export const ODD_ONE_OUT_PREVIEWS: Record<PreviewLevel, OddOneOutPreviewConfig> = {
  1: {
    categoryHint: "Planets vs Vehicles",
    hintItemId: "item-rocket",
    items: [
      { id: "item-saturn", symbol: "🪐", label: "Saturn (Planet)", isOdd: false },
      { id: "item-earth", symbol: "🌍", label: "Earth (Planet)", isOdd: false },
      { id: "item-mars", symbol: "🔴", label: "Mars (Planet)", isOdd: false },
      { id: "item-rocket", symbol: "🚀", label: "Rocket (Vehicle)", isOdd: true, reason: "A rocket is a man-made craft, while the others are natural planets!" },
    ],
  },
  2: {
    categoryHint: "Hot Energy vs Freezing Cold",
    hintItemId: "item-ice",
    items: [
      { id: "item-sun", symbol: "☀️", label: "Sun (Hot)", isOdd: false },
      { id: "item-fire", symbol: "🔥", label: "Fire (Hot)", isOdd: false },
      { id: "item-lightning", symbol: "⚡", label: "Lightning (Hot)", isOdd: false },
      { id: "item-ice", symbol: "❄️", label: "Ice (Cold)", isOdd: true, reason: "An ice crystal is freezing cold, whereas the others radiate burning heat!" },
    ],
  },
  3: {
    categoryHint: "Deep Space Instruments vs Musical Instrument",
    hintItemId: "item-guitar",
    items: [
      { id: "item-telescope", symbol: "🔭", label: "Telescope (Astronomy)", isOdd: false },
      { id: "item-radar", symbol: "📡", label: "Radar Dish (Space Signals)", isOdd: false },
      { id: "item-scope", symbol: "🔬", label: "Spectrometer (Science)", isOdd: false },
      { id: "item-guitar", symbol: "🎸", label: "Guitar (Music)", isOdd: true, reason: "A guitar is a musical instrument, while the others are space research tools!" },
    ],
  },
};

export const RULE_DISCOVERY_PREVIEWS: Record<PreviewLevel, RuleDiscoveryPreviewConfig> = {
  1: {
    ruleType: "color",
    ruleExplanation: "Sort by COLOR! Match the blue card to the blue bucket.",
    hintBucketId: "bucket-2",
    cardToSort: { id: "card-1", shape: "circle", color: "blue", count: 1, label: "🔵 1 Blue Circle" },
    targetBuckets: [
      { id: "bucket-1", shape: "circle", color: "red", count: 1, label: "🔴 Red Bucket" },
      { id: "bucket-2", shape: "square", color: "blue", count: 2, label: "🟦 Blue Bucket" },
      { id: "bucket-3", shape: "triangle", color: "yellow", count: 3, label: "▲ Yellow Bucket" },
    ],
  },
  2: {
    ruleType: "shape",
    ruleExplanation: "Rule Shift: Sort by SHAPE! The card is a square, so match it to the square bucket.",
    hintBucketId: "bucket-2",
    cardToSort: { id: "card-2", shape: "square", color: "red", count: 2, label: "🟥 2 Red Squares" },
    targetBuckets: [
      { id: "bucket-1", shape: "circle", color: "red", count: 1, label: "🔴 Circles" },
      { id: "bucket-2", shape: "square", color: "blue", count: 2, label: "🟦 Squares" },
      { id: "bucket-3", shape: "triangle", color: "yellow", count: 3, label: "▲ Triangles" },
    ],
  },
  3: {
    ruleType: "count",
    ruleExplanation: "Rule Shift: Sort by COUNT! There are 3 items, so match to the bucket with 3 items.",
    hintBucketId: "bucket-3",
    cardToSort: { id: "card-3", shape: "triangle", color: "blue", count: 3, label: "▲ 3 Blue Triangles" },
    targetBuckets: [
      { id: "bucket-1", shape: "circle", color: "red", count: 1, label: "🔴 1 Item" },
      { id: "bucket-2", shape: "square", color: "blue", count: 2, label: "🟦 2 Items" },
      { id: "bucket-3", shape: "triangle", color: "yellow", count: 3, label: "▲ 3 Items" },
    ],
  },
};

export const STORY_SEQUENCING_PREVIEWS: Record<PreviewLevel, StorySequencingPreviewConfig> = {
  1: {
    missionTitle: "Rocket Launch Mission (3 Steps)",
    hintStepId: 1,
    steps: [
      { id: 1, order: 1, text: "Build the Rocket on the launchpad", icon: "🛠️" },
      { id: 2, order: 2, text: "Astronauts board & 3-2-1 Blast off!", icon: "🚀" },
      { id: 3, order: 3, text: "Reach orbit and look back at Earth", icon: "🌍" },
    ],
    shuffledSteps: [
      { id: 2, order: 2, text: "Astronauts board & 3-2-1 Blast off!", icon: "🚀" },
      { id: 1, order: 1, text: "Build the Rocket on the launchpad", icon: "🛠️" },
      { id: 3, order: 3, text: "Reach orbit and look back at Earth", icon: "🌍" },
    ],
  },
  2: {
    missionTitle: "Lunar Landing Expedition (4 Steps)",
    hintStepId: 1,
    steps: [
      { id: 1, order: 1, text: "Enter Moon orbit", icon: "🛸" },
      { id: 2, order: 2, text: "Touch down on lunar surface", icon: "🌕" },
      { id: 3, order: 3, text: "Collect moon rocks in samples", icon: "🪨" },
      { id: 4, order: 4, text: "Plant the Orion flag and salute", icon: "🚩" },
    ],
    shuffledSteps: [
      { id: 3, order: 3, text: "Collect moon rocks in samples", icon: "🪨" },
      { id: 1, order: 1, text: "Enter Moon orbit", icon: "🛸" },
      { id: 4, order: 4, text: "Plant the Orion flag and salute", icon: "🚩" },
      { id: 2, order: 2, text: "Touch down on lunar surface", icon: "🌕" },
    ],
  },
  3: {
    missionTitle: "Interstellar Discovery (4 Steps)",
    hintStepId: 1,
    steps: [
      { id: 1, order: 1, text: "Fly past Mars into asteroid belt", icon: "☄️" },
      { id: 2, order: 2, text: "Discover glowing alien crystals", icon: "💎" },
      { id: 3, order: 3, text: "Transmit deep space data to Earth", icon: "📡" },
      { id: 4, order: 4, text: "Safe return to space station base", icon: "🛰️" },
    ],
    shuffledSteps: [
      { id: 4, order: 4, text: "Safe return to space station base", icon: "🛰️" },
      { id: 2, order: 2, text: "Discover glowing alien crystals", icon: "💎" },
      { id: 1, order: 1, text: "Fly past Mars into asteroid belt", icon: "☄️" },
      { id: 3, order: 3, text: "Transmit deep space data to Earth", icon: "📡" },
    ],
  },
};
