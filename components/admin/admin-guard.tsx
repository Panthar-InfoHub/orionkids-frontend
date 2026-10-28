"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { fetchCurrentUserProfile, type UserProfile } from "@/lib/api/auth";

interface AdminContextValue {
  admin: UserProfile;
  refreshAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within an AdminGuard");
  }
  return ctx;
}

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending: isSessionPending } = useSession();

  const [isVerifying, setIsVerifying] = useState(true);
  const [adminProfile, setAdminProfile] = useState<UserProfile | null>(null);
  const [deniedReason, setDeniedReason] = useState<string | null>(null);

  const verifyAdminAccess = async () => {
    // If Better Auth session check is still loading, wait
    if (isSessionPending) return;

    // 1. Not signed in at all
    if (!session?.user) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname || "/admin")}`;
      router.replace(redirectUrl);
      return;
    }

    try {
      // 2. Fetch authoritative profile from backend GET /api/me
      const profile = await fetchCurrentUserProfile();

      if (!profile) {
        // Session invalid or expired on backend
        router.replace(`/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
        return;
      }

      // 3. Handle restricted account
      if (profile.status === "RESTRICTED") {
        router.replace("/access-denied");
        return;
      }

      // 4. Handle pending account
      if (profile.status === "PENDING") {
        if (!profile.onboardingSubmittedAt) {
          router.replace("/onboarding");
        } else {
          router.replace("/pending-approval");
        }
        return;
      }

      // 5. Check admin role
      if (profile.role !== "ADMIN") {
        setDeniedReason(
          "Access to the OrionKids Administration Dashboard is restricted to active administrators only."
        );
        setIsVerifying(false);
        return;
      }

      // 6. Authorized active admin
      setAdminProfile(profile);
      setDeniedReason(null);
      setIsVerifying(false);
    } catch (err) {
      console.error("[AdminGuard] Verification failed:", err);
      router.replace(`/login?redirect=${encodeURIComponent(pathname || "/admin")}`);
    }
  };

  useEffect(() => {
    verifyAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isSessionPending, pathname]);

  // Loading state: clean, branded OrionKids loader
  if (isSessionPending || isVerifying) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-[#FFE066] selection:text-[#0A1D3D]">
        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center mb-5 animate-pulse">
          <Image
            src="/svg/Logo.svg"
            alt="OrionKids"
            width={48}
            height={24}
            className="w-10 h-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
          <Loader2 className="w-4 h-4 animate-spin text-[#00BCD4]" />
          <span>Verifying administrator credentials...</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Authenticating with OrionKids backend security services
        </p>
      </div>
    );
  }

  // Explicit access denied for non-admin authenticated users attempting to access /admin
  if (deniedReason || !adminProfile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
        <header className="w-full bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto h-[68px] px-4 sm:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center" aria-label="OrionKids Home">
              <Image
                src="/svg/Logo.svg"
                alt="OrionKids Logo"
                width={115}
                height={58}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0A1D3D] hover:text-[#00BCD4] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Site</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[480px] bg-white rounded-3xl p-8 sm:p-10 border-2 border-rose-200 shadow-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-black text-[11px] mb-3 uppercase tracking-wider border border-rose-200">
              <span>ADMINISTRATOR REQUIRED</span>
            </div>
            <h1 className="text-2xl font-black text-[#0A1D3D] tracking-tight mb-3">
              Access Restricted
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {deniedReason ||
                "Your account does not possess the administrative privileges required to view or manage the OrionKids Control Center."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full h-[46px] rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white font-bold text-sm transition-colors cursor-pointer shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </main>

        <footer className="w-full bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 font-medium">
          © 2026 OrionKids Digital Solutions Pvt. Ltd. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <AdminContext.Provider
      value={{
        admin: adminProfile,
        refreshAdmin: verifyAdminAccess,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
