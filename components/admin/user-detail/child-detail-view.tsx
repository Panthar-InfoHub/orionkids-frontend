"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  RefreshCw,
  AlertTriangle,
  Baby,
  Gamepad2,
  Sparkles,
  Layers,
  School,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  User,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Award,
  ArrowLeft,
  FileText,
} from "lucide-react";
import {
  fetchAdminChildDetail,
  fetchAdminChildQuestSessions,
  fetchAdminChildQuestSessionDetail,
  fetchAdminChildSessionAttempts,
  fetchAdminChildSessionReport,
  type AdminChildDetail,
  type AdminQuestSessionItem,
  type AdminQuestSessionDetail,
  type AdminLevelAttemptItem,
  type AdminSessionReportResult,
} from "@/lib/api/admin";
import { useAdmin } from "@/components/admin/admin-guard";
import { QuestSessionsSection } from "@/components/admin/user-detail/quest-sessions-section";
import { SixGameProgressionView } from "@/components/admin/user-detail/six-game-progression-view";
import { TelemetryInspectorModal } from "@/components/admin/user-detail/telemetry-inspector-modal";
import { QuestReportModal } from "@/components/admin/user-detail/quest-report-modal";

interface ChildDetailViewProps {
  userId: string;
  childProfileId: string;
}

export function ChildDetailView({
  userId,
  childProfileId,
}: ChildDetailViewProps) {
  const { admin } = useAdmin();

  // Core Data State
  const [childDetail, setChildDetail] = useState<AdminChildDetail | null>(null);
  const [sessions, setSessions] = useState<AdminQuestSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSessionDetail, setSelectedSessionDetail] =
    useState<AdminQuestSessionDetail | null>(null);
  const [sessionAttempts, setSessionAttempts] = useState<AdminLevelAttemptItem[]>([]);

  // Filtering State
  const [sessionStatusFilter, setSessionStatusFilter] = useState<
    "ALL" | "IN_PROGRESS" | "COMPLETED" | "ABANDONED"
  >("ALL");

  // Inspection Modal States
  const [inspectingAttempt, setInspectingAttempt] =
    useState<AdminLevelAttemptItem | null>(null);
  const [viewingReportResult, setViewingReportResult] =
    useState<AdminSessionReportResult | null>(null);

  // Status & Error
  const [isLoading, setIsLoading] = useState(true);
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Fetch child profile and child-specific quest sessions
  const loadChildData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [cDetail, cSessionsRes] = await Promise.all([
        fetchAdminChildDetail(userId, childProfileId),
        fetchAdminChildQuestSessions(userId, childProfileId, {
          status: sessionStatusFilter !== "ALL" ? sessionStatusFilter : undefined,
          limit: 50,
        }),
      ]);

      setChildDetail(cDetail);
      setSessions(cSessionsRes.sessions);

      // Auto-select latest session if none currently selected or previous no longer in list
      setSelectedSessionId((curr) => {
        if (curr && cSessionsRes.sessions.some((s) => s.id === curr)) {
          return curr;
        }
        return cSessionsRes.sessions.length > 0 ? cSessionsRes.sessions[0].id : null;
      });
    } catch (err) {
      console.error("[ChildDetailView] Failed to load child data:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading child profile details."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId, childProfileId, sessionStatusFilter]);

  // 2. Fetch selected quest session breakdown and telemetry attempts
  const loadSessionBreakdown = useCallback(
    async (sId: string) => {
      setIsSessionLoading(true);
      try {
        const [sDetail, sAttemptsRes] = await Promise.all([
          fetchAdminChildQuestSessionDetail(userId, childProfileId, sId),
          fetchAdminChildSessionAttempts(userId, childProfileId, sId, { limit: 100 }),
        ]);

        setSelectedSessionDetail(sDetail);
        setSessionAttempts(sAttemptsRes.attempts);
      } catch (err) {
        console.error("[ChildDetailView] Failed to load session details:", err);
      } finally {
        setIsSessionLoading(false);
      }
    },
    [userId, childProfileId]
  );

  useEffect(() => {
    loadChildData();
  }, [loadChildData]);

  useEffect(() => {
    if (selectedSessionId) {
      loadSessionBreakdown(selectedSessionId);
    }
  }, [selectedSessionId, loadSessionBreakdown]);

  // Handlers
  const handleSelectSession = (sId: string) => {
    setSelectedSessionId(sId);
    // Smooth scroll to the progression breakdown section so admin sees details immediately
    setTimeout(() => {
      const el = document.getElementById("child-session-progression-view-target");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleViewReport = async (sId?: string) => {
    const targetSessionId = sId || selectedSessionId;
    if (!targetSessionId) return;

    try {
      const reportRes = await fetchAdminChildSessionReport(
        userId,
        childProfileId,
        targetSessionId
      );
      setViewingReportResult(reportRes);
    } catch (err) {
      console.error("[ChildDetailView] Failed to fetch report:", err);
      setViewingReportResult({
        hasReport: false,
        message:
          err instanceof Error
            ? err.message
            : "Failed to retrieve cognitive assessment report.",
        report: null,
      });
    }
  };

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "—";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
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

  if (isLoading && !childDetail) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-64 bg-slate-200 rounded-md" />
        <div className="h-44 w-full bg-white rounded-3xl border border-slate-200" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  if (errorMessage && !childDetail) {
    return (
      <div className="p-8 rounded-3xl bg-rose-50 border-2 border-rose-200 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-xl font-black text-rose-900">
          Child Profile Unavailable
        </h2>
        <p className="text-sm text-rose-700 max-w-md mx-auto">{errorMessage}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href={`/admin/users/${userId}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-black text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Parent Profile</span>
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            User Management
          </Link>
          <button
            type="button"
            onClick={loadChildData}
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
            className="text-slate-500 hover:text-[#0A1D3D] transition-colors"
          >
            User Management
          </Link>
          <span>/</span>
          <Link
            href={`/admin/users/${userId}`}
            className="inline-flex items-center gap-1 text-[#00838F] hover:text-[#0A1D3D] transition-colors"
          >
            <span>Parent Profile</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-black">
            {childDetail?.childName || "Child Profile"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Prominent Back to Parent Profile Button */}
          <Link
            href={`/admin/users/${userId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-[#0A1D3D] bg-white hover:bg-slate-50 text-xs font-black text-[#0A1D3D] transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4 text-[#0A1D3D]" />
            <span>Back to Parent Profile</span>
          </Link>

          <button
            type="button"
            onClick={loadChildData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-black text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Child Data</span>
          </button>
        </div>
      </div>

      {/* Child Information Section */}
      {childDetail && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Left: Child Identity */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#00838F] text-white flex items-center justify-center font-black text-2xl shadow-xs shrink-0">
                <Baby className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-[#0A1D3D] tracking-tight">
                    {childDetail.childName}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[11px] font-black text-[#0A1D3D]">
                    {childDetail.selectedClass}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-100 text-[#00838F] border border-cyan-200 text-[11px] font-bold">
                    Age: {childDetail.age}
                  </span>
                </div>

                {/* Child Profile ID (Authoritative disambiguation for repeated onboarding) */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-bold">
                    Child Profile ID: <strong>{childDetail.id}</strong>
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    Student ID: <strong className="text-slate-700">{childDetail.studentId || "Auto"}</strong>
                  </span>
                </div>

                {/* Linked Parent Information */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Parent:</span>
                    <Link
                      href={`/admin/users/${userId}`}
                      className="font-bold text-[#00838F] hover:underline"
                    >
                      {childDetail.parentName}
                    </Link>
                  </div>
                  <span>·</span>
                  <span className="font-mono text-[11px] text-slate-500">
                    User ID: {childDetail.userId}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{childDetail.parentEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Guardian Status & Quick Pills */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{childDetail.isGuardian ? "Parent / Legal Guardian" : "Authorized Delegate"}</span>
              </div>

              <div className="text-xs text-slate-400 pt-1 text-left lg:text-right">
                <span>Registered: </span>
                <strong className="text-slate-700">{formatDate(childDetail.createdAt)}</strong>
              </div>
            </div>
          </div>

          {/* Child Details Attribute Grid */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                School / Institution
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>{childDetail.school || "Not specified"}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Preferred Language
              </span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {childDetail.language}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Parent Mobile
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{childDetail.parentMobile}</span>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Latest Activity
              </span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatDate(childDetail.stats.latestActivityAt)}</span>
              </span>
            </div>
          </div>

          {/* Child Stats Row */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Total Sessions
              </span>
              <span className="text-lg font-black text-[#0A1D3D] block mt-0.5">
                {childDetail.stats.totalSessions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Completed
              </span>
              <span className="text-lg font-black text-emerald-700 block mt-0.5">
                {childDetail.stats.completedSessions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                In Progress
              </span>
              <span className="text-lg font-black text-amber-700 block mt-0.5">
                {childDetail.stats.inProgressSessions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Abandoned
              </span>
              <span className="text-lg font-black text-rose-700 block mt-0.5">
                {childDetail.stats.abandonedSessions}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Completed Levels
              </span>
              <span className="text-lg font-black text-[#0A1D3D] block mt-0.5">
                {childDetail.stats.completedLevels} / 18
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Report Status
              </span>
              <span className="text-xs font-black text-indigo-700 block mt-1">
                {childDetail.stats.hasReport ? "Available" : "Pending"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Child-Specific Quest Sessions Section */}
      <QuestSessionsSection
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        activeStatusFilter={sessionStatusFilter}
        onStatusFilterChange={setSessionStatusFilter}
        onSelectSession={handleSelectSession}
        onViewReport={handleViewReport}
      />

      {/* Individual Session Inspection View */}
      <div
        id="child-session-progression-view-target"
        className="space-y-4 pt-4 border-t-2 border-slate-200"
      >
        {selectedSessionId && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-[#0A1D3D] shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0A1D3D] text-[#FFE066] flex items-center justify-center font-black">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-[#0A1D3D]">
                    Child Quest Progression Matrix & Telemetry
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D]">
                    Inspecting Session
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Session ID: <strong>{selectedSessionId}</strong> · Child:{" "}
                  <strong>{childDetail?.childName}</strong>
                </p>
              </div>
            </div>

            {selectedSessionDetail && (
              <button
                type="button"
                onClick={() => loadSessionBreakdown(selectedSessionId)}
                disabled={isSessionLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    isSessionLoading ? "animate-spin text-[#00BCD4]" : ""
                  }`}
                />
                <span>Refresh Session Data</span>
              </button>
            )}
          </div>
        )}

        {isSessionLoading ? (
          <div className="p-12 rounded-3xl bg-white border-2 border-slate-200 text-center space-y-3 animate-pulse">
            <RefreshCw className="w-8 h-8 text-[#00BCD4] animate-spin mx-auto" />
            <p className="text-sm font-bold text-[#0A1D3D]">
              Loading 6-game progression matrix & telemetry records...
            </p>
            <p className="text-xs text-slate-400">
              Retrieving session {selectedSessionId}
            </p>
          </div>
        ) : selectedSessionDetail ? (
          <SixGameProgressionView
            sessionDetail={selectedSessionDetail}
            attempts={sessionAttempts}
            onInspectAttempt={(att) => setInspectingAttempt(att)}
            onViewReport={() => handleViewReport(selectedSessionDetail.session.id)}
          />
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400">
            {sessions.length === 0
              ? "No quest sessions available for this child profile yet."
              : "Select a quest session above to inspect progression and telemetry details."}
          </div>
        )}
      </div>

      {/* Telemetry Inspector Modal */}
      <TelemetryInspectorModal
        attempt={inspectingAttempt}
        isOpen={Boolean(inspectingAttempt)}
        onClose={() => setInspectingAttempt(null)}
      />

      {/* Final Assessment Report Modal */}
      <QuestReportModal
        reportResult={viewingReportResult}
        isOpen={Boolean(viewingReportResult)}
        onClose={() => setViewingReportResult(null)}
      />
    </div>
  );
}
