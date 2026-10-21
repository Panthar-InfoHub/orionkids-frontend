"use client";

import React, { useState, useMemo } from "react";
import { BlogData, BlogCategoryType } from "@/types/blog";
import { BlogHero } from "./blog-hero";
import { BlogFeaturedQuest } from "./blog-featured-quest";
import { BlogArticlesGrid } from "./blog-articles-grid";
import { ConstellationClub } from "./constellation-club";

interface BlogViewProps {
  initialData: BlogData;
}

export function BlogView({ initialData }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<BlogCategoryType>("All Stories");
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time client-side filtering with fallback to initial server state
  const filteredPosts = useMemo(() => {
    let result = [...initialData.posts];

    if (selectedCategory !== "All Stories") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.topicTag.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [initialData.posts, selectedCategory, searchQuery]);

  // Featured quest visibility logic: matches category or query
  const showFeatured = useMemo(() => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const f = initialData.featured;
      return (
        f.title.toLowerCase().includes(q) ||
        f.excerpt.toLowerCase().includes(q) ||
        f.topicTag.toLowerCase().includes(q)
      );
    }

    return (
      selectedCategory === "All Stories" ||
      selectedCategory === initialData.featured.category
    );
  }, [initialData.featured, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section with search & category pills */}
      <BlogHero
        categories={initialData.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Featured Deep-Dive Quest */}
      {showFeatured && <BlogFeaturedQuest post={initialData.featured} />}

      {/* 6-Card Trending Quests & Articles Grid */}
      <BlogArticlesGrid
        posts={filteredPosts}
        totalCount={initialData.totalCount}
      />

      {/* The Constellation Club Newsletter Box */}
      <ConstellationClub />
    </div>
  );
}
