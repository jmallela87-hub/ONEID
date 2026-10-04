/**
 * Normalizes a username into a URL-safe slug.
 * "@John XYZ" -> "john-xyz"
 */
export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .replace(/^@+/, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Normalizes a phone number to digits-only, international format
 * (no leading +, no spaces/dashes). Assumes an Indian number when no
 * country code is present, since that's this product's primary market;
 * numbers that already include a country code are left as entered.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  // Already looks like it has a country code (11+ digits, e.g. 91XXXXXXXXXX)
  if (digits.length > 10) return digits;
  // Bare 10-digit local number: assume India (+91)
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function telHref(normalizedPhone: string): string {
  return `tel:+${normalizedPhone}`;
}

export function whatsappHref(normalizedPhone: string): string {
  return `https://wa.me/${normalizedPhone}`;
}

export function displayPhone(normalizedPhone: string): string {
  return `+${normalizedPhone}`;
}
