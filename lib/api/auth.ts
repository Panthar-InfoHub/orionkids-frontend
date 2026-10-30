import { signOut as authSignOut } from "@/lib/auth-client";

export interface ChildProfileData {
  id?: string;
  childName: string;
  age: number;
  language: string;
  school?: string | null;
  selectedClass: string;
  studentId?: string | null;
  parentEmail: string;
  parentMobile: string;
  isGuardian: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "USER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  restrictedReason: string | null;
  onboardingSubmittedAt?: string | null;
  childProfile?: ChildProfileData | null;
  childProfiles?: ChildProfileData[];
}

export interface OnboardingPayload {
  childName: string;
  age: number;
  language: string;
  school?: string;
  selectedClass: string;
  studentId?: string;
  parentEmail: string;
  parentMobile: string;
  isGuardian: boolean;
  idempotencyKey?: string;
}

export interface OnboardingResult {
  user: UserProfile;
  childProfile: ChildProfileData & { id: string };
  session?: {
    id: string;
    childProfileId?: string;
    status: string;
    currentStage: string;
  };
  sessionId?: string;
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
    // Network failure (e.g. backend server is offline or unreachable)
    if (process.env.NODE_ENV === "development") {
      const errStr = error instanceof Error ? error.message : String(error);
      if (errStr.includes("Failed to fetch") || errStr.includes("fetch failed")) {
        console.debug(
          `[auth] Backend at ${API_BASE_URL} is currently unreachable. Treating as guest session.`
        );
      } else {
        console.warn("[auth] /api/me check error:", errStr);
      }
    }
    return null;
  }
}

/**
 * Submit child onboarding details to backend.
 * Persists childProfile and marks user as having submitted onboarding.
 */
export async function submitOnboarding(payload: OnboardingPayload): Promise<OnboardingResult> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (payload.idempotencyKey) {
    headers["x-idempotency-key"] = payload.idempotencyKey;
  }

  const res = await fetch(`${API_BASE_URL}/api/onboarding`, {
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
        : "Failed to submit onboarding. Please try again.");
    throw new Error(message);
  }

  return data.data as OnboardingResult;
}

/**
 * Single authoritative profile-to-destination decision function.
 * Evaluates verified backend profile state and returns the correct URL path.
 */
export function getRouteForUserProfile(
  profile: UserProfile | null,
  fallbackRedirect?: string | null
): string {
  if (!profile) {
    const redirectParam = fallbackRedirect ? `?redirect=${encodeURIComponent(fallbackRedirect)}` : "";
    return `/login${redirectParam}`;
  }

  // 1. Restricted account
  if (profile.status === "RESTRICTED") {
    return "/access-denied";
  }

  // 2. Active Administrator
  if (profile.role === "ADMIN" && profile.status === "ACTIVE") {
    return "/admin";
  }

  // 3. Regular User:
  // If user has not submitted onboarding yet, MUST complete onboarding first!
  if (!profile.onboardingSubmittedAt) {
    const redirectParam = fallbackRedirect && fallbackRedirect !== "/warm-up" && !fallbackRedirect.includes("onboarding")
      ? `?redirect=${encodeURIComponent(fallbackRedirect)}`
      : "";
    return `/onboarding${redirectParam}`;
  }

  // 4. Onboarding submitted, pending administrator review
  if (profile.status === "PENDING") {
    return "/pending-approval";
  }

  // 5. Active regular user
  if (fallbackRedirect && fallbackRedirect.startsWith("/") && !fallbackRedirect.startsWith("//")) {
    if (
      !fallbackRedirect.includes("/login") &&
      !fallbackRedirect.includes("/pending-approval") &&
      !fallbackRedirect.includes("/access-denied") &&
      !fallbackRedirect.includes("/onboarding")
    ) {
      return fallbackRedirect;
    }
  }

  // Default authenticated destination for active parent is their Parent Dashboard
  return "/dashboard";
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

