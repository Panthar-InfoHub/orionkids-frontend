import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/auth/login-form";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | OrionKids",
  description: "Sign in with Google to explore OrionKids brain quests, games, and learning journey reports.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Accent top stripe */}
      <div className="w-full h-[6px] bg-[#00BCD4]" />

      {/* Header bar */}
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

          <Link
            href="/"
            className="text-xs sm:text-sm font-bold text-[#0A1D3D] hover:text-[#00BCD4] transition-colors py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <Suspense
          fallback={
            <div className="w-full max-w-[460px] mx-auto bg-white rounded-3xl p-10 border border-slate-200 flex flex-col items-center justify-center min-h-[340px]">
              <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin mb-3" />
              <p className="text-xs font-bold text-slate-400">Loading sign-in...</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#526176] font-medium">
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd. All rights reserved.</span>
          <span className="text-slate-400">
            Secure Google authentication powered by Better Auth.
          </span>
        </div>
      </footer>
    </div>
  );
}
