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
} from "lucide-react";
import type { AdminSessionReportResult } from "@/lib/api/admin";

interface QuestReportModalProps {
  reportResult: AdminSessionReportResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuestReportModal({
  reportResult,
  isOpen,
  onClose,
}: QuestReportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !reportResult) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(reportResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { hasReport, report, reason, message } = reportResult;

  const formatDuration = (ms: number | undefined) => {
    if (!ms) return "—";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

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
            {hasReport && (
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

              {/* Per-Game Performance Summaries */}
              {Array.isArray(report.gameSummaries) && report.gameSummaries.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-[#0A1D3D] mb-3 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#00BCD4]" />
                    <span>Game Performance Breakdown (6 Canonical Games)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {report.gameSummaries.map((gs, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-black text-[#0A1D3D]">
                            {gs.gameName || gs.gameKey}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-600">
                            Levels: {gs.levelsCompleted}/3
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Average Accuracy:</span>
                          <span className="font-black text-emerald-700">
                            {Math.round(gs.averageAccuracy)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-slate-500">Duration:</span>
                          <span className="font-bold text-slate-700">
                            {formatDuration(gs.totalDurationMs)}
                          </span>
                        </div>
                      </div>
                    ))}
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
