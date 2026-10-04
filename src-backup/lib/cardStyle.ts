// Frontend-only visual helpers. Nothing here is stored or sent anywhere.
export type Suit = "♠" | "♥" | "♦" | "♣";
export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
export const SUIT_NAMES: Record<Suit, string> = { "♠": "Spades", "♥": "Hearts", "♦": "Diamonds", "♣": "Clubs" };
export const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const isRed = (s: Suit) => s === "♥" || s === "♦";

export type ThemeKey = "classic" | "crimson" | "obsidian" | "emerald" | "ocean" | "pearl" | "midnight";
interface ThemeDef { label: string; bg: string; fg: string; black: string; red: string }

/** black = colour of ♠/♣ pips, red = colour of ♥/♦ pips. */
export const CARD_THEMES: Record<ThemeKey, ThemeDef> = {
  classic:  { label: "Classic",  bg: "#f6f1e6", fg: "#17181c", black: "#17181c", red: "#b3202f" },
  crimson:  { label: "Crimson",  bg: "#5e0d1c", fg: "#fdeef0", black: "#f6d6da", red: "#ff8e9c" },
  obsidian: { label: "Obsidian", bg: "#0e0f12", fg: "#ece8df", black: "#ece8df", red: "#ff6b78" },
  emerald:  { label: "Emerald",  bg: "#0b3a2d", fg: "#e8f1ec", black: "#b9ead0", red: "#ff8f9b" },
  ocean:    { label: "Ocean",    bg: "#0d4b66", fg: "#e6f4f9", black: "#b3e8f7", red: "#ffa2ac" },
  pearl:    { label: "Pearl",    bg: "#eceef2", fg: "#1c2029", black: "#2b3345", red: "#c0283a" },
  midnight: { label: "Midnight", bg: "#0b1230", fg: "#e6e9f7", black: "#aab9ff", red: "#ff7c8d" },
};
export const THEME_KEYS = Object.keys(CARD_THEMES) as ThemeKey[];

/** Optional user choices; any missing part falls back to the automatic card. */
export interface CardDesign { suit?: Suit; rank?: string; theme?: ThemeKey }

const AUTO_THEME: Record<Suit, ThemeKey> = { "♠": "obsidian", "♥": "classic", "♦": "midnight", "♣": "emerald" };

export function cardFor(seed: string): { suit: Suit; rank: string } {
  if (!seed) return { suit: "♠", rank: "A" };
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const i = h % 52;
  return { suit: SUITS[i % 4], rank: RANKS[Math.floor(i / 4) % 13] };
}

export function resolveCard(seed: string, design?: CardDesign) {
  const auto = cardFor(seed);
  const suit = design?.suit ?? auto.suit;
  const rank = design?.rank ?? auto.rank;
  const t = CARD_THEMES[design?.theme ?? AUTO_THEME[suit]];
  return { suit, rank, colors: { bg: t.bg, fg: t.fg, suit: isRed(suit) ? t.red : t.black } };
}
