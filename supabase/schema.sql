-- ONEID V1 schema. Run this once in your Supabase project's SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run).
-- This app has no login for V1, so the anon (public) key is used for every
-- request. RLS below is written for that: anyone can create a profile and
-- anyone can read one, matching a public "print your QR" identity card.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  name text not null,
  bio text,
  photo text,
  mobile text,
  whatsapp text,
  socials jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_username_idx on public.profiles (username);

alter table public.profiles enable row level security;

-- Anyone (including anonymous visitors who scanned a QR) can read a profile.
drop policy if exists "profiles are publicly readable" on public.profiles;
create policy "profiles are publicly readable"
  on public.profiles
  for select
  to anon, authenticated
  using (true);

-- Anyone can create a new profile (no login in V1 — this is the trade-off
-- of a no-auth product; usernames are still protected by the unique
-- constraint above, so nobody can silently overwrite someone else's card).
drop policy if exists "anyone can create a profile" on public.profiles;
create policy "anyone can create a profile"
  on public.profiles
  for insert
  to anon, authenticated
  with check (true);

-- No update/delete policy is created, so profiles cannot be edited or
-- removed via the anon key once created. Add an update policy scoped to a
-- private edit-token column if/when an edit flow is built.

-- Storage: public bucket for profile photos.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatar images are publicly readable" on storage.objects;
create policy "avatar images are publicly readable"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'avatars');

drop policy if exists "anyone can upload an avatar" on storage.objects;
create policy "anyone can upload an avatar"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'avatars');
