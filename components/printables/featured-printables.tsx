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
              <div className="relative w-full aspect-[4/5] bg-white p-3 sm:p-4 flex flex-col items-center justify-between border-b border-slate-100">
                
                {/* 1. Bats & Night Flyers */}
                {idx === 0 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none">
                    <div className="flex items-center justify-between text-[8px] font-mono font-bold text-slate-400">
                      <span>ORION #104</span>
                      <span className="text-xs">✪</span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="text-3xl mb-1">🌙</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>🦇</span>
                        <span>✦</span>
                        <span>🦇</span>
                      </div>
                      <div className="w-12 h-0.5 bg-slate-200 mt-2 rounded-full"></div>
                    </div>

                    <div className="text-[7px] text-slate-400 font-mono">
                      © OrionKids Safe Harbor
                    </div>
                  </div>
                )}

                {/* 2. Cosmic Word Search */}
                {idx === 1 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none">
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-600">
                      <span>WORD SEARCH</span>
                      <span className="text-amber-500 font-mono">LVL 2</span>
                    </div>

                    <div className="my-auto">
                      <div className="font-mono text-[8px] font-bold tracking-widest text-slate-700 leading-tight">
                        <div>T R C A I T U T</div>
                        <div>R G H P E D Q R</div>
                        <div>I K J S U S Q E</div>
                        <div>C O S T U M E A</div>
                        <div>K M Y J X F P T</div>
                        <div>P U M P K I N Z</div>
                      </div>
                      <p className="text-[8px] text-slate-500 mt-1 font-semibold">
                        Find 8 Cosmic Words
                      </p>
                    </div>

                    <div className="text-[7px] text-slate-400 font-mono">
                      Free Printable PDF
                    </div>
                  </div>
                )}

                {/* 3. Halloween Crossword */}
                {idx === 2 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none">
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-600">
                      <span>CROSSWORD</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-[#34D399] text-[#0A1D3D] font-extrabold text-[7px]">
                        HOT
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="w-16 h-14 bg-indigo-50/70 border border-indigo-200/80 rounded grid grid-cols-4 gap-0.5 p-1 mb-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              i % 3 === 0 ? "bg-white" : "bg-indigo-200/50"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[8px] text-slate-500 font-semibold">
                        Clues: Across &amp; Down
                      </p>
                    </div>

                    <div className="text-[7px] text-slate-400 font-mono">
                      Answer Key Included
                    </div>
                  </div>
                )}

                {/* 4. Word Scramble */}
                {idx === 3 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none">
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-600">
                      <span>SCRAMBLE</span>
                      <span className="text-indigo-600 font-bold">LOGIC</span>
                    </div>

                    <div className="my-auto flex flex-col items-center w-full px-1">
                      <div className="text-lg mb-1">🧠</div>
                      <div className="space-y-1 w-full text-[8px] font-mono text-left pl-2">
                        <div className="text-slate-600">STHOG → ____</div>
                        <div className="text-slate-600">YOKOPS → ____</div>
                        <div className="text-slate-600">TEANUHD → ____</div>
                      </div>
                    </div>

                    <div className="text-[7px] text-slate-400 font-mono">
                      Dyslexia-Friendly Type
                    </div>
                  </div>
                )}

                {/* 5. Halloween Candy */}
                {idx === 4 && (
                  <div className="w-full h-full flex flex-col justify-between text-center select-none">
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-600">
                      <span>COLORING</span>
                      <span className="text-amber-500 text-xs">🎨</span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="text-2xl mb-1">🍬 🧁</div>
                      <p className="text-[8px] font-bold text-slate-600">
                        High Contrast Lines
                      </p>
                    </div>

                    <div className="text-[7px] text-slate-400 font-mono">
                      Eco-Save Outline
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Dark Navy Bar */}
              <div className="bg-[#0A1D3D] text-white p-2.5 sm:p-3 flex flex-col justify-between min-h-[64px]">
                <h3 className="text-xs font-black leading-tight text-white line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-slate-300">
                      {item.ageRange}
                    </span>
                    <span className="text-[8px] font-semibold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.2 rounded">
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
