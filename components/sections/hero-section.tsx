"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { SITE_CONFIG } from "@/lib/constants";
import { QuestModal } from "@/components/ui/quest-modal";

export function HeroSection() {
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [questModalTitle, setQuestModalTitle] = useState("Quick 2-Minute Cognitive Adventure");

  const handleLaunchQuest = (title = "Launch Free Quest! 🚀") => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFCE38", "#00BCD4", "#0A1D3D"],
    });
    setQuestModalTitle(title);
    setQuestModalOpen(true);
  };

  return (
    <section className="relative w-full bg-white min-h-[calc(100vh-103px)] flex flex-col justify-center pt-3 pb-8 lg:pt-4 lg:pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col items-start text-left z-10">

            {/* Stable Saturn Planet */}
            <div className="text-3xl sm:text-4xl select-none mb-1 ml-2">
              🪐
            </div>

            {/* Top Pill Tag - Responsive for Mobile & Desktop */}
            <div
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-[14px] py-1.5 sm:py-[6px] h-auto min-h-[30px] sm:h-[31px] rounded-[14px] sm:rounded-[16px] bg-[#E8DBFF] text-[#0A1D3D] border-[2px] border-[#0A1D3D] -rotate-1 sm:-rotate-2 origin-left select-none mb-3 max-w-full"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span className="text-xs leading-none shrink-0">⚡</span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[12px] font-[800] tracking-[0.3px] sm:tracking-[0.5px] uppercase leading-tight sm:leading-none text-[#0A1D3D]">
                <span>SUPER-POWERS FOR KIDS · CLASSES 1–4</span>
                <span className="whitespace-nowrap">⭐ 100% KID TESTED!</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              className="text-[40px] sm:text-[50px] lg:text-[58px] font-[800] text-[#0A1D3D] leading-[1.08] lg:leading-[60px] tracking-[-1.5px] mb-2"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>Stronger Thinking.</span>

              <div className="relative mt-[4px] flex flex-col items-start">
                {/* Yellow Badge: Brighter (Figma: 254x72, 16px radius, 4px border, 1deg rotate, #FFD54F) */}
                <div className="relative z-[1] inline-flex items-center justify-center px-[12px] py-[2px] bg-[#FFD54F] text-[#0A1D3D] rounded-[16px] border-[4px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] rotate-[-1deg] origin-top-left">
                  <span className="text-[38px] sm:text-[48px] lg:text-[54px] font-[800] tracking-[-1.5px] leading-[60px] text-[#0A1D3D]">
                    Brighter
                  </span>
                </div>

                {/* Purple Badge: Tomorrows. (Figma: 365x72, 16px radius, 4px border, -2deg rotate, #00B4C6) */}
                <div className="relative z-[3] -mt-[14px] inline-flex items-center justify-center px-[12px] py-[2px] bg-[#0A1D3D] text-white rounded-[16px] border-[4px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] rotate-[2deg] origin-top-left">
                  <span className="text-[38px] sm:text-[48px] lg:text-[54px] font-[800] tracking-[-1.5px] leading-[60px] text-white">
                    Tomorrows.
                  </span>

                  {/* Playful Cartoon Cat GIF: Anchored directly to the top-right of the Tomorrows badge */}
                  <div
                    className="absolute -top-[36px] sm:-top-[46px] lg:-top-[52px] -right-[45px] sm:-right-[55px] lg:-right-[70px] w-[100px] sm:w-[130px] lg:w-[150px] h-[44px] sm:h-[56px] lg:h-[64px] pointer-events-none select-none z-20"
                    style={{
                      transform: "scaleX(-1)",
                    }}
                  >
                    <Image
                      src={encodeURI("/gif/cartoon.webp")}
                      alt="Playful cartoon cat"
                      width={150}
                      height={64}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* SVG Line (line.svg) extending to the right from the vertical middle of Tomorrows */}
                  <div className="absolute top-[110%] -translate-y-1/2 left-0 w-[579px] max-w-none pointer-events-none select-none -z-10">
                    <Image
                      src="/svg/line.svg"
                      alt="Decorative line"
                      width={579}
                      height={16}
                      unoptimized
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </h1>

            {/* Decorative Sparkle Stars below headline */}
            <div className="flex items-center gap-1.5 text-[#FFCE38] mt-2 mb-3 pl-1 select-none">
              <svg className="w-9.5 h-8.5 fill-[#FFCE38]" viewBox="0 0 24 24">
                <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
              </svg>
              <svg className="w-5 h-5 fill-[#FFCE38]" viewBox="0 0 24 24">
                <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
              </svg>
            </div>

            {/* Sub-headline Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-[3px] bg-[#FF7A00] rounded-full shrink-0"></span>
              <span
                className="text-[11px] font-[700] uppercase tracking-[1.4px] leading-none text-[#526176]"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                A WORLD OF DISCOVERY FOR CLASSES 1–4
              </span>
            </div>

            {/* Descriptive Paragraph */}
            <p
              className="text-[16px] font-[400] text-[#526176] leading-[160%] tracking-[0%] max-w-xl mb-5"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Playful cognitive assessment, thoughtful insights and practical next steps. See the child beyond a score.
            </p>

            {/* 3 Feature Badges in a Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5">
              {SITE_CONFIG.heroBadges.map((badge) => (
                <div
                  key={badge.text}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#0A1D3D] text-xs font-black text-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] ${badge.bg || "bg-white"
                    } hover:scale-105 transition-transform cursor-default select-none`}
                >
                  <span className="text-sm">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Bottom Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">

              {/* Left Button: Enjoy a Quick 2-Minute Adventure */}
              <button
                onClick={() => handleLaunchQuest("2-Minute Cognitive Adventure 🍿")}
                className="h-[52px] px-5 sm:px-6 rounded-2xl bg-white text-[#0A1D3D] font-black text-xs sm:text-sm md:text-[15px] whitespace-nowrap border-[2.5px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_6px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center gap-2.5 transition-all cursor-pointer select-none"
              >
                {/* Circular play icon outline with black triangle */}
                <div className="w-5 h-5 rounded-full border-[1.5px] border-[#0A1D3D] flex items-center justify-center shrink-0">
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[7px] border-l-[#0A1D3D] ml-0.5"></div>
                </div>
                <span>🍿 Enjoy a Quick 2-Minute Adventure</span>
              </button>

              {/* Right Button: Launch Free Quest! */}
              <button
                onClick={() => handleLaunchQuest("Launch Free Quest! 🚀")}
                className="h-[52px] px-6 sm:px-7 rounded-2xl bg-[#D8F3FF] text-[#0A1D3D] font-black text-xs sm:text-sm md:text-[15px] whitespace-nowrap border-[2.5px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_6px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
              >
                <span>🎮 Launch Free Quest! 🚀</span>
              </button>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: Hero Visual & Floating Badges ================= */}
          <div className="relative flex items-center justify-center lg:justify-end select-none mt-6 lg:mt-0">

            {/* The Photo Container with Exact Figma Specs (592px × 516px) & Asymmetrical Organic Radii - Clickable to /login */}
            <Link
              href="/login"
              aria-label="Start child cognitive onboarding adventure"
              className="group relative block w-full max-w-[592px] h-[360px] sm:h-[440px] lg:h-[516px] overflow-hidden shadow-2xl shadow-slate-300/80 bg-slate-100 cursor-pointer rounded-[100px_32px_100px_32px] transition-all duration-300 hover:shadow-cyan-200/50 hover:scale-[1.015] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00BCD4]"
              style={{
                borderTopLeftRadius: "100px",
                borderTopRightRadius: "32px",
                borderBottomRightRadius: "100px",
                borderBottomLeftRadius: "32px",
              }}
            >
              <Image
                src={encodeURI("/images/Child exploring a tablet.png")}
                alt="Child exploring a tablet - Click to start onboarding"
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 592px"
              />

              {/* Floating Pill Badge: Top Right */}
              <div className="absolute top-4 right-4 sm:top-7 sm:right-4 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                <div className="px-3.5 py-1.5 rounded-full bg-white text-[#0A1D3D] border-2 border-[#0A1D3D] text-[11px] sm:text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1.5 rotate-[15deg]">
                  <span>🎮</span>
                  <span>CLASS 1–4 QUEST</span>
                </div>
              </div>

              {/* Floating Card: Top Left Mind Mastery */}
              <div className="absolute top-15 left-5 sm:top-15 sm:left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 shadow-lg border border-slate-100 flex items-center gap-3 pointer-events-none transition-transform duration-300 group-hover:-translate-y-0.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFCE38] border border-amber-300 flex items-center justify-center text-sm shadow-sm shrink-0">
                  ⭐
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] leading-none mb-1">
                    MIND MASTERY
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#0A1D3D] leading-none">
                    94th Percentile 🎉
                  </p>
                </div>
              </div>

              {/* Floating Group: Bottom Left (Overlapping Badge + Card) */}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 flex flex-col items-start select-none pointer-events-none transition-transform duration-300 group-hover:-translate-y-0.5">
                {/* Floating Badge: Overlapping top of card */}
                <div className="relative -mb-3.5 ml-2 z-30">
                  <div className="px-3 py-1 rounded-full bg-[#FFDE59] text-[#0A1D3D] border-2 border-[#0A1D3D] text-[10px] sm:text-[11px] font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1 rotate-[-3deg] origin-left">
                    <span>🛡️</span>
                    <span>100% FUN & KID-SAFE</span>
                  </div>
                </div>

                {/* Floating Card: Bottom Left ("Their pace. Their potential.") */}
                <div className="bg-white/95 backdrop-blur-md rounded-[22px] px-4 sm:px-5 py-3 shadow-xl border border-slate-100 flex items-center gap-3 max-w-[280px] sm:max-w-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] shrink-0">
                    <svg className="w-5 h-5 fill-[#0284C7]" viewBox="0 0 24 24">
                      <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-[13px] font-black text-[#0A1D3D] leading-tight">
                      Their pace. Their potential.
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                      Understanding starts with play.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Bottom Right Streak */}
              <div className="absolute bottom-4 right-15 sm:bottom-5 sm:right-15 z-20 pointer-events-none transition-transform duration-300 group-hover:scale-105">
                <div className="px-3.5 py-1.5 rounded-full bg-[#00BCD4] text-[#0A1D3D] border-2 border-[#0A1D3D] text-[11px] sm:text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1.5">
                  <span className="text-xs">⚡</span>
                  <span>STREAK: 7 DAYS!</span>
                </div>
              </div>

              {/* Subtle hover overlay hint */}
              <div className="absolute inset-0 bg-[#0A1D3D]/0 group-hover:bg-[#0A1D3D]/5 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-4 py-2 rounded-full bg-white/95 text-[#0A1D3D] font-black text-xs shadow-lg border border-slate-200 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Click to begin child journey</span>
                  <span>→</span>
                </span>
              </div>
            </Link>

          </div>

        </div>
      </div>

      {/* Interactive Micro-Quest Modal */}
      <QuestModal
        isOpen={questModalOpen}
        onClose={() => setQuestModalOpen(false)}
        title={questModalTitle}
      />
    </section>
  );
}
