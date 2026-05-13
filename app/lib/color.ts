export function isLightHex(hex: string): boolean {
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6;
}

export function readableTextOn(hex: string): "text-ink" | "text-paper" {
  return isLightHex(hex) ? "text-ink" : "text-paper";
}

export function readableBgOnAccent(hex: string): "bg-ink text-paper" | "bg-paper text-ink" {
  return isLightHex(hex) ? "bg-ink text-paper" : "bg-paper text-ink";
}
