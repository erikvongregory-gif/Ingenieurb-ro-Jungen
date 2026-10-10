/**
 * Zentrale Inhalte der Website (Single Source of Truth).
 * Quelle: ib-jungen.de und die Angaben von Frank Jungen.
 */

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ib-jungen.de").replace(/\/+$/, ""),
  altDomain: "all-about-industrial-automation.de",
  name: "Ingenieurbüro Jungen",
  shortName: "IB Jungen",
  tagline: "All About Industrial Automation",
  claim: "Messen Sie uns an Ihren Herausforderungen.",
  description:
    "Ingenieurbüro für Industrieautomation und Retrofit: Maschinenautomatisierung, Robotik, IIoT und die Modernisierung bestehender Steuerungen. Herstellerunabhängig, seit über 25 Jahren.",
  vatId: "DE365597105",
  contact: {
    email: "fjungen@ib-jungen.de",
    phone: "+491725669504",
    phoneDisplay: "+49 172 566 9504",
  },
  address: {
    street: "Hauptstr. 32",
    postalCode: "86925",
    city: "Fuchstal-Leeder",
    region: "Bayern",
    country: "DE",
  },
  person: {
    name: "Frank Jungen",
    role: "Inhaber, Dipl.-Ing.",
    image: "/team/frank-jungen-hd.webp",
    linkedin: "https://www.linkedin.com/in/frank-jungen-15302664/",
  },
} as const;

export const nav = [
  { href: "/automation", label: "Automation" },
  { href: "/retrofit", label: "Retrofit" },
  { href: "/referenzen", label: "Referenzen" },
  { href: "/#profil", label: "Profil" },
] as const;

export const facts = [
  { value: 25, suffix: "+", label: "Jahre Erfahrung in der Industrieautomation" },
  { value: 2, suffix: "", label: "Hersteller-Stationen: GE Automation & Controls und Emerson" },
  { value: 4, suffix: "", label: "Branchen in den Referenzen: Medizin, Wasser, Getränke, Metall" },
  { value: 1, suffix: "", label: "fester Ansprechpartner vom Konzept bis zur Inbetriebnahme" },
] as const;

/** Hersteller und Technologien, mit denen gearbeitet wird. */
export const technologies = [
  "Emerson",
  "GE",
  "Siemens",
  "Schneider Electric",
  "Beckhoff",
  "CODESYS",
  "Node-RED",
  "Grafana",
  "Linux",
  "OPC UA",
] as const;

export const services = {
  automation: {
    index: "01",
    title: "Automation",
    href: "/automation",
    lead: "Innovative Automatisierungslösungen, seit über 25 Jahren.",
    summary:
      "Wir entwickeln Automatisierungslösungen, die Technik, Effizienz und Zukunftsvision verbinden. Zahlreiche Projekte, von einfach bis hochkomplex, belegen unsere Kompetenz.",
    scope: [
      {
        title: "Diskrete Maschinenautomatisierung",
        text: "Steuerungskonzept, Prozesslogik, SPS-Programmierung nach IEC 61131-3, Visualisierung und Inbetriebnahme vor Ort.",
      },
      {
        title: "Robotik",
        text: "Integration von Robotern in Maschinen und Anlagen, von der Ablaufplanung bis zur sicheren Übergabe.",
      },
      {
        title: "Industrial Internet of Things",
        text: "Vernetzte Systeme, die Daten in Echtzeit erfassen und analysieren und so die Effizienz Ihrer Produktion messbar steigern.",
      },
    ],
    openSource: [
      { name: "Linux", text: "Stabile, sichere Basis für Steuerungs- und Edge-Systeme." },
      { name: "Node-RED", text: "Modulare Automatisierungs- und IoT-Workflows." },
      { name: "Grafana", text: "Leistungsstarke Visualisierung und Monitoring." },
      { name: "CODESYS", text: "Herstellerunabhängige Plattform nach IEC 61131-3." },
    ],
  },
  retrofit: {
    index: "02",
    title: "Retrofit",
    href: "/retrofit",
    lead: "Ihr erfahrener Partner für die Modernisierung automatisierter Systeme.",
    summary:
      "Wir bringen bestehende Automatisierungssysteme auf den neuesten Stand der Technik. Das steigert die Effizienz und verlängert die Lebensdauer Ihrer Anlagen, ohne die bewährte Mechanik zu ersetzen.",
    steps: [
      {
        title: "Analyse und Bewertung",
        text: "Wir nehmen Ihr bestehendes Automatisierungssystem auf: Steuerung, Visualisierung, Schnittstellen, Dokumentation und Ersatzteilsituation.",
      },
      {
        title: "Retrofit-Konzept",
        text: "Wir entwickeln ein Konzept für eine reibungslose Integration in die bestehende Anlagenstruktur, mit Plan für minimale Stillstandszeiten.",
      },
      {
        title: "Implementierung",
        text: "Moderne Steuerungs- und Softwarelösungen werden strukturiert umgesetzt und, wo nötig, im laufenden Betrieb migriert.",
      },
      {
        title: "Schulung und Support",
        text: "Ihr Team wird eingewiesen, damit die Anlage effizient betrieben wird. Danach bleiben wir Ihr Ansprechpartner.",
      },
    ],
    why: [
      "Maßgeschneiderte Lösungen für Ihre individuellen Anforderungen",
      "Erfahrene Ingenieure für eine professionelle Umsetzung",
      "Moderne Technologien für optimale Leistung und Zuverlässigkeit",
    ],
  },
} as const;

export type Reference = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  paragraphs: string[];
  tags: string[];
  results: string[];
};

export const references: Reference[] = [
  {
    slug: "migration-rx3i",
    sector: "Nuklearmedizin & Kläranlagen",
    title: "Migration GE-Fanuc 90-30 auf Emerson RX3i",
    summary:
      "Modernisierung abgekündigter Steuerungen für Synthesemodule und Kläranlagen, inklusive SCADA-Update auf GE Cimplicity.",
    paragraphs: [
      "Die Migration umfasste die Steuerungssysteme der nuklearmedizinischen Synthesemodule und der zugehörigen Kläranlagen. Die abgekündigte GE-Fanuc 90-30-Serie wurde durch die zukunftssichere Emerson RX3i-Serie ersetzt, die SCADA-Systeme auf die aktuelle Version von GE Cimplicity gebracht.",
      "Die neue Steuerung fügt sich nahtlos in die bestehende Anlagenstruktur ein und kommuniziert zuverlässig mit allen Komponenten. Die Umsetzung erfolgte strukturiert im laufenden Betrieb, um Stillstandszeiten zu minimieren.",
    ],
    tags: ["Emerson RX3i", "GE-Fanuc 90-30", "GE Cimplicity", "Retrofit"],
    results: [
      "Migration im laufenden Betrieb",
      "Konsistente Kommunikation aller Komponenten",
      "Mehr Betriebssicherheit und Zuverlässigkeit",
    ],
  },
  {
    slug: "datenerfassung-wasser",
    sector: "Wasserwirtschaft",
    title: "Datenerfassung mit Node-RED und Grafana",
    summary:
      "Maßgeschneidertes, kosteneffizientes Datenerfassungssystem auf Open-Source-Basis, angebunden an Emerson-Steuerungen über OPC UA.",
    paragraphs: [
      "Node-RED übernimmt die Datenverarbeitung über Flussdiagramme, Grafana liefert Visualisierung und Analyse. Das System lässt sich flexibel an spezifische Anforderungen anpassen.",
      "Kernstück ist die Anbindung an Emerson-Steuerungen über OPC UA. Prozessdaten fließen sicher und effizient in das System und bilden die Grundlage für Überwachung, Analyse und datengestützte Entscheidungen.",
    ],
    tags: ["Node-RED", "Grafana", "OPC UA", "Emerson", "Open Source"],
    results: [
      "Kosteneffiziente Alternative zu proprietären Systemen",
      "Nahtlose Integration der Prozessdaten",
      "Basis für datengestützte Entscheidungen",
    ],
  },
  {
    slug: "crossflow-kellerei",
    sector: "Getränke / Kellerei",
    title: "Vollautomatisches Crossflow-Filtersystem",
    summary:
      "Filtersystem auf Basis einer Emerson Web-Steuerung, ausgelegt auf Effizienz, Präzision und einfache Bedienung.",
    paragraphs: [
      "Die Emerson Web-Steuerung integriert und steuert alle Aspekte der Crossflow-Filtration, von der Anpassung der Filterparameter bis zur Echtzeitüberwachung, über eine benutzerfreundliche Oberfläche.",
      "Die Anlage erfüllt die anspruchsvollen Anforderungen der Kellerei und verbindet hohe Filtrationsleistung mit intelligenter Automatisierung bei minimalem Bedienaufwand.",
    ],
    tags: ["Emerson Web-Steuerung", "Prozessautomation", "Visualisierung"],
    results: [
      "Hohe Filtrationsleistung",
      "Echtzeitüberwachung aller Parameter",
      "Minimaler Bedienaufwand",
    ],
  },
  {
    slug: "vibrating-compactor",
    sector: "Aluminium / International",
    title: "Vibrating Compactor für Reel Aluminium / Xinfa",
    summary:
      "Automatisierung eines Vibrationsverdichters auf Basis der Emerson RX3i für den Einsatz bei Xinfa Aluminium in China.",
    paragraphs: [
      "Umgesetzt wurden die Prozesslogik und die Steuerung von Vibration, Hubbewegungen und Verdichtung. Das komplette Materialhandling, von der Formenbeladung über Verdichtung und Entformen bis zum Abtransport, wurde automatisiert, ergänzt um Visualisierung, Alarmierung und Diagnose.",
      "Das Projekt verband Prozesssteuerung mit einem internationalen Umfeld und wurde beim Endkunden in China erfolgreich in Betrieb genommen.",
    ],
    tags: ["Emerson RX3i", "Prozesslogik", "Materialhandling", "Inbetriebnahme"],
    results: [
      "Stabile Prozesse, gleichbleibende Qualität",
      "Weniger manuelle Eingriffe, höhere Verfügbarkeit",
      "Inbetriebnahme beim Endkunden in China",
    ],
  },
];

export const profile = {
  heading: "Persönlich verantwortlich für Ihr Projekt.",
  bio: [
    "Hinter dem Ingenieurbüro Jungen steht Frank Jungen. Über 25 Jahre Industrieautomation, darunter verschiedene technische Funktionen bei GE Automation & Controls und Emerson Machine Automation Solutions. Dieses Wissen über Steuerungstechnik aus Herstellersicht fließt in jedes Projekt ein.",
    "Sie haben einen festen Ansprechpartner, der Technik und Termine im Blick behält und Ihre Anlage versteht. Herstellerunabhängig, mit klarem Blick auf Ihre Anforderungen.",
  ],
  career: [
    { org: "GE Automation & Controls", text: "Verschiedene technische Funktionen" },
    { org: "Emerson Machine Automation Solutions", text: "Verschiedene technische Funktionen" },
    { org: "Ingenieurbüro Jungen", text: "Inhaber, Automation & Retrofit" },
  ],
};

export const usefulLinks = [
  { label: "Emerson Automation", href: "https://www.emerson.com/de-de" },
  { label: "Emerson Machine Automation Support", href: "https://emerson-mas.my.site.com/communities/CC_Login" },
  { label: "GE Digital Support", href: "https://digitalsupport.ge.com/s/?language=en_US" },
  { label: "CODESYS Group", href: "https://de.codesys.com/" },
  { label: "CODESYS Store", href: "https://store.codesys.com/de/" },
  { label: "Beckhoff", href: "https://www.beckhoff.com/de-de/" },
  { label: "Siemens Industry Support", href: "https://support.industry.siemens.com/cs/start?lc=de-DE" },
  { label: "Fieron Automation GmbH", href: "https://fieron.com/" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
