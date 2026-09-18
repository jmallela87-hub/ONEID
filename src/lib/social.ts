import type { ComponentType } from "react";
import {
  SiInstagram,
  SiYoutube,
  SiX,
  SiFacebook,
  SiTiktok,
  SiSnapchat,
  SiTelegram,
  SiDiscord,
  SiGithub,
  SiPinterest,
  SiReddit,
  SiTwitch,
  SiThreads,
  SiSpotify,
} from "react-icons/si";
import { Link2 } from "lucide-react";

export type SocialKey =
  | "instagram"
  | "youtube"
  | "x"
  | "facebook"
  | "linkedin"
  | "tiktok"
  | "snapchat"
  | "telegram"
  | "discord"
  | "github"
  | "pinterest"
  | "reddit"
  | "twitch"
  | "threads"
  | "spotify";

export type PlatformIcon = ComponentType<{ size?: number; className?: string }>;

interface PlatformConfig {
  key: SocialKey;
  label: string;
  placeholder: string;
  icon: PlatformIcon;
  /** Builds the real destination URL from whatever the user typed. */
  buildUrl: (raw: string) => string;
}

function isUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

/** Pulls a bare handle out of a raw value that may be a URL, an @handle, or already bare. */
function extractHandle(raw: string): string {
  let value = raw.trim();
  if (isUrl(value)) {
    try {
      const url = new URL(value);
      const parts = url.pathname.split("/").filter(Boolean);
      value = parts[parts.length - 1] ?? value;
    } catch {
      // fall through and use the raw value
    }
  }
  return value.replace(/^@+/, "");
}

/** Platforms ordered most-used first, per the product brief. */
export const SOCIAL_PLATFORMS: PlatformConfig[] = [
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "username or profile link",
    icon: SiInstagram,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://instagram.com/${extractHandle(raw)}`,
  },
  {
    key: "youtube",
    label: "YouTube",
    placeholder: "channel URL or handle",
    icon: SiYoutube,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://youtube.com/${extractHandle(raw)}`),
  },
  {
    key: "x",
    label: "X",
    placeholder: "username or profile link",
    icon: SiX,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://x.com/${extractHandle(raw)}`),
  },
  {
    key: "facebook",
    label: "Facebook",
    placeholder: "profile URL or username",
    icon: SiFacebook,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://facebook.com/${extractHandle(raw)}`),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "profile URL or username",
    // Simple Icons dropped the LinkedIn logo (legal request), so this uses
    // a generic link glyph instead of a look-alike brand mark.
    icon: Link2,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://linkedin.com/in/${extractHandle(raw)}`,
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "username or profile link",
    icon: SiTiktok,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://tiktok.com/@${extractHandle(raw)}`),
  },
  {
    key: "snapchat",
    label: "Snapchat",
    placeholder: "username",
    icon: SiSnapchat,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://snapchat.com/add/${extractHandle(raw)}`,
  },
  {
    key: "telegram",
    label: "Telegram",
    placeholder: "username",
    icon: SiTelegram,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://t.me/${extractHandle(raw)}`),
  },
  {
    key: "discord",
    label: "Discord",
    placeholder: "invite link or username",
    icon: SiDiscord,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://discord.com/users/${extractHandle(raw)}`,
  },
  {
    key: "github",
    label: "GitHub",
    placeholder: "username or profile link",
    icon: SiGithub,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://github.com/${extractHandle(raw)}`),
  },
  {
    key: "pinterest",
    label: "Pinterest",
    placeholder: "username or profile link",
    icon: SiPinterest,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://pinterest.com/${extractHandle(raw)}`),
  },
  {
    key: "reddit",
    label: "Reddit",
    placeholder: "username",
    icon: SiReddit,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://reddit.com/user/${extractHandle(raw)}`,
  },
  {
    key: "twitch",
    label: "Twitch",
    placeholder: "username or channel link",
    icon: SiTwitch,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://twitch.tv/${extractHandle(raw)}`),
  },
  {
    key: "threads",
    label: "Threads",
    placeholder: "username or profile link",
    icon: SiThreads,
    buildUrl: (raw) => (isUrl(raw) ? raw.trim() : `https://threads.net/@${extractHandle(raw)}`),
  },
  {
    key: "spotify",
    label: "Spotify",
    placeholder: "profile link",
    icon: SiSpotify,
    buildUrl: (raw) =>
      isUrl(raw) ? raw.trim() : `https://open.spotify.com/user/${extractHandle(raw)}`,
  },
];

export const SOCIAL_PLATFORM_MAP: Record<SocialKey, PlatformConfig> =
  Object.fromEntries(SOCIAL_PLATFORMS.map((p) => [p.key, p])) as Record<
    SocialKey,
    PlatformConfig
  >;

/** What the public profile shows next to the platform name, e.g. "@johnxyz". */
export function socialDisplayLabel(key: SocialKey, raw: string): string {
  if (isUrl(raw)) return extractHandle(raw) ? `@${extractHandle(raw)}` : raw;
  return `@${extractHandle(raw)}`;
}

export function socialHref(key: SocialKey, raw: string): string {
  return SOCIAL_PLATFORM_MAP[key].buildUrl(raw);
}
