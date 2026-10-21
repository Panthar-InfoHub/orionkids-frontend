import React from "react";
import { Leaf, CheckCircle2 } from "lucide-react";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

export function LowInkPromise() {
  return (
    <section className="w-full mt-7 sm:mt-9">
      <div className="w-full rounded-2xl bg-[#EAF7EF] border-2 border-[#C6ECD3] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        
        {/* Left Side: Icon & Copy */}
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#D2F3DE] border border-[#B1EAC4] flex items-center justify-center text-emerald-800 shrink-0 shadow-2xs">
            <Leaf className="w-5 h-5 text-emerald-700" />
          </div>

          <div>
            <h3 className={`text-sm sm:text-base font-black text-[#0A1D3D] mb-0.5 ${JAKARTA}`}>
              The OrionKids Low-Ink Promise
            </h3>
            <p className="text-xs text-[#4A5D74] leading-relaxed">
              Every worksheet is engineered with clean vector outlines and light backgrounds to use up
              to 65% less home printer ink compared to standard web printables.
            </p>
          </div>
        </div>

        {/* Right Side: Badge */}
        <div className="shrink-0 self-end md:self-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-emerald-800 border-2 border-emerald-600/30 text-[11px] font-black shadow-2xs select-none">
            <span>🌱</span>
            <span>100% Eco-Friendly Print</span>
          </div>
        </div>

      </div>
    </section>
  );
}
