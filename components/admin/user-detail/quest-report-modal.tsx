"use client";

import React, { useState } from "react";
import {
  X,
  Award,
  Sparkles,
  Clock,
  Target,
  Brain,
  ShieldCheck,
  Calendar,
  AlertCircle,
  Copy,
  Check,
  Download,
  RefreshCw,
  Loader2,
  FileText,
  Lightbulb,
  Mail,
} from "lucide-react";
import {
  downloadAdminReportPdf,
  regenerateAdminReport,
  resendAdminReportEmail,
  type AdminSessionReportResult,
} from "@/lib/api/admin";
import { ReportEmailStatus } from "@/components/reports/report-email-status";

interface QuestReportModalProps {
  reportResult: AdminSessionReportResult | null;
  isOpen: boolean;
  onClose: () => void;
  onReportUpdated?: (updatedReport: any) => void;
}

export function QuestReportModal({
  reportResult,
  isOpen,
  onClose,
  onReportUpdated,
}: QuestReportModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentReport, setCurrentReport] = useState(reportResult?.report || null);
  const [isResending, setIsResending] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  React.useEffect(() => {
    setCurrentReport(reportResult?.report || null);
  }, [reportResult]);

  if (!isOpen || !reportResult) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(reportResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { hasReport, reason, message } = reportResult;
  const report = currentReport;

  const handleDownloadPdf = async () => {
    if (!report?.questSessionId || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadAdminReportPdf(report.questSessionId, report.childName);
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!report?.questSessionId || isResending) return;
    setIsResending(true);
    setEmailFeedback(null);
    try {
      const state = await resendAdminReportEmail(report.questSessionId);
      setCurrentReport({
        ...report,
        emailStatus: state.emailStatus,
        emailRecipient: state.emailRecipient,
        emailError: null,
      });
      setEmailFeedback({
        ok: true,
        message: `A new link is being emailed to ${state.emailRecipient ?? "the parent"}. The previous link no longer works.`,
      });
    } catch (err) {
      setEmailFeedback({
        ok: false,
        message: err instanceof Error ? err.message : "Failed to resend the report email",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleRegenerate = async () => {
    if (!report?.questSessionId || isRegenerating) return;
    const confirmed = window.confirm(
      "This will create a new report with OpenAI and email the parent a new link (the previous link will stop working). Continue?"
    );
    if (!confirmed) return;
    setIsRegenerating(true);
    try {
      const updated = await regenerateAdminReport(report.questSessionId);
      // The backend now rebuilds the PDF and emails the parent in the background
      setCurrentReport({ ...updated, emailStatus: "PENDING" });
      setEmailFeedback({
        ok: true,
        message: "Report regenerated. A new link is being emailed to the parent.",
      });
      if (onReportUpdated) {
        onReportUpdated(updated);
      }
    } catch (err) {
      console.error("Regeneration failed:", err);
      alert(err instanceof Error ? err.message : "Failed to regenerate report");
    } finally {
      setIsRegenerating(false);
    }
  };

  const formatDuration = (ms: number | undefined) => {
    if (!ms) return "—";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Normalize game summaries: could be Array or Object
  let summariesList: any[] = [];
  if (Array.isArray(report?.gameSummaries)) {
    summariesList = report.gameSummaries;
  } else if (report?.gameSummaries && typeof report.gameSummaries === "object") {
    summariesList = Object.values(report.gameSummaries);
  }

  const aiReport = report?.aiReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-2 border-[#0A1D3D] shadow-[8px_8px_0px_#0A1D3D] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-[#0A1D3D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFE066] text-[#0A1D3D] flex items-center justify-center font-black shadow-xs">
              <Award className="w-5 h-5 text-[#0A1D3D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  OrionKids Quest Assessment Report
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/20 border border-[#FFE066]/40 text-[10px] font-black text-[#FFE066] uppercase">
                  Authoritative Record
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Saved cognitive exploration summary and performance facets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasReport && report && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00BCD4] hover:bg-[#00acc1] text-xs font-black text-white transition-colors cursor-pointer disabled:opacity-60"
                  title="Download Official PDF Report"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black text-white transition-colors cursor-pointer disabled:opacity-60"
                  title="Explicitly Regenerate with OpenAI"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin text-[#FFE066]" : ""}`} />
                  <span>{isRegenerating ? "Generating..." : "Regenerate"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black text-white transition-colors cursor-pointer"
                  title="Copy Raw Report JSON"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!hasReport ? (
            // Honest State: Report Not Available
            <div className="py-12 px-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-amber-900">
                {reason === "QUEST_IN_PROGRESS"
                  ? "Quest In Progress — Report Not Yet Generated"
                  : "Final Report Unavailable"}
              </h4>
              <p className="text-xs text-amber-800 max-w-md mx-auto leading-relaxed">
                {message ||
                  "A cognitive assessment report is generated only when all 18 levels across the 6 canonical games have been completed."}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-[11px] font-bold">
                  Status: {reason || "UNAVAILABLE"}
                </span>
              </div>
            </div>
          ) : report ? (
            <>
              {/* Parent email delivery */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Parent report email
                  </span>
                  <ReportEmailStatus
                    status={report.emailStatus}
                    recipient={report.emailRecipient}
                    sentAt={report.emailSentAt}
                    error={report.emailError}
                    showFullEmail
                    showError
                  />
                  {emailFeedback && (
                    <p
                      className={`text-[11px] font-bold ${emailFeedback.ok ? "text-emerald-700" : "text-rose-600"}`}
                      role={emailFeedback.ok ? "status" : "alert"}
                    >
                      {emailFeedback.message}
                    </p>
                  )}
                </div>
                {report.emailStatus !== "PENDING" && (
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border-2 border-[#0A1D3D] text-xs font-black text-[#0A1D3D] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isResending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Mail className="w-3.5 h-3.5" />
                    )}
                    <span>{report.emailStatus === "SENT" ? "Resend email" : "Send email to parent"}</span>
                  </button>
                )}
              </div>

              {/* Student Overview Header Card */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-black text-[#00838F] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explorer Profile</span>
                  </div>
                  <h2 className="text-xl font-black text-[#0A1D3D]">
                    {report.childName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {report.selectedClass} · Age {report.age}
                    {report.school ? ` · ${report.school}` : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600">
                      Model: {report.modelName || "OpenAI Engine"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800 uppercase">
                      Status: {report.status || "GENERATED"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Overall Accuracy
                    </span>
                    <span className="text-2xl font-black text-emerald-700">
                      {Math.round(report.overallAccuracy)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Total Duration
                    </span>
                    <span className="text-lg font-black text-[#0A1D3D]">
                      {formatDuration(report.totalDurationMs)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Generated On
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {new Date(report.generatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Structured Synthesis Card if present */}
              {aiReport?.overallPerformanceSummary && (
                <div className="p-5 rounded-2xl bg-[#F0FDF4] border-2 border-emerald-300 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                      AI Cognitive Performance Synthesis
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {aiReport.overallPerformanceSummary}
                  </p>
                </div>
              )}

              {/* Per-Game Performance Summaries */}
              {summariesList.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-[#0A1D3D] mb-3 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#00BCD4]" />
                    <span>Game Performance Breakdown (6 Canonical Games)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {summariesList.map((gs, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-black text-[#0A1D3D]">
                            {gs.gameName || gs.gameKey}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                            Levels: {gs.levelsCompleted || 3}/3
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Average Accuracy:</span>
                          <span className="font-black text-emerald-700">
                            {gs.averageAccuracy !== null && gs.averageAccuracy !== undefined
                              ? `${Math.round(gs.averageAccuracy)}%`
                              : "—"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-slate-500">Avg Pace:</span>
                          <span className="font-bold text-slate-700">
                            {gs.averageReactionTimeMs
                              ? `${(gs.averageReactionTimeMs / 1000).toFixed(1)}s`
                              : gs.totalDurationMs
                              ? formatDuration(gs.totalDurationMs)
                              : "—"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observed Strengths & Areas for Growth */}
              {(aiReport?.observedStrengths?.length || aiReport?.areasForPractice?.length) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h5 className="text-xs font-black text-emerald-800 flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Observed Strengths</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {aiReport.observedStrengths.map((str: string, sIdx: number) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth Areas */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h5 className="text-xs font-black text-amber-800 flex items-center gap-1.5 uppercase">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Areas for Practice</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {aiReport.areasForPractice.map((prc: string, pIdx: number) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{prc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Cognitive Facets & Growth Observations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cognitive Facets */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-black text-[#0A1D3D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-[#00838F]" />
                    <span>Cognitive Facets</span>
                  </h4>
                  <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-56">
                    {JSON.stringify(report.cognitiveFacets, null, 2)}
                  </pre>
                </div>

                {/* Growth Observations */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-black text-[#0A1D3D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Growth Observations</span>
                  </h4>
                  {Array.isArray(report.growthObservations) ? (
                    <ul className="space-y-2 text-xs text-slate-700">
                      {report.growthObservations.map((obs, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00BCD4] mt-1.5 shrink-0" />
                          <span>{String(obs)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-56">
                      {JSON.stringify(report.growthObservations, null, 2)}
                    </pre>
                  )}
                </div>
              </div>

              {/* Non-Diagnostic Disclaimer Note */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <p>
                  <strong>Formative Cognitive Observation Notice:</strong> OrionKids quest
                  telemetry and assessment reports provide educational observations of working
                  memory, cognitive flexibility, and processing speed. They do not constitute
                  clinical or medical diagnoses.
                </p>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
