"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, Download } from "lucide-react";

interface QrResultCardProps {
  name: string;
  username: string;
  publicUrl: string;
  onBackToEditing: () => void;
}

export function QrResultCard({
  name,
  username,
  publicUrl,
  onBackToEditing,
}: QrResultCardProps) {
  const [copied, setCopied] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (e.g. non-HTTPS LAN testing);
      // the URL is shown as plain text below so the user can select it.
    }
  }

  function handleDownload() {
    const canvas = canvasWrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `oneid-${username}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-card border border-line bg-card p-8 text-center">
      <p className="text-sm font-semibold tracking-tight">Your ONEID</p>
      <p className="text-xs text-muted">One scan.</p>

      <div
        ref={canvasWrapRef}
        className="mx-auto mt-6 w-fit rounded-2xl bg-ink p-4"
      >
        <QRCodeCanvas value={publicUrl} size={200} level="M" marginSize={0} />
      </div>

      <p className="mt-5 text-base font-medium">{name}</p>
      <p className="text-sm text-muted">@{username}</p>

      <p className="mt-4 truncate rounded-lg border border-line bg-surface px-3 py-2 text-xs text-muted">
        {publicUrl}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-pill border border-line px-4 py-2 text-xs font-medium hover:border-accent hover:text-accent"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-pill border border-line px-4 py-2 text-xs font-medium hover:border-accent hover:text-accent"
        >
          <Download size={14} />
          Download QR
        </button>
      </div>

      <button
        type="button"
        onClick={onBackToEditing}
        className="mt-6 text-xs text-muted underline decoration-line underline-offset-4 hover:text-ink"
      >
        Back to editing
      </button>
    </div>
  );
}
