"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-b-[3px] border-ink bg-bone py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-pop-red">
          Something broke
        </p>
        <h1 className="mt-3 font-display text-7xl leading-[0.95] sm:text-9xl">
          STRAP
          <br />
          <span className="bg-pop-red px-2 text-paper">SNAPPED.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/75">
          We've logged this and will look into it. Try again, or head home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="popbox bg-ink px-6 py-4 font-display text-lg uppercase tracking-wide text-paper"
          >
            Try again
          </button>
          <Link
            href="/"
            className="popbox-tight bg-paper px-6 py-4 font-display text-lg uppercase"
          >
            Home →
          </Link>
        </div>
      </div>
    </section>
  );
}
