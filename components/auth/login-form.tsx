"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { fetchCurrentUserProfile, getRouteForUserProfile } from "@/lib/api/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check for errors returned in query params (e.g. from OAuth failure or cancellation)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    const errorDesc = searchParams.get("error_description");

    if (errorParam) {
      if (errorParam === "access_denied") {
        setErrorMessage("Google sign-in was cancelled. Please try again.");
      } else if (
        errorParam === "ACCOUNT_RESTRICTED" ||
        errorDesc?.toLowerCase().includes("restricted")
      ) {
        router.replace("/access-denied");
        return;
      } else {
        setErrorMessage(
          errorDesc || "Authentication with Google failed. Please check your connection or try again."
        );
      }
      setIsCheckingSession(false);
      return;
    }

    // Check if the user is already signed in
    async function checkExistingAuth() {
      try {
        const profile = await fetchCurrentUserProfile();
        if (profile) {
          const redirectParam = searchParams.get("redirect");

          // Active regular user with completed onboarding: check for resumable quest
          if (profile.status === "ACTIVE" && profile.onboardingSubmittedAt) {
            if (
              redirectParam &&
              redirectParam.startsWith("/") &&
              !redirectParam.includes("login") &&
              !redirectParam.includes("onboarding")
            ) {
              router.replace(redirectParam);
              return;
            }

            // Resume check: Does the player have an unfinished in-progress quest?
            const { fetchResumeState } = await import("@/lib/api/session");
            const resumeState = await fetchResumeState();
            if (resumeState.hasResumableQuest && resumeState.destination) {
              router.replace(resumeState.destination);
              return;
            }
          }

          const destination = getRouteForUserProfile(profile, redirectParam);
          router.replace(destination);
          return;
        }
      } catch (err) {
        console.warn("[auth] Session verification note:", err);
      } finally {
        setIsCheckingSession(false);
      }
    }

    checkExistingAuth();
  }, [router, searchParams]);

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const returnUrl = searchParams.get("redirect") || "/onboarding";
      const frontendOrigin =
        typeof window !== "undefined"
          ? window.location.origin
          : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
      const fullCallbackURL = `${frontendOrigin}/login?redirect=${encodeURIComponent(returnUrl)}`;

      const res = await signIn.social({
        provider: "google",
        callbackURL: fullCallbackURL,
      });

      if (res?.error) {
        setErrorMessage(
          res.error.message || "Failed to initiate Google sign-in. Please try again."
        );
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error("Google sign-in error:", err);
      const msg = err instanceof Error ? err.message : "Failed to initiate Google sign-in";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="w-full max-w-[460px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center min-h-[320px]">
        <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin mb-3" />
        <p className="text-xs font-bold text-slate-500">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px] mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
      {/* Pill header */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] font-bold text-[11px] mb-4 border border-[#B2EBF2]">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>OFFICIAL GOOGLE LOGIN</span>
      </div>

      <h2 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-2">
        Welcome to OrionKids
      </h2>
      <p className="text-xs sm:text-[13px] text-slate-500 mb-6 leading-relaxed">
        Sign in to manage your child&apos;s fun brain quests, games, and learning journey reports.
      </p>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] border-2 border-slate-200 text-[#0A1D3D] font-black text-sm sm:text-base shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.09)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-[#00BCD4]" />
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            {/* Google "G" SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="tracking-tight">Continue with Google</span>
          </>
        )}
      </button>

      {/* Security Note */}
      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-[11px] text-center">
        <span>🔒 Secure, verified OAuth 2.0 via Google</span>
      </div>
    </div>
  );
}
