import type { Metadata } from "next";
import { strapCategories } from "../data/strap-categories";
import StrapCategoryCard from "../components/StrapCategoryCard";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Strap Categories — Every Style for the Royal Pop",
  description:
    "Leather, FKM rubber, metal mesh, NATO, chains, cases, lanyards and bundles. Eight strap categories curated for the Audemars Piguet × Swatch Royal Pop pocket watch.",
  alternates: { canonical: "https://popstrapfinder.com/straps" },
};

export default function StrapsIndex() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Straps" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The strap library"
            title="Every category, ranked."
            description="From $8 NATOs to $200 double-Albert chains — eight strap categories chosen for the Royal Pop's lug system and Bioceramic case."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strapCategories.map((c) => (
              <StrapCategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
