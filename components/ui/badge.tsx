import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "yellow" | "cyan" | "dark" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "yellow", className, children, ...props }: BadgeProps) {
  const variants = {
    yellow: "bg-[#FFD54F] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D]",
    cyan: "bg-[#00B4C6] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D]",
    dark: "bg-[#0A1D3D] text-white border-2 border-[#FFD54F] shadow-[2px_2px_0px_0px_#FFD54F]",
    outline: "bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
