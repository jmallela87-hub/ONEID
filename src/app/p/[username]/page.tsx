import { notFound } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { ProfileRow } from "@/types/profile";
import type { SocialKey } from "@/lib/social";
import { CardPreview } from "@/components/card/CardPreview";

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

  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center px-5 py-12 sm:px-8">
      <CardPreview
        seed={profile.username}
        name={profile.name}
        username={profile.username}
        bio={profile.bio}
        photo={profile.photo}
        mobile={profile.mobile}
        whatsapp={profile.whatsapp}
        socials={socials}
      />
      <p className="mt-10 font-serif text-sm tracking-widest text-muted">ONEID</p>
    </main>
  );
}

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
      <p className="font-serif text-sm font-semibold tracking-widest">ONEID</p>
      <h1 className="mt-6 text-lg font-medium">{title}</h1>
      <p className="mt-2 text-sm text-muted">{message}</p>
    </main>
  );
}
