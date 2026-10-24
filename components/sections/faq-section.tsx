"use client";

import React from "react";
import Image from "next/image";

const FAQ_ITEMS = [
  {
    question: "How does social media affect a child's cognitive development?",
    answer:
      "Excessive or age-inappropriate social media use may affect a child's attention, sleep, and opportunities for meaningful learning. OrionKids encourages balanced screen habits, interactive learning, and activities that help children practise memory, reasoning, attention, and problem-solving.",
  },
  {
    question: "Will OrionKids compare my child with other children?",
    answer:
      "OrionKids prioritizes understanding each child's individual learning profile and progress over time rather than defining them by rankings or labels. Any comparisons with age-based benchmarks should be used only where scientifically validated and appropriate.",
  },
  {
    question:
      "What makes OrionKids different from traditional academic assessments?",
    answer:
      "Traditional assessments often focus on academic knowledge and marks. OrionKids focuses on exploring cognitive skills and tracking progress over time, providing complementary insights into how children approach different learning activities.",
  },
  {
    question:
      "Will it help a child shine bright, build confidence, or showcase their talents to the world?",
    answer:
      "Yes, these activities can help children discover their unique talents, build self-confidence, express themselves, and shine bright by showcasing their abilities to the world.",
  },
  {
    question: "Will these activities help a child thrive in the world?",
    answer:
      "Yes, when designed thoughtfully, these activities can help children develop essential life skills, confidence, creativity, and emotional resilience, helping them thrive in an ever-changing world.",
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
