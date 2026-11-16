import { API_BASE_URL } from "./auth";
import type { AdminPaginationMeta } from "./admin";

/* ------------------------------------------------------------------ */
/* Shared option lists — must match the backend Zod schema             */
/* (orionkids-backend/src/validators/customSheet.schema.ts)            */
/* ------------------------------------------------------------------ */

export const CUSTOM_SHEET_GRADE_LEVELS = [
  "Pre-K & K (Ages 4-5)",
  "Class 1-2 (Ages 6-7)",
  "Class 3-4 (Ages 8-9)",
  "Class 5+ (Ages 10+)",
] as const;

export const CUSTOM_SHEET_TYPES = [
  "Puzzles & Crosswords",
  "Coloring & Doodles",
  "Thinking & Focus Mats",
  "Cut & Fold Crafts",
  "Teacher Organizers",
  "Other",
] as const;

export type CustomSheetRequesterRole = "PARENT" | "TEACHER" | "SCHOOL";
export type CustomSheetRequestStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "DECLINED";

export const REQUESTER_ROLE_LABELS: Record<CustomSheetRequesterRole, string> = {
  PARENT: "Parent",
  TEACHER: "Teacher",
  SCHOOL: "School",
};

export const CUSTOM_SHEET_STATUS_LABELS: Record<CustomSheetRequestStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  DECLINED: "Declined",
};

/* ------------------------------------------------------------------ */
/* Public form submission                                               */
/* ------------------------------------------------------------------ */

export interface CustomSheetRequestInput {
  name: string;
  email: string;
  requesterRole: CustomSheetRequesterRole;
  organizationName?: string;
  phone?: string;
  gradeLevel: string;
  sheetType?: string;
  details: string;
  /** Honeypot — always empty for real users */
  website?: string;
}

/** Thrown when the backend rejects the form; `fieldErrors` maps field → message. */
export class CustomSheetRequestError extends Error {
  fieldErrors: Record<string, string>;
  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message);
    this.name = "CustomSheetRequestError";
    this.fieldErrors = fieldErrors;
  }
}

export async function submitCustomSheetRequest(
  input: CustomSheetRequestInput
): Promise<{ message: string }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}/api/custom-sheet-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch {
    throw new CustomSheetRequestError(
      "We couldn't reach our server. Please check your internet connection and try again."
    );
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    const fieldErrors: Record<string, string> = {};
    const details = payload?.error?.details;
    if (Array.isArray(details)) {
      for (const d of details) {
        if (d?.path && d?.message && !fieldErrors[d.path]) {
          fieldErrors[d.path] = String(d.message);
        }
      }
    }
    const message =
      Object.keys(fieldErrors).length > 0
        ? "Please fix the highlighted fields."
        : payload?.error?.message || "Unable to submit your request right now. Please try again.";
    throw new CustomSheetRequestError(message, fieldErrors);
  }

  return { message: payload.message || "Your request has been received." };
}

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */

export interface AdminCustomSheetRequest {
  id: string;
  name: string;
  email: string;
  requesterRole: CustomSheetRequesterRole;
  organizationName: string | null;
  phone: string | null;
  gradeLevel: string;
  sheetType: string | null;
  details: string;
  status: CustomSheetRequestStatus;
  adminNote: string | null;
  reviewedById: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListCustomSheetRequestsParams {
  page?: number;
  limit?: number;
  status?: CustomSheetRequestStatus | "ALL";
  search?: string;
}

export async function fetchAdminCustomSheetRequests(
  params: ListCustomSheetRequestsParams = {}
): Promise<{ requests: AdminCustomSheetRequest[]; meta: AdminPaginationMeta }> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.status && params.status !== "ALL") query.set("status", params.status);
  if (params.search) query.set("search", params.search);

  const res = await fetch(
    `${API_BASE_URL}/api/admin/custom-sheet-requests?${query.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json", "Cache-Control": "no-cache" },
      cache: "no-store",
    }
  );

  const payload = await res.json().catch(() => null);
  if (!res.ok || !payload?.success) {
    throw new Error(payload?.error?.message || "Failed to fetch custom sheet requests");
  }

  return {
    requests: (payload.data || []) as AdminCustomSheetRequest[],
    meta: (payload.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }) as AdminPaginationMeta,
  };
}

export async function updateAdminCustomSheetRequest(
  requestId: string,
  body: { status?: CustomSheetRequestStatus; adminNote?: string | null }
): Promise<AdminCustomSheetRequest> {
  const res = await fetch(
    `${API_BASE_URL}/api/admin/custom-sheet-requests/${encodeURIComponent(requestId)}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    }
  );

  const payload = await res.json().catch(() => null);
  if (!res.ok || !payload?.success) {
    const detail = payload?.error?.details?.[0]?.message;
    throw new Error(detail || payload?.error?.message || "Failed to update request");
  }
  return payload.data as AdminCustomSheetRequest;
}
