import { Navbar } from "@/components/layout/navbar";
import { PageCurtain } from "@/components/layout/page-curtain";
import { FooterSection } from "@/components/layout/footer-section";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export interface InfoSection {
  heading: string;
  paragraphs: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated?: string;
  sections: InfoSection[];
}

/**
 * Shared layout for simple text pages (help, contact, privacy, terms):
 * hero heading followed by a readable column of titled sections.
 */
export function InfoPage({ eyebrow, title, intro, lastUpdated, sections }: InfoPageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-white selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      <PageCurtain>
        <Navbar />

        {/* Hero */}
        <section className="w-full bg-[#E0F2FE] border-b-[3px] border-[#0A1D3D]">
          <div className="max-w-[880px] mx-auto px-4 sm:px-8 py-14 sm:py-20">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0A1D3D] bg-white text-[#0A1D3D] uppercase text-xs font-bold"
              style={{ fontFamily: INTER, letterSpacing: "0.2px" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD028] shrink-0" />
              <span>{eyebrow}</span>
            </div>
            <h1
              className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0A1D3D] leading-tight"
              style={{ fontFamily: JAKARTA }}
            >
              {title}
            </h1>
            <p
              className="mt-4 text-base sm:text-lg text-[#334155] leading-relaxed max-w-[680px]"
              style={{ fontFamily: INTER }}
            >
              {intro}
            </p>
            {lastUpdated && (
              <p className="mt-4 text-xs font-semibold text-[#526176]" style={{ fontFamily: INTER }}>
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="w-full">
          <div className="max-w-[880px] mx-auto px-4 sm:px-8 py-12 sm:py-16 flex flex-col gap-10">
            {sections.map((section) => (
              <article key={section.heading}>
                <h2
                  className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A1D3D]"
                  style={{ fontFamily: JAKARTA }}
                >
                  {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3" style={{ fontFamily: INTER }}>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-[15px] text-[#334155] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </PageCurtain>

      <FooterSection />
    </main>
  );
}
