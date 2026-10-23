import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { AboutHeroSection } from "@/components/about-us/about-hero-section";
import { AboutFoundationSection } from "@/components/about-us/about-foundation-section";
import { AboutMissionSection } from "@/components/about-us/about-mission-section";
import { FoundationalValuesSection } from "@/components/about-us/foundational-values-section";
import { ClosingCtaSection } from "@/components/about-us/closing-cta-section";
import { FooterSection } from "@/components/layout/footer-section";

export const metadata: Metadata = {
  title: "About Us | OrionKids",
  description:
    "Built around one simple belief: Every child learns, thinks and responds to the world in their own way. Understanding that can help the adults around them give better support.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFE066] selection:text-[#0A1D3D]">
   

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* 3. First Section: About Us Hero Section */}
      <AboutHeroSection />

      {/* 4. Second Section: Our Foundation Section */}
      <AboutFoundationSection />

      {/* 5. Third Section: Mission, Vision & Promise */}
      <AboutMissionSection />

      {/* 6. Fourth Section: Our Five Foundational Values */}
      <FoundationalValuesSection />

      {/* 7. Fifth Section: Closing Call-to-Action Banner */}
      <ClosingCtaSection />

      {/* 8. Footer Section */}
      <FooterSection />
    </main>
  );
}
