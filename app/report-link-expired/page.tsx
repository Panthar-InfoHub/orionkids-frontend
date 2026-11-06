import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report Link Unavailable | OrionKids",
  description: "This OrionKids report link is no longer active.",
  robots: { index: false, follow: false },
};

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

type Reason = "expired" | "revoked" | "invalid" | "unavailable";

const MESSAGES: Record<Reason, { title: string; body: string }> = {
  expired: {
    title: "This report link has expired",
    body: "For your child's privacy, report links only stay active for a limited time. Please contact your child's school to receive a new link.",
  },
  revoked: {
    title: "This report link is no longer active",
    body: "A newer link has been sent, or this link was cancelled. Please use the most recent OrionKids email, or contact your child's school for a new link.",
  },
  invalid: {
    title: "This report link is not valid",
    body: "The link may be incomplete or mistyped. Please open it directly from the OrionKids email, or contact your child's school for a new link.",
  },
  unavailable: {
    title: "The report is temporarily unavailable",
    body: "We could not open the report right now. Please try the link again in a few minutes. If the problem continues, contact your child's school.",
  },
};

interface PageProps {
  searchParams?: Promise<{ reason?: string }>;
}

async function LinkMessage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const reason: Reason =
    params.reason && params.reason in MESSAGES ? (params.reason as Reason) : "invalid";
  const message = MESSAGES[reason];

  return (
    <>
      <h1
        className="text-xl sm:text-2xl font-black text-[#0A1D3D]"
        style={{ fontFamily: JAKARTA }}
      >
        {message.title}
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">{message.body}</p>
    </>
  );
}

export default function ReportLinkExpiredPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F6FA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#0A1D3D] p-8 text-center space-y-4">
        <div
          className="w-14 h-14 mx-auto rounded-2xl bg-[#FFE066] border-2 border-[#0A1D3D] flex items-center justify-center text-2xl"
          aria-hidden="true"
        >
          🔒
        </div>

        <Suspense
          fallback={
            <div className="space-y-3" aria-busy="true">
              <div className="h-6 w-3/4 mx-auto rounded-lg bg-slate-100" />
              <div className="h-12 w-full rounded-lg bg-slate-100" />
            </div>
          }
        >
          <LinkMessage searchParams={searchParams} />
        </Suspense>

        <p className="text-xs text-slate-400">
          OrionKids reports are an educational summary of gameplay and are not a clinical assessment.
        </p>

        <Link
          href="/"
          className="inline-flex h-11 px-6 rounded-xl bg-[#0A1D3D] text-white font-black text-xs items-center justify-center hover:bg-[#122b54] transition-colors"
          style={{ fontFamily: JAKARTA }}
        >
          Go to OrionKids
        </Link>
      </div>
    </div>
  );
}
