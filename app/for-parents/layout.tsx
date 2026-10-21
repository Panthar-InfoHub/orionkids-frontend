import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "For Parents | OrionKids — Understand How Your Child Thinks",
  description:
    "Say goodbye to ambiguous report cards and percentile anxiety. OrionKids turns 15-minute playful games into clear, loving insights and conversation starters for your kitchen table.",
};

export default function ForParentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#FFE066] selection:text-[#1E293B]">
      <Navbar />
      {children}
    </main>
  );
}
