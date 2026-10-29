"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  RefreshCw,
  AlertTriangle,
  Compass,
  Baby,
  Gamepad2,
  Layers,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Eye,
} from "lucide-react";
import {
  fetchAdminUserDetail,
  fetchAdminUserChildren,
  fetchAdminUserQuestSessions,
  fetchAdminUserQuestSessionDetail,
  fetchAdminUserSessionAttempts,
  fetchAdminUserSessionReport,
  updateAdminUserStatus,
  type AdminUserDetail,
  type AdminChildProfile,
  type AdminQuestSessionItem,
  type AdminQuestSessionDetail,
  type AdminLevelAttemptItem,
  type AdminSessionReportResult,
} from "@/lib/api/admin";
import { useAdmin } from "@/components/admin/admin-guard";
import { UserOverviewSection } from "@/components/admin/user-detail/user-overview-section";
import { ChildProfilesSection } from "@/components/admin/user-detail/child-profiles-section";
import { QuestSessionsSection } from "@/components/admin/user-detail/quest-sessions-section";
import { SixGameProgressionView } from "@/components/admin/user-detail/six-game-progression-view";
import { TelemetryInspectorModal } from "@/components/admin/user-detail/telemetry-inspector-modal";
import { QuestReportModal } from "@/components/admin/user-detail/quest-report-modal";

interface User360DetailViewProps {
  userId: string;
}

export function User360DetailView({ userId }: User360DetailViewProps) {
  const { admin } = useAdmin();

  // Core Data State
  const [userDetail, setUserDetail] = useState<AdminUserDetail | null>(null);
  const [childrenList, setChildrenList] = useState<AdminChildProfile[]>([]);
  const [sessions, setSessions] = useState<AdminQuestSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [selectedSessionDetail, setSelectedSessionDetail] =
    useState<AdminQuestSessionDetail | null>(null);
  const [sessionAttempts, setSessionAttempts] = useState<AdminLevelAttemptItem[]>([]);

  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<
    "ALL_360" | "OVERVIEW" | "CHILDREN" | "SESSIONS" | "PROGRESSION"
  >("ALL_360");
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

  // 1. Fetch user core data (profile, children, quest sessions)
  // Dependency only on userId and sessionStatusFilter to avoid re-fetch loops
  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [uDetail, uChildren, uSessionsRes] = await Promise.all([
        fetchAdminUserDetail(userId),
        fetchAdminUserChildren(userId),
        fetchAdminUserQuestSessions(userId, {
          status: sessionStatusFilter !== "ALL" ? sessionStatusFilter : undefined,
          limit: 20,
        }),
      ]);

      setUserDetail(uDetail);
      setChildrenList(uChildren);
      setSessions(uSessionsRes.sessions);

      // Auto-select latest session using functional updater so selectedSessionId is not in dependencies
      setSelectedSessionId((curr) => {
        if (curr && uSessionsRes.sessions.some((s) => s.id === curr)) {
          return curr;
        }
        return uSessionsRes.sessions.length > 0 ? uSessionsRes.sessions[0].id : null;
      });
    } catch (err) {
      console.error("[User360DetailView] Failed to load user:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading the User 360 profile."
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId, sessionStatusFilter]);

  // 2. Fetch selected quest session detail and telemetry attempts
  const loadSessionBreakdown = useCallback(
    async (sId: string) => {
      setIsSessionLoading(true);
      try {
        const [sDetail, sAttemptsRes] = await Promise.all([
          fetchAdminUserQuestSessionDetail(userId, sId),
          fetchAdminUserSessionAttempts(userId, sId, { limit: 100 }),
        ]);

        setSelectedSessionDetail(sDetail);
        setSessionAttempts(sAttemptsRes.attempts);
      } catch (err) {
        console.error("[User360DetailView] Failed to load session details:", err);
      } finally {
        setIsSessionLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

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
      const el = document.getElementById("session-progression-view-target");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleViewReport = async (sId?: string) => {
    const targetSessionId = sId || selectedSessionId;
    if (!targetSessionId) return;

    try {
      const reportRes = await fetchAdminUserSessionReport(userId, targetSessionId);
      setViewingReportResult(reportRes);
    } catch (err) {
      console.error("[User360DetailView] Failed to fetch report:", err);
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
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
          User 360° Profile Unavailable
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
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-[#00838F] hover:text-[#0A1D3D] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>User Management</span>
          </Link>
          <span>/</span>
          <span className="text-slate-700">User 360° Profile</span>
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

      {/* Main Account Overview Card */}
      {userDetail && (
        <UserOverviewSection
          userDetail={userDetail}
          currentAdminId={admin.id}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Navigation Tabs for Deep 360 Inspection */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
        <button
          type="button"
          onClick={() => setActiveTab("ALL_360")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "ALL_360"
              ? "border-[#0A1D3D] text-[#0A1D3D] bg-white shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#00BCD4]" />
          <span>Full 360° Dashboard View</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("CHILDREN")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "CHILDREN"
              ? "border-[#0A1D3D] text-[#0A1D3D] bg-white shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-[#00838F]" />
          <span>Child Profiles ({childrenList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("SESSIONS")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "SESSIONS"
              ? "border-[#0A1D3D] text-[#0A1D3D] bg-white shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Quest Sessions ({sessions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("PROGRESSION")}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-black transition-all cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === "PROGRESSION"
              ? "border-[#0A1D3D] text-[#0A1D3D] bg-white shadow-2xs"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#0A1D3D]" />
          <span>6-Game Progression Matrix</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "ALL_360" && (
        <div className="space-y-10">
          {/* Child Profiles Section */}
          <ChildProfilesSection
            childrenList={childrenList}
            userName={userDetail?.user.name || "User"}
          />

          {/* Quest Sessions History Section */}
          <QuestSessionsSection
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            activeStatusFilter={sessionStatusFilter}
            onStatusFilterChange={setSessionStatusFilter}
            onSelectSession={handleSelectSession}
            onViewReport={handleViewReport}
          />

          {/* Detailed 6-Game Progression of Selected Session */}
          <div id="session-progression-view-target" className="space-y-4 pt-4 border-t-2 border-slate-200">
            {selectedSessionId && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-[#0A1D3D] shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1D3D] text-[#FFE066] flex items-center justify-center font-black">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black text-[#0A1D3D]">
                        Session 6-Game Progression & Telemetry
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D]">
                        Inspecting Selection
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Session ID: <strong>{selectedSessionId}</strong>
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
                    <RefreshCw className={`w-3.5 h-3.5 ${isSessionLoading ? "animate-spin text-[#00BCD4]" : ""}`} />
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
                Select a quest session above to inspect progression details.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "CHILDREN" && (
        <ChildProfilesSection
          childrenList={childrenList}
          userName={userDetail?.user.name || "User"}
        />
      )}

      {activeTab === "SESSIONS" && (
        <div className="space-y-8">
          <QuestSessionsSection
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            activeStatusFilter={sessionStatusFilter}
            onStatusFilterChange={setSessionStatusFilter}
            onSelectSession={handleSelectSession}
            onViewReport={handleViewReport}
          />

          {/* Inspecting Session Detailed Progression Breakdown right below session list */}
          <div id="session-progression-view-target" className="space-y-4 pt-4 border-t-2 border-slate-200">
            {selectedSessionId && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-[#0A1D3D] shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1D3D] text-[#FFE066] flex items-center justify-center font-black">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black text-[#0A1D3D]">
                        Inspecting Quest Session Details
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D]">
                        Active Selection
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      Session ID: <strong>{selectedSessionId}</strong>
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
                    <RefreshCw className={`w-3.5 h-3.5 ${isSessionLoading ? "animate-spin text-[#00BCD4]" : ""}`} />
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
                Select a quest session above to inspect progression details.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "PROGRESSION" && (
        <div className="space-y-6">
          {/* Quick Session Switcher within Progression View */}
          {sessions.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0A1D3D]" />
                <span className="text-xs font-bold text-slate-600">Select Quest Session:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {sessions.map((s) => {
                  const isCur = s.id === selectedSessionId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectSession(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCur
                          ? "bg-[#0A1D3D] text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span className="font-mono">{s.id.slice(0, 10)}...</span>
                      {s.status === "COMPLETED" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : s.status === "IN_PROGRESS" ? (
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>
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
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center">
              <p className="text-sm font-bold text-slate-700">No session selected</p>
              <p className="text-xs text-slate-400 mt-1">
                Please select a session from the Quest Sessions tab.
              </p>
            </div>
          )}
        </div>
      )}

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
