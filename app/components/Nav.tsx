import Link from "next/link";

const NAV = [
  { href: "/colors", label: "Colorways" },
  { href: "/straps", label: "Straps" },
  { href: "/find", label: "Find" },
  { href: "/originals", label: "Originals" },
  { href: "/news", label: "News" },
  { href: "/specs", label: "Watch Specs" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Pop Strap Finder home">
          <span aria-hidden className="grid h-10 w-10 place-items-center bg-ink octa">
            <span className="grid h-6 w-6 place-items-center bg-pop-yellow octa">
              <span className="block h-2 w-2 rounded-full bg-ink" />
            </span>
          </span>
          <span className="font-display text-xl leading-none">
            POP<span className="text-pop-red">STRAP</span>FINDER
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="block px-3 py-2 text-sm font-bold uppercase tracking-wide hover:bg-pop-yellow"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/find"
          className="popbox-tight bg-pop-yellow text-ink px-3 py-2 text-sm font-bold uppercase tracking-wide hover:bg-pop-red hover:text-paper md:px-4 md:py-2.5"
        >
          Find my strap →
        </Link>
      </div>
      <div className="border-t border-ink/15 md:hidden">
        <ul className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-2 text-xs font-bold uppercase">
          {NAV.map((n) => (
            <li key={n.href} className="whitespace-nowrap">
              <Link href={n.href} className="px-2 py-1 hover:bg-pop-yellow">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
