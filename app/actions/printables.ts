"use server";

import { PrintablesFilterParams } from "@/types/printables";
import { getPrintablesData, trackPrintableDownload } from "@/lib/api/printables";

// Note: "Request Custom Sheet" submissions go straight from the browser to the
// backend (lib/api/custom-sheets.ts) so the per-visitor rate limit sees the
// real visitor IP instead of this server's IP.

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
