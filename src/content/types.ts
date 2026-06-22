/**
 * Gemeinsame Typen für den Content-Layer.
 * Inhalte werden bewusst datengetrieben gehalten und vom Design getrennt.
 */

/** Ein inhaltlicher Abschnitt (Überschrift + Absätze + optionale Aufzählung). */
export type RichSection = {
  /** H2-Überschrift des Abschnitts (Keyword-relevant formulieren). */
  heading: string;
  /** Fließtext-Absätze. */
  paragraphs: string[];
  /** Optionale Aufzählungspunkte. */
  bullets?: string[];
};

/** Frage-Antwort-Paar (für FAQ-Inhalte und FAQPage-Schema). */
export type FaqItem = {
  question: string;
  answer: string;
};
