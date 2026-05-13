import type { StrapCategory } from "../lib/types";

export const strapCategories: StrapCategory[] = [
  {
    slug: "leather",
    title: "Leather Straps",
    blurb:
      "Tanned hide gives the Royal Pop the dress-watch energy its case shape always wanted. Italian calfskin, alligator-print, suede.",
    longCopy:
      "Leather is the natural counterpoint to Bioceramic. The Royal Pop's matte case picks up sheen from polished leather and warmth from suede — both work, neither dominates. We rank Italian-tanned vegetable calfskin highest for everyday wear, suede for autumn, and alligator-print for evening. Avoid cheap PU: the Royal Pop's lug attachment puts more stress on stitching than a normal watch does, and synthetic strapping splits faster.",
    priceRange: "$15 – $90",
    bestFor: ["Office", "Dinner", "Pairing with darker colorways"],
    considerations: [
      "Match leather tone to colorway, not to the dial",
      "Look for quick-release pins for swap-friendliness",
      "Choose padded options if you're wearing the Lépine on a wider wrist",
    ],
  },
  {
    slug: "rubber",
    title: "Rubber & FKM Straps",
    blurb:
      "Pool-ready, gym-ready, sweat-proof. FKM rubber sits closest to the Bioceramic's tactile character.",
    longCopy:
      "FKM (fluoroelastomer) is the strap material engineered for the Royal Pop. It tolerates chlorine and saltwater, holds colour, and matches the Bioceramic's matte hand feel. Generic silicone rubber is fine, but FKM is the sleeper upgrade. Colour-match to the case for the most dramatic look, or go transparent for a stealthy take.",
    priceRange: "$12 – $55",
    bestFor: ["Pool / beach", "Gym", "Bright colorways"],
    considerations: [
      "FKM is worth the premium over silicone",
      "Transparent rubber lets the case colour read through",
      "Avoid scented rubber — it degrades faster",
    ],
  },
  {
    slug: "metal",
    title: "Metal Bracelets",
    blurb:
      "Steel mesh, milanese, jubilee-style. The play that makes the Royal Pop look like a half-million-dollar Royal Oak.",
    longCopy:
      "A metal bracelet is the single biggest visual upgrade you can make to a Royal Pop. Milanese mesh is the easiest to source in 18-20mm widths and adjusts infinitely. Steel link bracelets in jubilee or oyster style look closest to the AP Royal Oak DNA the watch is referencing. Watch the weight — bracelet straps can outweigh the Bioceramic case 4:1.",
    priceRange: "$18 – $120",
    bestFor: ["Formal", "Mimicking the Royal Oak aesthetic", "White / navy colorways"],
    considerations: [
      "Check total weight; Bioceramic is light, bracelets can feel heavy",
      "Brushed > polished for daily wear",
      "Look for tool-free micro-adjust clasps",
    ],
  },
  {
    slug: "nato",
    title: "NATO & Perlon Straps",
    blurb:
      "Slip-through nylon and perlon. The cheapest way to own all eight colorways and still rotate straps daily.",
    longCopy:
      "NATOs are the budget hero of the strap world. At $8-20 each, they let you build a wardrobe of fifteen straps for the price of one mid-tier leather. The Royal Pop's pocket-watch heritage shows clearest on a striped seatbelt NATO — there's a militaristic, utilitarian honesty that suits Bioceramic. Perlon is softer, breathes better, and is harder to find in width-perfect 20mm sizing.",
    priceRange: "$6 – $35",
    bestFor: ["Summer", "Rotation collectors", "Lighter colorways"],
    considerations: [
      "Seatbelt-weave NATOs sit flatter than ribbon-weave",
      "Single-pass NATOs reduce stack height under cuff",
      "Perlon is hand-wash only",
    ],
  },
  {
    slug: "chain",
    title: "Chains & Pocket Chains",
    blurb:
      "Keep the Royal Pop as a pocket watch — and dress it like one. Albert chains, T-bars, double-Alberts.",
    longCopy:
      "The Royal Pop ships as a pocket watch and was designed to be worn as one. Period-correct accessories are Albert chains (single or double), T-bar fobs, and lanyards. Stainless steel is the safest match for the Bioceramic; gold-tone reads loud against the louder colorways (red, orange, yellow). For waistcoat wear, the double-Albert with a fob is unbeatable.",
    priceRange: "$15 – $200",
    bestFor: ["Pocket-watch wear", "Formal occasions", "Vintage styling"],
    considerations: [
      "Length matters: 12\" for waistcoat, 16\" for jacket",
      "T-bar should fit standard buttonhole",
      "Gold tones can clash with the brighter colorways",
    ],
  },
  {
    slug: "case",
    title: "Cases & Pouches",
    blurb:
      "Bioceramic scratches if you let it. A hard-shell case is the smartest $25 you'll spend on this watch.",
    longCopy:
      "Bioceramic looks indestructible. It isn't. Keys, coins, and other watches will mark it. The community consensus is that a microfibre-lined hard case is mandatory storage, especially if you're rotating between colorways. Travel cases that hold 2-4 watches are the next step up.",
    priceRange: "$12 – $80",
    bestFor: ["Daily storage", "Travel", "Multi-colorway collectors"],
    considerations: [
      "Microfibre lining is non-negotiable",
      "Hard shell > soft pouch for travel",
      "Multi-slot cases save shelf space",
    ],
  },
  {
    slug: "lanyard",
    title: "Lanyards & Cords",
    blurb:
      "Wear it around your neck, your bag strap, or your belt loop. Tactical-cord and braided leather options.",
    longCopy:
      "A lanyard is the most pocket-watch-faithful accessory. The Royal Pop has the right size and weight to be worn around the neck without becoming awkward. Look for cord with a quick-release for changing-room moments, and braided leather for any kind of formal context.",
    priceRange: "$8 – $50",
    bestFor: ["Street style", "Festivals", "Bag accessorising"],
    considerations: [
      "Quick-release clasps prevent strangulation hazard",
      "Match cord colour to case for monochrome looks",
      "Paracord is the most durable for outdoor wear",
    ],
  },
  {
    slug: "bundle",
    title: "Bundles & Starter Kits",
    blurb:
      "Strap + case + chain + tool. The smartest way to set yourself up for the first month of ownership.",
    longCopy:
      "Bundles save money and decision fatigue. A good Royal Pop starter bundle includes: one leather strap, one rubber strap, a hard case, a strap-change tool, and either a chain or lanyard. Expect to pay $50-90 for a curated bundle versus $90-130 if you bought the same items individually.",
    priceRange: "$45 – $180",
    bestFor: ["First-time owners", "Gifting", "Multi-colorway collectors"],
    considerations: [
      "Verify the strap-change tool is included",
      "Check material quality on each piece individually",
      "Single-colorway-matched bundles are best gifts",
    ],
  },
];

export const categoryBySlug = Object.fromEntries(
  strapCategories.map((c) => [c.slug, c])
) as Record<StrapCategory["slug"], StrapCategory>;
