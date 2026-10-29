"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  ShieldAlert,
  UserCheck,
  Clock,
  Sparkles,
  Baby,
  Gamepad2,
  Calendar,
  KeyRound,
  Shield,
} from "lucide-react";
import type { AdminUserDetail } from "@/lib/api/admin";
import { UserStatusModal } from "../user-status-modal";

interface UserOverviewSectionProps {
  userDetail: AdminUserDetail;
  currentAdminId: string;
  onUpdateStatus: (
    userId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => Promise<void>;
}

export function UserOverviewSection({
  userDetail,
  currentAdminId,
  onUpdateStatus,
}: UserOverviewSectionProps) {
  const { user, stats } = userDetail;
  const isSelf = user.id === currentAdminId;

  const [copied, setCopied] = useState(false);
  const [modalMode, setModalMode] = useState<"approve" | "restrict" | null>(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "OK";

  const formatDate = (iso: string | null | undefined) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  const handleConfirmStatus = async (
    userId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => {
    await onUpdateStatus(userId, payload);
    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Primary Account Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: User Avatar & Basic Identity */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#0A1D3D] shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0A1D3D] text-[#FFE066] flex items-center justify-center font-black text-2xl shadow-xs shrink-0">
                {initials}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0A1D3D] tracking-tight">
                  {user.name}
                </h2>
                {isSelf && (
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                    Your Account
                  </span>
                )}
                {user.role === "ADMIN" ? (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black uppercase border border-purple-200">
                    Admin
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-black uppercase border border-slate-200">
                    User
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500 font-medium">{user.email}</p>

              {/* Copyable User ID */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  ID: {user.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#00838F] hover:text-[#0A1D3D] transition-colors cursor-pointer"
                  title="Copy full User ID"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-black">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Account Status & Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Account Status:</span>
              {user.status === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Active Explorer</span>
                </span>
              ) : user.status === "PENDING" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pending Review</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Restricted Access</span>
                </span>
              )}
            </div>

            {user.status === "RESTRICTED" && user.restrictedReason && (
              <p className="text-xs text-rose-600 font-bold max-w-xs text-right">
                Reason: {user.restrictedReason}
              </p>
            )}

            {/* Quick Actions */}
            {!isSelf && (
              <div className="flex items-center gap-2 pt-1">
                {user.status !== "ACTIVE" && (
                  <button
                    type="button"
                    onClick={() => setModalMode("approve")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Approve Account</span>
                  </button>
                )}

                {user.status !== "RESTRICTED" && (
                  <button
                    type="button"
                    onClick={() => setModalMode("restrict")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Restrict Account</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Timestamps & Audit Info Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-500">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Registered Date
            </span>
            <span className="font-bold text-slate-800">
              {formatDate(user.createdAt)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Last Profile Update
            </span>
            <span className="font-bold text-slate-800">
              {formatDate(user.updatedAt)}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Onboarding Submission
            </span>
            <span className="font-bold text-slate-800">
              {user.onboardingSubmittedAt
                ? formatDate(user.onboardingSubmittedAt)
                : "Not Submitted"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Governance Review
            </span>
            <span className="font-bold text-slate-800">
              {user.reviewedAt
                ? `${formatDate(user.reviewedAt)}`
                : "Awaiting Review"}
            </span>
          </div>
        </div>
      </div>

      {/* Aggregate Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Child Profiles Count */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Child Profiles
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-100 text-[#00838F] flex items-center justify-center">
              <Baby className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0A1D3D]">
            {stats.childProfileCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Associated child accounts</p>
        </div>

        {/* Total Quest Sessions */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quest Sessions
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0A1D3D]">
            {stats.totalSessions}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Total sessions initialized</p>
        </div>

        {/* Completed Quests */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Completed Quests
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800">
            {stats.completedSessions}
          </div>
          <p className="text-[11px] text-emerald-700/80 mt-0.5">Finished all 18 levels</p>
        </div>

        {/* In-Progress Quests */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              In Progress
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-800">
            {stats.inProgressSessions}
          </div>
          <p className="text-[11px] text-amber-700/80 mt-0.5">Active quest sessions</p>
        </div>
      </div>

      {/* Status Modal */}
      <UserStatusModal
        user={user}
        mode={modalMode}
        isOpen={Boolean(modalMode)}
        onClose={() => setModalMode(null)}
        onConfirm={handleConfirmStatus}
      />
    </div>
  );
}
