import type { Locale } from "@/i18n/routing";

/**
 * Referenzprojekte (Case Studies) – Inhalt vom Design getrennt.
 * Quelle: bestehende Projektbeschreibungen des Ingenieurbüro Jungen.
 */

export type ReferenceProject = {
  title: string;
  summary: string;
  paragraphs: string[];
  /** Eingesetzte Technologien / Systeme. */
  tags: string[];
  /** Messbare Ergebnisse / Nutzen (E-E-A-T, KI-zitierbar). */
  results?: string[];
};

export type ReferencesContent = {
  intro: string[];
  projectsHeading: string;
  resultsLabel: string;
  projects: ReferenceProject[];
};

export const references: Record<Locale, ReferencesContent> = {
  de: {
    intro: [
      "Mit über 25 Jahren Erfahrung in der Industrieautomation – unter anderem in verschiedenen technischen Funktionen bei GE Automation & Controls sowie Emerson Machine Automation Solutions – bringe ich umfassendes Wissen zu modernen Steuerungstechnologien und praxiserprobten Lösungen in jedes Projekt ein.",
    ],
    projectsHeading: "Ausgewählte Projekte",
    resultsLabel: "Ergebnis",
    projects: [
      {
        title:
          "Steuerungs-Migration GE-Fanuc 90-30 → Emerson RX3i (Nuklearmedizin & Kläranlagen)",
        summary:
          "Umfassende Modernisierung abgekündigter GE-Fanuc-Steuerungen inklusive SCADA-Update auf GE Cimplicity.",
        paragraphs: [
          "Die Migration umfasste die Modernisierung der GE-Fanuc-Steuerungssysteme sowohl der nuklearmedizinischen Synthesemodul-Steuerungen als auch der zugehörigen Kläranlagen. Die abgekündigte GE-Fanuc 90-30-Serie wurde durch die leistungsfähige und zukunftssichere Emerson RX3i-Serie ersetzt; die bestehenden SCADA-Systeme wurden auf die aktuelle Version von GE Cimplicity aktualisiert.",
          "Die Maßnahme ermöglicht die nahtlose Integration der neuen RX3i-Steuerung in die bestehende Anlagenstruktur und eine zuverlässige Kommunikation zwischen allen Komponenten – von der Prozessführung der Kläranlagen bis zur Steuerung der Synthesemodule. Die Umsetzung erfolgte strukturiert und im laufenden Betrieb, um Stillstandszeiten zu minimieren.",
        ],
        tags: ["Emerson RX3i", "GE-Fanuc 90-30", "GE Cimplicity (SCADA)", "Retrofit"],
        results: [
          "Nahtlose Integration & konsistente Kommunikation",
          "Minimale Stillstandszeiten im laufenden Betrieb",
          "Höhere Effizienz, Betriebssicherheit und Zuverlässigkeit",
        ],
      },
      {
        title:
          "Datenerfassungssystem für die Wasserwirtschaft (Node-RED & Grafana)",
        summary:
          "Maßgeschneidertes, kosteneffizientes Datenerfassungssystem auf Open-Source-Basis mit Anbindung an Emerson-Steuerungen.",
        paragraphs: [
          "Auf Basis bewährter Open-Source-Technologien entstand ein flexibles Datenerfassungssystem: Node-RED übernimmt die effiziente Datenverarbeitung über Flussdiagramme, Grafana liefert eine leistungsstarke Plattform für Visualisierung und Analyse.",
          "Kernstück ist die nahtlose Anbindung an Emerson-Steuerungen über das OPC-UA-Protokoll. So lassen sich Prozessdaten sicher und effizient integrieren – als Grundlage für Überwachung, Analyse und datengestützte Entscheidungen.",
        ],
        tags: ["Node-RED", "Grafana", "OPC UA", "Emerson", "Open Source"],
        results: [
          "Kosteneffiziente, flexible Alternative",
          "Nahtlose Integration von Prozessdaten",
          "Datengestützte Entscheidungsfindung",
        ],
      },
      {
        title: "Vollautomatisches Crossflow-Filtersystem (Kellerei)",
        summary:
          "Hochentwickeltes Filtersystem auf Basis einer Emerson Web-Steuerung – für Effizienz, Präzision und einfache Bedienung.",
        paragraphs: [
          "Das System basiert auf einer fortschrittlichen Emerson Web-Steuerung, die alle Aspekte des Crossflow-Filtrationsprozesses nahtlos integriert und präzise steuert – von der Anpassung der Filterparameter bis zur Echtzeitüberwachung.",
          "Entwickelt für die anspruchsvollen Anforderungen in der Kellerei, kombiniert die Anlage herausragende Filtrationsleistung mit intelligenter Automatisierung und minimiert zugleich den Bedienaufwand.",
        ],
        tags: [
          "Emerson Web-Steuerung",
          "Prozessautomation",
          "Visualisierung",
          "Echtzeitüberwachung",
        ],
        results: [
          "Hohe Filtrationsleistung",
          "Intelligente Prozessoptimierung",
          "Minimaler Bedienaufwand",
        ],
      },
      {
        title:
          "Automatisierung Vibrating Compactor – Reel Aluminium / Xinfa (China)",
        summary:
          "Automatisierung eines Vibrationsverdichters auf Basis der Emerson RX3i-Steuerung für den Einsatz bei Xinfa Aluminium in China.",
        paragraphs: [
          "Umgesetzt wurden die Prozesslogik sowie die Steuerung von Vibration, Hubbewegungen und Verdichtung. Das komplette Materialhandling – Formenbeladung, Verdichtung, Entformen und Abtransport – wurde automatisiert, ergänzt um Visualisierung, Alarmierung und Diagnosefunktionen.",
          "Das Projekt verband Prozesssteuerung mit einem internationalen Projektumfeld und wurde erfolgreich beim Endkunden in China in Betrieb genommen.",
        ],
        tags: ["Emerson RX3i", "Prozesslogik", "Materialhandling", "Inbetriebnahme"],
        results: [
          "Stabile Prozesse & gleichbleibend hohe Produktqualität",
          "Reduzierter manueller Eingriff, höhere Anlagenverfügbarkeit",
          "Erfolgreiche Inbetriebnahme beim Endkunden in China",
        ],
      },
    ],
  },
  en: {
    intro: [
      "With over 25 years of experience in industrial automation – including various technical roles at GE Automation & Controls and Emerson Machine Automation Solutions – I bring comprehensive knowledge of modern control technologies and field-proven solutions to every project.",
    ],
    projectsHeading: "Selected projects",
    resultsLabel: "Outcome",
    projects: [
      {
        title:
          "Control migration GE-Fanuc 90-30 → Emerson RX3i (nuclear medicine & wastewater plants)",
        summary:
          "Comprehensive modernisation of discontinued GE-Fanuc controls including a SCADA update to GE Cimplicity.",
        paragraphs: [
          "The migration covered the modernisation of the GE-Fanuc control systems for both the nuclear-medicine synthesis-module controls and the associated wastewater treatment plants. The discontinued GE-Fanuc 90-30 series was replaced by the powerful and future-proof Emerson RX3i series; the existing SCADA systems were updated to the current version of GE Cimplicity.",
          "This enables the seamless integration of the new RX3i control into the existing plant structure and reliable communication between all components – from process control of the wastewater plants to the control of the synthesis modules. The work was carried out in a structured manner during ongoing operation to minimise downtime.",
        ],
        tags: ["Emerson RX3i", "GE-Fanuc 90-30", "GE Cimplicity (SCADA)", "Retrofit"],
        results: [
          "Seamless integration & consistent communication",
          "Minimal downtime during ongoing operation",
          "Higher efficiency, operational safety and reliability",
        ],
      },
      {
        title: "Data acquisition system for the water industry (Node-RED & Grafana)",
        summary:
          "Tailored, cost-efficient data acquisition system based on open source, connected to Emerson controls.",
        paragraphs: [
          "Built on proven open-source technologies, a flexible data acquisition system was created: Node-RED handles efficient data processing via flow diagrams, while Grafana provides a powerful platform for visualisation and analysis.",
          "At its core is the seamless connection to Emerson controls via the OPC UA protocol. This allows process data to be integrated securely and efficiently – as a basis for monitoring, analysis and data-driven decisions.",
        ],
        tags: ["Node-RED", "Grafana", "OPC UA", "Emerson", "Open source"],
        results: [
          "Cost-efficient, flexible alternative",
          "Seamless integration of process data",
          "Data-driven decision-making",
        ],
      },
      {
        title: "Fully automatic cross-flow filtration system (winery)",
        summary:
          "Sophisticated filtration system based on an Emerson web control – for efficiency, precision and easy operation.",
        paragraphs: [
          "The system is based on an advanced Emerson web control that seamlessly integrates and precisely controls all aspects of the cross-flow filtration process – from adjusting the filter parameters to real-time monitoring.",
          "Developed for the demanding requirements of the winery, the plant combines outstanding filtration performance with intelligent automation while minimising the operating effort.",
        ],
        tags: [
          "Emerson web control",
          "Process automation",
          "Visualisation",
          "Real-time monitoring",
        ],
        results: [
          "High filtration performance",
          "Intelligent process optimisation",
          "Minimal operating effort",
        ],
      },
      {
        title:
          "Automation of a vibrating compactor – Reel Aluminium / Xinfa (China)",
        summary:
          "Automation of a vibrating compactor based on the Emerson RX3i control for use at Xinfa Aluminium in China.",
        paragraphs: [
          "The process logic as well as the control of vibration, lifting movements and compaction were implemented. The complete material handling – mould loading, compaction, demoulding and removal – was automated, supplemented by visualisation, alarming and diagnostic functions.",
          "The project combined process control with an international project environment and was successfully commissioned at the end customer in China.",
        ],
        tags: ["Emerson RX3i", "Process logic", "Material handling", "Commissioning"],
        results: [
          "Stable processes & consistently high product quality",
          "Reduced manual intervention, higher plant availability",
          "Successful commissioning at the end customer in China",
        ],
      },
    ],
  },
};

export function getReferences(locale: Locale): ReferencesContent {
  return references[locale];
}
