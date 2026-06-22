import type { Locale } from "@/i18n/routing";
import type { RichSection } from "./types";

/**
 * STARTSEITEN-CONTENT (SEO-optimiert)
 * ------------------------------------------------------------------
 * Die Startseite ist die wichtigste Ranking-Seite für den Markennamen und die
 * Haupt-Keywords (Industrieautomation, Retrofit). Aufbau:
 *  - eyebrow/h1/lead   → Marke + Primär-Keyword, Antwort in den ersten Sätzen
 *  - intro             → einleitender SEO-Fließtext
 *  - usps              → Vertrauens-/Nutzenargumente (E-E-A-T)
 *  - sections          → SEO-Fließtext mit H2-Struktur
 *  - cta               → Handlungsaufforderung
 */

export type HomeContent = {
  eyebrow: string;
  h1: string;
  /** Hero-H1 ist zweigeteilt (Glass-Effekt): Wort 1 (serif) + Wort 2 (sans). */
  heroWord1: string;
  heroWord2: string;
  /** Label über dem Partner-/Technologie-Marquee im Hero. */
  brandsLabel: string;
  lead: string;
  intro: string[];
  /** Kennzahlen-Band (Trust / Belege) direkt nach dem Intro. */
  stats: { value: string; label: string }[];
  usps: { title: string; description: string }[];
  sections: RichSection[];
  cta: { heading: string; text: string };
};

/**
 * Technologien & Partner für das Hero-Marquee.
 * (Hersteller/Systeme, mit denen gearbeitet wird – sprachneutral.)
 * Logos liegen freigestellt (transparent) unter /public/brands.
 */
export type HeroBrand = { name: string; src: string };

export const heroBrands: HeroBrand[] = [
  { name: "Emerson", src: "/brands/emerson.png" },
  { name: "GE Digital", src: "/brands/ge-digital.png" },
  { name: "Beckhoff", src: "/brands/beckhoff.png" },
  { name: "Siemens", src: "/brands/siemens.png" },
  { name: "CODESYS", src: "/brands/codesys.png" },
  { name: "Linux", src: "/brands/linux.png" },
  { name: "Fieron Automation GmbH", src: "/brands/fieron-automation.png" },
];

export const home: Record<Locale, HomeContent> = {
  de: {
    eyebrow: "All About Industrial Automation",
    h1: "Ingenieurbüro für Industrieautomation und Retrofit",
    heroWord1: "Industrieautomation",
    heroWord2: "& Retrofit",
    brandsLabel: "Technologien & Partner, mit denen wir arbeiten",
    lead: "Das Ingenieurbüro Jungen plant und realisiert Industrieautomation und Retrofit für Maschinen und Anlagen – von der SPS-Programmierung über die Visualisierung bis zur Inbetriebnahme, herstellerunabhängig und aus einer Hand.",
    intro: [
      "Ob Neuautomatisierung oder Modernisierung bestehender Anlagen: Wir bringen Ihre Produktion technisch nach vorne. Als Ingenieurbüro für Automatisierungstechnik verbinden wir fundiertes Engineering-Know-how mit praktischer Erfahrung in der Inbetriebnahme – für Lösungen, die im realen Betrieb zuverlässig funktionieren.",
      "Messen Sie uns an Ihren Herausforderungen: Wir hören zu, analysieren Ihren Prozess und liefern eine Automatisierung, die zu Ihren Anforderungen passt.",
    ],
    stats: [
      { value: "25+", label: "Jahre Erfahrung in der Industrieautomation" },
      {
        value: "GE · Emerson",
        label: "Background bei führenden Automatisierungsherstellern",
      },
      {
        value: "DE · EN",
        label: "Projektabwicklung – national und international",
      },
      {
        value: "1 Ansprechpartner",
        label: "Konzept bis Inbetriebnahme aus einer Hand",
      },
    ],
    usps: [
      {
        title: "Herstellerunabhängig",
        description:
          "Wir empfehlen die Technik, die zu Ihrer Anwendung passt – nicht die eines bestimmten Herstellers.",
      },
      {
        title: "Alles aus einer Hand",
        description:
          "Konzept, Engineering, SPS-Programmierung und Inbetriebnahme mit einem festen Ansprechpartner.",
      },
      {
        title: "Nachhaltig & wirtschaftlich",
        description:
          "Mit Retrofit verlängern wir die Lebensdauer Ihrer Anlagen statt teurem Neukauf.",
      },
      {
        title: "Praxisnah",
        description:
          "Erfahrung aus realen Inbetriebnahmen – für Lösungen, die zuverlässig laufen.",
      },
    ],
    sections: [
      {
        heading: "Ihr Partner für Automatisierungstechnik",
        paragraphs: [
          "Als spezialisiertes Ingenieurbüro unterstützen wir Maschinen- und Anlagenbauer sowie produzierende Unternehmen bei allen Aufgaben rund um die Industrieautomation. Wir entwickeln Steuerungskonzepte, programmieren SPS-Systeme, realisieren HMI- und SCADA-Visualisierungen und nehmen Anlagen vor Ort in Betrieb.",
        ],
      },
      {
        heading: "Industrieautomation und Retrofit",
        paragraphs: [
          "Unsere beiden Kernbereiche greifen ineinander: In der Automation realisieren wir neue Automatisierungslösungen, im Retrofit modernisieren wir bestehende Maschinen und ersetzen veraltete oder abgekündigte Steuerungen. So begleiten wir Ihre Anlagen über den gesamten Lebenszyklus.",
        ],
        bullets: [
          "Automation: SPS-Programmierung, SCADA/HMI, Engineering und Inbetriebnahme",
          "Retrofit: Steuerungsmodernisierung, SPS-Migration und Schaltschrankbau",
        ],
      },
    ],
    cta: {
      heading: "Sprechen wir über Ihr Projekt",
      text: "Ob Automatisierung oder Retrofit – schildern Sie uns Ihre Herausforderung. Wir melden uns mit einer ehrlichen Einschätzung und einem passenden Vorschlag.",
    },
  },
  en: {
    eyebrow: "All About Industrial Automation",
    h1: "Engineering office for industrial automation and retrofit",
    heroWord1: "Industrial Automation",
    heroWord2: "& Retrofit",
    brandsLabel: "Technologies & partners we work with",
    lead: "Ingenieurbüro Jungen designs and implements industrial automation and retrofit for machines and plants – from PLC programming and visualization to commissioning, vendor-independent and from a single source.",
    intro: [
      "Whether new automation or modernization of existing equipment: we move your production forward. As an engineering office for automation technology, we combine solid engineering know-how with hands-on commissioning experience – for solutions that work reliably in real operation.",
      "Measure us by your challenges: we listen, analyse your process and deliver automation that fits your requirements.",
    ],
    stats: [
      { value: "25+", label: "years of experience in industrial automation" },
      {
        value: "GE · Emerson",
        label: "background at leading automation manufacturers",
      },
      {
        value: "DE · EN",
        label: "project delivery – national and international",
      },
      {
        value: "1 contact",
        label: "concept to commissioning from a single source",
      },
    ],
    usps: [
      {
        title: "Vendor-independent",
        description:
          "We recommend the technology that fits your application – not a particular vendor's.",
      },
      {
        title: "From a single source",
        description:
          "Concept, engineering, PLC programming and commissioning with one dedicated contact.",
      },
      {
        title: "Sustainable & economical",
        description:
          "With retrofit we extend the service life of your equipment instead of buying new.",
      },
      {
        title: "Hands-on",
        description:
          "Experience from real commissioning projects – for solutions that run reliably.",
      },
    ],
    sections: [
      {
        heading: "Your partner for automation technology",
        paragraphs: [
          "As a specialized engineering office, we support machine and plant builders as well as manufacturing companies with all tasks around industrial automation. We develop control concepts, program PLC systems, implement HMI and SCADA visualizations and commission plants on site.",
        ],
      },
      {
        heading: "Industrial automation and retrofit",
        paragraphs: [
          "Our two core areas complement each other: in automation we implement new solutions, in retrofit we modernize existing machines and replace outdated or discontinued controls. This way we support your equipment across its entire lifecycle.",
        ],
        bullets: [
          "Automation: PLC programming, SCADA/HMI, engineering and commissioning",
          "Retrofit: control modernization, PLC migration and control cabinet construction",
        ],
      },
    ],
    cta: {
      heading: "Let's talk about your project",
      text: "Whether automation or retrofit – tell us about your challenge. We'll get back to you with an honest assessment and a suitable proposal.",
    },
  },
};

export function getHome(locale: Locale): HomeContent {
  return home[locale];
}
