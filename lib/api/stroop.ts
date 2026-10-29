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
  durationMs?: number;
  averageReactionTimeMs: number;
  trials: StroopTrialRecord[];
  completedAt: string;
}

export interface StroopLevelCompletionResponse {
  success: boolean;
  message?: string;
  nextLevelRoute?: string;
  sessionId?: string;
  currentLevel?: number;
  currentGame?: number;
  isQuestComplete?: boolean;
  errorType?:
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "VALIDATION_ERROR"
    | "NETWORK_ERROR"
    | "SERVER_ERROR";
}

/**
 * Standard 8 Trials for Stroop Level 1 (2 Colours Â· Matching Words / Colour Clues)
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
 * Standard 8 Trials for Stroop Level 2 (3 Colours Â· Matching & Mismatched Words)
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

export function getStroopTrials(level: number = 1): StroopTrial[] {
  if (level === 1) return STROOP_LEVEL_1_TRIALS;
  if (level === 3) return STROOP_LEVEL_3_TRIALS;
  return STROOP_LEVEL_2_TRIALS;
}

/**
 * Submit completed level telemetry results to backend.
 *
 * Key behaviours:
 *  1. Fetches/creates the quest session first so we always embed sessionId —
 *     this lets the backend use the correct session without an extra lookup and
 *     prevents "level ahead of authorized stage" errors caused by session drift.
 *  2. The backend legacy controller now auto-catches-up skipped levels, so a
 *     403 from a gap should never happen. But if it does, we fall back to
 *     offline mode so gameplay is never blocked.
 *  3. On success, derives nextLevelRoute from the backend's returned state for
 *     accurate cross-game routing.
 */
export async function submitStroopLevelResults(
  payload: StroopLevelCompletionPayload
): Promise<StroopLevelCompletionResponse> {
  const nextRoute =
    payload.level < 3
      ? `/games/stroop?level=${payload.level + 1}`
      : "/games/card-flip?level=1";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      // 1. Session bootstrap — resolve active quest session if present
      let sessionId = payload.sessionId;
      if (!sessionId) {
        try {
          const { fetchCurrentSession } = await import("@/lib/api/session");
          const session = await fetchCurrentSession();
          sessionId = session?.id;
        } catch {
          // Fall back to server resolving session via auth user
        }
      }

      const response = await fetch(`${apiUrl}/api/games/stroop/level-submit`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          level: payload.level,
          sessionId: sessionId ?? undefined,
        }),
      });

      // 2. Progression & Auth Validation: Never treat 401/403 as offline success
      if (response.status === 401) {
        const body = await response.json().catch(() => null);
        return {
          success: false,
          message:
            body?.error?.message ?? "Authentication required. Please log in.",
          errorType: "UNAUTHORIZED",
        };
      }

      if (response.status === 403) {
        const body = await response.json().catch(() => null);
        return {
          success: false,
          message:
            body?.error?.message ??
            `Level ${payload.level} is locked or unauthorized. Progression validation requires completing prior stages first.`,
          errorType: "FORBIDDEN",
        };
      }

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        console.error(
          `[StroopTelemetry] Backend error ${response.status} for level ${payload.level}:`,
          body
        );
        return {
          success: false,
          message:
            body?.error?.message ??
            `Error saving level progress: ${response.statusText}`,
          errorType:
            response.status >= 500 ? "SERVER_ERROR" : "VALIDATION_ERROR",
        };
      }

      // 3. Server Success — return server-authoritative state
      const data = await response.json();
      const inner = data?.data ?? data;

      let backendNextRoute: string | undefined;
      if (inner?.isQuestComplete) {
        backendNextRoute = "/report";
      } else if (
        typeof inner?.currentGame === "number" &&
        typeof inner?.currentLevel === "number"
      ) {
        if (inner.currentGame === 1) {
          backendNextRoute =
            inner.currentLevel <= 3
              ? `/games/stroop?level=${inner.currentLevel}`
              : "/games/card-flip?level=1";
        } else if (inner.currentGame === 2) {
          backendNextRoute = `/games/card-flip?level=${inner.currentLevel}`;
        } else {
          backendNextRoute = "/report";
        }
      }

      return {
        success: true,
        message: data?.message ?? `Level ${payload.level} completed`,
        nextLevelRoute:
          inner?.nextLevelRoute ?? backendNextRoute ?? nextRoute,
        sessionId: inner?.sessionId ?? sessionId,
        currentLevel: inner?.currentLevel,
        currentGame: inner?.currentGame,
        isQuestComplete: inner?.isQuestComplete,
      };
    } catch (_networkError) {
      // Offline fallback: Queue locally for audit/re-submission when connection restores.
      // Progression does NOT advance until server validates the results.
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const raw = localStorage.getItem("orionkids_offline_stroop_queue");
          const queue = raw ? JSON.parse(raw) : [];
          queue.push({ payload, queuedAt: new Date().toISOString() });
          localStorage.setItem(
            "orionkids_offline_stroop_queue",
            JSON.stringify(queue)
          );
        }
      } catch {
        // Ignore localStorage quota or private browsing errors
      }

      return {
        success: false,
        message:
          "Network connection failed. Your result was saved locally, but server verification is required before advancing.",
        errorType: "NETWORK_ERROR",
      };
    }
  }

  // Pure offline environment without backend configured
  return {
    success: true,
    message: `Level ${payload.level} completed (local demo mode)`,
    nextLevelRoute: nextRoute,
  };
}
