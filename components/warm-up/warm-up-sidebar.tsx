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
    <aside className="w-full sm:w-[300px] shrink-0 flex flex-col items-start gap-[24px] pt-0 md:pt-[28px] select-none">
      {/* 1. Top Pill */}
      <div>
        <span
          className="inline-flex items-center px-3 py-1 rounded-full uppercase"
          style={{
            backgroundColor: "#EAF7EF",
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "11px",
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
          style={{
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "38px",
            lineHeight: "120%",
            letterSpacing: "-1px",
            color: "#0A1D3D",
          }}
        >
          {title}
        </h1>
      </div>

      {/* 3. Subtitle / Description */}
      <div className="w-full max-w-[300px]">
        <p
          style={{
            fontFamily: JAKARTA,
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: "165%",
            letterSpacing: "0%",
            color: "#526176",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 4. Star Mascot */}
      <div className="w-[260px] h-[230px] flex items-center justify-center relative self-start ml-0">
        {/* Sparkle (top-left) */}
        <span
          className="absolute left-1 top-12 text-[18px] select-none"
          style={{ color: "#FD9D03" }}
          aria-hidden="true"
        >
          ✦
        </span>

        {/* Small Dot (bottom-right) */}
        <span
          className="absolute right-2 bottom-10 w-2.5 h-2.5 rounded-full select-none"
          style={{ backgroundColor: "#FD9D03" }}
          aria-hidden="true"
        />

        {/* Inside Circle: 210px x 210px, bg #E6F4FF */}
        <div className="w-[210px] h-[210px] rounded-full bg-[#E6F4FF] flex items-center justify-center relative shadow-sm">
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
              fontSize: "13px",
              lineHeight: "160%",
              letterSpacing: "0%",
              color: "#526176",
            }}
          >
            {plainBottomNote}
          </p>
        </div>
      ) : (
        <div
          className="w-full max-w-[300px] rounded-[18px] p-[20px] flex flex-col gap-[8px]"
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
