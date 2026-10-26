"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function ReportHeader() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <header className="w-full bg-white border-b border-[#E2E8F0] sticky top-0 z-40 print:hidden shadow-xs">
      <div className="max-w-[1280px] w-full mx-auto px-2.5 sm:px-6 lg:px-8 h-[64px] sm:h-[76px] flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo + Fun Brain Lab Tag */}
        <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3.5 shrink-0">
          <Link href="/" className="flex items-center shrink-0" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={130}
              height={65}
              priority
              className="w-[96px] xs:w-[110px] sm:w-[130px] h-auto object-contain"
              style={{ height: "auto" }}
            />
          </Link>

          <span
            className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] text-[9px] xs:text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase select-none shrink-0"
            style={{ fontFamily: JAKARTA }}
          >
            <span>🚀</span>
            <span>
              <span className="hidden min-[400px]:inline">FUN </span>BRAIN LAB
            </span>
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            title={copied ? "Link Copied!" : "Share with Family"}
            aria-label="Share with Family"
            className="inline-flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#D8DFE8] bg-white text-[#0A1D3D] hover:bg-slate-50 active:scale-95 transition-all text-[11px] xs:text-xs sm:text-sm font-bold shadow-xs cursor-pointer select-none whitespace-nowrap"
            style={{ fontFamily: JAKARTA }}
          >
            <svg
              className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span>
              {copied ? (
                "Copied!"
              ) : (
                <>
                  <span>Share</span>
                  <span className="hidden md:inline"> with Family</span>
                </>
              )}
            </span>
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Download PDF"
            aria-label="Download PDF"
            className="inline-flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#D8DFE8] bg-white text-[#0A1D3D] hover:bg-slate-50 active:scale-95 transition-all text-[11px] xs:text-xs sm:text-sm font-bold shadow-xs cursor-pointer select-none whitespace-nowrap"
            style={{ fontFamily: JAKARTA }}
          >
            <svg
              className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>
              <span className="hidden md:inline">Download </span>PDF
            </span>
          </button>

          {/* Print Report Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print Report"
            aria-label="Print Report"
            className="inline-flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-[#0A1D3D] text-white hover:bg-[#132A54] active:scale-95 transition-all text-[11px] xs:text-xs sm:text-sm font-bold shadow-sm cursor-pointer select-none whitespace-nowrap"
            style={{ fontFamily: JAKARTA }}
          >
            <svg
              className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>
              <span>Print</span>
              <span className="hidden md:inline"> Report</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
