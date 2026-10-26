"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const lastScrollYRef = useRef(0);

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
        className={`w-full bg-white border-b border-slate-200 sticky top-0 z-40 transition-transform duration-300 ease-in-out will-change-transform ${isVisible ? "translate-y-0 shadow-sm" : "-translate-y-full pointer-events-none"
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

            {/* Tagline Pill — Show only on large desktop screens so middle screens have plenty of room */}
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

          {/* Desktop Nav Links — Generous spacing as original */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0"
            aria-label="Main Navigation"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
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

          {/* Action CTA — Contact Us Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-5 xl:px-6 h-[46px] xl:h-[50px] rounded-[14px] xl:rounded-[16px] bg-[#FFD54F] text-[#0A1D3D] font-[800] text-[14px] xl:text-[15px] border-[2.5px] border-[#0A1D3D] shadow-[3px_3px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1.5px_1.5px_0px_0px_#0A1D3D] flex items-center justify-center transition-all cursor-pointer select-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
            >
              Contact Us
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
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[15px] font-[700] py-1 transition-colors ${isActive ? "text-[#00BCD4]" : "text-[#0A1D3D] hover:text-[#00BCD4]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full h-[54px] rounded-[16px] bg-[#FFD54F] text-[#0A1D3D] font-[800] text-base border-[3px] border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer select-none mt-2"
              style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
            >
              Contact Us
            </button>
          </div>
        )}
      </header>


    </>
  );
}
