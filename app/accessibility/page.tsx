import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Our commitment to making Pop Strap Finder usable for everyone.",
  alternates: { canonical: "https://popstrapfinder.com/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Accessibility" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Legal" title="Accessibility statement." />
          <div className="prose prose-lg mt-10 max-w-none text-ink/90">
            <p>
              Pop Strap Finder is designed to meet WCAG 2.1 Level AA. We test against
              that standard on every release.
            </p>
            <h2>What we do</h2>
            <ul>
              <li>Semantic HTML5 throughout — proper heading hierarchy, lists, and landmarks.</li>
              <li>Skip-to-content link for keyboard users.</li>
              <li>Focus indicators visible on every interactive element.</li>
              <li>Colour contrast meets or exceeds 4.5:1 for body text and 3:1 for large text.</li>
              <li>All non-decorative images have alt text.</li>
              <li>Forms have explicit labels and clear error messaging.</li>
              <li>Animation respects the <code className="font-mono">prefers-reduced-motion</code> setting.</li>
              <li>The site is fully usable via keyboard.</li>
            </ul>
            <h2>What we're working on</h2>
            <p>
              Pop Art visual design tests some contrast limits — we monitor it
              continuously. If you find a contrast or focus problem,{" "}
              <a href="/contact" className="text-pop-red underline">tell us</a> and we'll
              fix it within seven days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
