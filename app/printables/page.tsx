import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/footer-section";
import { PrintablesView } from "@/components/printables/printables-view";
import { getPrintablesData } from "@/lib/api/printables";

export const metadata: Metadata = {
  title: "Hands-On Printables for Curious Minds | OrionKids",
  description:
    "Screen-free cognitive worksheets, tactile activity mats, and daily adventures curated, classroom-organized and graded by neuroscience and child specialists. Instant PDF printouts.",
  keywords: [
    "OrionKids printables",
    "kids worksheets",
    "cognitive activity sheets",
    "screen-free learning",
    "math riddles",
    "spatial mazes",
    "classroom printouts",
  ],
  openGraph: {
    title: "Hands-On Printables for Curious Minds | OrionKids",
    description:
      "Screen-free cognitive worksheets, tactile activity mats, and daily adventures curated for classes 1–4.",
    images: ["/images/Child exploring a tablet.png"],
  },
};

/**
 * PrintablesPage - React Server Component (RSC)
 * 
 * - Server-side data fetching via getPrintablesData()
 * - Instant SEO and fast First Contentful Paint (FCP)
 * - Ready for backend modifications (database / CMS API integration)
 * - Minimal client JS payload with focused interactive Client Components
 */
import { PageCurtain } from "@/components/layout/page-curtain";

export default async function PrintablesPage() {
  // Fetch printables dataset on the server
  const data = await getPrintablesData();

  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFD600] selection:text-[#1E293B]">
      <PageCurtain>
        {/* 1. Printables Announcement Banner (Matching reference image: 100% FREE BRAIN-SPARKING...) */}
        <AnnouncementBar
          text="🍃 100% FREE BRAIN-SPARKING WORKSHEETS & CRAFTS ★ LOW-INK GUARANTEED"
          href="#featured"
          bg="bg-[#E6FAF0]"
        />

        {/* 2. Main Site Navbar with Active Route Highlighting */}
        <Navbar />

        {/* 3. Interactive Printables View (Hero, Featured, Spotlight, Grid, Low-Ink, Workbook) */}
        <div className="flex-1">
          <PrintablesView initialData={data} />
        </div>
      </PageCurtain>

      {/* 4. Footer with Interactive Doodles & Brand Links */}
      <FooterSection />
    </main>
  );
}
