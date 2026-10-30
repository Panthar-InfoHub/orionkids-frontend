"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  Sparkles,
  Gamepad2,
  Calendar,
  School,
  Languages,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  BarChart3,
  FileText,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import {
  fetchChild,
  fetchChildProgress,
  fetchChildQuestSessions,
  fetchChildReports,
  type ChildWithStats,
  type ChildProgressResponse,
  type ChildQuestSessionItem,
  type ChildReportItem,
} from "@/lib/api/children";
import { startChildQuest } from "@/lib/api/session";
import { PageCurtain } from "@/components/layout/page-curtain";
import { FooterSection } from "@/components/layout/footer-section";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface PageProps {
  params: Promise<{ childId: string }>;
}

function ChildDetailContent({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const childId = decodeURIComponent(resolvedParams.childId);

  const [activeTab, setActiveTab] = useState<"PROGRESS" | "SESSIONS" | "REPORTS">(
    searchParams.get("tab") === "reports" ? "REPORTS" : "PROGRESS"
  );

  const [child, setChild] = useState<ChildWithStats | null>(null);
  const [progress, setProgress] = useState<ChildProgressResponse | null>(null);
  const [sessions, setSessions] = useState<ChildQuestSessionItem[]>([]);
  const [reports, setReports] = useState<ChildReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingQuest, setIsStartingQuest] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [childData, progressData, sessionsData, reportsData] = await Promise.all([
        fetchChild(childId),
        fetchChildProgress(childId),
        fetchChildQuestSessions(childId),
        fetchChildReports(childId),
      ]);

      if (!childData) {
        setErrorMessage("Child profile not found or access denied.");
        return;
      }

      setChild(childData);
      setProgress(progressData);
      setSessions(sessionsData);
      setReports(reportsData);
    } catch (err) {
      console.error("[ChildDetail] Failed to load data:", err);
      setErrorMessage("An unexpected error occurred while loading this child's progress.");
    } finally {
      setIsLoading(false);
    }
  }, [childId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleQuestAction = async () => {
    if (!child) return;
    setIsStartingQuest(true);
    try {
      const { destination } = await startChildQuest(child.id);
      router.push(destination);
    } catch (err) {
      console.error("Failed to start quest:", err);
      setIsStartingQuest(false);
      router.push(`/warm-up?childId=${encodeURIComponent(child.id)}`);
    }
  };

  const formatDate = (iso?: string) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-[#00BCD4] animate-spin mb-4" />
        <h2 className="text-lg font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
          Loading Child Quest Profile...
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Gathering 18-level progression matrix and assessment data.
        </p>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 max-w-md w-full bg-white rounded-3xl border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
            Child Record Not Found
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {errorMessage || "The requested child profile does not exist under your parent account."}
          </p>
          <Link
            href="/dashboard"
            className="inline-flex h-11 px-5 rounded-xl bg-[#0A1D3D] text-white font-black text-xs items-center justify-center"
          >
            Back to Family Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const hasInProgress = child.stats?.hasInProgressQuest;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <div className="w-full h-[6px] bg-[#00BCD4]" />

      <PageCurtain className="pb-16">
        {/* Navigation Header */}
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0A1D3D] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={handleQuestAction}
              disabled={isStartingQuest}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              style={{ fontFamily: JAKARTA }}
            >
              {isStartingQuest ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : hasInProgress ? (
                <RotateCcw className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-[#0A1D3D]" />
              )}
              <span>{hasInProgress ? "Resume Quest" : "Play Quest"}</span>
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex-1 space-y-6">
          {/* Child Identity Banner */}
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#0A1D3D] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
                    {child.childName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFE066] border border-[#0A1D3D] text-[11px] font-black text-[#0A1D3D]">
                    {child.selectedClass}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                    Profile ID: {child.id}
                  </span>
                  <span>·</span>
                  <span>Age: {child.age} years old</span>
                  <span>·</span>
                  <span>Language: {child.language}</span>
                  {child.school && (
                    <>
                      <span>·</span>
                      <span>School: {child.school}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF7EF] border border-[#65DCAA] text-xs font-bold text-[#0A1D3D] shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{child.isGuardian ? "Parent / Guardian Consent" : "Delegate"}</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Completed Levels
                </span>
                <span className="text-lg font-black text-[#0A1D3D]">
                  {child.stats?.completedLevelsCount || 0} / 18
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quest Sessions
                </span>
                <span className="text-lg font-black text-[#0A1D3D]">
                  {child.stats?.totalQuests || 1}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Status
                </span>
                <span className="text-lg font-black text-[#00838F]">
                  {hasInProgress ? "In Progress" : child.stats?.completedQuests ? "Completed" : "Ready"}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Registered
                </span>
                <span className="text-lg font-black text-slate-700">
                  {formatDate(child.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab("PROGRESS")}
              className={`pb-3 px-4 text-xs font-black transition-all flex items-center gap-2 border-b-2 ${
                activeTab === "PROGRESS"
                  ? "border-[#00BCD4] text-[#0A1D3D]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
              style={{ fontFamily: JAKARTA }}
            >
              <BarChart3 className="w-4 h-4" />
              <span>18-Level Quest Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("SESSIONS")}
              className={`pb-3 px-4 text-xs font-black transition-all flex items-center gap-2 border-b-2 ${
                activeTab === "SESSIONS"
                  ? "border-[#00BCD4] text-[#0A1D3D]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
              style={{ fontFamily: JAKARTA }}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Quest Sessions ({sessions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("REPORTS")}
              className={`pb-3 px-4 text-xs font-black transition-all flex items-center gap-2 border-b-2 ${
                activeTab === "REPORTS"
                  ? "border-[#00BCD4] text-[#0A1D3D]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
              style={{ fontFamily: JAKARTA }}
            >
              <FileText className="w-4 h-4" />
              <span>Assessment Reports ({reports.length})</span>
            </button>
          </div>

          {/* TAB 1: 18-Level Progression Matrix */}
          {activeTab === "PROGRESS" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {progress?.matrix.map((game) => (
                  <div
                    key={game.key}
                    className="p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#FFE066] border border-[#0A1D3D] flex items-center justify-center font-black text-xs text-[#0A1D3D]">
                          {game.id}
                        </span>
                        <h3 className="text-sm font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
                          {game.title}
                        </h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {game.levels.map((lvl) => {
                        const isDone = lvl.status === "COMPLETED";
                        const isCur = lvl.status === "IN_PROGRESS";
                        return (
                          <div
                            key={lvl.levelNumber}
                            className={`p-2.5 rounded-xl border text-center transition-all ${
                              isDone
                                ? "bg-[#EAF7EF] border-emerald-400 text-emerald-800"
                                : isCur
                                ? "bg-[#E0F7FA] border-[#00BCD4] text-[#00838F] animate-pulse"
                                : "bg-slate-50 border-slate-200 text-slate-400"
                            }`}
                          >
                            <span className="text-[10px] font-bold block">
                              Lvl {lvl.levelNumber}
                            </span>
                            <span className="text-xs font-black block mt-0.5">
                              {isDone ? "✓ Done" : isCur ? "Active" : "Locked"}
                            </span>
                            {lvl.attempt?.accuracy !== null && lvl.attempt?.accuracy !== undefined && (
                              <span className="text-[10px] font-medium block text-slate-500">
                                {lvl.attempt.accuracy}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Sessions List */}
          {activeTab === "SESSIONS" && (
            <div className="space-y-3">
              {sessions.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400">
                  No quest sessions found for this child profile.
                </div>
              ) : (
                sessions.map((s, idx) => (
                  <div
                    key={s.id}
                    className="p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-[#0A1D3D]">
                          Session #{sessions.length - idx}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          ({s.id})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                            s.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-800"
                              : s.status === "IN_PROGRESS"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {s.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Completed Levels: {s.completedLevelsCount}/18 · Started {formatDate(s.startedAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {s.hasReport && (
                        <Link
                          href={`/report?sessionId=${s.id}&childId=${child.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-[#EDE4FF] text-[#4338CA] font-bold text-xs border border-[#4338CA]/20 hover:bg-[#e2d5ff]"
                        >
                          View Report
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Reports */}
          {activeTab === "REPORTS" && (
            <div className="space-y-4">
              {reports.length === 0 ? (
                <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-700">No Assessment Reports Yet</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Complete all 18 levels of the quest journey to generate the authoritative cognitive assessment report.
                  </p>
                </div>
              ) : (
                reports.map((r) => (
                  <div
                    key={r.id}
                    className="p-6 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#0A1D3D]">
                          OrionKids Cognitive Assessment Report
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                          Authoritative
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Generated {formatDate(r.generatedAt)} · Overall Accuracy: {r.overallAccuracy}%
                      </p>
                    </div>

                    <Link
                      href={`/report?sessionId=${r.questSessionId}&childId=${child.id}`}
                      className="px-5 py-2.5 rounded-xl bg-[#00BCD4] hover:bg-[#00acc1] text-white font-black text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] inline-flex items-center gap-1.5"
                    >
                      <span>Read Full Report</span>
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </PageCurtain>

      <FooterSection />
    </div>
  );
}

export default function ChildDetailPage(props: PageProps) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin" />
        </div>
      }
    >
      <ChildDetailContent {...props} />
    </React.Suspense>
  );
}
