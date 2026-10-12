"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
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

      // Neeche scroll karne par -> Hide Navbar
      if (diff > 8) {
        setIsVisible(false);
      }
      // Upar scroll karne par -> Show Navbar
      else if (diff < -8) {
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
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link href="/" className="flex items-center shrink-0" aria-label="OrionKids Home">
              <Image
                src="/svg/Logo.svg"
                alt="OrionKids Logo"
                width={115}
                height={61}
                priority
                className="w-[115px] h-[61px] object-contain shrink-0"
              />
            </Link>
            
            <div
              className="hidden sm:inline-flex items-center gap-1 px-[8px] py-[3px] h-[17px] rounded-full bg-[#D8F3FF] text-[#0A1D3D] border-[2px] border-[#0A1D3D] whitespace-nowrap shrink-0"
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
            className="hidden lg:flex items-center justify-between w-[544px] h-[20px] shrink-0"
            aria-label="Main Navigation"
            style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
          >
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-[700] text-[#0A1D3D] leading-none tracking-normal hover:text-[#00BCD4] transition-colors relative py-0.5 whitespace-nowrap hover:after:content-[''] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#00BCD4] hover:after:rounded-full"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#0A1D3D",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA — Contact Us Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={() => setContactModalOpen(true)}
              className="w-[201px] h-[54px] rounded-[16px] bg-[#65DCAA] text-[#0A1D3D] font-[800] text-base border-[3px] border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center transition-all cursor-pointer select-none whitespace-nowrap"
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
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-[700] text-[#0A1D3D] py-1 hover:text-[#00BCD4]"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full h-[54px] rounded-[16px] bg-[#65DCAA] text-[#0A1D3D] font-[800] text-base border-[3px] border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer select-none mt-2"
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
