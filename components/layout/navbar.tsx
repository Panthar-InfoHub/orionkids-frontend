"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { fetchCurrentUserProfile } from "@/lib/api/auth";

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authoritative admin detection: requires valid Better Auth session + backend role === "ADMIN" + status === "ACTIVE"
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function verifyAdminStatus() {
      if (!session?.user) {
        setIsAdmin(false);
        return;
      }

      try {
        const profile = await fetchCurrentUserProfile();
        if (!isCancelled) {
          if (profile?.role === "ADMIN" && profile?.status === "ACTIVE") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      } catch {
        if (!isCancelled) {
          setIsAdmin(false);
        }
      }
    }

    verifyAdminStatus();

    return () => {
      isCancelled = true;
    };
  }, [session]);

  const navLinks = [
    ...SITE_CONFIG.navLinks,
    ...(isAdmin ? [{ label: "Dashboard", href: "/admin" }] : []),
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      // Keep navbar visible if mobile drawer is open
      if (mobileMenuOpen) {
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
  }, [mobileMenuOpen]);

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
                  className={`text-[14px] font-[700] leading-none tracking-normal transition-colors relative py-1 whitespace-nowrap hover:text-[#00BCD4] ${
                    isActive
                      ? "text-[#00BCD4] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#00BCD4] after:rounded-full"
                      : "text-[#0A1D3D]"
                  }`}
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    lineHeight: "100%",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="px-5 xl:px-6 h-[42px] rounded-[14px] bg-[#FFD028] hover:bg-[#FFC524] text-[#0A1D3D] font-[800] text-[13px] xl:text-[14px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center whitespace-nowrap cursor-pointer select-none"
              style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
            >
              <span>Contact Us</span>
            </button>
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
                  className={`text-[15px] font-[700] py-1 transition-colors ${
                    isActive ? "text-[#00BCD4]" : "text-[#0A1D3D] hover:text-[#00BCD4]"
                  }`}
                >
                  {link.label}
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
