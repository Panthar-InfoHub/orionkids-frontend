import React, { Suspense } from "react";
import type { Metadata } from "next";
import { User360DetailView } from "@/components/admin/user-detail/user-360-detail-view";

export const instant = false;

export const metadata: Metadata = {
  title: "User 360° Profile | OrionKids Admin",
  description:
    "Authoritative explorer governance, child accounts, quest telemetry, and cognitive reports.",
  robots: {
    index: false,
    follow: false,
  },
};

interface UserDetailPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { userId } = await params;

  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-6 w-48 bg-slate-200 rounded-md" />
          <div className="h-44 w-full bg-white rounded-3xl border border-slate-200" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-white rounded-2xl border border-slate-200"
              />
            ))}
          </div>
        </div>
      }
    >
      <User360DetailView userId={userId} />
    </Suspense>
  );
}
