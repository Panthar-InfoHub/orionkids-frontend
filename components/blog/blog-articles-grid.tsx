import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogArticlesGridProps {
  posts: BlogPost[];
  totalCount?: number;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  "Education System": { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
  "Teachers & Schools": { bg: "bg-[#FFE4E6]", text: "text-[#E11D48]" },
  "For Parents": { bg: "bg-[#DCFCE7]", text: "text-[#16A34A]" },
  "Child Development": { bg: "bg-[#F3E8FF]", text: "text-[#9333EA]" },
  "Parenting Tips": { bg: "bg-[#FEF3C7]", text: "text-[#D97706]" },
  "Future Skills": { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
};

export function BlogArticlesGrid({ posts, totalCount = 6 }: BlogArticlesGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF8A00] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>FRESH THINKING &amp; FIELD NOTES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1829] tracking-tight">
            Trending Quests &amp; Articles
          </h2>
        </div>

        <div className="text-xs font-semibold text-[#64748B] bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
          Showing {posts.length} of {totalCount} Articles
        </div>
      </div>

      {/* Grid of Articles */}
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-[#F8FAFC] rounded-2xl border border-dashed border-gray-300">
          <p className="text-base font-semibold text-gray-700 mb-1">
            No articles match your current filter.
          </p>
          <p className="text-xs text-gray-500">
            Try choosing another category or clearing your search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {posts.map((post) => {
            const catStyle =
              CATEGORY_STYLES[post.category] || {
                bg: post.pillBg || "bg-indigo-50",
                text: post.pillText || "text-indigo-600",
              };

            const postDate = post.date || post.publishedAt || "Oct 2026";
            const encodedImageUrl = encodeURI(post.imageUrl);

            return (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-2xl sm:rounded-[22px] border border-slate-200/90 overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Cover */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block"
                >
                  <img
                    src={encodedImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col">
                    {/* Category Pill */}
                    <div className="mb-3">
                      <span
                        className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}
                      >
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-[19px] font-bold text-[#0F172A] leading-snug tracking-tight mb-2.5 group-hover:text-[#4F46E5] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[13.5px] text-[#64748B] leading-relaxed line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Date, Read Time, and Read More link */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto text-xs text-[#64748B]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>{postDate}</span>
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] group-hover:text-[#4338CA] hover:underline shrink-0"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
