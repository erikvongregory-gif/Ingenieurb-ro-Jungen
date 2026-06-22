import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, Container } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { getImprint } from "@/content/legal";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Imprint" });
  return buildMetadata({
    locale,
    pathname: "/impressum",
    title: t("metaTitle"),
    description: t("metaDescription"),
    noindex: true,
  });
}

export default async function ImprintPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ImprintContent locale={locale} />;
}

function ImprintContent({ locale }: { locale: Locale }) {
  const t = useTranslations("Imprint");
  const c = getImprint(locale);
  const { name } = siteConfig.responsiblePerson;
  const { address, contact, vatId } = siteConfig;

  return (
    <article>
      <PageHeader title={t("h1")} />
      <Section className="pt-8 md:pt-10">
        <Container size="narrow">
          <div className="flex flex-col gap-10 text-sm md:text-base font-light leading-relaxed text-foreground/75">
            <div>
              <p>{c.ownerIntro}</p>
              <address className="mt-4 flex flex-col gap-1 not-italic">
                <span className="font-bold text-foreground">{name}</span>
                <span>{address.street}</span>
                <span>
                  {address.postalCode} {address.city}
                </span>
                <span>
                  {c.phoneLabel}:{" "}
                  <a
                    href={`tel:${contact.phone}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {contact.phoneDisplay}
                  </a>
                </span>
                <span>
                  {c.emailLabel}:{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {contact.email}
                  </a>
                </span>
              </address>
            </div>

            <div>
              <p className="font-semibold text-foreground">{c.vatLabel}</p>
              <p className="mt-1">{vatId}</p>
            </div>

            <div>
              <p>
                <span className="font-semibold text-foreground">
                  {c.editorialLabel}:
                </span>{" "}
                {name}
              </p>
            </div>

            <div>
              <h2 className="font-sans font-extrabold tracking-tight text-foreground text-xl md:text-2xl">
                {c.disclaimerHeading}
              </h2>
              <div className="mt-5 flex flex-col gap-6">
                {c.sections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="font-semibold text-foreground">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index} className="mt-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
