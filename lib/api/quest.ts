
export type QuestGameKey =
  | "stroop"
  | "card-flip"
  | "pattern"
  | "odd-one-out"
  | "rule-discovery"
  | "story-sequencing";

export interface GameInfo {
  id: number;
  key: QuestGameKey;
  title: string;
  subtitles: Record<number, string>;
  callouts: Record<number, string>;
  totalLevels: number;
}

export const QUEST_GAMES_METADATA: Record<QuestGameKey, GameInfo> = {
  stroop: {
    id: 1,
    key: "stroop",
    title: "Stroop colour-word ✨",
    subtitles: {
      1: "Level 1 · Colour Clues 🎨",
      2: "Level 2 · Mixed-up words 🔮",
      3: "Level 3 · Reverse Rules ⚡",
    },
    callouts: {
      1: "After you complete this level, you'll immediately start Level 2 · Mixed-up Words.",
      2: "After you complete this level, you'll immediately start Level 3 · Speed Challenge.",
      3: "You're playing the final level of Stroop! Reach for the stars.",
    },
    totalLevels: 3,
  },
  "card-flip": {
    id: 2,
    key: "card-flip",
    title: "Cosmic Card Flip 🃏",
    subtitles: {
      1: "Level 1 · 4 Cosmic Pairs (8 Cards) 🪐",
      2: "Level 2 · 6 Cosmic Pairs (12 Cards) 🚀",
      3: "Level 3 · 8 Cosmic Pairs (16 Cards) 🛸",
    },
    callouts: {
      1: "Flip cards and remember where cosmic symbols hide. Find all 4 matching pairs!",
      2: "More planets and constellations! Test your working memory with 6 pairs.",
      3: "Master cosmic memory! Find all 8 pairs to unlock Pattern Recognition.",
    },
    totalLevels: 3,
  },
  pattern: {
    id: 3,
    key: "pattern",
    title: "Pattern Recognition 🧩",
    subtitles: {
      1: "Level 1 · Color & Shape Sequences 🔷",
      2: "Level 2 · Complex Rotations 🔄",
      3: "Level 3 · Spatial Matrix 🌌",
    },
    callouts: {
      1: "Observe the glowing cosmic constellation pattern and choose the missing piece.",
      2: "Look closely at how the shapes rotate and change colors in orbit.",
      3: "The final pattern challenge! Complete the matrix to proceed to Odd One Out.",
    },
    totalLevels: 3,
  },
  "odd-one-out": {
    id: 4,
    key: "odd-one-out",
    title: "Odd One Out 🔍",
    subtitles: {
      1: "Level 1 · Planetary Spotting 🌍",
      2: "Level 2 · Category Discovery 🛰️",
      3: "Level 3 · Subtle Variations 💫",
    },
    callouts: {
      1: "Find the symbol that doesn't share the same cosmic category.",
      2: "Examine characteristics like rings, moons, and color patterns.",
      3: "Spot the anomaly in deep space to unlock Rule Discovery.",
    },
    totalLevels: 3,
  },
  "rule-discovery": {
    id: 5,
    key: "rule-discovery",
    title: "Rule Discovery 🔀",
    subtitles: {
      1: "Level 1 · Color Matching 🎨",
      2: "Level 2 · Shape Shifting 📐",
      3: "Level 3 · Quantity & Number Rules 🔢",
    },
    callouts: {
      1: "Sort the items! The secret cosmic rule will change—pay attention to feedback.",
      2: "The sorting rule just shifted. Adapt quickly and find the new pattern.",
      3: "Master mental flexibility! Complete all sorts to unlock Story Sequencing.",
    },
    totalLevels: 3,
  },
  "story-sequencing": {
    id: 6,
    key: "story-sequencing",
    title: "Story Sequencing 📖",
    subtitles: {
      1: "Level 1 · Rocket Launch (3 Steps) 🚀",
      2: "Level 2 · Lunar Landing (4 Steps) 🌕",
      3: "Level 3 · Deep Space Journey (5 Steps) 🛸",
    },
    callouts: {
      1: "Arrange the mission cards in chronological order from first to last.",
      2: "Order the astronaut's lunar exploration from landing to flag planting.",
      3: "The final challenge of your 18-level journey! Complete the mission to generate your assessment report.",
    },
    totalLevels: 3,
  },
};

export interface StartLevelResult {
  attemptId: string;
  sessionId: string;
  gameKey: QuestGameKey;
  levelNumber: number;
  status: string;
  attemptNumber: number;
}

export interface CompleteLevelPayload {
  gameKey: QuestGameKey;
  levelNumber: number;
  totalTrials: number;
  correctTrials: number;
  accuracy: number;
  durationMs: number;
  averageReactionTimeMs?: number;
  metrics?: Record<string, unknown>;
  trialRecords?: unknown[];
  completedAt?: string;
}

export interface CompleteLevelResult {
  success: boolean;
  message?: string;
  levelAttemptId?: string;
  sessionId?: string;
  nextStage?: string;
  currentGame?: number;
  currentLevel?: number;
  isQuestComplete?: boolean;
  nextLevelRoute?: string;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Starts a level attempt for the authenticated user and given session.
 * Reconciles session progression if needed and rejects locked future levels.
 */
export async function startQuestLevel(
  sessionId: string,
  gameKey: QuestGameKey,
  levelNumber: number
): Promise<{ success: boolean; data?: StartLevelResult; error?: { code: string; message: string } }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return {
      success: true,
      data: {
        attemptId: `local-demo-${Date.now()}`,
        sessionId,
        gameKey,
        levelNumber,
        status: "IN_PROGRESS",
        attemptNumber: 1,
      },
    };
  }

  const res = await fetch(`${apiUrl}/api/quest/sessions/${sessionId}/levels/start`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameKey, levelNumber }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      error: {
        code: body?.error?.code || (res.status === 403 ? "FORBIDDEN" : "ERROR"),
        message:
          body?.error?.message ||
          `Level progression violation: Game ${gameKey} Level ${levelNumber} is locked.`,
      },
    };
  }

  return {
    success: true,
    data: body?.data || body,
  };
}

/**
 * Persists an in-game checkpoint for an in-progress level attempt.
 */
export async function saveQuestCheckpoint(
  sessionId: string,
  attemptId: string,
  checkpoint: Record<string, unknown>
): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return true;

  try {
    const res = await fetch(
      `${apiUrl}/api/quest/sessions/${sessionId}/attempts/${attemptId}/checkpoint`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkpoint }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Completes a level attempt and returns the authoritative next game, level, and nextLevelRoute.
 */
export async function completeQuestLevel(
  sessionId: string,
  payload: CompleteLevelPayload
): Promise<CompleteLevelResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    const isLastOfGame = payload.levelNumber >= 3;
    const nextRoute = isLastOfGame ? "/games/card-flip?level=1" : `/games/${payload.gameKey}?level=${payload.levelNumber + 1}`;
    return {
      success: true,
      message: `Level ${payload.levelNumber} completed (demo mode)`,
      nextLevelRoute: nextRoute,
    };
  }

  const res = await fetch(`${apiUrl}/api/quest/sessions/${sessionId}/levels/complete`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      error: {
        code: body?.error?.code || (res.status === 403 ? "FORBIDDEN" : "ERROR"),
        message: body?.error?.message || `Failed to record level progress (${res.statusText})`,
      },
    };
  }

  const data = body?.data || body;
  return {
    success: true,
    message: body?.message || "Level attempt completed successfully",
    levelAttemptId: data.levelAttemptId,
    sessionId: data.sessionId || sessionId,
    nextStage: data.nextStage,
    currentGame: data.currentGame,
    currentLevel: data.currentLevel,
    isQuestComplete: data.isQuestComplete,
    nextLevelRoute: data.nextLevelRoute,
  };
}
