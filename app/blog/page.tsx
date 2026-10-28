import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/footer-section";
import { BlogView } from "@/components/blog/blog-view";
import { getBlogData } from "@/lib/api/blog";

export const metadata: Metadata = {
  title: "The OrionKids Discovery Chronicles | Big Ideas for Growing Minds",
  description:
    "Bite-sized cognitive insights, screen-free weekend crafts, game breakdowns, and expert-backed advice for curious parents & bold educators.",
  keywords: [
    "OrionKids blog",
    "Discovery Chronicles",
    "executive function in kids",
    "cognitive play",
    "neuroscience of play",
    "early math hacks",
    "parent guides",
    "classroom focus",
    "screen-time balance",
  ],
  openGraph: {
    title: "The OrionKids Discovery Chronicles | Big Ideas for Growing Minds",
    description:
      "Bite-sized cognitive insights, screen-free weekend crafts, game breakdowns, and expert-backed advice for curious parents & bold educators.",
    images: ["/images/blog/simon-says-hero.jpg"],
  },
};

/**
 * BlogPage - React Server Component (RSC)
 *
 * - Server-side data fetching via getBlogData()
 * - Instant SEO and fast First Contentful Paint (FCP)
 * - Prepared for future backend/CMS/database modifications
 * - Minimal client JS payload with focused interactive Client Components
 */
import { PageCurtain } from "@/components/layout/page-curtain";

export default async function BlogPage() {
  // Fetch initial blog dataset on the server
  const data = await getBlogData();

  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFD600] selection:text-[#1E293B]">
      <PageCurtain>
        {/* 1. Main Site Navbar with Active 'Blog' Route Highlighting */}
        <Navbar />

        {/* 2. Interactive Discovery Chronicles View (Hero, Featured Quest, 6-Card Grid, Constellation Club) */}
        <div className="flex-1">
          <BlogView initialData={data} />
        </div>
      </PageCurtain>

      {/* 3. Footer with Interactive Doodles & Brand Links */}
      <FooterSection />
    </main>
  );
}
