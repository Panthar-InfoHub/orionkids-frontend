/**
 * Stroop Colour-Word Game Telemetry and Trial Configuration Service.
 * Designed for full backend integration with telemetry, response time tracking, and accuracy scoring.
 */

export interface StroopTrial {
  id: number;
  word: string;          // Display text, e.g. "RED"
  inkColor: string;      // CSS hex color of the ink, e.g. "#E04F5F"
  inkName: string;       // Correct answer, e.g. "Red"
  options: {
    label: string;
    dotColor: string;
  }[];
  congruent: boolean;    // In Level 1, matching words
}

export interface StroopTrialRecord {
  trialId: number;
  word: string;
  inkName: string;
  selectedAnswer: string;
  isCorrect: boolean;
  reactionTimeMs: number;
  timestamp: string;
}

export interface StroopLevelCompletionPayload {
  studentId?: string;
  sessionId?: string;
  gameId: "stroop";
  level: number;
  totalTrials: number;
  correctTrials: number;
  accuracy: number;
  averageReactionTimeMs: number;
  trials: StroopTrialRecord[];
  completedAt: string;
}

export interface StroopLevelCompletionResponse {
  success: boolean;
  message?: string;
  nextLevelRoute?: string;
}

/**
 * Standard 8 Trials for Stroop Level 1 (2 Colours · Matching Words / Colour Clues)
 */
export const STROOP_LEVEL_1_TRIALS: StroopTrial[] = [
  {
    id: 1,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 2,
    word: "BLUE",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 3,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 4,
    word: "BLUE",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 5,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 6,
    word: "BLUE",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 7,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
  {
    id: 8,
    word: "BLUE",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: [
      { label: "Red", dotColor: "#E04F5F" },
      { label: "Blue", dotColor: "#2563EB" },
    ],
    congruent: true,
  },
];

const THREE_COLOR_OPTIONS = [
  { label: "Red", dotColor: "#E04F5F" },
  { label: "Blue", dotColor: "#2563EB" },
  { label: "Green", dotColor: "#16A34A" },
];

/**
 * Standard 8 Trials for Stroop Level 2 (3 Colours · Matching & Mismatched Words)
 */
export const STROOP_LEVEL_2_TRIALS: StroopTrial[] = [
  {
    id: 1,
    word: "BLUE",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 2,
    word: "GREEN",
    inkColor: "#16A34A",
    inkName: "Green",
    options: THREE_COLOR_OPTIONS,
    congruent: true,
  },
  {
    id: 3,
    word: "RED",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 4,
    word: "BLUE",
    inkColor: "#16A34A",
    inkName: "Green",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 5,
    word: "GREEN",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 6,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: true,
  },
  {
    id: 7,
    word: "GREEN",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 8,
    word: "BLUE",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: THREE_COLOR_OPTIONS,
    congruent: true,
  },
];

/**
 * Standard 8 Trials for Stroop Level 3 (Speed Challenge)
 */
export const STROOP_LEVEL_3_TRIALS: StroopTrial[] = [
  {
    id: 1,
    word: "GREEN",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 2,
    word: "RED",
    inkColor: "#16A34A",
    inkName: "Green",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 3,
    word: "BLUE",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 4,
    word: "GREEN",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 5,
    word: "BLUE",
    inkColor: "#16A34A",
    inkName: "Green",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 6,
    word: "RED",
    inkColor: "#2563EB",
    inkName: "Blue",
    options: THREE_COLOR_OPTIONS,
    congruent: false,
  },
  {
    id: 7,
    word: "GREEN",
    inkColor: "#16A34A",
    inkName: "Green",
    options: THREE_COLOR_OPTIONS,
    congruent: true,
  },
  {
    id: 8,
    word: "RED",
    inkColor: "#E04F5F",
    inkName: "Red",
    options: THREE_COLOR_OPTIONS,
    congruent: true,
  },
];

export function getStroopTrials(level: number = 2): StroopTrial[] {
  if (level === 1) return STROOP_LEVEL_1_TRIALS;
  if (level === 3) return STROOP_LEVEL_3_TRIALS;
  return STROOP_LEVEL_2_TRIALS;
}

/**
 * Submit completed level telemetry results to backend.
 */
export async function submitStroopLevelResults(
  payload: StroopLevelCompletionPayload
): Promise<StroopLevelCompletionResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/api/games/stroop/level-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit Stroop level results: ${response.statusText}`);
      }
      return await response.json();
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[StroopTelemetry] Level 1 results recorded:", payload);
    }

    return {
      success: true,
      message: "Level 1 completed successfully",
      nextLevelRoute: "/games/stroop?level=2",
    };
  } catch (error) {
    console.error("[StroopTelemetry] Error submitting level results:", error);
    return {
      success: true,
      message: "Proceeding with local state",
      nextLevelRoute: "/games/stroop?level=2",
    };
  }
}
