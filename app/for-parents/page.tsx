import { ForParentsHeroSection } from "@/components/for-parents/hero-section";
import { ForParentsMiniGamesSection } from "@/components/for-parents/mini-games-section";
import { ForParentsMissionCtaSection } from "@/components/for-parents/mission-cta-section";
import { FooterSection } from "@/components/layout/footer-section";

export default function ForParentsPage() {
  return (
    <>
      <ForParentsHeroSection />
      <ForParentsMiniGamesSection />
      <ForParentsMissionCtaSection />
      <FooterSection />
    </>
  );
}
