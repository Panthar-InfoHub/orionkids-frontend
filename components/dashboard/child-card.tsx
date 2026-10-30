"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Play,
  RotateCcw,
  BarChart3,
  FileText,
  School,
  Languages,
  Calendar,
  ShieldCheck,
  Edit2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import type { ChildWithStats } from "@/lib/api/children";
import { startChildQuest } from "@/lib/api/session";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

interface ChildCardProps {
  child: ChildWithStats;
  onEdit?: (child: ChildWithStats) => void;
}

export function ChildCard({ child, onEdit }: ChildCardProps) {
  const router = useRouter();
  const [isStartingQuest, setIsStartingQuest] = useState(false);

  const stats = child.stats || {
    totalQuests: 0,
    completedQuests: 0,
    hasInProgressQuest: false,
    activeSessionId: null,
    currentStage: "NOT_STARTED",
    currentGame: 1,
    currentLevel: 1,
    completedLevelsCount: 0,
    progressOverall: 0,
    hasReport: false,
    latestActivityAt: child.updatedAt || child.createdAt,
  };

  const handleQuestAction = async () => {
    setIsStartingQuest(true);
    try {
      const { destination } = await startChildQuest(child.id);
      router.push(destination);
    } catch (err) {
      console.error("Failed to start or resume quest for child:", err);
      setIsStartingQuest(false);
      // Fallback: navigate to warm up with childId
      router.push(`/warm-up?childId=${encodeURIComponent(child.id)}`);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Recently";
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#0A1D3D] transition-all">
      <div>
        {/* Header Row: Child Name, Class, Age & Guardian Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="text-xl sm:text-2xl font-black text-[#0A1D3D] tracking-tight"
                style={{ fontFamily: JAKARTA }}
              >
                {child.childName}
              </h3>
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(child)}
                  className="p-1 text-slate-400 hover:text-[#00BCD4] rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Edit child profile"
                  aria-label={`Edit profile for ${child.childName}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Profile ID Badge (Unique Identifier) */}
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200">
                Profile ID: {child.id}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFE066] border border-[#0A1D3D] text-[11px] font-black text-[#0A1D3D]">
                {child.selectedClass}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Age: {child.age} years old
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF7EF] border border-[#65DCAA] text-[11px] font-bold text-[#0A1D3D] shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{child.isGuardian ? "Parent / Guardian" : "Delegate"}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
          <div className="flex items-start gap-2">
            <School className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                School
              </span>
              <span className="font-bold text-slate-700 truncate block">
                {child.school || "Not specified"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Languages className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Language
              </span>
              <span className="font-bold text-slate-700">{child.language}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Created
              </span>
              <span className="font-bold text-slate-700">{formatDate(child.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Quest Sessions
              </span>
              <span className="font-bold text-slate-700">
                {stats.totalQuests || 1} {stats.totalQuests === 1 ? "Session" : "Sessions"}
              </span>
            </div>
          </div>
        </div>

        {/* 18-Level Quest Journey Progress */}
        <div className="mt-4 p-4 rounded-2xl bg-[#F0F6FA] border border-[#DCE4EF] space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span
              className="font-extrabold uppercase tracking-wide text-[#0A1D3D] flex items-center gap-1.5"
              style={{ fontFamily: JAKARTA }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD028]" />
              <span>18-Level Quest Journey</span>
            </span>

            <span className="font-black text-[#0A1D3D]">
              {stats.completedLevelsCount}/18 Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-white border border-[#0A1D3D] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-[#FFD028] border-r border-[#0A1D3D] transition-all duration-500"
              style={{
                width: `${Math.max(4, (stats.completedLevelsCount / 18) * 100)}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
            <span>
              {stats.hasInProgressQuest ? (
                <span className="inline-flex items-center gap-1 text-[#00838F] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00BCD4] animate-pulse" />
                  In Progress · Game {stats.currentGame} Level {stats.currentLevel}
                </span>
              ) : stats.completedQuests > 0 ? (
                <span className="text-emerald-700 font-bold">
                  ✓ Quest Completed ({stats.completedQuests})
                </span>
              ) : (
                <span className="text-slate-400">Ready for initial warm-up</span>
              )}
            </span>

            <span className="text-[10px] text-slate-400">
              Updated {formatDate(stats.latestActivityAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Primary Play/Resume Button */}
        {stats.hasInProgressQuest ? (
          <button
            type="button"
            onClick={handleQuestAction}
            disabled={isStartingQuest}
            className="flex-1 h-11 px-4 rounded-xl bg-[#4FDDA6] hover:bg-[#3ec491] text-[#0A1D3D] font-black text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            style={{ fontFamily: JAKARTA }}
          >
            {isStartingQuest ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            <span>Resume Quest</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleQuestAction}
            disabled={isStartingQuest}
            className="flex-1 h-11 px-4 rounded-xl bg-[#FFD028] hover:bg-[#ffc524] text-[#0A1D3D] font-black text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            style={{ fontFamily: JAKARTA }}
          >
            {isStartingQuest ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-[#0A1D3D]" />
            )}
            <span>
              {stats.completedQuests > 0 ? "Play Quest Again" : "Start Quest"}
            </span>
          </button>
        )}

        {/* View Progress Button */}
        <Link
          href={`/dashboard/children/${encodeURIComponent(child.id)}`}
          className="h-11 px-4 rounded-xl bg-white hover:bg-slate-50 text-[#0A1D3D] font-bold text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#00BCD4]" />
          <span>Progress</span>
        </Link>

        {/* View Reports Button if reports exist */}
        {stats.hasReport && (
          <Link
            href={`/dashboard/children/${encodeURIComponent(child.id)}?tab=reports`}
            className="h-11 px-3.5 rounded-xl bg-[#EDE4FF] hover:bg-[#e2d5ff] text-[#4338CA] font-bold text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0"
            title="View child's saved assessment reports"
          >
            <FileText className="w-3.5 h-3.5 text-[#4338CA]" />
            <span>Reports</span>
          </Link>
        )}
      </div>
    </div>
  );
}
