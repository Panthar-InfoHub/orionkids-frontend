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
  { id: "All Printables (28)", label: "All Printables (8)", icon: "⭐", count: 8 },
  { id: "Puzzles & Crosswords", label: "Puzzles & Crosswords", icon: "🧩", count: 1 },
  { id: "Coloring & Doodles", label: "Coloring & Doodles", icon: "🎨", count: 3 },
  { id: "Thinking & Focus Mats", label: "Thinking & Focus Mats", icon: "🧠", count: 2 },
  { id: "Cut & Fold Crafts", label: "Cut & Fold Crafts", icon: "✂️", count: 2 },
  { id: "Teacher Organizers", label: "Teacher Organizers", icon: "🎒", count: 0 },
];

export const SPOTLIGHT_PRINTABLE: PrintableItem = {
  id: "spotlight-halloween-cosmic",
  slug: "halloween-cosmic-crossword-challenge",
  title: "Halloween & Cosmic Crossword Challenge",
  description:
    "Encourages vocabulary retention, contextual deductive logic, and spelling recognition. Comes with both student worksheet and parent companion guide with extension discussion prompts.",
  category: "Puzzles & Crosswords",
  gradeLevel: "Class 1-2 (Ages 6-7)",
  ageRange: "GRADE 2 – 6+",
  pages: 1,
  fileSize: "680 KB",
  downloadUrl: "/api/printables/halloween-cosmic-crossword-challenge/pdf",
  worksheetFile: "OrionKids_20_Grid_Drawing_Rocket.pdf",
  coverImage: "/printables-images/img6.jpeg",
  blogSlug: "why-marks-alone-are-not-enough-in-todays-education-system",
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
    description: "Explore nocturnal wings and moon shadows with visual motor tracing and dot-to-dot star mapping.",
    category: "Coloring & Doodles",
    gradeLevel: "Pre-K & K (Ages 4-5)",
    ageRange: "Grades K – 3",
    pages: 1,
    fileSize: "690 KB",
    downloadUrl: "/api/printables/bats-night-flyers/pdf",
    worksheetFile: "OrionKids_01_Join_the_Stars_Orion.pdf",
    coverImage: "/printables-images/image1.jpeg",
    blogSlug: "why-marks-alone-are-not-enough-in-todays-education-system",
    previewType: "bats",
    accentColor: "#60A5FA",
    tags: ["Nocturnal Animals", "Fine Motor", "Constellations"],
    isFeatured: true,
  },
  {
    id: "featured-2",
    slug: "cosmic-word-search",
    title: "Cosmic Word Search",
    description: "Navigate cosmic paths and interstellar planetary coordinates with spatial labyrinth tracking.",
    category: "Puzzles & Crosswords",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Grades 1 – 6+",
    pages: 1,
    fileSize: "720 KB",
    downloadUrl: "/api/printables/cosmic-word-search/pdf",
    worksheetFile: "OrionKids_26_Maze_Astronaut_to_the_Star.pdf",
    coverImage: "/printables-images/image3.jpeg",
    blogSlug: "preparing-children-for-the-future-beyond-academics",
    previewType: "crossword",
    accentColor: "#34D399",
    tags: ["Word Search", "Spatial Navigation", "Astronaut"],
    isFeatured: true,
  },
  {
    id: "featured-3",
    slug: "halloween-crossword",
    title: "Halloween Crossword",
    description: "Clues across and down designed to build clue deduction, friendly character invention and vocabulary.",
    category: "Puzzles & Crosswords",
    gradeLevel: "Class 3-4 (Ages 8-9)",
    ageRange: "Grades 2 – 6+",
    pages: 1,
    fileSize: "710 KB",
    downloadUrl: "/api/printables/halloween-crossword/pdf",
    worksheetFile: "OrionKids_04_The_Monster_Next_Door.pdf",
    coverImage: "/printables-images/image2.jpeg",
    blogSlug: "challenges-teachers-face-in-understanding-each-childs-learning-needs",
    previewType: "crossword",
    accentColor: "#A78BFA",
    tags: ["Crossword", "Spooky Fun", "Creativity"],
    isFeatured: true,
  },
  {
    id: "featured-4",
    slug: "word-scramble",
    title: "Word Scramble",
    description: "Dyslexia-friendly anagrams designed for rapid phonemic flexibility and dice storytelling.",
    category: "Thinking & Focus Mats",
    gradeLevel: "Class 3-4 (Ages 8-9)",
    ageRange: "Grades 2 – 6+",
    pages: 1,
    fileSize: "690 KB",
    downloadUrl: "/api/printables/word-scramble/pdf",
    worksheetFile: "OrionKids_15_Story_Dice_Who_Where_What.pdf",
    coverImage: "/printables-images/img6.jpeg",
    blogSlug: "how-cognitive-skills-shape-your-childs-learning-journey",
    previewType: "scramble",
    accentColor: "#F472B6",
    tags: ["Scramble", "Phonics", "Story Dice"],
    isFeatured: true,
  },
  {
    id: "featured-5",
    slug: "halloween-candy",
    title: "Halloween Candy",
    description: "High-contrast eco-save outlines with tactile candy shapes and geometric transformations.",
    category: "Coloring & Doodles",
    gradeLevel: "All Grades",
    ageRange: "All Grades (Pre-K+)",
    pages: 1,
    fileSize: "700 KB",
    downloadUrl: "/api/printables/halloween-candy/pdf",
    worksheetFile: "OrionKids_23_Shape_Surprise.pdf",
    coverImage: "/printables-images/image4.jpg",
    blogSlug: "10-simple-ways-to-build-problem-solving-skills-at-home",
    previewType: "candy",
    accentColor: "#FBBF24",
    tags: ["Coloring", "Eco-Save", "Geometric Shapes"],
    isFeatured: true,
  },
];

export const ALL_ACTIVITY_ITEMS: PrintableItem[] = [
  {
    id: "item-1",
    slug: "all-about-me-im-a-star",
    title: "All About Me: I'm a Star!",
    description: "Social-emotional self-discovery mat where children draw their self-portrait, express strengths, and identify personal passions.",
    category: "Thinking & Focus Mats",
    subcategory: "SOCIAL-EMOTIONAL (SEL)",
    subcategoryColor: "text-[#6366F1]",
    gradeLevel: "Pre-K & K (Ages 4-5)",
    ageRange: "Pre-K – 2",
    pages: 1,
    fileSize: "670 KB",
    downloadUrl: "/api/printables/all-about-me-im-a-star/pdf",
    worksheetFile: "OrionKids_02_All_About_Me_Im_a_Star.pdf",
    coverImage: "/printables-images/img4.jpeg",
    cardImage: "/printables-images/img4.jpeg",
    printCountText: "4.1k prints",
    previewType: "doodle",
    badgeLabel: "SEL",
    badgeIcon: "⭐",
    badgeBg: "bg-[#7C3AED]",
    accentColor: "#7C3AED",
    tags: ["Self-Identity", "SEL", "Strengths", "Self-Portrait"],
    downloadsCount: 4100,
  },
  {
    id: "item-2",
    slug: "superhero-trading-card-creator",
    title: "Superhero Trading Card Creator",
    description: "Cut and fold printable trading card for designing an original hero, defining superpowers, origin, and stats.",
    category: "Cut & Fold Crafts",
    subcategory: "CREATIVE DESIGN",
    subcategoryColor: "text-[#059669]",
    gradeLevel: "Class 3-4 (Ages 8-9)",
    ageRange: "Class 2 – 5",
    pages: 1,
    fileSize: "675 KB",
    downloadUrl: "/api/printables/superhero-trading-card-creator/pdf",
    worksheetFile: "OrionKids_03_Superhero_Trading_Card.pdf",
    coverImage: "/printables-images/img5.jpeg",
    cardImage: "/printables-images/img5.jpeg",
    printCountText: "2.8k prints",
    previewType: "grid",
    badgeLabel: "CREATIVITY",
    badgeIcon: "⚡",
    badgeBg: "bg-[#059669]",
    accentColor: "#059669",
    tags: ["Superhero", "Trading Card", "Creative Writing", "Craft"],
    downloadsCount: 2800,
  },
  {
    id: "item-3",
    slug: "the-friendly-monster-next-door",
    title: "The Friendly Monster Next Door",
    description: "Imaginative character design prompt turning potential fears into playful friendly neighborhood creatures.",
    category: "Coloring & Doodles",
    subcategory: "DIVERGENT THINKING",
    subcategoryColor: "text-[#D97706]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "670 KB",
    downloadUrl: "/api/printables/the-friendly-monster-next-door/pdf",
    worksheetFile: "OrionKids_04_The_Monster_Next_Door.pdf",
    coverImage: "/printables-images/image2.jpeg",
    cardImage: "/printables-images/image2.jpeg",
    printCountText: "1.9k prints",
    previewType: "doodle",
    badgeLabel: "IMAGINATION",
    badgeIcon: "👾",
    badgeBg: "bg-[#0D9488]",
    accentColor: "#0D9488",
    tags: ["Creature Design", "Story Starter", "Divergent Thinking"],
    downloadsCount: 1900,
  },
  {
    id: "item-4",
    slug: "my-magical-pet-mythical-creature",
    title: "My Magical Pet: Mythical Creature",
    description: "Invent a magical companion animal with special powers, unique diet, and habitat requirements.",
    category: "Coloring & Doodles",
    subcategory: "CREATIVE SYNTHESIS",
    subcategoryColor: "text-[#8B5CF6]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "680 KB",
    downloadUrl: "/api/printables/my-magical-pet-mythical-creature/pdf",
    worksheetFile: "OrionKids_05_My_Magical_Pet.pdf",
    coverImage: "/printables-images/image1.jpeg",
    cardImage: "/printables-images/image1.jpeg",
    printCountText: "3.5k prints",
    previewType: "doodle",
    badgeLabel: "SYNTHESIS",
    badgeIcon: "🦄",
    badgeBg: "bg-[#8B5CF6]",
    accentColor: "#8B5CF6",
    tags: ["Magical Pet", "Mythical Creature", "Creativity", "Writing"],
    downloadsCount: 3500,
  },
  {
    id: "item-5",
    slug: "alien-explorer-interstellar-rover",
    title: "Alien Explorer: Interstellar Rover",
    description: "Design an extraterrestrial explorer rover navigating distant exoplanets and terrain.",
    category: "Puzzles & Crosswords",
    subcategory: "SPACE SCIENCE",
    subcategoryColor: "text-[#0284C7]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 5",
    pages: 1,
    fileSize: "690 KB",
    downloadUrl: "/api/printables/alien-explorer-interstellar-rover/pdf",
    worksheetFile: "OrionKids_06_Alien_Explorer.pdf",
    coverImage: "/printables-images/img6.jpeg",
    cardImage: "/printables-images/img6.jpeg",
    printCountText: "2.1k prints",
    previewType: "grid",
    badgeLabel: "SPACE",
    badgeIcon: "🚀",
    badgeBg: "bg-[#0284C7]",
    accentColor: "#0284C7",
    tags: ["Space Rover", "Exoplanets", "Science", "Engineering"],
    downloadsCount: 2100,
  },
  {
    id: "item-6",
    slug: "my-dream-treehouse-architectural-blueprint",
    title: "My Dream Treehouse: Architectural Blueprint",
    description: "Architectural blueprint layout challenging kids to plan floor levels, ladder access, secret trapdoors, and canopy lookouts.",
    category: "Thinking & Focus Mats",
    subcategory: "SPATIAL ARCHITECTURE",
    subcategoryColor: "text-[#D97706]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "685 KB",
    downloadUrl: "/api/printables/my-dream-treehouse-architectural-blueprint/pdf",
    worksheetFile: "OrionKids_08_My_Dream_Treehouse.pdf",
    coverImage: "/printables-images/img7.jpeg",
    cardImage: "/printables-images/img7.jpeg",
    printCountText: "2.5k prints",
    previewType: "tracker",
    badgeLabel: "ARCHITECTURE",
    badgeIcon: "🌳",
    badgeBg: "bg-[#D97706]",
    accentColor: "#D97706",
    tags: ["Treehouse", "Blueprint", "Spatial Planning", "Design"],
    downloadsCount: 2500,
  },
  {
    id: "item-7",
    slug: "story-dice-who-where-what",
    title: "Story Dice: Who, Where & What",
    description: "Cut, fold, and roll three custom dice to generate unexpected story prompts and spontaneous creative narratives.",
    category: "Cut & Fold Crafts",
    subcategory: "LANGUAGE FLUENCY",
    subcategoryColor: "text-[#EA580C]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "675 KB",
    downloadUrl: "/api/printables/story-dice-who-where-what/pdf",
    worksheetFile: "OrionKids_15_Story_Dice_Who_Where_What.pdf",
    coverImage: "/printables-images/image3.jpeg",
    cardImage: "/printables-images/image3.jpeg",
    printCountText: "4.4k prints",
    previewType: "scramble",
    badgeLabel: "LANGUAGE",
    badgeIcon: "🎲",
    badgeBg: "bg-[#EA580C]",
    accentColor: "#EA580C",
    tags: ["Story Dice", "Creative Writing", "Language Fluency", "Roll and Write"],
    downloadsCount: 4400,
  },
  {
    id: "item-8",
    slug: "my-funny-day-comic-strip-4-panels",
    title: "My Funny Day Comic Strip: 4 Panels",
    description: "Four blank panels with speech and thought bubbles for illustrating a humorous real-life or imaginary everyday situation.",
    category: "Coloring & Doodles",
    subcategory: "SEQUENTIAL ART",
    subcategoryColor: "text-[#9333EA]",
    gradeLevel: "Class 1-2 (Ages 6-7)",
    ageRange: "Class 1 – 4",
    pages: 1,
    fileSize: "670 KB",
    downloadUrl: "/api/printables/my-funny-day-comic-strip-4-panels/pdf",
    worksheetFile: "OrionKids_16_My_Funny_Day_Comic_Strip.pdf",
    coverImage: "/printables-images/image4.jpg",
    cardImage: "/printables-images/image4.jpg",
    printCountText: "3.8k prints",
    previewType: "doodle",
    badgeLabel: "COMIC",
    badgeIcon: "💬",
    badgeBg: "bg-[#9333EA]",
    accentColor: "#9333EA",
    tags: ["Comic Strip", "Speech Bubbles", "Sequential Art", "Humor"],
    downloadsCount: 3800,
  },
];

/**
 * Server/Client Data Fetcher for Printables
 */
export async function getPrintablesData(
  filters?: PrintablesFilterParams
): Promise<PrintablesData> {
  const apiUrl = process.env.BACKEND_API_URL;

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

  if (filters?.category && !filters.category.startsWith("All Printables")) {
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

/**
 * Resolves a single printable item by its slug.
 */
export async function getPrintableBySlug(
  slug: string
): Promise<PrintableItem | undefined> {
  if (SPOTLIGHT_PRINTABLE.slug === slug) {
    return SPOTLIGHT_PRINTABLE;
  }

  const featuredMatch = FEATURED_PRINTABLES.find((f) => f.slug === slug);
  if (featuredMatch) {
    return featuredMatch;
  }

  return ALL_ACTIVITY_ITEMS.find((item) => item.slug === slug);
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
