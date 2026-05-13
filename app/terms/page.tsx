import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of Pop Strap Finder.",
  alternates: { canonical: "https://popstrapfinder.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Legal" title="Terms of service." />
          <div className="prose prose-lg mt-10 max-w-none text-ink/90">
            <p>Last updated: May 19, 2026.</p>
            <h2>The site</h2>
            <p>
              Pop Strap Finder is a free editorial resource. We make no representation
              that any product listed will fit, function, or arrive as described. All
              purchases happen on third-party retailer sites and are governed by those
              retailers' terms.
            </p>
            <h2>Editorial content</h2>
            <p>
              Reviews, ratings and recommendations represent our opinion at time of
              writing. Specifications change. Sellers come and go. Price ranges are
              approximate and may not reflect current pricing on linked retailers.
            </p>
            <h2>Trademarks</h2>
            <p>
              &quot;Audemars Piguet,&quot; &quot;Swatch,&quot; &quot;Royal Oak,&quot;
              &quot;Royal Pop&quot; and related marks are property of their respective
              owners. We use them here in their nominative sense to identify the watch
              our covered products fit. We have no affiliation with the trademark
              holders.
            </p>
            <h2>Limitation of liability</h2>
            <p>
              We provide content as-is. We're not liable for losses, damages, fit issues,
              or any consequence of acting on information you found here. Always confirm
              compatibility with the retailer before purchase.
            </p>
            <h2>Changes</h2>
            <p>
              We may update these terms periodically. Continued use of the site after
              changes constitutes acceptance.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
