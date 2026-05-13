import type { FAQ } from "../lib/types";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details
          key={i}
          className="popbox-tight group p-0 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display text-lg leading-tight">
            <span>{f.q}</span>
            <span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center bg-pop-yellow font-mono text-xl transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-ink/15 px-5 py-4 text-sm leading-relaxed text-ink/80">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}
