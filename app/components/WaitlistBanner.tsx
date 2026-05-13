"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

const STRAP_TYPES = [
  { value: "snap", label: "The Snap — rubber, $79" },
  { value: "clip", label: "The Clip — universal lug, $129" },
  { value: "loop", label: "The Loop — NATO frame, $89" },
  { value: "multiple", label: "More than one" },
  { value: "surprise", label: "Surprise me" },
];

export default function WaitlistBanner({
  source,
  favoriteColorway,
  variant = "default",
  eyebrow,
  title,
}: {
  /** Page identifier so we can see which page drove the signup. */
  source: string;
  /** Pre-fill the favorite_colorway field (e.g. on a colorway page). */
  favoriteColorway?: string;
  variant?: "default" | "compact";
  eyebrow?: string;
  title?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = { "form-name": "originals-waitlist" };
    data.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
    });

    setStatus("submitting");
    setErrorMsg("");
    try {
      const r = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!r.ok) throw new Error(`Server responded ${r.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div className="popbox bg-pop-yellow p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/70">
          Vote logged
        </p>
        <h3 className="mt-1 font-display text-2xl sm:text-3xl">You&apos;re on the list.</h3>
        <p className="mt-2 text-sm sm:text-base">
          We&apos;ll email when the first run is ready. No newsletter, no drip.{" "}
          <Link href="/originals" className="underline">
            See the full lineup →
          </Link>
        </p>
      </div>
    );
  }

  const isCompact = variant === "compact";

  return (
    <div className={isCompact ? "popbox bg-paper p-5 sm:p-6" : "popbox bg-paper p-6 sm:p-8"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-pop-red">
            {eyebrow || "Help us pick what to make"}
          </p>
          <h3 className={`mt-1 font-display leading-tight ${isCompact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>
            {title || "We're making straps for the Royal Pop. Vote with your waitlist entry."}
          </h3>
        </div>
        <Link
          href="/originals"
          className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/60 hover:text-pop-red"
        >
          See all designs →
        </Link>
      </div>

      <form
        name="originals-waitlist"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className={isCompact ? "mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end" : "mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"}
      >
        <input type="hidden" name="form-name" value="originals-waitlist" />
        <input type="hidden" name="source" value={source} />
        {favoriteColorway && (
          <input type="hidden" name="favorite_colorway" value={favoriteColorway} />
        )}
        <p className="hidden">
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>

        <label className="block">
          <span className="block font-mono text-[10px] font-bold uppercase tracking-widest">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1.5 block w-full border-[3px] border-ink bg-paper p-2.5 font-body text-sm outline-none focus:bg-pop-yellow/10"
          />
        </label>

        <label className="block">
          <span className="block font-mono text-[10px] font-bold uppercase tracking-widest">
            Vote: which form factor?
          </span>
          <select
            name="strap_type"
            required
            defaultValue=""
            className="mt-1.5 block w-full border-[3px] border-ink bg-paper p-2.5 font-body text-sm outline-none focus:bg-pop-yellow/10"
          >
            <option value="" disabled>
              Pick one
            </option>
            {STRAP_TYPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="popbox-tight bg-pop-red px-5 py-3 font-display text-sm uppercase tracking-wide text-paper disabled:opacity-60 sm:self-end"
        >
          {status === "submitting" ? "Adding…" : "Get on the list →"}
        </button>
      </form>

      <p className="mt-3 text-xs text-ink/55">
        One email when the first run ships. No newsletter, no resale.
      </p>

      {status === "error" && (
        <p className="popbox-tight mt-3 bg-pop-red text-paper px-3 py-1.5 text-xs">
          Couldn&apos;t submit — {errorMsg}. Try{" "}
          <Link href="/originals" className="underline">
            the full form
          </Link>{" "}
          or email speer.ra@gmail.com.
        </p>
      )}
    </div>
  );
}
