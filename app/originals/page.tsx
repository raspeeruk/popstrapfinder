import type { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import {
  formFactorMeta,
  originalsByFormFactor,
  type FormFactor,
} from "../data/originals";
import OriginalCard from "./OriginalCard";
import WaitlistForm from "./WaitlistForm";

export const metadata: Metadata = {
  title: "PopStrap Originals — Three ways to wear the Royal Pop",
  description:
    "Our own strap line for the Audemars Piguet × Swatch Royal Pop. Three form factors — Snap, Clip, and Loop — across all eight colorways. Join the waitlist for the first run.",
  alternates: { canonical: "https://popstrapfinder.com/originals" },
  openGraph: {
    title: "PopStrap Originals — three ways to wear the Royal Pop",
    description:
      "Snap, Clip, or Loop. Three form factors across the eight Royal Pop colorways.",
    url: "https://popstrapfinder.com/originals",
  },
};

const FORM_ORDER: FormFactor[] = ["snap", "clip", "loop"];

export default function Page() {
  const grouped = originalsByFormFactor();

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
            Coming soon · Three form factors · Eight colorways
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
            The Royal Pop is a pocket watch with a Royal Oak soul. We&apos;ve designed
            three different ways to wear it — chosen for how you actually live, not
            how every other brand styles its product photos.
          </p>
          <p className="mt-4 max-w-2xl text-base text-ink/70">
            We&apos;re not taking pre-orders yet. We&apos;re measuring demand first, then
            committing the first production run to the form factors and colorways that
            win the most votes. Join the list — one email when they&apos;re ready, nothing else.
          </p>
        </div>
      </section>

      {/* FORM FACTOR SECTIONS */}
      {FORM_ORDER.map((form) => {
        const meta = formFactorMeta[form];
        const items = grouped[form];
        if (items.length === 0) return null;

        return (
          <section
            key={form}
            className="border-b-[3px] border-ink py-16 odd:bg-paper even:bg-bone"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-4">
                  <SectionHeading eyebrow={`Form factor · ${meta.title}`} title={meta.tagline} />
                  <p className="mt-6 text-base leading-relaxed text-ink/80">
                    {meta.description}
                  </p>
                  <dl className="mt-6 space-y-3 font-mono text-[11px] uppercase tracking-widest">
                    <div>
                      <dt className="text-ink/50">Mechanic</dt>
                      <dd className="mt-1 text-ink">{meta.mechanic}</dd>
                    </div>
                    <div>
                      <dt className="text-ink/50">From</dt>
                      <dd className="mt-1 font-display text-2xl">${meta.priceUsd}</dd>
                    </div>
                  </dl>
                </div>
                <div className="md:col-span-8">
                  <div
                    className={`grid gap-6 ${items.length === 1 ? "sm:grid-cols-1" : items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
                  >
                    {items.map((o) => (
                      <OriginalCard key={o.colorwaySlug} o={o} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* WAITLIST */}
      <section className="border-b-[3px] border-ink bg-bone py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Waitlist" title="Be first when they drop." />
            <div className="mt-6 space-y-4 text-base text-ink/80">
              <p>
                First runs will be small — likely 50 to 100 of each form factor per
                colorway. Waitlist members get first pick.
              </p>
              <p>
                <strong>What you&apos;re signing up for:</strong> one email when the
                first run is ready to order. No newsletter, no drip.
              </p>
              <p>
                <strong>What this isn&apos;t:</strong> a pre-order. We&apos;re not
                taking payment yet — only when the straps physically exist and ship
                within a stated window.
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
