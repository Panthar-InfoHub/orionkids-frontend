"use client";

import React from "react";

const INTER = "var(--font-inter), 'Inter', sans-serif";

export function HeartfeltNoteSection() {
  return (
    <section
      className="relative w-full rounded-2xl border border-[#DCE4FE] px-6 py-8 sm:p-8 flex flex-col items-center text-center"
      style={{
        fontFamily: INTER,
        background:
          "linear-gradient(90deg, #F1F4FE 0%, #F3F9FE 50%, #FAF6FE 100%)",
      }}
    >
      {/* Icon tile */}
      <div
        className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[24px] leading-none shadow-[0_2px_8px_rgba(15,23,42,0.06)] select-none"
        aria-hidden="true"
      >
        💌
      </div>

      {/* Title */}
      <h2
        className="mt-3 text-[#0F172A]"
        style={{
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "28px",
          letterSpacing: "-0.4px",
        }}
      >
        A Heartfelt Note for Ananya’s Family
      </h2>

      {/* Body */}
      <p
        className="mt-3 w-full max-w-[672px] text-[#475569] text-[14px] sm:text-[15px] leading-[21px] sm:leading-5"
        style={{ fontWeight: 400 }}
      >
        Every child’s brain unfolds at its own unique, wondrous tempo.
        Percentiles are simply a playful, momentary snapshot from today’s
        interactive journey—offering bright clues on what sparks her joy and
        where gentle support can be most fun. Keep learning affectionate,
        light-hearted, and wondrous!
      </p>
    </section>
  );
}
