import QRCode from "qrcode";

export function slugify(name: string): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40) || "dish";
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

export function viewerUrl(slug: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://menuverse.app";
  return `${origin}/view/${slug}`;
}

export async function generateQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 720,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });
}

export function formatRupees(n: number | string | null | undefined): string {
  if (n == null || n === "") return "₹0";
  const num = typeof n === "string" ? Number(n) : n;
  if (Number.isNaN(num)) return "₹0";
  return `₹${num.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export const SPICE_LEVELS = [
  { value: "none", label: "None", emoji: "😐" },
  { value: "mild", label: "Mild", emoji: "🌶" },
  { value: "medium", label: "Medium", emoji: "🌶🌶" },
  { value: "hot", label: "Hot", emoji: "🌶🌶🌶" },
] as const;

export function spiceMeta(value: string) {
  return SPICE_LEVELS.find((s) => s.value === value) ?? SPICE_LEVELS[0];
}

export function whatsappHref(phone: string | null | undefined, message: string) {
  const digits = (phone ?? "").replace(/\D/g, "");
  if (!digits) return "#";
  const withCountry = digits.startsWith("91") ? digits : `91${digits}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}
