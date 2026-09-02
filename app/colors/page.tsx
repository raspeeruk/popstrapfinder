import type { Metadata } from "next";
import Link from "next/link";
import { colorways } from "../data/colorways";
import ColorwayCard from "../components/ColorwayCard";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "All 8 Royal Pop Colorways — Strap Recommendations",
  description:
    "Browse every Audemars Piguet × Swatch Royal Pop colorway: white, pink, green, orange, yellow, red, light blue, and navy. Curated strap picks for each.",
  alternates: { canonical: "https://popstrapfinder.com/colors" },
};

export default function ColorsIndex() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Colorways" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Eight cases"
            title="Every Royal Pop colorway."
            description="Each of the eight colorways has its own strap personality. Some are flexible. Some demand specific materials. We've made a page for each."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {colorways.map((c) => (
              <ColorwayCard key={c.slug} c={c} size="lg" />
            ))}
          </div>
          <p className="mt-12 max-w-3xl text-sm text-ink/70">
            Don't know which colorway you'll end up with?{" "}
            <Link href="/find" className="font-bold text-pop-red underline">
              Run the strap finder
            </Link>{" "}
            — it works for owners and aspirants alike.
          </p>
        </div>
      </section>
    </>
  );
}
