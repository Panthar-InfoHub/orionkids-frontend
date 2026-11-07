"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Inbox,
  Eye,
  X,
  Mail,
  Phone,
  School,
  StickyNote,
} from "lucide-react";
import type { AdminPaginationMeta } from "@/lib/api/admin";
import {
  fetchAdminCustomSheetRequests,
  updateAdminCustomSheetRequest,
  CUSTOM_SHEET_STATUS_LABELS,
  REQUESTER_ROLE_LABELS,
  type AdminCustomSheetRequest,
  type CustomSheetRequestStatus,
} from "@/lib/api/custom-sheets";

type StatusFilter = CustomSheetRequestStatus | "ALL";

const STATUS_TABS: StatusFilter[] = ["NEW", "IN_PROGRESS", "COMPLETED", "DECLINED", "ALL"];
const STATUSES: CustomSheetRequestStatus[] = ["NEW", "IN_PROGRESS", "COMPLETED", "DECLINED"];

const STATUS_BADGE: Record<CustomSheetRequestStatus, string> = {
  NEW: "bg-sky-50 text-sky-800 border-sky-200",
  IN_PROGRESS: "bg-amber-50 text-amber-800 border-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-800 border-emerald-200",
  DECLINED: "bg-rose-50 text-rose-800 border-rose-200",
};

const ROLE_BADGE: Record<string, string> = {
  PARENT: "bg-violet-50 text-violet-800 border-violet-200",
  TEACHER: "bg-cyan-50 text-cyan-800 border-cyan-200",
  SCHOOL: "bg-orange-50 text-orange-800 border-orange-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function StatusBadge({ status }: { status: CustomSheetRequestStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-black whitespace-nowrap ${STATUS_BADGE[status]}`}
    >
      {CUSTOM_SHEET_STATUS_LABELS[status]}
    </span>
  );
}

interface CustomSheetRequestsSectionProps {
  /** Called after a status change so the dashboard can refresh the tab badge */
  onChanged?: () => void;
}

export function CustomSheetRequestsSection({ onChanged }: CustomSheetRequestsSectionProps) {
  const [requests, setRequests] = useState<AdminCustomSheetRequest[]>([]);
  const [meta, setMeta] = useState<AdminPaginationMeta>({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("NEW");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Detail / edit popup
  const [selected, setSelected] = useState<AdminCustomSheetRequest | null>(null);
  const [draftStatus, setDraftStatus] = useState<CustomSheetRequestStatus>("NEW");
  const [draftNote, setDraftNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadRequests = useCallback(async (page: number, filter: StatusFilter, search: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await fetchAdminCustomSheetRequests({
        page,
        limit: 10,
        status: filter,
        search: search || undefined,
      });
      setRequests(result.requests);
      setMeta(result.meta);
    } catch (err: unknown) {
      console.error("[AdminCustomSheetRequests] Load error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to load custom sheet requests");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests(currentPage, statusFilter, debouncedSearch);
  }, [currentPage, statusFilter, debouncedSearch, loadRequests]);

  const openDetail = (req: AdminCustomSheetRequest) => {
    setSelected(req);
    setDraftStatus(req.status);
    setDraftNote(req.adminNote ?? "");
    setSaveError(null);
  };

  const closeDetail = useCallback(() => {
    if (!isSaving) setSelected(null);
  }, [isSaving]);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, closeDetail]);

  const hasChanges =
    !!selected &&
    (draftStatus !== selected.status || draftNote.trim() !== (selected.adminNote ?? "").trim());

  const handleSave = async () => {
    if (!selected || !hasChanges) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const body: { status?: CustomSheetRequestStatus; adminNote?: string | null } = {};
      if (draftStatus !== selected.status) body.status = draftStatus;
      if (draftNote.trim() !== (selected.adminNote ?? "").trim()) {
        body.adminNote = draftNote.trim() || null;
      }
      await updateAdminCustomSheetRequest(selected.id, body);
      setSelected(null);
      setSuccessMessage(`Request from ${selected.name} updated.`);
      await loadRequests(currentPage, statusFilter, debouncedSearch);
      onChanged?.();
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Failed to update request.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters + search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex p-1 bg-slate-100 rounded-2xl gap-1 overflow-x-auto text-xs font-bold text-slate-600">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatusFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab ? "bg-white text-[#0A1D3D] shadow-xs" : "hover:text-[#0A1D3D]"
              }`}
            >
              {tab === "ALL" ? "All Requests" : CUSTOM_SHEET_STATUS_LABELS[tab]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, email, school, phone..."
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
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer" aria-label="Dismiss">
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
          <button onClick={() => setErrorMessage(null)} className="text-rose-700 hover:text-rose-900 cursor-pointer" aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Requester</th>
                <th className="py-4 px-6">Request</th>
                <th className="py-4 px-6">Received</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#00BCD4]" />
                    <p className="font-semibold">Loading custom sheet requests...</p>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-slate-400">
                    <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-slate-600 mb-1">No custom sheet requests found</p>
                    <p className="text-[11px]">
                      {debouncedSearch
                        ? "No requests match your search."
                        : statusFilter === "ALL"
                          ? "Requests from the Printables page will appear here."
                          : `There are no ${CUSTOM_SHEET_STATUS_LABELS[statusFilter].toLowerCase()} requests.`}
                    </p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors align-top">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0A1D3D] text-sm">{req.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${ROLE_BADGE[req.requesterRole] ?? ""}`}
                        >
                          {REQUESTER_ROLE_LABELS[req.requesterRole]}
                        </span>
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">{req.email}</div>
                      {req.organizationName && (
                        <div className="text-slate-500 text-[11px] mt-0.5">🏫 {req.organizationName}</div>
                      )}
                      {req.phone && <div className="text-slate-400 text-[11px] mt-0.5">📞 {req.phone}</div>}
                    </td>
                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {req.gradeLevel}
                        </span>
                        {req.sheetType && (
                          <span className="px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold">
                            {req.sheetType}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">{req.details}</p>
                      {req.adminNote && (
                        <p className="mt-1.5 text-[11px] text-amber-800 line-clamp-1">
                          <StickyNote className="w-3 h-3 inline -mt-0.5 mr-1" />
                          {req.adminNote}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-semibold text-slate-700">{formatDate(req.createdAt)}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{formatTime(req.createdAt)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => openDetail(req)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0A1D3D] bg-white hover:bg-[#FFE066] text-[#0A1D3D] text-[11px] font-black transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View & update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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

      {/* Detail / update popup */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Custom sheet request from ${selected.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={closeDetail}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-black text-[#0A1D3D]">{selected.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${ROLE_BADGE[selected.requesterRole] ?? ""}`}
                  >
                    {REQUESTER_ROLE_LABELS[selected.requesterRole]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Received {formatDate(selected.createdAt)} at {formatTime(selected.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                disabled={isSaving}
                aria-label="Close"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Contact */}
              <div className="space-y-1.5 text-xs">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-[#0369A1] font-semibold hover:underline w-fit">
                  <Mail className="w-3.5 h-3.5" />
                  {selected.email}
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-slate-700 hover:underline w-fit">
                    <Phone className="w-3.5 h-3.5" />
                    {selected.phone}
                  </a>
                )}
                {selected.organizationName && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <School className="w-3.5 h-3.5" />
                    {selected.organizationName}
                  </div>
                )}
              </div>

              {/* Request */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-bold">
                    {selected.gradeLevel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold">
                    {selected.sheetType ?? "Any / not sure"}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                  {selected.details}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="block text-xs font-bold text-slate-700 mb-1.5">Status</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setDraftStatus(s)}
                      aria-pressed={draftStatus === s}
                      className={`px-2 py-2 rounded-xl border-2 text-[11px] font-black transition-all cursor-pointer ${
                        draftStatus === s
                          ? `${STATUS_BADGE[s]} border-current`
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {CUSTOM_SHEET_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal note */}
              <div>
                <label htmlFor="custom-sheet-admin-note" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Internal note <span className="font-normal text-slate-400">(only admins can see this)</span>
                </label>
                <textarea
                  id="custom-sheet-admin-note"
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  maxLength={2000}
                  rows={3}
                  placeholder="e.g. Called the teacher, sending the sheet by Friday."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00BCD4] resize-y"
                />
              </div>

              {selected.reviewedAt && (
                <p className="text-[10px] text-slate-400">
                  Last updated by an admin on {formatDate(selected.reviewedAt)} at {formatTime(selected.reviewedAt)}
                </p>
              )}

              {saveError && (
                <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {saveError}
                </div>
              )}

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeDetail}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
