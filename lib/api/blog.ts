import { BlogPost, BlogData, BlogFilterParams } from "@/types/blog";
import {
  BLOG_CATEGORIES,
  FEATURED_POST,
  BLOG_POSTS,
} from "@/lib/data/blog-posts";

export { BLOG_CATEGORIES, FEATURED_POST, BLOG_POSTS };

/**
 * Server component data provider for Blog page.
 * Returns the curated 6 articles and category metadata from the Blog content document.
 */
export async function getBlogData(filters?: BlogFilterParams): Promise<BlogData> {
  let filtered = [...BLOG_POSTS];

  if (filters?.category && filters.category !== "All Stories") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  if (filters?.search && filters.search.trim() !== "") {
    const q = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.topicTag.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q)
    );
  }

  return {
    featured: FEATURED_POST,
    posts: filtered,
    categories: BLOG_CATEGORIES,
    totalCount: BLOG_POSTS.length,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const match = BLOG_POSTS.find((p) => p.slug === slug);
  return match || null;
}
