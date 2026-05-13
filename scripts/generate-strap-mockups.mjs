#!/usr/bin/env node
/**
 * Generate PopStrap Originals mockup images via Google Gemini 2.5 Flash Image
 * ("Nano Banana"), then composite the press-shot dial back onto the result with
 * Sharp so the watch face is pixel-identical to the source.
 *
 * Three form factors, distinct prompts:
 *   - snap: one-piece moulded FKM rubber, octagonal cutout snap-fit
 *   - clip: Bioceramic-coated steel frame with 22mm spring-bar lugs
 *   - loop: octagonal anodized frame with pass-through NATO strap
 *
 * References fed to Gemini per call:
 *   - Local dial close-up (public/images/colorways/<slug>.jpg)
 *   - Form-factor-appropriate community reference (Andrew's screenshots)
 *   - Per-colorway wristbuddys product photo (fetched at runtime)
 *
 * Pixel-perfect dial preservation:
 *   - Gemini is instructed to centre the watch case with the dial face at
 *     canvas center, occupying ~25% of the canvas (≈256×256 of a 1024 image).
 *   - Sharp post-process masks the press-shot dial to a circle, resizes to
 *     256×256, and composites it over the generated image at (384, 384).
 *
 * Usage:
 *   node scripts/generate-strap-mockups.mjs            # all 8 colorways
 *   node scripts/generate-strap-mockups.mjs huit-blanc # one colorway
 *
 * Requirements: GEMINI_API_KEY in env, Node 22+, sharp installed.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "mockups");
const COLORWAY_DIR = path.join(ROOT, "public", "images", "colorways");
const CASE_HEAD_DIR = path.join(ROOT, "public", "images", "case-heads");

const MODEL = "gemini-2.5-flash-image";

// Composite parameters — these must match what we tell Gemini about positioning.
const CANVAS = 1024;
// The pristine case-head cutout will be composited at this size (square),
// centered horizontally and pulled slightly above center vertically so the
// strap has more visual space below.
const CASE_SIZE = 480;
const CASE_LEFT = Math.round((CANVAS - CASE_SIZE) / 2);
const CASE_TOP = Math.round((CANVAS - CASE_SIZE) / 2) - 30;

// Community references provided by Andrew. Used at runtime ONLY as
// form-factor guidance for the model — not stored in the repo, not
// redistributed. The output is our own composite.
const REFS_DIR = "/Users/andrewspeer/Downloads/New Folder With Items 2";
const COMMUNITY_REFS = {
  snap: [
    // Screenshot showing the case head visibly snapping into a black rubber adapter
    path.join(REFS_DIR, "Screenshot_20260513-150637.png"),
    // White rubber strap with rainbow keepers — Artra concept
    path.join(REFS_DIR, "Screenshot_20260513-150714.png"),
  ],
  clip: [
    // Blue integrated bracelet concept (apwatchstrap)
    path.join(REFS_DIR, "Screenshot_20260513-150615.png"),
    // Full eight-colorway render set (popstrap.original)
    path.join(REFS_DIR, "Screenshot_20260513-150644.png"),
  ],
  loop: [
    // Snap-fit form factor reference (closest analog for "case in frame")
    path.join(REFS_DIR, "Screenshot_20260513-150637.png"),
    path.join(REFS_DIR, "Screenshot_20260513-150644.png"),
  ],
};

const WRISTBUDDYS_REFS = {
  "huit-blanc": "https://wristbuddys.com/cdn/shop/files/RoyalPop-HUIT-BLANC.webp",
  "otto-rosso": "https://wristbuddys.com/cdn/shop/files/RoyalPop-OTTO-ROSSO.webp",
  "green-eight": "https://wristbuddys.com/cdn/shop/files/RoyalPopGREEN-EIGHT.webp",
  "blaue-acht": "https://wristbuddys.com/cdn/shop/files/RoyalPop-BLAUE-ACHT.webp",
  "orenji-hachi": "https://wristbuddys.com/cdn/shop/files/RoyalPop-ORENJI-HACHI.webp",
  "lan-ba": "https://wristbuddys.com/cdn/shop/files/RoyalPopLAN-BA.webp",
  "ocho-negro": "https://wristbuddys.com/cdn/shop/files/RoyalPop-OCHO-NEGRO.webp",
  "otg-roz": "https://wristbuddys.com/cdn/shop/files/RoyalPopOTG-ROZ.webp",
};

const FORM_INSTRUCTIONS = {
  snap: [
    "FORM FACTOR — 'The Snap': The watch case head snap-fits into a one-piece moulded FKM rubber adapter that wraps the full octagonal perimeter of the case, hugging all 8 sides.",
    "The adapter and the wrist strap are a single continuous piece of moulded rubber — no separate components.",
    "A visible seam runs around the perimeter of the case where it sits in the rubber, making it clear the case head is inserted into the rubber, not integrated with it.",
    "The strap extends top and bottom in one continuous flowing piece.",
  ].join(" "),
  clip: [
    "FORM FACTOR — 'The Clip': The watch case head clicks into a thin Bioceramic-coated steel frame adapter that wraps the octagonal perimeter of the case.",
    "Two protruding spring-bar lugs are visible at top and bottom of the adapter frame — standard 22mm watch lugs with visible pin/spring bars.",
    "A separate leather wrist strap is attached to those lugs (this is a removable, interchangeable strap).",
    "The strap and the adapter frame are clearly TWO SEPARATE PARTS, not one piece.",
  ].join(" "),
  loop: [
    "FORM FACTOR — 'The Loop': The watch case head sits inside a thin octagonal anodized metal frame that wraps the case perimeter.",
    "A single-piece NATO-style fabric strap passes UNDER the watch case and through both ends of the frame, with the buckle on one end.",
    "The NATO strap is clearly visible threading through the frame at the top and bottom of the case — like a Marathon or Tudor NATO build.",
    "The strap and the frame are TWO SEPARATE PARTS — the strap can be pulled out the side without removing the watch from the frame.",
  ].join(" "),
};

const COMPOSITION_LOCK = [
  "COMPOSITION (critical):",
  `- Canvas is square, 1024×1024.`,
  `- The watch case occupies a roughly ${CASE_SIZE}×${CASE_SIZE} pixel area centered horizontally at x=512, with its center at y=${CASE_TOP + CASE_SIZE / 2} (slightly above canvas center).`,
  `- The case looks correct in the position, but I will overlay the pristine watch case head on top of yours — so YOUR drawing of the watch face does not need to be perfect, but the case POSITION must match the description above.`,
  `- The wrist strap extends from above the watch (top of canvas) and below (bottom of canvas), connecting cleanly to the adapter that wraps the case.`,
  `- Clean off-white background (#F4F2EE). Soft directional lighting. Subtle drop shadow under the watch+strap.`,
  `- Editorial product photography. No people, no wrists, no text overlays, no logos other than what's on the watch.`,
].join("\n");

// Per-colorway strap design (concept + colors + materials)
const STRAP_DESIGNS = {
  "huit-blanc": {
    formFactor: "clip",
    strapName: "The Domino",
    designPrompt: [
      "Bioceramic-coated steel frame in matte black wraps the octagonal case.",
      "Standard 22mm spring-bar lugs visible at top and bottom of the frame.",
      "Attached: a smooth black Italian calfskin leather strap with rainbow contrast thread stitching along both edges (one thread per color: red, orange, yellow, green, blue, purple), echoing the rainbow hour-marker dashes on the dial.",
      "Brushed stainless-steel pin buckle.",
    ].join(" "),
  },
  "otto-rosso": {
    formFactor: "clip",
    strapName: "The Confetto",
    designPrompt: [
      "Bioceramic-coated steel frame in rose-gold tone wraps the octagonal case.",
      "Standard 22mm spring-bar lugs visible at top and bottom.",
      "Attached: a soft blush-pink Italian nappa leather strap with poppy-red contrast stitching.",
      "Rose-gold pin buckle.",
    ].join(" "),
  },
  "green-eight": {
    formFactor: "loop",
    strapName: "The Olive Run",
    designPrompt: [
      "Octagonal anodized metal frame in aged-brass tone wraps the case.",
      "An olive-green single-piece twill NATO strap with cognac leather edge trim passes under the watch and threads through the frame at top and bottom.",
      "Aged-brass pin buckle on one end.",
    ].join(" "),
  },
  "blaue-acht": {
    formFactor: "snap",
    strapName: "The Lumebomb",
    designPrompt: [
      "One-piece moulded lime-green FKM rubber strap with subtle glow-pigment specks throughout (suggesting Super-LumiNova) and royal-blue contrast piping along both edges.",
      "Brushed steel pin buckle.",
    ].join(" "),
  },
  "orenji-hachi": {
    formFactor: "snap",
    strapName: "The Pit Pass",
    designPrompt: [
      "One-piece moulded safety-orange FKM rubber strap with quadrillage texture and racing-spec channels along both edges.",
      "Matte-black PVD pin buckle and matte-black rubber keeper loops.",
    ].join(" "),
  },
  "lan-ba": {
    formFactor: "snap",
    strapName: "The Frost",
    designPrompt: [
      "One-piece moulded brilliant-white FKM rubber strap with a frosted micro-texture across the surface (soft satin finish).",
      "Light-blue contrast piping along both edges.",
      "Brushed stainless-steel pin buckle.",
    ].join(" "),
  },
  "ocho-negro": {
    formFactor: "clip",
    strapName: "The Tuxedo",
    designPrompt: [
      "Bioceramic-coated steel frame in polished black wraps the octagonal case.",
      "Standard 22mm spring-bar lugs visible at top and bottom.",
      "Attached: a glossy black alligator-grain calfskin leather strap with tonal black stitching.",
      "Polished stainless-steel pin buckle.",
    ].join(" "),
  },
  "otg-roz": {
    formFactor: "loop",
    strapName: "The Memphis",
    designPrompt: [
      "Octagonal anodized metal frame in bright pink wraps the case.",
      "A bright-yellow single-piece twill NATO strap with turquoise leather edge trim passes under the watch and threads through the frame at top and bottom.",
      "Matte yellow pin buckle on one end.",
    ].join(" "),
  },
};

const SLUGS = Object.keys(STRAP_DESIGNS);

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

async function fetchRef(url) {
  const r = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17 Safari/605.1.15",
    },
  });
  if (!r.ok) throw new Error(`ref fetch ${r.status} ${url}`);
  const ctype = (r.headers.get("content-type") || "image/webp").split(";")[0].trim();
  const buf = Buffer.from(await r.arrayBuffer());
  return { b64: buf.toString("base64"), mime: ctype };
}

async function loadLocalRef(p) {
  try {
    const buf = await fs.readFile(p);
    const mime = p.toLowerCase().endsWith(".png")
      ? "image/png"
      : p.toLowerCase().endsWith(".webp")
        ? "image/webp"
        : "image/jpeg";
    return { b64: buf.toString("base64"), mime };
  } catch (err) {
    console.log(`  (skipping ref ${path.basename(p)}: ${err.message})`);
    return null;
  }
}

function buildPrompt(slug) {
  const design = STRAP_DESIGNS[slug];
  const formText = FORM_INSTRUCTIONS[design.formFactor];
  return [
    "I'm giving you multiple images.",
    "IMAGE 1 (locked watch face reference): a close-up of the Royal Pop dial. The dial pattern, color, hour markers, hands, 'AP × swatch' logo, and 'Royal Pop' text must be preserved exactly in your output. This is the locked face.",
    "Additional images: community references showing how the case head fits into wrist adapters. Use them ONLY as form-factor reference — do NOT copy any strap design, color, material, or hardware from them. Our design is completely different.",
    `Design assignment — "${design.strapName}":`,
    formText,
    design.designPrompt,
    COMPOSITION_LOCK,
  ].join("\n\n");
}

async function generateWithGemini(slug) {
  const design = STRAP_DESIGNS[slug];

  // Image 1 — the locked dial close-up (we'll also composite this back later)
  const dialPath = path.join(COLORWAY_DIR, `${slug}.jpg`);
  const dialBuf = await fs.readFile(dialPath);

  const parts = [
    { text: buildPrompt(slug) },
    {
      inline_data: { mime_type: "image/jpeg", data: dialBuf.toString("base64") },
    },
  ];

  // Wristbuddys per-colorway reference
  const wbUrl = WRISTBUDDYS_REFS[slug];
  if (wbUrl) {
    try {
      const wb = await fetchRef(wbUrl);
      parts.push({ inline_data: { mime_type: wb.mime, data: wb.b64 } });
    } catch (err) {
      console.log(`  (wristbuddys ref failed: ${err.message})`);
    }
  }

  // Community references for this form factor (1–2 images)
  for (const refPath of COMMUNITY_REFS[design.formFactor] || []) {
    const local = await loadLocalRef(refPath);
    if (local) {
      parts.push({ inline_data: { mime_type: local.mime, data: local.b64 } });
    }
  }

  const body = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ["IMAGE"] },
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(
    process.env.GEMINI_API_KEY
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
    throw new Error(`No image in Gemini response. Text: ${reason || "(none)"}`);
  }
  return Buffer.from(b64, "base64");
}

async function compositeCaseHead(generatedBuf, slug) {
  const caseHeadPath = path.join(CASE_HEAD_DIR, `${slug}.png`);

  // Trim transparent padding from the case-head cutout, then resize square.
  const trimmed = await sharp(caseHeadPath)
    .trim({ threshold: 1 })
    .toBuffer();
  const cased = await sharp(trimmed)
    .resize(CASE_SIZE, CASE_SIZE, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const out = await sharp(generatedBuf)
    .resize(CANVAS, CANVAS, { fit: "cover", position: "centre" })
    .composite([{ input: cased, left: CASE_LEFT, top: CASE_TOP, blend: "over" }])
    .png()
    .toBuffer();

  return out;
}

async function runOne(slug) {
  // Ensure case-head cutout exists; if not, prompt user to run extract first.
  const caseHeadPath = path.join(CASE_HEAD_DIR, `${slug}.png`);
  try {
    await fs.access(caseHeadPath);
  } catch {
    throw new Error(
      `Missing case-head cutout at ${path.relative(ROOT, caseHeadPath)}. ` +
        `Run: node scripts/extract-case-heads.mjs ${slug}`
    );
  }

  const generated = await generateWithGemini(slug);
  const composited = await compositeCaseHead(generated, slug);
  const outPath = path.join(OUT_DIR, `${slug}.png`);
  await fs.writeFile(outPath, composited);
  return outPath;
}

async function main() {
  await loadDotenv();
  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in env or rogerson/.env.");
    process.exit(1);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  const filter = process.argv[2];
  const targets = filter ? SLUGS.filter((s) => s === filter) : SLUGS;
  if (filter && targets.length === 0) {
    console.error(`Unknown slug: ${filter}`);
    console.error(`Available: ${SLUGS.join(", ")}`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} mockup(s) via ${MODEL} + Sharp composite…`);

  for (const slug of targets) {
    const design = STRAP_DESIGNS[slug];
    process.stdout.write(`  ${slug.padEnd(14)} [${design.formFactor.padEnd(4)}] ${design.strapName.padEnd(16)} `);
    try {
      const outPath = await runOne(slug);
      console.log(`✓ ${path.relative(ROOT, outPath)}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }

  console.log("\nDone. Next:");
  console.log("  1. Review images in public/images/mockups/");
  console.log("  2. Flip hasMockup: true in app/data/originals.ts for ready slugs");
  console.log("  3. npm run build");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
