"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { PhotoPicker } from "@/components/create/PhotoPicker";
import { ExpandableContactField } from "@/components/create/ExpandableContactField";
import { SocialPlatformList } from "@/components/create/SocialPlatformList";
import { LivePreview } from "@/components/create/LivePreview";
import { QrResultCard } from "@/components/create/QrResultCard";
import { normalizePhone, normalizeUsername } from "@/lib/format";
import type { SocialKey } from "@/lib/social";
import { isSupabaseConfigured, PROFILE_PHOTOS_BUCKET, supabase } from "@/lib/supabase";
import type { NewProfile } from "@/types/profile";

type Status = "idle" | "saving" | "success";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [socials, setSocials] = useState<Partial<Record<SocialKey, string>>>({});

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  const normalizedUsername = normalizeUsername(username);

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

  async function handleGenerate() {
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Add your name before generating your ONEID.");
      return;
    }
    if (!normalizedUsername) {
      setErrorMessage("Choose a username before generating your ONEID.");
      return;
    }
    if (!isSupabaseConfigured) {
      setErrorMessage(
        "Supabase isn't configured yet — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      return;
    }

    setStatus("saving");

    let photoUrl: string | null = null;
    if (photoFile) {
      const extension = photoFile.name.includes(".")
        ? photoFile.name.split(".").pop()
        : photoFile.type.split("/")[1] || "jpg";
      const path = `${normalizedUsername}-${Date.now()}.${extension}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(PROFILE_PHOTOS_BUCKET)
        .upload(path, photoFile, {
          contentType: photoFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Photo upload failed:", uploadError);
        setErrorMessage(`Couldn't upload your photo: ${uploadError.message}`);
        setStatus("idle");
        return;
      }

      const { data: publicData } = supabase.storage
        .from(PROFILE_PHOTOS_BUCKET)
        .getPublicUrl(uploadData.path);
      photoUrl = publicData.publicUrl;
    }

    const filledSocials = Object.fromEntries(
      Object.entries(socials).filter(([, v]) => (v ?? "").trim().length > 0)
    );

    const payload: NewProfile = {
      username: normalizedUsername,
      name: name.trim(),
      bio: bio.trim() || null,
      photo: photoUrl,
      mobile: mobile.trim() ? normalizePhone(mobile) : null,
      whatsapp: whatsapp.trim() ? normalizePhone(whatsapp) : null,
      socials: filledSocials,
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(payload);

    if (insertError) {
      console.error("Profile save failed:", insertError);
      if (insertError.code === "23505") {
        setErrorMessage(
          `"${normalizedUsername}" is already taken — try a different username.`
        );
      } else {
        setErrorMessage(`Couldn't save your ONEID: ${insertError.message}`);
      }
      setStatus("idle");
      return;
    }

    setPublicUrl(`${window.location.origin}/p/${normalizedUsername}`);
    setStatus("success");
  }

  if (status === "success" && publicUrl) {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-center px-6 py-20 sm:px-8">
        <QrResultCard
          name={name.trim()}
          username={normalizedUsername}
          publicUrl={publicUrl}
          onBackToEditing={() => setStatus("idle")}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-8">
      <header className="mb-10 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ONEID
        </Link>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
        <div className="space-y-10">
          <section>
            <p className="mb-4 text-sm text-accent">01 — Your profile</p>
            <div className="space-y-5 rounded-card border border-line bg-surface p-6">
              <PhotoPicker
                previewUrl={photoPreviewUrl}
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
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
                />
              </Field>
              <Field label="Username">
                <div className="flex items-center rounded-xl border border-line bg-card px-4 py-3 focus-within:border-accent">
                  <span className="text-sm text-muted">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johnxyz"
                    className="w-full bg-transparent pl-1 text-sm placeholder:text-muted focus:outline-none"
                  />
                </div>
                {username.trim() && (
                  <p className="mt-1.5 text-xs text-muted">
                    Your link: oneid.app/p/{normalizedUsername || "…"}
                  </p>
                )}
              </Field>
              <Field label="Bio">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Developer • Creator"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
                />
              </Field>
            </div>
          </section>

          <section>
            <p className="mb-4 text-sm text-accent">02 — Contact</p>
            <div className="space-y-3">
              <ExpandableContactField
                icon={Phone}
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
            <p className="mb-4 text-sm text-accent">03 — Add a profile</p>
            <SocialPlatformList
              values={socials}
              onChange={handleSocialChange}
              onRemove={handleSocialRemove}
            />
          </section>

          <section>
            <p className="mb-4 text-sm text-accent">04 — Your ONEID</p>
            {errorMessage && (
              <p className="mb-4 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={status === "saving"}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "saving" && <Loader2 size={16} className="animate-spin" />}
              {status === "saving" ? "Saving..." : "Generate my ONEID →"}
            </button>
          </section>
        </div>

        <div className="lg:sticky lg:top-10">
          <LivePreview
            name={name}
            username={username}
            bio={bio}
            photoPreviewUrl={photoPreviewUrl}
            mobile={mobile}
            whatsapp={whatsapp}
            socials={socials}
          />
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}
