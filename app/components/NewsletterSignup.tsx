"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "newsletter",
          email,
          website: "",
        }).toString(),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-pop-yellow">
        The Strap Brief
      </p>
      <p className="mt-1.5 text-sm text-paper/70">
        New straps, price drops, colorway intel. One short email when
        something is actually worth knowing.
      </p>

      {status === "success" ? (
        <p className="mt-3 border-[3px] border-pop-yellow px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-pop-yellow">
          You&apos;re in. Next brief lands when there&apos;s real news.
        </p>
      ) : (
        <>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            netlify-honeypot="website"
            onSubmit={onSubmit}
            className="mt-3 flex flex-col gap-2 sm:flex-row"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden" aria-hidden="true">
              <label>
                Leave this empty if you&apos;re human:{" "}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <label className="grow">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border-[3px] border-paper/40 bg-paper p-2.5 font-body text-sm text-ink outline-none focus:border-pop-yellow"
              />
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="border-[3px] border-pop-yellow bg-pop-yellow px-5 py-2.5 font-display text-sm uppercase tracking-wide text-ink hover:bg-paper hover:border-paper disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send it"}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-2 font-mono text-xs text-pop-red">
              Couldn&apos;t sign you up. Give it another go, or use the contact
              page.
            </p>
          )}
        </>
      )}
    </div>
  );
}
