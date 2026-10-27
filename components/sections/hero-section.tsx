"use client";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
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
              className="text-[38px] sm:text-[48px] lg:text-[46px] xl:text-[56px] 2xl:text-[58px] font-[800] text-[#0A1D3D] leading-[1.08] lg:leading-[52px] xl:leading-[60px] tracking-[-1.5px] mb-5 sm:mb-6 lg:mb-7"
              style={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              }}
            >
              <span>Stronger Thinking.</span>

              <div className="relative mt-[4px] flex flex-col items-start">
                {/* Yellow Badge: Brighter (Figma: 254x72, 16px radius, 4px border, 1deg rotate, #FFD54F) */}
                <div className="relative z-[1] inline-flex items-center justify-center px-[10px] sm:px-[12px] py-[2px] bg-[#FFD54F] text-[#0A1D3D] rounded-[14px] sm:rounded-[16px] border-[3px] sm:border-[4px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] sm:shadow-[4px_5px_0px_0px_#0A1D3D] rotate-[-1deg] origin-top-left">
                  <span className="text-[34px] sm:text-[44px] lg:text-[42px] xl:text-[52px] 2xl:text-[54px] font-[800] tracking-[-1.5px] leading-[46px] sm:leading-[54px] lg:leading-[50px] xl:leading-[60px] text-[#0A1D3D]">
                    Brighter
                  </span>
                </div>

                <div className="relative z-[3] -mt-[10px] sm:-mt-[14px] inline-flex items-center justify-center px-[10px] sm:px-[12px] py-[2px] bg-[#0A1D3D] text-white rounded-[14px] sm:rounded-[16px] border-[3px] sm:border-[4px] border-[#0A1D3D] shadow-[3px_4px_0px_0px_#0A1D3D] sm:shadow-[4px_5px_0px_0px_#0A1D3D] rotate-[2deg] origin-top-left">
                  <span className="text-[34px] sm:text-[44px] lg:text-[42px] xl:text-[52px] 2xl:text-[54px] font-[800] tracking-[-1.5px] leading-[46px] sm:leading-[54px] lg:leading-[50px] xl:leading-[60px] text-white">
                    Tomorrows.
                  </span>

                  <div
                    className="absolute -top-[30px] sm:-top-[42px] lg:-top-[46px] xl:-top-[52px] -right-[40px] sm:-right-[52px] lg:-right-[56px] xl:-right-[70px] w-[95px] sm:w-[120px] lg:w-[125px] xl:w-[150px] h-[40px] sm:h-[52px] lg:h-[54px] xl:h-[64px] pointer-events-none select-none z-20"
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
                  <div className="absolute top-[110%] -translate-y-1/2 left-0 w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[420px] xl:max-w-[579px] pointer-events-none select-none -z-10 overflow-hidden">
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
              className="text-[14px] sm:text-[15px] xl:text-[16px] font-[400] text-[#526176] leading-[160%] tracking-[0%] max-w-xl mb-5"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
              }}
            >
              Cognitive evaluations and reflections are crucial. View the child beyond just a number, especially in how AI recognizes their unique abilities.
            </p>

            {/* 3 Feature Badges in a Row (Matching Reference) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 xl:gap-3 mb-6">
              {/* Badge 1: Game-Based Activities */}
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border-[1.5px] border-[#7DD3FC] text-[12px] sm:text-[13px] font-[700] text-[#0A1D3D] hover:bg-[#D5EEFD] transition-colors cursor-default select-none shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M6.8 5H17.2C19.85 5 22 7.15 22 9.8V14C22 16.21 20.21 18 18 18H16.5C15.82 18 15.18 17.65 14.8 17.08L14.2 16.17C13.82 15.6 13.18 15.25 12.5 15.25H11.5C10.82 15.25 10.18 15.6 9.8 16.17L9.2 17.08C8.82 17.65 8.18 18 7.5 18H6C3.79 18 2 16.21 2 14V9.8C2 7.15 4.15 5 6.8 5Z"
                    fill="#0A1D3D"
                    stroke="#0A1D3D"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16" cy="11" r="0.9" fill="#E0F2FE" />
                  <circle cx="18" cy="11" r="0.9" fill="#E0F2FE" />
                  <path d="M6 11H8M7 10V12" stroke="#E0F2FE" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>Game-Based Activities</span>
              </div>

              {/* Badge 2: AI-Assisted Insights */}
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border-[1.5px] border-[#7DD3FC] text-[12px] sm:text-[13px] font-[700] text-[#0A1D3D] hover:bg-[#D5EEFD] transition-colors cursor-default select-none shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <rect x="2" y="9.5" width="3.5" height="8.5" rx="1.5" fill="#38BDF8" stroke="#0A1D3D" strokeWidth="1.4" />
                  <rect x="8.2" y="5.5" width="3.5" height="12.5" rx="1.5" fill="#0284C7" stroke="#0A1D3D" strokeWidth="1.4" />
                  <rect x="14.5" y="2" width="3.5" height="16" rx="1.5" fill="#38BDF8" stroke="#0A1D3D" strokeWidth="1.4" />
                </svg>
                <span>AI-Assisted Insights</span>
              </div>

              {/* Badge 3: Personalized Growth Trails */}
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#E0F2FE] border-[1.5px] border-[#7DD3FC] text-[12px] sm:text-[13px] font-[700] text-[#0A1D3D] hover:bg-[#D5EEFD] transition-colors cursor-default select-none shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M10 18V10" stroke="#0A1D3D" strokeWidth="1.6" strokeLinecap="round" />
                  <path
                    d="M10 12C7.5 12 5.5 10 5.5 7.5C8 7.5 10 9.5 10 12Z"
                    fill="#38BDF8"
                    stroke="#0A1D3D"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 10C12.5 10 14.5 8 14.5 5.5C12 5.5 10 7.5 10 10Z"
                    fill="#22C55E"
                    stroke="#0A1D3D"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Personalized Growth Trails</span>
              </div>
            </div>

            {/* Bottom Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 xl:gap-3.5 w-full">

              {/* Left Button: Enjoy a Quick 2-Minute Adventure */}
              <button
                className="h-[48px] sm:h-[50px] xl:h-[52px] px-4 sm:px-5 xl:px-6 rounded-2xl bg-white text-[#0A1D3D] font-black text-xs sm:text-[13px] md:text-sm xl:text-[15px] whitespace-nowrap border-[2.5px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_6px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center gap-2 sm:gap-2.5 transition-all cursor-pointer select-none"
              >
                {/* Circular play icon matching exact Figma specs */}
                <div className="w-[22px] h-[22px] xl:w-[24px] xl:h-[24px] rounded-full border-[2px] border-[#0A1D3D] bg-[#D8F3FF] flex items-center justify-center shrink-0 pt-[1px] pb-[2px] select-none">
                  <svg
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 1.8L8.5 5.5L2 9.2V1.8Z"
                      fill="#0A1D3D"
                      stroke="#0A1D3D"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>🍿 Enjoy a Quick 2-Minute Adventure</span>
              </button>

              {/* Right Button: Launch Free Quest! (Navigates to /onboarding) */}
              <Link
                href="/onboarding"
                className="h-[48px] sm:h-[50px] xl:h-[52px] px-5 sm:px-6 xl:px-7 rounded-2xl bg-[#D8F3FF] text-[#0A1D3D] font-black text-xs sm:text-[13px] md:text-sm xl:text-[15px] whitespace-nowrap border-[2.5px] border-[#0A1D3D] shadow-[4px_5px_0px_0px_#0A1D3D] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_6px_0px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
              >
                <span>🎮 Launch Free Quest! 🚀</span>
              </Link>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: Hero Visual & Floating Badges ================= */}
          <div className="relative flex items-center justify-center lg:justify-end select-none mt-6 lg:mt-0">

            {/* The Photo Container with Exact Figma Specs (592px × 516px) & Asymmetrical Organic Radii */}
            <div
              className="relative w-full max-w-[592px] h-[340px] sm:h-[420px] lg:h-[450px] xl:h-[516px] overflow-hidden shadow-2xl shadow-slate-300/80 bg-slate-100 rounded-[100px_32px_100px_32px]"
              style={{
                borderTopLeftRadius: "100px",
                borderTopRightRadius: "32px",
                borderBottomRightRadius: "100px",
                borderBottomLeftRadius: "32px",
              }}
            >
              <Image
                src={encodeURI("/images/Child exploring a tablet.png")}
                alt="Child exploring a tablet"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 592px"
              />

              {/* Floating Pill Badge: Top Right */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-4 xl:top-7 xl:right-4 z-20 pointer-events-none">
                <div className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#E6F4FF] text-[#0A1D3D] border-2 border-[#0A1D3D] text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1.5 rotate-[15deg]">
                  <span>🎮</span>
                  <span>CLASS 1–4 QUEST</span>
                </div>
              </div>

              {/* Floating Card: Top Left Mind Mastery */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 lg:top-4 lg:left-4 xl:top-6 xl:left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5 sm:gap-3 pointer-events-none">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFCE38] border border-amber-300 flex items-center justify-center text-xs sm:text-sm shadow-sm shrink-0">
                  ⭐
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#0284C7] leading-none mb-1">
                    MIND MASTERY
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#0A1D3D] leading-none">
                    94th Percentile 🎉
                  </p>
                </div>
              </div>

              {/* Floating Group: Bottom Left (Overlapping Badge + Card) */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 xl:bottom-5 xl:left-5 z-20 flex flex-col items-start select-none pointer-events-none max-w-[calc(100%-140px)] sm:max-w-none">
                {/* Floating Badge: Overlapping top of card */}
                <div className="relative -mb-3 sm:-mb-3.5 ml-2 z-30">
                  <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FFDE59] text-[#0A1D3D] border-2 border-[#0A1D3D] text-[9px] sm:text-[10px] xl:text-[11px] font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1 rotate-[-3deg] origin-left">
                    <span>🛡️</span>
                    <span>100% FUN & KID-SAFE</span>
                  </div>
                </div>

                {/* Floating Card: Bottom Left ("Their pace. Their potential.") */}
                <div className="bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[22px] px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 xl:py-3 shadow-xl border border-slate-100 flex items-center gap-2.5 sm:gap-3 max-w-[240px] sm:max-w-[270px] xl:max-w-xs">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0284C7]" viewBox="0 0 24 24">
                      <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs xl:text-[13px] font-black text-[#0A1D3D] leading-tight">
                      Their pace. Their potential.
                    </p>
                    <p className="text-[9px] sm:text-[10px] xl:text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                      Understanding starts with play.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge: Bottom Right Streak */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 xl:bottom-5 xl:right-5 z-20 pointer-events-none">
                <div className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#00BCD4] text-[#0A1D3D] border-2 border-[#0A1D3D] text-[10px] sm:text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center gap-1 sm:gap-1.5">
                  <span className="text-xs">⚡</span>
                  <span>STREAK: 7 DAYS!</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    
    </section>
  );
}
