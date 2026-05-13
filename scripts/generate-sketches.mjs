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
const OUT_DIR = path.join(ROOT, "public", "images", "sketches");
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

// Each colorway's primary form factor + design. Configuration matters because
// it determines crown position (Lépine = 12 o'clock, Savonnette = 3 o'clock).
const STRAP_DESIGNS = {
  // Lépine (crown at 12) — all 6 are eligible for the rubber pop-through.
  "huit-blanc": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Domino",
    accentHex: "#FF1744",
    palette: "Royal Pop case is white Bioceramic with rainbow hour-marker dashes on a white tapisserie dial; the moulded rubber strap is matte black with a subtle quadrillage texture and red contrast piping along both edges.",
  },
  "otto-rosso": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Confetto",
    accentHex: "#FF1744",
    palette: "Royal Pop case is light-pink Bioceramic with poppy-red accents and a red dial; the moulded rubber strap is blush pink with poppy-red contrast piping along both edges and a rose-gold pin buckle.",
  },
  "blaue-acht": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Lumebomb",
    accentHex: "#3DAEFF",
    palette: "Royal Pop case is lime-green Bioceramic with a light-blue lume-heavy dial; the moulded rubber strap is lime green with subtle glow-pigment specks and royal-blue contrast piping along both edges.",
  },
  "orenji-hachi": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Pit Pass",
    accentHex: "#FF6D00",
    palette: "Royal Pop case is midnight-blue Bioceramic with a bright-orange dial; the moulded rubber strap is safety-orange with quadrillage texture and matte-black rubber keepers and buckle.",
  },
  "lan-ba": {
    formFactor: "rubber",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Frost",
    accentHex: "#1565C0",
    palette: "Royal Pop case is light-blue Bioceramic with a mid-blue tapisserie dial; the moulded rubber strap is brilliant white with a frosted micro-texture and light-blue contrast piping along both edges.",
  },
  "green-eight": {
    formFactor: "adapter_nato",
    configuration: "Lépine",
    crownPosition: "12 o'clock (top of case)",
    strapName: "The Olive Run",
    accentHex: "#5C6B36",
    palette: "Royal Pop case is lime-green Bioceramic with an olive tapisserie dial; the bundle includes the Bioceramic-coated steel adapter ring + a single-piece olive twill NATO with cognac leather edge trim and an aged-brass pin buckle.",
  },

  // Savonnette (crown at 3) — these CAN'T share the Lépine rubber mold; default
  // them to the Adapter products instead.
  "ocho-negro": {
    formFactor: "adapter",
    configuration: "Savonnette",
    crownPosition: "3 o'clock (right side of case)",
    strapName: "The Adapter — Black",
    accentHex: "#0A0A0A",
    palette: "Royal Pop case is white Bioceramic with a stark black dial and small-seconds at 6; the standalone adapter is a polished black Bioceramic-coated steel ring with 22mm spring-bar lugs at 12 and 6 (so the strap clears the 3-o'clock crown). Sold alone, no strap.",
  },
  "otg-roz": {
    formFactor: "adapter_nato",
    configuration: "Savonnette",
    crownPosition: "3 o'clock (right side of case)",
    strapName: "The Memphis",
    accentHex: "#FFC700",
    palette: "Royal Pop case is pink-and-turquoise Memphis-style Bioceramic; the bundle includes a pink-anodized steel adapter ring (lugs at 12 and 6 to clear the 3-o'clock crown) + a single-piece yellow NATO with turquoise leather edge trim and a matte yellow pin buckle.",
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

async function runOne(slug, variant) {
  const dialPath = path.join(COLORWAY_DIR, `${slug}.jpg`);
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

  await fs.mkdir(OUT_DIR, { recursive: true });
  const suffix = variant ? `-${variant.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 24)}` : "";
  const outPath = path.join(OUT_DIR, `${slug}${suffix}.png`);
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
  const args = process.argv.slice(2);
  const variantsArg = args.find((a) => a.startsWith("--variants="));
  const variantCount = variantsArg ? parseInt(variantsArg.split("=")[1], 10) || 1 : 1;
  const filter = args.find((a) => !a.startsWith("--"));
  const targets = filter ? ALL.filter((s) => s === filter) : ALL;
  if (filter && targets.length === 0) {
    console.error(`Unknown slug: ${filter}. Available: ${ALL.join(", ")}`);
    process.exit(1);
  }

  const VARIANT_HINTS = [
    "exploded assembly view with parts slightly separated",
    "side profile view with the strap looping and a small inset detail of the adapter",
    "top-down catalogue layout, watch front-on with the strap fanned out below",
    "isometric three-quarter view, hero composition",
    "deconstructed flat-lay layout, almost like an instruction-card",
  ];

  console.log(`Sketching ${targets.length} concept(s) × ${variantCount} variant(s) via ${MODEL}…`);
  for (const slug of targets) {
    const d = STRAP_DESIGNS[slug];
    for (let v = 1; v <= variantCount; v++) {
      const hint = variantCount > 1 ? VARIANT_HINTS[(v - 1) % VARIANT_HINTS.length] : null;
      const suffix = variantCount > 1 ? ` v${v}` : "";
      process.stdout.write(
        `  ${slug.padEnd(14)} [${d.formFactor.padEnd(4)}] ${d.strapName.padEnd(16)}${suffix.padEnd(4)} `
      );
      try {
        const outPath = await runOne(slug, hint ? `v${v}-${hint}` : null);
        console.log(`✓ ${path.relative(ROOT, outPath)}`);
      } catch (err) {
        console.log(`✗ ${err.message}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
