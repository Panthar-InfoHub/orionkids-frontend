"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Clock,
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  fetchAdminUsers,
  fetchAdminMetrics,
  updateAdminUserStatus,
  type AdminUserItem,
  type AdminPaginationMeta,
  type AdminMetrics,
} from "@/lib/api/admin";
import { UserTable } from "./user-table";
import { useAdmin } from "./admin-guard";

export function AdminDashboardView() {
  const { admin } = useAdmin();

  // State
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [meta, setMeta] = useState<AdminPaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [metrics, setMetrics] = useState<AdminMetrics>({
    total: 0,
    pending: 0,
    active: 0,
    restricted: 0,
  });
  const [activeStatusFilter, setActiveStatusFilter] = useState<
    "ALL" | "PENDING" | "ACTIVE" | "RESTRICTED"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load metrics
  const loadMetrics = useCallback(async () => {
    try {
      const data = await fetchAdminMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("[AdminDashboard] Failed to fetch metrics:", err);
    }
  }, []);

  // Load paginated users
  const loadUsers = useCallback(
    async (pageToLoad: number, filterToUse: "ALL" | "PENDING" | "ACTIVE" | "RESTRICTED") => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const result = await fetchAdminUsers({
          page: pageToLoad,
          limit: 10,
          status: filterToUse !== "ALL" ? filterToUse : undefined,
        });
        setUsers(result.users);
        setMeta(result.meta);
      } catch (err) {
        console.error("[AdminDashboard] Failed to fetch users:", err);
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred while communicating with the administrative API."
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Initial fetch and reload on page/filter changes
  useEffect(() => {
    loadUsers(currentPage, activeStatusFilter);
  }, [currentPage, activeStatusFilter, loadUsers]);

  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  // Status Filter Handlers
  const handleStatusFilterChange = (
    newStatus: "ALL" | "PENDING" | "ACTIVE" | "RESTRICTED"
  ) => {
    setActiveStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRefresh = async () => {
    await Promise.all([
      loadUsers(currentPage, activeStatusFilter),
      loadMetrics(),
    ]);
  };

  // Status mutation
  const handleUpdateStatus = async (
    userId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => {
    await updateAdminUserStatus(userId, payload);
    // Reload both the table and the metrics
    await Promise.all([
      loadUsers(currentPage, activeStatusFilter),
      loadMetrics(),
    ]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE066]/20 border border-[#0A1D3D] text-[#0A1D3D] text-[11px] font-black uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0A1D3D]" />
            <span>Governance & Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A1D3D] tracking-tight">
            User Accounts & Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review user registrations, approve active explorers, and regulate account access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Authoritative API Active</span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Accounts */}
        <div
          onClick={() => handleStatusFilterChange("ALL")}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeStatusFilter === "ALL"
              ? "bg-white border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D]"
              : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Accounts
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0A1D3D] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#0A1D3D]">{metrics.total}</div>
          <p className="text-[11px] text-slate-400 mt-1">All registered accounts</p>
        </div>

        {/* Pending Review */}
        <div
          onClick={() => handleStatusFilterChange("PENDING")}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeStatusFilter === "PENDING"
              ? "bg-amber-50/70 border-amber-500 shadow-[4px_4px_0px_#f59e0b]"
              : "bg-white border-slate-200 hover:border-amber-300 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Pending Review
              </span>
              {metrics.pending > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              )}
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-900">{metrics.pending}</div>
          <p className="text-[11px] text-amber-700/80 mt-1">
            {metrics.pending === 1 ? "1 account needs review" : `${metrics.pending} accounts need review`}
          </p>
        </div>

        {/* Active Explorers */}
        <div
          onClick={() => handleStatusFilterChange("ACTIVE")}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeStatusFilter === "ACTIVE"
              ? "bg-emerald-50/70 border-emerald-600 shadow-[4px_4px_0px_#059669]"
              : "bg-white border-slate-200 hover:border-emerald-300 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Active Explorers
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-900">{metrics.active}</div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Approved & active access</p>
        </div>

        {/* Restricted Accounts */}
        <div
          onClick={() => handleStatusFilterChange("RESTRICTED")}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            activeStatusFilter === "RESTRICTED"
              ? "bg-rose-50/70 border-rose-600 shadow-[4px_4px_0px_#e11d48]"
              : "bg-white border-slate-200 hover:border-rose-300 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Restricted
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-900">{metrics.restricted}</div>
          <p className="text-[11px] text-rose-700/80 mt-1">Sessions terminated</p>
        </div>
      </div>

      {/* Error state if API call failed */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold text-rose-800">
              Administrative API Communication Error
            </p>
            <p className="text-xs text-rose-600 mt-0.5">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3 py-1 bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Users Table */}
      <UserTable
        users={users}
        meta={meta}
        isLoading={isLoading}
        activeStatusFilter={activeStatusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onPageChange={handlePageChange}
        onRefresh={handleRefresh}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
