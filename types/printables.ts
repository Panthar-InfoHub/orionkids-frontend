/**
 * TypeScript definitions for OrionKids Printables System
 * Accurately matching Figma specifications & reference mockups.
 */

export interface PrintableItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: PrintableCategoryType;
  gradeLevel: PrintableGradeLevel;
  ageRange: string;
  pages: number;
  fileSize: string;
  downloadUrl: string;
  previewType?: "maze" | "crossword" | "grid" | "scramble" | "doodle" | "tracker" | "math" | "bats" | "candy";
  cardImage?: string;
  printCountText?: string;
  subcategory?: string;
  accentColor?: string;
  badgeLabel?: string;
  badgeIcon?: string;
  isFeatured?: boolean;
  isSpotlight?: boolean;
  tags: string[];
  downloadsCount?: number;
  estimatedMinutes?: number;
}

export type PrintableCategoryType =
  | "All Printables (28)"
  | "Puzzles & Crosswords"
  | "Coloring & Doodles"
  | "Thinking & Focus Mats"
  | "Cut & Fold Crafts"
  | "Teacher Organizers";

export type PrintableGradeLevel =
  | "All Grades"
  | "Pre-K & K (Ages 4-5)"
  | "Class 1-2 (Ages 6-7)"
  | "Class 3-4 (Ages 8-9)"
  | "Class 5+ (Ages 10+)";

export interface PrintableCategoryMeta {
  id: PrintableCategoryType;
  label: string;
  icon?: string;
  count?: number;
}

export interface PrintableGradeMeta {
  id: PrintableGradeLevel;
  label: string;
  ageRange: string;
}

export interface PrintablesFilterParams {
  search?: string;
  grade?: PrintableGradeLevel;
  category?: PrintableCategoryType;
  sortBy?: "Most Popular" | "Newest First" | "Grade Level";
}

export interface PrintablesData {
  featured: PrintableItem[];
  spotlight: PrintableItem;
  items: PrintableItem[];
  categories: PrintableCategoryMeta[];
  grades: PrintableGradeMeta[];
  totalCount: number;
}
