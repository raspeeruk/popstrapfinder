"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = { "form-name": "contact" };
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
        <h3 className="font-display text-3xl">Sent. Cheers.</h3>
        <p className="mt-3 text-base">
          We&apos;ll reply within 48 hours. Check your spam folder if you don&apos;t see anything
          by then.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="popbox-tight mt-6 bg-paper px-5 py-3 font-display text-base uppercase"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="mt-10 space-y-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="What's this about?" name="subject" required />
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs font-bold uppercase tracking-widest"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="popbox bg-pop-red px-6 py-4 font-display text-lg uppercase tracking-wide text-paper disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send it →"}
      </button>
      {status === "error" && (
        <p className="popbox-tight bg-pop-red text-paper px-4 py-2 text-sm">
          Something broke — {errorMsg}. Try again or email speer.ra@gmail.com directly.
        </p>
      )}
      <p className="text-xs text-ink/60">
        We reply within 48 hours. Your email goes to a human, not a list.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-xs font-bold uppercase tracking-widest"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 block w-full border-[3px] border-ink bg-paper p-3 font-body text-base outline-none focus:bg-pop-yellow/10"
      />
    </div>
  );
}
