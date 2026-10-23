import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ConstellationSection } from "@/components/sections/constellation-section";
import { GameAssessmentSection } from "@/components/sections/game-assessment-section";
import { ChildJourneySection } from "@/components/sections/child-journey-section";
import { InsightReportSection } from "@/components/sections/insight-report-section";
import { EverydaySupportSection } from "@/components/sections/everyday-support-section";
import { SharedUnderstandingSection } from "@/components/sections/shared-understanding-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaBannerSection } from "@/components/sections/cta-banner-section";
import { FooterSection } from "@/components/layout/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#FFD600] selection:text-[#1E293B]">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <ConstellationSection />
      <GameAssessmentSection />
      <ChildJourneySection />
      <InsightReportSection />
      <EverydaySupportSection />
      <SharedUnderstandingSection />
      <FaqSection />
      <TestimonialsSection />
      <CtaBannerSection />
      <FooterSection />
    </main>
  );
}
