import { BlogPost, BlogCategoryMeta, BlogData, BlogFilterParams } from "@/types/blog";

export const BLOG_CATEGORIES: BlogCategoryMeta[] = [
  { id: "All Stories", label: "All Stories", icon: "🚀" },
  { id: "Cognitive Play", label: "Cognitive Play", icon: "🧠" },
  { id: "Parent Tips", label: "Parent Tips", icon: "💛" },
  { id: "In the Classroom", label: "In the Classroom", icon: "🎒" },
  { id: "Screen-Time Balance", label: "Screen-Time Balance", icon: "⏳" },
  { id: "Printables & Crafts", label: "Printables & Crafts", icon: "🎨" },
];

export const FEATURED_POST: BlogPost = {
  id: "featured-simon-says",
  slug: "why-simon-says-is-executive-function-superhero",
  title: 'Why "Simon Says" is Actually an Executive Function Superhero',
  highlightTitleWord: '"Simon Says"',
  subtitle: "Neuroscience of Play",
  topicTag: "NEUROSCIENCE OF PLAY",
  category: "Cognitive Play",
  categoryBadge: "EXECUTIVE FUNCTIONS",
  categoryBadgeColor: "blue",
  readTime: "5 Min Read",
  imageUrl: "/images/blog/simon-says-hero.jpg",
  author: {
    name: "Dr. Maya Patel",
    title: "Child Cognitive Specialist • NeuroPlay Fellow",
    avatarUrl: "/images/blog/classroom-teacher.jpg",
    badge: "NeuroPlay Fellow",
  },
  isFeatured: true,
  featuredBadge: "FEATURED DEEP-DIVE QUEST",
  excerpt:
    "Before your child can master algebra or navigate social conflict, their brain must master one foundational skill: inhibitory control. We break down the clinical neural circuitry activated every time a 6-year-old stops their hand mid-air.",
  keyDiscoveries: [
    "The 300-millisecond pause that triggers prefrontal cortex myelination.",
    "Why classic physics freeze games outperform digital reflex apps by 40%.",
    'Includes the printable "Simon Says: Space Explorer Edition" mini-deck.',
  ],
  likesCount: "1.2k Likes",
  downloadsCount: "892 Downloads",
  publishedAt: "2026-10-15",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "bedtime-pattern-hack-kitchen-sorting",
    title: "The Bedtime Pattern Hack: Kitchen Sorting Builds Calculus Instincts",
    topicTag: "EARLY MATH HACK",
    category: "Cognitive Play",
    categoryBadge: "REASONING & LOGIC",
    categoryBadgeColor: "teal",
    readTime: "3 min read",
    imageUrl: "/images/blog/kitchen-sorting.jpg",
    excerpt:
      "How 5 minutes categorizing silverware or matching sock pairs activates algebraic classification schemas before primary school.",
    author: {
      name: "Elena Rostova, M.Ed",
      title: "Early Childhood Mathematics Specialist",
      initials: "EK",
    },
    publishedAt: "2026-10-18",
  },
  {
    id: "post-2",
    slug: "decoding-the-thinking-report",
    title: "Decoding the Thinking Report: What Focus Scores Actually Mean",
    topicTag: "DIAGNOSTIC BREAKDOWN",
    category: "Parent Tips",
    categoryBadge: "PARENT GUIDES",
    categoryBadgeColor: "cyan",
    readTime: "6 min read",
    imageUrl: "/images/blog/thinking-report.jpg",
    excerpt:
      "Why a dip in attention stamina during quest level 4 is often a healthy sign of divergent problem solving rather than distraction.",
    author: {
      name: "Dr. Julian Moore",
      title: "Pediatric Neuropsychologist",
      initials: "JM",
    },
    publishedAt: "2026-10-16",
  },
  {
    id: "post-3",
    slug: "beyond-rote-memory-tactile-games",
    title: "Beyond Rote Memory: 4 Tactile Games That Expand Working Memory",
    topicTag: "NO FLASHCARDS NEEDED",
    category: "Cognitive Play",
    categoryBadge: "MEMORY & RECALL",
    categoryBadgeColor: "purple",
    readTime: "4 min read",
    imageUrl: "/images/blog/tactile-memory.jpg",
    excerpt:
      "Swap repetitive flashcard drills with physical token hidden quests that double spatial cognitive retention in just two weeks.",
    author: {
      name: "Dr. Sarah Lin",
      title: "Cognitive Development Researcher",
      initials: "SL",
    },
    publishedAt: "2026-10-14",
  },
  {
    id: "post-4",
    slug: "why-failure-is-secret-sauce",
    title: "Why Failure is the Secret Sauce: Teaching Kids to Celebrate 'Oops!'",
    topicTag: "RESILIENCE TRAINING",
    category: "Parent Tips",
    categoryBadge: "GROWTH MINDSET",
    categoryBadgeColor: "red",
    readTime: "5 min read",
    imageUrl: "/images/blog/growth-mindset.jpg",
    excerpt:
      "Neuroplasticity peaks right after an error is detected. Here is how our game engine re-frames missed puzzle targets into badge-worthy...",
    author: {
      name: "Talia Alvarez, Ed.S",
      title: "Social-Emotional Learning Consultant",
      initials: "TA",
    },
    publishedAt: "2026-10-12",
  },
  {
    id: "post-5",
    slug: "ask-a-teacher-attention-in-class-1",
    title: "Ask a Teacher: What Does Attention Really Look Like in Class 1?",
    topicTag: "FROM THE FIELD",
    category: "In the Classroom",
    categoryBadge: "EDUCATOR CORNER",
    categoryBadgeColor: "indigo",
    readTime: "7 min read",
    imageUrl: "/images/blog/classroom-teacher.jpg",
    excerpt:
      "Real classroom observations from 24 veteran elementary teachers about wiggly listening, hyper-focus bursts, and auditory processing...",
    author: {
      name: "Marcus Bennett, Grade 1 Lead",
      title: "Elementary Educator & Curriculum Coach",
      initials: "MB",
    },
    publishedAt: "2026-10-10",
  },
  {
    id: "post-6",
    slug: "10-minute-outdoor-quest-problem-solving",
    title: "The 10-Minute Outdoor Quest: Turn Park Walks into Problem Solving",
    topicTag: "WEEKEND EXPEDITION",
    category: "Screen-Time Balance",
    categoryBadge: "OFFLINE ACTIVITIES",
    categoryBadgeColor: "mint",
    readTime: "4 min read",
    imageUrl: "/images/blog/outdoor-quest.jpg",
    excerpt:
      "Three simple observation prompts you can give your explorer at the trailhead that stimulate sensory integration and pattern recognition.",
    author: {
      name: "Claire Nygard, Eco-Educator",
      title: "Outdoor Experiential Learning Specialist",
      initials: "CN",
    },
    publishedAt: "2026-10-08",
  },
];

/**
 * Server component data provider for Blog page.
 * Ready for future backend API fetch or database integration.
 */
export async function getBlogData(filters?: BlogFilterParams): Promise<BlogData> {
  // If backend API URL is configured in the future:
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // if (apiUrl) {
  //   try {
  //     const res = await fetch(`${apiUrl}/api/blog`, { next: { revalidate: 3600 } });
  //     if (res.ok) return await res.json();
  //   } catch (err) {
  //     console.error("Failed to fetch blog posts from backend, using fallback:", err);
  //   }
  // }

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
    totalCount: 48, // Matches mockup "Showing 6 of 48 Research Sparks"
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (FEATURED_POST.slug === slug) return FEATURED_POST;
  const match = BLOG_POSTS.find((p) => p.slug === slug);
  return match || null;
}
