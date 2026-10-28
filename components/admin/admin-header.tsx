"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, ExternalLink, ShieldCheck } from "lucide-react";
import { useAdmin } from "./admin-guard";
import { performSignOut } from "@/lib/api/auth";

export function AdminHeader() {
  const { admin } = useAdmin();

  const handleSignOut = async () => {
    await performSignOut();
  };

  const initials = admin.name
    ? admin.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between gap-4">
        {/* Left: Brand Logo + Admin Control Center Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={115}
              height={58}
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DAF5E9] border border-[#0A1D3D] text-[#0A1D3D] text-[11px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            <span>Admin Control Center</span>
          </div>
        </div>

        {/* Right: Admin Profile, Public Site Link, Sign Out */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Back to Public Site link */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-[#00BCD4] hover:bg-slate-50 transition-colors cursor-pointer"
            title="Browse Public Website"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Admin Profile Info */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-slate-200">
            {admin.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={admin.image}
                alt={admin.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-[#00BCD4] shadow-xs"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0A1D3D] text-white flex items-center justify-center font-black text-xs border border-[#0A1D3D] shadow-xs">
                {initials}
              </div>
            )}

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[#0A1D3D] line-clamp-1 max-w-[140px]">
                  {admin.name}
                </span>
                <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[9px] font-black uppercase tracking-tight">
                  ADMIN
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium line-clamp-1 max-w-[140px]">
                {admin.email}
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Sign out of Admin Session"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
