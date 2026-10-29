"use client";

import React, { useState } from "react";
import { X, Copy, Check, Terminal, Activity, FileJson, Clock } from "lucide-react";
import type { AdminLevelAttemptItem } from "@/lib/api/admin";

interface TelemetryInspectorModalProps {
  attempt: AdminLevelAttemptItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TelemetryInspectorModal({
  attempt,
  isOpen,
  onClose,
}: TelemetryInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<"trials" | "metrics" | "raw">("trials");
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !attempt) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(attempt, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const trialRecords = Array.isArray(attempt.trialRecords) ? attempt.trialRecords : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-2 border-[#0A1D3D] shadow-[8px_8px_0px_#0A1D3D] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0A1D3D] text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5 text-[#FFE066]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-[#0A1D3D]">
                  Gameplay Telemetry & Trial Records
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] uppercase">
                  {attempt.gameKey} · L{attempt.levelNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Attempt #{attempt.attemptNumber} · ID: {attempt.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-black text-slate-700 transition-colors cursor-pointer"
              title="Copy complete JSON telemetry"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-100/70 border-b border-slate-200 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
            <p className="font-black text-[#0A1D3D]">{attempt.status}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
            <p className="font-black text-emerald-700">
              {attempt.accuracy !== null ? `${Math.round(attempt.accuracy)}%` : "—"}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Duration</span>
            <p className="font-black text-[#0A1D3D]">
              {attempt.durationMs ? `${(attempt.durationMs / 1000).toFixed(1)}s` : "—"}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Reaction Time</span>
            <p className="font-black text-[#00838F]">
              {attempt.averageReactionTimeMs ? `${attempt.averageReactionTimeMs}ms` : "—"}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("trials")}
            className={`pb-2.5 text-xs font-black transition-all cursor-pointer border-b-2 ${
              activeTab === "trials"
                ? "border-[#0A1D3D] text-[#0A1D3D]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Recorded Trials ({trialRecords.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`pb-2.5 text-xs font-black transition-all cursor-pointer border-b-2 ${
              activeTab === "metrics"
                ? "border-[#0A1D3D] text-[#0A1D3D]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Gameplay Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("raw")}
            className={`pb-2.5 text-xs font-black transition-all cursor-pointer border-b-2 ${
              activeTab === "raw"
                ? "border-[#0A1D3D] text-[#0A1D3D]"
                : "border-transparent text-slate-400 hover:text-slate-700"
            }`}
          >
            Full Raw Telemetry
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === "trials" && (
            <div>
              {trialRecords.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Terminal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">No trial-by-trial records</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    This attempt was recorded with aggregate metrics only.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500">
                        <th className="py-2.5 px-3">Trial #</th>
                        <th className="py-2.5 px-3">Result</th>
                        <th className="py-2.5 px-3">Reaction Time</th>
                        <th className="py-2.5 px-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {trialRecords.map((trial: any, idx: number) => {
                        const trialNum = trial.trial ?? trial.trialNumber ?? idx + 1;
                        const isCorrect = trial.correct ?? trial.isCorrect ?? trial.success;
                        const rt = trial.reactionTimeMs ?? trial.reactionTime ?? trial.rt;

                        return (
                          <tr key={idx} className="hover:bg-slate-50/60">
                            <td className="py-2 px-3 font-mono font-bold text-slate-700">
                              #{trialNum}
                            </td>
                            <td className="py-2 px-3">
                              {isCorrect === true ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Correct</span>
                                </span>
                              ) : isCorrect === false ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-700">
                                  <X className="w-3.5 h-3.5 text-rose-600" />
                                  <span>Incorrect</span>
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                            <td className="py-2 px-3 font-mono text-slate-600">
                              {typeof rt === "number" ? `${Math.round(rt)} ms` : "—"}
                            </td>
                            <td className="py-2 px-3 font-mono text-[10px] text-slate-500 truncate max-w-xs">
                              {JSON.stringify(trial)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "metrics" && (
            <div>
              {attempt.metrics && Object.keys(attempt.metrics).length > 0 ? (
                <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  {JSON.stringify(attempt.metrics, null, 2)}
                </pre>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <FileJson className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-600">No additional metrics stored</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "raw" && (
            <pre className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              {JSON.stringify(attempt, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors cursor-pointer"
          >
            Close Telemetry View
          </button>
        </div>
      </div>
    </div>
  );
}
