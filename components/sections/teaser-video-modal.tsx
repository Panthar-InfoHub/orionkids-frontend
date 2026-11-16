"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TeaserVideoModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen popup that plays the OrionKids teaser video.
 * The <video> is only mounted while open, so the file is never
 * downloaded for visitors who don't click the teaser button.
 */
export function TeaserVideoModal({ open, onClose }: TeaserVideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="OrionKids 2-minute teaser video"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1D3D]/80 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 w-10 h-10 rounded-full bg-[#FFD54F] text-[#0A1D3D] border-[2.5px] border-[#0A1D3D] shadow-[2px_3px_0px_0px_#0A1D3D] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <X className="w-5 h-5" strokeWidth={3} />
        </button>

        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-[3px] border-[#0A1D3D] shadow-[6px_6px_0px_0px_#0A1D3D] bg-black">
          {/* Source: public/videos/orionkids-teaser.mp4 — 1900×912, H.264/AAC,
              "faststart" so playback begins before the full file downloads. */}
          <video
            src="/videos/orionkids-teaser.mp4"
            poster="/videos/orionkids-teaser-poster.jpg"
            width={1900}
            height={912}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="block w-full h-auto max-h-[80vh] bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
