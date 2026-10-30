import { API_BASE_URL, type ChildProfileData } from "./auth";

export interface ChildStats {
  totalQuests: number;
  completedQuests: number;
  hasInProgressQuest: boolean;
  activeSessionId: string | null;
  currentStage: string;
  currentGame: number;
  currentLevel: number;
  completedLevelsCount: number;
  progressOverall: number;
  hasReport: boolean;
  latestActivityAt: string;
}

export interface ChildWithStats extends ChildProfileData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  stats: ChildStats;
}

export interface LevelProgressionItem {
  levelNumber: number;
  status: "COMPLETED" | "IN_PROGRESS" | "LOCKED";
  attempt: {
    id: string;
    accuracy: number | null;
    durationMs: number | null;
    averageReactionTimeMs: number | null;
    completedAt: string | null;
  } | null;
}

export interface GameMatrixItem {
  id: number;
  key: string;
  title: string;
  totalLevels: number;
  levels: LevelProgressionItem[];
}

export interface ChildProgressResponse {
  child: {
    id: string;
    childName: string;
    age: number;
    selectedClass: string;
    school: string | null;
  };
  hasSession: boolean;
  sessionId?: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  currentStage: string;
  currentGame: number;
  currentLevel: number;
  completedLevelsCount: number;
  totalLevelsCount: number;
  progressPercentage: number;
  matrix: GameMatrixItem[];
  recentAttempts: Array<Record<string, unknown>>;
  hasReport: boolean;
  reportId?: string | null;
}

export interface ChildQuestSessionItem {
  id: string;
  childProfileId: string | null;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  currentStage: string;
  currentGame: number;
  currentLevel: number;
  completedLevelsCount: number;
  isWarmUpCompleted: boolean;
  startedAt: string;
  lastActivityAt: string;
  completedAt: string | null;
  hasReport: boolean;
  report?: {
    id: string;
    generatedAt: string;
    overallAccuracy: number;
    totalDurationMs: number;
  } | null;
}

export interface ChildReportItem {
  id: string;
  questSessionId: string;
  childProfileId: string;
  childName: string;
  age: number;
  selectedClass: string;
  school: string | null;
  overallAccuracy: number;
  totalDurationMs: number;
  gameSummaries: Record<string, unknown>;
  cognitiveFacets: Record<string, unknown>;
  growthObservations: Record<string, unknown>;
  schemaVersion: number;
  generatedAt: string;
}

export interface CreateChildPayload {
  childName: string;
  age: number;
  language: string;
  school?: string | null;
  selectedClass: string;
  studentId?: string | null;
  parentEmail: string;
  parentMobile: string;
  isGuardian: boolean;
  idempotencyKey?: string;
}

export interface UpdateChildPayload {
  childName?: string;
  age?: number;
  language?: string;
  school?: string | null;
  selectedClass?: string;
  studentId?: string | null;
  parentMobile?: string;
}

const ACTIVE_CHILD_STORAGE_KEY = "orionkids_active_child_id";

/**
 * Gets currently selected child ID from client storage.
 */
export function getActiveChildId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ACTIVE_CHILD_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Persists the currently selected child ID in client storage.
 */
export function setActiveChildId(childId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_CHILD_STORAGE_KEY, childId);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Clears selected child ID from client storage.
 */
export function clearActiveChildId(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ACTIVE_CHILD_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

/**
 * Fetches all registered children for the authenticated parent with progress stats.
 */
export async function fetchChildren(): Promise<ChildWithStats[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/children`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401) return [];
      console.warn(`[children] fetchChildren returned status ${res.status}`);
      return [];
    }

    const payload = await res.json();
    return (payload?.data || []) as ChildWithStats[];
  } catch (err) {
    console.error("[children] Error fetching children list:", err);
    return [];
  }
}

/**
 * Fetches single authorized child profile.
 */
export async function fetchChild(childId: string): Promise<ChildWithStats | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/children/${encodeURIComponent(childId)}`, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const payload = await res.json();
    return (payload?.data ?? null) as ChildWithStats | null;
  } catch (err) {
    console.error(`[children] Error fetching child ${childId}:`, err);
    return null;
  }
}

/**
 * Creates an additional child profile for the authenticated parent.
 */
export async function createChild(
  payload: CreateChildPayload
): Promise<ChildWithStats & { initialSessionId?: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (payload.idempotencyKey) {
    headers["x-idempotency-key"] = payload.idempotencyKey;
  }

  const res = await fetch(`${API_BASE_URL}/api/children`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    const message =
      data?.error?.message ||
      (data?.error?.details
        ? Object.values(data.error.details).join(", ")
        : "Failed to create child profile. Please try again.");
    throw new Error(message);
  }

  const child = data.data as ChildWithStats & { initialSessionId?: string };
  if (child?.id) {
    setActiveChildId(child.id);
  }
  return child;
}

/**
 * Updates permitted profile fields for the specified child.
 */
export async function updateChild(
  childId: string,
  payload: UpdateChildPayload
): Promise<ChildWithStats> {
  const res = await fetch(`${API_BASE_URL}/api/children/${encodeURIComponent(childId)}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    const message = data?.error?.message || "Failed to update child profile.";
    throw new Error(message);
  }

  return data.data as ChildWithStats;
}

/**
 * Retrieves the 6-game, 18-level progress summary for a specific child.
 */
export async function fetchChildProgress(
  childId: string
): Promise<ChildProgressResponse | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/children/${encodeURIComponent(childId)}/progress`,
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    const payload = await res.json();
    return (payload?.data ?? null) as ChildProgressResponse | null;
  } catch (err) {
    console.error(`[children] Error fetching progress for child ${childId}:`, err);
    return null;
  }
}

/**
 * Retrieves all quest sessions for a specific child.
 */
export async function fetchChildQuestSessions(
  childId: string
): Promise<ChildQuestSessionItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/children/${encodeURIComponent(childId)}/quest-sessions`,
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) return [];
    const payload = await res.json();
    return (payload?.data || []) as ChildQuestSessionItem[];
  } catch (err) {
    console.error(`[children] Error fetching sessions for child ${childId}:`, err);
    return [];
  }
}

/**
 * Retrieves available progress and assessment reports for a specific child.
 */
export async function fetchChildReports(
  childId: string
): Promise<ChildReportItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/children/${encodeURIComponent(childId)}/reports`,
      {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!res.ok) return [];
    const payload = await res.json();
    return (payload?.data || []) as ChildReportItem[];
  } catch (err) {
    console.error(`[children] Error fetching reports for child ${childId}:`, err);
    return [];
  }
}
