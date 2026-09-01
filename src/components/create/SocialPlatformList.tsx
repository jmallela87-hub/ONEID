"use client";

import { X } from "lucide-react";
import { SOCIAL_PLATFORMS, type SocialKey } from "@/lib/social";

interface SocialPlatformListProps {
  values: Partial<Record<SocialKey, string>>;
  onChange: (key: SocialKey, value: string) => void;
  onRemove: (key: SocialKey) => void;
}

export function SocialPlatformList({
  values,
  onChange,
  onRemove,
}: SocialPlatformListProps) {
  const selected = SOCIAL_PLATFORMS.filter((p) => p.key in values);
  const unselected = SOCIAL_PLATFORMS.filter((p) => !(p.key in values));

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <div className="space-y-2">
          {selected.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.key}
                className="rounded-2xl border border-line bg-card px-4 py-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Icon size={16} className="text-muted" />
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

      {unselected.length > 0 && (
        <div>
          <p className="mb-2 text-xs text-muted">Add a profile</p>
          <div className="flex flex-wrap gap-2">
            {unselected.map((platform) => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.key}
                  type="button"
                  onClick={() => onChange(platform.key, "")}
                  className="flex items-center gap-1.5 rounded-pill border border-line px-3.5 py-2 text-xs text-ink/85 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={14} />
                  {platform.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
