"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { ComponentType } from "react";

interface ExpandableContactFieldProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  addLabel: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function ExpandableContactField({
  icon: Icon,
  label,
  addLabel,
  placeholder,
  value,
  onChange,
}: ExpandableContactFieldProps) {
  const [expanded, setExpanded] = useState(false);
  const isFilled = value.trim().length > 0;

  if (!expanded && !isFilled) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex w-full items-center justify-between rounded-2xl border border-line bg-card px-4 py-3.5 text-left transition-colors hover:border-accent/60"
      >
        <span className="flex items-center gap-3">
          <Icon size={18} className="text-muted" />
          <span>
            <span className="block text-sm font-medium">{label}</span>
            <span className="block text-xs text-muted">{addLabel}</span>
          </span>
        </span>
        <Plus size={18} className="text-muted" />
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-card px-4 py-3.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3 text-sm font-medium">
          <Icon size={18} className="text-muted" />
          {label}
        </span>
        <button
          type="button"
          onClick={() => {
            onChange("");
            setExpanded(false);
          }}
          className="text-muted hover:text-ink"
          aria-label={`Remove ${label}`}
        >
          <X size={16} />
        </button>
      </div>
      <input
        type="tel"
        inputMode="tel"
        autoFocus={expanded && !isFilled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}
