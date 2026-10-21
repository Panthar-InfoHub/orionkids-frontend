import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

interface AnnouncementBarProps {
  text?: string;
  href?: string;
  bg?: string;
}

export function AnnouncementBar({
  text = SITE_CONFIG.announcement.text,
  href = SITE_CONFIG.announcement.href,
  bg = "bg-[#D8F3FF]",
}: AnnouncementBarProps) {
  return (
    <aside
      aria-label="Announcement"
      className={`w-full h-[35px] ${bg} border-b-[3px] border-[#0A1D3D] flex items-center justify-center px-4 select-none overflow-hidden`}
      style={{
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Link
        href={href}
        className="flex items-center justify-center text-[12px] sm:text-[13px] font-[800] tracking-[0.4px] leading-none uppercase text-[#0A1D3D] hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        <span>{text}</span>
      </Link>
    </aside>
  );
}
