"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  Gamepad2,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Award,
} from "lucide-react";
import type {
  AdminQuestSessionDetail,
  AdminGameProgress,
  AdminLevelAttemptItem,
} from "@/lib/api/admin";

interface SixGameProgressionViewProps {
  sessionDetail: AdminQuestSessionDetail;
  attempts: AdminLevelAttemptItem[];
  onInspectAttempt: (attempt: AdminLevelAttemptItem) => void;
  onViewReport: () => void;
}

export function SixGameProgressionView({
  sessionDetail,
  attempts,
  onInspectAttempt,
  onViewReport,
}: SixGameProgressionViewProps) {
  const [showWarmUpAnswers, setShowWarmUpAnswers] = useState(false);
  const [expandedGameKey, setExpandedGameKey] = useState<string | null>("stroop");

  const { progression, warmUp, session, report } = sessionDetail;

  const toggleGame = (gameKey: string) => {
    setExpandedGameKey((curr) => (curr === gameKey ? null : gameKey));
  };

  return (
    <div className="space-y-6">
      {/* Progression Header & Warm-Up Summary */}
      <div className="p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE066]/20 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] uppercase mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Quest Progression Matrix</span>
            </div>
            <h3 className="text-lg font-black text-[#0A1D3D]">
              6 Canonical Games · 18 Progressive Levels
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Contiguous completed stages:{" "}
              <strong className="text-[#0A1D3D]">
                {session.completedLevelsCount} of 18 levels
              </strong>{" "}
              {session.isQuestComplete ? "— Quest Completed 🎉" : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {Boolean(report) ? (
              <button
                type="button"
                onClick={onViewReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-[#FFE066]" />
                <span>View Final Report</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onViewReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Check Report Status</span>
              </button>
            )}
          </div>
        </div>

        {/* 18-Level Segmented Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>Overall Quest Contiguous Completion</span>
            <span>{Math.round((session.completedLevelsCount / 18) * 100)}%</span>
          </div>

          <div className="grid grid-cols-18 gap-1 h-3.5 p-0.5 rounded-lg bg-slate-100 border border-slate-200">
            {Array.from({ length: 18 }).map((_, idx) => {
              const levelIndex = idx + 1;
              const isCompleted = levelIndex <= session.completedLevelsCount;
              const isCurrent =
                !isCompleted &&
                session.status === "IN_PROGRESS" &&
                levelIndex === progression.authorizedCurrentGame * 3 - (3 - progression.authorizedCurrentLevel);

              return (
                <div
                  key={idx}
                  title={`Level ${levelIndex} (${
                    isCompleted
                      ? "Completed"
                      : isCurrent
                      ? "Authorized / In Progress"
                      : "Locked"
                  })`}
                  className={`h-full rounded-xs transition-colors ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isCurrent
                      ? "bg-amber-400 animate-pulse"
                      : "bg-slate-200"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Warm-Up Questionnaire Status */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-100 text-[#00838F] flex items-center justify-center font-black">
              <FileQuestion className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-[#0A1D3D]">Warm-Up Questionnaire: </span>
              {warmUp ? (
                <span className="text-emerald-700 font-bold">
                  Completed on {new Date(warmUp.completedAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-amber-700 font-bold">
                  Pending submission
                </span>
              )}
            </div>
          </div>

          {warmUp && (
            <button
              type="button"
              onClick={() => setShowWarmUpAnswers((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[#00838F] hover:text-[#0A1D3D] font-bold cursor-pointer transition-colors"
            >
              <span>{showWarmUpAnswers ? "Hide Answers" : "Inspect Answers"}</span>
              {showWarmUpAnswers ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Expandable Warm-Up Answers Drawer */}
        {showWarmUpAnswers && warmUp && (
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs animate-in fade-in duration-200">
            <h5 className="font-black text-[#0A1D3D] text-[11px] uppercase tracking-wider mb-2">
              Submitted Questionnaire Answers
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
              {Object.entries(warmUp.answers).map(([key, val]) => (
                <div
                  key={key}
                  className="p-2 rounded-lg bg-white border border-slate-200 flex items-start justify-between"
                >
                  <span className="font-bold text-slate-500">{key}:</span>
                  <span className="text-[#0A1D3D] font-black">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6 Canonical Games Cards */}
      <div className="space-y-4">
        {progression.games.map((game: AdminGameProgress) => {
          const isExpanded = expandedGameKey === game.gameKey;
          const gameAttempts = attempts.filter((a) => a.gameKey === game.gameKey);

          return (
            <div
              key={game.gameKey}
              className="rounded-2xl bg-white border-2 border-slate-200 overflow-hidden shadow-xs hover:border-[#0A1D3D] transition-colors"
            >
              {/* Game Header Bar */}
              <div
                onClick={() => toggleGame(game.gameKey)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-slate-50/60 hover:bg-slate-100/60 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A1D3D] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    G{game.gameId}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-[#0A1D3D] text-sm sm:text-base">
                        {game.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({game.gameKey})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {game.completedLevels} / 3 levels completed ·{" "}
                      {gameAttempts.length} total recorded attempts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {game.isGameCompleted ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  ) : game.completedLevels > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>In Progress</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-100 text-slate-600 border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Not Started</span>
                    </span>
                  )}

                  <button
                    type="button"
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Levels Breakdown */}
              {isExpanded && (
                <div className="p-4 sm:p-5 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {game.levels.map((lvl) => {
                      const levelAttempts = gameAttempts.filter(
                        (a) => a.levelNumber === lvl.levelNumber
                      );
                      const latestAttempt = levelAttempts[levelAttempts.length - 1];

                      return (
                        <div
                          key={lvl.levelNumber}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            lvl.status === "COMPLETED"
                              ? "bg-emerald-50/40 border-emerald-300 shadow-2xs"
                              : lvl.status === "IN_PROGRESS"
                              ? "bg-amber-50/40 border-amber-400 shadow-2xs"
                              : "bg-slate-50 border-slate-200 opacity-75"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-black text-[#0A1D3D]">
                              Level {lvl.levelNumber}
                            </span>
                            {lvl.status === "COMPLETED" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Done</span>
                              </span>
                            ) : lvl.status === "IN_PROGRESS" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black">
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>Active</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[10px] font-black">
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span>Locked</span>
                              </span>
                            )}
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Best Accuracy:</span>
                              <span className="font-bold text-[#0A1D3D]">
                                {lvl.bestAccuracy !== null
                                  ? `${Math.round(lvl.bestAccuracy)}%`
                                  : "—"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Best Duration:</span>
                              <span className="font-bold text-[#0A1D3D]">
                                {lvl.bestDurationMs
                                  ? `${(lvl.bestDurationMs / 1000).toFixed(1)}s`
                                  : "—"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Attempts Count:</span>
                              <span className="font-bold text-slate-700">
                                {lvl.totalAttempts}
                              </span>
                            </div>

                            {lvl.completedAt && (
                              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/60">
                                <span>Completed:</span>
                                <span>
                                  {new Date(lvl.completedAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quick Inspect Latest Attempt */}
                          {latestAttempt && (
                            <button
                              type="button"
                              onClick={() => onInspectAttempt(latestAttempt)}
                              className="w-full mt-3 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-black text-slate-700 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Activity className="w-3.5 h-3.5 text-[#00BCD4]" />
                              <span>Inspect Telemetry</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Level Attempts List for this Game */}
                  {gameAttempts.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                        Recorded Level Attempts for {game.name} ({gameAttempts.length})
                      </h5>
                      <div className="space-y-1.5">
                        {gameAttempts.map((attempt) => (
                          <div
                            key={attempt.id}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#0A1D3D]">
                                L{attempt.levelNumber}
                              </span>
                              <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600">
                                Attempt #{attempt.attemptNumber}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  attempt.status === "COMPLETED"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : attempt.status === "IN_PROGRESS"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {attempt.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-[11px] text-slate-500">
                              <span>
                                Acc:{" "}
                                <strong className="text-emerald-700">
                                  {attempt.accuracy !== null
                                    ? `${Math.round(attempt.accuracy)}%`
                                    : "—"}
                                </strong>
                              </span>
                              <span>
                                Dur:{" "}
                                <strong className="text-slate-800">
                                  {attempt.durationMs
                                    ? `${(attempt.durationMs / 1000).toFixed(1)}s`
                                    : "—"}
                                </strong>
                              </span>
                              <button
                                type="button"
                                onClick={() => onInspectAttempt(attempt)}
                                className="px-2 py-1 rounded-md bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-slate-700 cursor-pointer"
                              >
                                Telemetry JSON
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
