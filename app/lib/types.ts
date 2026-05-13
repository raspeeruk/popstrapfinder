import type { AffiliatePartner } from "./affiliate";

export type ColorwaySlug =
  | "huit-blanc"
  | "otto-rosso"
  | "green-eight"
  | "blaue-acht"
  | "orenji-hachi"
  | "lan-ba"
  | "ocho-negro"
  | "otg-roz";

export type StrapCategorySlug =
  | "leather"
  | "rubber"
  | "metal"
  | "nato"
  | "chain"
  | "case"
  | "lanyard"
  | "bundle";

export interface Colorway {
  slug: ColorwaySlug;
  name: string;
  colorLabel: string;
  reference: string;
  configurations: ("Lépine" | "Savonnette")[];
  priceUsd: number;
  hex: string;
  accentHex: string;
  popClass: string;
  description: string;
  imageUrl: string;
  imageBackup?: string;
  swatchUrl: string;
  /** Sovrn affiliate redirect to the Swatch product page (preferred CTA). */
  swatchAffiliateUrl?: string;
  pairsWith: StrapCategorySlug[];
  recommendedMaterials: string[];
  keywordAliases: string[];
}

export interface StrapCategory {
  slug: StrapCategorySlug;
  title: string;
  blurb: string;
  longCopy: string;
  priceRange: string;
  bestFor: string[];
  considerations: string[];
}

export interface AffiliateProduct {
  id: string;
  title: string;
  category: StrapCategorySlug;
  colorways: ColorwaySlug[];
  material: string;
  partner: AffiliatePartner;
  url: string;
  priceUsd: number;
  image?: string;
  notes?: string;
  rating?: number;
  reviewCount?: number;
}

export interface NewsItem {
  url: string;
  title: string;
  source: string;
  type: "article" | "reddit" | "youtube" | "press" | "review";
  publishedISO?: string;
  summary?: string;
}

export interface FAQ {
  q: string;
  a: string;
}
