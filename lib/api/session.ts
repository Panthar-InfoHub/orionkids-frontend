/**
 * Quest Session API client.
 * Fetches and initializes the player's quest session from the backend.
 * All functions are safe to call in browser context and fail gracefully
 * when the backend is unreachable or the user is unauthenticated.
 */

export interface QuestSession {
  id: string;
  userId: string;
  status: "IN_PROGRESS" | "COMPLETED";
  currentStage: string;
  currentGame: number;
  currentLevel: number;
  currentProgressIndex: number;
  totalLevels: number;
  isWarmUpCompleted: boolean;
  startedAt: string;
  lastActivityAt: string;
  completedAt: string | null;
  hasReport: boolean;
  completedLevels?: Array<{ gameKey: string; levelNumber: number; [key: string]: any }>;
}

export interface QuestResumeState {
  hasResumableQuest: boolean;
  destination: string;
  sessionId?: string | null;
  currentStage?: string | null;
  currentGame?: number | null;
  currentLevel?: number | null;
  attemptId?: string | null;
  checkpoint?: {
    currentTrialIdx?: number;
    savedRecords?: any[];
    [key: string]: any;
  } | null;
}

const API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL
    : undefined;

/**
 * Fetches the current active session for the authenticated user.
 * Returns null if unauthenticated, the backend is unreachable, or no
 * session exists yet. Always bypasses browser HTTP cache to prevent stale stage loops.
 */
export async function fetchCurrentSession(): Promise<QuestSession | null> {
  if (!API_URL) return null;

  try {
    const res = await fetch(`${API_URL}/api/quest/sessions/current`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Backend wraps responses in { success, data, message }
    return (data?.data ?? null) as QuestSession | null;
  } catch {
    return null;
  }
}

/**
 * Evaluates the authoritative resume state for the authenticated player.
 * Checks for unfinished in-progress quest sessions, warm-up status, and saved checkpoints.
 * Never creates a quest session as a side effect.
 */
export async function fetchResumeState(): Promise<QuestResumeState> {
  if (!API_URL) {
    return { hasResumableQuest: false, destination: "/" };
  }

  try {
    const res = await fetch(`${API_URL}/api/quest/resume-state`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { hasResumableQuest: false, destination: "/" };
    }

    const data = await res.json();
    return (data?.data ?? {
      hasResumableQuest: false,
      destination: "/",
    }) as QuestResumeState;
  } catch {
    return { hasResumableQuest: false, destination: "/" };
  }
}

/**
 * Persists an in-game checkpoint to the active in-progress level attempt.
 * Safe to call periodically during gameplay; cannot overwrite completed stages.
 */
export async function saveAttemptCheckpoint(
  sessionId: string,
  attemptId: string,
  checkpoint: Record<string, any>
): Promise<boolean> {
  if (!API_URL) return false;

  try {
    const res = await fetch(
      `${API_URL}/api/quest/sessions/${sessionId}/attempts/${attemptId}/checkpoint`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkpoint }),
      }
    );

    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Fetches the current session, or creates a new one if none exists.
 * Returns null only when unauthenticated or the backend is unreachable.
 */
export async function fetchOrCreateSession(): Promise<QuestSession | null> {
  if (!API_URL) return null;

  try {
    // 1. Try to get existing session
    const existing = await fetchCurrentSession();
    if (existing) return existing;

    // 2. No session — create one
    const res = await fetch(`${API_URL}/api/quest/sessions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return (data?.data ?? null) as QuestSession | null;
  } catch {
    return null;
  }
}
