"use client";

import { useState } from "react";
import { colorways } from "../data/colorways";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export default function WaitlistForm() {
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
      <div className="popbox bg-pop-yellow p-8">
        <h3 className="font-display text-3xl">You&apos;re on the list.</h3>
        <p className="mt-3 text-base">
          We&apos;ll email you the moment the first run is ready to order. No newsletter, no
          drip campaign, no algorithm. Just one message: &ldquo;they&apos;re here.&rdquo;
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="popbox-tight mt-6 bg-paper px-5 py-3 font-display text-base uppercase"
        >
          Add another email →
        </button>
      </div>
    );
  }

  return (
    <form
      name="originals-waitlist"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="originals-waitlist" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-xs font-bold uppercase tracking-widest"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
        />
      </div>

      <div>
        <label
          htmlFor="favorite_colorway"
          className="block font-mono text-xs font-bold uppercase tracking-widest"
        >
          Which Royal Pop do you own (or want)?
        </label>
        <select
          id="favorite_colorway"
          name="favorite_colorway"
          required
          className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
        >
          <option value="">Pick one</option>
          {colorways.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} — {c.colorLabel}
            </option>
          ))}
          <option value="multiple">More than one</option>
          <option value="undecided">Haven&apos;t decided yet</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="strap_type"
          className="block font-mono text-xs font-bold uppercase tracking-widest"
        >
          Which form factor are you voting for?
        </label>
        <select
          id="strap_type"
          name="strap_type"
          required
          className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
        >
          <option value="">Pick one</option>
          <option value="snap">The Snap — one-piece moulded rubber, $79</option>
          <option value="clip">The Clip — adapter + standard 22mm lug, swap any strap, $129</option>
          <option value="loop">The Loop — octagonal frame + pass-through NATO, $89</option>
          <option value="multiple">More than one</option>
          <option value="surprise">Surprise me — make what's best</option>
        </select>
        <p className="mt-2 text-xs text-ink/55">
          We&apos;re committing the first production run to whatever wins the most
          votes. Pick the one you&apos;d actually buy.
        </p>
      </div>

      <div>
        <label
          htmlFor="strap_notes"
          className="block font-mono text-xs font-bold uppercase tracking-widest"
        >
          Anything else? (Optional)
        </label>
        <input
          id="strap_notes"
          name="strap_notes"
          type="text"
          placeholder="Color, material, what you'd pay, anything"
          className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="popbox bg-pop-red px-6 py-4 font-display text-lg uppercase tracking-wide text-paper disabled:opacity-60"
      >
        {status === "submitting" ? "Adding you…" : "Get on the list →"}
      </button>

      {status === "error" && (
        <p className="popbox-tight bg-pop-red text-paper px-4 py-2 text-sm">
          Something broke — {errorMsg}. Try again or email speer.ra@gmail.com directly.
        </p>
      )}

      <p className="text-xs text-ink/60">
        One email. No spam, no newsletter, no resale. We use this to gauge demand
        before producing the first run.
      </p>
    </form>
  );
}
