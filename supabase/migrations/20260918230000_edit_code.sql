-- ONEID secure no-login edit system

create extension if not exists "pgcrypto";

alter table public.profiles
add column if not exists edit_code_hash text;

-- Create a profile and securely hash its private edit code.
create or replace function public.create_oneid_profile(
  p_username text,
  p_name text,
  p_bio text,
  p_photo text,
  p_mobile text,
  p_whatsapp text,
  p_socials jsonb,
  p_edit_code text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if trim(coalesce(p_username, '')) = ''
     or trim(coalesce(p_name, '')) = ''
     or trim(coalesce(p_edit_code, '')) = '' then
    return false;
  end if;

  insert into public.profiles (
    username,
    name,
    bio,
    photo,
    mobile,
    whatsapp,
    socials,
    edit_code_hash
  )
  values (
    lower(trim(p_username)),
    trim(p_name),
    nullif(trim(p_bio), ''),
    nullif(trim(p_photo), ''),
    nullif(trim(p_mobile), ''),
    nullif(trim(p_whatsapp), ''),
    coalesce(p_socials, '{}'::jsonb),
    crypt(p_edit_code, gen_salt('bf', 12))
  );

  return true;

exception
  when unique_violation then
    return false;
end;
$$;

-- Verify a private edit code without exposing its hash.
create or replace function public.verify_oneid_edit_code(
  p_username text,
  p_edit_code text
)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where username = lower(trim(p_username))
      and edit_code_hash is not null
      and edit_code_hash = crypt(p_edit_code, edit_code_hash)
  );
$$;

-- Update profile only when the private edit code is correct.
create or replace function public.update_oneid_profile(
  p_username text,
  p_edit_code text,
  p_name text,
  p_bio text,
  p_mobile text,
  p_whatsapp text,
  p_socials jsonb,
  p_photo text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hash text;
begin
  select edit_code_hash
  into v_hash
  from public.profiles
  where username = lower(trim(p_username));

  if v_hash is null then
    return false;
  end if;

  if v_hash <> crypt(p_edit_code, v_hash) then
    return false;
  end if;

  update public.profiles
  set
    name = trim(p_name),
    bio = nullif(trim(p_bio), ''),
    mobile = nullif(trim(p_mobile), ''),
    whatsapp = nullif(trim(p_whatsapp), ''),
    socials = coalesce(p_socials, '{}'::jsonb),
    photo = nullif(trim(p_photo), ''),
    updated_at = now()
  where username = lower(trim(p_username));

  return found;
end;
$$;

revoke all on function public.create_oneid_profile(
  text, text, text, text, text, text, jsonb, text
) from public, anon, authenticated;

grant execute on function public.create_oneid_profile(
  text, text, text, text, text, text, jsonb, text
) to anon, authenticated;

revoke all on function public.verify_oneid_edit_code(text, text)
from public, anon, authenticated;

grant execute on function public.verify_oneid_edit_code(text, text)
to anon, authenticated;

revoke all on function public.update_oneid_profile(
  text, text, text, text, text, text, jsonb, text
) from public, anon, authenticated;

grant execute on function public.update_oneid_profile(
  text, text, text, text, text, text, jsonb, text
) to anon, authenticated;
