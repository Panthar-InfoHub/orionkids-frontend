"use client";

import React from "react";
import Link from "next/link";
import {
  Baby,
  School,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Gamepad2,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { AdminChildProfile } from "@/lib/api/admin";

interface ChildProfilesSectionProps {
  childrenList: AdminChildProfile[];
  userName: string;
  userId?: string;
}

export function ChildProfilesSection({
  childrenList,
  userName,
  userId,
}: ChildProfilesSectionProps) {
  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "—";
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-[#0A1D3D] flex items-center gap-2">
            <Baby className="w-5 h-5 text-[#00838F]" />
            <span>Associated Child Profiles ({childrenList.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered children under parent account &ldquo;{userName}&rdquo;. Select a child profile card to inspect its isolated quest sessions and game progression.
          </p>
        </div>
      </div>

      {childrenList.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
            <Baby className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-700">No Child Profiles Found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            This user has not yet completed child profile onboarding.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {childrenList.map((child) => {
            const targetUserId = child.userId || userId;
            const cardHref = targetUserId
              ? `/admin/users/${targetUserId}/children/${child.id}`
              : `#`;

            return (
              <Link
                key={child.id}
                href={cardHref}
                className="group p-6 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] hover:shadow-[6px_6px_0px_#0A1D3D] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-4 text-left no-underline"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-[#0A1D3D] group-hover:text-[#00838F] transition-colors">
                          {child.childName}
                        </h4>
                        <span className="text-[11px] font-bold text-[#00838F] opacity-0 group-hover:opacity-100 transition-opacity">
                          View details →
                        </span>
                      </div>

                      {/* Unique Child Profile/Onboarding ID (Disambiguates same-name instances) */}
                      <div className="mt-1">
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 inline-block">
                          Profile ID: {child.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D]">
                          Class: {child.selectedClass}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Age: {child.age} years old
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{child.isGuardian ? "Parent / Guardian" : "Delegate"}</span>
                    </div>
                  </div>

                  {/* Quest Progression & Status Badge */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Quest Sessions
                      </span>
                      <span className="font-black text-[#0A1D3D] flex items-center gap-1 mt-0.5">
                        <Gamepad2 className="w-3 h-3 text-indigo-600" />
                        <span>{child.totalSessions ?? 0}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Levels Completed
                      </span>
                      <span className="font-black text-[#0A1D3D] flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3 text-[#FFD028]" />
                        <span>{child.completedLevels ?? 0} / 18</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                        Latest Status
                      </span>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-black uppercase mt-0.5 ${
                          child.sessionStatus === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : child.sessionStatus === "IN_PROGRESS"
                            ? "bg-amber-100 text-amber-800"
                            : child.sessionStatus === "ABANDONED"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {child.sessionStatus || "READY"}
                      </span>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100 mt-3">
                    <div className="flex items-start gap-2">
                      <School className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          School / Institution
                        </span>
                        <span className="font-bold text-slate-700 truncate block">
                          {child.school || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Preferred Language
                      </span>
                      <span className="font-bold text-slate-700">{child.language}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Parent Email
                        </span>
                        <span className="font-bold text-slate-700 truncate block">
                          {child.parentEmail}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Parent Mobile
                        </span>
                        <span className="font-bold text-slate-700">
                          {child.parentMobile}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer: ID, Reports & Click Indicator */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>
                      Student ID:{" "}
                      <strong className="text-slate-700 font-mono">
                        {child.studentId || "Auto"}
                      </strong>
                    </span>
                    <span>·</span>
                    <span>Created {formatDate(child.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {child.hasReport ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>Report Available</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">No report yet</span>
                    )}

                    <span className="text-xs font-black text-[#00838F] group-hover:translate-x-0.5 transition-transform">
                      Inspect Child →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
