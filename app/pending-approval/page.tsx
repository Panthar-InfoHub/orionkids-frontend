"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clock, RefreshCw, LogOut, ShieldAlert } from "lucide-react";
import { fetchCurrentUserProfile, performSignOut, type UserProfile } from "@/lib/api/auth";

export default function PendingApprovalPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const checkStatus = async () => {
    setIsRefreshing(true);
    setMessage("");
    try {
      const user = await fetchCurrentUserProfile();
      if (!user) {
        router.replace("/login");
        return;
      }
      setProfile(user);
      if (user.status === "ACTIVE") {
        router.replace("/onboarding");
      } else if (user.status === "RESTRICTED") {
        router.replace("/access-denied");
      } else {
        setMessage("Account is still under review. Thank you for your patience!");
      }
    } catch {
      setMessage("Could not check status at this time. Please try again shortly.");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <div className="w-full h-[6px] bg-[#FFD54F]" />

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
        <div className="w-full max-w-[500px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-[11px] mb-3 border border-amber-200">
            <span>PENDING REVIEW</span>
          </div>

          <h1 className="text-2xl sm:text-[28px] font-black text-[#0A1D3D] tracking-tight mb-3">
            Account Under Review
          </h1>

          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Welcome{profile?.name ? `, ${profile.name}` : ""}! To protect child privacy and ensure a safe community, new OrionKids accounts undergo educator and admin review before feature access is enabled.
          </p>

          {profile?.email && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 mb-6">
              Signed in as: <span className="text-[#0A1D3D] font-bold">{profile.email}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              {message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={checkStatus}
              disabled={isRefreshing}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#00BCD4] hover:bg-[#00acc1] active:scale-[0.99] text-white font-extrabold text-sm shadow-[0_4px_14px_rgba(0,188,212,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Checking..." : "Check Status"}</span>
            </button>

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
          © 2026 OrionKids Digital Solutions Pvt. Ltd. If you need urgent assistance, contact support@orionkids.com
        </div>
      </footer>
    </div>
  );
}
