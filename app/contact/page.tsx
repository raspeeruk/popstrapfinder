import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Get in touch with Pop Strap Finder",
  description:
    "Tell us about a strap we should review, an error to fix, or a question we haven't answered.",
  alternates: { canonical: "https://popstrapfinder.com/contact" },
};

export default function Page() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Contact" title="Drop us a line." />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
