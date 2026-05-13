#!/usr/bin/env node
/**
 * Generate PopStrap Originals mockup images via OpenAI gpt-image-1.
 *
 * Requirements:
 *   - Node 22+ (native fetch)
 *   - OPENAI_API_KEY in env (or rogerson/.env)
 *
 * Usage:
 *   node scripts/generate-strap-mockups.mjs            # all 8 colorways
 *   node scripts/generate-strap-mockups.mjs huit-blanc # one colorway
 *
 * Output: public/images/mockups/<slug>.png
 *
 * After generation, flip hasMockup=true in app/data/originals.ts for each
 * generated slug so the page renders the image instead of the placeholder.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "mockups");

// Mirror of app/data/originals.ts — kept inline so this script has zero
// TypeScript or build dependencies.
const ORIGINALS = [
  {
    slug: "huit-blanc",
    colorwayName: "Huit Blanc",
    caseColor: "white",
    caseLabel: "white Bioceramic with rainbow hour-marker dashes",
    strapName: "The Domino",
    strapDescription:
      "jet-black smooth Italian calfskin leather watch strap with rainbow-thread contrast stitching and rainbow keeper loops",
    accentNotes:
      "rainbow accents echoing the watch dial markers; stainless steel pin buckle",
  },
  {
    slug: "otto-rosso",
    colorwayName: "Otto Rosso",
    caseColor: "light pink",
    caseLabel: "pale pink Bioceramic with poppy-red bezel accents",
    strapName: "The Confetto",
    strapDescription:
      "soft Italian nappa leather watch strap in pale blush pink with bright poppy-red contrast stitching",
    accentNotes:
      "rose-gold pin buckle; padded comfort lining; matte finish",
  },
  {
    slug: "green-eight",
    colorwayName: "Green Eight",
    caseColor: "lime green",
    caseLabel: "lime-green Bioceramic with a deep olive 'Royal Oak' dial",
    strapName: "The Olive Run",
    strapDescription:
      "vegetable-tanned cognac saddle leather watch strap with olive-green hand-painted edges, slight grain texture, vintage-style square-stitch",
    accentNotes:
      "aged-brass pin buckle; visible craft stitching; will develop patina",
  },
  {
    slug: "blaue-acht",
    colorwayName: "Blaue Acht",
    caseColor: "lime green with light blue dial",
    caseLabel: "lime-green Bioceramic case with light-blue lume-heavy dial",
    strapName: "The Lumebomb",
    strapDescription:
      "lime-green FKM rubber watch strap with subtle glow-charge pigment, fine quadrillage texture, soft matte finish",
    accentNotes:
      "blue contrast accent piping along the channel; brushed steel pin buckle",
  },
  {
    slug: "orenji-hachi",
    colorwayName: "Orenji Hachi",
    caseColor: "midnight navy with orange dial",
    caseLabel: "midnight-blue Bioceramic case with bright orange dial",
    strapName: "The Pit Pass",
    strapDescription:
      "safety-orange FKM rubber watch strap with quadrillage rubber texture, matte finish, racing-spec channels along the sides",
    accentNotes:
      "matte-black PVD pin buckle and black keeper loops",
  },
  {
    slug: "lan-ba",
    colorwayName: "Lan Ba",
    caseColor: "light blue",
    caseLabel: "light-blue Bioceramic case with mid-blue 'Frosted Oak' dial",
    strapName: "The Frost",
    strapDescription:
      "brilliant white FKM rubber watch strap with a frosted micro-texture across the surface, soft satin finish",
    accentNotes:
      "brushed stainless steel pin buckle; light-blue contrast stitching along the edge",
  },
  {
    slug: "ocho-negro",
    colorwayName: "Ocho Negro",
    caseColor: "white with black dial",
    caseLabel: "white Bioceramic case with stark black dial and small seconds",
    strapName: "The Tuxedo",
    strapDescription:
      "glossy black alligator-grain calfskin leather watch strap with hand-painted black edges and tonal black stitching",
    accentNotes:
      "polished stainless steel pin buckle; mirror-shine finish; formal-wear ready",
  },
  {
    slug: "otg-roz",
    colorwayName: "Otg Roz",
    caseColor: "pink and turquoise",
    caseLabel: "pink and turquoise Bioceramic case with Memphis-style dial",
    strapName: "The Memphis",
    strapDescription:
      "bright yellow FKM rubber watch strap with turquoise contrast piping along both edges, pink keeper loops, matte finish",
    accentNotes:
      "matte yellow pin buckle; 1980s Memphis Design language; pop-art statement",
  },
];

function buildPrompt(o) {
  return [
    `Hyper-realistic product photography of a luxury watch strap on a clean white studio background.`,
    `The strap is: ${o.strapDescription}.`,
    `${o.accentNotes}.`,
    `The strap is attached to a small octagonal watch case (Audemars Piguet Royal Oak-style, 40mm, eight-screw hexagonal bezel, ${o.caseLabel}, "tapisserie" pattern dial).`,
    `Strap is laid flat in a gentle curve next to the watch case.`,
    `Catalog product photography. Sharp focus. Even soft lighting. Subtle shadow.`,
    `Background is plain off-white (#F4F2EE). Square 1:1 composition.`,
    `Editorial, premium, like a Hodinkee shop listing. No people, no wrists, no text, no logos.`,
  ].join(" ");
}

async function loadDotenv() {
  // Load OPENAI_API_KEY from rogerson/.env if not already set
  if (process.env.OPENAI_API_KEY) return;
  const envPath = path.resolve(ROOT, "..", "rogerson", ".env");
  try {
    const txt = await fs.readFile(envPath, "utf8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^OPENAI_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) {
        process.env.OPENAI_API_KEY = m[1].replace(/^["']|["']$/g, "");
        break;
      }
    }
  } catch {
    // ignore — will fail with a clear message below if key missing
  }
}

async function generateOne(o) {
  const prompt = buildPrompt(o);

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "high",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI ${res.status}: ${text}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No b64_json in response: ${JSON.stringify(json).slice(0, 200)}`);

  const outPath = path.join(OUT_DIR, `${o.slug}.png`);
  await fs.writeFile(outPath, Buffer.from(b64, "base64"));
  return outPath;
}

async function main() {
  await loadDotenv();
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      "Missing OPENAI_API_KEY. Add it to rogerson/.env or export it before running."
    );
    process.exit(1);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const filter = process.argv[2];
  const targets = filter ? ORIGINALS.filter((o) => o.slug === filter) : ORIGINALS;
  if (filter && targets.length === 0) {
    console.error(`Unknown slug: ${filter}`);
    console.error(`Available: ${ORIGINALS.map((o) => o.slug).join(", ")}`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} mockup(s)…`);

  for (const o of targets) {
    process.stdout.write(`  ${o.slug.padEnd(14)} `);
    try {
      const outPath = await generateOne(o);
      console.log(`✓ ${path.relative(ROOT, outPath)}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }

  console.log("\nDone. Next:");
  console.log("  1. Review generated images in public/images/mockups/");
  console.log("  2. Edit app/data/originals.ts → set hasMockup: true for each ready slug");
  console.log("  3. npm run build to verify");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
