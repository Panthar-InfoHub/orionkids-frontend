"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  X,
  Printer,
  Download,
  Sparkles,
  CheckCircle,
  BookOpen,
  ArrowRight,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { PrintableItem } from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface PrintableModalProps {
  item: PrintableItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrintableModal({ item, isOpen, onClose }: PrintableModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock outer background scrolling while modal is open, and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item || !mounted) return null;

  const worksheetStaticPath = item.worksheetFile
    ? `/OrionKids_Worksheets/${item.worksheetFile}`
    : `/OrionKids_Worksheets/OrionKids_01_Join_the_Stars_Orion.pdf`;
  const downloadEndpoint = item.downloadUrl || `/api/printables/${item.slug}/pdf`;
  const filename = `OrionKids-${item.slug}-Worksheet.pdf`;

  // Resolves the authentic single-page worksheet PDF preview directly fitted to container
  const getPreviewUrl = () => {
    return `${worksheetStaticPath}#view=FitH&toolbar=0&navpanes=0`;
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(downloadEndpoint);
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (err) {
      console.error("PDF download error:", err);
      // Fallback direct navigation
      window.open(worksheetStaticPath, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Opens the authentic 1-page PDF directly in the browser's native PDF print preview viewer.
   */
  const handlePrintPreview = () => {
    const printUrl = `${worksheetStaticPath}#view=FitH`;
    window.open(printUrl, "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0A1D3D]/80 backdrop-blur-xs overscroll-contain animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[880px] bg-white rounded-[24px] sm:rounded-[28px] border-2 border-[#0A1D3D] shadow-[6px_6px_0px_0px_#0A1D3D] sm:shadow-[8px_8px_0px_0px_#0A1D3D] p-3 sm:p-4 overflow-hidden flex flex-col select-none overscroll-contain my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Top Header Row */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 shrink-0 gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] sm:text-[11px] font-black uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>{item.category}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
              {item.ageRange}
            </span>
            <h3 className={`text-sm sm:text-lg font-black text-[#0A1D3D] truncate ${JAKARTA}`}>
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrintPreview}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-600 hover:text-[#0A1D3D] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-colors cursor-pointer"
              title="Open in separate tab"
            >
              <span>Open in Tab</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A1D3D] flex items-center justify-center font-black transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Canvas: Maximized Interactive Live PDF Preview Directly On Screen */}
        <div className="relative flex-1 w-full bg-slate-100/80 rounded-2xl overflow-hidden border border-slate-200 my-2.5 flex flex-col justify-center items-center shadow-inner">
          <iframe
            key={item.slug}
            src={getPreviewUrl()}
            className="w-full h-full rounded-2xl bg-white border-0"
            title={`${item.title} Authentic Worksheet Preview`}
          />
        </div>

        {/* Compact Modal Bottom Footer Actions */}
        <div className="pt-2 border-t border-slate-100 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {item.blogSlug ? (
            <Link
              href={`/blog/${item.blogSlug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Educational Guide</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[11px] text-slate-400 font-medium">
              100% Free Vector PDF • Low-Ink High-Contrast
            </span>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Primary Download 1-Page PDF CTA */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex-1 sm:flex-none h-10 px-5 rounded-xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs sm:text-sm font-black text-[#0A1D3D] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75 ${JAKARTA}`}
            >
            
                <>
                  <Download className="w-4 h-4 stroke-[2.4]" />
                  <span>Download 1-Page PDF</span>
                </>
            
            </button>

            {/* Direct Print Button */}
            <button
              type="button"
              onClick={handlePrintPreview}
              title="Print worksheet directly"
              className="h-10 px-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-[#0A1D3D] text-[#0A1D3D] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Printer className="w-4 h-4 stroke-[2.2]" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
