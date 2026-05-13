import type { Metadata } from "next";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact — Get in touch with Pop Strap Finder",
  description:
    "Tell us about a strap we should review, an error to fix, or a question we haven't answered.",
  alternates: { canonical: "https://popstrapfinder.com/contact" },
};

export default function ContactPage() {
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
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-10 space-y-5"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field
              label="What's this about?"
              name="subject"
              required
            />
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs font-bold uppercase tracking-widest"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
              />
            </div>
            <button
              type="submit"
              className="popbox bg-pop-red px-6 py-4 font-display text-lg uppercase tracking-wide text-paper"
            >
              Send it →
            </button>
            <p className="text-xs text-ink/60">
              We reply within 48 hours. Your email goes to a human, not a list.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-xs font-bold uppercase tracking-widest"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
      />
    </div>
  );
}
