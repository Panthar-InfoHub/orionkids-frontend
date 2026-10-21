"use client";

import React, { useState } from "react";
import { PrintableItem } from "@/types/printables";
import { PrintableCard } from "./printable-card";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

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
  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, items.length));
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className="w-full mt-7 sm:mt-9">
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
          Showing {visibleItems.length} of {totalCount || 28} printable worksheets
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

      {/* Load More Button matching Figma pill design */}
      {hasMore && (
        <div className="w-full flex justify-center mt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className={`px-6 py-2.5 rounded-full bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] text-xs sm:text-[13px] font-black text-[#4F46E5] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 active:scale-95 ${JAKARTA}`}
          >
            <span>↓</span>
            <span>Load 20 More Printables</span>
          </button>
        </div>
      )}
    </section>
  );
}
