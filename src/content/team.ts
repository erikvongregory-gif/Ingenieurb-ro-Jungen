import type { Locale } from "@/i18n/routing";
import { getCmsDocumentOr } from "@/lib/cms/repository";
import { CMS_KEYS } from "@/lib/cms/keys";

/**
 * Inhalte für die "Ihr Ansprechpartner"-Sektion (Inhaber).
 * Name, Rolle und Bild kommen aus der zentralen Site-Konfiguration,
 * die Texte sind hier zweisprachig gepflegt (Content vom Design getrennt).
 *
 * >>> TODO (durch Kunden verfeinern): Werdegang, Schwerpunkte und ggf.
 *     Jahre an Erfahrung konkretisieren – das stärkt E-E-A-T zusätzlich.
 */

export type PersonContent = {
  /** Kleines Label über der Überschrift. */
  eyebrow: string;
  /** Sektions-Überschrift. */
  heading: string;
  /** Anzeige-Rolle (z. B. unter dem Namen). */
  role: string;
  /** Vertrauens-/Vorstellungstext. */
  bio: string[];
  /** Beschriftung des CTA-Buttons. */
  ctaLabel: string;
  /** Beschriftung des LinkedIn-Buttons. */
  linkedinLabel: string;
};

export const person: Record<Locale, PersonContent> = {
  de: {
    eyebrow: "Ihr Ansprechpartner",
    heading: "Persönlich für Ihr Projekt verantwortlich",
    role: "Inhaber & Dipl.-Ing.",
    bio: [
      "Hinter dem Ingenieurbüro Jungen steht Frank Jungen persönlich. Als Inhaber und Diplom-Ingenieur betreut er Automatisierungs- und Retrofit-Projekte von der ersten Analyse bis zur Inbetriebnahme – herstellerunabhängig und mit klarem Fokus auf Ihre Anforderungen.",
      "Sie haben einen festen Ansprechpartner, der Technik und Termine im Blick behält und Ihre Anlage versteht. Genau das schätzen unsere Kunden: kurze Wege, fundierte Beratung und Lösungen, die im Feld zuverlässig funktionieren.",
    ],
    ctaLabel: "Gespräch vereinbaren",
    linkedinLabel: "Auf LinkedIn vernetzen",
  },
  en: {
    eyebrow: "Your contact",
    heading: "Personally responsible for your project",
    role: "Owner & Dipl.-Ing.",
    bio: [
      "Behind Ingenieurbüro Jungen is Frank Jungen in person. As owner and graduate engineer, he handles automation and retrofit projects from the first analysis to commissioning – vendor-independent and with a clear focus on your requirements.",
      "You have one dedicated contact who keeps an eye on both technology and deadlines and truly understands your plant. That is exactly what our customers value: short communication paths, sound advice and solutions that work reliably in the field.",
    ],
    ctaLabel: "Arrange a call",
    linkedinLabel: "Connect on LinkedIn",
  },
};

export async function getPerson(locale: Locale): Promise<PersonContent> {
  return getCmsDocumentOr<PersonContent>(CMS_KEYS.person, locale, person[locale]);
}
