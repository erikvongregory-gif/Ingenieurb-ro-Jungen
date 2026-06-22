import { cn } from "@/lib/utils";

/**
 * Layout-Bausteine im Hero-Stil:
 * - <Section>        vertikaler Abschnitt mit großzügigem Spacing
 * - <Container>      zentrierte Breitenbegrenzung
 * - <Eyebrow>        kleine serif-kursive Auszeichnung (echo zur Hero-H1)
 * - <SectionHeading> große Sans-Überschrift (font wie Hero word2)
 */

export function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("relative w-full py-20 md:py-28", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const max =
    size === "narrow"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-6xl";
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", max, className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-serif italic text-base md:text-lg text-primary/90",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-sans font-extrabold tracking-tighter text-foreground text-3xl sm:text-4xl md:text-5xl leading-[1.05]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Glass-/Card-Container im Stil des sekundären Hero-Buttons.
 */
export function Card({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-b from-card/80 to-card ring-1 ring-border/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.25)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
