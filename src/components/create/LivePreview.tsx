"use client";

import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  SOCIAL_PLATFORM_MAP,
  socialDisplayLabel,
  socialHref,
  type SocialKey,
} from "@/lib/social";
import { normalizePhone, telHref, whatsappHref } from "@/lib/format";

interface LivePreviewProps {
  name: string;
  username: string;
  bio: string;
  photoPreviewUrl: string | null;
  mobile: string;
  whatsapp: string;
  socials: Partial<Record<SocialKey, string>>;
}

export function LivePreview({
  name,
  username,
  bio,
  photoPreviewUrl,
  mobile,
  whatsapp,
  socials,
}: LivePreviewProps) {
  const filledSocials = Object.entries(socials).filter(
    ([, value]) => (value ?? "").trim().length > 0
  ) as [SocialKey, string][];

  return (
    <div className="rounded-card border border-line bg-card p-8">
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-surface">
          {photoPreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoPreviewUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <p className="mt-4 text-lg font-semibold">
          {name.trim() || "Your name"}
        </p>
        <p className="text-sm text-muted">
          @{username.trim() || "username"}
        </p>
        {bio.trim() && (
          <p className="mt-2 max-w-xs text-sm text-muted">{bio}</p>
        )}
      </div>

      {(mobile.trim() || whatsapp.trim() || filledSocials.length > 0) && (
        <div className="mt-7 space-y-2">
          {mobile.trim() && (
            <PreviewRow
              icon={<Phone size={18} className="text-ink/70" />}
              label="Phone"
              href={telHref(normalizePhone(mobile))}
            />
          )}
          {whatsapp.trim() && (
            <PreviewRow
              icon={<SiWhatsapp size={18} className="text-ink/70" />}
              label="WhatsApp"
              href={whatsappHref(normalizePhone(whatsapp))}
            />
          )}
          {filledSocials.map(([key, value]) => {
            const platform = SOCIAL_PLATFORM_MAP[key];
            const Icon = platform.icon;
            return (
              <PreviewRow
                key={key}
                icon={<Icon size={18} className="text-ink/70" />}
                label={platform.label}
                value={socialDisplayLabel(key, value)}
                href={socialHref(key, value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function PreviewRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  href: string;
}) {
  const isExternal = href.startsWith("http");
  return (
      <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 text-sm transition-colors hover:border-accent/60"
    >
      <span className="flex items-center gap-2.5 text-ink/85">
        {icon}
        {label}
      </span>
      <span className="text-muted">{value ?? "→"}</span>
    </a>
  );
}
