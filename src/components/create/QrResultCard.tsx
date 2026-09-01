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
    } catch {}
  }

  function handleDownload() {
    const qrCanvas = canvasWrapRef.current?.querySelector("canvas");
    if (!qrCanvas) return;

    const scale = 3;
    const cardWidth = 900;
    const cardHeight = 1200;

    const canvas = document.createElement("canvas");
    canvas.width = cardWidth * scale;
    canvas.height = cardHeight * scale;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(scale, scale);

    // Card background
    ctx.fillStyle = "#171717";
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Border
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, cardWidth - 40, cardHeight - 40);

    // ONEID
    ctx.textAlign = "left";
    ctx.fillStyle = "#F7F4EF";
    ctx.font = "700 48px Arial, sans-serif";
    ctx.fillText("ONEID", 70, 105);

    ctx.fillStyle = "#A6A6A6";
    ctx.font = "400 24px Arial, sans-serif";
    ctx.fillText("One identity. Anywhere.", 70, 145);

    // QR
    const qrSize = 560;
    const qrX = (cardWidth - qrSize) / 2;
    const qrY = 230;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(qrX - 28, qrY - 28, qrSize + 56, qrSize + 56);
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Name
    ctx.textAlign = "center";
    ctx.fillStyle = "#F7F4EF";
    ctx.font = "700 42px Arial, sans-serif";
    ctx.fillText(name.trim(), cardWidth / 2, 900);

    // Username
    ctx.fillStyle = "#C7C7C7";
    ctx.font = "400 28px Arial, sans-serif";
    ctx.fillText(`@${username}`, cardWidth / 2, 945);

    // Divider
    ctx.strokeStyle = "#3a3a3a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 1000);
    ctx.lineTo(cardWidth - 100, 1000);
    ctx.stroke();

    // Scan text
    ctx.fillStyle = "#A6A6A6";
    ctx.font = "400 24px Arial, sans-serif";
    ctx.fillText("Scan to view this ONEID", cardWidth / 2, 1055);

    // URL
    ctx.fillStyle = "#777777";
    ctx.font = "400 18px Arial, sans-serif";

    let displayUrl = publicUrl;
    const maxWidth = cardWidth - 140;

    while (ctx.measureText(displayUrl).width > maxWidth) {
      displayUrl = displayUrl.slice(0, -4) + "...";
    }

    ctx.fillText(displayUrl, cardWidth / 2, 1100);

    // Footer
    ctx.fillStyle = "#F7F4EF";
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText("ONEID", cardWidth / 2, 1150);

    const link = document.createElement("a");
    link.download = `oneid-${username}-card.png`;
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
