import React from "react";

interface GameLevelHeaderProps {
  overline?: string;
  title?: string;
  subtitle?: string;
  currentLevel?: number;
  totalLevels?: number;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

/**
 * Server Component: Renders the level header with title, subtitle, and level indicator pills.
 */
export function GameLevelHeader({
  overline,
  title = "Stroop colour-word ✨",
  subtitle = "Level 2 · Mixed-up words 🔮",
  currentLevel = 2,
  totalLevels = 3,
}: GameLevelHeaderProps) {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-3 py-1 sm:py-1.5 select-none shrink-0">
      {/* Left: Titles */}
      <div className="flex flex-col gap-0.5">
        {overline && (
          <span
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "10px",
              lineHeight: "100%",
              letterSpacing: "0.8px",
              color: "#526176",
              textTransform: "uppercase",
            }}
          >
            {overline}
          </span>
        )}

        <div className="flex flex-wrap items-baseline gap-2">
          <h1
            className="flex items-center gap-1.5"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "24px",
              lineHeight: "115%",
              letterSpacing: "-0.5px",
              color: "#0A1D3D",
            }}
          >
            <span>{title}</span>
          </h1>

          <p
            style={{
              fontFamily: JAKARTA,
              fontWeight: 600,
              fontSize: "13px",
              lineHeight: "130%",
              color: "#526176",
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Level Indicators */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full border border-[#0A1D3D] bg-white text-[#0A1D3D] font-extrabold text-[11px] shadow-[1px_1px_0px_#0A1D3D]"
          style={{ fontFamily: JAKARTA }}
        >
          Level {currentLevel}/{totalLevels}
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalLevels }).map((_, i) => {
            const levelNum = i + 1;
            const isCompleted = levelNum < currentLevel;
            const isCurrent = levelNum === currentLevel;

            return (
              <div
                key={levelNum}
                className={`w-[26px] h-[26px] rounded-full border-[1.5px] border-[#0A1D3D] flex items-center justify-center font-extrabold text-[12px] transition-colors select-none ${
                  isCompleted
                    ? "bg-[#4ADE80] text-[#0A1D3D]"
                    : isCurrent
                    ? "bg-[#FFD028] text-[#0A1D3D] shadow-[1px_1px_0px_#0A1D3D]"
                    : "bg-white text-[#0A1D3D]"
                }`}
                style={{ fontFamily: JAKARTA }}
              >
                {isCompleted ? "✓" : levelNum}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
