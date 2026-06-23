import type { Locale } from "@/i18n/routing";
import type { RichSection } from "./types";
import { getCmsDocumentOr } from "@/lib/cms/repository";
import { CMS_KEYS } from "@/lib/cms/keys";

/**
 * SEO-TEXTE für einfache Seiten (Referenzen, Kontakt).
 * H1/Lead + optionale Abschnitte. Inhalte vom Design getrennt.
 */

export type SimplePageContent = {
  h1: string;
  lead: string;
  sections: RichSection[];
};

export const referencesPage: Record<Locale, SimplePageContent> = {
  de: {
    h1: "Referenzen aus Industrieautomation und Retrofit",
    lead: "Ausgewählte Projekte zeigen, wie das Ingenieurbüro Jungen Maschinen automatisiert und bestehende Anlagen erfolgreich modernisiert.",
    sections: [
      {
        heading: "Erfahrung, die Vertrauen schafft",
        paragraphs: [
          "Von der SPS-Programmierung neuer Maschinen bis zum Retrofit veralteter Steuerungen: Unsere Projekte decken die gesamte Bandbreite der Automatisierungstechnik ab. Jede Lösung entsteht herstellerunabhängig und exakt auf die Anforderungen des Kunden zugeschnitten.",
          "Gerne stellen wir Ihnen passende Referenzen zu Ihrer konkreten Aufgabenstellung vor – sprechen Sie uns einfach an.",
        ],
        // TODO: Konkrete Referenzprojekte ergänzen (Ausgangslage, Lösung, Ergebnis,
        //       eingesetzte Systeme). Messbare Ergebnisse stärken E-E-A-T und KI-Zitate.
      },
    ],
  },
  en: {
    h1: "References in industrial automation and retrofit",
    lead: "Selected projects show how Ingenieurbüro Jungen automates machines and successfully modernizes existing plants.",
    sections: [
      {
        heading: "Experience that builds trust",
        paragraphs: [
          "From PLC programming of new machines to retrofitting outdated controls: our projects cover the full range of automation technology. Every solution is vendor-independent and tailored precisely to the customer's requirements.",
          "We are happy to present references relevant to your specific task – just get in touch.",
        ],
      },
    ],
  },
};

export const contactPage: Record<Locale, SimplePageContent> = {
  de: {
    h1: "Kontakt zum Ingenieurbüro Jungen",
    lead: "Sprechen Sie mit uns über Ihr Automatisierungs- oder Retrofit-Projekt. Wir freuen uns auf Ihre Anfrage.",
    sections: [
      {
        heading: "So erreichen Sie mich",
        paragraphs: [
          "Schildern Sie uns kurz Ihre Aufgabenstellung – ob Neuautomatisierung, SPS-Programmierung, Steuerungsmodernisierung oder Schaltschrankbau. Wir melden uns zeitnah mit einer ersten Einschätzung und den nächsten Schritten.",
        ],
        // TODO: Kontaktformular ergänzen. Bis dahin gelten die Angaben aus der Site-Konfiguration.
      },
    ],
  },
  en: {
    h1: "Contact Ingenieurbüro Jungen",
    lead: "Talk to us about your automation or retrofit project. We look forward to your enquiry.",
    sections: [
      {
        heading: "How to reach me",
        paragraphs: [
          "Briefly describe your task – whether new automation, PLC programming, control modernization or control cabinet construction. We'll get back to you promptly with an initial assessment and next steps.",
        ],
      },
    ],
  },
};

export async function getReferencesPage(
  locale: Locale,
): Promise<SimplePageContent> {
  return getCmsDocumentOr<SimplePageContent>(
    CMS_KEYS.pageReferences,
    locale,
    referencesPage[locale],
  );
}

export async function getContactPage(
  locale: Locale,
): Promise<SimplePageContent> {
  return getCmsDocumentOr<SimplePageContent>(
    CMS_KEYS.pageContact,
    locale,
    contactPage[locale],
  );
}
