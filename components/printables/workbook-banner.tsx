"use client";

import React, { useState } from "react";
import { Download, Mail, CheckCircle, Loader2 } from "lucide-react";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface WorkbookBannerProps {
  onRequestCustomSheet?: () => void;
}

export function WorkbookBanner({ onRequestCustomSheet }: WorkbookBannerProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadAll = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section className="w-full mt-7 sm:mt-9">
      <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#0E2A66] border-2 border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] p-5 sm:p-7 lg:p-8 text-white overflow-hidden">
        
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-500/10 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-cyan-500/10 pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left copy */}
          <div className="max-w-2xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-cyan-200 border border-white/20 text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-2">
              <span>📦</span>
              <span>ALL-IN-ONE EDUCATOR &amp; PARENT PACK</span>
            </div>

            {/* Title */}
            <h3
              className={`text-lg sm:text-2xl lg:text-[26px] font-black text-white leading-tight tracking-tight mb-2 ${JAKARTA}`}
            >
              Download the Complete 50–Page<br />
              Term 1 Workbook
            </h3>

            {/* Subtitle */}
            <p className="text-xs text-blue-100/80 leading-relaxed font-normal max-w-lg">
              Need everything in one place? Get the complete semester PDF pack organized by grade level,
              complete with answer keys and teacher guidance notes.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
            {/* Yellow Download All Button */}
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadAll}
              className={`h-10 px-5 rounded-xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs font-black text-[#0A1D3D] transition-all cursor-pointer flex items-center justify-center gap-2 select-none ${JAKARTA}`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0A1D3D]" />
                  <span>Preparing 50-Page Zip...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Downloaded (.Zip)!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#0A1D3D] stroke-[2.4]" />
                  <span>Download All (.Zip)</span>
                </>
              )}
            </button>

            {/* Secondary Request Button */}
            <button
              type="button"
              onClick={onRequestCustomSheet}
              className={`h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 select-none ${JAKARTA}`}
            >
              <Mail className="w-3.5 h-3.5 text-cyan-200" />
              <span>Request Custom Sheet</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
