"use client";

import React, { useState } from "react";

/**
 * Measured from the Figma frame (1440 wide, shown at ~1.04x), values in Figma px.
 *
 * Main div   : bg #FFF0F6, height 647.5 (= 56 + 535.5 + 56)
 * Inner div  : bg #0E1C32, max-w 1024, min-h 535.5, radius 24, centred (left 208 in 1440)
 *              padding 56 left / 64 right / 56 top+bottom
 *              boxShadow: 8px 8px 0px 0px #0E1C32
 * Columns    : left 358 | gap 32 | right card 515 (both stretch to the same height)
 * Left col   : badge(22) -8- headline(44/108%) -6- paragraph(15/160%) ...space... explore card(124)
 * Right card : white, radius 20, padding 32
 *              title(22) -12- [icon label -8- field(41)] x2 (row gap 12, col gap 13)
 *              -14- "TARGET GRADE LEVELS" -10- 3 chips(33, gap 10) -20- CTA(51)
 */

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

const GRADES = ["Classes 1–2", "Classes 3–4", "Classes 5–6"];

/* ----------------------------- tiny icons ----------------------------- */
const iconProps = {
  width: 12,
  height: 12,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#334155",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const UserIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
const SchoolIcon = () => (
  <svg {...iconProps} fill="#334155">
    <rect x="5" y="3" width="14" height="18" rx="2.5" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);
const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#65DCAA"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6739B7"
    strokeWidth="3.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l5 5 9-10" />
  </svg>
);
const CircleIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#526176" strokeWidth="3" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

/* ----------------------------- shared styles ----------------------------- */
const fieldClass =
  "block w-full h-[41px] rounded-[10px] bg-[#F6F8FB] px-5 text-[#0A1D3D] placeholder:text-[#A3ABB8] outline-none focus:ring-2 focus:ring-[#65DCAA]";
const fieldStyle: React.CSSProperties = {
  fontFamily: JAKARTA,
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "20px",
};

function FieldLabel({ htmlFor, icon, text }: { htmlFor: string; icon: React.ReactNode; text: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex h-[14px] items-center">
      {icon}
      <span className="sr-only">{text}</span>
    </label>
  );
}

/* ----------------------------- Section ----------------------------- */
export function SchoolPilotCtaSection() {
  const [grades, setGrades] = useState<string[]>(["Classes 1–2", "Classes 3–4"]);

  const toggleGrade = (g: string) =>
    setGrades((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  return (
    <section className="w-full bg-[#FFF0F6] py-10 lg:py-14 border-b border-[#0A1D3D]">
      <div className="mx-auto w-full max-w-[1024px] px-4 sm:px-6 lg:px-0">
        <div
          className="relative overflow-hidden rounded-[24px] bg-[#0E1C32] px-5 py-8 sm:px-8 sm:py-10 lg:min-h-[535.5px] lg:py-14 lg:pl-14 lg:pr-16"
          style={{
            boxShadow: "8px 8px 0px 0px #0E1C32",
          }}
        >
          {/* Blue glow, bottom-right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 38% 34% at 98% 100%, rgba(23,78,150,0.75) 0%, rgba(23,78,150,0.35) 45%, rgba(23,78,150,0) 100%)",
            }}
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,358fr)_minmax(0,515fr)] lg:items-stretch">
            {/* ================= LEFT COLUMN ================= */}
            <div className="flex flex-col justify-between gap-10 text-left">
              <div>
                {/* Badge */}
                <div
                  className="mb-2 inline-flex h-[22px] items-center gap-1.5 whitespace-nowrap rounded-full bg-[#65DCAA] px-3 select-none"
                  style={{
                    fontFamily: SPACE,
                    fontWeight: 700,
                    fontSize: "10.5px",
                    lineHeight: "14px",
                    letterSpacing: "0.6px",
                    textTransform: "uppercase" as const,
                    color: "#0A1D3D",
                  }}
                >
                  <span className="text-[10px] leading-none">🚀</span>
                  <span>SCHOOL PILOT PLAN</span>
                </div>

                {/* Headline */}
                <h2
                  className="text-[34px] sm:text-[40px] lg:text-[44px] text-white"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 800,
                    lineHeight: "108%",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Bring Playful
                  <br />
                  Discovery to
                  <br />
                  Your School 🏫
                </h2>

                {/* Paragraph */}
                <p
                  className="mt-1.5 max-w-[358px] text-[#E2E8F0]"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 500,
                    fontSize: "15px",
                    lineHeight: "160%",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Discuss your classroom goals with us and explore
                  <br className="hidden sm:block" /> tailored activities and reports for your schedule.
                </p>
              </div>

              {/* Explore card */}
              <div
                className="w-full max-w-[358px] rounded-[16px] p-5"
                style={{ backgroundColor: "rgba(255,255,255,0.09)" }}
              >
                <div
                  className="mb-2.5 flex items-center gap-2 text-[#65DCAA]"
                  style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "13px", lineHeight: "18px" }}
                >
                  <CalendarIcon />
                  <span>Explore a School Pilot</span>
                </div>
                <p
                  className="text-[#C3CBD8]"
                  style={{
                    fontFamily: JAKARTA,
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "165%",
                  }}
                >
                  Discuss class needs, teacher support and
                  <br className="hidden sm:block" /> session planning. Confirm scope, pricing
                  <br className="hidden sm:block" /> and next steps during your walkthrough.
                </p>
              </div>
            </div>

            {/* ================= RIGHT CARD ================= */}
            <form
              className="flex w-full flex-col rounded-[20px] bg-white p-5 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3
                className="mb-3 text-[20px] sm:text-[22px] text-[#0A1D3D]"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  lineHeight: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                Request an Educator Pilot Kit
              </h3>

              {/* 2 x 2 fields */}
              <div className="grid grid-cols-1 gap-x-[13px] gap-y-3 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="pilot-name" icon={<UserIcon />} text="Your name" />
                  <input
                    id="pilot-name"
                    type="text"
                    placeholder="e.g. Dr. Maya Sharma"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="pilot-school" icon={<SchoolIcon />} text="School name" />
                  <input
                    id="pilot-school"
                    type="text"
                    placeholder="e.g. Riverside Academy"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
                <div>
                  <FieldLabel htmlFor="pilot-role" icon={<BriefcaseIcon />} text="Your role" />
                  <select
                    id="pilot-role"
                    defaultValue="Principal / Head of School"
                    className={`${fieldClass} appearance-none`}
                    style={fieldStyle}
                  >
                    <option>Principal / Head of School</option>
                    <option>Teacher</option>
                    <option>Coordinator</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="pilot-email" icon={<MailIcon />} text="Email" />
                  <input
                    id="pilot-email"
                    type="email"
                    placeholder="name@school.edu"
                    className={fieldClass}
                    style={fieldStyle}
                  />
                </div>
              </div>

              {/* Target grade levels */}
              <div
                className="mt-[14px] mb-[10px] text-[#526176]"
                style={{
                  fontFamily: SPACE,
                  fontWeight: 700,
                  fontSize: "11px",
                  lineHeight: "14px",
                  letterSpacing: "0.9px",
                  textTransform: "uppercase" as const,
                }}
              >
                TARGET GRADE LEVELS
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {GRADES.map((g) => {
                  const on = grades.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGrade(g)}
                      className="relative flex h-[33px] w-[114px] items-center justify-center rounded-[10px] bg-[#F6F8FB] text-[#0A1D3D] cursor-pointer select-none transition-colors hover:bg-[#EEF2F6]"
                      style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "13px", lineHeight: "18px" }}
                    >
                      <span className="absolute left-[8px] top-[11px]">{on ? <CheckIcon /> : <CircleIcon />}</span>
                      <span className="pl-3">{g}</span>
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="mt-5 flex h-[51px] w-full items-center justify-center rounded-full bg-[#65DCAA] text-[#0A1D3D] cursor-pointer select-none transition-transform hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px]"
                style={{
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "16px",
                  lineHeight: "24px",
                  boxShadow: "4px 4px 0 0 #0E1C32",
                }}
              >
                Request a School Walkthrough 📅
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
