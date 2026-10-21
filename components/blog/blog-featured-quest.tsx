import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Sparkles, Heart, Download } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogFeaturedQuestProps {
  post: BlogPost;
}

export function BlogFeaturedQuest({ post }: BlogFeaturedQuestProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
      <div className="relative">
        {/* Floating Top Pill Badge */}
        <div className="absolute -top-3 left-5 sm:left-8 z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#0A7B6E] text-white text-[10px] sm:text-[11px] font-bold tracking-wider px-3 py-0.5 rounded-full uppercase shadow-xs">
            <Sparkles className="w-3 h-3 text-[#5EEAD4]" />
            {post.featuredBadge || "FEATURED DEEP-DIVE QUEST"}
          </span>
        </div>

        {/* Outer Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E4E9F2] shadow-xs hover:shadow-md transition-shadow p-4 sm:p-6 md:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column: Visual & Author capsule */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-[#E4E9F2]">
                {/* Direct img tag to bypass Next.js image proxy attachment headers */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Top-left Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="bg-[#4F46E5] text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase shadow-xs">
                    {post.categoryBadge}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-[#0D1829] text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Clock className="w-2.5 h-2.5 text-[#4F46E5]" />
                    {post.readTime}
                  </span>
                </div>

                {/* Top-right Active Quest badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="bg-white/90 backdrop-blur-sm text-[#0A7B6E] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5 text-[#0A7B6E]" />
                    Active Quest
                  </span>
                </div>
              </div>

              {/* Author Capsule */}
              <div className="flex items-center gap-2.5 bg-[#F8FAFD] border border-[#E8EEF8] rounded-xl p-2.5 shadow-2xs">
                <img
                  src={post.author.avatarUrl || post.imageUrl}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-2xs"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0D1829] truncate">
                    {post.author.name}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate">
                    {post.author.title}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content, Key Discoveries, CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Topic Tag */}
              <div className="text-[#FF8A00] font-bold text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>🧠</span>
                <span>{post.topicTag}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-[25px] font-bold text-[#0D1829] tracking-tight leading-snug mb-2">
                Why{" "}
                <span className="text-[#FFB800] relative">
                  &quot;Simon Says&quot;
                </span>{" "}
                is Actually an Executive Function Superhero
              </h2>

              {/* Excerpt */}
              <p className="text-[#4B587C] text-xs sm:text-sm leading-relaxed mb-3.5">
                {post.excerpt}
              </p>

              {/* Discoveries Box */}
              {post.keyDiscoveries && post.keyDiscoveries.length > 0 && (
                <div className="bg-[#F4F6FD] border border-[#DCE4F7] rounded-xl p-3 sm:p-4 mb-4">
                  <div className="text-[10px] font-bold tracking-wide uppercase text-[#3E4D7A] flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3 text-[#4F46E5]" />
                    <span>KEY FIELD DISCOVERIES INSIDE THIS ISSUE:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#1E293B]">
                    {post.keyDiscoveries.map((discovery, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{discovery}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action and Metrics */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#F0F4FA]">
                <Link
                  href={`#read-${post.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#FFCF25] hover:bg-[#FFC400] active:scale-95 text-[#0A1D3D] text-xs font-bold px-4 sm:px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <span>Read Story &amp; Grab Activity Sheet</span>
                  <span>→</span>
                </Link>

                <div className="flex items-center gap-3 text-xs font-medium text-[#64748B]">
                  {post.likesCount && (
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
                      {post.likesCount}
                    </span>
                  )}
                  {post.downloadsCount && (
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5 text-amber-500" />
                      {post.downloadsCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
