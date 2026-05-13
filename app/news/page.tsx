import type { Metadata } from "next";
import { newsItems } from "../data/news";
import NewsCard from "../components/NewsCard";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Royal Pop News & Reviews — Every Major Article in One Place",
  description:
    "The complete coverage hub for the Audemars Piguet × Swatch Royal Pop pocket watch. Reviews, launch coverage, Reddit threads, YouTube videos.",
  alternates: { canonical: "https://popstrapfinder.com/news" },
};

export default function NewsPage() {
  const byType = (t: typeof newsItems[number]["type"]) =>
    newsItems.filter((n) => n.type === t);

  const sections = [
    { title: "Launch coverage", items: byType("article") },
    { title: "Reviews", items: byType("review") },
    { title: "Press kit", items: byType("press") },
    { title: "Reddit threads", items: byType("reddit") },
    { title: "Video reviews", items: byType("youtube") },
  ].filter((s) => s.items.length > 0);

  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "News" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Coverage hub"
            title="Every Royal Pop article we've found."
            description="Read once, decide once. We update this page as new coverage and reviews land."
          />
          <div className="mt-16 space-y-16">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-3xl">{s.title}</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {s.items.map((n) => (
                    <NewsCard key={n.url} item={n} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
