import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import {
  SOCIAL_PLATFORM_MAP,
  socialHref,
  type SocialKey,
} from "@/lib/social";
import { telHref, whatsappHref } from "@/lib/format";
import { resolveCard, type CardDesign } from "@/lib/cardStyle";
import { PlayingCard } from "./PlayingCard";
import { SuitSymbol } from "./SuitSymbol";

interface CardPreviewProps {
  seed: string;
  design?: CardDesign;
  name: string;
  username: string;
  bio?: string | null;
  photo?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  socials: Partial<Record<SocialKey, string>>;
  qr?: ReactNode;
}

export function CardPreview({
  seed,
  design,
  name,
  username,
  bio,
  photo,
  mobile,
  whatsapp,
  socials,
  qr,
}: CardPreviewProps) {
  const { suit, rank } = resolveCard(seed, design);

  const filled = Object.entries(socials).filter(
    ([, value]) => (value ?? "").trim().length > 0
  ) as [SocialKey, string][];

  return (
    <PlayingCard
      seed={seed}
      design={design}
      className="mx-auto w-full max-w-[330px]"
    >
      <div className="pc-profile-layout">

        <div className="pc-profile-brand">
          <span>ONEID</span>
          <span className="pc-profile-brand-line" />
          <span>IDENTITY / {rank}{suit}</span>
        </div>

        <div className="pc-profile-photo-wrap">
          <div className="pc-profile-photo">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={name || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              <SuitSymbol
                suit={suit}
                className="text-5xl text-[color:var(--pc-suit)] opacity-60"
              />
            )}
          </div>

          <span className="pc-photo-index">
            {rank}{suit}
          </span>
        </div>

        <div className="pc-profile-copy">
          <p className="pc-profile-kicker">
            PROFILE / 01
          </p>

          <h2>
            {name || "Your name"}
          </h2>

          <p className="pc-profile-handle">
            @{username || "username"}
          </p>

          {bio?.trim() ? (
            <p className="pc-profile-bio">
              {bio}
            </p>
          ) : null}
        </div>

        <div className="pc-profile-symbol" aria-hidden="true">
          <SuitSymbol suit={suit} />
        </div>

        <div className="pc-profile-actions">
          {(mobile || whatsapp || filled.length > 0) && (
            <div className="pc-profile-socials">
              {mobile ? (
                <Chip
                  href={telHref(mobile)}
                  label="Phone"
                  icon={<Phone size={13} />}
                />
              ) : null}

              {whatsapp ? (
                <Chip
                  href={whatsappHref(whatsapp)}
                  label="WhatsApp"
                  icon={<SiWhatsapp size={13} />}
                />
              ) : null}

              {filled.slice(0, 5).map(([key, value]) => {
                const platform = SOCIAL_PLATFORM_MAP[key];
                if (!platform) return null;

                const Icon = platform.icon;

                return (
                  <Chip
                    key={key}
                    href={socialHref(key, value)}
                    label={platform.label}
                    icon={<Icon size={13} />}
                  />
                );
              })}
            </div>
          )}

          {qr ? <div className="pc-profile-qr">{qr}</div> : null}
        </div>

        <div className="pc-profile-footer">
          <span>ONE CARD / EVERYTHING YOU</span>
          <span>{rank} {suit}</span>
        </div>

      </div>
    </PlayingCard>
  );
}

function Chip({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="pc-chip"
    >
      {icon}
    </a>
  );
}
