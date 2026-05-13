import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pop Strap Finder handles data, cookies, and analytics.",
  alternates: { canonical: "https://popstrapfinder.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Legal" title="Privacy policy." />
          <div className="prose prose-lg mt-10 max-w-none text-ink/90">
            <p>
              Last updated: May 19, 2026.
            </p>
            <h2>What we collect</h2>
            <p>
              We use Google Analytics 4 to understand site usage. GA4 sets a first-party
              cookie containing an anonymous identifier and records aggregate behaviour
              (page views, time on page, navigation paths). We do not use GA4's
              advertising features or remarketing audiences.
            </p>
            <p>
              When you fill in the contact form, we collect the information you provide
              (name, email, message) to reply. We do not add you to any mailing list and
              we don't share submissions with third parties.
            </p>
            <h2>Affiliate cookies</h2>
            <p>
              When you click an outbound link, the destination retailer (Amazon,
              AliExpress, eBay) may set their own cookies as part of their affiliate
              tracking. We have no control over those cookies — review the destination
              site's privacy policy.
            </p>
            <h2>Your rights</h2>
            <p>
              Under UK GDPR and CCPA you can request a copy of any personal data we hold
              about you, ask us to delete it, or opt out of analytics tracking.{" "}
              <a href="/contact" className="text-pop-red underline">Contact us</a> with
              any request and we'll respond within 30 days.
            </p>
            <h2>Children</h2>
            <p>
              This site is not directed at children under 13 and we do not knowingly
              collect data from anyone under that age.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
