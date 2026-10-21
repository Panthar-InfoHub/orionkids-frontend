"use client";

import React from "react";
import Link from "next/link";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

const NAVY = "#1B204A";

export function ClosingCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#E8F9F0] py-14 sm:py-20 p-2">
      {/* Soft pink glow peeking out behind the bottom-right corner of the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 sm:bottom-12 right-0 sm:right-10 w-[380px] h-[380px] rounded-full bg-[#F9A8D4]/50 blur-[80px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[88px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-[28px] bg-[#0F223D] p-8 sm:p-10 lg:p-14 shadow-[4px_6px_0px_#1B204A] border-2 border-[#1B204A]">
          {/* Copy */}
          <div className="max-w-[620px]">
            <span
              className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-[#FFCA28] uppercase select-none"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "11px",
                lineHeight: "16px",
                letterSpacing: "-0.2px",
                color: NAVY,
              }}
            >
              <span
                className="w-[3px] h-3 rounded-sm shrink-0"
                style={{ backgroundColor: NAVY }}
                aria-hidden="true"
              />
              Let&rsquo;s Connect
            </span>

            <h2
              className="mt-5 text-white text-[28px] leading-[34px] sm:text-[32px] sm:leading-[38px] lg:text-[36px] lg:leading-[40px]"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Whether you are a parent, an educator, a school leader or a
              researcher, we would love to hear from you.
            </h2>

            <p
              className="mt-3 text-white/80"
              style={{
                fontFamily: INTER,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Learn how OrionKids brings clarity to cognitive development, or
              schedule a warm walkthrough tailored to your family or school.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 shrink-0">
            <Link
              href="/#approach"
              className="inline-flex items-center justify-center h-[52px] px-6 rounded-xl bg-[#FFCA28] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "-0.3px",
                color: NAVY,
              }}
            >
              Discover Our Approach
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center h-[52px] px-6 rounded-xl bg-white transition-transform hover:-translate-y-0.5"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "-0.3px",
                color: NAVY,
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
