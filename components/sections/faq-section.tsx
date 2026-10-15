"use client";

import React from "react";
import Image from "next/image";

const FAQ_ITEMS = [
  {
    question: "Is social distraction beneficial for the child?",
    answer:
      "No. OrionKids offers assessment insights to support learning and development. It does not diagnose conditions or replace qualified clinical or educational professionals.",
  },
  {
    question:
      "Will it help a child shine bright, build confidence, or showcase their talents to the world?",
    answer:
      "The focus is each child's learning profile and progress over time—not a leaderboard, a ranking or a label. A child is never reduced to a score.",
  },
  {
    question: "Will these activities help a child thrive in the world?",
    answer:
      "A starting point for understanding and practical support. Read observations in context with parents and educators; OrionKids does not guarantee academic outcomes.",
  },
  {
    question: "What should we expect from the insights?",
    answer:
      "A starting point for understanding and practical support. Read observations in context with parents and educators; OrionKids does not guarantee academic outcomes.",
  },
  {
    question: "What should we expect from the insights?",
    answer:
      "A starting point for understanding and practical support. Read observations in context with parents and educators; OrionKids does not guarantee academic outcomes.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq-section"
      className="relative w-full bg-white text-[#0A1D3D] pt-14 sm:pt-16 lg:pt-[72px] pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-[88px] overflow-hidden select-none scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left max-w-[390px]">
            
            {/* Top Pill Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-[14px] py-[5px] bg-[#FFD028] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-5 transform rotate-[-1deg] hover:rotate-0 transition-transform cursor-default select-none"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "11px",
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-xs">🛡️</span>
              <span>CLARITY BUILDS TRUST</span>
            </div>

            {/* Main Headline */}
            <h2
              className="text-[#0A1D3D] mb-4 text-left"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 44px)",
                lineHeight: "112%",
                letterSpacing: "-1.6px",
              }}
            >
              A Little Clarity,
              <br />
              Before You Begin.
            </h2>

            {/* Subtext Paragraph */}
            <p
              className="text-[#526176] text-left max-w-[390px]"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "0%",
              }}
            >
              A caring companion for your child, never a strict examiner.
            </p>

            {/* Star Mascot GIF */}
            <div className="mt-8 sm:mt-10 lg:mt-12 w-[150px] h-[150px] relative select-none">
              <Image
                src="/gif/star.gif"
                alt="Star mascot"
                width={150}
                height={150}
                className="w-[150px] h-[150px] object-contain pointer-events-none"
                unoptimized
              />
            </div>

          </div>

          {/* ================= RIGHT COLUMN (FAQ LIST) ================= */}
          <div className="lg:col-span-7 flex flex-col w-full max-w-[720px] lg:ml-auto">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col text-left ${
                  index !== FAQ_ITEMS.length - 1
                    ? "border-b border-[#E2E8F0] pb-6 mb-6"
                    : "pb-2"
                }`}
              >
                {/* Question */}
                <h3
                  className="text-[#0A1D3D] mb-2"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "17px",
                    lineHeight: "135%",
                    letterSpacing: "0%",
                  }}
                >
                  {item.question}
                </h3>

                {/* Answer */}
                <p
                  className="text-[#526176]"
                  style={{
                    fontFamily: "var(--font-inter), 'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "160%",
                    letterSpacing: "0%",
                  }}
                >
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
