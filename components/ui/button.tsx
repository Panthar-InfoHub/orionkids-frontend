import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "chunky-white" | "chunky-yellow" | "chunky-dark" | "chunky-cyan";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "chunky-yellow",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-sm sm:text-base",
  };

  const variantClasses = {
    "chunky-white": "btn-chunky-white",
    "chunky-yellow": "btn-chunky-yellow",
    "chunky-dark": "btn-chunky-dark",
    "chunky-cyan":
      "bg-[#00B4C6] text-[#0A1D3D] border-[2.5px] border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D]",
  };

  return (
    <button
      className={cn(
        "rounded-2xl font-black tracking-tight inline-flex items-center justify-center gap-2.5 cursor-pointer select-none transition-all",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
