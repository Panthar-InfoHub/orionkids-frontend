import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ConstellationSection } from "@/components/sections/constellation-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#FFD600] selection:text-[#1E293B]">
      <AnnouncementBar />
      <Navbar />
       <HeroSection />
      <ConstellationSection />
      
    </main>
  );
}
