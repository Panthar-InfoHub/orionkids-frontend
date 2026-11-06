"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Loader2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import {
  fetchAdminReportsList,
  downloadAdminReportPdf,
  fetchAdminUserSessionReport,
  type AdminReportListItem,
  type AdminPaginationMeta,
  type AdminSessionReportResult,
} from "@/lib/api/admin";
import { QuestReportModal } from "./user-detail/quest-report-modal";
import { ReportEmailStatus } from "@/components/reports/report-email-status";

export function AdminReportsSection() {
  const [reports, setReports] = useState<AdminReportListItem[]>([]);
  const [meta, setMeta] = useState<AdminPaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Modal inspection state
  const [activeModalReport, setActiveModalReport] = useState<AdminSessionReportResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingReportModal, setIsLoadingReportModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminReportsList({
        page: currentPage,
        limit: 10,
        search: debouncedSearch || undefined,
        status: statusFilter !== "ALL" ? statusFilter : undefined,
      });
      setReports(res.reports);
      setMeta(res.meta);
    } catch (err) {
      console.error("[AdminReports] Failed to load reports:", err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const handleOpenReport = async (reportItem: AdminReportListItem) => {
    setIsLoadingReportModal(true);
    try {
      const result = await fetchAdminUserSessionReport(
        reportItem.userId,
        reportItem.questSessionId
      );
      setActiveModalReport(result);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch session report for modal:", err);
      alert(err instanceof Error ? err.message : "Failed to open report");
    } finally {
      setIsLoadingReportModal(false);
    }
  };

  const handleDownloadPdf = async (reportItem: AdminReportListItem) => {
    if (downloadingId) return;
    setDownloadingId(reportItem.questSessionId);
    try {
      await downloadAdminReportPdf(reportItem.questSessionId, reportItem.childName);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download PDF report");
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (iso?: string | null) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const formatDuration = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min}m ${sec}s`;
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by parent, email, or child..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#00BCD4] focus:bg-white transition-all"
          />
        </div>

        {/* Filter and Refresh */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            {(["ALL", "GENERATED", "PENDING", "FAILED"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === st
                    ? "bg-white text-[#0A1D3D] shadow-2xs font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {st === "ALL" ? "All Statuses" : st}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={loadReports}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] overflow-hidden">
        <div className="p-4 bg-[#0A1D3D] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FFE066]" />
            <h3 className="text-sm font-black text-white">
              Authoritative Child Performance Reports
            </h3>
          </div>
          <span className="text-xs text-slate-300 font-mono">
            Total: {meta.total} reports
          </span>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin" />
            <p className="text-xs font-bold text-slate-500">Loading assessment reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No reports found</h4>
            <p className="text-xs text-slate-400">Try modifying search or filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-black tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Child Profile</th>
                  <th className="py-3 px-4">Account</th>
                  <th className="py-3 px-4">Parent Email</th>
                  <th className="py-3 px-4">Quest Completed</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">AI Model</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-black text-[#0A1D3D]">{r.childName}</div>
                      <div className="text-[11px] text-slate-400">
                        {r.selectedClass} · Age {r.age}
                        {r.school ? ` · ${r.school}` : ""}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{r.accountName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{r.accountEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="text-[11px] font-mono text-slate-700 break-all">
                        {r.childParentEmail || "—"}
                      </div>
                      <ReportEmailStatus
                        className="mt-1"
                        status={r.emailStatus}
                        recipient={r.emailRecipient}
                        sentAt={r.emailSentAt}
                        error={r.emailError}
                        showFullEmail
                        showError
                      />
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {formatDate(r.questCompletedAt || r.generatedAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-black text-emerald-700">
                        {Math.round(r.overallAccuracy)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {formatDuration(r.totalDurationMs)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                      {r.modelName || "OpenAI Engine"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                          r.status === "GENERATED"
                            ? "bg-emerald-100 text-emerald-800"
                            : r.status === "FAILED"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {r.status || "GENERATED"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenReport(r)}
                          disabled={isLoadingReportModal}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer"
                          title="Inspect AI Report"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(r)}
                          disabled={downloadingId === r.questSessionId}
                          className="px-2.5 py-1 rounded-lg bg-[#00BCD4] hover:bg-[#00acc1] text-white font-black text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                          title="Download Authoritative PDF"
                        >
                          {downloadingId === r.questSessionId ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                          <span>PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination footer */}
        {meta.totalPages > 1 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Page {meta.page} of {meta.totalPages} ({meta.total} reports)
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1 || isLoading}
                className="p-1 rounded-md border border-slate-200 hover:bg-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={currentPage >= meta.totalPages || isLoading}
                className="p-1 rounded-md border border-slate-200 hover:bg-white disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inspect Report Modal */}
      <QuestReportModal
        isOpen={isModalOpen}
        reportResult={activeModalReport}
        onClose={() => {
          setIsModalOpen(false);
          setActiveModalReport(null);
        }}
        onReportUpdated={() => {
          loadReports();
        }}
      />
    </div>
  );
}

