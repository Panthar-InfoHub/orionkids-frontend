"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  XCircle,
  RefreshCw,
  LogOut,
  Mail,
  AlertTriangle,
  FileText,
  RotateCcw,
  ShieldX,
  HelpCircle,
} from "lucide-react";
import {
  fetchRegistrationStatus,
  fetchMyAccessRequest,
  submitAccessRequest,
  type RegistrationStatus,
  type AccessRequestItem,
} from "@/lib/api/registration";
import { performSignOut } from "@/lib/api/auth";

export default function AccessRejectedPage() {
  const router = useRouter();
  const [status, setStatus] = useState<RegistrationStatus | null>(null);
  const [request, setRequest] = useState<AccessRequestItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const regStatus = await fetchRegistrationStatus();
      if (!regStatus) {
        router.replace("/login?redirect=/access-rejected");
        return;
      }

      setStatus(regStatus);

      // If user status is ACTIVE / APPROVED, redirect to destination
      if (regStatus.accountStatus === "ACTIVE" || regStatus.accessRequestStatus === "APPROVED") {
        router.replace(regStatus.destination || "/dashboard");
        return;
      }

      // If pending again, redirect to access-pending
      if (regStatus.accessRequestStatus === "PENDING") {
        router.replace("/access-pending");
        return;
      }

      const myReq = await fetchMyAccessRequest();
      if (myReq?.currentRequest) {
        setRequest(myReq.currentRequest);
      } else if (regStatus.accessRequest) {
        setRequest(regStatus.accessRequest);
      }
    } catch {
      setErrorMessage("Could not refresh status. Please check your connection.");
    } finally {
      setIsRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  const handleResubmit = async () => {
    setIsResubmitting(true);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const res = await submitAccessRequest("Resubmitted after initial review.");
      router.push("/access-pending");
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to resubmit request. Please contact support."
      );
      setIsResubmitting(false);
    }
  };

  const rejectionReason =
    request?.rejectionReason ||
    status?.accessRequest?.rejectionReason ||
    "The application details provided could not be verified by our administrative team.";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Accent top stripe */}
      <div className="w-full h-[6px] bg-rose-500" />

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
          {/* Rejection icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldX className="w-8 h-8" />
          </div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-[11px] mb-3 border border-rose-200">
            <span>ACCESS REQUEST NOT APPROVED</span>
          </div>

          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-2">
            Application Not Approved
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Your request for OrionKids platform access was reviewed by our administrative team and could not be approved at this time.
          </p>

          {/* Rejection reason box */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left mb-6">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Review Feedback / Reason:</span>
            </div>
            <p className="text-xs text-rose-900 leading-relaxed font-medium pl-6">
              {rejectionReason}
            </p>
          </div>

          {/* Account information card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-2 text-xs text-left">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Account Name:</span>
              <span className="text-[#0A1D3D] font-bold">{status?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Account Email:</span>
              <span className="text-[#0A1D3D] font-bold">{status?.email}</span>
            </div>
            {request?.reviewedAt && (
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Reviewed On:</span>
                <span className="text-slate-700 font-semibold">
                  {new Date(request.reviewedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Help note */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs text-left flex items-start gap-2.5 mb-6">
            <HelpCircle className="w-4 h-4 text-[#00BCD4] flex-shrink-0 mt-0.5" />
            <span>
              If you believe this was an error or you have updated enrollment documentation, you can resubmit your access request or contact our support team.
            </span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleResubmit}
              disabled={isResubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#00BCD4] hover:bg-[#26C6DA] text-[#0A1D3D] font-black text-xs sm:text-sm tracking-wide shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${isResubmitting ? "animate-spin" : ""}`} />
              <span>{isResubmitting ? "Submitting..." : "Resubmit Request"}</span>
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
            For inquiries, contact support@orionkids.com
          </span>
        </div>
      </footer>
    </div>
  );
}
