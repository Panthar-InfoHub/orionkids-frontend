"use client";

import React, { useState } from "react";
import { X, Printer, Download, Sparkles, CheckCircle, FileText, Share2 } from "lucide-react";
import { PrintableItem } from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface PrintableModalProps {
  item: PrintableItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PrintableModal({ item, isOpen, onClose }: PrintableModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !item) return null;

  const handlePrint = () => {
    setDownloaded(true);
    // Open print preview in browser
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1D3D]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl border-2 border-[#0A1D3D] shadow-[6px_6px_0px_0px_#0A1D3D] p-5 sm:p-6 overflow-hidden select-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A1D3D] flex items-center justify-center font-black transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2">
            <span>✨</span>
            <span>{item.category}</span>
          </div>

          <h3 className={`text-lg sm:text-xl font-black text-[#0A1D3D] mb-1.5 leading-tight ${JAKARTA}`}>
            {item.title}
          </h3>

          <p className="text-xs text-[#526176] max-w-sm mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Sheet Specs */}
          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-left space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Target Grade:</span>
              <span className="font-black text-[#0A1D3D]">{item.ageRange}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Pages:</span>
              <span className="font-black text-[#0A1D3D]">{item.pages} Pages (Includes Answer Key)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">File Format:</span>
              <span className="font-black text-[#0A1D3D]">Vector PDF ({item.fileSize})</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Ink Level:</span>
              <span className="font-black text-emerald-700 flex items-center gap-1">
                <span>🌱</span>
                <span>Low-Ink High-Contrast</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full">
            <button
              onClick={handlePrint}
              className={`flex-1 h-10 rounded-xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs font-black text-[#0A1D3D] flex items-center justify-center gap-1.5 cursor-pointer transition-all ${JAKARTA}`}
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>{downloaded ? "Print Again" : "Print PDF"}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1D3D] font-bold text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>

          {downloaded && (
            <p className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1 animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Document sent to printer! Happy learning!</span>
            </p>
          )}

        </div>

      </div>
    </div>
  );
}
