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

/**
 * Fetch paginated list of users from backend GET /api/admin/users.
 * Requires an active ADMIN session with cookies.
 */
export async function fetchAdminUsers(
  params: ListUsersParams = {}
): Promise<ListUsersResult> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.status) query.set("status", params.status);

  const url = `${API_BASE_URL}/api/admin/users${query.toString() ? `?${query.toString()}` : ""}`;

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
}

/**
 * Fetch counts for metrics cards across all statuses.
 */
export async function fetchAdminMetrics(): Promise<AdminMetrics> {
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

