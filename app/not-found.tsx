import Link from "next/link";

export default function NotFound() {
  return (
    <section className="border-b-[3px] border-ink bg-bone py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-pop-red">
          Error 404
        </p>
        <h1 className="mt-3 font-display text-7xl leading-[0.95] sm:text-9xl">
          OUT OF
          <br />
          <span className="bg-pop-yellow px-2">STOCK.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/75">
          That page doesn't exist (or doesn't exist yet). Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="popbox bg-ink px-6 py-4 font-display text-lg uppercase tracking-wide text-paper"
          >
            Home →
          </Link>
          <Link
            href="/find"
            className="popbox-tight bg-paper px-6 py-4 font-display text-lg uppercase"
          >
            Strap finder →
          </Link>
          <Link
            href="/colors"
            className="popbox-tight bg-paper px-6 py-4 font-display text-lg uppercase"
          >
            All colorways →
          </Link>
        </div>
      </div>
    </section>
  );
}
