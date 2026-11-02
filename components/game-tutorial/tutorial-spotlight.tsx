"use client";

import React from "react";

interface TutorialSpotlightProps {
  children?: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export function TutorialSpotlight({
  children,
  isActive = true,
  className = "",
}: TutorialSpotlightProps) {
  if (!isActive) return <>{children}</>;

  return (
    <div className={`relative ${className}`}>
      {/* Subtle Glow Ring */}
      <div
        className="absolute -inset-2 rounded-2xl border-2 border-[#FFE066] bg-[#FFE066]/10 animate-pulse pointer-events-none z-20 shadow-[0_0_24px_rgba(255,224,102,0.4)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
