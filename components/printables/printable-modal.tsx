"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Printer,
  Download,
  Sparkles,
  CheckCircle,
  FileText,
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !item) return null;

  const worksheetStaticPath = item.worksheetFile
    ? `/OrionKids_Worksheets/${item.worksheetFile}`
    : `/OrionKids_Worksheets/OrionKids_01_Join_the_Stars_Orion.pdf`;
  const downloadEndpoint = item.downloadUrl || `/api/printables/${item.slug}/pdf`;
  const filename = `OrionKids-${item.slug}-Worksheet.pdf`;

  // Resolves the exact authentic 1-page worksheet PDF preview directly
  const getPreviewUrl = () => {
    return `${worksheetStaticPath}#toolbar=0&navpanes=0`;
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A1D3D]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[880px] bg-white rounded-[28px] border-2 border-[#0A1D3D] shadow-[8px_8px_0px_0px_#0A1D3D] p-4 sm:p-6 overflow-hidden flex flex-col select-none">

        {/* Top Header Row */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{item.category}</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {item.ageRange}
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                {item.worksheetFile || "OrionKids A4"}
              </span>
            </div>

            <h3 className={`text-base sm:text-xl font-black text-[#0A1D3D] leading-tight line-clamp-1 ${JAKARTA}`}>
              {item.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A1D3D] flex items-center justify-center font-black transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Header & Fullscreen Action */}
        <div className="flex items-center justify-between py-2.5 shrink-0 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-[#0A1D3D] bg-slate-100 rounded-xl">
              <FileText className="w-3.5 h-3.5 text-[#059669]" />
              <span>Authentic Worksheet Preview (1-Page)</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handlePrintPreview}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-[#0A1D3D] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Open in native PDF viewer for printing and zooming"
          >
            <span>Open PDF in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Canvas: Interactive Live PDF Preview Frame */}
        <div className="relative flex-1 w-full bg-slate-100/90 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner flex flex-col justify-center items-center">
          <iframe
            key={item.slug}
            src={getPreviewUrl()}
            className="w-full h-full rounded-2xl bg-white border-0"
            title={`${item.title} Real PDF Document Preview`}
          />
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="pt-3 border-t border-slate-100 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          {item.blogSlug ? (
            <Link
              href={`/blog/${item.blogSlug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#0284C7] hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Full Educational Article</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[11px] text-slate-400 font-medium">
              100% Free Vector PDF • Low-Ink High-Contrast
            </span>
          )}

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Primary Download 1-Page PDF CTA */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex-1 sm:flex-none h-11 px-5 rounded-2xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs sm:text-sm font-black text-[#0A1D3D] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75 ${JAKARTA}`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : downloaded ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-800" />
                  <span>Downloaded! Get Again</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2.4]" />
                  <span>Download 1-Page PDF</span>
                </>
              )}
            </button>

            {/* Print Preview Button (Opens Native PDF Viewer for Clean Printing) */}
            <button
              type="button"
              onClick={handlePrintPreview}
              title="Open authentic PDF in print preview viewer"
              className="h-11 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#0A1D3D] text-[#0A1D3D] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Printer className="w-4 h-4 stroke-[2.2]" />
              <span>Print Preview</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
