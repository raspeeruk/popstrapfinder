export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      {eyebrow && (
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-pop-red">
          {eyebrow}
        </p>
      )}
      <Heading className="mt-2 font-display text-4xl leading-[0.95] sm:text-5xl md:text-6xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base text-ink/75 sm:text-lg">{description}</p>
      )}
    </div>
  );
}
