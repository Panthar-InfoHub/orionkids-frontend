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
    <div className="w-full bg-[#FFD028] border-2 border-[#0A1D3D] rounded-[20px] p-4 sm:p-5 flex items-center gap-4 sm:gap-5 shadow-[2px_2px_0px_#0A1D3D] select-none">
      {/* Dark Navy Arrow Button Icon */}
      <div className="w-[44px] h-[44px] rounded-[12px] bg-[#0A1D3D] flex items-center justify-center shrink-0">
        <svg
          width="20"
          height="20"
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
      <div className="flex flex-col gap-0.5" style={{ fontFamily: JAKARTA }}>
        <p className="text-[14px] sm:text-[15px] font-bold text-[#0A1D3D] leading-[140%]">
          {primaryText}
        </p>
        <p className="text-[13px] sm:text-[14px] font-medium text-[#0A1D3D]/90 leading-[140%]">
          {secondaryText}
        </p>
      </div>
    </div>
  );
}
