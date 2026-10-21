"use client";

import React, { useState } from "react";
import { Search, Printer, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  PrintableCategoryMeta,
  PrintableGradeMeta,
  PrintableCategoryType,
  PrintableGradeLevel,
} from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

interface PrintablesHeroProps {
  grades: PrintableGradeMeta[];
  categories: PrintableCategoryMeta[];
  activeGrade: PrintableGradeLevel;
  activeCategory: PrintableCategoryType;
  searchQuery: string;
  sortBy?: string;
  onGradeChange: (grade: PrintableGradeLevel) => void;
  onCategoryChange: (category: PrintableCategoryType) => void;
  onSearchChange: (query: string) => void;
  onSortByChange?: (sort: string) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export function PrintablesHero({
  grades,
  categories,
  activeGrade,
  activeCategory,
  searchQuery,
  sortBy = "Most Popular",
  onGradeChange,
  onCategoryChange,
  onSearchChange,
  onSortByChange,
  onResetFilters,
  filteredCount,
}: PrintablesHeroProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput.trim());
  };

  return (
    <section className="w-full">
      {/* Outer Card with Soft Light Sky / Lavender Gradient matching mockup */}
      <div className="relative w-full rounded-[24px] sm:rounded-[30px] bg-gradient-to-r from-[#F0F7FF] via-[#F6F9FF] to-[#E9F3FF] border border-[#D5E6F8] shadow-[0_12px_45px_-12px_rgba(10,29,61,0.07)] p-5 sm:p-7 lg:p-8 overflow-hidden">
        
        {/* Soft pastel ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col items-start text-left">
          
          {/* Top Pill: Zero-Prep Screen-Free Play */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D8F3FF] text-[#0A1D3D] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs select-none">
            <Printer className="w-3 h-3 text-[#0284C7]" />
            <span>Zero-Prep Screen-Free Play</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-[24px] sm:text-[32px] lg:text-[38px] font-black text-[#0A1D3D] leading-[1.18] tracking-[-0.8px] mb-2.5 ${JAKARTA}`}
          >
            Hands–On Printables for{" "}
            <span className="relative inline-block text-[#FFC72C]">
              Curious Minds
              {/* Green Underline Accent matching mockup */}
              <span className="absolute -bottom-0.5 left-0 w-full h-[3px] bg-[#16A34A] rounded-full" />
            </span>
          </h1>

          {/* Lede Subtitle */}
          <p className="text-[13px] sm:text-[14px] text-[#475569] max-w-2xl leading-relaxed font-normal mb-4 sm:mb-5">
            Screen-free cognitive crosswords, tactile activity mats, coloring adventures, and classroom
            organizers designed by neurodevelopment specialists. Instant PDF printouts that require zero
            preparation and respect your printer ink.
          </p>

          {/* Search & Filter Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-lg flex items-center bg-white rounded-full border border-slate-200/90 shadow-2xs p-1 mb-4"
          >
            <div className="flex items-center gap-2 pl-3.5 flex-1">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (e.target.value === "") onSearchChange("");
                }}
                placeholder="Search printables (e.g., crossword, pattern maze)..."
                className="w-full bg-transparent text-xs sm:text-[13px] text-[#0A1D3D] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className={`px-4 sm:px-5 py-2 rounded-full bg-[#FFC72C] hover:bg-[#FFD233] text-xs font-black text-[#0A1D3D] transition-all cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0 select-none ${JAKARTA}`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filter</span>
            </button>
          </form>

          {/* SELECT GRADE / AGE LEVEL Row */}
          <div className="w-full mb-3">
            <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#64748B] mb-1.5">
              SELECT GRADE / AGE LEVEL
            </span>
            <div className="flex items-center flex-wrap gap-1.5">
              {grades.map((grade) => {
                const isSelected = activeGrade === grade.id;
                return (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={() => onGradeChange(grade.id)}
                    className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-black transition-all cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#FFC72C] text-[#0A1D3D] shadow-xs"
                        : "bg-white text-[#334155] border border-slate-200/90 hover:border-slate-300"
                    }`}
                  >
                    {grade.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Row */}
          <div className="w-full flex items-center flex-wrap gap-1.5 mb-2.5">
            {categories.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#EDE9FE] text-[#5B21B6] border border-[#DDD6FE] shadow-2xs font-extrabold"
                      : "bg-white text-[#334155] border border-slate-200/90 hover:bg-slate-50"
                  }`}
                >
                  {category.icon && <span className="text-[11px]">{category.icon}</span>}
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort By Row */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] sm:text-xs text-[#64748B] font-medium">Sort by:</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200/90 text-[11px] sm:text-xs font-bold text-[#0A1D3D] shadow-2xs">
              <span>{sortBy}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
