import Link from "next/link";
import type { StrapCategory } from "../lib/types";

const accent: Record<StrapCategory["slug"], string> = {
  leather: "bg-pop-orange",
  rubber: "bg-pop-sky",
  metal: "bg-pop-yellow",
  nato: "bg-pop-green",
  chain: "bg-pop-pink",
  case: "bg-pop-navy text-paper",
  lanyard: "bg-pop-red text-paper",
  bundle: "bg-pop-white",
};

export default function StrapCategoryCard({ c }: { c: StrapCategory }) {
  return (
    <Link
      href={`/straps/${c.slug}`}
      className="group block popbox p-0 overflow-hidden"
      aria-label={c.title}
    >
      <div className={`relative ${accent[c.slug]} p-6 min-h-[140px]`}>
        <div className="absolute inset-0 halftone-light opacity-50 mix-blend-multiply" aria-hidden />
        <h3 className="relative font-display text-3xl leading-none">{c.title}</h3>
        <p className="relative mt-2 font-mono text-[11px] uppercase tracking-widest">
          {c.priceRange}
        </p>
      </div>
      <div className="border-t-[3px] border-ink p-5">
        <p className="text-sm">{c.blurb}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink/60 group-hover:text-pop-red">
          Compare picks →
        </p>
      </div>
    </Link>
  );
}
