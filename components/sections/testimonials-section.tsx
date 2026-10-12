"use client";

import React from "react";

const TESTIMONIALS = [
  {
    stars: 5,
    quote:
      '"OrionKids changed how our teachers view learner differences. We can now identify working memory blocks early without labeling children."',
    author: "Dr. Anuradha Sen",
    role: "School Principal, New Delhi",
    bg: "bg-[#D8F3FF]/70",
  },
  {
    stars: 5,
    quote:
      '"My 8-year-old son looks forward to his weekend quests. The reports helped us realize his visual reasoning is phenomenal, which boosted his self-esteem."',
    author: "Meera Venkatesh",
    role: "Parent of Class 3 Student, Bengaluru",
    bg: "bg-[#EAF7EF]/70",
  },
  {
    stars: 5,
    quote:
      '"A breath of fresh air in edtech. No rote learning pressure, cognitive assessments presented in a joyful format."',
    author: "Rajiv Malhotra",
    role: "Academic Director, Heritage Learning Group",
    bg: "bg-[#EAF7EF]/70",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials-section"
      className="relative w-full bg-[#EAF6FF] text-[#0A1D3D] pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14 px-4 sm:px-8 lg:px-[112px] overflow-hidden select-none scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* ================= HEADER AREA ================= */}
        <div className="flex flex-col items-center text-center mb-12 max-w-[642px]">
          
          {/* Top Pill Badge */}
          <div
            className="inline-flex items-center gap-[6px] px-[16px] py-[4px] bg-[#A8E6CF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] mb-4 transform rotate-[1deg] hover:rotate-0 transition-transform cursor-default select-none"
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <span className="text-xs">📣</span>
            <span>COMMUNITY VOICE</span>
          </div>

          {/* Main Headline */}
          <h2
            className="text-[#0A1D3D] tracking-[-1.2px]"
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(34px, 4.5vw, 48px)",
              lineHeight: "100%",
            }}
          >
            Loved by Leaders and
            <br />
            Parents💖
          </h2>

        </div>

        {/* ================= TESTIMONIAL CARDS ROW ================= */}
        <div className="relative w-full max-w-[1216px]">
          
          {/* Subtle connecting dashed line behind the star badges */}
          <div className="absolute top-10 left-[10%] right-[10%] hidden lg:flex items-center justify-center pointer-events-none z-0">
            <div className="w-full border-t border-dashed border-[#38BDF8]/60" />
            <span className="absolute text-[#38BDF8] text-xs font-bold bg-[#EAF6FF] px-2 select-none">
              ✦
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-10">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                className={`w-full min-h-[289px] ${item.bg} backdrop-blur-sm rounded-[24px] border-[4px] border-[#0A1D3D] shadow-[4px_6px_0px_0px_#0A1D3D] p-8 flex flex-col justify-between text-left transition-transform hover:-translate-y-1`}
              >
                {/* Top Section: Stars & Quote */}
                <div className="flex flex-col items-start gap-4">
                  {/* Rating Badge */}
                  <div className="inline-flex items-center px-2.5 py-0.5 bg-white rounded-full border-2 border-[#0A1D3D] shadow-[1px_1px_0px_#0A1D3D]">
                    <span className="text-[#F59E0B] text-xs tracking-wider">
                      ★★★★★
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p
                    className="text-[#1E293B]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "14px",
                      lineHeight: "22.75px",
                      letterSpacing: "0px",
                    }}
                  >
                    {item.quote}
                  </p>
                </div>

                {/* Bottom Section: Divider & Author Info */}
                <div className="w-full border-t border-[#0A1D3D]/15 pt-3.5 mt-4 flex flex-col gap-0.5">
                  <span
                    className="text-[#1E293B]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {item.author}
                  </span>
                  <span
                    className="text-[#475569]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "16px",
                      letterSpacing: "0px",
                    }}
                  >
                    {item.role}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
