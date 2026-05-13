import Link from "next/link";
import { colorways } from "../data/colorways";
import { strapCategories } from "../data/strap-categories";

export default function Footer() {
  return (
    <footer className="mt-24 border-t-[6px] border-ink bg-ink text-paper">
      <div className="slash-banner h-3" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-2xl text-paper">
              POP<span className="text-pop-yellow">STRAP</span>FINDER
            </Link>
            <p className="mt-3 text-sm text-paper/70">
              The independent guide to straps, cases and accessories for the
              Audemars Piguet × Swatch Royal Pop pocket watch.
            </p>
            <p className="mt-3 font-mono text-xs text-paper/50">
              No hype. No fluff. Just the strap.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg text-pop-yellow">Colorways</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {colorways.map((c) => (
                <li key={c.slug}>
                  <Link href={`/colors/${c.slug}`} className="hover:text-pop-yellow">
                    Royal Pop {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-pop-yellow">Strap Types</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {strapCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/straps/${c.slug}`} className="hover:text-pop-yellow">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-pop-yellow">The Site</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li><Link href="/about" className="hover:text-pop-yellow">About</Link></li>
              <li><Link href="/contact" className="hover:text-pop-yellow">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-pop-yellow">FAQ</Link></li>
              <li><Link href="/news" className="hover:text-pop-yellow">News & Reviews</Link></li>
              <li><Link href="/specs" className="hover:text-pop-yellow">Watch Specs</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-pop-yellow">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" className="hover:text-pop-yellow">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-pop-yellow">Terms</Link></li>
              <li><Link href="/accessibility" className="hover:text-pop-yellow">Accessibility</Link></li>
              <li><Link href="/sitemap" className="hover:text-pop-yellow">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Pop Strap Finder. Independent. Not affiliated with Swatch, Audemars Piguet, or the Royal Oak Pop project.</p>
          <p className="font-mono">v1.0 · built for the post-launch crowd</p>
        </div>
      </div>
    </footer>
  );
}
