"use client";

import React from "react";
import { ReportHeader } from "@/components/report/report-header";
import { StudentProfileSection } from "@/components/report/student-profile-section";
import { SkillsGlanceSection } from "@/components/report/skills-glance-section";
import { SuperpowersSection } from "@/components/report/superpowers-section";
import { GrowthPathwaysSection } from "@/components/report/growth-pathways-section";
import { EcosystemGrowthSection } from "@/components/report/ecosystem-growth-section";
import { HeartfeltNoteSection } from "@/components/report/heartfelt-note-section";
import { FooterSection } from "@/components/layout/footer-section";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export default function ReportPage() {
  return (
    <div
      className="min-h-screen bg-[#F8FAFCB2] text-[#0A1D3D] selection:bg-[#FFE066] selection:text-[#0A1D3D]"
      style={{ backgroundColor: "#F8FAFCB2" }}
    >
      <ReportHeader />
      <main className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 mb-12 sm:mb-16 flex flex-col gap-8 sm:gap-10 items-center">
        <StudentProfileSection />
        <SkillsGlanceSection />
        <SuperpowersSection />
        <GrowthPathwaysSection />
        <EcosystemGrowthSection />
        <HeartfeltNoteSection />
      </main>
      <FooterSection />
    </div>
  );
}
