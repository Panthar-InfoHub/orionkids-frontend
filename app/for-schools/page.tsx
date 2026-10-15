import { ForSchoolsHeroSection } from "@/components/for-schools/hero-section";
import { ForSchoolsObservationsSection } from "@/components/for-schools/observations-section";
import { ForSchoolsStepsSection } from "@/components/for-schools/steps-section";
import { ForSchoolsDemoTaskSection } from "@/components/for-schools/demo-task-section";
import { SchoolPilotCtaSection } from "@/components/for-schools/school-pilot-cta-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function ForSchoolsPage() {
  return (
    <>
      <ForSchoolsHeroSection />
      <ForSchoolsObservationsSection />
      <ForSchoolsStepsSection />
      <ForSchoolsDemoTaskSection />
      <SchoolPilotCtaSection />
      <FooterSection />
    </>
  );
}
