/**
 * ZENTRALE SITE-KONFIGURATION (Single Source of Truth)
 * ----------------------------------------------------
 * Alle global relevanten Stammdaten, NAP-Daten (Name/Address/Phone),
 * SEO-Defaults und Verknüpfungen werden hier gepflegt und überall
 * (Metadata, JSON-LD/Schema.org, Footer, Impressum, sitemap) wiederverwendet.
 *
 * >>> TODO (durch Kunden auszufüllen): Alle mit "TODO" markierten Werte
 *     mit echten Unternehmensdaten ersetzen. Korrekte & konsistente NAP-Daten
 *     sind ein wichtiger Local-SEO- und E-E-A-T-Faktor.
 */

export const siteConfig = {
  /**
   * Basis-URL für Canonical-/OG-/Sitemap-URLs (ohne abschließenden Slash).
   *
   * Default ist die finale Produktions-Domain. Solange diese noch nicht auf
   * Vercel zeigt, kann sie übergangsweise per Umgebungsvariable
   * `NEXT_PUBLIC_SITE_URL` überschrieben werden (z. B. auf die *.vercel.app-
   * Domain), damit Sharing-Vorschauen schon vor dem Domain-Umzug funktionieren.
   * Zum Launch einfach die Variable in Vercel entfernen → fällt auf ib-jungen.de zurück.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ib-jungen.de")
    .trim()
    .replace(/\/+$/, ""),

  /** Weitere vom Inhaber betriebene Domain. */
  altDomain: "all-about-industrial-automation.de",

  /** Markenname / Unternehmensname. */
  name: "Ingenieurbüro Jungen",
  legalName: "Ingenieurbüro Jungen (Inhaber: Frank Jungen)",
  shortName: "IB Jungen",

  /** Claim / USP. */
  slogan: {
    de: "Messen Sie uns an Ihren Herausforderungen",
    en: "Measure us by your challenges",
  },

  /** Branche / Nische – wird u. a. für Schema.org & Meta-Keywords genutzt. */
  industry: "Industrieautomation / Industrial Automation",

  /** Gründungsjahr (für Schema.org "foundingDate"). */
  foundingYear: "", // TODO: z. B. "2005"

  /** USt-IdNr. gemäß § 27a UStG. */
  vatId: "DE365597105",

  /** Kontaktdaten (NAP). */
  contact: {
    email: "fjungen@ib-jungen.de",
    phone: "+491725669504", // E.164
    phoneDisplay: "+49 (0) 172 566 9504",
  },

  /** Postanschrift. */
  address: {
    street: "Hauptstr. 32",
    postalCode: "86925",
    city: "Fuchstal-Leeder",
    region: "Bayern",
    country: "DE",
    countryName: "Deutschland",
    // TODO: Geokoordinaten für LocalBusiness-Schema (Google Maps "Was ist hier?").
    latitude: "",
    longitude: "",
  },

  /** Einzugsgebiet / bediente Regionen (Local SEO). */
  serviceAreas: [
    // TODO: relevante Städte/Regionen ergänzen, z. B. "Köln", "Düsseldorf", "NRW", "DACH"
  ] as string[],

  /** Öffnungs-/Geschäftszeiten (Schema.org openingHours). */
  openingHours: [
    // TODO: z. B. "Mo-Fr 08:00-17:00"
  ] as string[],

  /** Social-/Profil-Links (Schema.org "sameAs" → stärkt Entitäten-Erkennung). */
  social: {
    linkedin: "", // TODO
    xing: "", // TODO
    youtube: "", // TODO
    github: "", // TODO
  },

  /** Standard-Sharing-Bild (Open Graph / Twitter). Pfad relativ zu /public. */
  ogImage: "/og/default-og.png", // TODO: Bild unter public/og/default-og.png anlegen (1200x630)

  /** Theme-Farbe (Browser-UI / manifest) – Graphit-Hintergrund der Seite. */
  themeColor: "#0c0e12",

  /** Verantwortliche Person für Impressum / E-E-A-T (Author-Entität). */
  responsiblePerson: {
    name: "Frank Jungen",
    jobTitle: "Inhaber & Dipl.-Ing.",
    /** Porträt (relativ zu /public). */
    image: "/team/frank-jungen-2026.png",
    /** Persönliches LinkedIn-Profil (Person-Schema sameAs + Button). */
    linkedin: "https://www.linkedin.com/in/frank-jungen-15302664/",
  },
} as const;

/** Hilfsfunktion: absolute URL aus einem Pfad bauen. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean === "/" ? "" : clean}`;
}
