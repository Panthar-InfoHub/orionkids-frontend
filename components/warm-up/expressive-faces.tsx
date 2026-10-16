"use client";

import React from "react";

interface FaceProps {
  className?: string;
  size?: number;
}

export function HappyFace({ className = "w-[82px] h-[82px]", size = 82 }: FaceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Happy face"
    >
      {/* Warm Orange/Yellow Head Circle */}
      <circle
        cx="41"
        cy="41"
        r="38"
        fill="#FD9D03"
        stroke="#0A1D3D"
        strokeWidth="3.5"
      />
      {/* Left Eye */}
      <rect x="27" y="32" width="6" height="11" rx="3" fill="#0A1D3D" />
      {/* Right Eye */}
      <rect x="49" y="32" width="6" height="11" rx="3" fill="#0A1D3D" />
      {/* Smiling Mouth */}
      <path
        d="M26 49C29 60 53 60 56 49"
        stroke="#0A1D3D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalmFace({ className = "w-[82px] h-[82px]", size = 82 }: FaceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Calm face"
    >
      {/* Warm Orange/Yellow Head Circle */}
      <circle
        cx="41"
        cy="41"
        r="38"
        fill="#FD9D03"
        stroke="#0A1D3D"
        strokeWidth="3.5"
      />
      {/* Left Eye */}
      <rect x="27" y="33" width="6" height="11" rx="3" fill="#0A1D3D" />
      {/* Right Eye */}
      <rect x="49" y="33" width="6" height="11" rx="3" fill="#0A1D3D" />
      {/* Straight Horizontal Neutral Mouth */}
      <path
        d="M27 54H55"
        stroke="#0A1D3D"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const OkayFace = CalmFace;

export function SleepyFace({ className = "w-[82px] h-[82px]", size = 82 }: FaceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sleepy face"
    >
      {/* Warm Orange/Yellow Head Circle */}
      <circle
        cx="41"
        cy="41"
        r="38"
        fill="#FD9D03"
        stroke="#0A1D3D"
        strokeWidth="3.5"
      />
      {/* Left Sleepy Eye (relaxed curve) */}
      <path
        d="M25 38C28 41 33 41 35 38"
        stroke="#0A1D3D"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Right Sleepy Eye (relaxed curve) */}
      <path
        d="M47 38C49 41 54 41 57 38"
        stroke="#0A1D3D"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Small Sleepy O-shaped Mouth */}
      <ellipse
        cx="41"
        cy="53"
        rx="4.5"
        ry="6"
        stroke="#0A1D3D"
        strokeWidth="3.2"
        fill="none"
      />
    </svg>
  );
}

export function WorriedFace({ className = "w-[82px] h-[82px]", size = 82 }: FaceProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 82 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Worried face"
    >
      {/* Warm Orange/Yellow Head Circle */}
      <circle
        cx="41"
        cy="41"
        r="38"
        fill="#FD9D03"
        stroke="#0A1D3D"
        strokeWidth="3.5"
      />
      {/* Left Worried Eyebrow (slanted up towards center) */}
      <path
        d="M25 29L34 26"
        stroke="#0A1D3D"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Right Worried Eyebrow (slanted up towards center) */}
      <path
        d="M57 29L48 26"
        stroke="#0A1D3D"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Left Eye */}
      <rect x="27" y="34" width="6" height="10" rx="3" fill="#0A1D3D" />
      {/* Right Eye */}
      <rect x="49" y="34" width="6" height="10" rx="3" fill="#0A1D3D" />
      {/* Worried / Downturned Frown Mouth */}
      <path
        d="M28 55C32 49 50 49 54 55"
        stroke="#0A1D3D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
