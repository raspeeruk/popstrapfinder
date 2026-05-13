import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { colorways, colorwayBySlug } from "../../data/colorways";
import { categoryBySlug } from "../../data/strap-categories";
import { newsItems } from "../../data/news";
import { generalFaqs } from "../../data/faqs";
import SectionHeading from "../../components/SectionHeading";
import Breadcrumbs from "../../components/Breadcrumbs";
import NewsCard from "../../components/NewsCard";
import FAQAccordion from "../../components/FAQAccordion";
import StrapCategoryCard from "../../components/StrapCategoryCard";
import { faqJsonLd } from "../../lib/schema";
import { isLightHex } from "../../lib/color";
import type { ColorwaySlug } from "../../lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return colorways.map((c) => ({ color: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ color: string }>;
}): Promise<Metadata> {
  const { color } = await params;
  const c = colorwayBySlug[color as ColorwaySlug];
  if (!c) return {};
  return {
    title: `${c.name} (${c.reference}) — ${c.colorLabel} Royal Pop Straps`,
    description: `The best straps, frames, bracelets and accessories for the Royal Pop ${c.name} (${c.reference}, ${c.colorLabel}). Curated picks across leather, FKM rubber, metal mesh, NATO, chains and bundles.`,
    keywords: c.keywordAliases,
    alternates: { canonical: `https://popstrapfinder.com/colors/${c.slug}` },
    openGraph: {
      title: `${c.name} Royal Pop — Strap Guide`,
      description: `Compare straps designed for the Royal Pop ${c.name} (${c.colorLabel}).`,
      url: `https://popstrapfinder.com/colors/${c.slug}`,
      images: [{ url: c.imageUrl, alt: `Swatch Royal Pop ${c.name} (${c.reference})` }],
    },
  };
}

export default async function ColorPage({
  params,
}: {
  params: Promise<{ color: string }>;
}) {
  const { color } = await params;
  const c = colorwayBySlug[color as ColorwaySlug];
  if (!c) notFound();

  const recommendedCats = c.pairsWith
    .map((s) => categoryBySlug[s])
    .filter(Boolean);
  const otherColorways = colorways.filter((x) => x.slug !== c.slug);
  const localFaqs = [
    {
      q: `Which strap material looks best on the Royal Pop ${c.name}?`,
      a: c.recommendedMaterials.join(", ") + ". " + c.description,
    },
    ...generalFaqs.slice(0, 4),
  ];
  const isLightCase = isLightHex(c.hex);

  return (
    <>
      <Script
        id={`color-faq-${c.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(localFaqs)) }}
      />

      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Colorways", href: "/colors" },
              { name: `Royal Pop ${c.name}` },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b-[3px] border-ink"
        style={{ background: c.hex }}
      >
        <div className="absolute inset-0 halftone-light opacity-30 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-12 lg:px-8">
          <div className={`md:col-span-7 ${isLightCase ? "text-ink" : "text-paper"}`}>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              {c.reference} · {c.configurations.join(" + ")} · ${c.priceUsd} · Colorway{" "}
              {colorways.findIndex((x) => x.slug === c.slug) + 1} of 8
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
              <span className="block text-2xl sm:text-3xl mb-2 opacity-80">Straps for the</span>
              <span className={`inline-block px-3 ${isLightCase ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                {c.name.toUpperCase()}
              </span>
              <span className="block text-2xl sm:text-3xl mt-2 opacity-90">
                Royal Pop · {c.colorLabel}.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg sm:text-xl">{c.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#picks"
                className={`popbox px-6 py-4 font-display text-lg uppercase ${isLightCase ? "bg-ink text-paper" : "bg-paper text-ink"}`}
              >
                See our picks ↓
              </Link>
              <a
                href={c.swatchAffiliateUrl ?? c.swatchUrl}
                target="_blank"
                rel="noopener sponsored nofollow"
                data-track="swatch-cta"
                data-colorway={c.slug}
                className={`popbox-tight px-6 py-4 font-display text-lg uppercase ${isLightCase ? "bg-paper text-ink" : "bg-ink text-paper"}`}
              >
                Buy at Swatch ↗
              </a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="popbox bg-paper p-3">
              <div className="relative aspect-square bg-bone">
                <Image
                  src={c.imageUrl}
                  alt={`Swatch × Audemars Piguet Royal Pop ${c.name} (${c.reference}) — image courtesy of Swatch`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-ink">
                <Stat label="Case" value="40mm" />
                <Stat label="Movement" value="SISTEM51" />
                <Stat label="Reserve" value="90hr" />
                <Stat label="Water res." value="2 ATM" />
              </dl>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/60">
              Image: Swatch / Audemars Piguet press · editorial use
            </p>
          </div>
        </div>
      </section>

      {/* RECOMMENDED MATERIALS */}
      <section id="picks" className="border-b-[3px] border-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`Strap picks for the ${c.name}`}
            title="Materials we recommend."
            description={`The ${c.name} pairs hardest with specific materials. Some palettes are forgiving; this one has opinions.`}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {c.recommendedMaterials.map((m) => (
              <div key={m} className="popbox-tight bg-paper p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-pop-red">
                  Recommended
                </p>
                <p className="mt-2 font-display text-2xl">{m}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-display text-3xl">Strap categories that work</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommendedCats.map((cat) => (
                <StrapCategoryCard key={cat.slug} c={cat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OTHER COLORWAYS */}
      <section className="border-b-[3px] border-ink bg-bone py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="More colorways"
            title="Or browse the other seven."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {otherColorways.map((x) => (
              <Link
                key={x.slug}
                href={`/colors/${x.slug}`}
                className="popbox-tight bg-paper overflow-hidden p-0"
              >
                <div
                  className="halftone-light relative aspect-square"
                  style={{ background: x.hex }}
                >
                  <div className="absolute inset-x-2 bottom-2 font-display text-sm">
                    <span className={`inline-block px-1.5 py-0.5 ${isLightHex(x.hex) ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                      {x.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS PREVIEW */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coverage"
            title="What the press is saying about the Royal Pop."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.slice(0, 6).map((n) => (
              <NewsCard key={n.url} item={n} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/news"
              className="font-mono text-xs font-bold uppercase tracking-widest text-pop-red hover:underline"
            >
              Full news hub →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title={`Royal Pop ${c.name} — common questions.`} />
          <div className="mt-10">
            <FAQAccordion faqs={localFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-ink p-3">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/60">{label}</dt>
      <dd className="mt-1 font-display text-lg leading-none">{value}</dd>
    </div>
  );
}
