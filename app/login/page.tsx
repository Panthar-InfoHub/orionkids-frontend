import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ChildDetailsForm from "@/components/ChildDetailsForm";
import HeroIllustration from "@/components/HeroIllustration";

export const metadata: Metadata = {
  title: "A Little About Your Child | OrionKids",
  description:
    "Every child is a world of potential. Let's start with a few details about your child, so their learning journey feels like their own.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* 1. Topmost line: colour #FF8CC7, height 6px */}
      <div className="w-full h-[6px] bg-[#FF8CC7]" />

      {/* 2. Navbar: Fill (1,440px), Height (98px), Border Bottom 1px, Padding L/R 88px, Gap 35px */}
      <header className="top w-full bg-white border-b border-[#E7EDF6] sticky top-0 z-30">
        <div className="top-in max-w-[1440px] w-full mx-auto h-[98px] px-4 sm:px-8 lg:px-[88px] flex items-center justify-between gap-[35px]">
          <Link href="/" className="logo flex items-center shrink-0" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={125}
              height={58}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Pill in navbar: Hug (141px), Hug (23px), Radius 100px, Padding T/B 5px, L/R 10px, bg #D8F3FF */}
          <span
            className="tag inline-flex items-center justify-center w-auto sm:w-[141px] h-[23px] rounded-[100px] bg-[#D8F3FF] px-[10px] py-[5px] text-[10px] font-extrabold uppercase tracking-wider text-[#0A1D3D] whitespace-nowrap shrink-0"
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            A WORLD OF POTENTIAL
          </span>
        </div>
      </header>

      {/* 3. Main Section: container max 1440px, padding L/R 88px */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-[88px] py-8 sm:py-12 flex-1 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[40px]">

        <section
          aria-label="Welcome"
          className="w-full lg:w-[376px] shrink-0 pt-[12px] flex flex-col gap-[28px]"
        >
          {/* Back to OrionKids link */}
          <div>
            <Link
              href="/"
              className="back inline-flex items-center gap-2 text-[13px] font-bold text-[#10345B] hover:text-[#00BCD4] transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-slate-100"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to OrionKids
            </Link>
          </div>

          <div>
            <div className="pill inline-flex items-center gap-[6px] w-auto sm:w-[238px] h-[28px] rounded-[100px] border-[1.5px] border-[#0A1D3D] bg-[#65DCAA] px-[12px] py-[7px] shadow-[2px_2px_0px_0px_#0A1D3D]">
              <span className="text-[11px] leading-none">🧩</span>
              <span
                className="text-[10px] font-black uppercase tracking-wider text-[#0A1D3D] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                SMALL DETAILS. BIG POSSIBILITIES.
              </span>
            </div>
          </div>

         
          <h1
            className="w-full max-w-[376px] font-extrabold text-[#10345B]"
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontSize: "38px",
              lineHeight: "115%",
              letterSpacing: "-1.3px",
              fontWeight: 800,
            }}
          >
            Every child is<br />
            a world of<br />
            potential.
          </h1>

        
          <p
            className="lede w-full max-w-[376px] font-normal text-[#526176]"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              fontSize: "15px",
              lineHeight: "165%",
              letterSpacing: "0%",
              fontWeight: 400,
            }}
          >
            Let&apos;s start with a few details about your child, so their learning journey feels like their own.
          </p>

          <HeroIllustration />

          <div className="lowest-div w-full max-w-[376px] bg-[#EAF7EF] rounded-[16px] p-[20px] flex flex-col gap-[10px]">
         
            <div className="flex items-center gap-[8px] w-auto sm:w-[185px] h-[20px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#10345B] shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m8.5 12.5 2.5 2.5 4.5-5" />
              </svg>
              <h4
                className="font-extrabold text-[#10345B] leading-none whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  fontWeight: 800,
                }}
              >
                A thoughtful beginning
              </h4>
            </div>

            <p
              className="w-full max-w-[336px] font-normal text-[#526176]"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: "13px",
                lineHeight: "160%",
                letterSpacing: "0%",
                fontWeight: 400,
              }}
            >
              Next, you&apos;ll review your child&apos;s profile before exploring their first playful activity.
            </p>
          </div>
        </section>

   
        <section
          aria-label="Child Details Form"
          className="w-full lg:max-w-[824px] lg:flex-1"
        >
          <ChildDetailsForm />
        </section>
      </main>

      {/* Footer matching specifications */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#526176] font-medium">
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd.</span>
          <span className="text-slate-400">
            Assessment insights for learning and development. Not clinical diagnosis.
          </span>
        </div>
      </footer>
    </div>
  );
}
