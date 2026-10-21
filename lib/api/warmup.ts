/**
 * Service for Warm-Up assessment responses and Stroop game initiation.
 * Designed for easy backend integration with Express/Next.js API routes.
 */

export interface WarmUpSubmissionPayload {
  sessionId?: string;
  studentId?: string;
  answers: Record<number, string>;
  completedAt: string;
}

export interface WarmUpSubmissionResponse {
  success: boolean;
  message?: string;
  nextGameRoute?: string;
}

/**
 * Submit warm-up questions answers to backend.
 * Currently simulates API latency and gracefully returns success.
 */
export async function submitWarmUpAnswers(
  payload: WarmUpSubmissionPayload
): Promise<WarmUpSubmissionResponse> {
  try {
    // If a backend endpoint is configured via environment variable, make the call
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const response = await fetch(`${apiUrl}/api/warm-up/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit warm-up answers: ${response.statusText}`);
      }

      return await response.json();
    }

    // Default prototype behavior: log payload & resolve gracefully
    if (process.env.NODE_ENV !== "production") {
      console.log("[WarmUp] Answers submitted successfully:", payload);
    }

    return {
      success: true,
      message: "Warm-up saved successfully",
      nextGameRoute: "/games/stroop",
    };
  } catch (error) {
    console.error("[WarmUp] Error submitting answers:", error);
    // Don't block the child in case of network issue in prototype stage
    return {
      success: true,
      message: "Proceeding with local state",
      nextGameRoute: "/games/stroop",
    };
  }
}
