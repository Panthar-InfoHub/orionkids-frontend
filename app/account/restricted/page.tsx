"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, LogOut, Mail, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  fetchCurrentUserProfile,
  getRouteForUserProfile,
  performSignOut,
  type UserProfile,
} from "@/lib/api/auth";
import { CopyrightNotice } from "@/components/layout/copyright-notice";

export default function AccountRestrictedPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    async function verify() {
      try {
        const user = await fetchCurrentUserProfile();
        if (!user) {
          return;
        }
        // If account is actually active/pending/admin, route them away from restricted page
        if (user.status !== "RESTRICTED") {
          router.replace(getRouteForUserProfile(user));
          return;
        }
        setProfile(user);
      } catch (err) {
        console.warn("[restricted] Session check note:", err);
      }
    }
    verify();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Top accent bar */}
      <div className="w-full h-[6px] bg-[#E11D48]" />

      {/* Header */}
      <header className="w-full bg-white border-b border-[#E7EDF6] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto h-[76px] px-4 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={125}
              height={58}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={performSignOut}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[500px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-rose-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center transition-all animate-in fade-in duration-300">
          {/* Visual Alert Icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-[11px] mb-3 border border-rose-200">
            <span>ACCOUNT RESTRICTION</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-3">
            Account Access Restricted
          </h1>

          {/* Primary Description */}
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Your OrionKids account is currently restricted. You cannot access your games or dashboard at this time.
          </p>

          {/* Supporting Information */}
          <p className="text-xs sm:text-[13px] text-slate-500 mb-6 leading-relaxed">
            Please contact the OrionKids support team if you believe this restriction was applied incorrectly.
          </p>

          {/* Admin Recorded Reason (if available) */}
          {profile?.restrictedReason && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-rose-800 mb-1">
                Restriction Note
              </span>
              <p className="text-xs text-rose-700 font-medium leading-relaxed">
                {profile.restrictedReason}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:contact@orionkids.in?subject=Inquiry%20regarding%20restricted%20account"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0A1D3D] hover:bg-[#10345B] active:scale-[0.99] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </a>

            <button
              type="button"
              onClick={performSignOut}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Helpful Support Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need more help?</span>
            <Link
              href="/help-support"
              className="text-[#0A1D3D] font-bold hover:text-[#00BCD4] underline underline-offset-2 transition-colors"
            >
              Help &amp; Support Centre
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center text-xs text-[#526176] font-medium">
          <CopyrightNotice />
        </div>
      </footer>
    </div>
  );
}
