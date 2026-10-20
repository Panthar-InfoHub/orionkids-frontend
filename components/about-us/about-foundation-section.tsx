"use client";

import React from "react";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const INTER = "var(--font-inter), 'Inter', sans-serif";

export function AboutFoundationSection() {
  return (
    <section className="w-full bg-white border-b-2 border-[#1B204A] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[88px]">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-start max-w-[850px] mb-12 sm:mb-16">
          {/* Pill Tag */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full border-2 border-[#1B204A] bg-[#EFF2FF] text-[#1B204A] select-none shadow-[2px_2px_0px_#1B204A] mb-5"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            OUR FOUNDATION
          </div>

          {/* Heading */}
          <h2
            className="text-[34px] sm:text-[42px] lg:text-[48px] font-[800] text-[#1B204A] tracking-[-1px] leading-[1.15]"
            style={{ fontFamily: JAKARTA }}
          >
            The Story Behind OrionKids
          </h2>

          {/* Description */}
          <p
            className="mt-4 text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] font-normal text-[#475467]"
            style={{ fontFamily: INTER }}
          >
            We started with a shared realization among parents, educators, and software builders:
            cognitive growth during childhood is dynamic, personal, and profoundly shaped by everyday encouragement.
          </p>
        </div>

        {/* ================= TWO CARDS GRID (01 & 02) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8 sm:mb-10">
          
          {/* ----- CARD 01: Who we are ----- */}
          <div className="relative bg-[#FDFBF7]  rounded-[24px] p-6 sm:p-9 shadow-[4px_6px_0px_#1B204A] flex flex-col justify-between gap-8 transition-transform hover:-translate-y-1 duration-200">
            <div>
              {/* Badge 01 */}
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#FFCA28] border-2 border-[#1B204A] text-[#1B204A] font-[800] text-[13px] shadow-[2px_2px_0px_#1B204A] mb-5 select-none"
                style={{ fontFamily: JAKARTA }}
              >
                01
              </div>

              {/* Title */}
              <h3
                className="text-[24px] sm:text-[28px] font-[800] text-[#1B204A] tracking-[-0.5px] leading-tight mb-5"
                style={{ fontFamily: JAKARTA }}
              >
                Who we are
              </h3>

              {/* Body Text */}
              <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] text-[#475467]" style={{ fontFamily: INTER }}>
                <p>
                  <strong className="text-[#1B204A] font-semibold">OrionKids Digital Solutions Pvt. Ltd.</strong> is building a child-focused platform for cognitive development. It brings together structured assessment, engaging activities and clear progress reporting, so parents and educators can see development as a journey rather than a single result.
                </p>
                <p>
                  Children grow at different rates and in different ways. A single score or label rarely tells the full story. We are building OrionKids to show a fuller picture: strengths, areas for practice, and how both change over time.
                </p>
              </div>
            </div>

            {/* Bottom Tag / Footer Line */}
            <div
              className="pt-4 border-t border-[#1B204A1F] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#475467] flex items-center gap-1.5"
              style={{ fontFamily: INTER }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B204A] inline-block" />
              <span>ONLINE SCR/LIBRARY TEAM • TEACHER &amp; PARENT LED</span>
            </div>
          </div>

          {/* ----- CARD 02: Why we exist ----- */}
          <div className="relative bg-[#EFF2FF]  rounded-[24px] p-6 sm:p-9 shadow-[4px_6px_0px_#1B204A] flex flex-col justify-between gap-8 transition-transform hover:-translate-y-1 duration-200">
            <div>
              {/* Badge 02 */}
              <div
                className="inline-flex items-center justify-center w-8 h-8 rounded-[10px] bg-[#FF6B4A] border-2 border-[#1B204A] text-white font-[800] text-[13px] shadow-[2px_2px_0px_#1B204A] mb-5 select-none"
                style={{ fontFamily: JAKARTA }}
              >
                02
              </div>

              {/* Title */}
              <h3
                className="text-[24px] sm:text-[28px] font-[800] text-[#1B204A] tracking-[-0.5px] leading-tight mb-5"
                style={{ fontFamily: JAKARTA }}
              >
                Why we exist
              </h3>

              {/* Body Text */}
              <div className="flex flex-col gap-4 text-[14px] sm:text-[15px] leading-[24px] sm:leading-[26px] text-[#475467]" style={{ fontFamily: INTER }}>
                <p>
                  Parents and educators often want to support a child&apos;s thinking skills but lack a simple, trustworthy way to see where a child is today and what has changed since last month. We exist to close that gap, with experiences children enjoy and insights adults can actually use.
                </p>
              </div>
            </div>

            {/* Bottom Tag / Footer Line */}
            <div
              className="pt-4 border-t border-[#1B204A1F] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#475467] flex items-center gap-1.5"
              style={{ fontFamily: INTER }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] inline-block" />
              <span>BRIDGE BETWEEN CLASSROOM, HOME &amp; PLAY</span>
            </div>
          </div>

        </div>

        {/* ================= FULL-WIDTH BOTTOM CARD: HOW WE BUILD ================= */}
        <div
          className="relative w-full rounded-[24px] border-2 border-[#1B204A] p-6 sm:p-8 lg:p-9 shadow-[4px_6px_0px_#1B204A] flex flex-col items-start gap-4 transition-transform hover:-translate-y-0.5 duration-200"
          style={{
            background: "linear-gradient(90deg, #FFF9EA 0%, #FFFFFF 50%, #EDF7FF 100%)",
          }}
        >
          {/* Pill Tag */}
          <div
            className="inline-flex items-center px-3.5 py-1 rounded-[6px] bg-[#1B204A] text-white text-[10px] sm:text-[11px] font-[800] tracking-[0.8px] uppercase select-none"
            style={{ fontFamily: JAKARTA }}
          >
            SECTION 03 • CRAFT &amp; PRINCIPLES
          </div>

          {/* Heading */}
          <h3
            className="text-[24px] sm:text-[28px] font-[800] text-[#1B204A] tracking-[-0.5px] leading-tight"
            style={{ fontFamily: JAKARTA }}
          >
            How we build
          </h3>

          {/* Body */}
          <p
            className="text-[14px] sm:text-[16px] leading-[24px] sm:leading-[28px] text-[#475467] max-w-[1000px] font-normal"
            style={{ fontFamily: INTER }}
          >
            We are taking a long-term view. That means responsible measurement, child-friendly design,
            meaningful progress tracking, and continuous improvement through research and collaboration with experts.
          </p>
        </div>

      </div>
    </section>
  );
}
