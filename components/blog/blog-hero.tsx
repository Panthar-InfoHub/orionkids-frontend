"use client";

import React from "react";
import { Search } from "lucide-react";
import { BlogCategoryType, BlogCategoryMeta } from "@/types/blog";

interface BlogHeroProps {
  categories: BlogCategoryMeta[];
  selectedCategory: BlogCategoryType;
  onSelectCategory: (category: BlogCategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
}

export function BlogHero({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: BlogHeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <section className="relative pt-8 pb-7 text-center max-w-4xl mx-auto px-4 sm:px-6">
      {/* Top Chronicles Pill Badge with subtle tilt and purple bar & star */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF] text-[#0A1D3D] text-[11px] sm:text-xs font-black tracking-wider uppercase mb-5 shadow-xs transform -rotate-1 select-none">
        <span className="w-1.5 h-3.5 bg-[#4F46E5] rounded-full inline-block" />
        <span>THE ORIONKIDS DISCOVERY CHRONICLES</span>
        <span className="text-amber-300 text-xs sm:text-sm">⭐</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-black text-[#0D1829] tracking-tight leading-[1.2] mb-3">
        Big Ideas for{" "}
        <span className="text-[#FFC700] relative inline-block">
          Growing Minds.
          {/* Vibrant turquoise wavy underline */}
          <svg
            className="absolute -bottom-2 left-0 w-full h-3 text-[#00E5FF] pointer-events-none"
            viewBox="0 0 250 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8C45 4.5 95 9.5 135 6.5C175 3.5 215 7.5 247 5.5"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <br />
        <span className="text-[#5850EC] font-extrabold inline-block mt-1">
          (And Fun Ways to Support Them!)
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-xl mx-auto text-[#475569] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-6 font-normal">
        Bite-sized cognitive insights, screen-free weekend crafts, game breakdowns,
        <br className="hidden sm:inline" />
        {" "}and expert-backed advice for curious parents &amp; bold educators.
      </p>

      {/* Search Input Container */}
      <form
        onSubmit={handleSubmit}
        className="relative max-w-xl mx-auto mb-6"
        role="search"
      >
        <div className="flex items-center bg-white border border-slate-200/90 rounded-full p-1.5 shadow-[0_4px_25px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_30px_rgba(15,23,42,0.09)] transition-all focus-within:border-[#FFC700] focus-within:ring-2 focus-within:ring-[#FFC700]/25">
          <div className="pl-3.5 pr-2 text-[#FFC700]">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search neuro-hacks, logic quests, bedtime ideas..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#0D1829] placeholder:text-[#94A3B8] focus:outline-none font-normal"
            aria-label="Search articles"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-[#FFC700] hover:bg-[#FFB800] active:scale-95 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
          >
            EXPLORE →
          </button>
        </div>
      </form>

      {/* Category Pills matching periwinkle and yellow active states */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
        role="tablist"
        aria-label="Blog categories"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              role="tab"
              aria-selected={isSelected}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer select-none ${
                isSelected
                  ? "bg-[#FFC700] text-white shadow-xs"
                  : "bg-[#E8EDFB] hover:bg-[#DCE5F9] text-[#334155]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-xs">{cat.icon}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
