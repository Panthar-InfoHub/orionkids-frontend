"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  fetchAccountStatus,
  broadcastAccountRestricted,
  ACCOUNT_RESTRICTION_EVENT_KEY,
} from "@/lib/api/auth";

// Public routes where unauthenticated guests are allowed and status polling is unnecessary
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/about-us",
  "/contact-us",
  "/help-support",
  "/privacy-policy",
  "/terms-and-conditions",
  "/our-approach",
  "/for-parents",
  "/for-schools",
  "/printables",
  "/blog",
  "/report-link-expired",
  "/account/restricted",
];

function isProtectedPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/account/restricted") return false;

  // Exact matches for public paths
  if (PUBLIC_PATHS.includes(pathname)) return false;

  // Prefix matches for public sections (e.g. /blog/..., /printables/...)
  if (
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/printables/") ||
    pathname.startsWith("/api/")
  ) {
    return false;
  }

  return true;
}

export function AccountStatusListener() {
  const router = useRouter();
  const pathname = usePathname();
  const inFlightRef = useRef(false);

  useEffect(() => {
    // 1. Cross-tab synchronization via BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== "undefined") {
        channel = new BroadcastChannel("orionkids_account_status");
        channel.onmessage = (event) => {
          if (event?.data?.type === "ACCOUNT_RESTRICTED") {
            if (pathname !== "/account/restricted") {
              router.replace("/account/restricted");
            }
          }
        };
      }
    } catch {
      // Fallback to storage event below
    }

    // 2. Storage event fallback for cross-tab sync
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === ACCOUNT_RESTRICTION_EVENT_KEY && event.newValue) {
        if (pathname !== "/account/restricted") {
          router.replace("/account/restricted");
        }
      }
    };
    window.addEventListener("storage", handleStorageEvent);

    // 3. Lightweight verification routine on protected routes
    const verifyStatus = async () => {
      if (!isProtectedPath(pathname)) return;
      if (inFlightRef.current) return;

      inFlightRef.current = true;
      try {
        const statusData = await fetchAccountStatus();
        if (statusData?.status === "RESTRICTED") {
          broadcastAccountRestricted(statusData.restrictedReason);
          router.replace("/account/restricted");
        }
      } catch {
        // Non-blocking
      } finally {
        inFlightRef.current = false;
      }
    };

    // Run verification immediately on mount / route transition if on protected path
    verifyStatus();

    // Re-verify when tab regains focus or visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        verifyStatus();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleVisibilityChange);

    // Periodic polling on protected paths with reasonable interval (15s) and strict cleanup
    let intervalId: NodeJS.Timeout | null = null;
    if (isProtectedPath(pathname)) {
      intervalId = setInterval(verifyStatus, 15000);
    }

    return () => {
      if (channel) {
        channel.close();
      }
      window.removeEventListener("storage", handleStorageEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pathname, router]);

  return null;
}

