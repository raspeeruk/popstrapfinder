import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About — The Independent Royal Pop Strap Guide",
  description:
    "Why we exist, how we pick, and how we make money. Pop Strap Finder is an independent affiliate site for Royal Pop accessories.",
  alternates: { canonical: "https://popstrapfinder.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Built by collectors. For the post-hype crowd."
          />
          <div className="prose prose-lg mt-10 max-w-none text-ink/90">
            <p>
              Pop Strap Finder is an independent reference for owners and aspirants of
              the Audemars Piguet × Swatch Royal Oak Pop. We're not the manufacturer.
              We're not a Swatch retailer. We're a small editorial team that thinks the
              most interesting thing about the Royal Pop is what you do with it after
              you've bought it.
            </p>
            <h2>How we pick</h2>
            <p>
              Every strap, case, chain and bracelet on this site is evaluated against
              the Royal Pop's actual hardware — 40mm Bioceramic case, 8.4mm thickness,
              proprietary lug attachment, 3 ATM resistance. We weight material quality,
              fit accuracy, value at the price point, and the noise we hear from
              r/Watches and r/Swatch.
            </p>
            <h2>How we make money</h2>
            <p>
              Affiliate commissions. When you click out to a seller and buy something,
              we earn a small commission at no extra cost to you. We never accept
              payment for placement, never write sponsored reviews, and never let
              advertisers influence our ranking. See our{" "}
              <Link href="/affiliate-disclosure" className="text-pop-red underline">
                full affiliate disclosure
              </Link>
              .
            </p>
            <h2>What we don't do</h2>
            <ul>
              <li>We don't sell straps ourselves (yet).</li>
              <li>We don't take sponsored placements.</li>
              <li>We don't pretend to be neutral when we have an opinion — we just tell you the opinion.</li>
              <li>We don't claim affiliation with Swatch, Audemars Piguet, or the Royal Oak Pop project.</li>
            </ul>
            <h2>Get in touch</h2>
            <p>
              Found a strap we should be reviewing? Spotted an error? Want to tell us
              the navy is overrated? <Link href="/contact" className="text-pop-red underline">Send us a note</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
