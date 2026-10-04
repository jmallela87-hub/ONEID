"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { SOCIAL_PLATFORMS, type SocialKey } from "@/lib/social";

interface SocialPlatformListProps {
  values: Partial<Record<SocialKey, string>>;
  onChange: (key: SocialKey, value: string) => void;
  onRemove: (key: SocialKey) => void;
}

const FEATURED: SocialKey[] = ["instagram", "youtube", "facebook", "x", "linkedin", "tiktok"];

export function SocialPlatformList({ values, onChange, onRemove }: SocialPlatformListProps) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const q = query.trim().toLowerCase();
  const selected = SOCIAL_PLATFORMS.filter((p) => p.key in values);
  const available = SOCIAL_PLATFORMS.filter((p) => !(p.key in values));
  const visible = q
    ? available.filter((p) => p.label.toLowerCase().includes(q) || p.key.includes(q))
    : showAll
      ? available
      : FEATURED.map((k) => available.find((p) => p.key === k)).filter((p) => p !== undefined);
  const hiddenCount = available.length - visible.length;

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <div className="space-y-2">
          {selected.map((platform) => {
            const Icon = platform.icon;
            return (
              <div key={platform.key} className="rounded-2xl border border-accent/40 bg-card px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Icon size={16} className="text-accent" />
                    {platform.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(platform.key)}
                    className="text-muted hover:text-ink"
                    aria-label={`Remove ${platform.label}`}
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  autoFocus
                  value={values[platform.key] ?? ""}
                  onChange={(e) => onChange(platform.key, e.target.value)}
                  placeholder={platform.placeholder}
                  className="mt-2 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2.5 rounded-xl border border-line bg-card px-4 py-3 focus-within:border-accent">
        <Search size={16} className="text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search social platforms..."
          className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {visible.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.key}
              type="button"
              onClick={() => {
                onChange(platform.key, "");
                setQuery("");
              }}
              className="flex items-center gap-1.5 rounded-pill border border-line px-3.5 py-2 text-xs text-ink/85 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon size={14} />
              {platform.label}
            </button>
          );
        })}
        {q && visible.length === 0 && <p className="text-xs text-muted">No matching platform.</p>}
      </div>

      {!q && (hiddenCount > 0 || showAll) && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="text-xs text-muted underline decoration-line underline-offset-4 hover:text-ink"
        >
          {showAll ? "Show fewer" : `More platforms (${hiddenCount})`}
        </button>
      )}
    </div>
  );
}
