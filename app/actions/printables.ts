"use server";

import { PrintablesFilterParams } from "@/types/printables";
import { getPrintablesData, trackPrintableDownload } from "@/lib/api/printables";

export interface CustomSheetRequestInput {
  parentEmail: string;
  gradeLevel: string;
  topicOrFocus: string;
  additionalNotes?: string;
}

/**
 * Server Action for requesting custom classroom or home-activity sheets.
 * Connects directly to backend DB, email service, or webhook.
 */
export async function requestCustomSheetAction(input: CustomSheetRequestInput) {
  try {
    if (!input.parentEmail || !input.parentEmail.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!input.gradeLevel) {
      return { success: false, error: "Please specify target grade level." };
    }

    // Connect to backend API if configured
    const apiUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/api/printables/custom-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit request: ${res.statusText}`);
      }
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[requestCustomSheetAction] Request received:", input);
    }

    return {
      success: true,
      message: "Custom sheet request submitted! Our curriculum specialists will review and email you.",
    };
  } catch (error) {
    console.error("[requestCustomSheetAction] Error:", error);
    return {
      success: false,
      error: "Unable to submit request at this time. Please try again.",
    };
  }
}

/**
 * Server Action to record and count printable downloads.
 */
export async function recordPrintableDownloadAction(printableId: string) {
  try {
    await trackPrintableDownload(printableId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
