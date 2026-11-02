import React from "react";
import { Printer, Download, Sparkles } from "lucide-react";
import { PrintableItem } from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface FeaturedPrintablesProps {
  items: PrintableItem[];
  onSelectPrintable?: (item: PrintableItem) => void;
}

export function FeaturedPrintables({
  items,
  onSelectPrintable,
}: FeaturedPrintablesProps) {
  return (
    <section className="w-full mt-7 sm:mt-9">
      {/* Eyebrow & Section Header matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-3.5">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#0A1D3D] mb-0.5">
            <span>🔥</span>
            <span>SEASONAL &amp; HIGH ROTATION</span>
          </div>
          {/* Heading */}
          <h2 className={`text-lg sm:text-2xl font-black text-[#0A1D3D] ${JAKARTA}`}>
            Featured Printables
          </h2>
        </div>

        <span className="text-xs font-medium text-[#64748B]">
          Classroom-tested • Instant 1–Click Print
        </span>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {items.map((item, idx) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelectPrintable?.(item)}
              className="group relative bg-white rounded-[22px] border border-slate-200/90 shadow-[0_8px_30px_rgba(10,29,61,0.05)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(10,29,61,0.12)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Paper Sheet Preview Mockup Area */}
              <div className="relative w-full aspect-[4/5] bg-white p-3.5 sm:p-4 flex flex-col items-center justify-between border-b border-slate-200">
                
                {/* 1. Bats & Night Flyers */}
                {idx === 0 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none py-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-[#0A1D3D]">
                      <span>ORION #104</span>
                      <span className="text-amber-500 text-sm">✪</span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="text-4xl sm:text-5xl mb-2 drop-shadow-sm">🌙</div>
                      <div className="flex items-center gap-3 text-base sm:text-lg">
                        <span>🦇</span>
                        <span className="text-amber-400 font-black text-sm">✦</span>
                        <span>🦇</span>
                      </div>
                      <div className="w-16 h-1 bg-amber-300 mt-2.5 rounded-full"></div>
                    </div>

                    <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-bold font-mono">
                      © OrionKids Safe Harbor
                    </div>
                  </div>
                )}

                {/* 2. Cosmic Word Search */}
                {idx === 1 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none py-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-[#0A1D3D]">
                      <span>WORD SEARCH</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-[9px]">
                        LVL 2
                      </span>
                    </div>

                    <div className="my-auto py-1">
                      <div className="font-mono text-[10px] sm:text-[11.5px] font-black tracking-[0.22em] text-[#0A1D3D] leading-snug">
                        <div>T R C A I T U T</div>
                        <div>R G H P E D Q R</div>
                        <div>I K J S U S Q E</div>
                        <div>C O S T U M E A</div>
                        <div>P U M P K I N Z</div>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] sm:text-[11px] font-extrabold text-indigo-700">
                          Find 8 Cosmic Words
                        </span>
                      </div>
                    </div>

                    <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-bold font-mono">
                      Free Printable PDF
                    </div>
                  </div>
                )}

                {/* 3. Halloween Crossword */}
                {idx === 2 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none py-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-[#0A1D3D]">
                      <span>CROSSWORD</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[9px] shadow-2xs">
                        HOT
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="w-20 sm:w-24 h-16 sm:h-18 bg-white border-2 border-[#0A1D3D] rounded-lg grid grid-cols-4 gap-0.5 p-1 mb-1.5 shadow-2xs">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs flex items-center justify-center text-[7px] font-black ${
                              i === 1 || i === 6 || i === 9
                                ? "bg-[#0A1D3D] text-transparent"
                                : "bg-indigo-50 border border-indigo-100 text-indigo-900"
                            }`}
                          >
                            {i !== 1 && i !== 6 && i !== 9 ? (i + 1) : ""}
                          </div>
                        ))}
                      </div>
                      <p className="text-[10.5px] sm:text-[11.5px] text-[#0A1D3D] font-extrabold">
                        Clues: Across &amp; Down
                      </p>
                    </div>

                    <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-bold font-mono">
                      Answer Key Included
                    </div>
                  </div>
                )}

                {/* 4. Word Scramble */}
                {idx === 3 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none py-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-[#0A1D3D]">
                      <span>SCRAMBLE</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 font-black text-[9px]">
                        LOGIC
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center w-full px-1">
                      <div className="text-2xl sm:text-3xl mb-1.5">🧠</div>
                      <div className="space-y-1 w-full text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 text-left px-1.5 sm:px-2">
                        <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex justify-between">
                          <span>STHOG</span>
                          <span className="text-slate-400 font-bold">→ ___</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex justify-between">
                          <span>YOKOPS</span>
                          <span className="text-slate-400 font-bold">→ ___</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded flex justify-between">
                          <span>PUMKIP</span>
                          <span className="text-slate-400 font-bold">→ ___</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-bold font-mono">
                      Dyslexia-Friendly Type
                    </div>
                  </div>
                )}

                {/* 5. Halloween Candy */}
                {idx === 4 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none py-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-[#0A1D3D]">
                      <span>COLORING</span>
                      <span className="text-base">🎨</span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="text-3xl sm:text-4xl mb-2 filter drop-shadow-sm">🍬 🧁</div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10.5px] sm:text-[11.5px] font-extrabold text-[#0A1D3D]">
                        High Contrast Lines
                      </span>
                    </div>

                    <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 font-bold font-mono">
                      Eco-Save Outline
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Dark Navy Bar */}
              <div className="bg-[#0A1D3D] text-white p-2.5 sm:p-3 flex flex-col justify-between min-h-[66px]">
                <h3 className="text-xs sm:text-[13px] font-black leading-tight text-white line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-300">
                      {item.ageRange}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded">
                      1-Page PDF
                    </span>
                  </div>
                  
                  {/* Circular Download Action Button with instant PDF download */}
                  <a
                    href={item.downloadUrl || `/api/printables/${item.slug}/pdf`}
                    download={`OrionKids-${item.slug}-Worksheet.pdf`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    title="Instant Download: Activity Worksheet PDF"
                    className="w-6 h-6 rounded-full bg-white text-[#0A1D3D] hover:bg-[#FFC72C] active:scale-90 flex items-center justify-center transition-all shadow-xs cursor-pointer z-10"
                    aria-label={`Download ${item.title} 1-Page PDF`}
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
