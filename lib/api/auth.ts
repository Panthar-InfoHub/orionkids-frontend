import { signOut as authSignOut } from "@/lib/auth-client";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  restrictedReason: string | null;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Fetch fresh user profile from backend `/api/me`.
 * Returns null if unauthenticated or session expired without throwing uncaught errors.
 */
export async function fetchCurrentUserProfile(): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    // 401 means user is simply not logged in; return null safely without error logs
    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      console.warn(`[auth] /api/me returned status ${res.status}`);
      return null;
    }

    const payload = await res.json();
    if (payload.success && payload.data) {
      return payload.data as UserProfile;
    }
    return null;
  } catch (error) {
    // Network failure (e.g. backend server is not running or CORS blocked)
    console.warn("[auth] Failed to connect to backend /api/me:", error);
    return null;
  }
}

/**
 * Safely sign out the user and clear Better Auth database session.
 */
export async function performSignOut(): Promise<void> {
  try {
    await authSignOut();
  } catch (err) {
    console.error("Error signing out:", err);
  } finally {
    window.location.href = "/login";
  }
}
