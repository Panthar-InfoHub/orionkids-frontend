"use client";

import React from "react";
import { Baby, School, Mail, Phone, Calendar, ShieldCheck, Info } from "lucide-react";
import type { AdminChildProfile } from "@/lib/api/admin";

interface ChildProfilesSectionProps {
  childrenList: AdminChildProfile[];
  userName: string;
}

export function ChildProfilesSection({
  childrenList,
  userName,
}: ChildProfilesSectionProps) {
  const formatDate = (isoString: string) => {
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
            Registered children under parent account &ldquo;{userName}&rdquo;
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
          {childrenList.map((child) => (
            <div
              key={child.id}
              className="p-6 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-[#0A1D3D]">
                    {child.childName}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#FFE066]/30 border border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D]">
                      {child.selectedClass}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Age: {child.age} years old
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{child.isGuardian ? "Parent / Guardian" : "Delegate"}</span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <School className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      School / Institution
                    </span>
                    <span className="font-bold text-slate-700">
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

              {/* Student ID & Creation Timestamp */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  Student ID:{" "}
                  <strong className="text-slate-700 font-mono">
                    {child.studentId || "Auto-assigned"}
                  </strong>
                </span>
                <span>Created {formatDate(child.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
