"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  RefreshCw,
  Check,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Info,
  Clock,
  Compass,
  Copy,
  Gamepad2,
  Filter,
  Eye,
} from "lucide-react";
import type { AdminUserItem, AdminPaginationMeta } from "@/lib/api/admin";
import { useAdmin } from "./admin-guard";
import { UserStatusModal } from "./user-status-modal";

interface UserTableProps {
  users: AdminUserItem[];
  meta: AdminPaginationMeta;
  isLoading: boolean;
  activeStatusFilter: "ALL" | "PENDING" | "ACTIVE" | "RESTRICTED";
  activeRoleFilter: "ALL" | "USER" | "ADMIN";
  searchQuery: string;
  onStatusFilterChange: (status: "ALL" | "PENDING" | "ACTIVE" | "RESTRICTED") => void;
  onRoleFilterChange: (role: "ALL" | "USER" | "ADMIN") => void;
  onSearchChange: (query: string) => void;
  onPageChange: (page: number) => void;
  onRefresh: () => Promise<void>;
  onUpdateStatus: (
    userId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => Promise<void>;
}

export function UserTable({
  users,
  meta,
  isLoading,
  activeStatusFilter,
  activeRoleFilter,
  searchQuery,
  onStatusFilterChange,
  onRoleFilterChange,
  onSearchChange,
  onPageChange,
  onRefresh,
  onUpdateStatus,
}: UserTableProps) {
  const { admin: currentAdmin } = useAdmin();
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);
  const [modalMode, setModalMode] = useState<"approve" | "restrict" | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleOpenModal = (user: AdminUserItem, mode: "approve" | "restrict") => {
    setSelectedUser(user);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalMode(null);
  };

  const handleConfirmStatusChange = async (
    userId: string,
    payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }
  ) => {
    await onUpdateStatus(userId, payload);
    setSuccessToast(
      payload.status === "ACTIVE"
        ? "User successfully approved and granted ACTIVE access."
        : "User account restricted and active sessions invalidated."
    );
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const formatDate = (isoString: string | null | undefined) => {
    if (!isoString) return "—";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] overflow-hidden">
      {/* Table Controls Topbar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["ALL", "PENDING", "ACTIVE", "RESTRICTED"] as const).map((st) => {
              const isSelected = activeStatusFilter === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusFilterChange(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0A1D3D] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {st === "ALL"
                    ? "All Accounts"
                    : st === "PENDING"
                    ? "Pending Review"
                    : st === "ACTIVE"
                    ? "Active"
                    : "Restricted"}
                </button>
              );
            })}
          </div>

          <div className="h-5 w-px bg-slate-300 hidden sm:block" />

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
            {(["ALL", "USER", "ADMIN"] as const).map((r) => {
              const isSelected = activeRoleFilter === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => onRoleFilterChange(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#0A1D3D] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r === "ALL" ? "All Roles" : r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Refresh Bar */}
        <div className="flex items-center gap-2.5 w-full xl:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#0A1D3D] hover:bg-slate-50 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#00BCD4]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-800 font-bold animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessToast(null)}
            className="text-emerald-600 hover:text-emerald-900 text-xs font-black cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 sm:px-6">User / Account</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Account Status</th>
              <th className="py-3 px-3 hidden lg:table-cell">Child Profile</th>
              <th className="py-3 px-3 hidden md:table-cell">Quests</th>
              <th className="py-3 px-3 hidden xl:table-cell">Registered</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {isLoading && users.length === 0 ? (
              // Skeleton loading rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200" />
                      <div className="space-y-1.5">
                        <div className="w-28 h-3.5 bg-slate-200 rounded-sm" />
                        <div className="w-36 h-2.5 bg-slate-200 rounded-sm" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3"><div className="w-14 h-5 bg-slate-200 rounded-md" /></td>
                  <td className="py-4 px-3"><div className="w-20 h-5 bg-slate-200 rounded-full" /></td>
                  <td className="py-4 px-3 hidden lg:table-cell"><div className="w-24 h-3 bg-slate-200 rounded-sm" /></td>
                  <td className="py-4 px-3 hidden md:table-cell"><div className="w-12 h-5 bg-slate-200 rounded-md" /></td>
                  <td className="py-4 px-3 hidden xl:table-cell"><div className="w-20 h-3 bg-slate-200 rounded-sm" /></td>
                  <td className="py-4 px-4 sm:px-6 text-right"><div className="w-24 h-7 bg-slate-200 rounded-lg ml-auto" /></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Info className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-bold text-slate-700">No users found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {searchQuery
                        ? `No users match "${searchQuery}". Try modifying your search or filter.`
                        : "No accounts match the selected filters."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSelf = user.id === currentAdmin.id;
                const initials = user.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "OK";

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* User Identity Column */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#0A1D3D] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                            {initials}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/admin/users/${encodeURIComponent(user.id)}`}
                              className="font-bold text-[#0A1D3D] hover:text-[#00838F] hover:underline truncate"
                              title="See details for this user"
                            >
                              {user.name}
                            </Link>
                            {isSelf && (
                              <span className="px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 text-[9px] font-black uppercase">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-[11px] truncate">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {user.id.slice(0, 10)}...
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleCopyId(e, user.id)}
                              className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                              title="Copy full User ID"
                            >
                              {copiedId === user.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-3">
                      {user.role === "ADMIN" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-100 text-purple-800 border border-purple-200">
                          ADMIN
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-200">
                          USER
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      {user.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Active</span>
                        </span>
                      ) : user.status === "PENDING" ? (
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pending</span>
                          </span>
                          {user.onboardingSubmittedAt ? (
                            <span className="text-[10px] text-emerald-700 font-bold">
                              ✓ Onboarded
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium">
                              No Onboarding
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            <span>Restricted</span>
                          </span>
                          {user.restrictedReason && (
                            <p
                              className="text-[10px] text-rose-600 font-medium mt-1 line-clamp-1 max-w-[180px]"
                              title={user.restrictedReason}
                            >
                              {user.restrictedReason}
                            </p>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Child Profile Column */}
                    <td className="py-3.5 px-3 hidden lg:table-cell">
                      {user.childProfile ? (
                        <div className="min-w-0">
                          <p className="font-bold text-[#0A1D3D] text-[11px] truncate">
                            {user.childProfile.childName}
                          </p>
                          <p className="text-slate-400 text-[10px]">
                            {user.childProfile.selectedClass} · {user.childProfile.age} yrs
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-[11px]">No profile</span>
                      )}
                    </td>

                    {/* Quest Sessions Count */}
                    <td className="py-3.5 px-3 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        <Gamepad2 className="w-3 h-3 text-slate-500" />
                        <span>{user.questSessionCount ?? 0}</span>
                      </span>
                    </td>

                    {/* Registered Date */}
                    <td className="py-3.5 px-3 text-slate-500 text-[11px] hidden xl:table-cell whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* See Details Action Button */}
                        <Link
                          href={`/admin/users/${encodeURIComponent(user.id)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors shadow-xs"
                          title="See details for this parent account and children"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#FFE066]" />
                          <span>See Details</span>
                        </Link>

                        {!isSelf && (
                          <>
                            {user.status !== "ACTIVE" && (
                              <button
                                type="button"
                                onClick={() => handleOpenModal(user, "approve")}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black transition-colors cursor-pointer"
                                title="Approve user account to ACTIVE"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Approve</span>
                              </button>
                            )}

                            {user.status !== "RESTRICTED" && (
                              <button
                                type="button"
                                onClick={() => handleOpenModal(user, "restrict")}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-black transition-colors cursor-pointer"
                                title="Restrict user access with reason"
                              >
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Restrict</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{users.length}</strong> of{" "}
          <strong className="text-slate-800">{meta.total}</strong> accounts
        </span>

        {meta.totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={meta.page <= 1 || isLoading}
              onClick={() => onPageChange(meta.page - 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 text-xs font-black text-slate-700 bg-white border border-slate-200 rounded-lg">
              Page {meta.page} of {meta.totalPages}
            </span>

            <button
              type="button"
              disabled={meta.page >= meta.totalPages || isLoading}
              onClick={() => onPageChange(meta.page + 1)}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Status Modification Modal Dialog */}
      <UserStatusModal
        user={selectedUser}
        mode={modalMode}
        isOpen={Boolean(selectedUser && modalMode)}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStatusChange}
      />
    </div>
  );
}
