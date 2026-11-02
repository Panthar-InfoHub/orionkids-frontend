"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  Send,
  Loader2,
  LogOut,
  AlertCircle,
  FileCheck2,
  Clock,
  Sparkles,
  School,
  Lock,
} from "lucide-react";
import {
  fetchRegistrationStatus,
  submitAccessRequest,
  type RegistrationStatus,
} from "@/lib/api/registration";
import { performSignOut } from "@/lib/api/auth";

export default function AccessRequestPage() {
  const router = useRouter();
  const [status, setStatus] = useState<RegistrationStatus | null>(null);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function checkState() {
      try {
        const regStatus = await fetchRegistrationStatus();
        if (isCancelled) return;

        if (!regStatus) {
          router.replace("/login?redirect=/access-request");
          return;
        }

        setStatus(regStatus);

        // If terms are not accepted yet, redirect to terms
        if (!regStatus.termsAccepted) {
          router.replace("/terms-and-conditions");
          return;
        }

        // If already has an access request or active/rejected, redirect to authoritative destination
        if (regStatus.accessRequestStatus === "PENDING") {
          router.replace("/access-pending");
          return;
        }
        if (regStatus.accessRequestStatus === "REJECTED") {
          router.replace("/access-rejected");
          return;
        }
        if (regStatus.accessRequestStatus === "APPROVED" || regStatus.accountStatus === "ACTIVE") {
          router.replace(regStatus.destination || "/dashboard");
          return;
        }
      } catch {
        if (!isCancelled) {
          router.replace("/login?redirect=/access-request");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    checkState();

    return () => {
      isCancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await submitAccessRequest(notes.trim() || undefined);
      router.push(result.status.destination || "/access-pending");
    } catch (err: unknown) {
      console.error("[AccessRequest] Submission error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to submit access request. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin mb-3" />
        <p className="text-xs font-bold text-slate-500">Checking authorization status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Accent top stripe */}
      <div className="w-full h-[6px] bg-[#00BCD4]" />

      {/* Header bar */}
      <header className="w-full bg-white border-b border-[#E7EDF6] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto h-[76px] px-4 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={125}
              height={58}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            onClick={performSignOut}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[560px] mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* Top badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] font-bold text-[11px] mb-4 border border-[#B2EBF2]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>STEP 2 OF 3 · ACCESS REQUEST</span>
          </div>

          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-2">
            Request Website Access
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Welcome to OrionKids, <span className="font-bold text-[#0A1D3D]">{status?.name}</span>! To safeguard student learning privacy and ensure child safety, all parent accounts require verified administrative approval before unlocking brain games and cognitive assessments.
          </p>

          {/* Terms Verification Status Box */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-6">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Terms & Conditions Accepted ({status?.userTermsVersion || "v1.0"})</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              Verified
            </span>
          </div>

          {/* User Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Account Name:</span>
              <span className="text-[#0A1D3D] font-bold">{status?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Account Email:</span>
              <span className="text-[#0A1D3D] font-bold">{status?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">User ID:</span>
              <span className="text-slate-600 font-mono text-[11px]">{status?.userId}</span>
            </div>
          </div>

          {/* Request Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-bold text-[#0A1D3D] mb-2 uppercase tracking-wider"
              >
                Optional Note / Child Grade (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="e.g. Registering for 2nd grade cognitive tracking at Orion Elementary..."
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#00BCD4] focus:outline-none text-xs sm:text-sm text-[#0A1D3D] placeholder:text-slate-400 resize-none transition-colors"
              />
              <span className="block text-[11px] text-slate-400 mt-1 text-right">
                {notes.length}/500 characters
              </span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#00BCD4] hover:bg-[#26C6DA] text-[#0A1D3D] font-black text-sm tracking-wide shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Website Access</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center pt-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Requests are reviewed by OrionKids administrators.</span>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#526176] font-medium">
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd. All rights reserved.</span>
          <span className="text-slate-400">
            Secure admin approval required for platform access.
          </span>
        </div>
      </footer>
    </div>
  );
}
