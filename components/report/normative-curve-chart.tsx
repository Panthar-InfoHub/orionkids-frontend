"use client";

import React from "react";

const INTER = "var(--font-inter), 'Inter', sans-serif";
const MONO = "'Nimbus Mono PS', 'Courier New', Courier, monospace";

/* ------------------------------------------------------------------ */
/*  Geometry (design units = Figma px, canvas is 597 x 142)             */
/* ------------------------------------------------------------------ */
const W = 597;
const H = 142;
const BASE = 139.2; // baseline y
const PEAK = 100; // curve height
const CX = 302; // bell centre
const SIGMA = 71.6;

const X_25 = 174.4;
const X_75 = 439.2;
const X_USER = 337.6; // Ananya – 57th percentile

const curveY = (x: number) =>
  BASE - PEAK * Math.exp(-((x - CX) ** 2) / (2 * SIGMA ** 2));

const X_START = 33;
const X_END = 564;

const points: string[] = [];
for (let x = X_START; x <= X_END; x += 3) {
  points.push(`${x === X_START ? "M" : "L"}${x} ${curveY(x).toFixed(2)}`);
}
points.push(`L${X_END} ${curveY(X_END).toFixed(2)}`);

const CURVE_PATH = points.join(" ");
const AREA_PATH = `${CURVE_PATH} L${X_END} ${BASE} L${X_START} ${BASE} Z`;
const USER_Y = curveY(X_USER);

const pct = (x: number) => `${(x / W) * 100}%`;

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export function NormativeCurveChart() {
  return (
    <div className="w-full">
      {/* ---------- Curve canvas ---------- */}
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="nc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.25" />
            </linearGradient>
            <clipPath id="nc-left">
              <rect x="0" y="0" width={X_25} height={H} />
            </clipPath>
            <clipPath id="nc-right">
              <rect x={X_75} y="0" width={W - X_75} height={H} />
            </clipPath>
          </defs>

          {/* main fill */}
          <path d={AREA_PATH} fill="url(#nc-fill)" />
          {/* faint zone tints */}
          <path d={AREA_PATH} fill="#FFEDD5" fillOpacity="0.45" clipPath="url(#nc-left)" />
          <path d={AREA_PATH} fill="#DCFCE7" fillOpacity="0.45" clipPath="url(#nc-right)" />

          {/* 25th / 75th dashed markers */}
          <line x1={X_25} y1="28.8" x2={X_25} y2={BASE} stroke="#FDBA74" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={X_75} y1="28.8" x2={X_75} y2={BASE} stroke="#91DDC5" strokeWidth="1" strokeDasharray="4 3" />

          {/* 57th (user) dotted marker */}
          <line x1={X_USER} y1={USER_Y} x2={X_USER} y2={BASE} stroke="#0284C7" strokeWidth="2" strokeDasharray="2 3" />

          {/* curve */}
          <path d={CURVE_PATH} fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Tooltip */}
        <div
          className="absolute top-0 -translate-x-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#0F172A] text-white px-[18px] h-[25px] z-10"
          style={{
            left: pct(X_USER),
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: "14px",
          }}
        >
          Ananya: 57th
        </div>

        {/* Marker dot */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0284C7] z-10"
          style={{
            left: pct(X_USER),
            top: `${(USER_Y / H) * 100}%`,
            boxShadow: "0 0 0 2px #fff, 0 0 0 5px rgba(2,132,199,0.22)",
          }}
        />
      </div>

      {/* ---------- Axis labels ---------- */}
      <div
        className="relative h-3 mt-1.5"
        style={{ fontFamily: MONO, fontSize: "9px", lineHeight: "12px" }}
      >
        <AxisLabel x={41.6} color="#94A3B8">5th</AxisLabel>
        <AxisLabel x={185.6} color="#EA580C" bold>25th</AxisLabel>
        <AxisLabel x={325.6} color="#0284C7" bold>50th (Avg)</AxisLabel>
        <AxisLabel x={450.4} color="#059669" bold>75th</AxisLabel>
        <AxisLabel x={575.2} color="#94A3B8">95th</AxisLabel>
      </div>

      {/* ---------- Zone pills ---------- */}
      <div className="mt-2.5 flex items-center justify-between gap-2 sm:block sm:relative sm:h-4">
        <ZonePill x={99} bg="#FFEDD5" color="#C2410C">Area to Nurture</ZonePill>
        <ZonePill x={325} bg="#E0F2FE" color="#0369A1">Steady Band</ZonePill>
        <ZonePill x={509} bg="#DCFCE7" color="#15803D">Strong Spurt</ZonePill>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function AxisLabel({
  x,
  color,
  bold,
  children,
}: {
  x: number;
  color: string;
  bold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className="absolute top-0 -translate-x-1/2 whitespace-nowrap"
      style={{ left: pct(x), color, fontWeight: bold ? 700 : 400 }}
    >
      {children}
    </span>
  );
}

function ZonePill({
  x,
  bg,
  color,
  children,
}: {
  x: number;
  bg: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 h-4 sm:absolute sm:top-0 sm:-translate-x-1/2"
      style={{
        left: pct(x),
        backgroundColor: bg,
        color,
        fontFamily: INTER,
        fontWeight: 600,
        fontSize: "9px",
        lineHeight: "12px",
      }}
    >
      {children}
    </span>
  );
}
