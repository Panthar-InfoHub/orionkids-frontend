"use client";

import React from "react";

interface WarmUpSidebarProps {
  tag?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  bottomCardTitle?: string;
  bottomCardBody?: string;
  plainBottomNote?: React.ReactNode;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

function SmilingStarIllustration() {
  return (
    <svg
      width="170"
      height="170"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
      aria-hidden="true"
    >
      {/* 5-pointed cute star body */}
      <path
        d="M80 14L98.5 53.5L142 59.5L110.5 89.5L118 133L80 112.5L42 133L49.5 89.5L18 59.5L61.5 53.5L80 14Z"
        fill="#FD9D03"
        stroke="#0A1D3D"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Left Eye */}
      <circle cx="68" cy="80" r="3.2" fill="#0A1D3D" />
      {/* Right Eye */}
      <circle cx="92" cy="80" r="3.2" fill="#0A1D3D" />
      {/* Smiling Mouth */}
      <path
        d="M72 90C74.5 98 85.5 98 88 90"
        stroke="#0A1D3D"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function WarmUpSidebar({
  tag = "THINGS YOU ENJOY",
  title = (
    <>
      Let’s Get To
      <br />
      Know You.
    </>
  ),
  subtitle = "There are no right or wrong answers. Just tell us what feels like you.",
  bottomCardTitle = "Take your time.",
  bottomCardBody = "You can ask a grown-up to read the question with you.",
  plainBottomNote,
}: WarmUpSidebarProps) {
  return (
    <aside className="w-full sm:w-[280px] lg:w-[300px] shrink-0 flex flex-col items-start gap-3 sm:gap-3.5 lg:gap-4 pt-0 md:pt-1 select-none">
      {/* 1. Top Pill */}
      <div>
        <span
          className="inline-flex items-center px-3 py-0.5 rounded-full uppercase"
          style={{
            backgroundColor: "#EAF7EF",
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "10.5px",
            lineHeight: "100%",
            letterSpacing: "0.88px",
            color: "#10345B",
          }}
        >
          {tag}
        </span>
      </div>

      {/* 2. Main Heading */}
      <div className="w-full max-w-[300px]">
        <h1
          className="text-[26px] sm:text-[30px] lg:text-[34px]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 800,
            lineHeight: "115%",
            letterSpacing: "-0.8px",
            color: "#0A1D3D",
          }}
        >
          {title}
        </h1>
      </div>

      {/* 3. Subtitle / Description */}
      <div className="w-full max-w-[300px]">
        <p
          className="text-[13.5px] sm:text-[14.5px]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 400,
            lineHeight: "150%",
            letterSpacing: "0%",
            color: "#526176",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 4. Star Mascot */}
      <div className="w-[180px] h-[160px] lg:w-[200px] lg:h-[180px] flex items-center justify-center relative self-start ml-0 my-0.5">
        {/* Sparkle (top-left) */}
        <span
          className="absolute left-1 top-8 text-[16px] select-none"
          style={{ color: "#FD9D03" }}
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Small Dot (bottom-right) */}
        <span
          className="absolute right-2 bottom-6 w-2.5 h-2.5 rounded-full select-none"
          style={{ backgroundColor: "#FD9D03" }}
          aria-hidden="true"
        />

        {/* Inside Circle */}
        <div className="w-[150px] h-[150px] lg:w-[170px] lg:h-[170px] rounded-full bg-[#E6F4FF] flex items-center justify-center relative shadow-sm">
          <SmilingStarIllustration />
        </div>
      </div>

      {/* 5. Lowest Div */}
      {plainBottomNote ? (
        <div className="w-full max-w-[300px]">
          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "12.5px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#526176",
            }}
          >
            {plainBottomNote}
          </p>
        </div>
      ) : (
        <div
          className="w-full max-w-[300px] rounded-[16px] p-3 sm:p-3.5 flex flex-col gap-[6px]"
          style={{ backgroundColor: "#EAF7EF" }}
        >
          <h4
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#0A1D3D",
            }}
          >
            {bottomCardTitle}
          </h4>

          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "160%",
              letterSpacing: "0%",
              color: "#526176",
            }}
          >
            {bottomCardBody}
          </p>
        </div>
      )}
    </aside>
  );
}
