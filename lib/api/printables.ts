import {
  PrintableItem,
  PrintableCategoryMeta,
  PrintableGradeMeta,
  PrintablesData,
  PrintablesFilterParams,
} from "@/types/printables";

export const PRINTABLE_GRADES: PrintableGradeMeta[] = [
  { id: "All Grades", label: "All Grades", ageRange: "All Ages" },
  { id: "Pre-K & K (Ages 4-5)", label: "Pre-K & K (Ages 4-5)", ageRange: "Ages 4-5" },
  { id: "Class 1-2 (Ages 6-7)", label: "Class 1-2 (Ages 6-7)", ageRange: "Ages 6-7" },
  { id: "Class 3-4 (Ages 8-9)", label: "Class 3-4 (Ages 8-9)", ageRange: "Ages 8-9" },
  { id: "Class 5+ (Ages 10+)", label: "Class 5+ (Ages 10+)", ageRange: "Ages 10+" },
];

export const PRINTABLE_CATEGORIES: PrintableCategoryMeta[] = [
  { id: "All Printables (28)", label: "All Printables (28)", icon: "⭐", count: 28 },
  { id: "Puzzles & Crosswords", label: "Puzzles & Crosswords", icon: "🧩", count: 12 },
  { id: "Coloring & Doodles", label: "Coloring & Doodles", icon: "🎨", count: 8 },
  { id: "Thinking & Focus Mats", label: "Thinking & Focus Mats", icon: "🧠", count: 6 },
  { id: "Cut & Fold Crafts", label: "Cut & Fold Crafts", icon: "✂️", count: 5 },
  { id: "Teacher Organizers", label: "Teacher Organizers", icon: "🎒", count: 4 },
];

export const SPOTLIGHT_PRINTABLE: PrintableItem = {
  id: "spotlight-halloween-cosmic",
  slug: "halloween-cosmic-crossword-challenge",
  title: "Halloween & Cosmic Crossword Challenge",
  description:
    "Encourages vocabulary retention, contextual deductive logic, and spelling recognition. Comes with both student worksheet and teacher answer key with extension discussion prompts.",
  category: "Puzzles & Crosswords",
  gradeLevel: "Class 1-2 (Ages 6-7)",
  ageRange: "GRADE 2 – 6+",
  pages: 2,
  fileSize: "2.4 MB",
  downloadUrl: "#download-spotlight",
  previewType: "crossword",
  accentColor: "#FFC72C",
  badgeLabel: "15-Minute Puzzle",
  badgeIcon: "⏱",
  isSpotlight: true,
  estimatedMinutes: 15,
  tags: [
    "Spelling Recall",
    "Deductive Logic",
    "Visual Discrimination",
    "Working Memory",
  ],
  downloadsCount: 4280,
};

export const FEATURED_PRINTABLES: PrintableItem[] = [
  {
    id: "featured-1",
    slug: "bats-night-flyers",
    title: "Bats & Night Flyers",
    description: "Explore nocturnal wings and moon shadows with visual motor tracing.",
    category: "Coloring & Doodles",
    gradeLevel: "Pre-K & K (Ages 4-5)",
    ageRange: "Grades K – 3",
    pages: 1,
    fileSize: "980 KB",
    downloadUrl: "#download-bats",
    previewType: "bats",
    accentColor: "#60A5FA",
    tags: ["Nocturnal Animals", "Fine Motor"],
    isFeatured: true,
  },
  {
    id: "featured-2",
    slug: "cosmic-word-search",
    title: "Cosmic Word Search",
    description: "Find 8 cosmic words hidden among interstellar planetary coordinates.",
    category: "Puzzles & Crosswords",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Grades 1 – 6+",
    pages: 2,
    fileSize: "1.3 MB",
    downloadUrl: "#download-cosmic-word-search",
    previewType: "crossword",
    accentColor: "#34D399",
    tags: ["Word Search", "Vocabulary"],
    isFeatured: true,
  },
  {
    id: "featured-3",
    slug: "halloween-crossword",
    title: "Halloween Crossword",
    description: "Clues across and down designed to build clue deduction and vocabulary.",
    category: "Puzzles & Crosswords",
    gradeLevel: "Class 3-4 (Ages 8-9)",
    ageRange: "Grades 2 – 6+",
    pages: 3,
    fileSize: "2.1 MB",
    downloadUrl: "#download-halloween-crossword",
    previewType: "crossword",
    accentColor: "#A78BFA",
    tags: ["Crossword", "Spooky Fun"],
    isFeatured: true,
  },
  {
    id: "featured-4",
    slug: "word-scramble",
    title: "Word Scramble",
    description: "Dyslexia-friendly anagrams designed for rapid phonemic flexibility.",
    category: "Thinking & Focus Mats",
    gradeLevel: "Class 3-4 (Ages 8-9)",
    ageRange: "Grades 2 – 6+",
    pages: 1,
    fileSize: "850 KB",
    downloadUrl: "#download-word-scramble",
    previewType: "scramble",
    accentColor: "#F472B6",
    tags: ["Scramble", "Phonics"],
    isFeatured: true,
  },
  {
    id: "featured-5",
    slug: "halloween-candy",
    title: "Halloween Candy",
    description: "High-contrast eco-save outlines with tactile candy shapes for focus.",
    category: "Coloring & Doodles",
    gradeLevel: "All Grades",
    ageRange: "All Grades (Pre-K+)",
    pages: 2,
    fileSize: "1.4 MB",
    downloadUrl: "#download-halloween-candy",
    previewType: "candy",
    accentColor: "#FBBF24",
    tags: ["Coloring", "Eco-Save"],
    isFeatured: true,
  },
];

export const ALL_ACTIVITY_ITEMS: PrintableItem[] = [
  {
    id: "item-1",
    slug: "kitchen-sorting-blueprint",
    title: "Kitchen Sorting Blueprint",
    description: "Categorization mat challenging toddlers and kindergarteners to sort utensils and produce.",
    category: "Thinking & Focus Mats",
    subcategory: "EARLY MATH & SORTING",
    subcategoryColor: "text-[#D97706]",
    gradeLevel: "Pre-K & K (Ages 4-5)",
    ageRange: "Pre-K – 1",
    pages: 2,
    fileSize: "1.2 MB",
    downloadUrl: "#download-kitchen-sorting",
    cardImage: "/svg/201.svg",
    image: "/svg/201.svg",
    printCountText: "1.8k prints",
    previewType: "grid",
    badgeLabel: "LOGIC",
    badgeIcon: "📐",
    badgeBg: "bg-[#0D9488]",
    accentColor: "#10B981",
    tags: ["Sorting", "Taxonomy", "Hands-on", "Early Math"],
  },
  {
    id: "item-2",
    slug: "reverse-storyteller-comic",
    title: "Reverse Storyteller Comic",
    description: "Presents the ending frame first! Kids must reconstruct the causal chain and dialogues.",
    category: "Coloring & Doodles",
    subcategory: "FLEXIBLE THINKING",
    subcategoryColor: "text-[#6366F1]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 2 – 5",
    pages: 3,
    fileSize: "1.4 MB",
    downloadUrl: "#download-reverse-comic",
    cardImage: "/svg/202.svg",
    image: "/svg/202.svg",
    printCountText: "2.4k prints",
    previewType: "doodle",
    badgeLabel: "CREATIVITY",
    badgeIcon: "🎨",
    badgeBg: "bg-[#6366F1]",
    accentColor: "#6366F1",
    tags: ["Storytelling", "Comics", "Sequencing", "Flexible Thinking"],
  },
  {
    id: "item-3",
    slug: "color-freeze-reflex-tracker",
    title: "Color & Freeze Reflex Tracker",
    description: "A fast-paced audio-prompted worksheet where pupils switch target colors on cue.",
    category: "Thinking & Focus Mats",
    subcategory: "INHIBITORY CONTROL",
    subcategoryColor: "text-[#D97706]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "950 KB",
    downloadUrl: "#download-color-freeze",
    cardImage: "/svg/203.svg",
    image: "/svg/203.svg",
    printCountText: "980 prints",
    previewType: "tracker",
    badgeLabel: "REFLEX",
    badgeIcon: "⏱",
    badgeBg: "bg-[#06B6D4]",
    accentColor: "#06B6D4",
    tags: ["Stroop", "Inhibition", "Focus", "Reflex"],
  },
  {
    id: "item-4",
    slug: "weekly-morning-brain-spark",
    title: "Weekly Morning Brain Spark",
    description: "5-day two-sided desk sheet: quick riddles, spatial symmetry drawings, and mini sudoku.",
    category: "Teacher Organizers",
    subcategory: "CLASSROOM ROUTINE",
    subcategoryColor: "text-[#059669]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Teachers / All",
    pages: 4,
    fileSize: "1.1 MB",
    downloadUrl: "#download-morning-spark",
    cardImage: "/svg/204.svg",
    image: "/svg/204.svg",
    printCountText: "3.1k prints",
    previewType: "math",
    badgeLabel: "ROUTINES",
    badgeIcon: "☀️",
    badgeBg: "bg-[#059669]",
    accentColor: "#F59E0B",
    tags: ["Daily Habits", "Warm-Up", "Routines"],
  },
  {
    id: "item-5",
    slug: "dot-to-dot-constellation-map",
    title: "Dot-to-Dot Constellation Map",
    description: "Sequential counting up to 100 that uncovers celestial mythology while improving pencil grip.",
    category: "Puzzles & Crosswords",
    subcategory: "NUMBER ORDER & MOTOR",
    subcategoryColor: "text-[#6366F1]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 3",
    pages: 2,
    fileSize: "1.3 MB",
    downloadUrl: "#download-constellation-map",
    cardImage: "/svg/205.svg",
    image: "/svg/205.svg",
    printCountText: "1.2k prints",
    previewType: "maze",
    badgeLabel: "SPATIAL",
    badgeIcon: "✨",
    badgeBg: "bg-[#6366F1]",
    accentColor: "#3B82F6",
    tags: ["Dot to Dot", "Astronomy", "Pencil Grip", "Counting"],
  },
  {
    id: "item-6",
    slug: "feelings-orbit-meter",
    title: "Feelings & Orbit Meter",
    description: "Non-verbal self-regulation cutout thermometer letting students slide their astronaut.",
    category: "Cut & Fold Crafts",
    subcategory: "SOCIAL-EMOTIONAL (SEL)",
    subcategoryColor: "text-[#3B82F6]",
    gradeLevel: "All Grades",
    ageRange: "All Ages",
    pages: 1,
    fileSize: "1.0 MB",
    downloadUrl: "#download-feelings-orbit",
    cardImage: "/svg/206.svg",
    image: "/svg/206.svg",
    printCountText: "2.8k prints",
    previewType: "doodle",
    badgeLabel: "EMOTIONAL",
    badgeIcon: "❤️",
    badgeBg: "bg-[#FBBF24]",
    accentColor: "#EC4899",
    tags: ["SEL", "Emotional Regulation", "Self-Reflection"],
  },
  {
    id: "item-7",
    slug: "odd-one-out-pattern-matrix",
    title: "Odd-One-Out Pattern Matrix",
    description: "Spot tiny rotational anomalies in biomechanical animal silhouettes under timed intervals.",
    category: "Thinking & Focus Mats",
    subcategory: "PERCEPTUAL SPEED",
    subcategoryColor: "text-[#0D9488]",
    gradeLevel: "Pre-K & K (Ages 4-5)",
    ageRange: "Pre-K – 2",
    pages: 3,
    fileSize: "1.5 MB",
    downloadUrl: "#download-odd-one-out",
    cardImage: "/svg/207.svg",
    image: "/svg/207.svg",
    printCountText: "1.6k prints",
    previewType: "grid",
    badgeLabel: "PATTERN",
    badgeIcon: "🔍",
    badgeBg: "bg-[#0D9488]",
    accentColor: "#14B8A6",
    tags: ["Matrix", "Visual Discrimination", "Perceptual Speed"],
  },
  {
    id: "item-8",
    slug: "bedtime-wind-down-spiral",
    title: "Bedtime Wind-Down Spiral",
    description: "A tactile finger-tracing path synced with 4–7–8 parasympathetic calming breathing.",
    category: "Cut & Fold Crafts",
    subcategory: "MINDFULNESS & SLEEP",
    subcategoryColor: "text-[#8B5CF6]",
    gradeLevel: "All Grades",
    ageRange: "All Ages",
    pages: 1,
    fileSize: "880 KB",
    downloadUrl: "#download-wind-down-spiral",
    cardImage: "/svg/208.svg",
    image: "/svg/208.svg",
    printCountText: "3.5k prints",
    previewType: "maze",
    badgeLabel: "CALMING",
    badgeIcon: "🌀",
    badgeBg: "bg-[#8B5CF6]",
    accentColor: "#8B5CF6",
    tags: ["Mindfulness", "Bedtime", "Sensory Regulation"],
  },
];

/**
 * Server/Client Data Fetcher for Printables
 */
export async function getPrintablesData(
  filters?: PrintablesFilterParams
): Promise<PrintablesData> {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      const searchParams = new URLSearchParams();
      if (filters?.search) searchParams.set("search", filters.search);
      if (filters?.grade) searchParams.set("grade", filters.grade);
      if (filters?.category) searchParams.set("category", filters.category);

      const res = await fetch(`${apiUrl}/api/printables?${searchParams.toString()}`, {
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("[PrintablesAPI] Remote fetch fallback:", err);
    }
  }

  let filteredItems = [...ALL_ACTIVITY_ITEMS];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters?.grade && filters.grade !== "All Grades") {
    filteredItems = filteredItems.filter((item) =>
      item.gradeLevel.toLowerCase().includes(filters.grade!.toLowerCase()) ||
      item.ageRange.toLowerCase().includes(filters.grade!.toLowerCase())
    );
  }

  if (filters?.category && filters.category !== "All Printables (28)") {
    filteredItems = filteredItems.filter((item) => item.category === filters.category);
  }

  return {
    featured: FEATURED_PRINTABLES,
    spotlight: SPOTLIGHT_PRINTABLE,
    items: filteredItems,
    categories: PRINTABLE_CATEGORIES,
    grades: PRINTABLE_GRADES,
    totalCount: ALL_ACTIVITY_ITEMS.length,
  };
}

export async function trackPrintableDownload(printableId: string): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      await fetch(`${apiUrl}/api/printables/${printableId}/download`, {
        method: "POST",
      });
    } catch (err) {
      console.warn("[PrintablesAPI] Tracking error:", err);
    }
  }
}
