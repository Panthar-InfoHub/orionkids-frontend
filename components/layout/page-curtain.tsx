import React from "react";

interface PageCurtainProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageCurtain acts as the solid, opaque sheet of the page
 * that slides over the layered footer underneath, casting
 * a subtle curtain depth shadow along its bottom edge.
 */
export function PageCurtain({ children, className = "" }: PageCurtainProps) {
  return (
    <div
      id="page-content-curtain"
      className={`relative z-10 w-full bg-white shadow-[0_24px_48px_-12px_rgba(10,29,61,0.12)] will-change-[transform,box-shadow] ${className}`}
    >
      {children}
    </div>
  );
}
