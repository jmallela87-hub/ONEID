"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB

interface PhotoPickerProps {
  previewUrl: string | null;
  onSelect: (file: File, previewUrl: string) => void;
  onError: (message: string) => void;
}

export function PhotoPicker({ previewUrl, onSelect, onError }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // User cancelled the picker — files is empty, nothing to do.
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError("Please choose an image file (JPG, PNG, WEBP).");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      onError("That image is too large — please choose one under 8MB.");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    onSelect(file, objectUrl);
    // Allow re-selecting the same file later (e.g. after removing it).
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label={previewUrl ? "Change profile photo" : "Add profile photo"}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Profile preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-muted">
            <Camera size={22} strokeWidth={1.5} />
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-bg/60 text-xs font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
          {previewUrl ? "Change" : "Add"}
        </span>
      </button>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          {previewUrl ? "Change photo" : "Add photo"}
        </button>
        <p className="mt-1 text-xs text-muted">JPG, PNG or WEBP, up to 8MB.</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
