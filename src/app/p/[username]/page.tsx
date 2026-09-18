import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { ProfileRow } from "@/types/profile";
import {
  SOCIAL_PLATFORM_MAP,
  socialDisplayLabel,
  socialHref,
  type SocialKey,
} from "@/lib/social";
import { telHref, whatsappHref } from "@/lib/format";

// Always fetch the current row from Supabase — this page has no cache and
// no client-side loading state, so there's nothing that can spin forever.
export const revalidate = 0;
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  if (!isSupabaseConfigured) {
    return (
      <ErrorState
        title="ONEID isn't configured"
        message="This deployment is missing its Supabase environment variables."
      />
    );
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username,name,bio,photo,mobile,whatsapp,socials")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    console.error("Failed to load profile:", error);
    return (
      <ErrorState
        title="Couldn't load this ONEID"
        message="There was a problem reaching the database. Please try again."
      />
    );
  }

  if (!data) {
    notFound();
  }

  const profile = data as ProfileRow;
  const socials = (profile.socials ?? {}) as Partial<Record<SocialKey, string>>;
  const filledSocials = Object.entries(socials).filter(
    ([, v]) => (v ?? "").trim().length > 0
  ) as [SocialKey, string][];

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center px-6 py-16 sm:px-8">
      <div className="h-24 w-24 overflow-hidden rounded-full border border-line bg-surface">
        {profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <h1 className="mt-5 text-xl font-semibold">{profile.name}</h1>
      <p className="text-sm text-muted">@{profile.username}</p>
      {profile.bio && (
        <p className="mt-3 max-w-xs text-center text-sm text-muted">
          {profile.bio}
        </p>
      )}

      {(profile.mobile || profile.whatsapp || filledSocials.length > 0) && (
        <div className="mt-8 w-full space-y-2">
          {profile.mobile && (
            <ProfileLink
              href={telHref(profile.mobile)}
              icon={<Phone size={18} className="text-ink/70" />}
              label="Phone"
            />
          )}
          {profile.whatsapp && (
            <ProfileLink
              href={whatsappHref(profile.whatsapp)}
              icon={<SiWhatsapp size={18} className="text-ink/70" />}
              label="WhatsApp"
            />
          )}
          {filledSocials.map(([key, value]) => {
            const platform = SOCIAL_PLATFORM_MAP[key];
            const Icon = platform.icon;
            return (
              <ProfileLink
                key={key}
                href={socialHref(key, value)}
                icon={<Icon size={18} className="text-ink/70" />}
                label={platform.label}
                value={socialDisplayLabel(key, value)}
              />
            );
          })}
        </div>
      )}

      <p className="mt-14 text-xs text-muted">ONEID</p>
    </main>
  );
}

/** Phone/WhatsApp never print the raw number as text (privacy) — tapping
 * still dials/opens chat using the real number underneath. Social rows
 * still show the handle so a visitor knows which account they'll land on. */
function ProfileLink({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon?: ReactNode;
  label: string;
  value?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between rounded-2xl border border-line bg-card px-4 py-3.5 text-sm transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span className="flex items-center gap-3 text-ink/90">
        {icon}
        {label}
      </span>
      <span className="text-muted">{value ?? "→"}</span>
    </a>
  );
}

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
      <p className="text-sm font-semibold tracking-tight">ONEID</p>
      <h1 className="mt-6 text-lg font-medium">{title}</h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </main>
  );
}
