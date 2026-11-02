import React from "react";

interface GameLevelCalloutProps {
  primaryText?: string;
  secondaryText?: string;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

/**
 * Server Component: Renders the yellow prompt card advising the student about level progression.
 */
export function GameLevelCallout({
  primaryText = "After you complete this level, you'll immediately start Level 2 · Mixed-up Words.",
  secondaryText = "We'll help you move forward. You can take a break anytime you want.",
}: GameLevelCalloutProps) {
  return (
    <div className="w-full bg-[#FFD028] border-2 border-[#0A1D3D] rounded-[14px] px-3.5 py-1.5 sm:py-2 flex items-center gap-2.5 sm:gap-3 shadow-[1.5px_1.5px_0px_#0A1D3D] select-none shrink-0">
      {/* Dark Navy Arrow Button Icon */}
      <div className="w-[24px] h-[24px] rounded-[6px] bg-[#0A1D3D] flex items-center justify-center shrink-0">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Text Copy */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight" style={{ fontFamily: JAKARTA }}>
        <p className="text-[12px] sm:text-[13px] font-bold text-[#0A1D3D]">
          {primaryText}
        </p>
        <p className="text-[11px] sm:text-[12px] font-medium text-[#0A1D3D]/80">
          {secondaryText}
        </p>
      </div>
    </div>
  );
}
