import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { ApproachHeroSection } from "@/components/our-approach/approach-hero-section";
import { CycleSection } from "@/components/our-approach/cycle-section";
import { DimensionsSection } from "@/components/our-approach/dimensions-section";
import { EthicalFoundationSection } from "@/components/our-approach/ethical-foundation-section";
import { ApproachCtaSection } from "@/components/our-approach/approach-cta-section";
import { FooterSection } from "@/components/layout/footer-section";

export const metadata: Metadata = {
  title: "Our Approach | OrionKids",
  description:
    "Observe. Understand. Personalize. Track. From observation to insight, from insight to action, and from action to measurable progress.",
};

export default function OurApproachPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <Navbar />
      <ApproachHeroSection />
      <CycleSection />
      <DimensionsSection />
      <EthicalFoundationSection />
      <ApproachCtaSection />
      <FooterSection />
    </main>
  );
}
