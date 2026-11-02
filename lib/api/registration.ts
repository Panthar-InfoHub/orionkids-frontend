import { API_BASE_URL } from "./auth";

export const CURRENT_TERMS_VERSION = "v1.0";
export const CURRENT_PRIVACY_POLICY_VERSION = "v1.0";

export interface AccessRequestItem {
  id: string;
  userId?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  notes?: string | null;
  submittedAt: string;
  reviewedAt?: string | null;
  reviewedById?: string | null;
  rejectionReason?: string | null;
}

export interface RegistrationStatus {
  userId: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  accountStatus: "PENDING" | "ACTIVE" | "RESTRICTED";
  termsAccepted: boolean;
  currentTermsVersion: string;
  userTermsVersion: string | null;
  termsAcceptedAt: string | null;
  privacyPolicyVersion: string | null;
  privacyAcceptedAt: string | null;
  accessRequestStatus: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  accessRequest: AccessRequestItem | null;
  onboardingCompleted: boolean;
  childProfileCount: number;
  destination: string;
}

export interface AccessRequestResult {
  message: string;
  request: AccessRequestItem;
  status: RegistrationStatus;
}

export interface MyAccessRequestsResponse {
  currentRequest: AccessRequestResult["request"] | null;
  history: AccessRequestResult["request"][];
  status: RegistrationStatus;
}

/**
 * Fetch authoritative registration, terms, and approval status from backend.
 */
export async function fetchRegistrationStatus(): Promise<RegistrationStatus | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/registration/status`, {
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

    if (!res.ok) {
      console.warn(`[registration] /api/registration/status returned ${res.status}`);
      return null;
    }

    const payload = await res.json();
    if (payload.success && payload.data) {
      return payload.data as RegistrationStatus;
    }
    return null;
  } catch (err) {
    console.warn("[registration] fetchRegistrationStatus error:", err);
    return null;
  }
}

/**
 * Submit terms and privacy policy acceptance to backend.
 */
export async function submitAcceptTerms(options?: {
  termsVersion?: string;
  privacyPolicyVersion?: string;
}): Promise<RegistrationStatus> {
  const res = await fetch(`${API_BASE_URL}/api/registration/accept-terms`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      agree: true,
      termsVersion: options?.termsVersion || CURRENT_TERMS_VERSION,
      privacyPolicyVersion: options?.privacyPolicyVersion || CURRENT_PRIVACY_POLICY_VERSION,
    }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    const msg = payload?.error?.message || "Failed to record terms acceptance.";
    throw new Error(msg);
  }

  return payload.data as RegistrationStatus;
}

/**
 * Submit access request to administration for account approval.
 */
export async function submitAccessRequest(notes?: string): Promise<AccessRequestResult> {
  const res = await fetch(`${API_BASE_URL}/api/access-requests`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ notes }),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    const msg = payload?.error?.message || "Failed to submit access request.";
    throw new Error(msg);
  }

  return payload.data as AccessRequestResult;
}

/**
 * Fetch current user's submitted access request and history.
 */
export async function fetchMyAccessRequest(): Promise<MyAccessRequestsResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/access-requests/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const payload = await res.json();
    return (payload?.data || null) as MyAccessRequestsResponse | null;
  } catch (err) {
    console.warn("[registration] fetchMyAccessRequest error:", err);
    return null;
  }
}
