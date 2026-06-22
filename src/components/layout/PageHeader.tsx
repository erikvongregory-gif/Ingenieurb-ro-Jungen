import { Container, Eyebrow, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Einheitlicher Seitenkopf für Unterseiten im Hero-Stil.
 * Enthält oben genügend Abstand, um den fixierten Glass-Header freizuhalten,
 * sowie einen dezenten Akzent-Verlauf als Echo zum Hero.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  as = "h1",
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary),transparent_60%)] opacity-[0.10]" />
      <Container className="pt-32 pb-12 md:pt-40 md:pb-16">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <SectionHeading as={as} className="mt-3 max-w-4xl">
          {title}
        </SectionHeading>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-foreground/70">
            {lead}
          </p>
        )}
      </Container>
    </div>
  );
}
