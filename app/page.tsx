import Link from "next/link";
import Script from "next/script";
import { colorways } from "./data/colorways";
import { strapCategories } from "./data/strap-categories";
import { newsItems } from "./data/news";
import { generalFaqs } from "./data/faqs";
import ColorwayCard from "./components/ColorwayCard";
import StrapCategoryCard from "./components/StrapCategoryCard";
import NewsCard from "./components/NewsCard";
import FAQAccordion from "./components/FAQAccordion";
import SectionHeading from "./components/SectionHeading";
import { faqJsonLd } from "./lib/schema";
import { isLightHex } from "./lib/color";

export default function Home() {
  const featuredNews = newsItems.slice(0, 6);
  const homeFaqs = generalFaqs.slice(0, 6);

  return (
    <>
      <Script
        id="home-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 halftone opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-24 lg:px-8">
          <div className="md:col-span-7">
            <p className="inline-block bg-ink px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-pop-yellow">
              Live · May 16, 2026 · the Royal Pop has landed
            </p>
            <h1 className="mt-5 font-display text-[42px] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[88px]">
              Straps for the
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 px-2 bg-pop-yellow">Royal Pop.</span>
                <span aria-hidden className="absolute -inset-1 -z-0 translate-x-2 translate-y-2 bg-ink" />
              </span>
              <br />
              Picked. Tested. Ranked.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink/80 sm:text-xl">
              The Audemars Piguet × Swatch Royal Pop is a pocket watch with a Royal Oak
              soul. Take it off the chain and onto your wrist with a strap that earns the case.
              We compare every option — leather, FKM, mesh, NATO, chain — across all eight colorways.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/find"
                className="popbox bg-pop-red px-6 py-4 font-display text-lg uppercase tracking-wide text-paper"
              >
                Find my strap →
              </Link>
              <Link
                href="/colors"
                className="popbox-tight bg-paper px-6 py-4 font-display text-lg uppercase tracking-wide"
              >
                Browse colorways
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-3 font-mono">
              {[
                { k: "8", v: "Colorways" },
                { k: "60+", v: "Strap picks" },
                { k: "0", v: "Sponsored placements" },
              ].map((s) => (
                <div key={s.v} className="popbox-tight bg-paper px-4 py-3">
                  <dt className="text-[10px] uppercase tracking-widest text-ink/60">{s.v}</dt>
                  <dd className="font-display text-3xl leading-none">{s.k}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual — nested hexagon layers, each in a colorway with halftone dots */}
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-square max-w-md">
              {/* Layer 1 (outermost): Pink */}
              <div className="absolute inset-0">
                <div className="hex relative h-full w-full" style={{ background: "#FF4D8F" }}>
                  <div className="absolute inset-0 halftone opacity-25 mix-blend-multiply" aria-hidden />
                </div>
              </div>
              {/* Layer 2: Yellow */}
              <div className="absolute inset-[10%]">
                <div className="hex relative h-full w-full" style={{ background: "#FFC700" }}>
                  <div className="absolute inset-0 halftone-dense opacity-25 mix-blend-multiply" aria-hidden />
                </div>
              </div>
              {/* Layer 3: Sky */}
              <div className="absolute inset-[22%]">
                <div className="hex relative h-full w-full" style={{ background: "#2196F3" }}>
                  <div className="absolute inset-0 halftone opacity-30 mix-blend-multiply" aria-hidden />
                </div>
              </div>
              {/* Layer 4: Green */}
              <div className="absolute inset-[33%]">
                <div className="hex relative h-full w-full" style={{ background: "#00C853" }}>
                  <div className="absolute inset-0 halftone-light opacity-40 mix-blend-multiply" aria-hidden />
                </div>
              </div>
              {/* Layer 5 (innermost): Red — the watch face */}
              <div className="absolute inset-[44%]">
                <div className="hex relative flex h-full w-full items-center justify-center" style={{ background: "#FF1744" }}>
                  <div className="absolute inset-0 halftone-light opacity-50 mix-blend-multiply" aria-hidden />
                  <span className="relative font-display text-3xl text-paper drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)] rotate-[-8deg]">
                    POP
                  </span>
                </div>
              </div>
              {/* Floating "Just launched" badge */}
              <div className="absolute -bottom-2 -right-4 burst bg-ink px-6 py-7 text-center text-pop-yellow font-display sm:-bottom-4 sm:-right-6">
                <span className="block text-xs uppercase tracking-widest">Just</span>
                <span className="block text-2xl leading-none">Live</span>
                <span className="block text-xs uppercase tracking-widest">May 16</span>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee colorway strip */}
        <div className="border-t-[3px] border-ink bg-ink overflow-hidden">
          <div className="flex divide-x-[3px] divide-paper/20">
            {colorways.map((c) => (
              <Link
                key={c.slug}
                href={`/colors/${c.slug}`}
                className="group flex flex-1 items-center justify-between gap-3 px-3 py-3 sm:px-5"
                style={{ background: c.hex }}
              >
                <span className={`font-display text-xs uppercase tracking-widest sm:text-sm ${isLightHex(c.hex) ? "text-ink" : "text-paper"}`}>
                  {c.name}
                </span>
                <span aria-hidden className={`font-mono text-[10px] opacity-60 group-hover:opacity-100 ${isLightHex(c.hex) ? "text-ink" : "text-paper"}`}>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COLORWAYS */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Eight cases. Eight palettes."
              title="Pick your colorway. We'll match the strap."
              description="Every Royal Pop colorway has materials, leathers and metals that flatter it — and some that wreck it. Start with the case colour you own (or want)."
            />
            <Link
              href="/colors"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pop-red hover:underline"
            >
              All 8 colorways →
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {colorways.map((c) => (
              <ColorwayCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* STRAP CATEGORIES */}
      <section className="border-b-[3px] border-ink bg-bone py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The strap library"
            title="Or start with the material."
            description="From $8 NATOs to $200 double-Albert chains. Eight categories, opinionated picks, no fluff."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strapCategories.map((c) => (
              <StrapCategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* THE PITCH */}
      <section className="border-b-[3px] border-ink bg-ink py-20 text-paper">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-pop-yellow">
            Why we exist
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] sm:text-6xl">
            Built for the people who got the watch <span className="text-pop-yellow">and</span> the people still trying.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Strap fitment, decoded.",
                b: "The Royal Pop's lug attachment is proprietary. Generic 20mm straps need adapters, and most listings online lie about compatibility. We test before we recommend.",
              },
              {
                t: "Colorway-first picks.",
                b: "Each of the eight colorways has its own page. We tell you which strap material flatters it, which clashes, and which becomes a sleeper grail.",
              },
              {
                t: "No sponsored placements.",
                b: "We earn through affiliate links when you click out — never through paid rankings. Every pick is on merit. See our affiliate disclosure.",
              },
            ].map((s) => (
              <div key={s.t} className="popbox-tight bg-paper text-ink p-6">
                <h3 className="font-display text-xl">{s.t}</h3>
                <p className="mt-3 text-sm text-ink/75">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Coverage hub"
              title="Everything the watch press is saying."
              description="We aggregate launch coverage, reviews, and Reddit threads so you can read once and decide."
            />
            <Link
              href="/news"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pop-red hover:underline"
            >
              Full news hub →
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredNews.map((n) => (
              <NewsCard key={n.url} item={n} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Quick answers before you buy."
            align="center"
          />
          <div className="mt-12">
            <FAQAccordion faqs={homeFaqs} />
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pop-red hover:underline"
            >
              All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="slash-banner py-2" aria-hidden />
      <section className="bg-pop-yellow py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-5xl leading-[0.95] sm:text-7xl">
            Ready to take it off the chain?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/80">
            Answer four questions about your Royal Pop and we'll match you to the right
            strap, in your colour, at your budget.
          </p>
          <Link
            href="/find"
            className="popbox mt-8 inline-block bg-ink px-8 py-5 font-display text-xl uppercase tracking-wide text-paper"
          >
            Run the strap finder →
          </Link>
        </div>
      </section>
    </>
  );
}
