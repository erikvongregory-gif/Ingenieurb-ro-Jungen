import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { references } from "@/content/references";
import { faq } from "@/content/faq";
import { person } from "@/content/team";
import { referencesPage, contactPage } from "@/content/pages";
import { CMS_KEYS } from "./keys";

/**
 * Liefert den fest hinterlegten Default-Inhalt (aus src/content/*) für einen
 * CMS-Key und eine Sprache. Wird sowohl für den Seed als auch als Ausgangswert
 * im Editor verwendet, falls noch kein DB-Eintrag existiert.
 */
export function getDefaultData(key: string, locale: Locale): unknown {
  switch (key) {
    case CMS_KEYS.home:
      return home[locale];
    case CMS_KEYS.serviceAutomation:
      return services[locale].find((s) => s.id === "automation");
    case CMS_KEYS.serviceRetrofit:
      return services[locale].find((s) => s.id === "retrofit");
    case CMS_KEYS.references:
      return references[locale];
    case CMS_KEYS.faq:
      return { items: faq[locale] };
    case CMS_KEYS.person:
      return person[locale];
    case CMS_KEYS.pageReferences:
      return referencesPage[locale];
    case CMS_KEYS.pageContact:
      return contactPage[locale];
    default:
      return null;
  }
}

/**
 * Sammelt alle Default-Dokumente (Key × Sprache) für den initialen Seed.
 */
export function collectDefaultDocuments(): {
  key: string;
  locale: Locale;
  data: unknown;
}[] {
  const keys = Object.values(CMS_KEYS);
  const docs: { key: string; locale: Locale; data: unknown }[] = [];
  for (const locale of routing.locales) {
    for (const key of keys) {
      const data = getDefaultData(key, locale);
      if (data != null) docs.push({ key, locale, data });
    }
  }
  return docs;
}
