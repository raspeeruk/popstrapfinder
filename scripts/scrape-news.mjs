#!/usr/bin/env node
/**
 * Daily content scraper — Reddit + Google News for Royal Pop coverage.
 *
 * What it does:
 *   1. Queries a few Reddit subreddits for new "royal pop" / "AP swatch" posts
 *   2. Queries Google News RSS for the same terms
 *   3. Deduplicates against the existing curated list in app/data/news.ts
 *   4. Writes new findings to app/data/discovered-news.json (or appends to it)
 *
 * Usage:
 *   node scripts/scrape-news.mjs           # run once, write findings
 *   node scripts/scrape-news.mjs --dry     # show findings, don't write
 *
 * Deployment:
 *   - Locally:        `node scripts/scrape-news.mjs`
 *   - GitHub Actions: see .github/workflows/scrape-news.yml
 *   - Railway:        npm start with a cron schedule in railway.json
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "app", "data", "discovered-news.json");

const UA =
  "PopStrapFinderBot/1.0 (+https://popstrapfinder.com; non-commercial research)";

const REDDIT_QUERIES = [
  { subreddit: "Watches", query: "royal pop" },
  { subreddit: "Watches", query: "ap swatch" },
  { subreddit: "Swatch", query: "royal pop" },
  { subreddit: "AudemarsPiguet", query: "royal pop" },
  { subreddit: "all", query: "royal pop swatch" },
];

const NEWS_QUERIES = [
  "royal pop swatch",
  "audemars piguet swatch pocket watch",
  '"royal pop"',
];

// ─── Reddit ──────────────────────────────────────────────────────────────────

async function scrapeReddit() {
  const out = [];
  for (const { subreddit, query } of REDDIT_QUERIES) {
    const base =
      subreddit === "all"
        ? "https://www.reddit.com/search.json"
        : `https://www.reddit.com/r/${subreddit}/search.json`;
    const url = `${base}?q=${encodeURIComponent(query)}&sort=new&limit=25${
      subreddit === "all" ? "" : "&restrict_sr=on"
    }`;
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (!r.ok) {
        console.warn(`  reddit ${subreddit} '${query}' → ${r.status}`);
        continue;
      }
      const json = await r.json();
      for (const child of json?.data?.children || []) {
        const d = child.data;
        if (!d?.title || !d?.permalink) continue;
        out.push({
          url: `https://www.reddit.com${d.permalink}`,
          title: d.title,
          source: `r/${d.subreddit}`,
          type: "reddit",
          publishedISO: d.created_utc
            ? new Date(d.created_utc * 1000).toISOString()
            : undefined,
          summary:
            (d.selftext || "").replace(/\s+/g, " ").trim().slice(0, 240) ||
            `${d.score} upvotes · ${d.num_comments} comments`,
          score: d.score,
          numComments: d.num_comments,
        });
      }
    } catch (err) {
      console.warn(`  reddit ${subreddit} '${query}' failed: ${err.message}`);
    }
  }
  return out;
}

// ─── Google News (RSS) ───────────────────────────────────────────────────────

async function scrapeGoogleNews() {
  const out = [];
  for (const query of NEWS_QUERIES) {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
      query
    )}&hl=en-US&gl=US&ceid=US:en`;
    try {
      const r = await fetch(url, { headers: { "User-Agent": UA } });
      if (!r.ok) {
        console.warn(`  gnews '${query}' → ${r.status}`);
        continue;
      }
      const xml = await r.text();
      // Simple item parser — RSS items have <title>...</title><link>...</link><pubDate>...</pubDate><source>...</source>
      const items = xml.match(/<item[\s\S]*?<\/item>/g) || [];
      for (const item of items) {
        const title = (item.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
        const link = (item.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || "";
        const pubDate = (item.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || "";
        const sourceMatch =
          item.match(/<source[^>]*>([\s\S]*?)<\/source>/) || [];
        if (!title || !link) continue;
        out.push({
          url: link.trim(),
          title: decodeEntities(title.trim()),
          source: decodeEntities(sourceMatch[1] || "Google News"),
          type: "article",
          publishedISO: pubDate ? new Date(pubDate).toISOString() : undefined,
          summary: "",
        });
      }
    } catch (err) {
      console.warn(`  gnews '${query}' failed: ${err.message}`);
    }
  }
  return out;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

// ─── Relevance filter — must mention the watch, not just match a noisy query ─

const KEYWORD_PATTERNS = [
  /\broyal\s*pop\b/i,
  /\bap\s*[x×]\s*swatch\b/i,
  /\baudemars[\s_-]+piguet\b.{0,80}\bswatch\b/i,
  /\bswatch\b.{0,80}\baudemars[\s_-]+piguet\b/i,
  /\bSSX03[A-Z][0-9]+N\b/i, // any Royal Pop reference number
];

function isRelevant(item) {
  const hay = `${item.title || ""} ${item.summary || ""}`;
  return KEYWORD_PATTERNS.some((p) => p.test(hay));
}

// ─── Dedup against curated news.ts + previously discovered ──────────────────

async function existingUrls() {
  const urls = new Set();
  try {
    const txt = await fs.readFile(
      path.join(ROOT, "app", "data", "news.ts"),
      "utf8"
    );
    for (const m of txt.matchAll(/url:\s*["']([^"']+)["']/g)) urls.add(m[1]);
  } catch {}
  try {
    const prev = JSON.parse(await fs.readFile(OUT_PATH, "utf8"));
    for (const item of prev.items || []) urls.add(item.url);
  } catch {}
  return urls;
}

function normalizeUrl(u) {
  // Strip tracking params for dedup robustness
  try {
    const url = new URL(u);
    for (const k of [...url.searchParams.keys()]) {
      if (k.toLowerCase().startsWith("utm_") || k.toLowerCase() === "ref")
        url.searchParams.delete(k);
    }
    return url.toString();
  } catch {
    return u;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const dryRun = process.argv.includes("--dry");

  console.log(`PopStrap scraper · ${new Date().toISOString()}`);
  console.log("  fetching Reddit…");
  const redditItems = await scrapeReddit();
  console.log(`    ${redditItems.length} Reddit results`);

  console.log("  fetching Google News…");
  const newsItems = await scrapeGoogleNews();
  console.log(`    ${newsItems.length} news results`);

  const seen = await existingUrls();
  const all = [...redditItems, ...newsItems];
  const relevant = all.filter(isRelevant);
  console.log(
    `  ${relevant.length}/${all.length} pass relevance filter (must mention royal pop / ap×swatch / AP+Swatch)`
  );

  const fresh = [];
  const byUrl = new Map();
  for (const item of relevant) {
    const norm = normalizeUrl(item.url);
    if (seen.has(norm) || seen.has(item.url)) continue;
    if (byUrl.has(norm)) continue; // intra-batch dedup
    byUrl.set(norm, true);
    fresh.push({ ...item, url: norm });
  }
  console.log(`  ${fresh.length} new (after dedup vs curated + previous)`);

  if (dryRun) {
    console.log("\n--- DRY RUN — first 5 of new findings ---");
    for (const f of fresh.slice(0, 5)) {
      console.log(`  [${f.type}] ${f.source} — ${f.title}`);
      console.log(`    ${f.url}`);
    }
    return;
  }

  // Merge with previous discovered file (newest first), cap at 200 entries.
  let prev = { items: [] };
  try {
    prev = JSON.parse(await fs.readFile(OUT_PATH, "utf8"));
  } catch {}
  const merged = [
    ...fresh.map((f) => ({ ...f, discoveredISO: new Date().toISOString() })),
    ...(prev.items || []),
  ].slice(0, 200);

  await fs.writeFile(
    OUT_PATH,
    JSON.stringify(
      {
        generatedISO: new Date().toISOString(),
        sourceCount: { reddit: redditItems.length, news: newsItems.length },
        newCount: fresh.length,
        items: merged,
      },
      null,
      2
    )
  );
  console.log(`  wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
