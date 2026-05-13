"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { colorways } from "../data/colorways";
import { strapCategories, categoryBySlug } from "../data/strap-categories";
import { trackFinderComplete } from "../lib/analytics";
import { isLightHex } from "../lib/color";
import type { ColorwaySlug, StrapCategorySlug } from "../lib/types";

type Occasion = "everyday" | "formal" | "active" | "pocket";
type Budget = "under-25" | "25-60" | "60-150" | "150-plus";

const occasionOptions: { value: Occasion; label: string; blurb: string }[] = [
  { value: "everyday", label: "Daily wear", blurb: "Office, errands, dinner. The do-it-all option." },
  { value: "formal", label: "Formal", blurb: "Suit, evening, ceremony. Sharp edges." },
  { value: "active", label: "Active", blurb: "Gym, pool, beach. Sweat-proof and durable." },
  { value: "pocket", label: "Keep as pocket", blurb: "No conversion — Albert chain, fob, lanyard." },
];

const budgetOptions: { value: Budget; label: string }[] = [
  { value: "under-25", label: "Under $25" },
  { value: "25-60", label: "$25 – $60" },
  { value: "60-150", label: "$60 – $150" },
  { value: "150-plus", label: "$150+" },
];

function recommend(
  colorway: ColorwaySlug,
  occasion: Occasion,
  budget: Budget
): StrapCategorySlug[] {
  if (occasion === "pocket") return ["chain", "lanyard", "case"];
  if (occasion === "active") {
    if (budget === "under-25") return ["rubber", "nato", "case"];
    return ["rubber", "metal", "case"];
  }
  if (occasion === "formal") {
    if (budget === "150-plus") return ["metal", "leather", "chain"];
    return ["leather", "metal", "chain"];
  }
  // everyday
  if (budget === "under-25") return ["nato", "rubber", "leather"];
  if (budget === "25-60") return ["leather", "nato", "rubber"];
  if (budget === "60-150") return ["leather", "metal", "rubber"];
  return ["metal", "leather", "bundle"];
}

export default function Finder() {
  const [step, setStep] = useState(0);
  const [colorway, setColorway] = useState<ColorwaySlug | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [material, setMaterial] = useState<"any" | StrapCategorySlug>("any");
  const [budget, setBudget] = useState<Budget | null>(null);

  const canShowResult = colorway && occasion && budget;
  const result = useMemo(() => {
    if (!canShowResult) return null;
    let picks = recommend(colorway!, occasion!, budget!);
    if (material !== "any") {
      picks = [material, ...picks.filter((p) => p !== material)].slice(0, 3);
    }
    return picks.map((slug) => categoryBySlug[slug]);
  }, [colorway, occasion, budget, material, canShowResult]);

  const colorwayObj = colorway ? colorways.find((c) => c.slug === colorway) : null;

  function next() {
    setStep((s) => Math.min(s + 1, 4));
    if (step === 3 && colorway && occasion && budget) {
      trackFinderComplete({
        colorway,
        material,
        occasion,
      });
    }
  }

  function reset() {
    setStep(0);
    setColorway(null);
    setOccasion(null);
    setMaterial("any");
    setBudget(null);
  }

  return (
    <div className="popbox bg-paper p-6 sm:p-10">
      {step < 4 && (
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              aria-hidden
              className={`h-2 flex-1 ${i <= step ? "bg-pop-red" : "bg-ink/10"}`}
            />
          ))}
          <span>Step {step + 1} of 4</span>
        </div>
      )}

      {step === 0 && (
        <Question title="Which colorway are you working with?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {colorways.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  setColorway(c.slug);
                  setTimeout(next, 200);
                }}
                aria-pressed={colorway === c.slug}
                className={`popbox-tight overflow-hidden p-0 text-left ${colorway === c.slug ? "ring-4 ring-pop-yellow" : ""}`}
              >
                <div
                  className="relative aspect-square halftone-light"
                  style={{ background: c.hex }}
                >
                  <div className="absolute inset-x-2 bottom-2 font-display text-sm">
                    <span className={`inline-block px-1.5 py-0.5 ${isLightHex(c.hex) ? "bg-ink text-paper" : "bg-paper text-ink"}`}>
                      {c.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Don't own one yet? Pick the colorway you're most likely to buy.
          </p>
        </Question>
      )}

      {step === 1 && (
        <Question title="How will you wear it?">
          <div className="grid gap-3 sm:grid-cols-2">
            {occasionOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  setOccasion(o.value);
                  setTimeout(next, 200);
                }}
                aria-pressed={occasion === o.value}
                className={`popbox-tight bg-paper p-5 text-left hover:bg-pop-yellow ${occasion === o.value ? "ring-4 ring-pop-yellow" : ""}`}
              >
                <p className="font-display text-2xl">{o.label}</p>
                <p className="mt-2 text-sm text-ink/70">{o.blurb}</p>
              </button>
            ))}
          </div>
        </Question>
      )}

      {step === 2 && (
        <Question title="Any material preference?">
          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setMaterial("any");
                setTimeout(next, 200);
              }}
              aria-pressed={material === "any"}
              className={`popbox-tight bg-paper p-5 text-left hover:bg-pop-yellow ${material === "any" ? "ring-4 ring-pop-yellow" : ""}`}
            >
              <p className="font-display text-xl">Surprise me</p>
              <p className="mt-2 text-sm text-ink/70">Show the top match regardless.</p>
            </button>
            {strapCategories
              .filter((c) => c.slug !== "case" && c.slug !== "bundle")
              .map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    setMaterial(c.slug);
                    setTimeout(next, 200);
                  }}
                  aria-pressed={material === c.slug}
                  className={`popbox-tight bg-paper p-5 text-left hover:bg-pop-yellow ${material === c.slug ? "ring-4 ring-pop-yellow" : ""}`}
                >
                  <p className="font-display text-xl">{c.title.replace(" Straps", "")}</p>
                  <p className="mt-2 text-sm text-ink/70">{c.priceRange}</p>
                </button>
              ))}
          </div>
        </Question>
      )}

      {step === 3 && (
        <Question title="What's your budget?">
          <div className="grid gap-3 sm:grid-cols-2">
            {budgetOptions.map((b) => (
              <button
                key={b.value}
                type="button"
                onClick={() => {
                  setBudget(b.value);
                  setTimeout(next, 200);
                }}
                aria-pressed={budget === b.value}
                className={`popbox-tight bg-paper p-5 text-left hover:bg-pop-yellow ${budget === b.value ? "ring-4 ring-pop-yellow" : ""}`}
              >
                <p className="font-display text-3xl">{b.label}</p>
              </button>
            ))}
          </div>
        </Question>
      )}

      {step === 4 && result && colorwayObj && (
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-pop-red">
            Your match
          </p>
          <h3 className="mt-2 font-display text-4xl leading-[0.95] sm:text-5xl">
            For your {colorwayObj.name} Royal Pop:
          </h3>
          <div className="mt-8 space-y-4">
            {result.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/straps/${cat.slug}`}
                className="popbox flex items-center justify-between gap-4 p-5 hover:bg-pop-yellow"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-pop-red">
                    {i === 0 ? "Top pick" : `Alternative ${i}`}
                  </p>
                  <p className="font-display text-2xl">{cat.title}</p>
                  <p className="mt-1 text-sm text-ink/70">{cat.blurb}</p>
                </div>
                <span aria-hidden className="font-display text-3xl">→</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/colors/${colorwayObj.slug}`}
              className="popbox-tight bg-paper px-5 py-3 font-display text-base uppercase"
            >
              See all {colorwayObj.name} picks →
            </Link>
            <button
              type="button"
              onClick={reset}
              className="popbox-tight bg-paper px-5 py-3 font-display text-base uppercase"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-3xl leading-[0.95] sm:text-4xl">{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}
