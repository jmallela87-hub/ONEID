import { SUITS } from "@/lib/cardStyle";
import { SuitSymbol } from "./SuitSymbol";

export function SectionLabel({ n, title }: { n: string; title: string }) {
  const suit = SUITS[(Number(n) - 1 + 4) % 4] ?? SUITS[0];
  const red = suit === "♥" || suit === "♦";
  return (
    <p className="mb-4 flex items-center gap-2.5 text-sm">
      <SuitSymbol suit={suit} className={`text-base ${red ? "text-accent" : "text-ink"}`} />
      <span className="font-serif text-base font-semibold tracking-wide">{title}</span>
      <span className="text-xs text-muted">{n}</span>
      <span className="h-px flex-1 bg-line" />
    </p>
  );
}
