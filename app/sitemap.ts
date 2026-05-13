import type { MetadataRoute } from "next";
import { colorways } from "./data/colorways";
import { strapCategories } from "./data/strap-categories";

export const dynamic = "force-static";

const BASE = "https://popstrapfinder.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/find",
    "/colors",
    "/straps",
    "/originals",
    "/specs",
    "/news",
    "/faq",
    "/about",
    "/contact",
    "/sitemap",
    "/affiliate-disclosure",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  const staticEntries = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority:
      p === ""
        ? 1.0
        : p === "/find" || p === "/colors" || p === "/straps" || p === "/originals"
          ? 0.9
          : 0.7,
  }));

  const colorwayEntries = colorways.map((c) => ({
    url: `${BASE}/colors/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  const categoryEntries = strapCategories.map((c) => ({
    url: `${BASE}/straps/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticEntries, ...colorwayEntries, ...categoryEntries];
}
