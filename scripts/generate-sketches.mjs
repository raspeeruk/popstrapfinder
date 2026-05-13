#!/usr/bin/env node
/**
 * Generate technical-drawing-style sketches of each PopStrap concept.
 *
 * These are NOT product photos. They're patent-drawing / watch-magazine
 * schematic style: black ink line art on cream paper, pop-art halftone
 * shading, small dimension callouts, single colorway accent.
 *
 * This sidesteps the photoreal mockup problem entirely — sketches read
 * as "design in development" so we don't have to nail product fidelity.
 *
 * Usage:
 *   node scripts/generate-sketches.mjs            # all 8 colorways
 *   node scripts/generate-sketches.mjs huit-blanc # one slug
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_OUT_DIR = path.join(ROOT, "public", "images", "sketches");
const COLORWAY_DIR = path.join(ROOT, "public", "images", "colorways");

const MODEL = "nano-banana-pro-preview";

const FORM_DETAILS = {
  // 'rubber' — The Pop. Single moulded FKM, watch presses into a recess, crown
  // protrudes through a hole. Geometry of the crown hole depends on the case
  // configuration: Lépine has crown at 12 (hole at top of recess); Savonnette
  // has crown at 3 (hole on the side of the recess).
  rubber: [
    "Show 'The Pop' form factor — the easiest-to-manufacture option:",
    "A SINGLE-PIECE moulded FKM rubber wrist strap, one continuous moulded part.",
    "In the centre of the strap is an octagonal RECESS — a precisely sized cutout that hugs the perimeter of the Royal Pop case head when the watch is pressed in.",
    "A small SLOT or HOLE is moulded at the EDGE of the recess so the watch's crown can protrude through it — this is the key mechanical detail and it must be clearly visible in the drawing.",
    "Crown hole position depends on the watch case configuration (see below — this matters).",
    "The watch is held in place by pressure-fit against the rubber + the crown locking into the slot.",
    "Render in a hero 3/4 view showing the watch pressed into the recess, the crown protruding through its slot, and the strap extending out either side as the wrist strap.",
    "Optional small inset/callout: a separate view of just the recess with the crown hole, to make the mechanism obvious.",
    "DO NOT show a separate metal adapter or 22mm lugs — there are none. The rubber strap IS the adapter.",
  ].join(" "),

  // 'adapter' — sold alone. Customer brings their own strap.
  adapter: [
    "Show 'The Adapter' form factor — a STANDALONE accessory sold by itself:",
    "A thin Bioceramic-coated steel ring (or frame) that snap-fits around the octagonal perimeter of the Royal Pop case head.",
    "The adapter provides TWO standard 22mm spring-bar lugs, positioned perpendicular to the crown axis so the strap doesn't interfere with the crown.",
    "  - For Lépine (crown at 12): lugs sit at 3 and 9.",
    "  - For Savonnette (crown at 3): lugs sit at 12 and 6.",
    "No strap is included — the customer attaches whatever 22mm strap they want.",
    "Render the adapter shown CLAMPED onto the case head with the spring-bar lugs visible, plus a small callout like 'WORKS WITH ANY 22MM STRAP' or icons of different strap materials (leather, NATO, mesh, rubber) lined up below as 'BYO STRAP'.",
    "Do NOT show a strap attached — the product IS the adapter, sold alone.",
  ].join(" "),

  // 'adapter_nato' — same adapter, bundled with NATO.
  adapter_nato: [
    "Show 'The Adapter + NATO' form factor — a BUNDLE:",
    "The same thin Bioceramic-coated steel adapter ring described in 'The Adapter', clamped around the case head with two 22mm spring-bar lugs.",
    "Bundled with a single-piece NATO-style fabric strap in a colorway-complementary color.",
    "The NATO strap threads through both spring-bar lugs and passes UNDER the watch case in one continuous piece — this is the canonical NATO 'pass-through' construction.",
    "Render to clearly show: (a) the adapter clamped onto the case, (b) the NATO strap threaded through the lugs and visible passing under the case, (c) the pin buckle at one end of the NATO.",
    "Small callout indicating this is the adapter + a complimentary NATO bundled together.",
  ].join(" "),
};

// Tonal/monochromatic palettes — each colorway's strap stays in the same
// color family as the case. Configuration determines crown position (Lépine = 12,
// Savonnette = 3 — for Savonnette rubber moulds, the crown slot is on the side).
const STRAP_DESIGNS = {
  // ─── Lépine watches (crown at 12) — 6 colorways ──────────────────────
  "huit-blanc": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Domino",
    accentHex: "#FF1744",
    palette: "Royal Pop case is white Bioceramic with rainbow hour-marker dashes on a white tapisserie dial. The moulded FKM rubber strap is BRILLIANT WHITE — same color family as the case — with thin rainbow-thread piping running along both long edges (a row of red/orange/yellow/green/blue/purple stripes, each in a tiny channel) that echoes the dial's rainbow markers. Brushed stainless-steel buckle. Tonal white keepers. Monochrome-plus-rainbow-accent.",
  },
  "otto-rosso": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Confetto",
    accentHex: "#FF1744",
    palette: "Royal Pop case is light-pink Bioceramic with poppy-red bezel accents and a bright red dial. The moulded FKM rubber strap is the SAME BLUSH PINK as the case — tonal, family-matched — with thin poppy-red piping along both long edges. Rose-gold pin buckle. Tonal pink keeper loops. Monochromatic pink with red accent.",
  },
  "blaue-acht": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Lumebomb",
    accentHex: "#3DAEFF",
    palette: "Royal Pop case is lime-green Bioceramic with a light-blue lume-heavy dial. The moulded FKM rubber strap is the SAME LIME GREEN as the case (tonal) — with subtle glow-pigment specks and a thin sky-blue piping along both edges that picks up the dial blue. Brushed steel buckle. Tonal lime keepers.",
  },
  "orenji-hachi": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Pit Pass",
    accentHex: "#FF6D00",
    palette: "Royal Pop case is midnight-navy Bioceramic with a bright orange dial. The moulded FKM rubber strap is the SAME MIDNIGHT NAVY as the case (tonal) — with safety-orange piping along both edges echoing the dial. Matte-black PVD pin buckle. Tonal navy keepers. Racing-spec quadrillage texture.",
  },
  "lan-ba": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Frost",
    accentHex: "#1565C0",
    palette: "Royal Pop case is light-blue Bioceramic with a mid-blue tapisserie dial. The moulded FKM rubber strap is the SAME LIGHT BLUE as the case (tonal) — frosted micro-texture surface, slightly deeper mid-blue piping along both edges that picks up the dial. Brushed steel buckle. Tonal light-blue keepers.",
  },
  "green-eight": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Olive Run",
    accentHex: "#2D5016",
    palette: "Royal Pop case is lime-green Bioceramic with an olive 'Royal Oak' tapisserie dial. The moulded FKM rubber strap is the SAME LIME GREEN as the case — tonal, family-matched — with darker olive piping along both edges echoing the dial. Brushed steel buckle. Tonal green keepers. Monochrome green.",
  },

  // ─── Savonnette watches (crown at 3) — separate mold with side crown slot ─
  "ocho-negro": {
    formFactor: "rubber",
    configuration: "Savonnette",
    crownPosition: "3 o'clock (right side of case)",
    strapName: "The Tuxedo",
    accentHex: "#FAFAFA",
    palette: "Royal Pop case is white Bioceramic with a stark BLACK dial and small-seconds at 6. The moulded FKM rubber strap is GLOSSY BLACK — pulling the dial color onto the strap — with thin white piping along both edges that echoes the white case. Polished stainless-steel pin buckle. The crown protrusion slot is on the SIDE of the recess (right) for the 3 o'clock crown.",
  },
  "otg-roz": {
    formFactor: "rubber",
    configuration: "Savonnette",
    crownPosition: "3 o'clock (right side of case)",
    strapName: "The Memphis",
    accentHex: "#FFC700",
    palette: "Royal Pop case is pink-and-turquoise Memphis-style Bioceramic with yellow/pink/turquoise dial details. The moulded FKM rubber strap is a MULTI-TONE composition: pink primary body with yellow + turquoise piping along the edges and tonal Memphis-style dot or wedge inlays. All three case colors appear on the strap — pink, yellow, turquoise. The crown slot is on the SIDE of the recess (right) for the 3 o'clock Savonnette crown.",
  },

  // ─── Alternates for green-eight only — same case, different form factor ──
  // sourceColorway tells the script which dial close-up to use.
  "green-eight-adapter": {
    sourceColorway: "green-eight",
    formFactor: "adapter",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Adapter — Green Eight",
    accentHex: "#2D5016",
    palette: "Royal Pop case is lime-green Bioceramic with an olive tapisserie dial. The product is JUST a thin Bioceramic-coated steel adapter ring in matching lime green that snap-fits the octagonal case head and provides two standard 22mm spring-bar lugs at 3 and 9 o'clock (perpendicular to the 12-o'clock crown). Sold alone — no strap included. The drawing shows the adapter clamped to the case with the lugs visible and a small lineup of strap-material icons (NATO, leather, mesh, rubber) labeled 'BYO STRAP — ANY 22MM'.",
  },
  "green-eight-nato": {
    sourceColorway: "green-eight",
    formFactor: "adapter_nato",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Olive Bundle",
    accentHex: "#2D5016",
    palette: "Royal Pop case is lime-green Bioceramic. The bundle includes a lime-green Bioceramic-coated steel adapter ring with 22mm lugs at 3 and 9, plus a single-piece olive-green twill NATO strap (tonal — same family as the case) threading through the lugs and passing under the case. Brushed-steel buckle. Tonal monochrome green.",
  },
};

function buildPrompt(slug) {
  const d = STRAP_DESIGNS[slug];
  const formText = FORM_DETAILS[d.formFactor];
  return [
    `Editorial pop-art schematic illustration — the aesthetic of a Hodinkee feature spread crossed with a 1960s Swatch ad and a Roy Lichtenstein print. NOT a generic technical drawing, NOT military / patent / army styling.`,
    ``,
    `══════════════════════════════════════════════════════════════════`,
    `WATCH CASE GEOMETRY — READ THIS CAREFULLY, GET IT RIGHT.`,
    `══════════════════════════════════════════════════════════════════`,
    `The Audemars Piguet × Swatch Royal Pop is a POCKET WATCH, not a wristwatch.`,
    `Its case head is a self-contained octagonal "puck" or "biscuit" — and this is the entire reason our product exists (we make the adapter/strap that lets you wear it on the wrist, since the watch has no native attachment).`,
    ``,
    `The case head, drawn front-on, looks like this:`,
    `- An OCTAGON shape (8 sides of equal length, Royal Oak style).`,
    `- 8 HEXAGONAL hex-head screws — one at each of the 8 octagon vertices/corners. The screws are HEXAGONS (six-sided shapes with visible flat sides), NOT round dots, NOT plus-sign cross-heads.`,
    `- A circular dial inside the bezel, with the watch hands and hour markers (rainbow dashes for Huit Blanc).`,
    `- A small "AP × swatch" wordmark on the dial. Below it, the text "Royal Pop".`,
    ``,
    `THE CASE HAS NO LUGS. DO NOT DRAW LUGS.`,
    `- Specifically: NO square or rounded extensions sticking out of the case for attaching a strap.`,
    `- NO horns, NO ears, NO bars, NO spring-bar holes — none of those wristwatch features.`,
    `- The OUTER PERIMETER of the case from front view is just the bare octagonal shape with smooth flat sides between the screws. Period.`,
    `- The bottom edge of the case is identical to the top edge — both are flat octagon edges, NOT lug extensions.`,
    ``,
    `THE ONLY CASE PROTRUSIONS, EVER, ARE:`,
    `1. The CROWN — a small nub sticking out one side of the case. For Lépine watches the crown is at the 12 o'clock edge (top). For Savonnette the crown is at the 3 o'clock edge (right side).`,
    `2. For pocket-watch wear (irrelevant for our strap products): a small ring/bow at the top of the case where a neck lanyard threads through. You can omit this entirely — we don't need it.`,
    ``,
    `If you find yourself drawing a "lug" or any rectangular extension protruding from the bottom of the case to attach a strap, STOP. The Royal Pop has none. The strap or adapter in our designs wraps around or grips the bare octagonal case — that is exactly the design problem we are solving.`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `══════════════════════════════════════════════════════════════════`,
    `DIAL TEXT / LOGOS — READ THIS, GET IT RIGHT.`,
    `══════════════════════════════════════════════════════════════════`,
    `The dial bears TWO pieces of printed text, both of which must be rendered legibly and correctly:`,
    ``,
    `1. THE PARTNERSHIP MARK in the upper-center of the dial — exactly three components arranged left-to-right or stacked:`,
    `   • "AP" rendered as the stacked Audemars Piguet monogram (a small bold sans-serif "AP" — the A nested inside or above the P). Always uppercase, always two letters only.`,
    `   • An "×" (multiplication / cross symbol) between the two brand marks.`,
    `   • "swatch" rendered as the lowercase Swatch wordmark — small, lowercase, sans-serif, never capitalized. Six letters: s-w-a-t-c-h.`,
    `   • The full mark reads: "AP × swatch". Color matches the dial accent (e.g. pink for Huit Blanc, white for Ocho Negro, etc — see the attached dial reference for the exact color).`,
    ``,
    `2. THE PRODUCT NAME below the centre, in the SAME accent color as the partnership mark: the text "Royal Pop" — two words, capital R, capital P, the rest lowercase. Light script or sans-serif.`,
    ``,
    `LOGO ACCURACY IS CRITICAL:`,
    `- Do NOT misspell "swatch" (must be lowercase, six letters).`,
    `- Do NOT replace "AP" with "AB", "AR", "Audemars", or any other text.`,
    `- Do NOT replace the "×" with a "+" or "•" or "&" or omit it.`,
    `- Do NOT replace "Royal Pop" with "Royal Oak", "Pop Royal", or any other variation.`,
    `- If you cannot render a piece of text legibly at the rendered size, OMIT it rather than guess — a clean unmarked dial is better than a misspelled logo.`,
    `- Refer to the dial close-up reference image attached to this prompt for the exact layout and proportions of these elements.`,
    `══════════════════════════════════════════════════════════════════`,
    ``,
    `TYPOGRAPHY (critical — this is the brand voice):`,
    `- Strap name title at top-left: rendered in a HEAVY, CHUNKY, CONDENSED display sans-serif (like Bowlby One SC, Druk, or Knockout) — high x-height, very bold, almost stencil-like weight. Caps only.`,
    `- Callout labels: in a clean MONOSPACE typeface (JetBrains Mono / IBM Plex Mono style), small, uppercase, tracked-out, hand-drawn arrows pointing to the parts.`,
    `- DO NOT use thin technical-pen lettering, hand-cursive, or military stencil — use BOLD chunky display type for the title.`,
    ``,
    `COLOR + INK:`,
    `- Cream / paper background (#F4F2EE) with subtle paper grain texture.`,
    `- Bold black ink line art (no thin technical hatching). Confident strokes.`,
    `- Pop-art halftone dot shading on all surfaces — visible dot grid, not subtle.`,
    `- ONE accent color used sparingly: ${d.accentHex}. Apply only to: dial markers, contrast piping, a tiny burst/badge, the strap-name underline. Never as a flat fill.`,
    `- Optional: a thick black border or frame around the composition (popbox style — 3px-equivalent black border, offset slight) to anchor the drawing as a designed object.`,
    ``,
    `COMPOSITION (square 1024×1024):`,
    `- ${d.strapName.toUpperCase()} title set as a tight typographic lockup at top-left, oversized and confident.`,
    `- Subject (watch + strap) centered on the page with white space around it.`,
    `- 3-5 callouts only — don't crowd. Each on its own line with a hand-drawn arrow.`,
    `- A small starburst / sunburst badge somewhere with text like "COMING SOON" or "CONCEPT" or the form-factor name — keep it pop-art, not corporate.`,
    ``,
    `SUBJECT — "${d.strapName}":`,
    `${formText}`,
    ``,
    `CRITICAL CASE DETAIL: this Royal Pop is a ${d.configuration} configuration. The crown is at ${d.crownPosition}. The crown MUST be drawn protruding from the watch case at that exact position. For the rubber form factor, the crown-protrusion slot in the rubber must be cut at the matching position (top for Lépine, side for Savonnette).`,
    ``,
    `Element description (render as ink + halftone + single accent, NOT as a photo): ${d.palette}.`,
    ``,
    `The reference image attached is the Royal Pop dial close-up — use it to understand the dial's hour markers and central logos. Render those dial elements in line art with halftone, not as a photo.`,
    ``,
    `EXCLUDE: photo-realism, people, wrists, technical-pen thin sans labels, military/patent aesthetic, watermarks, extraneous body copy paragraphs, dimensions in mm/inches.`,
  ].join("\n");
}

async function loadDotenv() {
  if (process.env.GEMINI_API_KEY) return;
  const envPath = path.resolve(ROOT, "..", "rogerson", ".env");
  try {
    const txt = await fs.readFile(envPath, "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^GEMINI_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) {
        process.env.GEMINI_API_KEY = m[1].replace(/^["']|["']$/g, "");
        break;
      }
    }
  } catch {
    /* noop */
  }
}

async function runOne(slug, variant, outDir = DEFAULT_OUT_DIR) {
  const d = STRAP_DESIGNS[slug];
  const dialSlug = d?.sourceColorway || slug;
  const dialPath = path.join(COLORWAY_DIR, `${dialSlug}.jpg`);
  const dialBuf = await fs.readFile(dialPath);

  const variantHint = variant
    ? `\n\nVARIATION HINT (for diversity across attempts — interpret loosely): ${variant}`
    : "";

  const parts = [
    { text: buildPrompt(slug) + variantHint },
    { inline_data: { mime_type: "image/jpeg", data: dialBuf.toString("base64") } },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(
    process.env.GEMINI_API_KEY
  )}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini ${res.status}: ${text.slice(0, 500)}`);
  }
  const json = await res.json();
  const respParts = json?.candidates?.[0]?.content?.parts;
  const imagePart = respParts?.find((p) => p?.inlineData?.data || p?.inline_data?.data);
  const b64 = imagePart?.inlineData?.data ?? imagePart?.inline_data?.data;
  if (!b64) {
    const reason = (respParts || []).map((p) => p?.text).filter(Boolean).join(" | ");
    throw new Error(`No image in response. Text: ${reason || "(none)"}`);
  }

  await fs.mkdir(outDir, { recursive: true });
  const suffix = variant ? `-${variant.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 24)}` : "";
  const outPath = path.join(outDir, `${slug}${suffix}.png`);
  await fs.writeFile(outPath, Buffer.from(b64, "base64"));
  return outPath;
}

async function main() {
  await loadDotenv();
  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY.");
    process.exit(1);
  }

  const ALL = Object.keys(STRAP_DESIGNS);
  // Default rollout: just the 8 primary colorway sketches (exclude alternates).
  const PRIMARY = ALL.filter((s) => !STRAP_DESIGNS[s].sourceColorway);

  const args = process.argv.slice(2);
  const variantsArg = args.find((a) => a.startsWith("--variants="));
  const variantCount = variantsArg ? parseInt(variantsArg.split("=")[1], 10) || 1 : 1;
  const styleArg = args.find((a) => a.startsWith("--style="));
  const styleLock = styleArg ? styleArg.split("=")[1] : null; // e.g. "v2"
  const outArg = args.find((a) => a.startsWith("--out="));
  const outDir = outArg
    ? path.join(ROOT, "public", "images", "sketches", outArg.split("=")[1])
    : DEFAULT_OUT_DIR;
  const filter = args.find((a) => !a.startsWith("--"));
  const targets = filter ? ALL.filter((s) => s === filter) : PRIMARY;
  if (filter && targets.length === 0) {
    console.error(`Unknown slug: ${filter}. Available: ${ALL.join(", ")}`);
    process.exit(1);
  }

  const VARIANT_HINTS = {
    v1: "exploded assembly view with parts slightly separated",
    v2: "side profile view with the strap looping naturally and the watch nested in place, hero product-shot composition",
    v3: "isometric three-quarter view, hero composition",
    v4: "deconstructed flat-lay layout, almost like an instruction-card",
    v5: "top-down catalogue layout, watch front-on with the strap fanned out below",
  };
  const VHINT_KEYS = Object.keys(VARIANT_HINTS);

  console.log(
    `Sketching ${targets.length} concept(s)${styleLock ? ` locked to style ${styleLock}` : ` × ${variantCount} variant(s)`} via ${MODEL}…`
  );
  for (const slug of targets) {
    const d = STRAP_DESIGNS[slug];
    if (styleLock) {
      // Single render, locked to the requested style hint (e.g. v2)
      const hint = VARIANT_HINTS[styleLock] || null;
      process.stdout.write(
        `  ${slug.padEnd(22)} [${d.formFactor.padEnd(12)}] ${d.strapName.padEnd(22)} `
      );
      try {
        const outPath = await runOne(slug, hint ? `${styleLock}-${hint}` : null, outDir);
        console.log(`✓ ${path.relative(ROOT, outPath)}`);
      } catch (err) {
        console.log(`✗ ${err.message}`);
      }
    } else {
      for (let v = 1; v <= variantCount; v++) {
        const key = VHINT_KEYS[(v - 1) % VHINT_KEYS.length];
        const hint = variantCount > 1 ? VARIANT_HINTS[key] : null;
        const suffix = variantCount > 1 ? ` ${key}` : "";
        process.stdout.write(
          `  ${slug.padEnd(22)} [${d.formFactor.padEnd(12)}] ${d.strapName.padEnd(22)}${suffix.padEnd(4)} `
        );
        try {
          const outPath = await runOne(slug, hint ? `${key}-${hint}` : null, outDir);
          console.log(`✓ ${path.relative(ROOT, outPath)}`);
        } catch (err) {
          console.log(`✗ ${err.message}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
