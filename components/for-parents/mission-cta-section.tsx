"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * Measured from the Figma screenshot (shown at 0.6x), values in Figma px.
 *
 * Card      : 896 x 594, radius 24, bg #0E213C, hard shadow 8px 8px 0 #00B4C6, no border
 *             padding top 36 / x 56 / bottom 32
 * Rhythm    : pill(24) -28- headline(40/48) -8- subtitle(15/24) -24- row1 -22- row2 -27- CTA(60) -32- note
 * Fields    : 48 tall, radius 12, two columns 382 wide with a 20px gap
 * Cat gif   : ~88px, horizontally centred, sitting ON the top edge of the card (not inside it)
 * Dart      : 152 x 128, 62px above the card top and 88px beyond its right edge
 *
 * Gif / dart sizes use `cqw` (1% of the card width) so they scale with the card.
 */

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const SPACE = "var(--font-space-grotesk), 'Space Grotesk', sans-serif";

const inputClass =
  "block w-full h-12 rounded-[12px] bg-white px-5 text-[#0A1D3D] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#65DCAA]";
const inputStyle: React.CSSProperties = {
  fontFamily: JAKARTA,
  fontSize: "15px",
  fontWeight: 500,
};
const labelClass = "block mb-1.5 text-white";
const labelStyle: React.CSSProperties = {
  fontFamily: JAKARTA,
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "16px",
};

export function ForParentsMissionCtaSection() {
  const [parentName, setParentName] = useState("");
  const [childGrade, setChildGrade] = useState("Ages 6–7 (Class 1 – 2)");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="parent-portal-mission"
      className="relative w-full overflow-hidden py-16 lg:py-[91px] scroll-mt-12"
      style={{ backgroundColor: "#F7FBFF" }}
    >
      <div className="mx-auto w-full max-w-[896px] px-4 sm:px-6 lg:px-0">
        {/* ================= DARK NAVY CARD ================= */}
        <div
          className="relative w-full rounded-[24px] px-5 pt-9 pb-8 text-center sm:px-10 lg:min-h-[594px] lg:px-14"
          style={{
            backgroundColor: "#0E213C",
            boxShadow: "8px 8px 0 0 #00B4C6",
            containerType: "inline-size",
          }}
        >
          {/* Cat GIF: sits on top of the card's top edge, centred */}
          <div
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 select-none"
            style={{
              bottom: "100%",
              width: "clamp(56px, 9.8cqw, 88px)",
              aspectRatio: "1 / 1",
            }}
          >
            <Image
              src="/gif/cat.gif"
              alt="Cute playful cat"
              width={88}
              height={88}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>

          {/* Bullseye dart: top-right, perfectly overlapping the card's corner */}
          <div
            className="pointer-events-none absolute z-20 select-none -top-6 sm:-top-8 lg:-top-9 -right-2 sm:-right-3 lg:-right-4 w-[85px] sm:w-[105px] lg:w-[120px]"
            style={{ aspectRatio: "152 / 128" }}
          >
            <Image
              src={encodeURI("/svg/dart_target.svg")}
              alt="Bullseye target dart"
              width={152}
              height={128}
              unoptimized
              className="h-full w-full object-contain drop-shadow-md"
            />
          </div>

          {/* Green pill */}
          <div className="mb-7 flex justify-center">
            <div
              className="inline-flex select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full"
              style={{
                height: "24px",
                paddingLeft: "16px",
                paddingRight: "16px",
                backgroundColor: "#65DCAA",
                color: "#0A1D3D",
                fontFamily: SPACE,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "0.72px",
                textTransform: "uppercase",
              }}
            >
              <span className="text-xs" aria-hidden="true">
                ⭐
              </span>
              <span>STAR MISSION ACTIVATED</span>
            </div>
          </div>

          {/* Headline: 40 / 48 */}
          <h2
            className="mx-auto mb-2 max-w-[800px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 800,
              fontSize: "clamp(26px, 4.5vw, 40px)",
              lineHeight: "clamp(34px, 5.4vw, 48px)",
              letterSpacing: "-0.8px",
              color: "#FEF9EE",
            }}
          >
            Ready to discover what makes your child
            <br className="hidden sm:block" /> shine?
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto mb-6 max-w-[490px]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "24px",
              color: "#D8F3FF",
            }}
          >
            Unlock the 14-day free cognitive quest and receive your family&apos;s welcome kit with
            printable weekend learning cards.
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="mx-auto w-full text-left">
            <div className="mb-[22px] grid grid-cols-1 gap-x-5 gap-y-[22px] sm:grid-cols-2">
              <div>
                <label htmlFor="parent-name" className={labelClass} style={labelStyle}>
                  Parent / Guardian Name
                </label>
                <input
                  id="parent-name"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="child-grade" className={labelClass} style={labelStyle}>
                  Child&apos;s Age / Grade
                </label>
                <select
                  id="child-grade"
                  value={childGrade}
                  onChange={(e) => setChildGrade(e.target.value)}
                  className={`${inputClass} cursor-pointer appearance-none`}
                  style={inputStyle}
                >
                  <option value="Ages 6–7 (Class 1 – 2)">Ages 6–7 (Class 1 – 2)</option>
                  <option value="Ages 8–9 (Class 3 – 4)">Ages 8–9 (Class 3 – 4)</option>
                  <option value="Ages 10–11 (Class 5 – 6)">Ages 10–11 (Class 5 – 6)</option>
                </select>
              </div>
            </div>

            <div className="mb-[27px]">
              <label htmlFor="parent-email" className={labelClass} style={labelStyle}>
                Your Email Address
              </label>
              <input
                id="parent-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@home.org"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* CTA: 415 x 60 */}
            <div className="mb-8 flex justify-center">
              <button
                type="submit"
                className="flex h-[60px] w-full cursor-pointer select-none items-center justify-center gap-2 rounded-full px-6 transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 sm:w-[415px]"
                style={{
                  backgroundColor: "#FFD028",
                  color: "#0A1D3D",
                  fontFamily: JAKARTA,
                  fontWeight: 800,
                  fontSize: "17px",
                  boxShadow: "3px 4px 0 0 #0A1D3D",
                }}
              >
                <span>Get Parent Welcome Kit &amp; Quest</span>
                <span className="select-none text-base">🚀</span>
              </button>
            </div>

            {/* Trust note */}
            <p
              className="text-center"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 500,
                fontSize: "13px",
                lineHeight: "18px",
                color: "#D8F3FF",
              }}
            >
              🔒 No credit card needed • Cancel anytime • 100% ad-free &amp; child-safe
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
