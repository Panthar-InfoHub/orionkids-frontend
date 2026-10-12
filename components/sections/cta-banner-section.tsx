"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { QuestModal } from "@/components/ui/quest-modal";

export function CtaBannerSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCtaClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#65DCAA", "#FFCE38", "#1763BC"],
    });
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="cta-banner-section"
        className="relative w-full bg-[#1763BC] text-white overflow-hidden select-none scroll-mt-16"
      >
        {/* Dotted Background Overlay at 18% Opacity with Soft-Light Blend */}
        <div
          className="absolute inset-0 bg-repeat pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage: "url('/background/Dotted%20background.png')",
            backgroundSize: "auto",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Floating Space Stickers & Shining Particles */}
        <div className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
          <span className="absolute top-6 left-6 sm:top-8 sm:left-10 text-2xl sm:text-3xl opacity-80 transform -rotate-12">
            🪐
          </span>
          <span className="absolute top-7 right-6 sm:top-8 sm:right-10 text-xl sm:text-2xl opacity-75">
            👾
          </span>
          <span className="absolute bottom-5 right-10 sm:bottom-6 sm:right-14 text-xl sm:text-2xl opacity-80 transform rotate-6">
            🛸
          </span>

          {/* Shining Particles */}
          <div
            className="absolute top-[28%] left-[16%] w-2 h-2 rounded-full bg-white animate-twinkle"
            style={{ boxShadow: "0 0 10px 2px #FFD54F", animationDuration: "2.4s" }}
          />
          <div
            className="absolute top-[70%] left-[24%] w-1.5 h-1.5 rounded-full bg-cyan-200 animate-twinkle"
            style={{ boxShadow: "0 0 8px 2px #67E8F9", animationDuration: "3.2s", animationDelay: "1.1s" }}
          />
          <div
            className="absolute top-[22%] right-[24%] w-2.5 h-2.5 rounded-full bg-white animate-twinkle"
            style={{ boxShadow: "0 0 12px 3px #FFFFFF", animationDuration: "2.7s", animationDelay: "0.6s" }}
          />
          <div
            className="absolute bottom-[28%] right-[32%] w-1.5 h-1.5 rounded-full bg-yellow-200 animate-twinkle"
            style={{ boxShadow: "0 0 8px 2px #FFD54F", animationDuration: "3.0s", animationDelay: "1.8s" }}
          />
          <div
            className="absolute top-[52%] left-[48%] w-1.5 h-1.5 rounded-full bg-white animate-twinkle"
            style={{ boxShadow: "0 0 8px 2px #67E8F9", animationDuration: "2.9s", animationDelay: "1.4s" }}
          />
          <div
            className="absolute bottom-[18%] left-[7%] w-2 h-2 rounded-full bg-yellow-200 animate-twinkle"
            style={{ boxShadow: "0 0 10px 2px #FFD54F", animationDuration: "3.5s", animationDelay: "0.2s" }}
          />
          <div
            className="absolute top-[16%] right-[8%] w-2 h-2 rounded-full bg-cyan-200 animate-twinkle"
            style={{ boxShadow: "0 0 10px 2px #67E8F9", animationDuration: "2.6s", animationDelay: "0.8s" }}
          />
        </div>

        {/* Outer Container (1,433px - 1,440px) */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto min-h-[320px] px-4 sm:px-8 lg:px-[88px] py-10 lg:py-0 flex flex-col justify-center">

          {/* Centered Top Floating Pill Badge */}
          <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30">
            <div
              className="inline-flex items-center gap-2 px-[20px] py-[7px] bg-[#D8F3FF] text-[#0A1D3D] rounded-[16px] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] transform rotate-[-1deg] hover:rotate-0 transition-transform cursor-default whitespace-nowrap"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "11px",
                lineHeight: "100%",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <span>🚀</span>
              <span>STAR MISSION ACTIVATED</span>
              <span>⭐</span>
            </div>
          </div>

          {/* Inner Content Row (1,264px Width, 220px Height on desktop) */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 lg:pt-8 text-left">

            {/* Left Content Column */}
            <div className="flex flex-col items-start max-w-[660px]">
              {/* Heading */}
              <h2
                className="text-white text-left"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(30px, 4vw, 48px)",
                  lineHeight: "112%",
                  letterSpacing: "-1.6px",
                }}
              >
                Let&apos;s discover what makes
                <br />
                your child shine. 🌟
              </h2>

              {/* Subtitle */}
              <p
                className="text-[#C9D6E6] text-left mt-3 max-w-[580px]"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "160%",
                  letterSpacing: "0%",
                }}
              >
                See the games, explore the insights and talk through what thoughtful
                support could look like for your school or family.
              </p>
            </div>

            {/* Right Action Button ("Request a demo") */}
            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-[304px] h-[54px] rounded-[16px] bg-[#65DCAA] text-[#0A1D3D] text-base border-[3px] border-[#0A1D3D] shadow-[4px_4px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-start gap-2 transition-all cursor-pointer whitespace-nowrap pl-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                }}
              >
                <span>Request a demo</span>
                <span className="text-base">🚀</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Contact / Quest Modal */}
      <QuestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule an OrionKids Demo 🚀"
      />
    </>
  );
}
