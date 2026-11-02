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
    <header className="w-full shrink-0">
      {/* 1. Top accent line: bg #FF8CC7, height 4px */}
      <div className="w-full h-[4px] bg-[#FF8CC7]" />

      {/* 2. Main Navigation Bar */}
      <div className="w-full bg-[#FFFFFF] border-b border-[#D8DFE8]">
        <div className="max-w-[1440px] w-full mx-auto h-[54px] sm:h-[60px] px-4 sm:px-8 lg:px-[88px] flex items-center gap-4 sm:gap-[24px]">
          <Link href="/" className="flex items-center shrink-0" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={110}
              height={44}
              priority
              className="w-[96px] sm:w-[110px] h-[34px] sm:h-[40px] object-contain"
            />
          </Link>

          {/* Tag Pill in navbar */}
          <span
            className="inline-flex items-center justify-center px-2.5 py-1 rounded-[100px] text-[#0A1D3D] whitespace-nowrap shrink-0 select-none text-[9px] sm:text-[10px] font-extrabold tracking-[0.5px] uppercase bg-[#EAF7EF]"
            style={{ fontFamily: JAKARTA }}
          >
            A WORLD OF POTENTIAL
          </span>
        </div>
      </div>

      {/* 3. Play Journey Section */}
      <div className="w-full bg-[#F0F6FA] pt-2 sm:pt-2.5 pb-1 sm:pb-1.5">
        <div className="max-w-[1264px] w-full mx-auto px-4 sm:px-8 lg:px-0 flex flex-col gap-1.5">
          {/* Top Label Row */}
          <div className="flex flex-row items-center justify-between gap-1.5">
            <span
              style={{
                fontFamily: JAKARTA,
                fontWeight: 800,
                fontSize: "12px",
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
                fontSize: "11px",
                lineHeight: "100%",
                color: "#0A1D3D",
              }}
            >
              {completedLevelsCount}/{totalLevelsCount} levels complete · Six games, one discovery
            </span>
          </div>

          {/* 6 Game Journey Tracks and Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 w-full pt-0.5">
            {GAMES_JOURNEY.map((game, idx) => {
              const isActive = idx === activeGameIndex;
              return (
                <div key={game.id} className="flex flex-col gap-1">
                  {/* Slim progress bar above button */}
                  <div
                    className={`h-[4px] rounded-full w-full border-[1.5px] border-[#0A1D3D] transition-colors ${
                      isActive ? "bg-[#FFD028]" : "bg-white"
                    }`}
                  />

                  {/* Journey Pill Button */}
                  <div
                    className={`h-[32px] sm:h-[35px] px-2 sm:px-3 rounded-full flex items-center justify-center text-center transition-all select-none border-[1.5px] border-[#0A1D3D] ${
                      isActive
                        ? "bg-[#FFD028] text-[#0A1D3D] shadow-[1.5px_1.5px_0px_#0A1D3D]"
                        : "bg-white text-[#0A1D3D]"
                    }`}
                    style={{
                      fontFamily: JAKARTA,
                      fontWeight: 800,
                      fontSize: "11px",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {isActive ? (
                      <span className="flex items-center justify-center gap-1.5 truncate">
                        <span className="w-[16px] h-[16px] rounded-full border border-[#0A1D3D] flex items-center justify-center text-[9px] font-black shrink-0">
                          {game.number}
                        </span>
                        <span className="truncate">{game.name}</span>
                      </span>
                    ) : (
                      <span className="truncate">
                        <span className="font-extrabold mr-1.5">{game.number}</span>
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
