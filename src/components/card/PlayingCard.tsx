import type { CSSProperties, ReactNode } from "react";
import { resolveCard, type CardDesign } from "@/lib/cardStyle";
import { SuitSymbol } from "./SuitSymbol";

interface PlayingCardProps {
  seed: string;
  design?: CardDesign;
  children?: ReactNode;
  className?: string;
}

export function PlayingCard({
  seed,
  design,
  children,
  className = "",
}: PlayingCardProps) {
  const { suit, rank, colors } = resolveCard(seed, design);

  const style = {
    "--pc-bg": colors.bg,
    "--pc-fg": colors.fg,
    "--pc-suit": colors.suit,
  } as CSSProperties;

  return (
    <div
      className={`pc pc-art-directed ${className}`}
      style={style}
      data-suit={suit}
      data-rank={rank}
    >
      <div className="pc-inner">
        <div className="pc-border" aria-hidden="true" />

        <div className="pc-corner pc-corner-tl" aria-hidden="true">
          <span>{rank}</span>
          <SuitSymbol suit={suit} />
        </div>

        <div className="pc-corner pc-corner-br" aria-hidden="true">
          <span>{rank}</span>
          <SuitSymbol suit={suit} />
        </div>

        <div className="pc-suit-ghost" aria-hidden="true">
          <SuitSymbol suit={suit} />
        </div>

        <div className="pc-micro-mark pc-micro-top" aria-hidden="true">
          ONEID / {suit}
        </div>

        <div className="pc-micro-mark pc-micro-bottom" aria-hidden="true">
          52 / {rank}
        </div>

        <div className="pc-content">
          {children}
        </div>
      </div>
    </div>
  );
}
