"use client";

import { QRCodeSVG } from "qrcode.react";

/** Display-only QR for the card face. The real QR/download logic is untouched. */
export function CardQr({ value }: { value: string }) {
  return (
    <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-1.5">
      <div className="rounded-lg bg-white p-2 ring-1 ring-[color:var(--pc-suit)]">
        <QRCodeSVG value={value} size={84} level="M" marginSize={0} bgColor="#ffffff" fgColor="#111111" />
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-[0.35em] opacity-60">Scan</span>
    </div>
  );
}
