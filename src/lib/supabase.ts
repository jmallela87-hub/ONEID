import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when the required Supabase env vars are missing. Used to show a
 * clear config error instead of failing silently or hanging on "Loading…". */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Fall back to harmless placeholder strings so createClient doesn't throw
// during build/prerender when env vars aren't set yet. Real calls are
// gated behind isSupabaseConfigured checks at the call sites.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const PROFILE_PHOTOS_BUCKET = "avatars";
