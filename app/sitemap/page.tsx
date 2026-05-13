import type { Metadata } from "next";
import Link from "next/link";
import { colorways } from "../data/colorways";
import { strapCategories } from "../data/strap-categories";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sitemap — Every Page on Pop Strap Finder",
  description: "HTML sitemap for Pop Strap Finder.",
  alternates: { canonical: "https://popstrapfinder.com/sitemap" },
};

export default function SitemapPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Sitemap" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Sitemap" title="Every page on the site." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <Group title="Core">
              <Item href="/">Home</Item>
              <Item href="/find">Strap finder</Item>
              <Item href="/specs">Watch specs</Item>
              <Item href="/news">News & reviews</Item>
              <Item href="/faq">FAQ</Item>
              <Item href="/about">About</Item>
              <Item href="/contact">Contact</Item>
            </Group>
            <Group title="Colorways">
              <Item href="/colors">All colorways</Item>
              {colorways.map((c) => (
                <Item key={c.slug} href={`/colors/${c.slug}`}>
                  Royal Pop {c.name}
                </Item>
              ))}
            </Group>
            <Group title="Strap categories">
              <Item href="/straps">All categories</Item>
              {strapCategories.map((c) => (
                <Item key={c.slug} href={`/straps/${c.slug}`}>
                  {c.title}
                </Item>
              ))}
            </Group>
            <Group title="Legal">
              <Item href="/privacy">Privacy</Item>
              <Item href="/terms">Terms</Item>
              <Item href="/affiliate-disclosure">Affiliate disclosure</Item>
              <Item href="/accessibility">Accessibility</Item>
            </Group>
          </div>
        </div>
      </section>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm">{children}</ul>
    </div>
  );
}

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink hover:text-pop-red hover:underline">
        {children}
      </Link>
    </li>
  );
}
