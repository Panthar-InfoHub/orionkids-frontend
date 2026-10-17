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
      return <HappyFace className="w-[54px] h-[54px] sm:w-[82px] sm:h-[82px]" />;
    case "okay":
    case "calm":
      return <CalmFace className="w-[54px] h-[54px] sm:w-[82px] sm:h-[82px]" />;
    case "sleepy":
      return <SleepyFace className="w-[54px] h-[54px] sm:w-[82px] sm:h-[82px]" />;
    case "worried":
      return <WorriedFace className="w-[54px] h-[54px] sm:w-[82px] sm:h-[82px]" />;
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
        className={`relative flex flex-col items-center justify-center pt-3.5 pb-3 sm:pt-7 sm:pb-6 px-2.5 sm:px-4 rounded-[14px] sm:rounded-[20px] transition-all duration-200 text-center cursor-pointer select-none min-h-[130px] sm:min-h-[200px] w-full ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.12)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Top-Right Radio Indicator */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4">
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#E2E8F0] bg-white"
            }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#6739B7]" />}
          </div>
        </div>

        {/* Expressive Face SVG */}
        <div className="flex items-center justify-center my-0.5 sm:my-1 select-none">
          {FaceComponent || <span className="text-4xl sm:text-5xl">{option.icon}</span>}
        </div>

        {/* Label */}
        <span
          className="text-[14px] sm:text-[17px] font-bold text-[#0A1D3D] mt-1.5 sm:mt-3"
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
        className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-[16px] transition-all duration-200 text-left cursor-pointer select-none min-h-[58px] sm:min-h-[64px] w-full ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.15)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Option Content: Icon beside text on all views */}
        <div className="flex items-center gap-3 sm:gap-4 pr-3 min-w-0 flex-1">
          {/* Icon Box */}
          <div
            className={`w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-lg sm:text-xl shrink-0 transition-colors ${
              isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
            }`}
          >
            {option.icon}
          </div>

          {/* Option Label */}
          <span
            className="text-[15px] sm:text-[16px] font-bold text-[#0A1D3D] leading-snug"
            style={{ fontFamily: JAKARTA }}
          >
            {option.label}
          </span>
        </div>

        {/* Radio Indicator */}
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

  // Default: Grid-2 horizontal row card matching phone view
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`relative flex items-center justify-between p-3.5 sm:p-4 rounded-[16px] transition-all duration-200 text-left cursor-pointer select-none w-full min-h-[58px] sm:min-h-[64px] ${
        isSelected
          ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_2px_8px_rgba(103,57,183,0.12)]"
          : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 pr-3 min-w-0 flex-1">
        {/* Icon Box */}
        <div
          className={`w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-lg sm:text-xl shrink-0 transition-colors ${
            isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
          }`}
        >
          {option.icon}
        </div>

        {/* Label */}
        <span
          className="text-[15px] sm:text-[16px] font-bold text-[#0A1D3D] leading-snug"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 700,
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
