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
  image?: string | null;
  role: "USER" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  restrictedReason?: string | null;
  termsAccepted?: boolean;
  termsVersion?: string | null;
  termsAcceptedAt?: string | null;
  privacyPolicyVersion?: string | null;
  privacyAcceptedAt?: string | null;
  accessRequestStatus?: "NONE" | "PENDING" | "APPROVED" | "REJECTED" | null;
  accessRequest?: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    submittedAt: string;
    reviewedAt?: string | null;
    reviewedById?: string | null;
    rejectionReason?: string | null;
  } | null;
  onboardingSubmittedAt?: string | null;
  hasCompletedOnboarding?: boolean;
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

// Cache for current user profile to eliminate duplicate /api/me roundtrips across rapid renders/components
let cachedProfile: UserProfile | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 15000; // 15s TTL

// In-flight deduplication to avoid redundant concurrent /api/me requests when multiple components mount
let inFlightProfilePromise: Promise<UserProfile | null> | null = null;

export function clearProfileCache(): void {
  cachedProfile = null;
  cacheExpiry = 0;
}

/**
 * Fetch fresh user profile from backend `/api/me`.
 * Returns null if unauthenticated or session expired without throwing uncaught errors.
 * Deduplicates in-flight calls and caches for 15s to avoid redundant parallel network roundtrips.
 */
export async function fetchCurrentUserProfile(forceRefresh = false): Promise<UserProfile | null> {
  if (!forceRefresh && cachedProfile !== null && Date.now() < cacheExpiry) {
    return cachedProfile;
  }

  if (inFlightProfilePromise) {
    return inFlightProfilePromise;
  }

  inFlightProfilePromise = (async () => {
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
        cachedProfile = null;
        cacheExpiry = Date.now() + 5000; // Cache guest status for 5s to prevent immediate re-probing
        return null;
      }

      // 403 with ACCOUNT_RESTRICTED means user account is restricted in PostgreSQL
      if (res.status === 403) {
        const payload = await res.json().catch(() => null);
        if (
          payload?.code === "ACCOUNT_RESTRICTED" ||
          payload?.error?.code === "ACCOUNT_RESTRICTED"
        ) {
          const restrictedUser: UserProfile = {
            id: payload?.data?.id || "",
            name: payload?.data?.name || "User",
            email: payload?.data?.email || "",
            role: "USER",
            status: "RESTRICTED",
            restrictedReason: payload?.data?.restrictedReason || null,
          };
          cachedProfile = restrictedUser;
          cacheExpiry = Date.now() + CACHE_TTL_MS;
          return restrictedUser;
        }
        cachedProfile = null;
        cacheExpiry = Date.now() + 5000;
        return null;
      }

      if (!res.ok) {
        console.warn(`[auth] /api/me returned status ${res.status}`);
        cachedProfile = null;
        return null;
      }

      const payload = await res.json();
      if (payload.success && payload.data) {
        const profile = payload.data as UserProfile;
        cachedProfile = profile;
        cacheExpiry = Date.now() + CACHE_TTL_MS;
        return profile;
      }
      cachedProfile = null;
      return null;
    } catch (error) {
      // Network failure (e.g. backend server is offline or unreachable)
      if (process.env.NODE_ENV === "development") {
        const errStr = error instanceof Error ? error.message : String(error);
        if (errStr.includes("Failed to fetch") || errStr.includes("fetch failed")) {
          console.debug(
            `[auth] /api/me unreachable (${API_BASE_URL}). Running in guest mode.`
          );
          cachedProfile = null;
          cacheExpiry = Date.now() + 5000;
          return null;
        }
      }
      console.warn("[auth] /api/me fetch error:", error);
      cachedProfile = null;
      return null;
    } finally {
      inFlightProfilePromise = null;
    }
  })();

  return inFlightProfilePromise;
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
    return "/account/restricted";
  }

  // 2. Active Administrator
  if (profile.role === "ADMIN" && profile.status === "ACTIVE") {
    return "/admin";
  }

  // 3. Terms Acceptance: if not accepted, MUST accept terms first
  if (profile.termsAccepted === false) {
    return "/terms-and-conditions";
  }

  // 4. Access Request State
  const reqStatus =
    profile.accessRequestStatus ||
    (profile.status === "ACTIVE" ? "APPROVED" : "NONE");

  if (reqStatus === "REJECTED") {
    return "/access-rejected";
  }

  if (reqStatus === "NONE") {
    return "/access-request";
  }

  if (reqStatus === "PENDING" || profile.status === "PENDING") {
    return "/access-pending";
  }

  // 5. Approved Active User:
  // Check child onboarding completion
  const hasOnboarded =
    Boolean(profile.hasCompletedOnboarding) ||
    Boolean(profile.onboardingSubmittedAt) ||
    Boolean(profile.childProfiles && profile.childProfiles.length > 0) ||
    Boolean(profile.childProfile);

  if (!hasOnboarded) {
    const redirectParam =
      fallbackRedirect &&
      fallbackRedirect !== "/warm-up" &&
      !fallbackRedirect.includes("onboarding")
        ? `?redirect=${encodeURIComponent(fallbackRedirect)}`
        : "";
    return `/onboarding${redirectParam}`;
  }

  // 6. Active regular user with onboarding completed
  if (fallbackRedirect && fallbackRedirect.startsWith("/") && !fallbackRedirect.startsWith("//")) {
    if (
      !fallbackRedirect.includes("/login") &&
      !fallbackRedirect.includes("/pending-approval") &&
      !fallbackRedirect.includes("/access-pending") &&
      !fallbackRedirect.includes("/access-rejected") &&
      !fallbackRedirect.includes("/access-denied") &&
      !fallbackRedirect.includes("/terms-and-conditions") &&
      !fallbackRedirect.includes("/access-request")
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
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}

export interface AccountStatusData {
  status: "PENDING" | "ACTIVE" | "RESTRICTED";
  role: "USER" | "ADMIN";
  restrictedReason?: string | null;
}

/**
 * Lightweight account status check from backend `/api/me/account-status`.
 * Returns null if unauthenticated or network error.
 */
export async function fetchAccountStatus(): Promise<AccountStatusData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/me/account-status`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    if (res.status === 401) {
      return null;
    }

    if (res.status === 403) {
      const payload = await res.json().catch(() => null);
      if (
        payload?.code === "ACCOUNT_RESTRICTED" ||
        payload?.error?.code === "ACCOUNT_RESTRICTED"
      ) {
        return {
          status: "RESTRICTED",
          role: "USER",
          restrictedReason: payload?.data?.restrictedReason || null,
        };
      }
    }

    if (!res.ok) {
      return null;
    }

    const payload = await res.json().catch(() => null);
    if (payload?.success && payload?.data) {
      return payload.data as AccountStatusData;
    }
    return null;
  } catch {
    return null;
  }
}

export const ACCOUNT_RESTRICTION_EVENT_KEY = "orionkids_account_restricted_event";

/**
 * Broadcasts an account restriction event across browser tabs and local context.
 */
export function broadcastAccountRestricted(reason?: string | null) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem("orion_account_restricted_reason", reason || "");
    window.dispatchEvent(new CustomEvent("orion:account-restricted", { detail: { reason } }));
  } catch {}

  try {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("orionkids_account_status");
      channel.postMessage({ type: "ACCOUNT_RESTRICTED", reason });
      channel.close();
    }
  } catch {
    // Fallback to localStorage event for environments where BroadcastChannel is constrained
  }

  try {
    localStorage.setItem(
      ACCOUNT_RESTRICTION_EVENT_KEY,
      JSON.stringify({ timestamp: Date.now(), reason })
    );
  } catch {
    // Ignore storage quota/permission exceptions
  }
}
