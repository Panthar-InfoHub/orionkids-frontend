import { API_BASE_URL } from "./auth";

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  restrictedReason: string | null;
  reviewedAt: string | null;
  reviewedById: string | null;
  onboardingSubmittedAt?: string | null;
  childProfile?: {
    id?: string;
    childName: string;
    age: number;
    language: string;
    school?: string | null;
    selectedClass: string;
    studentId?: string | null;
    parentEmail: string;
    parentMobile: string;
    isGuardian?: boolean;
    createdAt?: string;
    updatedAt?: string;
  } | null;
  questSessionCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  status?: "PENDING" | "ACTIVE" | "RESTRICTED";
  role?: "USER" | "ADMIN";
  search?: string;
}

export interface ListUsersResult {
  users: AdminUserItem[];
  meta: AdminPaginationMeta;
}

export interface UpdateUserStatusPayload {
  status: "ACTIVE" | "RESTRICTED";
  reason?: string;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  message?: string;
  data: T;
  meta?: AdminPaginationMeta;
}

export interface ApiErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface AdminOverviewResult {
  accounts: {
    total: number;
    pending: number;
    active: number;
    restricted: number;
    admins: number;
    regularUsers: number;
  };
  children: {
    total: number;
  };
  sessions: {
    total: number;
    completed: number;
    inProgress: number;
    abandoned: number;
  };
  recentCompletions: Array<{
    sessionId: string;
    userId: string;
    userName: string;
    userEmail: string;
    startedAt: string;
    completedAt: string | null;
    reportId: string | null;
    overallAccuracy: number | null;
    totalDurationMs: number | null;
  }>;
  recentRegistrations: Array<{
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    status: "PENDING" | "ACTIVE" | "RESTRICTED";
    createdAt: string;
  }>;
}

export interface AdminChildProfile {
  id: string;
  userId: string;
  childName: string;
  age: number;
  language: string;
  school: string | null;
  selectedClass: string;
  studentId: string | null;
  parentEmail: string;
  parentMobile: string;
  isGuardian: boolean;
  createdAt: string;
  updatedAt: string;
  totalSessions?: number;
  sessionStatus?: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED" | "ABANDONED";
  completedLevels?: number;
  latestActivityAt?: string;
  hasReport?: boolean;
  reportId?: string | null;
}

export interface AdminChildDetail {
  id: string;
  userId: string;
  parentName: string;
  parentEmail: string;
  childName: string;
  age: number;
  language: string;
  school: string | null;
  selectedClass: string;
  studentId: string | null;
  parentMobile: string;
  isGuardian: boolean;
  createdAt: string;
  updatedAt: string;
  stats: {
    totalSessions: number;
    completedSessions: number;
    inProgressSessions: number;
    abandonedSessions: number;
    completedLevels: number;
    sessionStatus: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED" | "ABANDONED";
    latestActivityAt: string;
    hasReport: boolean;
    reportId: string | null;
  };
}

export interface AdminUserDetail {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: "USER" | "ADMIN";
    status: "PENDING" | "ACTIVE" | "RESTRICTED";
    restrictedReason: string | null;
    reviewedAt: string | null;
    reviewedById: string | null;
    onboardingSubmittedAt: string | null;
    createdAt: string;
    updatedAt: string;
    childProfile: AdminChildProfile | null;
    accounts: Array<{
      id: string;
      providerId: string;
      createdAt: string;
    }>;
  };
  stats: {
    childProfileCount: number;
    totalSessions: number;
    completedSessions: number;
    inProgressSessions: number;
    abandonedSessions: number;
    totalCompletedLevels?: number;
    latestActivityAt: string;
    latestSession: {
      id: string;
      status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
      currentStage: string;
      currentGame: number;
      currentLevel: number;
      startedAt: string;
      lastActivityAt: string;
      completedAt: string | null;
    } | null;
  };
}

export interface AdminQuestSessionItem {
  id: string;
  userId: string;
  childProfileId?: string | null;
  childName?: string | null;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  currentStage: string;
  currentGame: number;
  currentLevel: number;
  startedAt: string;
  lastActivityAt: string;
  completedAt: string | null;
  abandonedAt: string | null;
  warmUpCompleted: boolean;
  completedLevelsCount: number;
  totalLevels: number;
  hasReport: boolean;
  report: {
    id: string;
    generatedAt: string;
    overallAccuracy: number;
    totalDurationMs: number;
  } | null;
  totalAttemptsCount: number;
}

export interface ListQuestSessionsParams {
  page?: number;
  limit?: number;
  status?: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
}

export interface ListQuestSessionsResult {
  sessions: AdminQuestSessionItem[];
  meta: AdminPaginationMeta;
}

export interface AdminGameLevelProgress {
  levelNumber: number;
  status: "COMPLETED" | "IN_PROGRESS" | "LOCKED";
  totalAttempts: number;
  bestAccuracy: number | null;
  bestDurationMs: number | null;
  completedAt: string | null;
  latestAttemptId: string | null;
}

export interface AdminGameProgress {
  gameId: number;
  gameKey: string;
  name: string;
  completedLevels: number;
  totalLevels: number;
  isGameCompleted: boolean;
  levels: AdminGameLevelProgress[];
}

export interface AdminQuestSessionDetail {
  session: {
    id: string;
    userId: string;
    status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
    currentStage: string;
    currentGame: number;
    currentLevel: number;
    startedAt: string;
    lastActivityAt: string;
    completedAt: string | null;
    abandonedAt: string | null;
    completedLevelsCount: number;
    totalLevels: number;
    isQuestComplete: boolean;
  };
  warmUp: {
    id: string;
    completedAt: string;
    answers: Record<string, string>;
  } | null;
  report: {
    id: string;
    generatedAt: string;
    overallAccuracy: number;
    totalDurationMs: number;
  } | null;
  progression: {
    highestCompletedIndex: number;
    authorizedCurrentGame: number;
    authorizedCurrentLevel: number;
    isQuestComplete: boolean;
    games: AdminGameProgress[];
  };
  attemptsSummary: {
    totalAttempts: number;
    completedAttempts: number;
    inProgressAttempts: number;
    abandonedAttempts: number;
  };
}

export interface AdminLevelAttemptItem {
  id: string;
  questSessionId: string;
  gameId: number;
  gameKey: string;
  levelNumber: number;
  attemptNumber: number;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  totalTrials: number | null;
  correctTrials: number | null;
  accuracy: number | null;
  durationMs: number | null;
  averageReactionTimeMs: number | null;
  metrics: Record<string, unknown> | null;
  trialRecords: Array<Record<string, unknown>> | null;
  startedAt: string;
  completedAt: string | null;
}

export interface ListLevelAttemptsParams {
  page?: number;
  limit?: number;
  gameKey?: string;
  levelNumber?: number;
  status?: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
}

export interface ListLevelAttemptsResult {
  attempts: AdminLevelAttemptItem[];
  meta: AdminPaginationMeta;
}

export interface AdminQuestReportDetail {
  id: string;
  questSessionId: string;
  userId: string;
  childName: string;
  age: number;
  selectedClass: string;
  school: string | null;
  overallAccuracy: number;
  totalDurationMs: number;
  gameSummaries: Array<{
    gameId: number;
    gameKey: string;
    gameName?: string;
    averageAccuracy: number;
    levelsCompleted: number;
    totalDurationMs: number;
  }>;
  cognitiveFacets: Record<string, unknown>;
  growthObservations: string[] | Record<string, unknown>;
  schemaVersion: number;
  generatedAt: string;
}

export interface AdminSessionReportResult {
  hasReport: boolean;
  reason?: "QUEST_IN_PROGRESS" | "NOT_YET_GENERATED";
  message?: string;
  report: AdminQuestReportDetail | null;
}

async function requestAdminApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message || body?.message || `Administrative API request failed (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  return body.data;
}

/**
 * Fetch system-wide administrative overview aggregates.
 */
export async function fetchAdminOverview(): Promise<AdminOverviewResult> {
  return requestAdminApi<AdminOverviewResult>("/api/admin/overview");
}

/**
 * Fetch paginated, filtered list of users from backend GET /api/admin/users.
 */
export async function fetchAdminUsers(
  params: ListUsersParams = {}
): Promise<ListUsersResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.status) query.set("status", params.status);
  if (params.role) query.set("role", params.role);
  if (params.search) query.set("search", params.search);

  const endpoint = `/api/admin/users${query.toString() ? `?${query.toString()}` : ""}`;
  const url = `${API_BASE_URL}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message || `Failed to fetch users (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const envelope = body as ApiSuccessEnvelope<AdminUserItem[]>;
  return {
    users: envelope.data || [],
    meta: envelope.meta || {
      page: params.page || 1,
      limit: params.limit || 10,
      total: envelope.data?.length || 0,
      totalPages: 1,
    },
  };
}

/**
 * Fetch comprehensive 360° overview of a single user.
 */
export async function fetchAdminUserDetail(
  userId: string
): Promise<AdminUserDetail> {
  return requestAdminApi<AdminUserDetail>(
    `/api/admin/users/${encodeURIComponent(userId)}`
  );
}

/**
 * Fetch child profile(s) associated with a user account.
 */
export async function fetchAdminUserChildren(
  userId: string
): Promise<AdminChildProfile[]> {
  return requestAdminApi<AdminChildProfile[]>(
    `/api/admin/users/${encodeURIComponent(userId)}/children`
  );
}

/**
 * Fetch quest sessions for a user.
 */
export async function fetchAdminUserQuestSessions(
  userId: string,
  params: ListQuestSessionsParams = {}
): Promise<ListQuestSessionsResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.status) query.set("status", params.status);

  const endpoint = `/api/admin/users/${encodeURIComponent(userId)}/quest-sessions${
    query.toString() ? `?${query.toString()}` : ""
  }`;
  const url = `${API_BASE_URL}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message || `Failed to fetch quest sessions (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const envelope = body as ApiSuccessEnvelope<AdminQuestSessionItem[]>;
  return {
    sessions: envelope.data || [],
    meta: envelope.meta || {
      page: params.page || 1,
      limit: params.limit || 10,
      total: envelope.data?.length || 0,
      totalPages: 1,
    },
  };
}

/**
 * Fetch detailed quest session breakdown including 6-game level progression.
 */
export async function fetchAdminUserQuestSessionDetail(
  userId: string,
  sessionId: string
): Promise<AdminQuestSessionDetail> {
  return requestAdminApi<AdminQuestSessionDetail>(
    `/api/admin/users/${encodeURIComponent(userId)}/quest-sessions/${encodeURIComponent(
      sessionId
    )}`
  );
}

/**
 * Fetch level attempts and raw telemetry for a quest session.
 */
export async function fetchAdminUserSessionAttempts(
  userId: string,
  sessionId: string,
  params: ListLevelAttemptsParams = {}
): Promise<ListLevelAttemptsResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.gameKey) query.set("gameKey", params.gameKey);
  if (params.levelNumber) query.set("levelNumber", params.levelNumber.toString());
  if (params.status) query.set("status", params.status);

  const endpoint = `/api/admin/users/${encodeURIComponent(
    userId
  )}/quest-sessions/${encodeURIComponent(sessionId)}/attempts${
    query.toString() ? `?${query.toString()}` : ""
  }`;
  const url = `${API_BASE_URL}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message || `Failed to fetch level attempts (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const envelope = body as ApiSuccessEnvelope<AdminLevelAttemptItem[]>;
  return {
    attempts: envelope.data || [],
    meta: envelope.meta || {
      page: params.page || 1,
      limit: params.limit || 50,
      total: envelope.data?.length || 0,
      totalPages: 1,
    },
  };
}

/**
 * Fetch saved quest assessment report in a strictly read-only manner.
 */
export async function fetchAdminUserSessionReport(
  userId: string,
  sessionId: string
): Promise<AdminSessionReportResult> {
  return requestAdminApi<AdminSessionReportResult>(
    `/api/admin/users/${encodeURIComponent(userId)}/quest-sessions/${encodeURIComponent(
      sessionId
    )}/report`
  );
}

/**
 * Fetch detailed single child profile information scoped to a parent.
 */
export async function fetchAdminChildDetail(
  userId: string,
  childProfileId: string
): Promise<AdminChildDetail> {
  return requestAdminApi<AdminChildDetail>(
    `/api/admin/users/${encodeURIComponent(
      userId
    )}/children/${encodeURIComponent(childProfileId)}`
  );
}

/**
 * Fetch quest sessions strictly filtered by child profile ID.
 */
export async function fetchAdminChildQuestSessions(
  userId: string,
  childProfileId: string,
  params: ListQuestSessionsParams = {}
): Promise<ListQuestSessionsResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.status) query.set("status", params.status);

  const endpoint = `/api/admin/users/${encodeURIComponent(
    userId
  )}/children/${encodeURIComponent(childProfileId)}/quest-sessions${
    query.toString() ? `?${query.toString()}` : ""
  }`;
  const url = `${API_BASE_URL}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message ||
      `Failed to fetch child quest sessions (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const envelope = body as ApiSuccessEnvelope<AdminQuestSessionItem[]>;
  return {
    sessions: envelope.data || [],
    meta: envelope.meta || {
      page: params.page || 1,
      limit: params.limit || 10,
      total: envelope.data?.length || 0,
      totalPages: 1,
    },
  };
}

/**
 * Fetch detailed single quest session breakdown for a child.
 */
export async function fetchAdminChildQuestSessionDetail(
  userId: string,
  childProfileId: string,
  sessionId: string
): Promise<AdminQuestSessionDetail> {
  return requestAdminApi<AdminQuestSessionDetail>(
    `/api/admin/users/${encodeURIComponent(
      userId
    )}/children/${encodeURIComponent(childProfileId)}/quest-sessions/${encodeURIComponent(
      sessionId
    )}`
  );
}

/**
 * Fetch level attempts and raw telemetry for a child quest session.
 */
export async function fetchAdminChildSessionAttempts(
  userId: string,
  childProfileId: string,
  sessionId: string,
  params: ListLevelAttemptsParams = {}
): Promise<ListLevelAttemptsResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.gameKey) query.set("gameKey", params.gameKey);
  if (params.levelNumber) query.set("levelNumber", params.levelNumber.toString());
  if (params.status) query.set("status", params.status);

  const endpoint = `/api/admin/users/${encodeURIComponent(
    userId
  )}/children/${encodeURIComponent(childProfileId)}/quest-sessions/${encodeURIComponent(
    sessionId
  )}/attempts${query.toString() ? `?${query.toString()}` : ""}`;
  const url = `${API_BASE_URL}${endpoint}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message ||
      `Failed to fetch child level attempts (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  const envelope = body as ApiSuccessEnvelope<AdminLevelAttemptItem[]>;
  return {
    attempts: envelope.data || [],
    meta: envelope.meta || {
      page: params.page || 1,
      limit: params.limit || 50,
      total: envelope.data?.length || 0,
      totalPages: 1,
    },
  };
}

/**
 * Fetch saved quest assessment report for a child quest session.
 */
export async function fetchAdminChildSessionReport(
  userId: string,
  childProfileId: string,
  sessionId: string
): Promise<AdminSessionReportResult> {
  return requestAdminApi<AdminSessionReportResult>(
    `/api/admin/users/${encodeURIComponent(
      userId
    )}/children/${encodeURIComponent(childProfileId)}/quest-sessions/${encodeURIComponent(
      sessionId
    )}/report`
  );
}

/**
 * Update a user's status via PATCH /api/admin/users/:id/status.
 * Supports approving (ACTIVE) or restricting with a reason (RESTRICTED).
 */
export async function updateAdminUserStatus(
  userId: string,
  payload: UpdateUserStatusPayload
): Promise<AdminUserItem> {
  const url = `${API_BASE_URL}/api/admin/users/${encodeURIComponent(userId)}/status`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(
      `Unable to connect to OrionKids backend service (${API_BASE_URL}). Please verify backend is running.`
    );
  }

  const body = await res.json();

  if (!res.ok || !body.success) {
    const errorMsg =
      body?.error?.message ||
      `Failed to update user status (HTTP ${res.status})`;
    throw new Error(errorMsg);
  }

  return (body as ApiSuccessEnvelope<AdminUserItem>).data;
}

export interface AdminMetrics {
  total: number;
  pending: number;
  active: number;
  restricted: number;
  totalChildren?: number;
  totalSessions?: number;
  completedSessions?: number;
}

/**
 * Fetch counts for metrics cards across all statuses.
 * Reuses getAdminOverview for atomic, single-query aggregates.
 */
export async function fetchAdminMetrics(): Promise<AdminMetrics> {
  try {
    const overview = await fetchAdminOverview();
    return {
      total: overview.accounts.total,
      pending: overview.accounts.pending,
      active: overview.accounts.active,
      restricted: overview.accounts.restricted,
      totalChildren: overview.children.total,
      totalSessions: overview.sessions.total,
      completedSessions: overview.sessions.completed,
    };
  } catch (err) {
    // Fallback if overview unavailable
    const [allRes, pendingRes, activeRes, restrictedRes] = await Promise.all([
      fetchAdminUsers({ limit: 1 }),
      fetchAdminUsers({ status: "PENDING", limit: 1 }),
      fetchAdminUsers({ status: "ACTIVE", limit: 1 }),
      fetchAdminUsers({ status: "RESTRICTED", limit: 1 }),
    ]);

    return {
      total: allRes.meta.total,
      pending: pendingRes.meta.total,
      active: activeRes.meta.total,
      restricted: restrictedRes.meta.total,
    };
  }
}

