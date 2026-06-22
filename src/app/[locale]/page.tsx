import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link, getPathname } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichSections } from "@/components/content/RichSections";
import { PersonSection } from "@/components/content/PersonProfile";
import { PixelHero } from "@/components/ui/pixel-perfect-hero";
import { FaqMonochrome } from "@/components/ui/faq-monochrome";
import { Section, Container, Eyebrow, SectionHeading, Card } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactButton } from "@/components/contact/ContactButton";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { faqSchema, personSchema } from "@/lib/seo/structured-data";
import { getServices } from "@/content/services";
import { getHome, heroBrands } from "@/content/home";
import { getFaq } from "@/content/faq";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildMetadata({
    locale,
    pathname: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "Industrieautomation",
      "Ingenieurbüro Jungen",
      "Retrofit",
      "SPS-Programmierung",
      "Automatisierungstechnik",
      "Steuerungstechnik",
      "Industrial Automation",
    ],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const tc = useTranslations("Common");
  const tn = useTranslations("Nav");
  const content = getHome(locale);
  const services = getServices(locale);
  const faq = getFaq(locale);

  const kontaktHref = getPathname({ href: "/kontakt", locale });
  const referenzenHref = getPathname({ href: "/referenzen", locale });

  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <JsonLd data={personSchema(locale)} />

      {/* Hero (enthält die H1 der Seite). */}
      <PixelHero
        word1={content.heroWord1}
        word2={content.heroWord2}
        description={content.lead}
        primaryCta={tc("getInTouch")}
        primaryCtaMobile={tc("getInTouch")}
        secondaryCta={tn("references")}
        secondaryCtaMobile={tn("references")}
        primaryHref={kontaktHref}
        secondaryHref={referenzenHref}
        primaryAsModal
        brands={heroBrands}
        brandsLabel={content.brandsLabel}
      />

      {/* Intro */}
      <Section>
        <Container size="narrow" className="text-center">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <SectionHeading className="mt-4">{content.h1}</SectionHeading>
          </Reveal>
          <Reveal delay={120} className="mt-6 flex flex-col gap-4">
            {content.intro.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg font-light leading-relaxed text-foreground/80"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={220} className="mt-8 flex justify-center">
            <ContactButton withArrow>{tc("getInTouch")}</ContactButton>
          </Reveal>
        </Container>
      </Section>

      {/* Trust-Band (Kennzahlen / Belege) */}
      <Section className="border-t border-border/40 py-12 md:py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {content.stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 90}
                className="group text-center sm:text-left"
              >
                <dt className="font-sans font-extrabold tracking-tight text-foreground text-2xl transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {stat.label}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Warum wir – nummerierte Editorial-Liste statt Kachelraster */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading>{tc("whyUs")}</SectionHeading>
          </Reveal>
          <ol className="mt-12 border-t border-border/40 md:mt-16">
            {content.usps.map((usp, index) => (
              <Reveal
                as="li"
                key={usp.title}
                delay={index * 80}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-b border-border/40 px-3 py-7 -mx-3 rounded-xl transition-colors duration-300 hover:bg-foreground/[0.03] md:grid-cols-[4rem_minmax(0,17rem)_1fr] md:gap-x-10 md:py-9"
              >
                <AnimatedNumber
                  value={index + 1}
                  delay={index * 80}
                  className="number-shimmer inline-block bg-gradient-to-r from-primary/50 via-foreground/90 to-primary/50 bg-clip-text font-sans font-extrabold tabular-nums text-2xl leading-none text-transparent transition-[transform,filter] duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(37,99,235,0.45)] md:text-3xl"
                />
                <h3 className="self-center font-sans font-bold tracking-tight text-foreground text-lg md:text-xl">
                  {usp.title}
                </h3>
                <p className="col-start-2 max-w-xl text-sm leading-relaxed text-foreground/75 md:col-start-3 md:self-center md:text-base">
                  {usp.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Leistungen – editoriales Wechsel-Layout mit Foto */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {tc("services")}
            </p>
            <SectionHeading className="mt-3">{tc("ourServices")}</SectionHeading>
          </Reveal>

          <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
            {services.map((service, index) => {
              const reversed = index % 2 === 1;
              return (
                <Reveal key={service.id}>
                  <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                    {/* Text */}
                    <div className={reversed ? "md:order-2" : undefined}>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                        <span className="mx-2 text-foreground/30">—</span>
                        {service.title}
                      </p>
                      <h3 className="mt-4 font-sans font-extrabold tracking-tight text-foreground text-2xl md:text-3xl">
                        {service.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base font-light leading-relaxed text-foreground/80">
                        {service.shortDescription}
                      </p>
                      <ul className="mt-6 flex flex-col gap-3">
                        {service.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 text-sm md:text-base text-foreground/80"
                          >
                            <span className="mt-px font-mono text-primary">+</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={service.pathname}
                        className="group/link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        {tc("readMore")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>

                    {/* Foto */}
                    <div
                      className={`group relative overflow-hidden rounded-2xl ring-1 ring-border/60 shadow-[0_18px_50px_rgba(0,0,0,0.4)] ${
                        reversed ? "md:order-1" : undefined
                      }`}
                    >
                      <Image
                        src={service.image.src}
                        alt={service.image.alt}
                        width={1024}
                        height={768}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Ihr Ansprechpartner (E-E-A-T) */}
      <PersonSection locale={locale} />

      {/* SEO-Fließtext */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal>
            <RichSections sections={content.sections} />
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <FaqMonochrome
        items={faq}
        introLabel="FAQ"
        title={tc("faq")}
        subtitle={tc("faqIntro")}
      />

      {/* CTA */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal>
          <Card className="group relative overflow-hidden p-10 md:p-16 text-center transition duration-500 hover:ring-primary/40">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--primary),transparent_70%)] opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25" />
            <SectionHeading>{content.cta.heading}</SectionHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-foreground/80">
              {content.cta.text}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ContactButton withArrow>{tc("getInTouch")}</ContactButton>
              <ButtonLink href="/referenzen" variant="secondary">
                {tn("references")}
              </ButtonLink>
            </div>
          </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
