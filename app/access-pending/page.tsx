"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Clock,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  fetchRegistrationStatus,
  fetchMyAccessRequest,
  type RegistrationStatus,
  type AccessRequestItem,
} from "@/lib/api/registration";
import { performSignOut } from "@/lib/api/auth";

export default function AccessPendingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<RegistrationStatus | null>(null);
  const [request, setRequest] = useState<AccessRequestItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    setIsRefreshing(true);
    setFeedbackMessage(null);

    try {
      const regStatus = await fetchRegistrationStatus();
      if (!regStatus) {
        router.replace("/login?redirect=/access-pending");
        return;
      }

      setStatus(regStatus);

      // If user is already active/approved, redirect to next stage
      if (regStatus.accountStatus === "ACTIVE" || regStatus.accessRequestStatus === "APPROVED") {
        router.replace(regStatus.destination || "/dashboard");
        return;
      }

      // If terms were not accepted, redirect to terms
      if (!regStatus.termsAccepted) {
        router.replace("/terms-and-conditions");
        return;
      }

      // If rejected, redirect to access-rejected
      if (regStatus.accessRequestStatus === "REJECTED") {
        router.replace("/access-rejected");
        return;
      }

      // If no request submitted yet, redirect to access-request
      if (regStatus.accessRequestStatus === "NONE") {
        router.replace("/access-request");
        return;
      }

      // Fetch request details
      const myReq = await fetchMyAccessRequest();
      if (myReq?.currentRequest) {
        setRequest(myReq.currentRequest);
      } else if (regStatus.accessRequest) {
        setRequest(regStatus.accessRequest);
      }

      setFeedbackMessage("Status refreshed. Your request is currently under review by our admin team.");
    } catch {
      setFeedbackMessage("Could not check status at this time. Please check your connection and retry.");
    } finally {
      setIsRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const submissionDateFormatted = request?.submittedAt
    ? new Date(request.submittedAt).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : status?.accessRequest?.submittedAt
    ? new Date(status.accessRequest.submittedAt).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently submitted";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Top accent line */}
      <div className="w-full h-[6px] bg-[#FFD54F]" />

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
        <div className="w-full max-w-[540px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center">
          {/* Animated clock icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-[11px] mb-3 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
            <span>ACCESS REQUEST PENDING REVIEW</span>
          </div>

          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-2">
            Request Under Review
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Thank you, <span className="font-bold text-[#0A1D3D]">{status?.name}</span>! Your request for OrionKids platform access has been received. Our administrative team verifies parent accounts to ensure a protected environment for student learning.
          </p>

          {/* Request details card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-2.5 text-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Account Email:</span>
              <span className="text-[#0A1D3D] font-bold">{status?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Terms Version:</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" />
                Accepted ({status?.userTermsVersion || "v1.0"})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Submitted Date:</span>
              <span className="text-[#0A1D3D] font-semibold">{submissionDateFormatted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Current Status:</span>
              <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-100/60 px-2 py-0.5 rounded-full text-[11px]">
                PENDING APPROVAL
              </span>
            </div>
          </div>

          {/* Informational callout */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-900 text-xs font-medium text-left flex items-start gap-2.5 mb-6">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              You can safely close this browser or sign out. When you sign in again, OrionKids will automatically check your status and take you directly to child onboarding once approved.
            </span>
          </div>

          {feedbackMessage && (
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              {feedbackMessage}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={checkStatus}
              disabled={isRefreshing}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#00BCD4] hover:bg-[#26C6DA] text-[#0A1D3D] font-black text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Checking Status..." : "Check Status"}</span>
            </button>

            <button
              onClick={performSignOut}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#526176] font-medium">
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd. All rights reserved.</span>
          <span className="text-slate-400">
            Official admin verification workflow.
          </span>
        </div>
      </footer>
    </div>
  );
}
