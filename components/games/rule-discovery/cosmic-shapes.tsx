"use client";

import React from "react";

export type CosmicColor = "red" | "blue" | "yellow";
export type CosmicShapeType = "circle" | "square" | "triangle";

export const COSMIC_COLORS: Record<
  CosmicColor,
  { hex: string; stroke: string; lightBg: string; name: string }
> = {
  red: {
    hex: "#EF4444",
    stroke: "#0A1D3D",
    lightBg: "#FEE2E2",
    name: "Red",
  },
  blue: {
    hex: "#2563EB",
    stroke: "#0A1D3D",
    lightBg: "#DBEAFE",
    name: "Blue",
  },
  yellow: {
    hex: "#FACC15",
    stroke: "#0A1D3D",
    lightBg: "#FEF9C3",
    name: "Yellow",
  },
};

export interface CosmicCardItem {
  id: string | number;
  shape: CosmicShapeType;
  color: CosmicColor;
  label?: string;
}

export function getCardLabel(color: CosmicColor, shape: CosmicShapeType): string {
  const colorName = COSMIC_COLORS[color]?.name || color;
  const shapeName = shape.charAt(0).toUpperCase() + shape.slice(1);
  return `${colorName} ${shapeName}`;
}

/**
 * Reusable, centralized SVG Cosmic Shape renderer.
 * Strictly guarantees correct SVG fills:
 * - Red: #EF4444
 * - Blue: #2563EB
 * - Yellow: #FACC15 (eliminates the white triangle bug permanently)
 * With solid #0A1D3D stroke for contrast on both light and dark backgrounds.
 */
export function CosmicShape({
  shape,
  color,
  size = 32,
  strokeWidth = 5,
  className = "",
}: {
  shape: CosmicShapeType;
  color: CosmicColor;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const colorConfig = COSMIC_COLORS[color] || COSMIC_COLORS.blue;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`overflow-visible inline-block shrink-0 ${className}`}
      aria-hidden="true"
      data-testid={`cosmic-shape-${shape}-${color}`}
    >
      {shape === "circle" && (
        <circle
          cx="50"
          cy="50"
          r="40"
          fill={colorConfig.hex}
          stroke={colorConfig.stroke}
          strokeWidth={strokeWidth}
        />
      )}
      {shape === "square" && (
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="16"
          fill={colorConfig.hex}
          stroke={colorConfig.stroke}
          strokeWidth={strokeWidth}
        />
      )}
      {shape === "triangle" && (
        <polygon
          points="50,12 90,86 10,86"
          fill={colorConfig.hex}
          stroke={colorConfig.stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/**
 * Visual representation of a card (e.g. for targets or options)
 */
export function CosmicCardBadge({
  card,
  size = "md",
  highlight = false,
  highlightColor = "green",
}: {
  card: CosmicCardItem;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  highlightColor?: "green" | "yellow" | "blue";
}) {
  const shapeSize = size === "sm" ? 22 : size === "lg" ? 38 : 30;
  const label = card.label || getCardLabel(card.color, card.shape);

  let borderClasses = "border-2 border-[#0A1D3D]";
  let ringClasses = "";

  if (highlight) {
    if (highlightColor === "green") {
      borderClasses = "border-3 border-[#16A34A]";
      ringClasses = "ring-4 ring-[#16A34A]/25 bg-emerald-50 text-[#065F46]";
    } else if (highlightColor === "yellow") {
      borderClasses = "border-3 border-[#F59E0B]";
      ringClasses = "ring-4 ring-[#F59E0B]/30 bg-amber-50 text-[#92400E]";
    }
  }

  return (
    <div
      className={`relative inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[14px] bg-white font-extrabold shadow-[2px_2px_0px_#0A1D3D] transition-transform ${borderClasses} ${ringClasses}`}
    >
      <CosmicShape shape={card.shape} color={card.color} size={shapeSize} />
      <span className="text-xs sm:text-sm font-black whitespace-nowrap text-[#0A1D3D]">
        {label}
      </span>
      {highlight && (
        <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-[#16A34A] text-white text-[10px] font-black shadow-sm uppercase tracking-wider">
          Match
        </span>
      )}
    </div>
  );
}

