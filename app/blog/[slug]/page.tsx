import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  Bookmark,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/footer-section";
import { ConstellationClub } from "@/components/blog/constellation-club";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { getBlogPostBySlug } from "@/lib/api/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  "Education System": { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
  "Teachers & Schools": { bg: "bg-[#FFE4E6]", text: "text-[#E11D48]" },
  "For Parents": { bg: "bg-[#DCFCE7]", text: "text-[#16A34A]" },
  "Child Development": { bg: "bg-[#F3E8FF]", text: "text-[#9333EA]" },
  "Parenting Tips": { bg: "bg-[#FEF3C7]", text: "text-[#D97706]" },
  "Future Skills": { bg: "bg-[#E0F2FE]", text: "text-[#0284C7]" },
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | OrionKids Blog",
    };
  }

  return {
    title: `${post.seoTitle || post.title} | OrionKids Discovery Chronicles`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [encodeURI(post.imageUrl)],
    },
  };
}

/**
 * Skeleton placeholder for the blog post content.
 * Enables Next.js instant shell prerendering while streaming article data.
 */
function BlogPostSkeleton() {
  return (
    <article className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 w-full animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-slate-200 rounded" />
        <div className="h-4 w-3 bg-slate-200 rounded" />
        <div className="h-4 w-12 bg-slate-200 rounded" />
        <div className="h-4 w-3 bg-slate-200 rounded" />
        <div className="h-4 w-28 bg-slate-200 rounded" />
      </div>

      {/* Back Link Skeleton */}
      <div className="mb-6">
        <div className="h-4 w-36 bg-slate-200 rounded" />
      </div>

      {/* Header Skeleton */}
      <header className="mb-8">
        <div className="h-6 w-28 bg-slate-200 rounded-full mb-4" />
        <div className="h-10 w-4/5 bg-slate-200 rounded-lg mb-3" />
        <div className="h-10 w-3/5 bg-slate-200 rounded-lg mb-4" />
        <div className="h-5 w-full bg-slate-100 rounded mb-2" />
        <div className="h-5 w-3/4 bg-slate-100 rounded mb-6" />

        <div className="flex items-center justify-between py-4 border-y border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
            <div className="space-y-1.5">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-3 w-32 bg-slate-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-slate-100 rounded" />
            <div className="h-4 w-16 bg-slate-100 rounded" />
          </div>
        </div>
      </header>

      {/* Cover Image Skeleton */}
      <div className="aspect-[16/9] w-full rounded-2xl sm:rounded-3xl bg-slate-200 mb-10" />

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-5/6 bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-4/5 bg-slate-100 rounded" />
      </div>
    </article>
  );
}

/**
 * Async Content component that awaits `params` within a Suspense boundary.
 * Next.js Instant Navigations / PPR serves the static page shell immediately and streams this content.
 */
async function BlogPostContent({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const catStyle =
    CATEGORY_STYLES[post.category] || {
      bg: post.pillBg || "bg-indigo-50",
      text: post.pillText || "text-indigo-600",
    };

  const postDate = post.date || post.publishedAt || "Oct 2026";
  const encodedImageUrl = encodeURI(post.imageUrl);

  // Suggested next 2 articles
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Helper to determine if a paragraph is a section header or regular text
  const isHeading = (text: string) => {
    const trimmed = text.trim();
    if (trimmed.length > 85) return false;
    if (trimmed.endsWith(".") && !trimmed.match(/^[0-9]+\.\s/)) return false;
    const commonHeadings = [
      "Introduction",
      "Conclusion",
      "Summary",
      "Five capabilities worth nurturing",
      "Where OrionKids fits in",
      "Where OrionKids comes in",
      "What is changing in Indian education?",
      "The gap between scoring and understanding",
      "What can parents and schools do?",
      "What parents can do today",
      "How cognitive insights can assist teachers",
      "Why individual learning needs are hard to track",
      "Practical ways to support development at home",
      "Why cognitive growth matters",
    ];
    if (commonHeadings.some((h) => trimmed.toLowerCase().includes(h.toLowerCase()))) {
      return true;
    }
    if (trimmed.match(/^[0-9]+\.\s+[A-Za-z]/)) {
      return true;
    }
    if (trimmed.endsWith("?") && trimmed.length < 70) {
      return true;
    }
    return false;
  };

  return (
    <article className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 w-full">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap"
        >
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors flex items-center gap-1 font-medium"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/blog"
            className="hover:text-slate-900 transition-colors font-medium"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">{post.category}</span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4F46E5] hover:text-[#4338CA] group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Category Pill */}
          <div className="mb-4">
            <span
              className={`inline-block text-xs font-bold px-3.5 py-1.5 rounded-full ${catStyle.bg} ${catStyle.text}`}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0D1829] tracking-tight leading-[1.25] mb-4">
            {post.title}
          </h1>

          {/* Excerpt / Lead */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
            {post.excerpt}
          </p>

          {/* Author Capsule & Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-inner shrink-0">
                {post.author.initials || "OK"}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  {post.author.name}
                </div>
                <div className="text-xs text-slate-500">{post.author.title}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{postDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 shadow-md bg-slate-100 border border-slate-200">
          <img
            src={encodedImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Discoveries Callout Box */}
        {post.keyDiscoveries && post.keyDiscoveries.length > 0 && (
          <aside className="mb-10 bg-linear-to-br from-indigo-50/70 to-teal-50/50 border border-indigo-100/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-indigo-800 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>KEY HIGHLIGHTS &amp; TAKEAWAYS</span>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-[15px] text-slate-700">
              {post.keyDiscoveries.map((discovery, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{discovery}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none">
          {post.content && post.content.length > 0 ? (
            post.content.map((block, idx) => {
              const text = block.trim();
              if (!text) return null;

              if (isHeading(text)) {
                return (
                  <h2
                    key={idx}
                    className="text-xl sm:text-2xl font-bold text-[#0D1829] tracking-tight mt-8 mb-4 pt-2 border-t border-slate-100/60 first:border-none first:pt-0"
                  >
                    {text}
                  </h2>
                );
              }

              // Special formatting for policy link / citation if present
              if (text.startsWith("Read the official policy:")) {
                return (
                  <div
                    key={idx}
                    className="my-5 p-4 bg-amber-50/80 border-l-4 border-amber-400 rounded-r-xl text-sm text-slate-700"
                  >
                    <span className="font-semibold">{text}</span>
                  </div>
                );
              }

              return (
                <p
                  key={idx}
                  className="text-slate-700 text-base sm:text-[17px] leading-relaxed mb-5 font-normal"
                >
                  {text}
                </p>
              );
            })
          ) : (
            <p className="text-slate-700 text-base leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Article End Action Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category:
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}
            >
              {post.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>All Articles</span>
            </Link>
          </div>
        </div>

        {/* Next / Related Articles Section */}
        {otherPosts.length > 0 && (
          <section className="mt-14 pt-10 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Continue Reading
              </h3>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#4F46E5] hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((related) => {
                const rStyle =
                  CATEGORY_STYLES[related.category] || {
                    bg: "bg-slate-100",
                    text: "text-slate-700",
                  };
                return (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={encodeURI(related.imageUrl)}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${rStyle.bg} ${rStyle.text}`}
                        >
                          {related.category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors line-clamp-2 mb-2 leading-snug">
                          {related.title}
                        </h4>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                        <span>{related.date || related.publishedAt}</span>
                        <span className="font-bold text-[#4F46E5] group-hover:translate-x-0.5 transition-transform">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
  );
}

/**
 * BlogPostPage (Server Component)
 *
 * Renders the static instant shell (Navbar, ConstellationClub, FooterSection)
 * and streams the article content inside a Suspense boundary when params resolve.
 */
import { PageCurtain } from "@/components/layout/page-curtain";

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <PageCurtain>
        {/* 1. Global Navigation Bar (Part of Instant App Shell) */}
        <Navbar />

        {/* 2. Article Content (Streamed in via Suspense for Instant Navigation) */}
        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostContent params={params} />
        </Suspense>

        {/* 3. Newsletter Subscription (Part of Instant App Shell) */}
        <ConstellationClub />
      </PageCurtain>

      {/* 4. Global Site Footer (Part of Instant App Shell) */}
      <FooterSection />
    </main>
  );
}

