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

          {/* Hero visual — octagonal frame stack */}
          <div className="md:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 bg-pop-pink octa halftone-light" aria-hidden />
              <div className="relative octa bg-pop-yellow p-6">
                <div className="octa bg-pop-white p-2 popbox-tight">
                  <div className="octa relative aspect-square bg-pop-sky">
                    {/* Stylised watch face built in CSS */}
                    <div className="absolute inset-[12%] octa bg-pop-navy" aria-hidden />
                    <div className="absolute inset-[20%] octa bg-pop-white" aria-hidden />
                    <div className="absolute inset-[28%] octa bg-pop-red flex items-center justify-center" aria-hidden>
                      <span className="font-display text-pop-white text-3xl rotate-[-12deg]">POP</span>
                    </div>
                    {/* hour markers */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-92px)`,
                        }}
                      />
                    ))}
                    {/* hands */}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-[28%] w-1.5 origin-bottom -translate-x-1/2 -translate-y-full bg-ink"
                      style={{ transform: "translate(-50%, -100%) rotate(40deg)" }}
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-[36%] w-1 origin-bottom -translate-x-1/2 -translate-y-full bg-pop-yellow"
                      style={{ transform: "translate(-50%, -100%) rotate(115deg)" }}
                    />
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pop-red ring-2 ring-ink"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-6 burst bg-pop-red px-6 py-8 text-center text-paper font-display">
                <span className="block text-xs uppercase tracking-widest">As of</span>
                <span className="block text-2xl">May 19</span>
                <span className="block text-xs uppercase tracking-widest">2026</span>
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
