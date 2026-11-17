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
      className={`w-full min-h-[35px] py-1 ${bg} border-b-[3px] border-[#0A1D3D] flex items-center justify-center px-2 sm:px-4 select-none overflow-hidden`}
      style={{
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Link
        href={href}
        className="flex items-center justify-center text-[10px] xs:text-[11.5px] sm:text-[13px] font-[800] tracking-[0.2px] sm:tracking-[0.4px] leading-tight sm:leading-none uppercase text-[#0A1D3D] hover:opacity-90 transition-opacity text-center truncate max-w-full"
      >
        <span className="truncate">{text}</span>
      </Link>
    </aside>
  );
}
