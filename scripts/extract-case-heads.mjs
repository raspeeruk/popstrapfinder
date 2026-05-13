#!/usr/bin/env node
/**
 * One-time extraction: produce a clean, front-on, isolated PNG of each Royal Pop
 * watch case head with a pure white background. These cutouts become the
 * canonical "locked watch" reference that the strap-mockup script composites
 * onto every generated design.
 *
 * Source material (per colorway):
 *   - public/images/colorways/<slug>.jpg          (dial close-up)
 *   - wristbuddys product photo                   (full watch in adapter)
 *
 * Output:
 *   - public/images/case-heads/<slug>.png
 *
 * Usage:
 *   node scripts/extract-case-heads.mjs              # all 8 colorways
 *   node scripts/extract-case-heads.mjs huit-blanc   # one slug
 *   node scripts/extract-case-heads.mjs --force      # regenerate even if cached
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const COLORWAY_DIR = path.join(ROOT, "public", "images", "colorways");
const OUT_DIR = path.join(ROOT, "public", "images", "case-heads");

const MODEL = "gemini-2.5-flash-image";

const WRISTBUDDYS = {
  "huit-blanc": "https://wristbuddys.com/cdn/shop/files/RoyalPop-HUIT-BLANC.webp",
  "otto-rosso": "https://wristbuddys.com/cdn/shop/files/RoyalPop-OTTO-ROSSO.webp",
  "green-eight": "https://wristbuddys.com/cdn/shop/files/RoyalPopGREEN-EIGHT.webp",
  "blaue-acht": "https://wristbuddys.com/cdn/shop/files/RoyalPop-BLAUE-ACHT.webp",
  "orenji-hachi": "https://wristbuddys.com/cdn/shop/files/RoyalPop-ORENJI-HACHI.webp",
  "lan-ba": "https://wristbuddys.com/cdn/shop/files/RoyalPopLAN-BA.webp",
  "ocho-negro": "https://wristbuddys.com/cdn/shop/files/RoyalPop-OCHO-NEGRO.webp",
  "otg-roz": "https://wristbuddys.com/cdn/shop/files/RoyalPopOTG-ROZ.webp",
};

const COLORWAY_DETAILS = {
  "huit-blanc": "white Bioceramic case, rainbow hour-marker dashes on a white tapisserie dial, pink 'AP × swatch' logo and 'Royal Pop' text",
  "otto-rosso": "light-pink Bioceramic case with poppy-red bezel accents, bright red dial",
  "green-eight": "lime-green Bioceramic case with a deep olive 'Royal Oak' tapisserie dial",
  "blaue-acht": "lime-green Bioceramic case with a light-blue lume-heavy dial, large indices",
  "orenji-hachi": "midnight-blue Bioceramic case with a bright-orange dial and orange minute hand",
  "lan-ba": "light-blue Bioceramic case with a mid-blue tapisserie dial",
  "ocho-negro": "white Bioceramic case with a stark black dial and small seconds sub-dial at 6 o'clock",
  "otg-roz": "pink and turquoise Bioceramic case with fuchsia, yellow and turquoise Memphis-style dial details",
};

const REFS_DIR = "/Users/andrewspeer/Downloads/New Folder With Items 2";
const COMMUNITY_REFS = [
  // Best snap-fit / case-head reference — solemania.bkk
  path.join(REFS_DIR, "Screenshot_20260513-150637.png"),
  // Eight colorway grid — popstrap.original
  path.join(REFS_DIR, "Screenshot_20260513-150644.png"),
];

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

async function fetchUrlAsB64(url) {
  const r = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17 Safari/605.1.15",
    },
  });
  if (!r.ok) throw new Error(`fetch ${r.status} ${url}`);
  const ctype = (r.headers.get("content-type") || "image/webp").split(";")[0].trim();
  const buf = Buffer.from(await r.arrayBuffer());
  return { b64: buf.toString("base64"), mime: ctype };
}

async function readFileAsB64(p) {
  const buf = await fs.readFile(p);
  const mime = p.toLowerCase().endsWith(".png")
    ? "image/png"
    : p.toLowerCase().endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  return { b64: buf.toString("base64"), mime };
}

function buildExtractionPrompt(slug) {
  const details = COLORWAY_DETAILS[slug];
  return [
    `I'm giving you reference images of the Audemars Piguet × Swatch Royal Pop "${slug}" pocket watch case head.`,
    "",
    "TASK: Produce ONE image that looks like a Photoshop diecut — the watch case head isolated as if cut out with scissors and laid on a pure white sheet of paper.",
    "",
    "ABSOLUTELY DO NOT INCLUDE ANY OF THE FOLLOWING:",
    "- No wrist strap, no rubber band, no leather strap, no metal bracelet, no NATO, no nylon, no fabric of any kind",
    "- No neck lanyard, no cord, no chain, no clip, no carabiner",
    "- No adapter, no frame, no lug attachments, no spring bars",
    "- No human body parts, no wrist, no hand, no skin",
    "- No surface, no table, no shadow, no reflection",
    "- No second watch, no packaging, no box, no scale reference",
    "- No text overlays, no captions, no watermarks",
    "",
    "INCLUDE ONLY:",
    "- The octagonal Bioceramic case body (front face plus visible side rim)",
    "- The octagonal bezel with 8 hex-head screws visible (one at each of the 8 octagon vertices, not just at 4 corners — count carefully)",
    "- The circular dial inside the bezel (preserving tapisserie pattern, hour markers, hands, AP × swatch logo, 'Royal Pop' text)",
    "- The small crown nub protruding from the case edge (typically at 12 o'clock for Lépine or 3 o'clock for Savonnette)",
    "",
    "LAYOUT:",
    "- Perfectly front-on view. The watch faces the camera directly. No 3D rotation, no tilt, no perspective skew. Bezel must look perfectly symmetric.",
    "- Solid PURE MAGENTA background — exactly hex color #FF00FF — filling the ENTIRE canvas right up to the watch case edge. (This is a chroma-key background that I will later strip to transparency.)",
    "- Watch centered, occupying ~75% of the 1024×1024 canvas.",
    "- Hard, crisp edge between the watch case and the magenta background — no anti-alias halo if possible.",
    "",
    `Colorway-specific dial details: ${details}.`,
    "",
    "Output: a perfectly isolated diecut watch case head on white. Think of it like a tech-spec page in a watch catalog where only the watch appears.",
  ].join("\n");
}

async function extractOne(slug, force) {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${slug}.png`);

  if (!force) {
    try {
      await fs.access(outPath);
      console.log(`  ${slug.padEnd(14)} (cached)`);
      return outPath;
    } catch {
      /* not cached, continue */
    }
  }

  // Build multi-image input: dial close-up + wristbuddys + community refs
  const parts = [{ text: buildExtractionPrompt(slug) }];

  const dial = await readFileAsB64(path.join(COLORWAY_DIR, `${slug}.jpg`));
  parts.push({ inline_data: { mime_type: dial.mime, data: dial.b64 } });

  const wbUrl = WRISTBUDDYS[slug];
  if (wbUrl) {
    try {
      const wb = await fetchUrlAsB64(wbUrl);
      parts.push({ inline_data: { mime_type: wb.mime, data: wb.b64 } });
    } catch (err) {
      console.log(`  (wristbuddys ref failed: ${err.message})`);
    }
  }

  for (const refPath of COMMUNITY_REFS) {
    try {
      const ref = await readFileAsB64(refPath);
      parts.push({ inline_data: { mime_type: ref.mime, data: ref.b64 } });
    } catch {
      /* skip missing refs */
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

  // Sharp post-process: chroma-key the background to transparency.
  // We sample the actual corner pixel because Gemini ignores requested colors
  // and substitutes its own (e.g. cerise instead of pure magenta).
  const raw = Buffer.from(b64, "base64");
  const { data, info } = await sharp(raw)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Sample the corners and use the median as the chroma key target
  const cornerSamples = [
    { x: 5, y: 5 },
    { x: info.width - 5, y: 5 },
    { x: 5, y: info.height - 5 },
    { x: info.width - 5, y: info.height - 5 },
  ];
  const corners = cornerSamples.map((p) => {
    const i = (p.y * info.width + p.x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2] };
  });
  // Use the first corner as reference (they tend to be uniform from Gemini)
  const key = corners[0];

  // Tolerance: per-channel Manhattan-ish distance.
  // We treat the background as any pixel within `tol` of the keyed color
  // simultaneously on R, G, and B.
  const TOL = 35;

  const pixels = Buffer.from(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const dr = Math.abs(pixels[i] - key.r);
    const dg = Math.abs(pixels[i + 1] - key.g);
    const db = Math.abs(pixels[i + 2] - key.b);
    if (dr < TOL && dg < TOL && db < TOL) {
      pixels[i + 3] = 0;
    }
  }

  const processed = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  await fs.writeFile(outPath, processed);
  console.log(`  ${slug.padEnd(14)} ✓ ${path.relative(ROOT, outPath)}`);
  return outPath;
}

async function main() {
  await loadDotenv();
  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY.");
    process.exit(1);
  }

  const force = process.argv.includes("--force");
  const filter = process.argv.find((a) => !a.startsWith("--") && a !== process.argv[0] && a !== process.argv[1]);
  const ALL = Object.keys(COLORWAY_DETAILS);
  const targets = filter ? ALL.filter((s) => s === filter) : ALL;
  if (filter && targets.length === 0) {
    console.error(`Unknown slug: ${filter}. Available: ${ALL.join(", ")}`);
    process.exit(1);
  }

  console.log(`Extracting ${targets.length} case head(s) via ${MODEL}…`);
  for (const slug of targets) {
    try {
      await extractOne(slug, force);
    } catch (err) {
      console.log(`  ${slug.padEnd(14)} ✗ ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
