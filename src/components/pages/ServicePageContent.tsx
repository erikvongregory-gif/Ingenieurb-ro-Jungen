import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import type { LocalizedService } from "@/content/services";
import { getPathname } from "@/i18n/navigation";
import { absoluteUrl, siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichSections } from "@/components/content/RichSections";
import { FaqMonochrome } from "@/components/ui/faq-monochrome";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Section,
  Container,
  Eyebrow,
  SectionHeading,
  Card,
} from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
} from "@/lib/seo/structured-data";
import type { Locale } from "@/i18n/routing";

/**
 * Datengetriebene, gestaltete Leistungsseite (Automation, Retrofit)
 * im Hero-Stil. Inhalte stammen aus src/content/services.ts.
 */
export function ServicePageContent({
  locale,
  service,
}: {
  locale: Locale;
  service: LocalizedService;
}) {
  const tc = useTranslations("Common");

  const url = absoluteUrl(getPathname({ href: service.pathname, locale }));
  const homeUrl = absoluteUrl(getPathname({ href: "/", locale }));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(locale, {
            name: service.title,
            description: service.shortDescription,
            url,
            serviceType: service.serviceType,
          }),
          breadcrumbSchema([
            { name: siteConfig.name, url: homeUrl },
            { name: service.title, url },
          ]),
          faqSchema(service.faq),
        ]}
      />

      <article>
        <PageHeader
          eyebrow={service.serviceType}
          title={service.title}
          lead={service.lead}
        />

        <Container className="pb-4">
          <ButtonLink href="/kontakt" withArrow>
            {tc("getInTouch")}
          </ButtonLink>
        </Container>

        {/* SEO-Fließtext */}
        <Section className="pt-16 md:pt-20">
          <Container>
            <Reveal>
              <RichSections sections={service.sections} />
            </Reveal>
          </Container>
        </Section>

        {/* Vorteile */}
        <Section className="border-t border-border/40 pt-20">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>{service.title}</Eyebrow>
              <SectionHeading className="mt-3">{tc("benefits")}</SectionHeading>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((benefit, index) => (
                <Reveal
                  as="li"
                  key={benefit}
                  delay={(index % 2) * 90}
                  spotlight
                  className="spotlight-card"
                >
                  <Card className="tap-press group flex h-full items-start gap-3 p-5 transition duration-300 hover:-translate-y-0.5 hover:ring-primary/40">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30 transition-all duration-300 group-hover:bg-primary/25 group-hover:scale-110">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm md:text-base leading-relaxed text-foreground/80">
                      {benefit}
                    </span>
                  </Card>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Ablauf */}
        <Section className="border-t border-border/40">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>{service.title}</Eyebrow>
              <SectionHeading className="mt-3">{tc("process")}</SectionHeading>
            </Reveal>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {service.process.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.step}
                  delay={index * 110}
                  spotlight
                  className="spotlight-card"
                >
                  <Card className="tap-press group h-full p-7 transition duration-300 hover:-translate-y-1 hover:ring-primary/40">
                    <AnimatedNumber
                      value={index + 1}
                      delay={index * 110}
                      className="number-shimmer inline-block bg-gradient-to-r from-primary/60 via-foreground/90 to-primary/60 bg-clip-text font-sans font-extrabold tabular-nums tracking-tighter text-3xl text-transparent transition-[transform,filter] duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(42,166,189,0.5)]"
                    />
                    <h3 className="mt-4 font-sans font-bold tracking-tight text-foreground text-lg">
                      {step.step}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                      {step.description}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Branchen */}
        <Section className="border-t border-border/40">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow>{service.title}</Eyebrow>
              <SectionHeading className="mt-3">
                {tc("industries")}
              </SectionHeading>
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-3">
              {service.industries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm text-foreground/75 backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* FAQ */}
        <FaqMonochrome
          items={service.faq}
          introLabel="FAQ"
          eyebrow={service.title}
          title={tc("faq")}
        />

        {/* CTA */}
        <Section className="border-t border-border/40">
          <Container>
            <Reveal>
            <Card className="group relative overflow-hidden p-10 md:p-14 text-center transition duration-500 hover:ring-primary/40">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--primary),transparent_70%)] opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25" />
              <SectionHeading>{tc("getInTouch")}</SectionHeading>
              <p className="mx-auto mt-5 max-w-2xl text-sm md:text-lg font-light leading-relaxed text-foreground/80">
                {service.lead}
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/kontakt" withArrow>
                  {tc("getInTouch")}
                </ButtonLink>
              </div>
            </Card>
            </Reveal>
          </Container>
        </Section>
      </article>
    </>
  );
}
