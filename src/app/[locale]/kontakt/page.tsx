import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { RichSections } from "@/components/content/RichSections";
import { PersonCard } from "@/components/content/PersonProfile";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactButton } from "@/components/contact/ContactButton";
import { Section, Container, Card } from "@/components/ui/section";
import { personSchema } from "@/lib/seo/structured-data";
import { getContactPage } from "@/content/pages";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildMetadata({
    locale,
    pathname: "/kontakt",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getContactPage(locale);
  const tm = await getTranslations({ locale, namespace: "ContactModal" });
  return (
    <article>
      <JsonLd data={personSchema(locale)} />
      <PageHeader title={content.h1} lead={content.lead} />
      <Section className="pt-12 md:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <RichSections sections={content.sections} />

            <div className="flex flex-col gap-6">
              <PersonCard locale={locale} />

              <Card className="h-fit p-8">
              <p className="font-sans font-bold tracking-tight text-foreground text-lg">
                {siteConfig.name}
              </p>
              <address className="mt-5 flex flex-col gap-4 not-italic">
                {siteConfig.contact.email && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                      <Mail className="h-4 w-4 text-primary" />
                    </span>
                    {siteConfig.contact.email}
                  </a>
                )}
                {siteConfig.contact.phoneDisplay && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
                      <Phone className="h-4 w-4 text-primary" />
                    </span>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                )}
                {!siteConfig.contact.phoneDisplay && (
                  <p className="text-sm text-foreground/50">
                    {/* TODO: Telefonnummer & Adresse in src/config/site.ts pflegen. */}
                  </p>
                )}
              </address>
              <div className="mt-6">
                <ContactButton withArrow className="w-full sm:w-auto">
                  {tm("open")}
                </ContactButton>
              </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
