"use client";

import React, { useState, useEffect } from "react";
import { PreviewLevel, CardFlipPreviewCard } from "@/types/quest-preview";
import { CARD_FLIP_PREVIEWS } from "@/lib/data/quest-previews";
import { InteractiveHint } from "../interactive-hint";

interface CardFlipPreviewEngineProps {
  level: PreviewLevel;
  onComplete: () => void;
  showHint?: boolean;
}

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export function CardFlipPreviewEngine({
  level,
  onComplete,
  showHint = true,
}: CardFlipPreviewEngineProps) {
  const config = CARD_FLIP_PREVIEWS[level] || CARD_FLIP_PREVIEWS[1];
  const [cards, setCards] = useState<CardFlipPreviewCard[]>(config.cards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  // Reset when level changes
  useEffect(() => {
    setCards(config.cards);
    setFlippedIds([]);
    setMatchedPairIds([]);
    setIsLocked(false);
    setHintDismissed(false);
  }, [config.cards, level]);

  const handleCardClick = (card: CardFlipPreviewCard) => {
    if (isLocked) return;
    if (matchedPairIds.includes(card.pairId)) return;
    if (flippedIds.includes(card.id)) return;

    setHintDismissed(true);

    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        // Matched!
        const newMatched = [...matchedPairIds, firstCard.pairId];
        setMatchedPairIds(newMatched);
        setFlippedIds([]);
        setIsLocked(false);

        if (newMatched.length >= config.pairsToMatch) {
          const timer = setTimeout(() => {
            onComplete();
          }, 600);
          return () => clearTimeout(timer);
        }
      } else {
        // Not matched, flip back after 900ms
        const timer = setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
        }, 900);
        return () => clearTimeout(timer);
      }
    }
  };

  // Find target for hint: card 0, or if card 0 flipped find its pair partner
  let targetHintId: number | null = null;
  if (showHint && !hintDismissed && matchedPairIds.length === 0) {
    if (flippedIds.length === 0) {
      targetHintId = config.hintCardId;
    } else if (flippedIds.length === 1) {
      const firstCard = cards.find((c) => c.id === flippedIds[0]);
      if (firstCard) {
        const partner = cards.find(
          (c) => c.pairId === firstCard.pairId && c.id !== firstCard.id
        );
        if (partner) targetHintId = partner.id;
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">
      {/* Progress Counter Pill */}
      <div className="mb-3 px-4 py-1 rounded-full bg-slate-100 text-[#0A1D3D] text-xs font-bold border border-slate-200">
        <span>Pairs Matched: {matchedPairIds.length} of {config.pairsToMatch}</span>
      </div>

      {/* Grid of Cards */}
      <div
        className={`grid gap-2.5 sm:gap-3 p-2 w-full max-w-[420px] ${
          config.cards.length <= 4
            ? "grid-cols-2 max-w-[260px]"
            : config.cards.length <= 6
            ? "grid-cols-3 max-w-[340px]"
            : "grid-cols-4 max-w-[400px]"
        }`}
      >
        {cards.map((card) => {
          const isFlipped =
            flippedIds.includes(card.id) || matchedPairIds.includes(card.pairId);
          const isMatched = matchedPairIds.includes(card.pairId);
          const isHintTarget = targetHintId === card.id;

          return (
            <div key={card.id} className="relative aspect-square">
              <button
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={isMatched || isLocked}
                aria-label={`Card ${card.id + 1}: ${isFlipped ? card.name : "Face down"}`}
                className={`w-full h-full rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-300 cursor-pointer select-none ${
                  isMatched
                    ? "bg-emerald-50 border-emerald-500 shadow-[2px_2px_0_0_#10B981] scale-95"
                    : isFlipped
                    ? "bg-white border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]"
                    : "bg-[#0A1D3D] hover:bg-[#132c58] text-[#FFE066] border-[#0A1D3D] shadow-[3px_3px_0_0_#FFE066] active:translate-y-0.5"
                } ${isHintTarget ? "ring-4 ring-[#FFE066] ring-offset-2 animate-pulse" : ""}`}
              >
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                    <span className="text-2xl sm:text-3xl">{card.symbol}</span>
                    <span
                      className="text-[10px] font-extrabold text-slate-600 mt-1"
                      style={{ fontFamily: JAKARTA }}
                    >
                      {card.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl sm:text-2xl font-black text-[#FFD028]">
                    ★
                  </span>
                )}
              </button>

              {isHintTarget && (
                <InteractiveHint
                  label={flippedIds.length === 0 ? "Flip card! 🃏" : "Find match! 🪐"}
                  isVisible={true}
                  position="top"
                  onDismiss={() => setHintDismissed(true)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
