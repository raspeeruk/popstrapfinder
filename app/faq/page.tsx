import type { Metadata } from "next";
import Script from "next/script";
import { generalFaqs, compatibilityFaqs } from "../data/faqs";
import FAQAccordion from "../components/FAQAccordion";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";
import { faqJsonLd } from "../lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Royal Pop Strap Compatibility, Sizing, and Care",
  description:
    "Frequently asked questions about straps for the Audemars Piguet × Swatch Royal Pop. Lug compatibility, water resistance, pocket-to-wrist conversion, and care.",
  alternates: { canonical: "https://popstrapfinder.com/faq" },
};

export default function FAQPage() {
  const all = [...generalFaqs, ...compatibilityFaqs];
  return (
    <>
      <Script
        id="faq-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(all)) }}
      />
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Royal Pop strap questions, answered." />
          <div className="mt-12">
            <h2 className="font-display text-3xl">General</h2>
            <div className="mt-6">
              <FAQAccordion faqs={generalFaqs} />
            </div>
          </div>
          <div className="mt-16">
            <h2 className="font-display text-3xl">Compatibility & fit</h2>
            <div className="mt-6">
              <FAQAccordion faqs={compatibilityFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
