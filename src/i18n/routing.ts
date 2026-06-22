import { defineRouting } from "next-intl/routing";

/**
 * Zentrale i18n-Routing-Konfiguration.
 *
 * - Standardsprache: Deutsch (Hauptmarkt), wird ohne URL-Präfix ausgeliefert
 *   (z. B. https://ib-jungen.de/automation).
 * - Englisch wird unter /en/... ausgeliefert (z. B. /en/automation).
 * - `pathnames` ermöglicht lokalisierte, sprechende URLs pro Sprache
 *   (gut für SEO: /referenzen vs. /en/references).
 *
 * Wichtig: Die Schlüssel in `pathnames` sind die INTERNEN Pfade
 * (= Ordnernamen unter src/app/[locale]/...). Die Werte sind die
 * öffentlich sichtbaren, lokalisierten URLs.
 */
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/automation": {
      de: "/automation",
      en: "/automation",
    },
    "/retrofit": {
      de: "/retrofit",
      en: "/retrofit",
    },
    "/referenzen": {
      de: "/referenzen",
      en: "/references",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
