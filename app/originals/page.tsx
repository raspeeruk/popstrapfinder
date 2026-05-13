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
  title: "Three ways to wear the Royal Pop — vote with your signup",
  description:
    "We're designing our own straps for the Audemars Piguet × Swatch Royal Pop. Three form factors — Snap, Clip, and Loop — across all eight colorways. Vote with your waitlist signup.",
  alternates: { canonical: "https://popstrapfinder.com/originals" },
  openGraph: {
    title: "Three ways to wear the Royal Pop",
    description:
      "Snap, Clip, or Loop. Vote with your waitlist signup — we'll make whichever wins.",
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
            Vote with your signup · Three form factors · Eight colorways
          </p>
          <h1 className="mt-5 font-display text-[40px] leading-[0.95] sm:text-6xl md:text-7xl">
            Three ways
            <br />
            to wear the
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 px-2 bg-pop-yellow">Royal Pop.</span>
              <span aria-hidden className="absolute -inset-1 -z-0 translate-x-2 translate-y-2 bg-ink" />
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/80 sm:text-xl">
            The Royal Pop ships as a pocket watch. We&apos;ve sketched three different
            wrist-strap systems for it — each one a different mechanic, price, and audience.
          </p>
          <p className="mt-4 max-w-2xl text-base text-ink/70">
            We&apos;re not taking pre-orders. We&apos;re asking which one you&apos;d
            actually buy. We&apos;ll commit the first production run to whichever form
            factor wins the most signups. One email when it ships — that&apos;s it.
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
            <SectionHeading eyebrow="Cast your vote" title="Help us pick what to make first." />
            <div className="mt-6 space-y-4 text-base text-ink/80">
              <p>
                Three form factors, eight colorways. We can&apos;t do all 24 in the
                first run — so we&apos;re asking which one <em>you</em> would actually
                buy. We&apos;ll commit production to whichever form factor + colorway
                pairing wins the most signups.
              </p>
              <p>
                <strong>What you&apos;re signing up for:</strong> one email when the
                first run is ready to order. No newsletter, no drip, no resale.
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
