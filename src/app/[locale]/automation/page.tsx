import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo/metadata";
import { getService } from "@/content/services";
import { ServicePageContent } from "@/components/pages/ServicePageContent";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const service = getService(locale, "automation");
  return buildMetadata({
    locale,
    pathname: "/automation",
    title: service?.metaTitle ?? "Automation",
    description: service?.metaDescription ?? "",
    keywords: service?.keywords,
  });
}

export default async function AutomationPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePageContent locale={locale} serviceId="automation" />;
}
