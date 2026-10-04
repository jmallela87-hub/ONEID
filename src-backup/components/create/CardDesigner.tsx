"use client";

import { RotateCcw } from "lucide-react";
import { SuitSymbol } from "@/components/card/SuitSymbol";
import {
  CARD_THEMES, RANKS, SUITS, SUIT_NAMES, THEME_KEYS, isRed, resolveCard,
  type CardDesign,
} from "@/lib/cardStyle";

interface CardDesignerProps {
  /** Seed used for the automatic fallback (the username). */
  seed: string;
  design: CardDesign;
  onChange: (design: CardDesign) => void;
}

const base = "rounded-xl border px-3 py-2.5 text-sm transition-colors";
const on = "border-accent bg-accent/10 text-ink";
const off = "border-line bg-card text-ink/80 hover:border-accent/60";

export function CardDesigner({ seed, design, onChange }: CardDesignerProps) {
  const r = resolveCard(seed, design);
  const custom = Boolean(design.suit || design.rank || design.theme);

  return (
    <div className="space-y-6 rounded-card border border-line bg-surface p-6">
      {/* Mini card so the choice is visible even when the full preview is off-screen (mobile). */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-[78px] w-[56px] shrink-0 flex-col items-center justify-center rounded-lg font-serif font-bold leading-none shadow-lg"
          style={{ background: r.colors.bg, color: r.colors.suit, boxShadow: "0 0 0 1px rgba(255,255,255,.12)" }}
        >
          <span className="text-xl">{r.rank}</span>
          <SuitSymbol suit={r.suit} className="mt-1 text-2xl" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">
            {r.rank} of {SUIT_NAMES[r.suit]}
            {design.theme ? ` · ${CARD_THEMES[design.theme].label}` : ""}
          </p>
          <p className="text-xs text-muted">{custom ? "Your custom card" : "Automatic — pick anything below"}</p>
        </div>
        {custom && (
          <button
            type="button"
            onClick={() => onChange({})}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <RotateCcw size={13} /> Reset
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">Suit</p>
        <div className="grid grid-cols-4 gap-2">
          {SUITS.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={r.suit === s}
              onClick={() => onChange({ ...design, suit: s })}
              className={`${base} flex flex-col items-center gap-1 ${r.suit === s ? on : off}`}
            >
              <SuitSymbol suit={s} className={`text-2xl ${isRed(s) ? "text-accent" : "text-ink"}`} />
              <span className="text-[11px]">{SUIT_NAMES[s]}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">Rank</p>
        <div className="grid grid-cols-7 gap-2">
          {RANKS.map((rk) => (
            <button
              key={rk}
              type="button"
              aria-pressed={r.rank === rk}
              onClick={() => onChange({ ...design, rank: rk })}
              className={`${base} px-0 text-center font-serif text-base font-bold ${r.rank === rk ? on : off}`}
            >
              {rk}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">Theme</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {THEME_KEYS.map((k) => {
            const t = CARD_THEMES[k];
            return (
              <button
                key={k}
                type="button"
                aria-pressed={design.theme === k}
                onClick={() => onChange({ ...design, theme: k })}
                className={`${base} flex items-center gap-2.5 ${design.theme === k ? on : off}`}
              >
                <span
                  className="flex h-7 w-5 shrink-0 items-center justify-center rounded-[4px] text-[11px] leading-none"
                  style={{ background: t.bg, color: isRed(r.suit) ? t.red : t.black, boxShadow: "0 0 0 1px rgba(255,255,255,.18)" }}
                >
                  <SuitSymbol suit={r.suit} />
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
