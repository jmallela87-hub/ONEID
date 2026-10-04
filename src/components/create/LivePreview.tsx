"use client";

import { CardPreview } from "@/components/card/CardPreview";
import { normalizePhone, normalizeUsername } from "@/lib/format";
import type { CardDesign } from "@/lib/cardStyle";
import type { SocialKey } from "@/lib/social";

interface LivePreviewProps {
  name: string;
  username: string;
  bio: string;
  photoPreviewUrl: string | null;
  mobile: string;
  whatsapp: string;
  socials: Partial<Record<SocialKey, string>>;
  /** Frontend-only card customization (never saved). */
  design?: CardDesign;
  /** Display-only: URL the card's QR points to once the ONEID exists. */
  qrValue?: string | null;
}

export function LivePreview({ name, username, bio, photoPreviewUrl, mobile, whatsapp, socials, design, qrValue }: LivePreviewProps) {
  return (
    <CardPreview
      seed={normalizeUsername(username)}
      design={design}
      name={name.trim() || "Your name"}
      username={username.trim() || "username"}
      bio={bio}
      photo={photoPreviewUrl}
      mobile={mobile.trim() ? normalizePhone(mobile) : null}
      whatsapp={whatsapp.trim() ? normalizePhone(whatsapp) : null}
      socials={socials}
    />
  );
}
