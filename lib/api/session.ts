import { getActiveChildId, setActiveChildId } from "./children";

/**
 * Quest Session API client.
 * Fetches and initializes the player's quest session from the backend.
 * All functions are safe to call in browser context and fail gracefully
 * when the backend is unreachable or the user is unauthenticated.
 */

export interface QuestSession {
  id: string;
  userId: string;
  childProfileId?: string | null;
  childName?: string | null;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
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
  completedLevels?: Array<{ gameKey: string; levelNumber: number; [key: string]: unknown }>;
}

export interface QuestResumeState {
  hasResumableQuest: boolean;
  destination: string;
  sessionId?: string | null;
  childProfileId?: string | null;
  currentStage?: string | null;
  currentGame?: number | null;
  currentLevel?: number | null;
  attemptId?: string | null;
  checkpoint?: {
    currentTrialIdx?: number;
    savedRecords?: unknown[];
    [key: string]: unknown;
  } | null;
}

const API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
    : undefined;

/**
 * Fetches the current active session for the authenticated user / selected child.
 * Returns null if unauthenticated, the backend is unreachable, or no
 * session exists yet. Always bypasses browser HTTP cache to prevent stale stage loops.
 */
export async function fetchCurrentSession(
  childProfileId?: string
): Promise<QuestSession | null> {
  if (!API_URL) return null;

  const targetChildId = childProfileId || getActiveChildId() || undefined;
  const queryParam = targetChildId
    ? `?childProfileId=${encodeURIComponent(targetChildId)}`
    : "";

  try {
    const res = await fetch(`${API_URL}/api/quest/sessions/current${queryParam}`, {
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
    return (data?.data ?? null) as QuestSession | null;
  } catch {
    return null;
  }
}

/**
 * Evaluates the authoritative resume state for the authenticated player / selected child.
 * Checks for unfinished in-progress quest sessions, warm-up status, and saved checkpoints.
 * Never creates a quest session as a side effect.
 */
export async function fetchResumeState(
  childProfileId?: string
): Promise<QuestResumeState> {
  if (!API_URL) {
    return { hasResumableQuest: false, destination: "/" };
  }

  const targetChildId = childProfileId || getActiveChildId() || undefined;
  const queryParam = targetChildId
    ? `?childProfileId=${encodeURIComponent(targetChildId)}`
    : "";

  try {
    const res = await fetch(`${API_URL}/api/quest/resume-state${queryParam}`, {
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
  checkpoint: Record<string, unknown>
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
 * Fetches the current session, or creates a new one for the selected child if none exists.
 * Returns null only when unauthenticated or the backend is unreachable.
 */
export async function fetchOrCreateSession(
  childProfileId?: string
): Promise<QuestSession | null> {
  if (!API_URL) return null;

  const targetChildId = childProfileId || getActiveChildId() || undefined;

  try {
    // 1. Try to get existing session
    const existing = await fetchCurrentSession(targetChildId);
    if (existing) {
      if (existing.childProfileId) {
        setActiveChildId(existing.childProfileId);
      }
      return existing;
    }

    // 2. No session — create one
    const res = await fetch(`${API_URL}/api/quest/sessions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        targetChildId ? { childProfileId: targetChildId } : {}
      ),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const created = (data?.data ?? null) as QuestSession | null;
    if (created?.childProfileId) {
      setActiveChildId(created.childProfileId);
    }
    return created;
  } catch {
    return null;
  }
}

/**
 * Explicit helper to start or resume a child's quest session.
 */
export async function startChildQuest(
  childProfileId: string
): Promise<{ session: QuestSession | null; destination: string }> {
  setActiveChildId(childProfileId);

  // Check resume state first
  const resumeState = await fetchResumeState(childProfileId);
  if (resumeState.hasResumableQuest && resumeState.sessionId) {
    return {
      session: await fetchCurrentSession(childProfileId),
      destination: resumeState.destination,
    };
  }

  // Create new session specifically for this child
  const session = await fetchOrCreateSession(childProfileId);
  if (!session) {
    throw new Error("Failed to start quest session. Please try again.");
  }

  const destination = session.isWarmUpCompleted
    ? `/games/stroop?level=1&sessionId=${session.id}`
    : `/warm-up?sessionId=${session.id}`;

  return { session, destination };
}
