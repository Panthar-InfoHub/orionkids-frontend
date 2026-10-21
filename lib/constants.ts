export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  announcement: {
    text: string;
    href: string;
  };
  navLinks: NavLink[];
  heroBadges: {
    icon: string;
    text: string;
    bg?: string;
  }[];
}

export const SITE_CONFIG: SiteConfig = {
  name: "OrionKids",
  tagline: "FUN BRAIN LAB",
  announcement: {
    text: "🎮 BRAIN QUEST SEASON 4 IS LIVE! ⭐ UNLOCK 14 DAYS FREE PLAY! 🚀",
    href: "#quest",
  },
  navLinks: [
    { label: "Our Approach", href: "#approach" },
    { label: "About Us", href: "/about-us" },
    { label: "For Schools", href: "/for-schools" },
    { label: "For Parents", href: "/for-parents" },
    { label: "Blog", href: "/blog" },
    { label: "Printables", href: "/printables" },
  ],
  heroBadges: [
    { icon: "🎮", text: "100% Game-Based", bg: "bg-[#D8F3FF]" },
    { icon: "🤖", text: "Gentle AI Coach", bg: "bg-[#EAF7EF]" },
    { icon: "⭐", text: "Star Growth Trails", bg: "bg-[#EAF7EF]" },
  ],
};
