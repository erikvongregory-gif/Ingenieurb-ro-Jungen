import { siteConfig, absoluteUrl } from "@/config/site";
import type { Locale } from "@/i18n/routing";

/**
 * Schema.org / JSON-LD Bausteine.
 * ------------------------------------------------------------------
 * Strukturierte Daten sind sowohl für klassisches SEO (Rich Results)
 * als auch für KI-/Antwort-Maschinen (GEO/AEO) zentral: Sie machen die
 * Entität "Ingenieurbüro Jungen" und ihr Leistungsangebot maschinenlesbar.
 *
 * Stabile @id-Werte verknüpfen die Entitäten zu einem Knowledge Graph.
 */

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const PERSON_ID = `${siteConfig.url}/#person`;

type JsonLd = Record<string, unknown>;

/** Organisation / lokales Unternehmen (Kern-Entität der Website). */
export function organizationSchema(locale: Locale): JsonLd {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    slogan: siteConfig.slogan[locale],
    description:
      locale === "de"
        ? "Ingenieurbüro für Industrieautomation, Retrofit und Steuerungstechnik."
        : "Engineering office for industrial automation, retrofit and control technology.",
    image: absoluteUrl(siteConfig.ogImage),
    ...(siteConfig.foundingYear
      ? { foundingDate: siteConfig.foundingYear }
      : {}),
    ...(siteConfig.vatId ? { vatID: siteConfig.vatId } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone
      ? { telephone: siteConfig.contact.phone }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.address.street
        ? { streetAddress: siteConfig.address.street }
        : {}),
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
      ...(siteConfig.address.city
        ? { addressLocality: siteConfig.address.city }
        : {}),
      ...(siteConfig.address.region
        ? { addressRegion: siteConfig.address.region }
        : {}),
      addressCountry: siteConfig.address.country,
    },
    ...(siteConfig.address.latitude && siteConfig.address.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.address.latitude,
            longitude: siteConfig.address.longitude,
          },
        }
      : {}),
    ...(siteConfig.serviceAreas.length
      ? {
          areaServed: siteConfig.serviceAreas.map((name) => ({
            "@type": "Place",
            name,
          })),
        }
      : {}),
    ...(siteConfig.openingHours.length
      ? { openingHours: siteConfig.openingHours }
      : {}),
    ...(siteConfig.responsiblePerson.name
      ? { founder: { "@id": PERSON_ID } }
      : {}),
  };
}

/**
 * Verantwortliche Person (Inhaber) als eigene Entität.
 * Stärkt E-E-A-T und gibt KI/Suchmaschinen eine benannte Experten-Entität,
 * die mit der Organisation verknüpft ist.
 */
export function personSchema(locale: Locale): JsonLd {
  const { name, jobTitle, image, linkedin } = siteConfig.responsiblePerson;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    ...(jobTitle ? { jobTitle } : {}),
    ...(image ? { image: absoluteUrl(image) } : {}),
    url: siteConfig.url,
    ...(linkedin ? { sameAs: [linkedin] } : {}),
    worksFor: { "@id": ORG_ID },
    knowsAbout:
      locale === "de"
        ? [
            "Industrieautomation",
            "Retrofit",
            "SPS-Programmierung",
            "Steuerungstechnik",
            "Schaltschrankbau",
          ]
        : [
            "Industrial automation",
            "Retrofit",
            "PLC programming",
            "Control technology",
            "Control cabinet construction",
          ],
  };
}

/** WebSite-Entität (verknüpft mit der Organisation als Publisher). */
export function websiteSchema(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    publisher: { "@id": ORG_ID },
  };
}

type ServiceInput = {
  name: string;
  description: string;
  /** Öffentliche URL der Leistungsseite. */
  url: string;
  serviceType?: string;
};

/** Einzelne Dienstleistung (für Leistungsseiten). */
export function serviceSchema(locale: Locale, service: ServiceInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.serviceType ? { serviceType: service.serviceType } : {}),
    inLanguage: locale === "de" ? "de-DE" : "en-US",
    provider: { "@id": ORG_ID },
    ...(siteConfig.serviceAreas.length
      ? { areaServed: siteConfig.serviceAreas }
      : {}),
  };
}

type Crumb = { name: string; url: string };

/** Breadcrumb-Navigation (Rich Result + bessere Crawlbarkeit). */
export function breadcrumbSchema(items: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type QA = { question: string; answer: string };

/**
 * FAQ-Schema – besonders wertvoll für KI-/Antwortmaschinen (AEO):
 * klare Frage-Antwort-Paare werden direkt als Antworten zitierbar.
 */
export function faqSchema(items: QA[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.answer,
      },
    })),
  };
}
