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
      <div className="flex h-full flex-col items-center text-center">
        <div className="flex w-full items-center justify-center gap-2 pt-1">
          <span className="text-[9px] uppercase tracking-[.42em] opacity-55">
            ONEID
          </span>
          <SuitSymbol suit={suit} className="text-[11px]" />
        </div>

        <div className="mt-6 flex flex-1 flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full border border-[color:var(--pc-suit)] opacity-25" />
            <div className="flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full border border-[color:var(--pc-suit)] bg-black/10">
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
          </div>

          <div className="pc-ornament mt-7">
            <span />
            <div className="flex items-center gap-1 font-serif text-sm">
              <span>{rank}</span>
              <SuitSymbol suit={suit} />
            </div>
            <span />
          </div>

          <h2 className="max-w-[220px] font-serif text-[25px] font-bold leading-[1.02]">
            {name || "Your name"}
          </h2>

          <p className="mt-1 text-[12px] opacity-55">
            @{username || "username"}
          </p>

          {bio?.trim() ? (
            <p className="mt-3 max-w-[210px] text-[11px] leading-relaxed opacity-65">
              {bio}
            </p>
          ) : null}

          <div className="mt-auto pb-1 pt-5">
            {(mobile || whatsapp || filled.length > 0) && (
              <div className="flex flex-wrap justify-center gap-1.5">
                {mobile ? (
                  <Chip
                    href={telHref(mobile)}
                    label="Phone"
                    icon={<Phone size={14} />}
                  />
                ) : null}

                {whatsapp ? (
                  <Chip
                    href={whatsappHref(whatsapp)}
                    label="WhatsApp"
                    icon={<SiWhatsapp size={14} />}
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
                      icon={<Icon size={14} />}
                    />
                  );
                })}
              </div>
            )}

            {qr ? <div className="mt-4">{qr}</div> : null}
          </div>
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
