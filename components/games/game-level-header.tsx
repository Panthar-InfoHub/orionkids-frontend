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
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 py-3 select-none">
      {/* Left: Titles */}
      <div className="flex flex-col gap-1">
        {overline && (
          <span
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "11px",
              lineHeight: "100%",
              letterSpacing: "1px",
              color: "#526176",
              textTransform: "uppercase",
            }}
          >
            {overline}
          </span>
        )}

        <h1
          className="flex items-center gap-2"
          style={{
            fontFamily: JAKARTA,
            fontWeight: 800,
            fontSize: "38px",
            lineHeight: "115%",
            letterSpacing: "-0.8px",
            color: "#0A1D3D",
          }}
        >
          <span>{title}</span>
        </h1>

        <p
          style={{
            fontFamily: JAKARTA,
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "140%",
            color: "#526176",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Right: Level Indicators */}
      <div className="flex flex-col items-start sm:items-end gap-2.5 shrink-0">
        <div
          className="px-3.5 py-1 rounded-full border-2 border-[#0A1D3D] bg-white text-[#0A1D3D] font-extrabold text-[13px] shadow-[1px_1px_0px_#0A1D3D]"
          style={{ fontFamily: JAKARTA }}
        >
          Current game · Level {currentLevel}/{totalLevels}
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalLevels }).map((_, i) => {
            const levelNum = i + 1;
            const isCompleted = levelNum < currentLevel;
            const isCurrent = levelNum === currentLevel;

            return (
              <div
                key={levelNum}
                className={`w-[36px] h-[36px] rounded-full border-2 border-[#0A1D3D] flex items-center justify-center font-extrabold text-[14px] transition-colors select-none ${
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
