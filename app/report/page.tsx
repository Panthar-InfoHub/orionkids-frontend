"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReportHeader } from "@/components/report/report-header";
import { StudentProfileSection } from "@/components/report/student-profile-section";
import { SkillsGlanceSection } from "@/components/report/skills-glance-section";
import { SuperpowersSection } from "@/components/report/superpowers-section";
import { GrowthPathwaysSection } from "@/components/report/growth-pathways-section";
import { EcosystemGrowthSection } from "@/components/report/ecosystem-growth-section";
import { HeartfeltNoteSection } from "@/components/report/heartfelt-note-section";
import { FooterSection } from "@/components/layout/footer-section";
import { PageCurtain } from "@/components/layout/page-curtain";
import { fetchQuestReport, type QuestReportData } from "@/lib/api/quest";
import { fetchCurrentSession, fetchResumeState } from "@/lib/api/session";
import { Gamepad2, ArrowRight, Loader2, Sparkles } from "lucide-react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

function ReportContent() {
  const searchParams = useSearchParams();
  const paramSessionId = searchParams.get("sessionId");
  const paramChildId = searchParams.get("childId");

  const [report, setReport] = useState<QuestReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [resumeDestination, setResumeDestination] = useState<string>("/games/stroop?level=1");

  useEffect(() => {
    let isCancelled = false;

    async function loadReport() {
      setIsLoading(true);
      try {
        let targetSessionId = paramSessionId;

        if (!targetSessionId) {
          const session = await fetchCurrentSession(paramChildId || undefined);
          targetSessionId = session?.id || null;
        }

        if (targetSessionId) {
          const result = await fetchQuestReport(targetSessionId);
          if (isCancelled) return;

          if (result.success && result.report) {
            setReport(result.report);
          } else if (result.isInProgress) {
            setIsInProgress(true);
            const resume = await fetchResumeState(paramChildId || undefined);
            if (resume.destination) {
              setResumeDestination(resume.destination);
            }
          }
        }
      } catch (err) {
        console.error("[ReportPage] Error loading report:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadReport();
    return () => {
      isCancelled = true;
    };
  }, [paramSessionId, paramChildId]);

  return (
    <div
      className="min-h-screen bg-[#F8FAFCB2] text-[#0A1D3D] selection:bg-[#FFE066] selection:text-[#0A1D3D]"
      style={{ backgroundColor: "#F8FAFCB2" }}
    >
      <PageCurtain className="bg-[#F8FAFC] pb-12">
        <ReportHeader />

        {/* If quest is still in progress, show prominent status banner */}
        {isInProgress && (
          <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
                    <span>Quest Journey In Progress</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">Active</span>
                  </h3>
                  <p className="text-xs text-amber-800 mt-0.5">
                    This child has not yet completed all 18 levels. Below is a preliminary view; complete the quest to finalize the cognitive assessment report.
                  </p>
                </div>
              </div>

              <Link
                href={resumeDestination}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1D3D] text-white text-xs font-black shadow-[2px_2px_0px_#FFD028] hover:bg-[#122b54] shrink-0"
              >
                <span>Continue Quest Journey</span>
                <ArrowRight className="w-4 h-4 text-[#FFD028]" />
              </Link>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="w-full min-h-[400px] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin" />
            <p className="text-xs font-bold text-slate-500">Retrieving cognitive assessment report...</p>
          </div>
        ) : (
          <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 flex flex-col gap-8 sm:gap-10 items-center">
            <StudentProfileSection report={report} />
            <SkillsGlanceSection report={report} />
            <SuperpowersSection />
            <GrowthPathwaysSection />
            <EcosystemGrowthSection />
            <HeartfeltNoteSection />
          </main>
        )}
      </PageCurtain>
      <FooterSection />
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
          <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin mb-3" />
          <p className="text-xs font-bold text-slate-500">Loading report...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
