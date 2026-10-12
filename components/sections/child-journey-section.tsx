"use client";

import React from "react";
import Image from "next/image";

export function ChildJourneySection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          // Base Figma canvas width is 1264px
          const newScale = Math.min(1, Math.max(0.7, width / 1264));
          setScale(newScale);
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section
      id="child-journey-section"
      className="relative w-full bg-[#F3EBFF] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-[60px] select-none scroll-mt-0 overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-[1264px] mx-auto flex flex-col items-center">

        {/* ================= HEADER AREA ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 w-full mb-4 sm:mb-6">
          <div className="flex flex-col items-start gap-1.5">
            {/* Top Pill Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF7EF] text-[#0A1D3D] rounded-full border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] transform rotate-[-1deg] hover:rotate-0 transition-transform cursor-default whitespace-nowrap mb-0.5"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "10.5px",
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-xs">🧭</span>
              <span>A THOUGHTFUL JOURNEY · NOT A ONE-OFF SCORE</span>
            </div>

            {/* Headline */}
            <h2
              className="text-[#0A1D3D] tracking-[-1px] text-left text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-[800] leading-tight flex flex-wrap sm:flex-nowrap items-center gap-2"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>Your child&apos;s journey, step by step.</span>
              <span className="inline-block text-2xl sm:text-3xl lg:text-[32px] select-none">🚀</span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-[#526176] text-left text-xs sm:text-[13.5px] lg:text-[14.5px] leading-snug"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
              }}
            >
              From warm-up to play to report — playful and easy to follow.
            </p>
          </div>

          {/* Top Right Label */}
          <span
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#526176] self-start sm:self-end pb-1 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            }}
          >
            EXPANDED GAME FLOW
          </span>
        </div>

        {/* ================= DESKTOP HORIZONTAL CANVAS (>= 1024px) ================= */}
        <div
          ref={containerRef}
          className="hidden lg:flex w-full max-w-[1264px] mx-auto justify-center py-2 overflow-visible"
        >
          <div
            style={{
              width: `${1264 * scale}px`,
              height: `${553 * scale}px`,
              minWidth: `${1264 * scale}px`,
              minHeight: `${553 * scale}px`,
              position: "relative",
            }}
          >
            <div
              style={{
                width: "1264px",
                height: "553px",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="bg-[#FFFDF7] rounded-[32px] border-2 border-[#0A1D3D] shadow-[4px_6px_0px_0px_#0A1D3D] overflow-hidden select-none"
            >
              {/* Decorative Background Sparkles */}
              <span className="absolute top-5 left-1/3 text-yellow-400 text-sm select-none pointer-events-none">⭐</span>
              <span className="absolute top-8 right-1/3 text-indigo-400 text-xs select-none pointer-events-none">✦</span>
              <span className="absolute bottom-10 right-14 text-yellow-400 text-xs select-none pointer-events-none">✨</span>

              {/* SVG Road Ribbon Layer */}
              <div className="absolute inset-0 pointer-events-none select-none">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "1219px",
                    height: "201px",
                    top: "176px",
                    left: "calc(50% - 609.5px)",
                  }}
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 1219 201"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M37.5078 107.344L150.171 48.7738C174.636 36.0553 203.267 34.0029 229.295 43.1016L555.943 157.286C577.349 164.768 600.662 164.754 622.058 157.244L939.25 45.9199C963.189 37.5181 989.427 38.5294 1012.65 48.749L1181.01 122.844"
                      stroke="#C5A0F5"
                      strokeWidth="75"
                      strokeLinecap="round"
                    />
                    <path
                      d="M37.5078 107.344L150.171 48.7738C174.636 36.0553 203.267 34.0029 229.295 43.1016L555.943 157.286C577.349 164.768 600.662 164.754 622.058 157.244L939.25 45.9199C963.189 37.5181 989.427 38.5294 1012.65 48.749L1181.01 122.844"
                      stroke="white"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="16 14"
                    />
                  </svg>
                </div>

                {/* START Button */}
                <div className="absolute left-[34px] top-[283px] -translate-y-1/2 z-30 select-none">
                  <span className="inline-flex items-center justify-center w-[52px] h-[28px] bg-[#C4B5FD] text-white text-[10.5px] font-black tracking-wider uppercase rounded-[8px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]">
                    START
                  </span>
                </div>

                {/* Checkpoint 1: Pink Circle */}
                <div className="absolute left-[225px] top-[211px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 select-none">
                  <div className="relative w-14 h-14 rounded-full bg-[#FF8CC7] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                      <path
                        d="M 20 8 C 20 15 16 18 9 20 C 16 22 20 25 20 32 C 20 25 24 22 31 20 C 24 18 20 15 20 8 Z"
                        stroke="#0A1D3D"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="12" cy="27" r="1.8" stroke="#0A1D3D" strokeWidth="2.2" fill="none" />
                      <path d="M 27 10 L 27 15 M 24.5 12.5 L 29.5 12.5" stroke="#0A1D3D" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FFD1E3] border-2 border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                      1
                    </span>
                  </div>
                </div>

                {/* Checkpoint 2: Mint/Ice Blue Circle */}
                <div className="absolute left-[611px] top-[341px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 select-none">
                  <div className="relative w-14 h-14 rounded-full bg-[#E0F2FE] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                      <rect
                        x="10"
                        y="13"
                        width="20"
                        height="14"
                        rx="3.5"
                        stroke="#0A1D3D"
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 16 17 L 16 23 M 13 20 L 19 20"
                        stroke="#0A1D3D"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle cx="24" cy="18.5" r="1" fill="#0A1D3D" />
                      <circle cx="26" cy="21.5" r="1" fill="#0A1D3D" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#38BDF8] border-2 border-[#0A1D3D] text-[10px] font-black text-white flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                      2
                    </span>
                  </div>
                </div>

                {/* Animated Character GIF */}
                <div
                  className="absolute z-20 select-none pointer-events-none"
                  style={{
                    width: "150px",
                    height: "150px",
                    top: "402px",
                    left: "557px",
                  }}
                >
                  <Image
                    src={encodeURI("/gif/annoying flying bug.gif")}
                    alt="Animated cartoon character"
                    width={150}
                    height={150}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Checkpoint 3: Green Circle */}
                <div className="absolute left-[999px] top-[214px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 select-none">
                  <div className="relative w-14 h-14 rounded-full bg-[#52D8A6] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                      <rect
                        x="10"
                        y="13.5"
                        width="20"
                        height="14"
                        rx="3"
                        stroke="#0A1D3D"
                        strokeWidth="2.4"
                        fill="none"
                      />
                      <path
                        d="M 11 15 L 20 21.5 L 29 15"
                        stroke="#0A1D3D"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#52D8A6] border-2 border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                        <path
                          d="M 2.5 6.5 L 4.8 8.5 L 9.5 3.5"
                          stroke="#0A1D3D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* FINISH Button */}
                <div className="absolute right-[32px] top-[299px] -translate-y-1/2 z-30 select-none">
                  <span className="inline-flex items-center justify-center gap-1.5 h-[28px] px-3 bg-[#EAF7EF] text-[#0A1D3D] text-[10.5px] font-black tracking-wider uppercase rounded-[8px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]">
                    <span>FINISH</span>
                    <span className="text-xs">🏁</span>
                  </span>
                </div>
              </div>

              {/* Level Cards */}
              <div className="relative z-20 w-full h-full">
                {/* CARD 1 */}
                <div
                  className="absolute top-[276px] left-[110px] w-[290.4px] h-[223.52px] bg-white rounded-[21.12px] border-[1.76px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-[14.08px] flex flex-col justify-between gap-[7.04px] text-left transition-transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FF8CC7] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 01: WARM-UP</span>
                    <span>🧩</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] leading-[19.36px] font-[800]"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "15.84px",
                    }}
                  >
                    Start with a warm-up questions for personalised activity
                  </h3>
                  <p
                    className="text-[#526176] leading-[160%]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontSize: "10.56px",
                      fontWeight: 400,
                    }}
                  >
                    A quick warm-up question gets the child ready to play.
                  </p>
                  <div className="bg-[#FFF7E8] rounded-[12px] p-2 border border-[#0A1D3D]/60">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] leading-[150%]"
                      style={{
                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                        fontSize: "10.56px",
                      }}
                    >
                      The child starts with a short, playful prompt that helps them settle in and feel ready for the next step.
                    </p>
                  </div>
                </div>

                {/* CARD 2 */}
                <div
                  className="absolute top-[40px] left-[473px] w-[290.4px] h-[223.52px] bg-white rounded-[21.12px] border-[1.76px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-[14.08px] flex flex-col justify-between gap-[7.04px] text-left transition-transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D5B6FF] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 02: PLAY THE GAME</span>
                    <span>🧠</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] leading-[19.36px] font-[800]"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "15.84px",
                    }}
                  >
                    Play the actual game. 🧠
                  </h3>
                  <p
                    className="text-[#526176] leading-[160%]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontSize: "10.56px",
                      fontWeight: 400,
                    }}
                  >
                    The child plays the game through engaging activities.
                  </p>
                  <div className="bg-[#E6F4FF] rounded-[12px] p-2 border border-[#0A1D3D]">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] leading-[150%]"
                      style={{
                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                        fontSize: "10.56px",
                      }}
                    >
                      The child plays the game through a series of engaging activities that feel playful, not like a test.
                    </p>
                  </div>
                </div>

                {/* CARD 3 */}
                <div
                  className="absolute top-[253px] left-[824px] w-[290.4px] h-[223.52px] bg-white rounded-[21.12px] border-[1.76px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-[14.08px] flex flex-col justify-between gap-[7.04px] text-left transition-transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#65DCAA] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 03: REPORT TO PARENTS</span>
                    <span>📜</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] leading-[19.36px] font-[800]"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "15.84px",
                    }}
                  >
                    Report sent to parents &amp; Teacher. ⭐
                  </h3>
                  <p
                    className="text-[#526176] leading-[160%]"
                    style={{
                      fontFamily: "var(--font-inter), 'Inter', sans-serif",
                      fontSize: "10.56px",
                      fontWeight: 400,
                    }}
                  >
                    Detailed report sent to the teacher &amp; parents
                  </p>
                  <div className="bg-[#A8E6CF]/40 rounded-[12px] p-2 border border-[#0A1D3D]">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] leading-[150%]"
                      style={{
                        fontFamily: "var(--font-inter), 'Inter', sans-serif",
                        fontSize: "10.56px",
                      }}
                    >
                      The report is sent to parents by email so they can see the child&apos;s progress and next steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Right Floating Button */}
              <div className="absolute bottom-5 right-6 z-30 select-none">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#FF8CC7] text-white text-xs sm:text-sm font-black rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none"
                  style={{
                    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <span>Report</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SMALL SCREEN VERTICAL BOARD (< 1024px) ================= */}
        <div className="block lg:hidden w-full max-w-[680px] mx-auto mt-2">
          <div className="relative bg-[#FFFDF7] rounded-[24px] sm:rounded-[32px] border-2 border-[#0A1D3D] shadow-[4px_6px_0px_0px_#0A1D3D] p-4 sm:p-7 overflow-hidden select-none">

            {/* Decorative Background Sparkles */}
            <span className="absolute top-4 right-5 text-yellow-400 text-sm select-none pointer-events-none">⭐</span>
            <span className="absolute top-20 right-8 text-indigo-400 text-xs select-none pointer-events-none">✦</span>
            <span className="absolute bottom-20 right-5 text-yellow-400 text-xs select-none pointer-events-none">✨</span>

            {/* Vertical Road Progression */}
            <div className="relative flex flex-col gap-5 sm:gap-6">

              {/* Continuous Vertical Road Ribbon (No black border, pure #C5A0F5 with dashed white line) */}
              <div className="absolute left-[24px] sm:left-[28px] -translate-x-1/2 top-4 bottom-7 sm:bottom-9 w-[24px] sm:w-[28px] bg-[#C5A0F5] pointer-events-none z-0 rounded-full">
                {/* Center white dashed line */}
                <div className="w-0 h-full border-l-[3px] border-dashed border-white mx-auto" />
              </div>

              {/* ROAD START */}
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <div className="w-12 sm:w-14 flex justify-center shrink-0">
                  <span className="inline-flex items-center justify-center w-[52px] h-[28px] bg-[#C4B5FD] text-white text-[10.5px] font-black tracking-wider uppercase rounded-[8px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]">
                    START
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#526176]">
                  BEGIN YOUR ADVENTURE
                </span>
              </div>

              {/* STEP 1: WARM-UP */}
              <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                {/* Checkpoint 1 Node */}
                <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF8CC7] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                    <path
                      d="M 20 8 C 20 15 16 18 9 20 C 16 22 20 25 20 32 C 20 25 24 22 31 20 C 24 18 20 15 20 8 Z"
                      stroke="#0A1D3D"
                      strokeWidth="2.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="12" cy="27" r="1.8" stroke="#0A1D3D" strokeWidth="2.2" fill="none" />
                    <path d="M 27 10 L 27 15 M 24.5 12.5 L 29.5 12.5" stroke="#0A1D3D" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FFD1E3] border-2 border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                    1
                  </span>
                </div>

                {/* Card 1 Content */}
                <div className="flex-1 bg-white rounded-[20px] border-2 border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-3.5 sm:p-4.5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FF8CC7] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 01: WARM-UP</span>
                    <span>🧩</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] text-[15px] sm:text-[16px] font-[800] leading-snug"
                    style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                  >
                    Start with a warm-up questions for personalised activity
                  </h3>
                  <p
                    className="text-[#526176] text-xs sm:text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                  >
                    A quick warm-up question gets the child ready to play.
                  </p>
                  <div className="bg-[#FFF7E8] rounded-[12px] p-2.5 border border-[#0A1D3D]/60 mt-0.5">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                    >
                      The child starts with a short, playful prompt that helps them settle in and feel ready for the next step.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 2: PLAY THE GAME */}
              <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                {/* Checkpoint 2 Node */}
                <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E0F2FE] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                    <rect
                      x="10"
                      y="13"
                      width="20"
                      height="14"
                      rx="3.5"
                      stroke="#0A1D3D"
                      strokeWidth="2.4"
                      fill="none"
                    />
                    <path
                      d="M 16 17 L 16 23 M 13 20 L 19 20"
                      stroke="#0A1D3D"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="24" cy="18.5" r="1" fill="#0A1D3D" />
                    <circle cx="26" cy="21.5" r="1" fill="#0A1D3D" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#38BDF8] border-2 border-[#0A1D3D] text-[10px] font-black text-white flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                    2
                  </span>
                </div>

                {/* Card 2 Content */}
                <div className="flex-1 bg-white rounded-[20px] border-2 border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-3.5 sm:p-4.5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5 relative">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D5B6FF] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 02: PLAY THE GAME</span>
                    <span>🧠</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] text-[15px] sm:text-[16px] font-[800] leading-snug"
                    style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                  >
                    Play the actual game. 🧠
                  </h3>
                  <p
                    className="text-[#526176] text-xs sm:text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                  >
                    The child plays the game through engaging activities.
                  </p>
                  <div className="bg-[#E6F4FF] rounded-[12px] p-2.5 border border-[#0A1D3D] mt-0.5">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                    >
                      The child plays the game through a series of engaging activities that feel playful, not like a test.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 3: REPORT TO PARENTS */}
              <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                {/* Checkpoint 3 Node */}
                <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#52D8A6] border-[2.5px] border-[#0A1D3D] shadow-[2.5px_2.5px_0px_#0A1D3D] flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
                    <rect
                      x="10"
                      y="13.5"
                      width="20"
                      height="14"
                      rx="3"
                      stroke="#0A1D3D"
                      strokeWidth="2.4"
                      fill="none"
                    />
                    <path
                      d="M 11 15 L 20 21.5 L 29 15"
                      stroke="#0A1D3D"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#52D8A6] border-2 border-[#0A1D3D] text-[10px] font-black text-[#0A1D3D] flex items-center justify-center shadow-[1px_1px_0px_#0A1D3D]">
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                      <path
                        d="M 2.5 6.5 L 4.8 8.5 L 9.5 3.5"
                        stroke="#0A1D3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Card 3 Content */}
                <div className="flex-1 bg-white rounded-[20px] border-2 border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] p-3.5 sm:p-4.5 flex flex-col gap-2 transition-transform hover:-translate-y-0.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#65DCAA] text-[#0A1D3D] rounded-full border border-[#0A1D3D] text-[9.5px] font-black uppercase tracking-wider self-start select-none">
                    <span>LEVEL 03: REPORT TO PARENTS</span>
                    <span>📜</span>
                  </div>
                  <h3
                    className="text-[#0A1D3D] text-[15px] sm:text-[16px] font-[800] leading-snug"
                    style={{ fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif" }}
                  >
                    Report sent to parents &amp; Teacher. ⭐
                  </h3>
                  <p
                    className="text-[#526176] text-xs sm:text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                  >
                    Detailed report sent to the teacher &amp; parents
                  </p>
                  <div className="bg-[#A8E6CF]/40 rounded-[12px] p-2.5 border border-[#0A1D3D] mt-0.5">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#0A1D3D] block mb-0.5">
                      WHAT HAPPENS HERE
                    </span>
                    <p
                      className="text-[#526176] text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                    >
                      The report is sent to parents by email so they can see the child&apos;s progress and next steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* ROAD END: FINISH (on road track) + GIF touching bottom border (shifted left/center) + REPORT BUTTON */}
              <div className="relative z-10 flex items-end justify-between gap-2 pt-2 sm:pt-3 -mb-4 sm:-mb-7">
                {/* FINISH at ending of road */}
                <div className="w-12 sm:w-14 flex justify-center shrink-0 mb-3 sm:mb-5">
                  <span className="inline-flex items-center justify-center gap-1 h-[28px] px-2.5 bg-[#EAF7EF] text-[#0A1D3D] text-[10px] sm:text-[10.5px] font-black tracking-wider uppercase rounded-[8px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D]">
                    <span>FINISH</span>
                    <span className="text-xs">🏁</span>
                  </span>
                </div>

                {/* Animated GIF shifted left/center, touching the bottom border line */}
                <div className="flex-1 flex justify-center items-end pb-0">
                  <div className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] relative shrink-0 leading-none pointer-events-none select-none translate-y-[2px]">
                    <Image
                      src={encodeURI("/gif/annoying flying bug.gif")}
                      alt="Animated cartoon character"
                      width={150}
                      height={150}
                      unoptimized
                      className="w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>

                {/* Report Button */}
                <div className="mb-3 sm:mb-5 shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FF8CC7] text-white text-xs sm:text-sm font-black rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] shrink-0 whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <span>Report</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
