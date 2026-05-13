import type { Metadata } from "next";
import Link from "next/link";
import { colorways } from "../data/colorways";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Royal Pop Specs — Case Size, Movement, Clip Frame Attachment",
  description:
    "Full technical specifications for the Audemars Piguet × Swatch Royal Pop pocket watch: 40mm Bioceramic case, hand-wound SISTEM51 movement, 90-hour reserve, 2 ATM, and the proprietary clip-frame strap interface.",
  alternates: { canonical: "https://popstrapfinder.com/specs" },
};

const SPECS: { label: string; value: string; note?: string }[] = [
  { label: "Reference family", value: "SSX03", note: "Eight refs, SSX03G100N – SSX03W101N" },
  { label: "Format", value: "Pocket watch", note: "Convertible to wrist via aftermarket frames" },
  { label: "Configurations", value: "6 × Lépine, 2 × Savonnette", note: "Lépine: crown at 12. Savonnette: crown at 3, small seconds at 6." },
  { label: "Case diameter", value: "40.0mm", note: "Watch head, octagonal" },
  { label: "Case thickness", value: "8.4mm" },
  { label: "Dimensions with clip frame", value: "44.2 × 53.2 × 8.4mm" },
  { label: "Case material", value: "Bioceramic", note: "Swatch's proprietary ceramic + bioplastic composite" },
  { label: "Crystal", value: "Sapphire (front + back, AR-coated)" },
  { label: "Caseback", value: "Sapphire with Pop-Art print" },
  { label: "Bezel", value: "Octagonal with 8 visible hexagonal screws", note: "Vertical satin finish — Royal Oak signature" },
  { label: "Dial", value: "Petite Tapisserie, colorway-matched", note: "Royal Oak's signature stamped pattern" },
  { label: "Hands", value: "Bathtub-shaped, Super-LumiNova Grade A", note: "Royal Oak signature shape" },
  { label: "Movement", value: "Hand-wound SISTEM51", note: "Brand-new manual-wind version. 51 parts. Co-developed Nivachron anti-magnetic balance spring." },
  { label: "Frequency", value: "21,600 vph (3 Hz)" },
  { label: "Power reserve", value: "90+ hours" },
  { label: "Accuracy", value: "−5 / +15 sec/day" },
  { label: "Water resistance", value: "2 ATM / 20m", note: "Splash-proof only. Not for swimming." },
  { label: "Weight", value: "~28–35g (est.)", note: "Bioceramic 40mm — official figure not disclosed at launch" },
  { label: "Strap attachment", value: "Bioceramic clip frame", note: "No spring bars. Watch head clips into a colored frame with stitched calfskin lanyard." },
  { label: "Aftermarket strap channel", value: "20–22mm typical", note: "On the underside of aftermarket clip frames" },
  { label: "In the box", value: "Watch head, clip frame, attached lanyard, removable display stand" },
  { label: "Launch price", value: "$400 / $420", note: "Lépine / Savonnette" },
  { label: "EU / UK / AU price", value: "€385–400 / £335–355 / AUD 630+" },
  { label: "Launch date", value: "May 16, 2026" },
  { label: "Availability", value: "Swatch boutiques worldwide", note: "In-store only, 1 piece/person/store/day. No e-commerce at launch." },
];

export default function SpecsPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-bone py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Watch specs" }]} />
        </div>
      </section>
      <section className="border-b-[3px] border-ink py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Specs"
            title="The Royal Pop, by the numbers."
            description="Every measurement, material and detail you need before buying a strap, case or bracelet for the Audemars Piguet × Swatch Royal Pop."
          />

          <div className="mt-12 popbox-tight bg-pop-red text-paper p-6">
            <h2 className="font-display text-2xl">Critical for strap buyers</h2>
            <p className="mt-3 text-sm leading-relaxed">
              The Royal Pop has <strong>no traditional lugs and no spring bars</strong>.
              The 40mm watch head clips into a coloured Bioceramic <em>frame</em>; the
              frame carries the strap (or lanyard) on its underside. Every aftermarket
              wrist conversion is really a <strong>replacement frame</strong> that
              wraps the case head and exposes a 20–22mm spring-bar interface on the
              outside. Generic 20mm watch straps won't attach to the watch directly —
              they need to mount to a compatible frame first.
            </p>
          </div>

          <div className="mt-8 popbox bg-paper">
            <dl className="divide-y-[3px] divide-ink">
              {SPECS.map((s) => (
                <div key={s.label} className="grid gap-3 px-6 py-5 sm:grid-cols-3">
                  <dt className="font-mono text-xs uppercase tracking-widest text-ink/60">
                    {s.label}
                  </dt>
                  <dd className="sm:col-span-2">
                    <p className="font-display text-2xl leading-none">{s.value}</p>
                    {s.note && <p className="mt-1 text-sm text-ink/70">{s.note}</p>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-3xl">Per-colorway references</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {colorways.map((c) => (
                <Link
                  key={c.slug}
                  href={`/colors/${c.slug}`}
                  className="popbox-tight bg-paper p-4 flex items-center justify-between gap-4 hover:bg-pop-yellow"
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="block h-8 w-8 octa border-2 border-ink"
                      style={{ background: c.hex }}
                    />
                    <div>
                      <p className="font-display text-lg leading-none">{c.name}</p>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-ink/60">
                        {c.reference} · {c.configurations.join(" / ")} · ${c.priceUsd}
                      </p>
                    </div>
                  </div>
                  <span aria-hidden className="font-display text-2xl">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
