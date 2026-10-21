"use client";

import React, { useActionState } from "react";
import { Sparkles, ShieldCheck, BellOff, Lock, CheckCircle2 } from "lucide-react";
import { subscribeToConstellationClub, NewsletterState } from "@/app/actions/blog";

const initialState: NewsletterState = {
  success: false,
  message: "",
};

export function ConstellationClub() {
  const [state, formAction, isPending] = useActionState(
    subscribeToConstellationClub,
    initialState
  );

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 sm:mb-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#EFF3FF] via-[#EEF3FE] to-[#E3ECFE] border border-[#DCE4F7] p-6 sm:p-8 md:p-9 text-center shadow-xs">
        {/* Decorative soft glow */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#FFCF25] text-[#0A1D3D] text-[10px] font-bold tracking-wider px-3.5 py-1 rounded-full uppercase mb-3 shadow-2xs">
          <span>THE CONSTELLATION CLUB</span>
          <Sparkles className="w-3 h-3 fill-[#0A1D3D]" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#0D1829] tracking-tight leading-snug mb-2 max-w-xl mx-auto">
          Get Joyful, Science-Backed Learning Ideas Every Thursday Morning.
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#4B587C] max-w-lg mx-auto leading-relaxed mb-5">
          No guilt, no clinical jargon, and absolutely zero spam. Just three
          low-prep, brain-sparking ideas for you and your explorer to try this
          weekend.
        </p>

        {/* Form */}
        <form action={formAction} className="max-w-md mx-auto mb-4">
          <div className="flex flex-col sm:flex-row items-center bg-white border border-[#D4DDF0] rounded-full p-1 shadow-xs focus-within:border-[#FFB800] focus-within:ring-2 focus-within:ring-[#FFB800]/20 transition-all">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your favorite parent/educator email..."
              className="w-full bg-transparent px-4 py-2 text-xs sm:text-sm text-[#0D1829] placeholder:text-[#8E9BB5] focus:outline-none"
              disabled={isPending || state?.success}
            />
            <button
              type="submit"
              disabled={isPending || state?.success}
              className="w-full sm:w-auto flex-shrink-0 bg-[#FFCF25] hover:bg-[#FFC400] active:scale-95 disabled:opacity-60 text-[#0A1D3D] text-xs font-bold uppercase tracking-wider px-5 py-2 rounded-full transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 mt-1.5 sm:mt-0"
            >
              <span>{isPending ? "Joining..." : "Join Free"}</span>
              <Sparkles className="w-3 h-3 fill-current" />
            </button>
          </div>

          {/* Feedback messages */}
          {state?.message && (
            <div
              className={`mt-2.5 text-xs font-medium flex items-center justify-center gap-1.5 ${
                state.success ? "text-emerald-700" : "text-rose-600"
              }`}
            >
              {state.success && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{state.message}</span>
            </div>
          )}
        </form>

        {/* Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[11px] text-[#526388] font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Over 18,000 curious parents &amp; educators</span>
          </div>
          <span className="text-[#CAD4E8] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <BellOff className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Unsubscribe anytime in 1-click</span>
          </div>
          <span className="text-[#CAD4E8] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>100% Kid-Safe &amp; Ad-Free Privacy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
