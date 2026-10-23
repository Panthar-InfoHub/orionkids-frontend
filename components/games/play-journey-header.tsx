import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PlayJourneyHeaderProps {
  activeGameIndex?: number; // 0-indexed, default 0 for Stroop
  completedLevelsCount?: number;
  totalLevelsCount?: number;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

const GAMES_JOURNEY = [
  { id: 1, number: "1", name: "Stroop colour-word" },
  { id: 2, number: "2", name: "Card flip" },
  { id: 3, number: "3", name: "Pattern recognition" },
  { id: 4, number: "4", name: "Odd one out" },
  { id: 5, number: "5", name: "Rule discovery" },
  { id: 6, number: "6", name: "Story sequencing" },
];

/**
 * Server Component: Renders the brand navigation and 6-game play journey stepper.
 */
export function PlayJourneyHeader({
  activeGameIndex = 0,
  completedLevelsCount = 1,
  totalLevelsCount = 18,
}: PlayJourneyHeaderProps) {
  return (
    <header className="w-full">
      {/* 1. Top accent line: bg #FF8CC7, height 6px */}
      <div className="w-full h-[6px] bg-[#FF8CC7]" />

      {/* 2. Main Navigation Bar */}
      <div className="w-full bg-[#FFFFFF] border-b border-[#D8DFE8]">
        <div className="max-w-[1440px] w-full mx-auto h-[98px] px-4 sm:px-8 lg:px-[88px] flex items-center gap-[35px]">
          <Link href="/" className="flex items-center shrink-0" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={151}
              height={80}
              priority
              className="w-[151px] h-[80px] object-contain"
            />
          </Link>

          {/* Tag Pill in navbar */}
          <span
            className="inline-flex items-center justify-center w-[141px] h-[23px] rounded-[100px] text-[#0A1D3D] whitespace-nowrap shrink-0 select-none"
            style={{
              backgroundColor: "#EAF7EF",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "10px",
              lineHeight: "100%",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
            }}
          >
            A WORLD OF POTENTIAL
          </span>
        </div>
      </div>

      {/* 3. Play Journey Section */}
      <div className="w-full bg-[#F0F6FA] pt-6 pb-2">
        <div className="max-w-[1264px] w-full mx-auto px-4 sm:px-8 lg:px-0 flex flex-col gap-3">
          {/* Top Label Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#0A1D3D",
                letterSpacing: "0.5px",
              }}
            >
              YOUR PLAY JOURNEY
            </span>

            <span
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "13px",
                lineHeight: "100%",
                color: "#0A1D3D",
              }}
            >
              {completedLevelsCount}/{totalLevelsCount} levels complete · Six games, one discovery
            </span>
          </div>

          {/* 6 Game Journey Tracks and Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 w-full pt-1">
            {GAMES_JOURNEY.map((game, idx) => {
              const isActive = idx === activeGameIndex;
              return (
                <div key={game.id} className="flex flex-col gap-2">
                  {/* Slim progress bar above button */}
                  <div
                    className={`h-[6px] rounded-full w-full border-[1.5px] border-[#0A1D3D] transition-colors ${
                      isActive ? "bg-[#FFD028]" : "bg-white"
                    }`}
                  />

                  {/* Journey Pill Button */}
                  <div
                    className={`h-[42px] px-3.5 rounded-full flex items-center justify-center text-center transition-all select-none border-2 border-[#0A1D3D] ${
                      isActive
                        ? "bg-[#FFD028] text-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D]"
                        : "bg-white text-[#0A1D3D]"
                    }`}
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "13px",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {isActive ? (
                      <span className="flex items-center justify-center gap-1.5 truncate">
                        <span className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#0A1D3D] flex items-center justify-center text-[10px] font-black shrink-0">
                          {game.number}
                        </span>
                        <span className="truncate">{game.name}</span>
                      </span>
                    ) : (
                      <span className="truncate">
                        <span className="font-extrabold mr-2">{game.number}</span>
                        {game.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
