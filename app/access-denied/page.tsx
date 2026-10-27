"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, LogOut, Mail } from "lucide-react";
import { fetchCurrentUserProfile, performSignOut, type UserProfile } from "@/lib/api/auth";

export default function AccessDeniedPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function load() {
      const user = await fetchCurrentUserProfile();
      if (user) {
        setProfile(user);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <div className="w-full h-[6px] bg-[#E11D48]" />

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
            onClick={performSignOut}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[480px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-rose-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-bold text-[11px] mb-3 border border-rose-200">
            <span>ACCESS RESTRICTED</span>
          </div>

          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-3">
            Account Access Restricted
          </h1>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Your account has been restricted by platform administrators. Active sessions are disabled to safeguard OrionKids community standards.
          </p>

          {profile?.restrictedReason && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-rose-800 mb-1">
                Reason recorded
              </span>
              <p className="text-xs text-rose-700 font-medium leading-relaxed">
                {profile.restrictedReason}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@orionkids.com?subject=Inquiry%20regarding%20restricted%20account"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0A1D3D] hover:bg-[#10345B] active:scale-[0.99] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </a>

            <button
              onClick={performSignOut}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center text-xs text-[#526176] font-medium">
          © 2026 OrionKids Digital Solutions Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
}
