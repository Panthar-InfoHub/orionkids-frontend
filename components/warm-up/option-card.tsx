"use client";

import React from "react";
import { WarmUpOption } from "./warm-up-data";

import { HappyFace, CalmFace, SleepyFace, WorriedFace } from "./expressive-faces";

interface OptionCardProps {
  option: WarmUpOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  layout?: "grid-2" | "grid-3" | "grid-4";
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

function renderFaceIcon(id: string) {
  switch (id) {
    case "happy":
      return <HappyFace className="w-[82px] h-[82px]" />;
    case "okay":
    case "calm":
      return <CalmFace className="w-[82px] h-[82px]" />;
    case "sleepy":
      return <SleepyFace className="w-[82px] h-[82px]" />;
    case "worried":
      return <WorriedFace className="w-[82px] h-[82px]" />;
    default:
      return null;
  }
}

export function OptionCard({ option, isSelected, onSelect, layout = "grid-2" }: OptionCardProps) {
  if (layout === "grid-4") {
    const FaceComponent = renderFaceIcon(option.id);

    return (
      <button
        type="button"
        onClick={() => onSelect(option.id)}
        className={`relative flex flex-col items-center justify-center pt-7 pb-6 px-4 rounded-[20px] transition-all duration-200 text-center cursor-pointer select-none min-h-[200px] w-full ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.12)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Top-Right Radio Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#E2E8F0] bg-white"
            }`}
          >
            {isSelected && <div className="w-3 h-3 rounded-full bg-[#6739B7]" />}
          </div>
        </div>

        {/* 82x82 Expressive Face SVG */}
        <div className="flex items-center justify-center my-1 select-none">
          {FaceComponent || <span className="text-5xl">{option.icon}</span>}
        </div>

        {/* Label: 17px Bold #0A1D3D */}
        <span
          className="text-[17px] font-bold text-[#0A1D3D] mt-3"
          style={{ fontFamily: JAKARTA }}
        >
          {option.label}
        </span>
      </button>
    );
  }

  if (layout === "grid-3") {
    return (
      <button
        type="button"
        onClick={() => onSelect(option.id)}
        className={`relative flex flex-col items-center justify-center p-6 rounded-[20px] transition-all duration-200 text-center cursor-pointer select-none min-h-[190px] w-full ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.15)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Top-Right Radio Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#D8DFE8] bg-white"
            }`}
          >
            {isSelected && <div className="w-3 h-3 rounded-full bg-[#6739B7]" />}
          </div>
        </div>

        {/* Centered Icon Box (48px x 48px, Radius 16px) */}
        <div
          className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center text-xl mb-4 transition-colors ${
            isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
          }`}
        >
          {option.icon}
        </div>

        {/* Option Label */}
        <span
          className="text-[16px] sm:text-[17px] leading-[140%] font-bold text-[#0A1D3D]"
          style={{ fontFamily: JAKARTA }}
        >
          {option.label}
        </span>
      </button>
    );
  }

  // Default: Grid-2 horizontal row card matching Figma spec:
  // Flow Horizontal, Radius 16px, Min-Height / Height Hug ~92px, Gap 12px
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`relative flex items-center justify-between p-4 sm:p-5 rounded-[16px] transition-all duration-200 text-left cursor-pointer select-none w-full min-h-[84px] sm:min-h-[92px] ${
        isSelected
          ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_2px_8px_rgba(103,57,183,0.12)]"
          : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-[16px] pr-3">
        {/* Icon Box: Fixed (48px x 48px), Radius 16px, bg #FD9D03 when selected, else #EAF6FF */}
        <div
          className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center text-xl shrink-0 transition-colors ${
            isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
          }`}
        >
          {option.icon}
        </div>

        {/* Label: Plus Jakarta Sans, 700 Bold, 17px, Line height 140%, 0% spacing, #0A1D3D */}
        <span
          className="text-[16px] sm:text-[17px] font-bold text-[#0A1D3D]"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 700,
            lineHeight: "140%",
            letterSpacing: "0%",
          }}
        >
          {option.label}
        </span>
      </div>

      {/* Right Radio Indicator */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
          isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#D8DFE8] bg-white"
        }`}
      >
        {isSelected && <div className="w-3 h-3 rounded-full bg-[#6739B7]" />}
      </div>
    </button>
  );
}
