/**
 * TypeScript definitions for OrionKids Blog / Discovery Chronicles
 * Server component ready and prepared for database/CMS backend modifications.
 */

export type BlogCategoryType =
  | "All Stories"
  | "Cognitive Play"
  | "Parent Tips"
  | "In the Classroom"
  | "Screen-Time Balance"
  | "Printables & Crafts";

export interface BlogAuthor {
  name: string;
  title: string;
  initials?: string;
  avatarUrl?: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  highlightTitleWord?: string;
  subtitle?: string;
  excerpt: string;
  category: BlogCategoryType;
  categoryBadge: string;
  categoryBadgeColor: string; // e.g. blue, green, purple, amber, red
  topicTag: string; // e.g. "NEUROSCIENCE OF PLAY", "EARLY MATH HACK", "DIAGNOSTIC BREAKDOWN"
  readTime: string; // e.g. "5 Min Read"
  imageUrl: string;
  author: BlogAuthor;
  isFeatured?: boolean;
  featuredBadge?: string;
  keyDiscoveries?: string[];
  likesCount?: string;
  downloadsCount?: string;
  publishedAt: string;
}

export interface BlogCategoryMeta {
  id: BlogCategoryType;
  label: string;
  icon?: string;
}

export interface BlogFilterParams {
  search?: string;
  category?: BlogCategoryType;
}

export interface BlogData {
  featured: BlogPost;
  posts: BlogPost[];
  categories: BlogCategoryMeta[];
  totalCount: number;
}
