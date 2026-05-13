export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

type GtagArgs =
  | ["event", string, Record<string, unknown>?]
  | ["config", string, Record<string, unknown>?]
  | ["js", Date];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

export function trackAffiliateClick(args: {
  destination: string;
  product: string;
  partner: string;
  page: string;
}) {
  trackEvent("affiliate_click", args);
}

export function trackFinderComplete(args: {
  colorway: string;
  material: string;
  occasion: string;
}) {
  trackEvent("finder_complete", args);
}
