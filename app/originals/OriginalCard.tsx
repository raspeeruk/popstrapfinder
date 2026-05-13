import Image from "next/image";
import type { StrapOriginal } from "../data/originals";
import { formFactorMeta } from "../data/originals";
import { colorwayBySlug } from "../data/colorways";
import { isLightHex } from "../lib/color";

export default function OriginalCard({ o }: { o: StrapOriginal }) {
  const colorway = colorwayBySlug[o.colorwaySlug];
  const lightStrap = isLightHex(o.strapHex);
  const strapText = lightStrap ? "text-ink" : "text-paper";
  const form = formFactorMeta[o.formFactor];

  return (
    <article className="popbox bg-paper p-0 overflow-hidden">
      <div className="relative aspect-[4/5]">
        {o.hasMockup ? (
          <Image
            src={`/images/mockups/${o.colorwaySlug}.png`}
            alt={`PopStrap Originals — ${o.strapName} for the Royal Pop ${colorway.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <PlaceholderArt
            strapHex={o.strapHex}
            accentHex={o.accentHex}
            caseHex={colorway.hex}
            strapName={o.strapName}
            strapText={strapText}
          />
        )}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="bg-ink text-paper px-1.5 py-0.5">{form.title}</span>
          <span className="bg-pop-yellow text-ink px-1.5 py-0.5">Coming soon</span>
        </div>
      </div>
      <div className="border-t-[3px] border-ink bg-paper p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink/60">
          For the {colorway.name} · {colorway.colorLabel}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-none">{o.strapName}</h3>
        <p className="mt-2 text-sm leading-snug text-ink/80">{o.pitch}</p>
        <dl className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
          <div>
            <dt className="text-ink/50">Material</dt>
            <dd className="mt-0.5 text-ink">{o.material}</dd>
          </div>
          <div className="text-right">
            <dt className="text-ink/50">Est. price</dt>
            <dd className="mt-0.5 text-ink">${o.estPriceUsd}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function PlaceholderArt({
  strapHex,
  accentHex,
  caseHex,
  strapName,
  strapText,
}: {
  strapHex: string;
  accentHex: string;
  caseHex: string;
  strapName: string;
  strapText: string;
}) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: caseHex }}
      aria-hidden
    >
      <div className="absolute inset-0 halftone-light opacity-30 mix-blend-multiply" />
      {/* Strap silhouette — vertical band */}
      <div
        className="absolute left-1/2 top-0 h-full w-[34%] -translate-x-1/2"
        style={{ background: strapHex }}
      />
      {/* Accent stitching lines */}
      <div
        className="absolute left-1/2 top-0 h-full w-[34%] -translate-x-1/2 border-l-[3px] border-r-[3px]"
        style={{ borderColor: accentHex }}
      />
      {/* Watch case octagon */}
      <div
        className="relative octa flex items-center justify-center"
        style={{
          background: caseHex,
          width: "46%",
          height: "46%",
          boxShadow: "4px 4px 0 0 #0A0A0A",
          border: "3px solid #0A0A0A",
        }}
      >
        <div
          className="octa flex items-center justify-center"
          style={{
            background: accentHex,
            width: "62%",
            height: "62%",
          }}
        >
          <span className={`font-display text-xs uppercase ${strapText}`}>
            {strapName.replace(/^The /, "")}
          </span>
        </div>
      </div>
    </div>
  );
}
