"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Save, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PhotoPicker } from "@/components/create/PhotoPicker";
import { ExpandableContactField } from "@/components/create/ExpandableContactField";
import { SocialPlatformList } from "@/components/create/SocialPlatformList";
import { normalizePhone } from "@/lib/format";
import type { SocialKey } from "@/lib/social";
import {
  isSupabaseConfigured,
  PROFILE_PHOTOS_BUCKET,
  supabase,
} from "@/lib/supabase";

type Status = "idle" | "loading" | "saving" | "loaded" | "saved";

type EditableProfile = {
  username: string;
  name: string;
  bio: string | null;
  photo: string | null;
  mobile: string | null;
  whatsapp: string | null;
  socials: Record<string, string>;
};

export default function EditPage() {
  const [code, setCode] = useState("");
  const [profile, setProfile] = useState<EditableProfile | null>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [socials, setSocials] =
    useState<Partial<Record<SocialKey, string>>>({});

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function normalizedCode() {
    return code.trim().toUpperCase();
  }

  async function handleContinue() {
    setErrorMessage(null);

    const cleanCode = normalizedCode();

    if (!cleanCode) {
      setErrorMessage("Enter your ONEID edit code.");
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase isn't configured yet — check your environment variables."
      );
      return;
    }

    setStatus("loading");

    const { data, error } = await supabase.rpc(
      "get_oneid_profile_by_edit_code",
      {
        p_edit_code: cleanCode,
      }
    );

    if (error) {
      console.error("Edit code lookup failed:", error);
      setErrorMessage("Couldn't verify your edit code. Please try again.");
      setStatus("idle");
      return;
    }

    const row = Array.isArray(data) ? data[0] : null;

    if (!row) {
      setErrorMessage("That edit code is invalid. Check it and try again.");
      setStatus("idle");
      return;
    }

    const loadedProfile: EditableProfile = {
      username: row.username,
      name: row.name ?? "",
      bio: row.bio ?? null,
      photo: row.photo ?? null,
      mobile: row.mobile ?? null,
      whatsapp: row.whatsapp ?? null,
      socials: row.socials ?? {},
    };

    setProfile(loadedProfile);
    setName(loadedProfile.name);
    setBio(loadedProfile.bio ?? "");
    setMobile(loadedProfile.mobile ?? "");
    setWhatsapp(loadedProfile.whatsapp ?? "");
    setSocials(
      loadedProfile.socials as Partial<Record<SocialKey, string>>
    );
    setPhotoPreviewUrl(loadedProfile.photo);
    setStatus("loaded");
  }

  function handleSocialChange(key: SocialKey, value: string) {
    setSocials((prev) => ({ ...prev, [key]: value }));
  }

  function handleSocialRemove(key: SocialKey) {
    setSocials((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSave() {
    if (!profile) return;

    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Name cannot be empty.");
      return;
    }

    setStatus("saving");

    let photoUrl = profile.photo;

    if (photoFile) {
      const extension = photoFile.name.includes(".")
        ? photoFile.name.split(".").pop()
        : photoFile.type.split("/")[1] || "jpg";

      const path = `${profile.username}-edit-${Date.now()}.${extension}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(PROFILE_PHOTOS_BUCKET)
        .upload(path, photoFile, {
          contentType: photoFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Photo upload failed:", uploadError);
        setErrorMessage(`Couldn't upload your photo: ${uploadError.message}`);
        setStatus("loaded");
        return;
      }

      const { data: publicData } = supabase.storage
        .from(PROFILE_PHOTOS_BUCKET)
        .getPublicUrl(uploadData.path);

      photoUrl = publicData.publicUrl;
    }

    const filledSocials = Object.fromEntries(
      Object.entries(socials).filter(
        ([, value]) => (value ?? "").trim().length > 0
      )
    );

    const { data: updated, error } = await supabase.rpc(
      "update_oneid_profile",
      {
        p_edit_code: normalizedCode(),
        p_name: name.trim(),
        p_bio: bio.trim() || null,
        p_mobile: mobile.trim() ? normalizePhone(mobile) : null,
        p_whatsapp: whatsapp.trim() ? normalizePhone(whatsapp) : null,
        p_socials: filledSocials,
        p_photo: photoUrl,
      }
    );

    if (error) {
      console.error("Profile update failed:", error);
      setErrorMessage(`Couldn't save your ONEID: ${error.message}`);
      setStatus("loaded");
      return;
    }

    if (updated !== true) {
      setErrorMessage("Your edit code could not update this ONEID.");
      setStatus("loaded");
      return;
    }

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            name: name.trim(),
            bio: bio.trim() || null,
            mobile: mobile.trim() ? normalizePhone(mobile) : null,
            whatsapp: whatsapp.trim() ? normalizePhone(whatsapp) : null,
            socials: filledSocials,
            photo: photoUrl,
          }
        : prev
    );

    setPhotoFile(null);
    setPhotoPreviewUrl(photoUrl);
    setStatus("saved");
  }

  if (!profile) {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-md flex-col px-6 py-14 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            ONEID
          </Link>
          <Link
            href="/create"
            className="text-xs text-muted underline decoration-line underline-offset-4 hover:text-ink"
          >
            Create
          </Link>
        </header>

        <section className="mt-20">
          <p className="text-sm text-accent">PRIVATE ACCESS</p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Edit your ONEID
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            Enter the private edit code you received when you created your
            card.
          </p>

          <div className="mt-8">
            <label className="block">
              <span className="mb-2 block text-xs text-muted">
                Enter your Edit Code
              </span>

              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.toUpperCase())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void handleContinue();
                  }
                }}
                placeholder="ONEID-XXXX-XXXX"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                className="w-full rounded-xl border border-line bg-card px-4 py-3.5 font-mono text-sm tracking-wide placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </label>

            {errorMessage && (
              <p className="mt-4 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleContinue()}
              disabled={status === "loading"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "loading" ? "Checking..." : "Continue →"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted">
            Your edit code is private. Never share it publicly.
          </p>
        </section>
      </main>
    );
  }

  const previewUrl = photoPreviewUrl;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-8">
      <header className="mb-10 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ONEID
        </Link>

        <span className="text-xs text-muted">
          @{profile.username}
        </span>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
        <div className="space-y-10">
          <section>
            <p className="mb-4 text-sm text-accent">01 — Your profile</p>

            <div className="space-y-5 rounded-card border border-line bg-surface p-6">
              <PhotoPicker
                previewUrl={previewUrl}
                onSelect={(file, preview) => {
                  setPhotoFile(file);
                  setPhotoPreviewUrl(preview);
                }}
                onError={setErrorMessage}
              />

              <Field label="Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
                />
              </Field>

              <Field label="Username">
                <div className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-muted">
                  @{profile.username}
                </div>
              </Field>

              <Field label="Bio">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  placeholder="Developer • Creator"
                  className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
                />
              </Field>
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm text-accent">02 — Contact</p>

            <div className="space-y-3">
              <ExpandableContactField
                icon={PhoneIcon}
                label="Mobile"
                addLabel="Add phone number"
                placeholder="98765 43210"
                value={mobile}
                onChange={setMobile}
              />

              <ExpandableContactField
                icon={SiWhatsapp}
                label="WhatsApp"
                addLabel="Add WhatsApp number"
                placeholder="98765 43210"
                value={whatsapp}
                onChange={setWhatsapp}
              />
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm text-accent">03 — Profiles</p>

            <SocialPlatformList
              values={socials}
              onChange={handleSocialChange}
              onRemove={handleSocialRemove}
            />
          </section>

          <section>
            <p className="mb-4 text-sm text-accent">04 — Save</p>

            {errorMessage && (
              <p className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            {status === "saved" && (
              <p className="mb-4 rounded-xl border border-line bg-surface px-4 py-3 text-sm">
                Your ONEID has been updated successfully.
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={status === "saving"}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "saving" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {status === "saving" ? "Saving..." : "Save changes →"}
            </button>

            {status === "saved" && (
              <Link
                href={`/p/${profile.username}`}
                target="_blank"
                className="mt-4 block text-center text-xs text-muted underline decoration-line underline-offset-4 hover:text-ink"
              >
                View your public ONEID →
              </Link>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}

function PhoneIcon() {
  return <span className="inline-flex"><Phone size={18} /></span>;
}
