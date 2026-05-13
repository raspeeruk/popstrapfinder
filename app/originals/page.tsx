import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { originals } from "../data/originals";
import OriginalCard from "./OriginalCard";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "PopStrap Originals — Eight straps designed for the Royal Pop",
  description:
    "Our own strap line for the Audemars Piguet × Swatch Royal Pop. Eight designs, one per colorway. Join the waitlist to be first when the first run drops.",
  alternates: { canonical: "https://popstrapfinder.com/originals" },
  openGraph: {
    title: "PopStrap Originals — straps designed for the Royal Pop",
    description:
      "Eight straps, one per Royal Pop colorway. Join the waitlist to be first when the first run drops.",
    url: "https://popstrapfinder.com/originals",
  },
};

export default function Page() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Originals" }]} />
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 halftone opacity-[0.06]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="inline-block bg-ink px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest text-pop-yellow">
            Coming soon · Eight designs · One per colorway
          </p>
          <h1 className="mt-5 font-display text-[40px] leading-[0.95] sm:text-6xl md:text-7xl">
            PopStrap
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 px-2 bg-pop-yellow">Originals.</span>
              <span aria-hidden className="absolute -inset-1 -z-0 translate-x-2 translate-y-2 bg-ink" />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/80 sm:text-xl">
            After comparing 60+ third-party straps for the Royal Pop, we kept hitting
            the same problem: none were designed <em>for the watch</em>. So we&apos;re
            making our own. Eight straps. One per colorway. Designed in-house, built
            to fit the standard wrist adapter.
          </p>
          <p className="mt-4 max-w-2xl text-base text-ink/70">
            We&apos;re not taking pre-orders yet. We&apos;re measuring demand first, then
            committing the first production run to the colorways that win the most
            votes. Join the list — one email when they&apos;re ready, nothing else.
          </p>
        </div>
      </section>

      {/* THE EIGHT */}
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Eight"
            title="One design per Royal Pop."
            description="Each strap is tuned to a single colorway — material, hardware, and stitching chosen to make that watch look like itself, only more."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {originals.map((o) => (
              <OriginalCard key={o.colorwaySlug} o={o} />
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-ink/60">
            Mockups shown are early design concepts. Final materials, colors, and
            hardware may change based on production trials. Estimated prices are a
            target — final prices will be locked once supplier contracts close.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="border-b-[3px] border-ink bg-bone py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Waitlist" title="Be first when they drop." />
            <div className="mt-6 space-y-4 text-base text-ink/80">
              <p>
                We&apos;re building the first run small — likely 50 to 100 straps per
                colorway. Waitlist members get first pick, before any public launch.
              </p>
              <p>
                <strong>What you&apos;re signing up for:</strong> one email when the
                first run is ready to order. Nothing else. No newsletter. No
                drip campaign.
              </p>
              <p>
                <strong>What this isn&apos;t:</strong> a pre-order. We&apos;re not
                taking payment yet. We&apos;ll only ask for money once the straps
                physically exist and ship within a stated window.
              </p>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="popbox bg-paper p-6 sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
