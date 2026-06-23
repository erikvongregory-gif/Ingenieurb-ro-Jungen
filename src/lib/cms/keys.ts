import type { Locale } from "@/i18n/routing";

/**
 * Stabile Dokument-Keys im CMS. Jeder Key entspricht einem Inhaltsbereich und
 * wird pro Sprache (de/en) gespeichert.
 */
export const CMS_KEYS = {
  home: "home",
  serviceAutomation: "service.automation",
  serviceRetrofit: "service.retrofit",
  references: "references",
  faq: "faq",
  person: "person",
  pageReferences: "page.referenzen",
  pageContact: "page.kontakt",
} as const;

export type CmsKey = (typeof CMS_KEYS)[keyof typeof CMS_KEYS];

/** Globaler Cache-Tag für alle CMS-Inhalte. */
export const CMS_TAG = "cms";

/** Cache-Tag für ein einzelnes Dokument (z. B. "cms:home:de"). */
export function cmsTag(key: string, locale: Locale): string {
  return `${CMS_TAG}:${key}:${locale}`;
}
