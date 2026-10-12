import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="w-full h-[35px] bg-[#D8F3FF] border-b-[3px] border-[#0A1D3D] flex items-center justify-center px-4 select-none overflow-hidden"
      style={{
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Link
        href={SITE_CONFIG.announcement.href}
        className="flex items-center justify-center text-[13px] font-[800] tracking-[0.4px] leading-none uppercase text-[#0A1D3D] hover:opacity-90 transition-opacity whitespace-nowrap"
        style={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.4px",
          lineHeight: "100%",
          color: "#0A1D3D",
          textTransform: "uppercase",
        }}
      >
        <span>{SITE_CONFIG.announcement.text}</span>
      </Link>
    </aside>
  );
}
