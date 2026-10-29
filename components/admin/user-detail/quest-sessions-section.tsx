"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  Copy,
  Check,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Award,
  ChevronRight,
  Filter,
  Activity,
  Layers,
} from "lucide-react";
import type { AdminQuestSessionItem } from "@/lib/api/admin";

interface QuestSessionsSectionProps {
  sessions: AdminQuestSessionItem[];
  selectedSessionId: string | null;
  activeStatusFilter: "ALL" | "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  onStatusFilterChange: (status: "ALL" | "IN_PROGRESS" | "COMPLETED" | "ABANDONED") => void;
  onSelectSession: (sessionId: string) => void;
  onViewReport: (sessionId: string) => void;
}

export function QuestSessionsSection({
  sessions,
  selectedSessionId,
  activeStatusFilter,
  onStatusFilterChange,
  onSelectSession,
  onViewReport,
}: QuestSessionsSectionProps) {
  const [copiedSessionId, setCopiedSessionId] = useState<string | null>(null);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedSessionId(id);
    setTimeout(() => setCopiedSessionId(null), 2000);
  };

  const formatDate = (iso: string | null | undefined) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-[#0A1D3D] flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-indigo-600" />
            <span>Quest Sessions ({sessions.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a session to inspect 6-game progression and telemetry.
          </p>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {(["ALL", "IN_PROGRESS", "COMPLETED", "ABANDONED"] as const).map((st) => {
            const isSelected = activeStatusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => onStatusFilterChange(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#0A1D3D] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st === "ALL"
                  ? "All Quests"
                  : st === "IN_PROGRESS"
                  ? "In Progress"
                  : st === "COMPLETED"
                  ? "Completed"
                  : "Abandoned"}
              </button>
            );
          })}
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
          <Gamepad2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No Quest Sessions Found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            No sessions match the selected filter for this user account.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => {
            const isSelected = session.id === selectedSessionId;

            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D]"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Session ID & Progression Status */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        Session: {session.id}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleCopyId(e, session.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                        title="Copy Session ID"
                      >
                        {copiedSessionId === session.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Status Tag */}
                      {session.status === "COMPLETED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      ) : session.status === "IN_PROGRESS" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          <span>Abandoned</span>
                        </span>
                      )}

                      {/* Report Tag */}
                      {session.hasReport ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-cyan-100 text-[#00838F] border border-cyan-200">
                          <Award className="w-3 h-3 text-[#00838F]" />
                          <span>Report Ready</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">
                          No report yet
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>
                        Stage: <strong className="text-slate-800">{session.currentStage}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Game {session.currentGame}, Level {session.currentLevel}
                      </span>
                      <span>•</span>
                      <span>
                        Contiguous Completed:{" "}
                        <strong className="text-emerald-700">
                          {session.completedLevelsCount} / 18
                        </strong>
                      </span>
                      <span>•</span>
                      <span>
                        Total Attempts:{" "}
                        <strong className="text-slate-700">
                          {session.totalAttemptsCount}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Right: Timestamps & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-right text-[11px] text-slate-400 hidden sm:block">
                      <p>Started: {formatDate(session.startedAt)}</p>
                      <p>Last Active: {formatDate(session.lastActivityAt)}</p>
                    </div>

                    {session.hasReport && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewReport(session.id);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-black text-[#0A1D3D] transition-colors cursor-pointer shadow-2xs"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>View Report</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectSession(session.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer shadow-2xs ${
                        isSelected
                          ? "bg-[#0A1D3D] text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{isSelected ? "Inspecting" : "Inspect Session"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
