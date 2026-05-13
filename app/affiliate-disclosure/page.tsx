import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How Pop Strap Finder earns money, our affiliate partnerships, and our commitment to non-sponsored editorial picks.",
  alternates: { canonical: "https://popstrapfinder.com/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Affiliate disclosure" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Disclosure" title="How we make money." />
          <div className="prose prose-lg mt-10 max-w-none text-ink/90">
            <p>
              Pop Strap Finder participates in affiliate programs, including the Amazon
              Associates program, the AliExpress affiliate program, and the eBay Partner
              Network. When you click an outbound link on this site and purchase a
              product, we may earn a small commission at no additional cost to you.
            </p>
            <p>
              Affiliate commissions are how we fund the site. They do <strong>not</strong>{" "}
              influence which products we recommend, which sellers we link to, or how we
              rank options. We have rejected paid placement offers from strap makers and
              do not run sponsored content.
            </p>
            <h2>What this means in practice</h2>
            <ul>
              <li>
                Every product we recommend is selected on merit. If we find a better
                option from a non-affiliate seller, we'll link there too — we just won't
                earn from the click.
              </li>
              <li>
                We disclose our affiliate relationship on every product link via the{" "}
                <code className="font-mono">rel="sponsored"</code> attribute, in line with
                FTC and ASA guidelines.
              </li>
              <li>
                Prices on linked retailers may change without notice. We update price
                ranges periodically but cannot guarantee accuracy at the moment of click.
              </li>
              <li>
                We have no business relationship with Swatch, Audemars Piguet, or the
                Royal Oak Pop project. The Royal Pop and Royal Oak names are trademarks
                of their respective owners, used here only nominatively to identify the
                product our straps fit.
              </li>
            </ul>
            <p>
              Questions? <a href="/contact" className="text-pop-red underline">Reach out</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
