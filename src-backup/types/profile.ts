import type { SocialKey } from "@/lib/social";

export type SocialsJson = Partial<Record<SocialKey, string>>;

/** Shape of a row in the Supabase `profiles` table. */
export interface ProfileRow {
  id: string;
  username: string;
  name: string;
  bio: string | null;
  photo: string | null;
  mobile: string | null;
  whatsapp: string | null;
  socials: SocialsJson | null;
  created_at: string;
  updated_at: string;
}

/** Payload shape for creating a new profile (id/timestamps are server-assigned). */
export type NewProfile = Pick<
  ProfileRow,
  "username" | "name" | "bio" | "photo" | "mobile" | "whatsapp" | "socials"
>;
