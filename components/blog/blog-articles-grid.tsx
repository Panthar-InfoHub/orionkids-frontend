import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogArticlesGridProps {
  posts: BlogPost[];
  totalCount?: number;
}

const BADGE_COLORS: Record<string, string> = {
  teal: "bg-[#0D9488] text-white",
  cyan: "bg-[#0284C7] text-white",
  purple: "bg-[#7C3AED] text-white",
  red: "bg-[#DC2626] text-white",
  indigo: "bg-[#4F46E5] text-white",
  mint: "bg-[#059669] text-white",
  blue: "bg-[#2563EB] text-white",
};

const TOPIC_COLORS: Record<string, string> = {
  "EARLY MATH HACK": "text-[#0D9488]",
  "DIAGNOSTIC BREAKDOWN": "text-[#D97706]",
  "NO FLASHCARDS NEEDED": "text-[#4F46E5]",
  "RESILIENCE TRAINING": "text-[#E11D48]",
  "FROM THE FIELD": "text-[#6366F1]",
  "WEEKEND EXPEDITION": "text-[#059669]",
};

const AVATAR_BG: Record<string, string> = {
  EK: "bg-teal-100 text-teal-800",
  JM: "bg-sky-100 text-sky-800",
  SL: "bg-purple-100 text-purple-800",
  TA: "bg-rose-100 text-rose-800",
  MB: "bg-indigo-100 text-indigo-800",
  CN: "bg-emerald-100 text-emerald-800",
};

export function BlogArticlesGrid({ posts, totalCount = 48 }: BlogArticlesGridProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 sm:mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF8A00] uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-[#FF8A00]" />
            <span>FRESH THINKING FIELD NOTES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D1829] tracking-tight">
            Trending Quests &amp; Articles
          </h2>
        </div>

        <div className="text-xs font-medium text-[#64748B]">
          Showing {posts.length} of {totalCount} Research Sparks
        </div>
      </div>

      {/* Grid of Articles */}
      {posts.length === 0 ? (
        <div className="text-center py-12 bg-[#F8FAFC] rounded-2xl border border-dashed border-gray-300">
          <p className="text-sm font-semibold text-gray-600 mb-1">
            No articles match your current filter.
          </p>
          <p className="text-xs text-gray-400">
            Try choosing another category or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {posts.map((post) => {
            const badgeClass =
              BADGE_COLORS[post.categoryBadgeColor] || "bg-[#0D9488] text-white";
            const topicClass =
              TOPIC_COLORS[post.topicTag] || "text-[#0D9488]";
            const avatarBgClass =
              (post.author.initials && AVATAR_BG[post.author.initials]) ||
              "bg-gray-100 text-gray-800";

            return (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl border border-[#E4E9F2] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Image Wrap */}
                <div className="p-2.5 pb-0">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Top-left category tag inside image */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-xs ${badgeClass}`}
                      >
                        {post.categoryBadge}
                      </span>
                    </div>

                    {/* Bottom-right read time */}
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-white/95 backdrop-blur-xs text-[#0D1829] text-[9px] font-semibold px-1.5 py-0.5 rounded-full shadow-xs">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Topic Tag */}
                    <div
                      className={`text-[10px] font-bold tracking-wider uppercase mb-1 flex items-center gap-1 ${topicClass}`}
                    >
                      <span className="text-[10px]">✦</span>
                      <span>{post.topicTag}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#0D1829] leading-snug tracking-tight mb-1.5 group-hover:text-[#0A7B6E] transition-colors line-clamp-2">
                      <Link href={`#read-${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-[#4B587C] leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-2.5 border-t border-[#F0F4FA] flex items-center justify-between mt-auto">
                    {/* Author Pill */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      {post.author.initials && (
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 ${avatarBgClass}`}
                        >
                          {post.author.initials}
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-[#0D1829] truncate">
                        {post.author.name}
                      </span>
                    </div>

                    {/* Read > link */}
                    <Link
                      href={`#read-${post.slug}`}
                      className="inline-flex items-center gap-0.5 text-xs font-bold text-[#FF8A00] hover:text-[#EA580C] hover:underline shrink-0"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
