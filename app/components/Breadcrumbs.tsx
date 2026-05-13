import Link from "next/link";
import Script from "next/script";
import { breadcrumbJsonLd } from "../lib/schema";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-widest">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink/60">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {it.href && !last ? (
                <Link href={it.href} className="hover:text-pop-red">
                  {it.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ink">
                  {it.name}
                </span>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(
              items.map((it) => ({
                name: it.name,
                url: it.href
                  ? `https://popstrapfinder.com${it.href}`
                  : `https://popstrapfinder.com`,
              }))
            )
          ),
        }}
      />
    </nav>
  );
}
