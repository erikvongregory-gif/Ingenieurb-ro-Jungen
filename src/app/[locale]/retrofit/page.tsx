import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const service = await getService(locale, "retrofit");
  return buildMetadata({
    locale,
    pathname: "/retrofit",
    title: service?.metaTitle ?? "Retrofit",
    description: service?.metaDescription ?? "",
    keywords: service?.keywords,
  });
}

export default async function RetrofitPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const service = await getService(locale, "retrofit");
  if (!service) notFound();
  return <ServicePageContent locale={locale} service={service} />;
}
