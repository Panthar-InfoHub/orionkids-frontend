/**
 * TypeScript definitions for OrionKids Blog / Discovery Chronicles
 * Server component ready and prepared for database/CMS backend modifications.
 */

export type BlogCategoryType =
  | "All Stories"
  | "Education System"
  | "Teachers & Schools"
  | "For Parents"
  | "Child Development"
  | "Parenting Tips"
  | "Future Skills"
  | "Cognitive Play"
  | "Parent Tips"
  | "In the Classroom"
  | "Screen-Time Balance"
  | "Printables & Crafts"
  | string;

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
  categoryBadgeColor: string; // e.g. blue, green, purple, amber, red, teal, indigo, cyan
  topicTag: string; // e.g. "BEYOND ACADEMIC MARKS", "NEUROSCIENCE OF PLAY"
  readTime: string; // e.g. "5 Min Read"
  imageUrl: string;
  author: BlogAuthor;
  isFeatured?: boolean;
  featuredBadge?: string | null;
  keyDiscoveries?: string[];
  likesCount?: string;
  downloadsCount?: string;
  publishedAt: string;
  date?: string;
  pillBg?: string;
  pillText?: string;
  seoTitle?: string;
  metaDescription?: string;
  content?: string[];
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
