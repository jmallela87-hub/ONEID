import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { SOCIAL_PLATFORM_MAP, socialHref, type SocialKey } from "@/lib/social";
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
  /** Already-normalized digits (same values the existing pages use). */
  mobile?: string | null;
  whatsapp?: string | null;
  socials: Partial<Record<SocialKey, string>>;
  qr?: ReactNode;
}

export function CardPreview({ seed, design, name, username, bio, photo, mobile, whatsapp, socials, qr }: CardPreviewProps) {
  const { suit, rank } = resolveCard(seed, design);
  const filled = Object.entries(socials).filter(([, v]) => (v ?? "").trim().length > 0) as [SocialKey, string][];

  const pips = (
    <div className="flex flex-col gap-4 text-2xl text-[color:var(--pc-suit)]" aria-hidden="true">
      <SuitSymbol suit={suit} />
      <SuitSymbol suit={suit} />
      <SuitSymbol suit={suit} />
    </div>
  );

  return (
    <PlayingCard seed={seed} design={design} className="mx-auto w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.45em] opacity-60">ONEID</p>

        <div className="mt-5 flex items-center justify-center gap-5">
          {pips}
          <div className="rounded-[50%] border border-[color:var(--pc-suit)] p-1">
            <div className="flex h-[136px] w-[108px] items-center justify-center overflow-hidden rounded-[50%] bg-[color:var(--pc-fg)]/10">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <SuitSymbol suit={suit} className="text-5xl text-[color:var(--pc-suit)] opacity-60" />
              )}
            </div>
          </div>
          {pips}
        </div>

        <div className="pc-ornament" aria-hidden="true">
          <span />
          <b className="font-serif text-xl">
            {rank}
            <SuitSymbol suit={suit} className="ml-1 text-[color:var(--pc-suit)]" />
          </b>
          <span />
        </div>

        <h2 className="font-serif text-2xl font-bold leading-tight">{name}</h2>
        <p className="text-sm opacity-65">@{username}</p>
        {bio?.trim() ? <p className="mt-3 max-w-[16rem] text-sm leading-relaxed opacity-75">{bio}</p> : null}

        {(mobile || whatsapp || filled.length > 0) && (
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {mobile ? <Chip href={telHref(mobile)} label="Phone" icon={<Phone size={17} />} /> : null}
            {whatsapp ? <Chip href={whatsappHref(whatsapp)} label="WhatsApp" icon={<SiWhatsapp size={17} />} /> : null}
            {filled.map(([key, value]) => {
              const platform = SOCIAL_PLATFORM_MAP[key];
              const Icon = platform.icon;
              return <Chip key={key} href={socialHref(key, value)} label={platform.label} icon={<Icon size={17} />} />;
            })}
          </div>
        )}

        {qr}
      </div>
    </PlayingCard>
  );
}

function Chip({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
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
