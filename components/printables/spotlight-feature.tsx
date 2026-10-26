"use client";

import React from "react";
import { Printer, Download } from "lucide-react";
import { PrintableItem } from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface SpotlightFeatureProps {
  item: PrintableItem;
  onPrint?: (item: PrintableItem) => void;
}

export function SpotlightFeature({ item, onPrint }: SpotlightFeatureProps) {
  return (
    <section className="w-full mt-7 sm:mt-9">
      {/* Outer Card with Soft Lavender / Blue Tint matching reference */}
      <div className="relative w-full rounded-[24px] sm:rounded-[30px] bg-gradient-to-br from-[#EFF6FF] via-[#F5F8FF] to-[#FAF5FF] border border-[#D8E7FA] shadow-[0_12px_45px_-12px_rgba(10,29,61,0.06)] p-5 sm:p-7 lg:p-8 overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ============ LEFT: Authentic Worksheet Mockup with Floating Print Box ============ */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[360px] aspect-[1/1.24] bg-white rounded-2xl shadow-xl shadow-slate-300/50 border border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between">

              {/* Sheet Header */}
              <div className="flex items-center justify-between border-b border-slate-900/80 pb-1.5">
                <span className="text-[9px] sm:text-[10px] font-black text-slate-800 tracking-wider font-mono">
                  CROSSWORD PUZZLE #04
                </span>
                <span className="text-xs font-black text-[#2563EB] tracking-tight">
                  Orion Kids
                </span>
              </div>

              {/* Title & Prompt */}
              <div className="my-1.5">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                  HALLOWEEN COSMIC EXPLORER
                </h4>
                <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
                  Test your vocabulary and scientific deductions! Fill the squares using clues.
                </p>
                <div className="w-full h-[1px] bg-slate-900 mt-1.5"></div>
              </div>

              {/* Clues Columns */}
              <div className="grid grid-cols-2 gap-3 text-[8px] sm:text-[9px] text-slate-600 leading-tight">
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider block mb-0.5">
                    DOWN
                  </span>
                  <div className="space-y-0.5 text-slate-500">
                    <p>The month Halloween takes place.</p>
                    <p>A witch brews cosmic...</p>
                    <p>An orange star or ve...</p>
                    <p>Nocturnal winged m...</p>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider block mb-0.5">
                    ACROSS
                  </span>
                  <div className="space-y-0.5 text-slate-500">
                    <p>Creature under full lunar illumination.</p>
                    <p>...en collecting orbital</p>
                    <p>...tial broom propulsion.</p>
                    <p>...reater signal.</p>
                  </div>
                </div>
              </div>

              {/* Crossword Grid Matrix Preview */}
              <div className="relative w-full h-20 bg-slate-50/80 border border-slate-200/90 rounded-lg flex items-center justify-center p-1.5 my-1">
                <div className="grid grid-cols-8 gap-0.5 w-36">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 border border-slate-300 rounded-2xs flex items-center justify-center text-[6px] font-mono ${i % 5 === 0 ? "bg-slate-300/70" : "bg-white"
                        }`}
                    >
                      {i === 0 ? "1" : i === 7 ? "2" : ""}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Centered "PRINT NOW" Overlay Box matching image 4 */}
              <div className="absolute inset-0 m-auto w-36 h-32 bg-white rounded-xl shadow-[0_10px_30px_rgba(2,132,199,0.2)] border-2 border-[#00BCD4] p-2 flex flex-col items-center justify-center text-center z-20 cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => onPrint?.(item)}
              >
                {/* Cyan Square with White Printer */}
                <div className="w-9 h-9 rounded-lg bg-[#00BCD4] flex items-center justify-center text-white mb-1.5 shadow-2xs">
                  <Printer className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs font-black text-[#FF9E0B] tracking-tight">
                  PRINT NOW
                </span>
                <span className="text-[9px] font-semibold text-slate-500 mt-0.5">
                  1-Click Fast Spool
                </span>
              </div>

              {/* Bottom Form Fields */}
              <div className="flex items-center justify-between text-[8px] text-slate-400 border-t border-slate-200 pt-1.5 font-mono">
                <span>Name: __________</span>
                <span>Date: __________</span>
                <span>Score: ____ / 10</span>
              </div>

            </div>
          </div>

          {/* ============ RIGHT: Details & Targeting matching image 4 ============ */}
          <div className="lg:col-span-6 flex flex-col items-start order-1 lg:order-2">

            {/* Badges: GRADE 2 - 6+ & 15-Minute Puzzle */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#059669] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                GRADE 2 – 6+
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-[10px] sm:text-[11px] font-bold">
                15-Minute Puzzle
              </span>
            </div>

            {/* Title */}
            <h3
              className={`text-[20px] sm:text-[26px] lg:text-[30px] font-black text-[#0A1D3D] leading-tight tracking-tight mb-2 ${JAKARTA}`}
            >
              Halloween &amp; Cosmic<br />
              Crossword Challenge
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed font-normal mb-3.5">
              Encourages vocabulary retention, contextual deductive logic, and spelling recognition.
              Comes with both student worksheet and teacher answer key with extension discussion prompts.
            </p>

            {/* TARGETED COGNITIVE SKILLS */}
            <div className="w-full mb-3.5">
              <span className="block text-[9px] font-black uppercase tracking-widest text-[#475569] mb-1.5">
                TARGETED COGNITIVE SKILLS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F1F5F9]/80 text-[11px] font-bold text-[#1E293B]">
                  <span>✍️</span>
                  <span>Spelling Recall</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FEF3C7]/60 text-[11px] font-bold text-[#1E293B]">
                  <span>💡</span>
                  <span>Deductive Logic</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#EEF2FF] text-[11px] font-bold text-[#1E293B]">
                  <span>👁️</span>
                  <span>Visual Discrimination</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#ECFDF5] text-[11px] font-bold text-[#1E293B]">
                  <span>✅</span>
                  <span>Working Memory</span>
                </div>
              </div>
            </div>

            {/* PRINT & DOWNLOAD PREFERENCES */}
            <div className="w-full flex flex-col sm:flex-row gap-2.5">
              {/* Primary Download 2-Page PDF CTA */}
              <a
                href={item.downloadUrl || `/api/printables/${item.slug}/pdf`}
                download={`OrionKids-${item.slug}-Worksheet.pdf`}
                className={`flex-1 h-11 px-5 rounded-xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs sm:text-sm font-black text-[#0A1D3D] transition-all cursor-pointer flex items-center justify-center gap-2 ${JAKARTA}`}
                title="Download 2-Page Companion Guide + Worksheet"
              >
                <Download className="w-4 h-4 text-[#0A1D3D] stroke-[2.2]" />
                <span>Download 2-Page PDF</span>
              </a>

              {/* Secondary Print Preview Button */}
              <button
                type="button"
                onClick={() => onPrint?.(item)}
                className={`h-11 px-5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs sm:text-sm font-bold text-[#0A1D3D] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${JAKARTA}`}
              >
                <Printer className="w-4 h-4 text-[#0A1D3D] stroke-[2]" />
                <span>Quick Preview</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
