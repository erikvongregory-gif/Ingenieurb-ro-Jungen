import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getPerson } from "@/content/team";
import { Section, Container, Eyebrow, SectionHeading, Card } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { LinkedInButton } from "@/components/ui/linkedin-button";
import { Reveal } from "@/components/ui/reveal";
import type { Locale } from "@/i18n/routing";

const { name, image, linkedin } = siteConfig.responsiblePerson;

/**
 * Große "Ihr Ansprechpartner"-Sektion für die Startseite:
 * Porträt + Vorstellungstext + CTA im dunklen Glass-Look.
 */
export function PersonSection({ locale }: { locale: Locale }) {
  const p = getPerson(locale);
  return (
    <Section className="border-t border-border/40">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14">
          <Reveal className="group relative mx-auto md:mx-0">
            <div className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,var(--primary),transparent_70%)] opacity-20 transition-opacity duration-500 group-hover:opacity-40" />
            <Image
              src={image}
              alt={`${name} – ${p.role}, ${siteConfig.name}`}
              width={288}
              height={288}
              sizes="(max-width: 768px) 220px, 288px"
              className="h-auto w-full max-w-[16rem] rounded-3xl border border-border/60 object-cover grayscale ring-1 ring-white/10 transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.02] md:max-w-none"
              priority={false}
            />
          </Reveal>

          <Reveal delay={140}>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3">{p.heading}</SectionHeading>
            <div className="mt-3 flex flex-col">
              <span className="font-sans font-bold tracking-tight text-foreground text-lg">
                {name}
              </span>
              <span className="text-sm text-primary/90">{p.role}</span>
            </div>
            <div className="mt-6 flex flex-col gap-4">
              {p.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm md:text-base font-light leading-relaxed text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/kontakt" withArrow>
                {p.ctaLabel}
              </ButtonLink>
              {linkedin && (
                <LinkedInButton href={linkedin} label={p.linkedinLabel} />
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Kompakte Ansprechpartner-Card (z. B. für die Kontaktseite).
 */
export function PersonCard({ locale }: { locale: Locale }) {
  const p = getPerson(locale);
  return (
    <Card className="group flex items-center gap-5 p-6 transition duration-300 hover:ring-primary/30">
      <Image
        src={image}
        alt={`${name} – ${p.role}, ${siteConfig.name}`}
        width={96}
        height={96}
        sizes="96px"
        className="h-20 w-20 shrink-0 rounded-2xl border border-border/60 object-cover grayscale ring-1 ring-white/10 transition duration-500 group-hover:grayscale-0"
      />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
          {p.eyebrow}
        </p>
        <p className="mt-1 font-sans font-bold tracking-tight text-foreground text-lg">
          {name}
        </p>
        <p className="text-sm text-primary/90">{p.role}</p>
        {linkedin && (
          <LinkedInButton
            href={linkedin}
            label={p.linkedinLabel}
            className="mt-3 h-9 px-3.5 text-xs"
          />
        )}
      </div>
    </Card>
  );
}
