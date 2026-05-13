import type { Colorway } from "../lib/types";
import { colorways } from "./colorways";

export type FormFactor = "snap" | "clip" | "loop";

export type StrapOriginal = {
  colorwaySlug: Colorway["slug"];
  formFactor: FormFactor;
  strapName: string;
  material: string;
  pitch: string;
  strapHex: string;
  accentHex: string;
  estPriceUsd: number;
  hasMockup: boolean;
};

export const formFactorMeta: Record<
  FormFactor,
  {
    title: string;
    tagline: string;
    description: string;
    mechanic: string;
    priceUsd: number;
  }
> = {
  snap: {
    title: "The Snap",
    tagline: "Pops in. Lives on your wrist.",
    description:
      "One-piece moulded FKM rubber. The pocket-watch case head snaps into an octagonal cutout; the adapter and strap are one continuous piece. Lightest, most Pop-Swatch in spirit, most affordable.",
    mechanic: "Snap-fit octagonal cutout, one-piece moulded rubber.",
    priceUsd: 79,
  },
  clip: {
    title: "The Clip",
    tagline: "Universal lugs. Your strap or ours.",
    description:
      "A Bioceramic-coated steel frame clicks around the case head and gives you standard 22mm spring-bar lugs. Ships with one curated strap; you can swap in any 22mm strap you already own. The collector's option.",
    mechanic: "Snap-fit metal frame with 22mm spring-bar lugs.",
    priceUsd: 129,
  },
  loop: {
    title: "The Loop",
    tagline: "Pass-through NATO. Swap colors in ten seconds.",
    description:
      "An octagonal anodized frame snap-fits around the case head; a single-piece NATO strap passes through both ends of the frame. Pull the strap out the side and swap it for any 22mm NATO without disturbing the watch.",
    mechanic: "Octagonal frame with NATO pass-through.",
    priceUsd: 89,
  },
};

export const originals: StrapOriginal[] = [
  // ─── THE SNAP — active, loud, affordable ───────────────────────────────
  {
    colorwaySlug: "orenji-hachi",
    formFactor: "snap",
    strapName: "The Pit Pass",
    material: "Safety-orange FKM with matte-black hardware",
    pitch:
      "Race-flag orange with matte-black keepers. Quadrillage rubber, sweat-tested. The everyday workhorse for the navy-and-orange Orenji Hachi.",
    strapHex: "#FF6D00",
    accentHex: "#0F1B45",
    estPriceUsd: 79,
    hasMockup: false,
  },
  {
    colorwaySlug: "blaue-acht",
    formFactor: "snap",
    strapName: "The Lumebomb",
    material: "Lime FKM with glow-pigment specks",
    pitch:
      "Lime rubber that charges under any light and glows for hours. Built for the lume photographers. UV-tested 200 hours.",
    strapHex: "#B8E63A",
    accentHex: "#3DAEFF",
    estPriceUsd: 79,
    hasMockup: false,
  },
  {
    colorwaySlug: "lan-ba",
    formFactor: "snap",
    strapName: "The Frost",
    material: "White FKM with frosted micro-texture",
    pitch:
      "Brilliant white with a frosted-tip surface. Channels the Frosted-Gold Royal Oaks. Stark and clean.",
    strapHex: "#F7F9FB",
    accentHex: "#1565C0",
    estPriceUsd: 79,
    hasMockup: false,
  },

  // ─── THE CLIP — premium, swappable, collector ──────────────────────────
  {
    colorwaySlug: "huit-blanc",
    formFactor: "clip",
    strapName: "The Domino",
    material: "Bioceramic clip + matte-black FKM rubber, rainbow piping",
    pitch:
      "Bioceramic-coated steel adapter with brushed 22mm lugs. Ships with matte-black FKM rubber featuring rainbow contrast piping along both edges — pulled straight off the dial markers. Swap in any 22mm strap you own.",
    strapHex: "#0A0A0A",
    accentHex: "#FF1744",
    estPriceUsd: 129,
    hasMockup: false,
  },
  {
    colorwaySlug: "ocho-negro",
    formFactor: "clip",
    strapName: "The Tuxedo",
    material: "Bioceramic clip + black alligator-grain calfskin",
    pitch:
      "Glossy alligator-grain leather with polished steel hardware. Ships with a 22mm dress strap. Black-tie ready, swap to anything else daily.",
    strapHex: "#0A0A0A",
    accentHex: "#FAFAFA",
    estPriceUsd: 129,
    hasMockup: false,
  },
  {
    colorwaySlug: "otto-rosso",
    formFactor: "clip",
    strapName: "The Confetto",
    material: "Bioceramic clip + blush nappa leather, rose-gold hardware",
    pitch:
      "Soft Italian nappa in pale pink with poppy-red contrast stitching. Rose-gold pin buckle. Ships with a 22mm strap; collectors swap in their own.",
    strapHex: "#FFC0CB",
    accentHex: "#FF1744",
    estPriceUsd: 129,
    hasMockup: false,
  },

  // ─── THE LOOP — pass-through NATO, statement colorways ─────────────────
  {
    colorwaySlug: "green-eight",
    formFactor: "loop",
    strapName: "The Olive Run",
    material: "Olive single-piece NATO with cognac leather edge trim",
    pitch:
      "Olive twill NATO threaded through an octagonal anodized frame. Cognac leather edge trim. Yank it out, swap to any 22mm NATO in ten seconds.",
    strapHex: "#5C6B36",
    accentHex: "#9C5A2C",
    estPriceUsd: 89,
    hasMockup: false,
  },
  {
    colorwaySlug: "otg-roz",
    formFactor: "loop",
    strapName: "The Memphis",
    material: "Yellow NATO with turquoise trim, pink-anodized frame",
    pitch:
      "Yellow twill NATO threaded through a pink-anodized octagonal frame. Turquoise leather edge trim. Sottsass would have worn this.",
    strapHex: "#FFC700",
    accentHex: "#00BCD4",
    estPriceUsd: 89,
    hasMockup: false,
  },
];

export function colorwayFor(slug: Colorway["slug"]) {
  return colorways.find((c) => c.slug === slug);
}

export function originalsByFormFactor(): Record<FormFactor, StrapOriginal[]> {
  return originals.reduce(
    (acc, o) => {
      acc[o.formFactor].push(o);
      return acc;
    },
    { snap: [], clip: [], loop: [] } as Record<FormFactor, StrapOriginal[]>
  );
}
