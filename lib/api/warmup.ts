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
  sessionId?: string;
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit warm-up answers: ${response.statusText}`);
      }

      const resJson = await response.json();
      const payloadData = resJson?.data || {};
      return {
        success: resJson.success ?? payloadData.success ?? true,
        message: resJson.message || payloadData.message || "Warm-up saved successfully",
        nextGameRoute: payloadData.nextGameRoute || resJson.nextGameRoute || "/games/stroop?level=1",
        sessionId: payloadData.sessionId || resJson.sessionId || payload.sessionId,
      };
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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit warm-up answers. Please retry.",
      nextGameRoute: "/games/stroop?level=1",
    };
  }
}
