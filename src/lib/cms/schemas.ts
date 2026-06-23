/**
 * Schema-getriebene Formulardefinitionen für den Admin-Bereich.
 * Statt für jeden Inhaltstyp ein eigenes Formular zu bauen, beschreibt hier
 * ein deklaratives Feld-Schema die Struktur; der generische SchemaForm-Renderer
 * erzeugt daraus die Eingabemaske.
 */

export type Field =
  | { type: "text"; name: string; label: string; help?: string }
  | { type: "textarea"; name: string; label: string; help?: string }
  | { type: "image"; name: string; label: string; help?: string }
  | {
      type: "stringList";
      name: string;
      label: string;
      itemLabel?: string;
      help?: string;
    }
  | {
      type: "objectList";
      name: string;
      label: string;
      itemLabel?: string;
      fields: Field[];
      help?: string;
    }
  | { type: "group"; name: string; label: string; fields: Field[]; help?: string };

export type DocSchema = {
  key: string;
  label: string;
  group: string;
  description?: string;
  fields: Field[];
};

/** Wiederverwendbares Feld für RichSection-Listen (Überschrift + Absätze + Bullets). */
function richSectionsField(name: string, label: string): Field {
  return {
    type: "objectList",
    name,
    label,
    itemLabel: "Abschnitt",
    fields: [
      { type: "text", name: "heading", label: "Überschrift" },
      { type: "stringList", name: "paragraphs", label: "Absätze", itemLabel: "Absatz" },
      { type: "stringList", name: "bullets", label: "Aufzählung (optional)", itemLabel: "Punkt" },
    ],
  };
}

const homeSchema: DocSchema = {
  key: "home",
  label: "Startseite",
  group: "Startseite",
  description: "Hero, Intro, Kennzahlen, Argumente und SEO-Text der Startseite.",
  fields: [
    { type: "text", name: "eyebrow", label: "Eyebrow (kleines Label)" },
    { type: "text", name: "h1", label: "Überschrift (H1)" },
    { type: "text", name: "heroWord1", label: "Hero-Wort 1 (serif)" },
    { type: "text", name: "heroWord2", label: "Hero-Wort 2 (sans)" },
    { type: "text", name: "brandsLabel", label: "Label über dem Partner-Band" },
    { type: "textarea", name: "lead", label: "Lead / Einleitung" },
    { type: "stringList", name: "intro", label: "Intro-Absätze", itemLabel: "Absatz" },
    {
      type: "objectList",
      name: "stats",
      label: "Kennzahlen",
      itemLabel: "Kennzahl",
      fields: [
        { type: "text", name: "value", label: "Wert" },
        { type: "text", name: "label", label: "Beschriftung" },
      ],
    },
    {
      type: "objectList",
      name: "usps",
      label: "Argumente (Warum wir)",
      itemLabel: "Argument",
      fields: [
        { type: "text", name: "title", label: "Titel" },
        { type: "textarea", name: "description", label: "Beschreibung" },
      ],
    },
    richSectionsField("sections", "SEO-Fließtext (Abschnitte)"),
    {
      type: "group",
      name: "cta",
      label: "Call-to-Action",
      fields: [
        { type: "text", name: "heading", label: "Überschrift" },
        { type: "textarea", name: "text", label: "Text" },
      ],
    },
  ],
};

/** Gemeinsames Schema für die beiden Leistungsseiten. */
function serviceSchema(key: string, label: string): DocSchema {
  return {
    key,
    label,
    group: "Leistungen",
    description:
      "Inhalte der Leistungsseite. Hinweis: Interne Felder (ID/Pfad) bleiben unverändert erhalten.",
    fields: [
      { type: "text", name: "title", label: "Titel" },
      { type: "textarea", name: "shortDescription", label: "Kurzbeschreibung" },
      { type: "stringList", name: "highlights", label: "Highlights", itemLabel: "Highlight" },
      {
        type: "group",
        name: "image",
        label: "Bild",
        fields: [
          { type: "image", name: "src", label: "Bilddatei" },
          { type: "text", name: "alt", label: "Alt-Text (Bildbeschreibung)" },
        ],
      },
      { type: "text", name: "metaTitle", label: "SEO-Titel (Meta Title)" },
      { type: "textarea", name: "metaDescription", label: "SEO-Beschreibung (Meta Description)" },
      { type: "text", name: "serviceType", label: "Leistungstyp" },
      { type: "stringList", name: "keywords", label: "Keywords", itemLabel: "Keyword" },
      { type: "textarea", name: "lead", label: "Lead / Kernantwort" },
      richSectionsField("sections", "SEO-Fließtext (Abschnitte)"),
      { type: "stringList", name: "benefits", label: "Vorteile", itemLabel: "Vorteil" },
      {
        type: "objectList",
        name: "process",
        label: "Ablauf / Vorgehen",
        itemLabel: "Schritt",
        fields: [
          { type: "text", name: "step", label: "Schritt" },
          { type: "textarea", name: "description", label: "Beschreibung" },
        ],
      },
      { type: "stringList", name: "industries", label: "Branchen", itemLabel: "Branche" },
      {
        type: "objectList",
        name: "faq",
        label: "FAQ (seitenspezifisch)",
        itemLabel: "Frage",
        fields: [
          { type: "text", name: "question", label: "Frage" },
          { type: "textarea", name: "answer", label: "Antwort" },
        ],
      },
    ],
  };
}

const referencesSchema: DocSchema = {
  key: "references",
  label: "Referenzen (Projekte)",
  group: "Referenzen",
  description: "Intro und Referenzprojekte (Case Studies).",
  fields: [
    { type: "stringList", name: "intro", label: "Intro-Absätze", itemLabel: "Absatz" },
    { type: "text", name: "projectsHeading", label: "Überschrift Projektliste" },
    { type: "text", name: "resultsLabel", label: "Label für Ergebnisse" },
    {
      type: "objectList",
      name: "projects",
      label: "Projekte",
      itemLabel: "Projekt",
      fields: [
        { type: "text", name: "title", label: "Titel" },
        { type: "textarea", name: "summary", label: "Kurzfassung" },
        { type: "stringList", name: "paragraphs", label: "Absätze", itemLabel: "Absatz" },
        { type: "stringList", name: "tags", label: "Technologien / Tags", itemLabel: "Tag" },
        { type: "stringList", name: "results", label: "Ergebnisse (optional)", itemLabel: "Ergebnis" },
      ],
    },
  ],
};

const faqSchema: DocSchema = {
  key: "faq",
  label: "FAQ (global)",
  group: "Global",
  description: "Häufige Fragen auf der Startseite.",
  fields: [
    {
      type: "objectList",
      name: "items",
      label: "Fragen & Antworten",
      itemLabel: "Frage",
      fields: [
        { type: "text", name: "question", label: "Frage" },
        { type: "textarea", name: "answer", label: "Antwort" },
      ],
    },
  ],
};

const personSchema: DocSchema = {
  key: "person",
  label: "Ansprechpartner",
  group: "Global",
  description: "Texte der „Ihr Ansprechpartner“-Sektion. Name/Bild kommen aus der Site-Konfiguration.",
  fields: [
    { type: "text", name: "eyebrow", label: "Eyebrow" },
    { type: "text", name: "heading", label: "Überschrift" },
    { type: "text", name: "role", label: "Rolle" },
    { type: "stringList", name: "bio", label: "Vorstellungstext", itemLabel: "Absatz" },
    { type: "text", name: "ctaLabel", label: "Button-Beschriftung" },
    { type: "text", name: "linkedinLabel", label: "LinkedIn-Button-Beschriftung" },
  ],
};

/** Schema für einfache Seiten (Referenzen-/Kontakt-Kopf). */
function simplePageSchema(key: string, label: string): DocSchema {
  return {
    key,
    label,
    group: "Seiten",
    description: "Überschrift, Lead und Textabschnitte der Seite.",
    fields: [
      { type: "text", name: "h1", label: "Überschrift (H1)" },
      { type: "textarea", name: "lead", label: "Lead / Einleitung" },
      richSectionsField("sections", "Abschnitte"),
    ],
  };
}

/** Alle bearbeitbaren Dokumente, in Anzeigereihenfolge. */
export const DOC_SCHEMAS: DocSchema[] = [
  homeSchema,
  serviceSchema("service.automation", "Leistung: Automation"),
  serviceSchema("service.retrofit", "Leistung: Retrofit"),
  simplePageSchema("page.referenzen", "Seite: Referenzen (Kopf)"),
  referencesSchema,
  simplePageSchema("page.kontakt", "Seite: Kontakt (Kopf)"),
  personSchema,
  faqSchema,
];

export function getDocSchema(key: string): DocSchema | undefined {
  return DOC_SCHEMAS.find((schema) => schema.key === key);
}
