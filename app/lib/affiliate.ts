const TAGS = {
  amazon: process.env.NEXT_PUBLIC_AMAZON_TAG || "popstrapfinder-20",
  aliexpress: process.env.NEXT_PUBLIC_ALIEXPRESS_TAG || "",
  ebay: process.env.NEXT_PUBLIC_EBAY_CAMPID || "",
};

export type AffiliatePartner = "amazon" | "aliexpress" | "ebay" | "etsy" | "other";

export function buildAffiliateUrl(url: string, partner: AffiliatePartner): string {
  try {
    const u = new URL(url);
    switch (partner) {
      case "amazon":
        if (TAGS.amazon) u.searchParams.set("tag", TAGS.amazon);
        return u.toString();
      case "aliexpress":
        if (TAGS.aliexpress) u.searchParams.set("aff_trace_key", TAGS.aliexpress);
        return u.toString();
      case "ebay":
        if (TAGS.ebay) {
          u.searchParams.set("mkrid", "711-53200-19255-0");
          u.searchParams.set("campid", TAGS.ebay);
          u.searchParams.set("toolid", "10001");
        }
        return u.toString();
      default:
        return url;
    }
  } catch {
    return url;
  }
}

export function partnerLabel(partner: AffiliatePartner): string {
  switch (partner) {
    case "amazon":
      return "Amazon";
    case "aliexpress":
      return "AliExpress";
    case "ebay":
      return "eBay";
    case "etsy":
      return "Etsy";
    default:
      return "Buy now";
  }
}
