"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, Download } from "lucide-react";
import { PlayingCard } from "@/components/card/PlayingCard";
import type { CardDesign } from "@/lib/cardStyle";
import { resolveCard } from "@/lib/cardStyle";

interface QrResultCardProps {
  name: string;
  username: string;
  publicUrl: string;
  editCode: string;
  design?: CardDesign;
  onBackToEditing: () => void;
}

export function QrResultCard({
  name,
  username,
  publicUrl,
  editCode,
  design,
  onBackToEditing,
}: QrResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const resolved = resolveCard(username, design);

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

    const bg = resolved.colors.bg;
    const fg = resolved.colors.fg;
    const suit = resolved.colors.suit;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    ctx.strokeStyle = fg;
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, cardWidth - 36, cardHeight - 36);

    ctx.strokeStyle = suit;
    ctx.lineWidth = 5;
    ctx.strokeRect(42, 42, cardWidth - 84, cardHeight - 84);

    // Corner indices
    ctx.fillStyle = suit;
    ctx.textAlign = "left";
    ctx.font = "700 48px Georgia, serif";
    ctx.fillText(resolved.rank, 72, 112);
    ctx.font = "400 38px Georgia, serif";
    ctx.fillText(resolved.suit, 74, 150);

    ctx.save();
    ctx.translate(cardWidth - 72, cardHeight - 72);
    ctx.rotate(Math.PI);
    ctx.textAlign = "left";
    ctx.font = "700 48px Georgia, serif";
    ctx.fillText(resolved.rank, 0, 0);
    ctx.font = "400 38px Georgia, serif";
    ctx.fillText(resolved.suit, 2, 38);
    ctx.restore();

    // ONEID micro mark
    ctx.fillStyle = fg;
    ctx.textAlign = "center";
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText(`ONEID / ${resolved.suit}`, cardWidth / 2, 105);

    // Large ghost suit
    ctx.globalAlpha = 0.08;
    ctx.font = "400 430px Georgia, serif";
    ctx.fillText(resolved.suit, cardWidth / 2, 870);
    ctx.globalAlpha = 1;

    // QR frame
    const qrSize = 430;
    const qrX = (cardWidth - qrSize) / 2;
    const qrY = 300;
    const padding = 28;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      qrX - padding,
      qrY - padding,
      qrSize + padding * 2,
      qrSize + padding * 2
    );

    ctx.strokeStyle = suit;
    ctx.lineWidth = 3;
    ctx.strokeRect(
      qrX - padding,
      qrY - padding,
      qrSize + padding * 2,
      qrSize + padding * 2
    );

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Identity
    ctx.fillStyle = fg;
    ctx.font = "700 48px Georgia, serif";
    ctx.fillText(name.trim(), cardWidth / 2, 900);

    ctx.fillStyle = suit;
    ctx.font = "500 28px Arial, sans-serif";
    ctx.fillText(`@${username}`, cardWidth / 2, 942);

    ctx.fillStyle = fg;
    ctx.font = "500 20px Arial, sans-serif";
    ctx.fillText("SCAN TO OPEN ONEID", cardWidth / 2, 1035);

    ctx.fillStyle = suit;
    ctx.font = "700 18px Arial, sans-serif";
    ctx.fillText("ONEID", cardWidth / 2, 1100);

    const link = document.createElement("a");
    link.download = `oneid-${username}-card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="qr-result-wrap">
      <div className="qr-result-heading">
        <span>Your ONEID</span>
        <span>Card ready</span>
      </div>

      <PlayingCard
        seed={username}
        design={design}
        className="qr-result-card"
      >
        <div className="qr-result-layout">
          <div className="qr-result-brand">
            ONEID / {resolved.suit}
          </div>

          <div className="qr-result-kicker">
            SCAN TO OPEN
          </div>

          <div ref={canvasWrapRef} className="qr-result-qr">
            <QRCodeCanvas
              value={publicUrl}
              size={220}
              level="M"
              marginSize={2}
            />
          </div>

          <div className="qr-result-identity">
            <div className="qr-result-name">{name.trim()}</div>
            <div className="qr-result-username">@{username}</div>
          </div>

          <div className="qr-result-footer">
            ONE CARD / ONE IDENTITY
          </div>
        </div>
      </PlayingCard>

      <div className="qr-result-actions">
        <button type="button" onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy link"}
        </button>

        <button type="button" onClick={handleDownload}>
          <Download size={14} />
          Download card
        </button>
      </div>

      <div className="qr-result-edit">
        <div>
          <p>Private Edit Code</p>
          <strong>{editCode}</strong>
          <span>Keep this code private. You need it to edit your ONEID.</span>
        </div>

        <button type="button" onClick={handleCopyCode}>
          {codeCopied ? "Code copied" : "Copy code"}
        </button>
      </div>

      <button
        type="button"
        onClick={onBackToEditing}
        className="qr-result-back"
      >
        Back to editing
      </button>
    </div>
  );
}
