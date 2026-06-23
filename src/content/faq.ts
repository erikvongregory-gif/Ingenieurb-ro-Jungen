import type { Locale } from "@/i18n/routing";
import type { FaqItem } from "./types";
import { getCmsDocument } from "@/lib/cms/repository";
import { CMS_KEYS } from "@/lib/cms/keys";

export type { FaqItem };

/** Im CMS wird die FAQ-Liste als Objekt { items: [...] } gespeichert. */
export type FaqDocument = { items: FaqItem[] };

/**
 * GLOBALE FAQ (AEO / GEO-optimiert)
 * ------------------------------------------------------------------
 * Klare Frage-Antwort-Paare sind ideal für Antwort-Maschinen (Google AI
 * Overviews, ChatGPT, Perplexity etc.) und für FAQ-Rich-Results.
 * Antworten kurz, faktisch und eigenständig zitierbar formulieren.
 *
 * >>> TODO: Antworten mit echten Unternehmensfakten präzisieren.
 */
export const faq: Record<Locale, FaqItem[]> = {
  de: [
    {
      question: "Was macht ein Ingenieurbüro für Industrieautomation?",
      answer:
        "Ein Ingenieurbüro für Industrieautomation plant und realisiert die Automatisierung von Maschinen und Anlagen – von der Konzeption über die SPS-Programmierung und Visualisierung bis zur Inbetriebnahme. Das Ingenieurbüro Jungen arbeitet dabei herstellerunabhängig und betreut Projekte ganzheitlich aus einer Hand.",
    },
    {
      question: "Was ist ein Retrofit und wann lohnt er sich?",
      answer:
        "Ein Retrofit ist die Modernisierung bestehender Maschinen, meist durch Erneuerung der Steuerungstechnik. Er lohnt sich, wenn die Mechanik noch gut ist, aber die Steuerung veraltet oder abgekündigt ist – als kostengünstige und nachhaltige Alternative zur Neuanschaffung.",
    },
    {
      question: "Welche Steuerungssysteme und Hersteller unterstützen Sie?",
      answer:
        "Wir arbeiten herstellerunabhängig mit gängigen SPS-Systemen wie Siemens (SIMATIC S7, TIA Portal), Beckhoff (TwinCAT) und Rockwell und wählen die für Ihre Anwendung passende Plattform aus.", // TODO: tatsächlich unterstützte Systeme bestätigen
    },
    {
      question: "Übernehmen Sie auch die Inbetriebnahme vor Ort?",
      answer:
        "Ja. Wir begleiten Projekte von der Planung über die Programmierung bis zur Inbetriebnahme vor Ort – inklusive Test, Optimierung im laufenden Betrieb und anschließendem Support.",
    },
    {
      question: "Was kostet eine Automatisierung oder ein Retrofit?",
      answer:
        "Die Kosten hängen vom Umfang, der vorhandenen Technik und den Anforderungen ab. Nach einer Bestandsaufnahme erhalten Sie ein transparentes, auf Ihr Projekt zugeschnittenes Angebot. Ein Retrofit ist in der Regel deutlich günstiger als eine Neuanschaffung.",
    },
    {
      question: "In welcher Region ist das Ingenieurbüro Jungen tätig?",
      answer:
        "Das Ingenieurbüro Jungen ist überregional in Deutschland und im DACH-Raum für Industrieautomation und Retrofit tätig.", // TODO: konkretes Einzugsgebiet ergänzen
    },
  ],
  en: [
    {
      question: "What does an industrial automation engineering office do?",
      answer:
        "An industrial automation engineering office plans and implements the automation of machines and plants – from concept and PLC programming through visualization to commissioning. Ingenieurbüro Jungen works vendor-independently and manages projects end to end.",
    },
    {
      question: "What is a retrofit and when is it worthwhile?",
      answer:
        "A retrofit is the modernization of existing machines, usually by renewing the control technology. It pays off when the mechanics are still sound but the control is outdated or discontinued – a cost-effective and sustainable alternative to buying new.",
    },
    {
      question: "Which control systems and vendors do you support?",
      answer:
        "We work vendor-independently with common PLC systems such as Siemens (SIMATIC S7, TIA Portal), Beckhoff (TwinCAT) and Rockwell, and select the platform best suited to your application.",
    },
    {
      question: "Do you also handle on-site commissioning?",
      answer:
        "Yes. We support projects from planning and programming to on-site commissioning – including testing, optimization during operation and ongoing support.",
    },
    {
      question: "What does automation or a retrofit cost?",
      answer:
        "Costs depend on scope, existing equipment and requirements. After an assessment you receive a transparent quote tailored to your project. A retrofit is usually significantly cheaper than buying new.",
    },
    {
      question: "Which region does Ingenieurbüro Jungen serve?",
      answer:
        "Ingenieurbüro Jungen operates across Germany and the DACH region for industrial automation and retrofit projects.",
    },
  ],
};

export async function getFaq(locale: Locale): Promise<FaqItem[]> {
  const doc = await getCmsDocument<FaqDocument>(CMS_KEYS.faq, locale);
  return doc?.items ?? faq[locale];
}
