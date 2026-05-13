import type { Metadata } from "next";
import Finder from "./Finder";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";
import WaitlistBanner from "../components/WaitlistBanner";

export const metadata: Metadata = {
  title: "Strap Finder — Match the Right Strap to Your Royal Pop",
  description:
    "Answer four questions about your Audemars Piguet × Swatch Royal Pop and we'll match you to the right strap material, budget and seller.",
  alternates: { canonical: "https://popstrapfinder.com/find" },
};

export default function FindPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Strap Finder" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Four questions"
            title="Match your Royal Pop to the right strap."
            description="No email required. No account. We don't store your answers."
          />
          <div className="mt-10">
            <Finder />
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section className="border-b-[3px] border-ink bg-bone py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <WaitlistBanner
            source="find"
            eyebrow="Or wait for ours"
            title="We're designing our own straps too. Vote with your waitlist entry."
          />
        </div>
      </section>
    </>
  );
}
