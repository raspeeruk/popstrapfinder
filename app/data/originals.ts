import type { Colorway } from "../lib/types";
import { colorways } from "./colorways";

export type StrapOriginal = {
  colorwaySlug: Colorway["slug"];
  strapName: string;
  material: string;
  pitch: string;
  strapHex: string;
  accentHex: string;
  estPriceUsd: number;
  hasMockup: boolean;
};

export const originals: StrapOriginal[] = [
  {
    colorwaySlug: "huit-blanc",
    strapName: "The Domino",
    material: "Italian black leather",
    pitch:
      "Jet-black calfskin with rainbow keeper loops echoing the dial markers. Pure contrast against the white Bioceramic case.",
    strapHex: "#0A0A0A",
    accentHex: "#FF1744",
    estPriceUsd: 89,
    hasMockup: false,
  },
  {
    colorwaySlug: "otto-rosso",
    strapName: "The Confetto",
    material: "Blush nappa leather",
    pitch:
      "Soft Italian nappa in pale pink with poppy-red contrast stitching. The romance pick. Built for date-night photography.",
    strapHex: "#FFC0CB",
    accentHex: "#FF1744",
    estPriceUsd: 89,
    hasMockup: false,
  },
  {
    colorwaySlug: "green-eight",
    strapName: "The Olive Run",
    material: "Cognac saddle leather",
    pitch:
      "Vegetable-tanned cognac with olive edge paint. Earned-patina from day one. The closest a strap gets to a vintage Royal Oak.",
    strapHex: "#9C5A2C",
    accentHex: "#1C5E2B",
    estPriceUsd: 95,
    hasMockup: false,
  },
  {
    colorwaySlug: "blaue-acht",
    strapName: "The Lumebomb",
    material: "Glow-charge FKM rubber",
    pitch:
      "Lime-green FKM that charges under any light and glows for hours. Built for the lume photographers. UV-tested 200 hours.",
    strapHex: "#B8E63A",
    accentHex: "#3DAEFF",
    estPriceUsd: 79,
    hasMockup: false,
  },
  {
    colorwaySlug: "orenji-hachi",
    strapName: "The Pit Pass",
    material: "Orange FKM with black keepers",
    pitch:
      "Racing-spec FKM in safety orange with matte-black hardware. Built for desk-diving, gym, ocean. The everyday workhorse.",
    strapHex: "#FF6D00",
    accentHex: "#0F1B45",
    estPriceUsd: 79,
    hasMockup: false,
  },
  {
    colorwaySlug: "lan-ba",
    strapName: "The Frost",
    material: "White FKM",
    pitch:
      "Brilliant white FKM with a frosted-tip texture and brushed-steel buckle. Channels the Frosted-Gold Royal Oaks. Stark.",
    strapHex: "#F7F9FB",
    accentHex: "#1565C0",
    estPriceUsd: 79,
    hasMockup: false,
  },
  {
    colorwaySlug: "ocho-negro",
    strapName: "The Tuxedo",
    material: "Black alligator-grain leather",
    pitch:
      "Glossy black alligator-print calfskin with hand-painted edges. Black-tie-ready. The only Original built to disappear, not shout.",
    strapHex: "#0A0A0A",
    accentHex: "#FAFAFA",
    estPriceUsd: 109,
    hasMockup: false,
  },
  {
    colorwaySlug: "otg-roz",
    strapName: "The Memphis",
    material: "Yellow FKM with turquoise piping",
    pitch:
      "The loud one. Yellow FKM with turquoise piping and pink contrast keepers. Inspired by Ettore Sottsass and the 1980s Pop Swatch ad campaigns.",
    strapHex: "#FFC700",
    accentHex: "#00BCD4",
    estPriceUsd: 89,
    hasMockup: false,
  },
];

export function colorwayFor(slug: Colorway["slug"]) {
  return colorways.find((c) => c.slug === slug);
}
