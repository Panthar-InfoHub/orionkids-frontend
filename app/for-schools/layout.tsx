import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "For Schools | OrionKids — Every Child is a Constellation of Potential",
  description:
    "See how children learn through play. OrionKids helps educators notice strategies and plan everyday classroom support. Educational insights, not diagnosis or medical screening.",
};

export default function ForSchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#FFE066] selection:text-[#1E293B]">
      <AnnouncementBar />
      <Navbar />
      {children}
    </main>
  );
}
