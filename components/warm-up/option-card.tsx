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
        className={`relative flex flex-col items-center justify-center pt-3 pb-2.5 sm:pt-5 sm:pb-4 px-2 sm:px-3 rounded-[14px] sm:rounded-[18px] transition-all duration-200 text-center cursor-pointer select-none min-h-[110px] sm:min-h-[150px] w-full ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.12)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Top-Right Radio Indicator */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <div
            className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all ${
              isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#E2E8F0] bg-white"
            }`}
          >
            {isSelected && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6739B7]" />}
          </div>
        </div>

        {/* Expressive Face SVG */}
        <div className="flex items-center justify-center my-0.5 select-none">
          {FaceComponent || <span className="text-3xl sm:text-4xl">{option.icon}</span>}
        </div>

        {/* Label */}
        <span
          className="text-[13px] sm:text-[15px] font-bold text-[#0A1D3D] mt-1 sm:mt-2"
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
        className={`relative flex transition-all duration-200 cursor-pointer select-none w-full h-full ${
          /* Mobile / tablet: clean horizontal row | Desktop (lg:): vertical card matching Figma */
          "flex-row items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 min-h-[50px] sm:min-h-[54px] rounded-[14px]"
        } lg:flex-col lg:items-center lg:justify-between lg:p-4 lg:min-h-[150px] lg:rounded-[18px] ${
          isSelected
            ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_4px_16px_rgba(103,57,183,0.15)]"
            : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
        }`}
      >
        {/* Top-Right Radio Indicator on Desktop */}
        <div className="hidden lg:flex w-full justify-end">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
              isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#D8DFE8] bg-white"
            }`}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#6739B7]" />}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex items-center gap-2.5 sm:gap-3 pr-2 min-w-0 flex-1 lg:flex-col lg:items-center lg:justify-center lg:gap-2.5 lg:pr-0 lg:my-auto">
          {/* Icon Box */}
          <div
            className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] lg:w-[48px] lg:h-[48px] rounded-[10px] sm:rounded-[12px] lg:rounded-[14px] flex items-center justify-center text-base sm:text-lg lg:text-xl shrink-0 transition-colors ${
              isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
            }`}
          >
            {option.icon}
          </div>

          {/* Option Label */}
          <span
            className="text-[13px] sm:text-[14px] font-bold text-[#0A1D3D] leading-snug break-words min-w-0 text-left lg:text-center"
            style={{ fontFamily: JAKARTA }}
          >
            {option.label}
          </span>
        </div>

        {/* Radio Indicator on Mobile / Tablet */}
        <div
          className={`lg:hidden w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all ${
            isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#D8DFE8] bg-white"
          }`}
        >
          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#6739B7]" />}
        </div>
      </button>
    );
  }

  // Default: Grid-2 horizontal row card matching phone view
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`relative flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-[14px] transition-all duration-200 text-left cursor-pointer select-none w-full h-full min-h-[50px] sm:min-h-[54px] ${
        isSelected
          ? "bg-[#F0E6FF] border-2 border-[#6739B7] shadow-[0_2px_8px_rgba(103,57,183,0.12)]"
          : "bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 pr-2 min-w-0 flex-1">
        {/* Icon Box */}
        <div
          className={`w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[10px] sm:rounded-[12px] flex items-center justify-center text-base sm:text-lg shrink-0 transition-colors ${
            isSelected ? "bg-[#FD9D03] text-[#0A1D3D]" : "bg-[#EAF6FF] text-[#00668A]"
          }`}
        >
          {option.icon}
        </div>

        {/* Label */}
        <span
          className="text-[13px] sm:text-[14px] font-bold text-[#0A1D3D] leading-snug break-words min-w-0 flex-1 text-left"
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
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all ${
          isSelected ? "border-2 border-[#6739B7] bg-white" : "border-2 border-[#D8DFE8] bg-white"
        }`}
      >
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#6739B7]" />}
      </div>
    </button>
  );
}
