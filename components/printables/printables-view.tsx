"use client";

import React, { useState, useMemo } from "react";
import {
  PrintablesData,
  PrintableItem,
  PrintableGradeLevel,
  PrintableCategoryType,
} from "@/types/printables";
import { PrintablesHero } from "./printables-hero";
import { FeaturedPrintables } from "./featured-printables";
import { SpotlightFeature } from "./spotlight-feature";
import { PrintablesGrid } from "./printables-grid";
import { LowInkPromise } from "./low-ink-promise";
import { WorkbookBanner } from "./workbook-banner";
import { PrintableModal } from "./printable-modal";

interface PrintablesViewProps {
  initialData: PrintablesData;
}

export function PrintablesView({ initialData }: PrintablesViewProps) {
  const [activeGrade, setActiveGrade] = useState<PrintableGradeLevel>("All Grades");
  const [activeCategory, setActiveCategory] = useState<PrintableCategoryType>("All Printables (28)");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrintable, setSelectedPrintable] = useState<PrintableItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Client-side instant filtering based on selected pills and search
  const filteredItems = useMemo(() => {
    let result = [...initialData.items];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeGrade !== "All Grades") {
      result = result.filter(
        (item) =>
          item.gradeLevel.toLowerCase().includes(activeGrade.toLowerCase()) ||
          item.ageRange.toLowerCase().includes(activeGrade.toLowerCase())
      );
    }

    if (activeCategory !== "All Printables (28)") {
      result = result.filter((item) => item.category === activeCategory);
    }

    return result;
  }, [initialData.items, activeGrade, activeCategory, searchQuery]);

  const handleOpenPrintable = (item: PrintableItem) => {
    setSelectedPrintable(item);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setActiveGrade("All Grades");
    setActiveCategory("All Printables (28)");
    setSearchQuery("");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
      {/* 1. Hero Search & Interactive Filter Header */}
      <PrintablesHero
        grades={initialData.grades}
        categories={initialData.categories}
        activeGrade={activeGrade}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onGradeChange={setActiveGrade}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
        onResetFilters={handleResetFilters}
        filteredCount={filteredItems.length}
      />

      {/* 2. Featured Printables (5-card row) */}
      <FeaturedPrintables
        items={initialData.featured}
        onSelectPrintable={handleOpenPrintable}
      />

      {/* 3. Thematic Spotlight Feature (Halloween & Cosmic Crossword Challenge) */}
      <SpotlightFeature
        item={initialData.spotlight}
        onPrint={handleOpenPrintable}
      />

      {/* 4. All Activity Sheets & Mats (Main 8-card responsive grid) */}
      <PrintablesGrid
        items={filteredItems}
        totalCount={initialData.totalCount}
        onDownloadItem={handleOpenPrintable}
      />

      {/* 5. The OrionKids Low-Ink Promise Callout */}
      <LowInkPromise />

      {/* 6. 50-Page Term 1 Workbook Banner */}
      <WorkbookBanner
        onRequestCustomSheet={() => {
          handleOpenPrintable(initialData.spotlight);
        }}
      />

      {/* Interactive Print / Preview Modal */}
      <PrintableModal
        item={selectedPrintable}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPrintable(null);
        }}
      />
    </div>
  );
}
