"use client";

import React from "react";
import Image from "next/image";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";
const NAVY = "#0A1D3D";
const HAND = "'Segoe Print', 'Comic Sans MS', 'Bradley Hand', cursive";

// OrionKids logo
const LOGO_SRC = "/svg/Logo.svg";

/* ------------------------------------------------------------------ */
/*  Doodle wall                                                         */
/* ------------------------------------------------------------------ */

type DoodleKind =
  | "star" | "smile" | "loop" | "tent" | "plane" | "people" | "yo" | "heart"
  | "hello" | "thanks" | "flower" | "wow" | "cloud" | "names" | "gilar"
  | "spiral" | "redheart" | "caret" | "scribble" | "fener";

/** Tiny hand-drawn doodles (inline SVG, 100 x 100 canvas). */
function Doodle({ kind }: { kind: DoodleKind }) {
  const s = { fill: "none", stroke: "#1f2937", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const t = { fontFamily: HAND, fill: "#374151" };
  let body: React.ReactNode = null;
  switch (kind) {
    case "star":
      body = <path d="M50 22 L58 42 L80 44 L63 58 L68 80 L50 68 L32 80 L37 58 L20 44 L42 42 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth={3} strokeLinejoin="round" />;
      break;
    case "smile":
      body = (<><circle cx="42" cy="52" r="24" {...s} /><circle cx="34" cy="46" r="2.5" fill="#1f2937" /><circle cx="50" cy="46" r="2.5" fill="#1f2937" /><path d="M32 58 Q42 68 52 58" {...s} /><path d="M72 40 L76 66 M66 44 L76 66 M82 44 L76 66" stroke="#F59E0B" strokeWidth={3} strokeLinecap="round" fill="none" /></>);
      break;
    case "loop":
      body = <path d="M30 60 C20 40 55 25 65 45 C75 65 40 78 38 55 C36 40 58 40 56 52" {...s} />;
      break;
    case "tent":
      body = <path d="M50 24 L22 76 L78 76 Z M50 24 L50 76 M38 76 L50 52 L62 76" {...s} />;
      break;
    case "plane":
      body = (<><path d="M14 52 L86 52 M22 62 L78 62" {...s} /><path d="M26 30 L70 74 M70 30 L26 74" stroke="#DC2626" strokeWidth={4} strokeLinecap="round" fill="none" /></>);
      break;
    case "people":
      body = (<>{[22, 42, 62, 82].map((x) => (<g key={x}><circle cx={x} cy="38" r="5" {...s} strokeWidth={2} /><path d={`M${x} 43 V60 M${x - 8} 50 H${x + 8} M${x} 60 L${x - 6} 74 M${x} 60 L${x + 6} 74`} {...s} strokeWidth={2} /></g>))}<path d="M14 82 H86" {...s} strokeWidth={2} stroke="#EF4444" /></>);
      break;
    case "yo":
      body = <text x="14" y="64" fontSize="42" {...t}>YO!</text>;
      break;
    case "heart":
      body = (<><path d="M50 74 C20 54 24 30 40 34 C46 36 50 42 50 42 C50 42 54 36 60 34 C76 30 80 54 50 74 Z" fill="#F9A8D4" stroke="#EC4899" strokeWidth={3} strokeLinejoin="round" /><path d="M34 40 C38 36 44 38 46 44" stroke="#60A5FA" strokeWidth={3} fill="none" strokeLinecap="round" /></>);
      break;
    case "hello":
      body = <text x="8" y="60" fontSize="30" fill="#34D399" fontFamily={HAND}>Hello</text>;
      break;
    case "thanks":
      body = (<><text x="8" y="40" fontSize="24" {...t}>hi thanks</text><text x="8" y="66" fontSize="24" {...t}>for wr</text></>);
      break;
    case "flower":
      body = (<><circle cx="40" cy="38" r="9" fill="#F9A8D4" stroke="#EC4899" strokeWidth={2} /><circle cx="40" cy="38" r="3" fill="#FCD34D" /><path d="M40 47 C40 62 36 70 30 78 M40 60 C54 58 62 48 66 38 C54 38 44 48 40 60" stroke="#22C55E" strokeWidth={3} fill="none" strokeLinecap="round" /></>);
      break;
    case "wow":
      body = (<><text x="8" y="44" fontSize="24" {...t}>WOW</text><path d="M60 54 C48 46 50 38 56 40 C60 41 60 44 60 44 C60 44 62 40 66 40 C72 38 72 48 60 54 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth={2} /></>);
      break;
    case "cloud":
      body = <path d="M30 70 C16 70 16 48 32 48 C32 32 56 30 62 46 C78 44 82 70 66 70 Z" {...s} />;
      break;
    case "names":
      body = (<><text x="6" y="34" fontSize="20" {...t}>Sya Jan</text><text x="30" y="58" fontSize="20" {...t}>Nama</text><text x="14" y="82" fontSize="20" {...t}>Jkw</text></>);
      break;
    case "gilar":
      body = <text x="10" y="58" fontSize="34" fontStyle="italic" {...t}>Gilar</text>;
      break;
    case "spiral":
      body = <path d="M52 20 C30 24 28 44 48 46 C70 48 66 70 44 72 C30 74 26 62 40 60 M62 30 L58 78" {...s} />;
      break;
    case "redheart":
      body = <path d="M50 76 C16 54 24 24 42 30 C48 32 50 38 50 38 C50 38 52 32 58 30 C76 24 84 54 50 76 Z" fill="#EF4444" />;
      break;
    case "caret":
      body = <path d="M40 60 L52 46 L62 62" {...s} strokeWidth={2.5} />;
      break;
    case "scribble":
      body = <path d="M24 56 C28 28 62 26 70 46 C76 62 52 74 42 60 C34 48 54 42 60 54 M44 40 C50 30 64 34 62 44" {...s} />;
      break;
    case "fener":
      body = (<><text x="4" y="40" fontSize="26" fill="#60A5FA" fontFamily={HAND}>Fener</text><text x="4" y="72" fontSize="26" fill="#34D399" fontFamily={HAND}>bahce</text></>);
      break;
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      {body}
    </svg>
  );
}

// Card centres measured from the Figma export. x/y are in px of the 1240 x 200 strip.
type CardSpec = { x: number; y: number; rot: number; kind: DoodleKind };
const STRIP_W = 1240;
const STRIP_H = 200;
const CARD_W = 73;
const CARD_H = 84;

const CARDS: CardSpec[] = [
  { x: 42.5, y: 151.5, rot: -90, kind: "star" },
  { x: 126.5, y: 143, rot: 0, kind: "smile" },
  { x: 200, y: 85.5, rot: -45, kind: "loop" },
  { x: 292, y: 143, rot: 0, kind: "tent" },
  { x: 303, y: 53, rot: 0, kind: "plane" },
  { x: 385, y: 143.5, rot: 0, kind: "people" },
  { x: 458, y: 53.5, rot: 0, kind: "yo" },
  { x: 464.5, y: 144, rot: 0, kind: "heart" },
  { x: 575.5, y: 151.5, rot: -90, kind: "hello" },
  { x: 659, y: 143.5, rot: 0, kind: "thanks" },
  { x: 662, y: 53.5, rot: 0, kind: "flower" },
  { x: 738, y: 53.5, rot: -2, kind: "wow" },
  { x: 775, y: 143.5, rot: 0, kind: "cloud" },
  { x: 820.5, y: 54.5, rot: 9, kind: "names" },
  { x: 903, y: 77.5, rot: -15, kind: "gilar" },
  { x: 982.5, y: 154, rot: -90, kind: "spiral" },
  { x: 990.5, y: 70, rot: 0, kind: "redheart" },
  { x: 1065.5, y: 143.5, rot: 0, kind: "caret" },
  { x: 1128.5, y: 73, rot: -45, kind: "scribble" },
  { x: 1203, y: 143.5, rot: 0, kind: "fener" },
];

function DoodleCard({ spec }: { spec: CardSpec }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${(spec.x / STRIP_W) * 100}%`,
        top: `${(spec.y / STRIP_H) * 100}%`,
        width: `${(CARD_W / STRIP_W) * 100}%`,
        aspectRatio: `${CARD_W} / ${CARD_H}`,
        transform: `translate(-50%, -50%) rotate(${spec.rot}deg)`,
      }}
    >
      <div
        className="w-full h-full flex flex-col items-center bg-[#F5F0E8]"
        style={{
          borderRadius: "5%",
          padding: "8% 8% 0",
          boxShadow: "0 1px 2px rgba(10,29,61,0.18), 0 4px 10px rgba(10,29,61,0.10)",
        }}
      >
        <div className="w-full bg-[#F6F6F6] overflow-hidden" style={{ aspectRatio: "1 / 1", borderRadius: "3%" }}>
          <Doodle kind={spec.kind} />
        </div>
        <span
          className="flex-1 flex items-center text-[#A39B8E]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.5cqw", lineHeight: 1 }}
        >
          Anonymous
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Link columns                                                        */
/* ------------------------------------------------------------------ */

const ExternalArrow = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M3 9L9 3M4.5 3H9v4.5" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const linkClass =
  "inline-flex items-center gap-1.5 text-[14px] leading-5 uppercase text-[#0A1D3D] hover:underline underline-offset-4";

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-[14px]">
      <span
        className="text-[14px] leading-5 uppercase text-[#6739B7] mb-[3px]"
        style={{ fontFamily: INTER }}
      >
        {title}
      </span>
      {links.map((l) => (
        <a key={l.label} href={l.href} className={linkClass} style={{ fontFamily: INTER }}>
          <span>{l.label}</span>
          {l.external && <ExternalArrow />}
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

export function FooterSection() {
  return (
    <footer
      id="footer-section"
      className="relative w-full bg-[#DAF5E9] text-[#0A1D3D] overflow-hidden select-none pt-10 pb-[27px] scroll-mt-16"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[44px]">
        {/* Divider */}
        <div className="w-full border-t-[1.5px] border-[#CFE9DD]" />

        {/* ================= TOP: tagline + links ================= */}
        <div className="mt-10 lg:mt-[60px] flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          {/* Left: pill, headline, logo */}
          <div className="flex flex-col items-start">
            <div
              className="inline-flex items-center gap-2 h-8 pl-[11px] pr-[14px] rounded-full border border-white/75 bg-white/25 text-[12px] uppercase text-[#0A1D3D] whitespace-nowrap"
              style={{ fontFamily: INTER }}
            >
              <span className="w-[7px] h-[7px] rounded-full bg-[#E0D54F] shrink-0" />
              <span>Where every kids is a star</span>
            </div>

            <h2
              className="mt-6 text-[#0A1D3D]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "clamp(30px, 6vw, 46px)",
                lineHeight: "120%",
                letterSpacing: "-0.065em",
              }}
            >
              <span className="block">Before you go, doodle something fun!</span>
              <span className="block">Tap the star to start your adventure.</span>
            </h2>

            <Image
              src={LOGO_SRC}
              alt="OrionKids — Where Every Kid Is a Star"
              width={141}
              height={74}
              unoptimized
              className="mt-[27px] w-[141px] h-auto"
            />
          </div>

          {/* Right: link columns */}
          <nav aria-label="Footer" className="flex gap-x-12">
            <LinkColumn
              title="(Explore)"
              links={[
                { label: "Our approach", href: "#" },
                { label: "For school", href: "#" },
                { label: "For parents", href: "#" },
                { label: "Blog", href: "#" },
              ]}
            />
            <LinkColumn
              title="(Contact)"
              links={[
                { label: "LinkedIn", href: "#", external: true },
                { label: "Email", href: "#", external: true },
                { label: "Instagram", href: "#", external: true },
              ]}
            />
          </nav>
        </div>

        {/* ================= DOODLE WALL (scales as one piece) ================= */}
        <div
          className="relative w-full mt-4"
          style={{ containerType: "inline-size", aspectRatio: `${STRIP_W} / ${STRIP_H}` }}
          aria-hidden="true"
        >
          {CARDS.map((c, i) => (
            <DoodleCard key={i} spec={c} />
          ))}
        </div>

        {/* ================= LEGAL ROW ================= */}
        <div
          className="mt-[55px] lg:px-[44px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] leading-3 text-[#0A1D3D]/85"
          style={{ fontFamily: INTER }}
        >
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd.</span>
          <span>Assessment insights for learning and development. Not clinical diagnosis.</span>
        </div>
      </div>
    </footer>
  );
}
