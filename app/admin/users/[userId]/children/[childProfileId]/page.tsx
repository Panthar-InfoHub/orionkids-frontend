import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ChildDetailView } from "@/components/admin/user-detail/child-detail-view";

export const instant = false;

export const metadata: Metadata = {
  title: "Child Profile & Quest Sessions | OrionKids Admin",
  description:
    "Authoritative child profile governance, isolated quest sessions, 6-game progression, and telemetry.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ChildDetailPageProps {
  params: Promise<{
    userId: string;
    childProfileId: string;
  }>;
}

export default async function ChildDetailPage({
  params,
}: ChildDetailPageProps) {
  const { userId, childProfileId } = await params;

  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-6 w-64 bg-slate-200 rounded-md" />
          <div className="h-44 w-full bg-white rounded-3xl border border-slate-200" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
      <ChildDetailView userId={userId} childProfileId={childProfileId} />
    </Suspense>
  );
}
