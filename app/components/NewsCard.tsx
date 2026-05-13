import type { NewsItem } from "../lib/types";

const typeBadge: Record<NewsItem["type"], { label: string; cls: string }> = {
  article: { label: "Article", cls: "bg-pop-sky" },
  reddit: { label: "Reddit", cls: "bg-pop-orange" },
  youtube: { label: "Video", cls: "bg-pop-red text-paper" },
  press: { label: "Press", cls: "bg-pop-yellow" },
  review: { label: "Review", cls: "bg-pop-green" },
};

export default function NewsCard({ item }: { item: NewsItem }) {
  const b = typeBadge[item.type];
  return (
    <article className="popbox-tight bg-paper p-5">
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${b.cls}`}>
          {b.label}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
          {item.source}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg leading-tight">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="hover:text-pop-red"
        >
          {item.title}
        </a>
      </h3>
      {item.summary && (
        <p className="mt-2 text-sm text-ink/75">{item.summary}</p>
      )}
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/50">
        {new URL(item.url).hostname.replace(/^www\./, "")} ↗
      </p>
    </article>
  );
}
