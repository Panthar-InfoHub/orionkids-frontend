"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, FileText, Check, Loader2 } from "lucide-react";
import { PrintableItem } from "@/types/printables";

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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const handleDownload = (item: PrintableItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(item.id);
      onDownloadItem?.(item);
      setTimeout(() => setDownloadedId(null), 3000);
    }, 400);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, items.length));
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <section className="w-full mt-7 sm:mt-9">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E2F6EA] border border-[#C2EED4] flex items-center justify-center text-xs shadow-2xs">
            🧩
          </div>
          <h2 className={`text-lg sm:text-xl font-black text-[#0A1D3D] ${JAKARTA}`}>
            All Activity Sheets &amp; Mats
          </h2>
        </div>

        <span className="text-xs font-medium text-[#526176]">
          Showing {visibleItems.length} of {items.length} printables · Filters Applied
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
          {visibleItems.map((item) => {
            const isDownloading = downloadingId === item.id;
            const isDownloaded = downloadedId === item.id;

            // If the exact Figma exported card image is available (Card 1.png ... Card 8.png)
            if (item.cardImage) {
              return (
                <div
                  key={item.id}
                  onClick={() => handleDownload(item)}
                  className="group relative cursor-pointer rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(10,29,61,0.14)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00BCD4] select-none flex justify-center"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleDownload(item);
                    }
                  }}
                  aria-label={`Get printable PDF for ${item.title}`}
                >
                  <div className="relative w-full max-w-[282px] overflow-hidden rounded-[24px] bg-white flex items-center justify-center">
                    {/* Native direct img element to bypass Next.js image proxy attachment headers */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.cardImage}
                      alt={item.title}
                      width={282}
                      height={448}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-sm"
                      loading="eager"
                    />
                  </div>

                  {/* Subtle interactive hover overlay hint */}
                  <div className="absolute inset-0 bg-[#0A1D3D]/0 group-hover:bg-[#0A1D3D]/5 transition-colors duration-200 rounded-[24px] flex items-end justify-center pb-5 pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3.5 py-1.5 rounded-full bg-[#0A1D3D] text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5">
                      <span>🖨</span>
                      <span>Click to Print / Download</span>
                    </span>
                  </div>
                </div>
              );
            }

            // Fallback layout for dynamic items added later via backend
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-[22px] border-2 border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0A1D3D] transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] bg-[#F8FAFC] border-b-2 border-[#0A1D3D] p-3 flex flex-col items-center justify-center overflow-hidden">
                  {item.badgeLabel && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#0A1D3D] border border-[#0A1D3D] text-[10px] font-black tracking-wide shadow-2xs">
                        <span>{item.badgeIcon}</span>
                        <span>{item.badgeLabel}</span>
                      </span>
                    </div>
                  )}

                  <div className="w-[84%] h-[88%] bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex flex-col justify-between transform group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">
                        OrionKids · {item.ageRange}
                      </span>
                      <span className="text-[7px] font-bold text-slate-400">PDF</span>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center text-xs">
                      📄
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-0.5">
                      <span className="text-[6px] text-slate-400">{item.fileSize}</span>
                      <span className="text-[6px] text-slate-400">{item.pages} Pages</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[10px] font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-md">
                        {item.ageRange}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {item.category}
                      </span>
                    </div>

                    <h3 className={`text-[15px] font-black text-[#0A1D3D] leading-tight mb-1.5 line-clamp-1 ${JAKARTA}`}>
                      {item.title}
                    </h3>

                    <p className="text-[12px] text-[#526176] leading-[150%] line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-[#8897AE]">
                      {item.printCountText || `${item.fileSize} · ${item.pages} Pages`}
                    </span>

                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleDownload(item)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#0A1D3D] text-xs font-black transition-all cursor-pointer select-none shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#0A1D3D] ${
                        isDownloaded
                          ? "bg-[#E2F6EA] text-emerald-800"
                          : "bg-[#FFC72C] hover:bg-[#FFD233] text-[#0A1D3D]"
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>PDF</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-700" />
                          <span>Ready!</span>
                        </>
                      ) : (
                        <>
                          <span>Get PDF</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="w-full flex justify-center mt-6">
          <button
            type="button"
            onClick={handleLoadMore}
            className={`px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs font-black text-[#0A1D3D] transition-all cursor-pointer flex items-center gap-2 ${JAKARTA}`}
          >
            <span>Load 20 More Printables</span>
          </button>
        </div>
      )}
    </section>
  );
}
