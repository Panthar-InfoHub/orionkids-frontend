"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  Users,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { fetchCurrentUserProfile, performSignOut, type UserProfile } from "@/lib/api/auth";

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Authoritative admin detection: requires valid Better Auth session + backend role === "ADMIN" + status === "ACTIVE"
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<UserProfile | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdminDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setAdminDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Robust admin verification
  useEffect(() => {
    let isCancelled = false;

    async function verifyAdminStatus() {
      try {
        const profile = await fetchCurrentUserProfile();
        if (!isCancelled) {
          if (profile?.role === "ADMIN" && profile?.status === "ACTIVE") {
            setIsAdmin(true);
            setAdminUser(profile);
          } else {
            setIsAdmin(false);
            setAdminUser(null);
          }
        }
      } catch {
        if (!isCancelled) {
          setIsAdmin(false);
          setAdminUser(null);
        }
      }
    }

    verifyAdminStatus();

    return () => {
      isCancelled = true;
    };
  }, [session]);

  const navLinks = [
    ...SITE_CONFIG.navLinks.map((l) => ({ ...l, isAdmin: false })),
    ...(isAdmin ? [{ label: "Dashboard", href: "/admin", isAdmin: true }] : []),
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible if mobile drawer or admin dropdown is open
      if (mobileMenuOpen || adminDropdownOpen) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Always show navbar near top of the page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      if (diff > 8) {
        setIsVisible(false);
      } else if (diff < -8) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen, adminDropdownOpen]);

  return (
    <>
      <header
        className={`w-full bg-white border-b border-slate-200 sticky top-0 z-40 transition-transform duration-300 ease-in-out will-change-transform ${
          isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[31px] h-[68px] flex items-center justify-between">
          {/* Brand Logo & Pill Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="OrionKids Home"
            >
              <Image
                src="/svg/Logo.svg"
                alt="OrionKids Logo"
                width={115}
                height={61}
                priority
                className="w-[96px] sm:w-[110px] xl:w-[115px] h-auto object-contain shrink-0"
                style={{ width: "auto", height: "auto" }}
              />
            </Link>

            {/* Tagline Pill */}
            <div
              className="hidden xl:inline-flex items-center gap-1 px-[9px] py-[3px] h-[19px] rounded-full bg-[#D8F3FF] text-[#0A1D3D] border-[1.5px] border-[#0A1D3D] whitespace-nowrap shrink-0"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span className="text-[10px] leading-none">🚀</span>
              <span className="text-[9px] font-[800] tracking-[0.2px] uppercase leading-none text-[#0A1D3D]">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0"
            aria-label="Main Navigation"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[14px] font-[700] leading-none tracking-normal transition-colors relative py-1 whitespace-nowrap flex items-center gap-1.5 hover:text-[#00BCD4] ${
                    isActive
                      ? "text-[#00BCD4] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#00BCD4] after:rounded-full"
                      : "text-[#0A1D3D]"
                  }`}
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    lineHeight: "100%",
                  }}
                >
                  {link.isAdmin && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAdmin ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setAdminDropdownOpen((prev) => !prev)}
                  className="px-4 xl:px-5 h-[42px] rounded-[14px] bg-[#0A1D3D] hover:bg-[#122b54] text-white font-[800] text-[13px] xl:text-[14px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#FFE066] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer select-none"
                  style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                  aria-expanded={adminDropdownOpen}
                  title="Admin Dashboard Options"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#00BCD4]" />
                  <span>Dashboard</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                      adminDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Admin Dashboard Options Dropdown */}
                {adminDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Admin User Header */}
                    <div className="px-4 pb-3 border-b border-slate-100 flex items-center gap-3">
                      {adminUser?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={adminUser.image}
                          alt={adminUser.name || "Admin"}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#00BCD4] shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#0A1D3D] text-white flex items-center justify-center font-black text-xs border border-[#0A1D3D] shrink-0">
                          {adminUser?.name
                            ? adminUser.name.slice(0, 2).toUpperCase()
                            : "AD"}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-xs text-[#0A1D3D] truncate block">
                            {adminUser?.name || "Administrator"}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[9px] font-black uppercase shrink-0">
                            ADMIN
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium truncate block">
                          {adminUser?.email || ""}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Section Options */}
                    <div className="py-2 px-1.5 space-y-0.5">
                      <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Dashboard Operations
                      </div>

                      <Link
                        href="/admin"
                        onClick={() => setAdminDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E0F7FA] text-[#00838F] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#00BCD4] group-hover:text-white transition-colors">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-black text-[#0A1D3D] group-hover:text-[#00BCD4] transition-colors">
                            Admin Overview
                          </span>
                          <span className="block text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                            Live metrics, registrations & activity
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setAdminDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FFF9C4] text-[#F57F17] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#FFD028] group-hover:text-[#0A1D3D] transition-colors">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-black text-[#0A1D3D] group-hover:text-[#00BCD4] transition-colors">
                            User Management
                          </span>
                          <span className="block text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                            Approve, review & restrict user accounts
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setAdminDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#4CAF50] group-hover:text-white transition-colors">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-black text-[#0A1D3D] group-hover:text-[#00BCD4] transition-colors">
                            Control Center
                          </span>
                          <span className="block text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                            Full administrative dashboard & controls
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Sign Out Action */}
                    <div className="pt-2 px-1.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={async () => {
                          setAdminDropdownOpen(false);
                          await performSignOut();
                        }}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Sign Out of Admin</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="px-5 xl:px-6 h-[42px] rounded-[14px] bg-[#FFD028] hover:bg-[#FFC524] text-[#0A1D3D] font-[800] text-[13px] xl:text-[14px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center whitespace-nowrap cursor-pointer select-none"
                style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Contact Us</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A1D3D] hover:bg-[#E0F2FE] rounded-xl transition-colors shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-white border-b-2 border-[#0A1D3D] px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {/* If Admin, show Admin Dashboard Card */}
            {isAdmin && (
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] mb-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#0A1D3D] text-white flex items-center justify-center font-black text-xs shrink-0">
                    {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : "AD"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-xs text-[#0A1D3D] truncate block">
                        {adminUser?.name || "Administrator"}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[9px] font-black uppercase shrink-0">
                        ADMIN
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium truncate block">
                      {adminUser?.email || ""}
                    </span>
                  </div>
                </div>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full h-[40px] rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white font-[800] text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#00BCD4]" />
                  <span>Go to Admin Dashboard</span>
                </Link>

                <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-bold">Admin Operations</span>
                  <button
                    type="button"
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await performSignOut();
                    }}
                    className="text-rose-600 font-bold hover:underline cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[15px] font-[700] py-1 transition-colors flex items-center justify-between ${
                    isActive ? "text-[#00BCD4]" : "text-[#0A1D3D] hover:text-[#00BCD4]"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.isAdmin && (
                    <span className="px-2 py-0.5 rounded-md bg-[#00BCD4]/10 text-[#00838F] text-[10px] font-black uppercase">
                      Admin Access
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-[46px] rounded-[14px] bg-[#FFD028] hover:bg-[#FFC524] text-[#0A1D3D] font-[800] text-sm border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] flex items-center justify-center cursor-pointer select-none"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

