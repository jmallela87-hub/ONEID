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
    <div className={`pc ${className}`} style={style}>
      <div className="pc-inner">
        <div className="pc-corner tl" aria-hidden="true">
          <span className="text-[22px]">{rank}</span>
          <SuitSymbol suit={suit} className="text-[15px]" />
        </div>

        <div className="pc-corner br" aria-hidden="true">
          <span className="text-[22px]">{rank}</span>
          <SuitSymbol suit={suit} className="text-[15px]" />
        </div>

        <SuitSymbol suit={suit} className="pc-watermark" />

        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
