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
import { HomeHero } from "@/components/ui/home-hero";
import { FaqMonochrome } from "@/components/ui/faq-monochrome";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactButton } from "@/components/contact/ContactButton";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { faqSchema, personSchema } from "@/lib/seo/structured-data";
import { getServices, type LocalizedService } from "@/content/services";
import { getHome, heroBrands, type HomeContent as HomeContentData } from "@/content/home";
import { getFaq } from "@/content/faq";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/types";
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
  const [content, services, faq] = await Promise.all([
    getHome(locale),
    getServices(locale),
    getFaq(locale),
  ]);
  return (
    <HomeContent
      locale={locale}
      content={content}
      services={services}
      faq={faq}
    />
  );
}

function HomeContent({
  locale,
  content,
  services,
  faq,
}: {
  locale: Locale;
  content: HomeContentData;
  services: LocalizedService[];
  faq: FaqItem[];
}) {
  const tc = useTranslations("Common");
  const tn = useTranslations("Nav");

  const referenzenHref = getPathname({ href: "/referenzen", locale });

  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <JsonLd data={personSchema(locale)} />

      {/* Hero – minimalistisch / editorial (enthält die H1). */}
      <HomeHero
        eyebrow={content.eyebrow}
        word1={content.heroWord1}
        word2={content.heroWord2}
        lead={content.lead}
        primaryCta={tc("getInTouch")}
        secondaryCta={tn("references")}
        secondaryHref={referenzenHref}
        brands={heroBrands}
        brandsLabel={content.brandsLabel}
      />

      {/* Intro – linksbündiges Statement mit Akzent-Leiste. */}
      <Section className="border-t border-border/40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <div className="border-l-2 border-primary/60 pl-5 md:pl-7">
                <SectionHeading>{content.h1}</SectionHeading>
              </div>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-5 lg:col-span-5">
              {content.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-prose text-sm font-light leading-relaxed text-foreground/80 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-2">
                <ContactButton withArrow>{tc("getInTouch")}</ContactButton>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Kennzahlen – Daten-Strip mit Hairline-Trennern. */}
      <Section className="py-12 md:py-14">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/50 bg-border/40 sm:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col gap-2 bg-background p-6 md:p-7"
                >
                  <dt className="font-sans text-2xl font-extrabold tabular-nums tracking-tight text-primary transition-transform duration-300 group-hover:translate-x-0.5 md:text-3xl [overflow-wrap:break-word]">
                    {stat.value}
                  </dt>
                  <dd className="text-xs leading-relaxed text-foreground/70 md:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Warum wir – Bento (2x2) mit variierten Flächen. */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading>
              {tc("whyUs").split("Jungen")[0]}
              <AnimatedUnderline>Jungen</AnimatedUnderline>
            </SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14">
            {content.usps.map((usp, index) => {
              const tinted = index === 0 || index === 3;
              return (
                <Reveal
                  as="div"
                  key={usp.title}
                  delay={(index % 2) * 90}
                  spotlight
                  className="spotlight-card"
                >
                  <div
                    className={cn(
                      "tap-press group relative h-full overflow-hidden rounded-2xl border border-border/50 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 md:p-8",
                      tinted ? "bg-card/60" : "bg-card/30",
                    )}
                  >
                    {tinted && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_0%,rgba(42,166,189,0.16),transparent_55%)]"
                      />
                    )}
                    <span className="block h-px w-10 bg-primary/70" />
                    <h3 className="mt-5 font-sans text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {usp.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/75 md:text-base">
                      {usp.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Leistungen – zwei große Bild-Panels. */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal className="max-w-2xl">
            <SectionHeading>{tc("ourServices")}</SectionHeading>
          </Reveal>
          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal
                as="div"
                key={service.id}
                delay={index * 110}
                spotlight
                className="spotlight-card"
              >
                <Link
                  href={service.pathname}
                  className="tap-press group relative flex min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-border/60 p-7 transition duration-300 hover:ring-primary/40 md:min-h-[30rem] md:p-9"
                >
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="-z-20 object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/75 to-background/15"
                  />
                  <h3 className="font-sans text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-foreground/80 md:text-base">
                    {service.shortDescription}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2">
                    {service.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <span className="mt-px font-mono text-primary">+</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {tc("readMore")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
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

      {/* CTA – markantes Full-Width-Band. */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-background p-9 md:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_120%_at_0%_0%,rgba(42,166,189,0.16),transparent_60%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_right,black,transparent_75%)]"
              />
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <SectionHeading>{content.cta.heading}</SectionHeading>
                  <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-foreground/80 md:text-lg">
                    {content.cta.text}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ContactButton withArrow>{tc("getInTouch")}</ContactButton>
                  <ButtonLink href="/referenzen" variant="secondary">
                    {tn("references")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
