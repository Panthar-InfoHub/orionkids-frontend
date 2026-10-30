"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import {
  fetchAdminUserDetail,
  fetchAdminUserChildren,
  updateAdminUserStatus,
  type AdminUserDetail,
  type AdminChildProfile,
} from "@/lib/api/admin";
import { useAdmin } from "@/components/admin/admin-guard";
import { UserOverviewSection } from "@/components/admin/user-detail/user-overview-section";
import { ChildProfilesSection } from "@/components/admin/user-detail/child-profiles-section";

interface User360DetailViewProps {
  userId: string;
}

export function User360DetailView({ userId }: User360DetailViewProps) {
  const { admin } = useAdmin();

  // Core Data State
  const [userDetail, setUserDetail] = useState<AdminUserDetail | null>(null);
  const [childrenList, setChildrenList] = useState<AdminChildProfile[]>([]);

  // Status & Error
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch parent user overview and child profiles
  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [uDetail, uChildren] = await Promise.all([
        fetchAdminUserDetail(userId),
        fetchAdminUserChildren(userId),
      ]);

      setUserDetail(uDetail);
      setChildrenList(uChildren);
    } catch (err) {
      console.error("[User360DetailView] Failed to load parent profile:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading the Parent profile."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleUpdateStatus = async (
    targetUserId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => {
    await updateAdminUserStatus(targetUserId, payload);
    await loadUserData();
  };

  if (isLoading && !userDetail) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded-md" />
        <div className="h-44 w-full bg-white rounded-3xl border border-slate-200" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  if (errorMessage && !userDetail) {
    return (
      <div className="p-8 rounded-3xl bg-rose-50 border-2 border-rose-200 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-xl font-black text-rose-900">
          Parent Profile Unavailable
        </h2>
        <p className="text-sm text-rose-700 max-w-md mx-auto">{errorMessage}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-black text-slate-700 hover:bg-slate-50 transition-colors"
          >
            ← Back to Users Table
          </Link>
          <button
            type="button"
            onClick={loadUserData}
            className="px-4 py-2 rounded-xl bg-[#0A1D3D] text-white text-xs font-black hover:bg-[#122b54] transition-colors cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400">
          <Link
            href="/admin"
            className="text-slate-500 hover:text-[#0A1D3D] transition-colors"
          >
            Admin Dashboard
          </Link>
          <span>/</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-[#00838F] hover:text-[#0A1D3D] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>User Management</span>
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-bold">Parent Profile</span>
          <span>/</span>
          <span className="text-slate-900 font-mono font-black">{userId}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadUserData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh Profile</span>
          </button>
        </div>
      </div>

      {/* Main Account Overview & Aggregate Statistics */}
      {userDetail && (
        <UserOverviewSection
          userDetail={userDetail}
          currentAdminId={admin.id}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Associated Child Profiles Section - Child-First Primary Entry Point */}
      <ChildProfilesSection
        childrenList={childrenList}
        userName={userDetail?.user.name || "User"}
        userId={userId}
      />
    </div>
  );
}
