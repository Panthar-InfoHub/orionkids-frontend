"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const TESTIMONIALS = [
  {
    stars: 5,
    quote:
      '"OrionKids changed how our teachers view learner differences. We can now identify working memory blocks early without labeling children."',
    author: "Dr. Anuradha Sen",
    role: "School Principal, New Delhi",
    bg: "bg-[#D8F3FF]/80",
  },
  {
    stars: 5,
    quote:
      '"My 8-year-old son looks forward to his weekend quests. The reports helped us realize his visual reasoning is phenomenal, which boosted his self-esteem."',
    author: "Meera Venkatesh",
    role: "Parent of Class 3 Student, Bengaluru",
    bg: "bg-[#EAF7EF]/80",
  },
  {
    stars: 5,
    quote:
      '"A breath of fresh air in edtech. No rote learning pressure, cognitive assessments presented in a joyful format."',
    author: "Rajiv Malhotra",
    role: "Academic Director, Heritage Learning Group",
    bg: "bg-[#FFF3D6]/80",
  },
  {
    stars: 5,
    quote:
      '"The gamified format turns cognitive milestones into an adventure. Kids love collecting constellation badges and never feel the pressure of a traditional test."',
    author: "Sunita Rao",
    role: "Head of Primary Curriculum, Mumbai",
    bg: "bg-[#F0E6FF]/80",
  },
  {
    stars: 5,
    quote:
      '"We were always wondering how to guide our daughter\'s natural curiosity without screen fatigue. OrionKids\' personalized insights gave us a clear, joyful roadmap."',
    author: "Vikram & Sneha Joshi",
    role: "Parents of Grade 2 Explorer, Pune",
    bg: "bg-[#FFE8EC]/80",
  },
  {
    stars: 5,
    quote:
      '"A rare blend of developmental neuroscience and sheer playfulness. The insights provide actionable nudges that parents and educators can seamlessly use every day."',
    author: "Ananya Sengupta",
    role: "Child Development Specialist, Hyderabad",
    bg: "bg-[#D8F3FF]/80",
  },
];

// Tripled array to enable infinite seamless looping in both directions
const EXTENDED_TESTIMONIALS = [
  ...TESTIMONIALS,
  ...TESTIMONIALS,
  ...TESTIMONIALS,
];

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  // Position at the start of the middle set on initial load
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;
    setIsReady(true);
  }, []);

  // Seamless infinite loop handler on native scroll
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || !isReady) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    // If scrolled past the 2nd set into the 3rd set, quietly snap back into the 2nd set
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    }
    // If scrolled before the 2nd set into the 1st set, quietly snap forward into the 2nd set
    else if (container.scrollLeft <= singleSetWidth * 0.1) {
      container.scrollLeft += singleSetWidth;
    }
  }, [isReady]);

  // Arrow button click: slides by exactly one card width + gap
  const handleSlide = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-card]");
    if (!card) return;

    // Get card width and gap dynamically from the rendered element
    const cardWidth = card.offsetWidth;
    const computedGap = parseInt(window.getComputedStyle(container).gap || "24", 10) || 24;
    const scrollAmount = cardWidth + computedGap;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    hasMovedRef.current = true;

    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="testimonials-section"
      className="relative w-full bg-[#EAF6FF] text-[#0A1D3D] pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-14 lg:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden select-none scroll-mt-16"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* ================= HEADER AREA ================= */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 max-w-[642px]">
          
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

        {/* ================= TESTIMONIAL CAROUSEL CONTAINER ================= */}
        <div className="w-full flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 relative">
          
          {/* Left Arrow Button (Completely outside the cards) */}
          <button
            type="button"
            onClick={() => handleSlide("left")}
            aria-label="Previous testimonial"
            className="shrink-0 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#0A1D3D] border-[2.5px] sm:border-[3px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] flex items-center justify-center transition-all cursor-pointer select-none hover:bg-[#FFD54F] hover:-translate-y-0.5 hover:shadow-[4px_5px_0px_0px_#0A1D3D] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0A1D3D]" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Scrollable Container (Supports trackpad, touch swipe, mouse drag, and buttons) */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="w-full max-w-[1180px] py-3 flex items-stretch gap-4 sm:gap-5 lg:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {EXTENDED_TESTIMONIALS.map((item, index) => (
              <div
                key={index}
                data-card
                className="shrink-0 snap-start w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] min-h-[290px] sm:min-h-[300px] flex flex-col justify-between text-left select-none"
              >
                <div
                  className={`w-full h-full ${item.bg} backdrop-blur-sm rounded-[24px] border-[3.5px] sm:border-[4px] border-[#0A1D3D] shadow-[4px_6px_0px_0px_#0A1D3D] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1`}
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
              </div>
            ))}
          </div>

          {/* Right Arrow Button (Completely outside the cards) */}
          <button
            type="button"
            onClick={() => handleSlide("right")}
            aria-label="Next testimonial"
            className="shrink-0 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#0A1D3D] border-[2.5px] sm:border-[3px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] flex items-center justify-center transition-all cursor-pointer select-none hover:bg-[#FFD54F] hover:-translate-y-0.5 hover:shadow-[4px_5px_0px_0px_#0A1D3D] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-[#0A1D3D]" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
