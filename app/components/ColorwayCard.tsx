import Image from "next/image";
import Link from "next/link";
import type { Colorway } from "../lib/types";
import { isLightHex } from "../lib/color";

export default function ColorwayCard({ c, size = "md" }: { c: Colorway; size?: "sm" | "md" | "lg" }) {
  const isLg = size === "lg";
  const isSm = size === "sm";
  const light = isLightHex(c.hex);
  const textOnCase = light ? "text-ink" : "text-paper";
  const chip = light ? "bg-ink text-paper" : "bg-paper text-ink";

  return (
    <Link
      href={`/colors/${c.slug}`}
      className="group block popbox bg-paper p-0 overflow-hidden"
      aria-label={`Straps for the Royal Pop ${c.name}`}
    >
      <div className={`relative ${isLg ? "aspect-[4/5]" : "aspect-square"}`}>
        {/* Pop colour base */}
        <div
          className="absolute inset-0"
          style={{ background: c.hex }}
          aria-hidden
        />
        {/* Halftone dot overlay */}
        <div className="absolute inset-0 halftone-light opacity-40 mix-blend-multiply" aria-hidden />
        {/* Accent octagon corner badge */}
        <div
          aria-hidden
          className="absolute right-3 top-3 h-10 w-10 octa"
          style={{ background: c.accentHex }}
        />
        {/* The watch press image — overlaid on the pop color */}
        <div className="absolute inset-x-[8%] top-[12%] bottom-[28%] flex items-center justify-center">
          <Image
            src={c.imageUrl}
            alt={`Royal Pop ${c.name} (${c.reference})`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain drop-shadow-[3px_4px_0_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        {/* Top chip strip */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <span className="bg-ink text-paper px-1.5 py-0.5">Royal Pop</span>
          <span className={`${chip} px-1.5 py-0.5`}>{c.reference}</span>
        </div>
        {/* Bottom label */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className={`font-mono text-[10px] uppercase tracking-widest ${textOnCase} opacity-80`}>
            {c.colorLabel}
          </p>
          <h3 className={`mt-1 font-display leading-none drop-shadow-[2px_2px_0_rgba(0,0,0,0.18)] ${isLg ? "text-4xl" : isSm ? "text-xl" : "text-2xl"} ${textOnCase}`}>
            {c.name.toUpperCase()}
          </h3>
        </div>
      </div>
      <div className="border-t-[3px] border-ink bg-paper p-4">
        <p className="text-sm font-medium leading-tight">
          {c.recommendedMaterials.slice(0, 2).join(" · ")}
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/60 group-hover:text-pop-red">
          Browse straps →
        </p>
      </div>
    </Link>
  );
}
