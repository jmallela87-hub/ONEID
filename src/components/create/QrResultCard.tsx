"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, Download } from "lucide-react";

interface QrResultCardProps {
  name: string;
  username: string;
  publicUrl: string;
  editCode: string;
  onBackToEditing: () => void;
}

export function QrResultCard({
  name,
  username,
  publicUrl,
  editCode,
  onBackToEditing,
}: QrResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(editCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 1800);
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

    const gold = "#C7A97A";
    const ivory = "#F7F4EF";
    const muted = "#A6A6A6";
    const dark = "#171717";

    // Background
    ctx.fillStyle = dark;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Outer subtle card
    ctx.strokeStyle = "#292929";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, cardWidth - 36, cardHeight - 36);

    // Premium gold border
    ctx.strokeStyle = gold;
    ctx.lineWidth = 5;
    ctx.strokeRect(42, 42, cardWidth - 84, cardHeight - 84);

    // Top ornament
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(315, 112);
    ctx.lineTo(455, 112);
    ctx.moveTo(445, 112);
    ctx.lineTo(585, 112);
    ctx.stroke();

    ctx.fillStyle = gold;
    ctx.font = "700 30px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦", cardWidth / 2, 123);

    // ONEID
    ctx.fillStyle = ivory;
    ctx.font = "700 68px Arial, sans-serif";
    ctx.fillText("ONEID", cardWidth / 2, 205);

    // Gold accent on D
    const oneidWidth = ctx.measureText("ONEID").width;
    ctx.fillStyle = gold;
    ctx.font = "700 68px Arial, sans-serif";
    ctx.fillText(
      "D",
      cardWidth / 2 + oneidWidth / 2 - 22,
      205
    );

    // Tagline
    ctx.fillStyle = muted;
    ctx.font = "400 28px Arial, sans-serif";
    ctx.fillText("One identity. Anywhere.", cardWidth / 2, 250);

    // QR frame
    const qrSize = 500;
    const qrX = (cardWidth - qrSize) / 2;
    const qrY = 315;
    const framePadding = 30;

    ctx.fillStyle = ivory;
    ctx.beginPath();
    ctx.roundRect(
      qrX - framePadding,
      qrY - framePadding,
      qrSize + framePadding * 2,
      qrSize + framePadding * 2,
      32
    );
    ctx.fill();

    ctx.strokeStyle = gold;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(
      qrX - framePadding,
      qrY - framePadding,
      qrSize + framePadding * 2,
      qrSize + framePadding * 2,
      32
    );
    ctx.stroke();

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Name
    ctx.fillStyle = ivory;
    ctx.font = "700 46px Arial, sans-serif";
    ctx.fillText(name.trim(), cardWidth / 2, 925);

    // Username
    ctx.fillStyle = gold;
    ctx.font = "500 30px Arial, sans-serif";
    ctx.fillText(`@${username}`, cardWidth / 2, 970);

    // Gold divider
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(190, 1025);
    ctx.lineTo(430, 1025);
    ctx.moveTo(470, 1025);
    ctx.lineTo(710, 1025);
    ctx.stroke();

    ctx.fillStyle = gold;
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText("✦", cardWidth / 2, 1032);

    // Scan text — NO URL
    ctx.fillStyle = ivory;
    ctx.font = "400 28px Arial, sans-serif";
    ctx.fillText("Scan to view this ONEID", cardWidth / 2, 1090);

    // Footer
    ctx.strokeStyle = gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(330, 1140);
    ctx.lineTo(425, 1140);
    ctx.moveTo(475, 1140);
    ctx.lineTo(570, 1140);
    ctx.stroke();

    ctx.fillStyle = gold;
    ctx.font = "600 25px Arial, sans-serif";
    ctx.fillText("O N E I D", cardWidth / 2, 1148);

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

      <div className="mt-5 rounded-2xl border border-accent/40 bg-surface p-4 text-left">
        <p className="text-xs font-medium text-muted">Private Edit Code</p>
        <p className="mt-2 break-all font-mono text-sm font-semibold tracking-wide text-accent">
          {editCode}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-muted">
          Keep this code private. You need it to edit your ONEID.
        </p>

        <button
          type="button"
          onClick={handleCopyCode}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-pill border border-line px-4 py-2 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
        >
          {codeCopied ? <Check size={14} /> : <Copy size={14} />}
          {codeCopied ? "Code copied" : "Copy edit code"}
        </button>
      </div>

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
