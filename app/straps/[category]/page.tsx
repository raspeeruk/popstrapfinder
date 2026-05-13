import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { strapCategories, categoryBySlug } from "../../data/strap-categories";
import { colorways } from "../../data/colorways";
import { generalFaqs, compatibilityFaqs } from "../../data/faqs";
import SectionHeading from "../../components/SectionHeading";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQAccordion from "../../components/FAQAccordion";
import { faqJsonLd } from "../../lib/schema";
import { isLightHex } from "../../lib/color";
import type { StrapCategorySlug } from "../../lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return strapCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug[category as StrapCategorySlug];
  if (!c) return {};
  return {
    title: `${c.title} for the Royal Pop — Curated Picks`,
    description: `${c.blurb} Compare ${c.title.toLowerCase()} for the Audemars Piguet × Swatch Royal Pop. ${c.priceRange}.`,
    alternates: { canonical: `https://popstrapfinder.com/straps/${c.slug}` },
  };
}

export default async function StrapCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = categoryBySlug[category as StrapCategorySlug];
  if (!c) notFound();

  const matchingColorways = colorways.filter((cw) => cw.pairsWith.includes(c.slug));
  const localFaqs = [
    {
      q: `What's the best ${c.title.toLowerCase().replace(" straps", "")} strap for the Royal Pop?`,
      a:
        c.longCopy +
        " For colorway-specific recommendations, see our dedicated colorway pages.",
    },
    ...compatibilityFaqs,
    ...generalFaqs.slice(0, 3),
  ];

  return (
    <>
      <Script
        id={`cat-faq-${c.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(localFaqs)) }}
      />

      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Straps", href: "/straps" },
              { name: c.title },
            ]}
          />
        </div>
      </section>

      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="inline-block bg-ink px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-pop-yellow">
                Strap category · {c.priceRange}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl">
                {c.title} for the
                <br />
                <span className="bg-pop-yellow px-2">Royal Pop.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink/80">{c.blurb}</p>
              <div className="mt-8 prose prose-lg max-w-2xl text-ink/90">
                <p>{c.longCopy}</p>
              </div>
            </div>
            <aside className="md:col-span-1">
              <div className="popbox-tight bg-paper p-6">
                <h3 className="font-display text-xl">Best for</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.bestFor.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-2 w-2 shrink-0 bg-pop-green" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="popbox-tight mt-4 bg-paper p-6">
                <h3 className="font-display text-xl">Watch out for</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.considerations.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-2 w-2 shrink-0 bg-pop-red" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MATCHING COLORWAYS */}
      <section className="border-b-[3px] border-ink bg-bone py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Pairings"
            title={`Colorways that wear ${c.title.toLowerCase()} well.`}
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {matchingColorways.map((cw) => (
              <Link
                key={cw.slug}
                href={`/colors/${cw.slug}`}
                className="popbox-tight bg-paper overflow-hidden p-0"
              >
                <div
                  className="halftone-light relative aspect-square"
                  style={{ background: cw.hex }}
                >
                  <div className="absolute inset-x-2 bottom-2 font-display text-sm">
                    <span className={`inline-block px-1.5 py-0.5 ${isLightHex(cw.hex) ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                      {cw.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title={`${c.title} — questions answered.`} />
          <div className="mt-10">
            <FAQAccordion faqs={localFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
