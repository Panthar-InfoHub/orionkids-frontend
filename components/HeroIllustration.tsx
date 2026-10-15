"use client";

import React from "react";
import Image from "next/image";

/*
  Figma Image Spec:
  Flow: Vertical
  Width: Fill (376px)
  Height: Hug (312px)
  Gap: 12px
*/
export default function HeroIllustration() {
  return (
    <div className="w-full max-w-[376px] flex flex-col gap-[12px] select-none">
      <div className="relative w-full aspect-[376/282] overflow-hidden bg-slate-100 rounded-[24px_24px_48px_0]">
        <Image
          src={encodeURI("/images/Child exploring a tablet.png")}
          alt="Child exploring a tablet at OrionKids"
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 376px"
          className="object-cover object-center"
          priority
        />
      </div>
      <p className="caption text-center text-[13px] leading-[18px] font-normal text-[#526176]">
        Curiosity first. Understanding follows.
      </p>
    </div>
  );
}
