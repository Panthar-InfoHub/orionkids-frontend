import { ForParentsHeroSection } from "@/components/for-parents/hero-section";
import { ForParentsMiniGamesSection } from "@/components/for-parents/mini-games-section";
import { ForParentsMissionCtaSection } from "@/components/for-parents/mission-cta-section";
import { PageCurtain } from "@/components/layout/page-curtain";
import { FooterSection } from "@/components/layout/footer-section";

export default function ForParentsPage() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <PageCurtain>
        <ForParentsHeroSection />
        <ForParentsMiniGamesSection />
        <ForParentsMissionCtaSection />
      </PageCurtain>
      <FooterSection />
    </main>
  );
}
