"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  FileCheck2,
  Calendar,
  User,
  Loader2,
  ArrowRight,
  MessageSquare,
  ShieldX,
  Send,
} from "lucide-react";
import {
  fetchAdminAccessRequests,
  approveAdminAccessRequest,
  rejectAdminAccessRequest,
  type AdminAccessRequestItem,
  type AdminPaginationMeta,
} from "@/lib/api/admin";

export function AccessRequestsSection() {
  const [requests, setRequests] = useState<AdminAccessRequestItem[]>([]);
  const [meta, setMeta] = useState<AdminPaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Reject modal state
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadRequests = useCallback(
    async (
      pageToLoad: number,
      filter: "ALL" | "PENDING" | "APPROVED" | "REJECTED",
      search: string
    ) => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const result = await fetchAdminAccessRequests({
          page: pageToLoad,
          limit: 10,
          status: filter !== "ALL" ? filter : undefined,
          search: search || undefined,
        });
        setRequests(result.requests);
        setMeta(result.meta);
      } catch (err: unknown) {
        console.error("[AdminAccessRequests] Load error:", err);
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to load access requests"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadRequests(currentPage, statusFilter, debouncedSearch);
  }, [currentPage, statusFilter, debouncedSearch, loadRequests]);

  const handleApprove = async (requestId: string) => {
    setActioningId(requestId);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await approveAdminAccessRequest(requestId);
      setSuccessMessage("Access request approved! User is now ACTIVE.");
      await loadRequests(currentPage, statusFilter, debouncedSearch);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to approve request."
      );
    } finally {
      setActioningId(null);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectingRequestId) return;
    setIsProcessingAction(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await rejectAdminAccessRequest(
        rejectingRequestId,
        rejectionReason.trim() || undefined
      );
      setSuccessMessage("Access request rejected.");
      setRejectingRequestId(null);
      setRejectionReason("");
      await loadRequests(currentPage, statusFilter, debouncedSearch);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to reject request."
      );
    } finally {
      setIsProcessingAction(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status filter tabs */}
        <div className="flex p-1 bg-slate-100 rounded-2xl gap-1 overflow-x-auto text-xs font-bold text-slate-600">
          {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatusFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-white text-[#0A1D3D] shadow-xs"
                  : "hover:text-[#0A1D3D]"
              }`}
            >
              {tab === "ALL" ? "All Requests" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Search input & Refresh */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-[#0A1D3D] placeholder:text-slate-400 focus:outline-none focus:border-[#00BCD4] bg-white transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => loadRequests(currentPage, statusFilter, debouncedSearch)}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh requests"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-700 hover:text-rose-900 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Access Requests Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">User / Applicant</th>
                <th className="py-4 px-6">Terms Acceptance</th>
                <th className="py-4 px-6">Request Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Review Information</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00BCD4]" />
                    <p className="font-semibold">Loading access requests...</p>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400">
                    <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-slate-600 mb-1">No access requests found</p>
                    <p className="text-[11px]">
                      {statusFilter === "PENDING"
                        ? "There are currently no access requests awaiting review."
                        : `No ${statusFilter.toLowerCase()} requests matching your search.`}
                    </p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => {
                  const isActioning = actioningId === req.id;
                  return (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* User Column */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#0A1D3D] text-sm">
                          {req.user.name || "Unnamed Parent"}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {req.user.email}
                        </div>
                        <div className="text-slate-400 font-mono text-[10px] mt-1">
                          ID: {req.userId.slice(0, 16)}...
                        </div>
                        {req.notes && (
                          <div className="mt-2 p-2 rounded-xl bg-slate-100/70 border border-slate-200/60 text-[11px] text-slate-600 max-w-xs">
                            <span className="font-bold text-slate-700">Note: </span>
                            {req.notes}
                          </div>
                        )}
                      </td>

                      {/* Terms Acceptance Column */}
                      <td className="py-4 px-6">
                        {req.user.termsAccepted ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Accepted ({req.user.termsVersion || "v1.0"})</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Unaccepted</span>
                          </div>
                        )}
                      </td>

                      {/* Submission Date */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-700">
                          {new Date(req.submittedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(req.submittedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-6">
                        {req.status === "PENDING" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>PENDING</span>
                          </span>
                        )}
                        {req.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>APPROVED</span>
                          </span>
                        )}
                        {req.status === "REJECTED" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-bold border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>REJECTED</span>
                          </span>
                        )}
                      </td>

                      {/* Review Info */}
                      <td className="py-4 px-6 text-slate-500 text-[11px]">
                        {req.reviewedAt ? (
                          <div>
                            <div className="font-semibold text-slate-700">
                              Reviewed:{" "}
                              {new Date(req.reviewedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            {req.rejectionReason && (
                              <div className="text-rose-600 mt-1 max-w-xs font-medium">
                                Reason: {req.rejectionReason}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">Awaiting admin review</span>
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-6 text-right">
                        {req.status === "PENDING" ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleApprove(req.id)}
                              disabled={isActioning}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              {isActioning ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              )}
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setRejectingRequestId(req.id);
                                setRejectionReason("");
                              }}
                              disabled={isActioning}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">
              Showing page {meta.page} of {meta.totalPages} ({meta.total} total requests)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={currentPage === meta.totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectingRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
              <ShieldX className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-[#0A1D3D] mb-1">
              Reject Access Request
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              This request will be marked as REJECTED. The applicant will be shown the rejection notice upon sign-in.
            </p>

            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Rejection Reason (Optional):
              </label>
              <textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="e.g. Incomplete school enrollment details..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setRejectingRequestId(null);
                  setRejectionReason("");
                }}
                disabled={isProcessingAction}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                disabled={isProcessingAction}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isProcessingAction ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                <span>Confirm Rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
