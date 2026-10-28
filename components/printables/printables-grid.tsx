"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { PrintableItem } from "@/types/printables";
import { PrintableCard } from "./printable-card";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";
const INITIAL_COUNT = 8;

interface PrintablesGridProps {
  items: PrintableItem[];
  totalCount: number;
  onDownloadItem?: (item: PrintableItem) => void;
}

export function PrintablesGrid({
  items,
  totalCount,
  onDownloadItem,
}: PrintablesGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, INITIAL_COUNT);
  const canToggle = items.length > INITIAL_COUNT;

  return (
    <section id="all-activity-sheets" className="w-full mt-7 sm:mt-9 scroll-mt-24">
      {/* Section Header matching Figma screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
        <div>
          {/* COMPLETE ARCHIVE Pill */}
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0D9488] mb-1">
            <span>📁</span>
            <span>COMPLETE ARCHIVE</span>
          </div>

          {/* Heading */}
          <h2 className={`text-xl sm:text-2xl font-black text-[#0A1D3D] ${JAKARTA}`}>
            All Activity Sheets &amp; Mats
          </h2>
        </div>

        <span className="text-xs font-semibold text-[#64748B]">
          Showing {visibleItems.length} of {totalCount || items.length} printable worksheets
        </span>
      </div>

      {/* Grid of Printable Cards */}
      {visibleItems.length === 0 ? (
        <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-bold text-slate-700">No printables match your filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the search query or grade selector above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {visibleItems.map((item) => (
            <PrintableCard
              key={item.id}
              item={item}
              onDownload={onDownloadItem}
            />
          ))}
        </div>
      )}

      {/* View All / Show Less Toggle Button */}
      {canToggle && (
        <div className="w-full flex justify-center mt-7">
          {!showAll ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className={`px-7 py-3 rounded-full bg-[#0A1D3D] hover:bg-[#142A52] text-white border-2 border-[#0A1D3D] shadow-[3px_3px_0px_0px_#FFC72C] hover:shadow-[5px_5px_0px_0px_#FFC72C] text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none select-none ${JAKARTA}`}
            >
              <Sparkles className="w-4 h-4 text-[#FFC72C]" />
              <span>View All ({items.length} Printables)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                const section = document.getElementById("all-activity-sheets");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0A1D3D] border border-slate-300 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 select-none ${JAKARTA}`}
            >
              <span>Show Less (Show 8)</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
