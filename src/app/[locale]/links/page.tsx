import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { RichSections } from "@/components/content/RichSections";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, Container } from "@/components/ui/section";
import { linksPage } from "@/content/pages";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Links" });
  return buildMetadata({
    locale,
    pathname: "/links",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LinksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = linksPage[locale];
  return (
    <article>
      <PageHeader title={content.h1} lead={content.lead} />
      <Section className="pt-12 md:pt-16">
        <Container>
          <RichSections sections={content.sections} />
          {/* TODO: Partner-/Ressourcen-Links pflegen (rel="nofollow"/"sponsored" beachten). */}
        </Container>
      </Section>
    </article>
  );
}
