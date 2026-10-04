import type { Suit } from "@/lib/cardStyle";

/** \uFE0E forces the text glyph (iOS would otherwise draw an emoji heart). */
export function SuitSymbol({ suit, className = "" }: { suit: Suit; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {suit}
      {"\uFE0E"}
    </span>
  );
}
