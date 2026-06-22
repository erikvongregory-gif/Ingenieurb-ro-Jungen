import type { Locale, AppPathname } from "@/i18n/routing";
import type { FaqItem, RichSection } from "./types";

/**
 * STRUKTURIERTE LEISTUNGS-DATEN (Content-Layer)
 * ------------------------------------------------------------------
 * Inhalte sind vom Design getrennt: Seiten lesen nur diese Daten aus.
 * Die Texte sind SEO-optimierte, aber natürlich formulierte Inhalte für die
 * Nische "Industrieautomation / Retrofit" und können frei verfeinert werden.
 *
 * SEO-Logik je Service:
 *  - metaTitle/metaDescription → Suchergebnis-Snippet (≤ ~60/155 Zeichen)
 *  - keywords                  → Keyword-Cluster der Unterseite
 *  - lead                      → Antwort in 1–2 Sätzen (Featured Snippet / AEO)
 *  - sections                  → SEO-Fließtext mit H2-Struktur
 *  - benefits / process / faq  → Mehrwert + zitierfähige Q&A (FAQPage-Schema)
 */

export type LocalizedService = {
  id: string;
  pathname: Extract<AppPathname, "/automation" | "/retrofit">;
  title: string;
  shortDescription: string;
  /** Kurze Kern-Highlights für die Leistungsübersicht (Startseite). */
  highlights: string[];
  /** Repräsentatives Foto für die Leistungsübersicht. */
  image: { src: string; alt: string };
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  keywords: string[];
  /** Kurze, eigenständig zitierbare Kernantwort (Lead). */
  lead: string;
  /** SEO-Fließtext in Abschnitten mit H2-Überschriften. */
  sections: RichSection[];
  benefits: string[];
  /** Vorgehen / Ablauf (für Process-Verständnis & "How"-Antworten). */
  process: { step: string; description: string }[];
  /** Branchen / typische Einsatzbereiche. */
  industries: string[];
  /** Seitenspezifische FAQ (FAQPage-Schema). */
  faq: FaqItem[];
};

type ServiceMap = Record<Locale, LocalizedService[]>;

export const services: ServiceMap = {
  de: [
    {
      id: "automation",
      pathname: "/automation",
      title: "Automation",
      shortDescription:
        "Industrieautomation von der Konzeption über die SPS-Programmierung bis zur Inbetriebnahme – herstellerunabhängig aus einer Hand.",
      highlights: [
        "Diskrete Maschinenautomatisierung & Robotik",
        "SPS-Programmierung (CODESYS, IEC 61131-3)",
        "IIoT, Visualisierung & Inbetriebnahme",
      ],
      image: {
        src: "/services/automation.png",
        alt: "Moderner Steuerungsschrank mit SPS, HMI und Antriebstechnik in einer Produktionsanlage",
      },
      metaTitle: "Industrieautomation & SPS-Programmierung",
      metaDescription:
        "Industrieautomation aus einer Hand: SPS-Programmierung, SCADA, HMI und Inbetriebnahme. Herstellerunabhängig, effizient und zukunftssicher. Jetzt anfragen.",
      serviceType: "Industrieautomation",
      keywords: [
        "Industrieautomation",
        "SPS-Programmierung",
        "PLC Programmierung",
        "Automatisierungstechnik",
        "SCADA",
        "HMI Visualisierung",
        "Steuerungstechnik",
        "Anlagenautomatisierung",
        "Siemens TIA Portal",
        "SIMATIC S7",
        "Beckhoff TwinCAT",
        "Inbetriebnahme",
      ],
      lead: "Industrieautomation umfasst die Planung, Programmierung und Inbetriebnahme von Steuerungen für Maschinen und Anlagen. Das Ingenieurbüro Jungen realisiert diese Automatisierungslösungen herstellerunabhängig und durchgängig aus einer Hand.",
      sections: [
        {
          heading: "Industrieautomation aus einer Hand",
          paragraphs: [
            "Wir entwickeln und realisieren maßgeschneiderte Lösungen der Automatisierungstechnik für Maschinen, Anlagen und Produktionsprozesse. Von der ersten Konzeptidee über das Engineering und die SPS-Programmierung bis zur Inbetriebnahme vor Ort erhalten Sie alle Leistungen aus einer Hand – mit einem festen Ansprechpartner und durchgängiger Verantwortung.",
            "Im Mittelpunkt steht dabei immer Ihr Prozess: Wir analysieren Ihre Anforderungen, identifizieren Optimierungspotenziale und setzen eine Automatisierung um, die Verfügbarkeit, Effizienz und Prozesssicherheit messbar erhöht.",
          ],
        },
        {
          heading: "SPS-Programmierung für Maschinen und Anlagen",
          paragraphs: [
            "Den Kern jeder Automatisierung bildet die SPS-Programmierung. Wir programmieren speicherprogrammierbare Steuerungen (SPS/PLC) strukturiert, normgerecht und wartbar – damit Ihre Anlage zuverlässig läuft und auch nach Jahren noch erweiterbar bleibt.",
            "Dabei setzen wir auf standardisierte, dokumentierte Programmstrukturen und etablierte Engineering-Methoden. Das senkt Fehlerquellen, beschleunigt die Inbetriebnahme und erleichtert die spätere Wartung.",
          ],
          bullets: [
            "SPS-Programmierung mit Siemens SIMATIC S7 (TIA Portal, STEP 7)",
            "Beckhoff TwinCAT und weitere gängige Steuerungsplattformen",
            "Strukturierter, dokumentierter und wiederverwendbarer Code",
            "Schnittstellen zu Antrieben, Sensorik, Robotik und IT-Systemen",
          ],
        },
        {
          heading: "Visualisierung: HMI und SCADA",
          paragraphs: [
            "Eine gute Bedienoberfläche macht Anlagen transparent und sicher bedienbar. Wir entwickeln HMI- und SCADA-Visualisierungen, mit denen Ihr Personal Prozesse im Blick behält, Störungen schnell erkennt und gezielt eingreifen kann.",
            "Ob lokale Maschinenbedienung am HMI-Panel oder anlagenweite Prozessführung über ein SCADA-System – wir setzen die für Ihre Anforderungen passende Lösung um, inklusive Meldewesen, Trends und Datenanbindung.",
          ],
        },
        {
          heading: "Engineering, Inbetriebnahme und Support",
          paragraphs: [
            "Neben der Programmierung übernehmen wir das komplette Engineering: Auslegung der Hardware, Konzeption der Steuerungsarchitektur und Planung der Schnittstellen. Bei der Inbetriebnahme vor Ort bringen wir Ihre Anlage zuverlässig zum Laufen und optimieren sie im realen Betrieb.",
            "Auch nach dem Projekt bleiben wir Ihr Ansprechpartner – für Anpassungen, Erweiterungen und schnellen Support im Störungsfall.",
          ],
        },
        {
          heading: "Herstellerunabhängige Automatisierung",
          paragraphs: [
            "Weil wir herstellerunabhängig arbeiten, empfehlen wir nicht das, was wir gerade verkaufen wollen, sondern die Technik, die für Ihre Anwendung am sinnvollsten ist. So erhalten Sie eine zukunftssichere Lösung mit guter Ersatzteilverfügbarkeit und ohne unnötige Abhängigkeiten.",
          ],
        },
      ],
      benefits: [
        "Alles aus einer Hand: Konzept, Engineering, Programmierung und Inbetriebnahme",
        "Herstellerunabhängige Automatisierung (u. a. Siemens, Beckhoff, Rockwell)",
        "Höhere Verfügbarkeit, Effizienz und Prozesssicherheit Ihrer Anlagen",
        "Saubere Dokumentation und wartbarer, standardisierter SPS-Code",
        "Fester Ansprechpartner über die gesamte Projektlaufzeit",
      ],
      process: [
        {
          step: "Analyse & Konzept",
          description:
            "Aufnahme der Anforderungen, Prozessanalyse und Erarbeitung eines tragfähigen Automatisierungskonzepts.",
        },
        {
          step: "Engineering & Programmierung",
          description:
            "Hardware-Auslegung, SPS-Programmierung sowie HMI-/SCADA-Visualisierung nach Industriestandard.",
        },
        {
          step: "Inbetriebnahme & Support",
          description:
            "Inbetriebnahme vor Ort, Optimierung im laufenden Betrieb und zuverlässiger Support.",
        },
      ],
      industries: [
        "Maschinen- und Anlagenbau",
        "Sondermaschinenbau",
        "Produktions- und Prozessautomatisierung",
        "Fördertechnik und Logistik",
      ],
      faq: [
        {
          question: "Welche SPS-Systeme programmieren Sie?",
          answer:
            "Wir programmieren herstellerunabhängig, schwerpunktmäßig Siemens SIMATIC S7 (TIA Portal, STEP 7) sowie Beckhoff TwinCAT und weitere gängige Steuerungen.", // TODO: bestätigen
        },
        {
          question: "Übernehmen Sie auch die Inbetriebnahme vor Ort?",
          answer:
            "Ja, wir begleiten die Automatisierung von der Programmierung bis zur Inbetriebnahme vor Ort inklusive Test und Optimierung im laufenden Betrieb.",
        },
        {
          question: "Was unterscheidet HMI und SCADA?",
          answer:
            "Ein HMI dient der lokalen Bedienung einer Maschine, während ein SCADA-System ganze Anlagen überwacht und steuert – inklusive Meldewesen, Trends und Datenanbindung.",
        },
      ],
    },
    {
      id: "retrofit",
      pathname: "/retrofit",
      title: "Retrofit",
      shortDescription:
        "Modernisierung und Retrofit bestehender Maschinen und Steuerungen – nachhaltig und wirtschaftlich statt teurem Neukauf.",
      highlights: [
        "Analyse & Bewertung bestehender Anlagen",
        "Austausch veralteter Steuerungen",
        "Längere Lebensdauer statt teurem Neukauf",
      ],
      image: {
        src: "/services/retrofit.png",
        alt: "Modernisierter Schaltschrank an einer bestehenden Maschine – Retrofit im laufenden Betrieb",
      },
      metaTitle: "Retrofit & Modernisierung von Maschinen",
      metaDescription:
        "Retrofit für Maschinen und Anlagen: Steuerungsmodernisierung, Migration veralteter SPS und Schaltschrankbau. Mehr Lebensdauer, weniger Stillstand. Jetzt anfragen.",
      serviceType: "Retrofit / Modernisierung",
      keywords: [
        "Retrofit",
        "Maschinen Retrofit",
        "Steuerungsmodernisierung",
        "SPS Migration",
        "S5 auf S7 migrieren",
        "Anlagenmodernisierung",
        "Schaltschrankbau",
        "Altanlagen modernisieren",
        "Obsoleszenz Management",
        "Maschinen nachrüsten",
      ],
      lead: "Retrofit ist die Modernisierung bestehender Maschinen durch Erneuerung der Steuerungstechnik. Das Ingenieurbüro Jungen verlängert damit die Lebensdauer Ihrer Anlagen, erhöht die Verfügbarkeit und ersetzt abgekündigte Komponenten – nachhaltig und kostengünstiger als ein Neukauf.",
      sections: [
        {
          heading: "Was bedeutet Retrofit?",
          paragraphs: [
            "Beim Retrofit wird eine bestehende Maschine oder Anlage modernisiert, statt sie komplett zu ersetzen. In der Regel bleibt die bewährte Mechanik erhalten, während die veraltete Steuerungs- und Elektrotechnik auf den aktuellen Stand gebracht wird.",
            "So holen Sie Ihre Anlagen technisch in die Gegenwart: bessere Verfügbarkeit, moderne Bedienung, verlässliche Ersatzteilversorgung – bei deutlich geringeren Kosten als bei einer Neuinvestition.",
          ],
        },
        {
          heading: "Steuerungsmodernisierung und SPS-Migration",
          paragraphs: [
            "Veraltete oder abgekündigte Steuerungen sind ein Risiko: Ersatzteile werden knapp, Know-how geht verloren und ein Ausfall kann zu langem Stillstand führen. Mit einer Steuerungsmodernisierung migrieren wir Ihre Anlage auf eine aktuelle, langfristig verfügbare Plattform.",
            "Wir migrieren bestehende SPS-Programme auf moderne Systeme und erhalten dabei die Funktion Ihrer Anlage – mit dem Ziel minimaler Stillstandzeiten beim Umbau.",
          ],
          bullets: [
            "Migration veralteter SPS auf moderne Steuerungen (z. B. Siemens S7-1500)",
            "Umstieg von SIMATIC S5 oder S7-300 auf aktuelle Systeme",
            "Erneuerung von Bedien- und Visualisierungstechnik (HMI/SCADA)",
            "Erhalt der bewährten Anlagenfunktion mit moderner Technik",
          ],
        },
        {
          heading: "Schaltschrankbau und Elektroplanung",
          paragraphs: [
            "Zur Modernisierung gehört häufig ein neuer oder umgebauter Schaltschrank. Wir planen und realisieren den Schaltschrankbau passend zur neuen Steuerungstechnik – normgerecht, sauber dokumentiert und auf Wartbarkeit ausgelegt.",
          ],
        },
        {
          heading: "Retrofit oder Neuanschaffung?",
          paragraphs: [
            "Ein Retrofit ist meist die wirtschaftlichere und nachhaltigere Wahl: Sie sparen die Investition in eine komplett neue Maschine, vermeiden lange Lieferzeiten und reduzieren Ressourcenverbrauch. Voraussetzung ist eine grundsätzlich gute mechanische Substanz.",
            "Wir bewerten in einer Bestandsaufnahme ehrlich, ob sich ein Retrofit für Ihre Anlage lohnt – und zeigen Ihnen die zu erwartenden Vorteile auf.",
          ],
        },
        {
          heading: "Obsoleszenzmanagement",
          paragraphs: [
            "Damit Sie nicht erst beim Ausfall reagieren, unterstützen wir Sie beim vorausschauenden Umgang mit abgekündigten Komponenten. So planen Sie Modernisierungen rechtzeitig und vermeiden teure ungeplante Stillstände.",
          ],
        },
      ],
      benefits: [
        "Deutlich längere Lebensdauer Ihrer bestehenden Anlagen",
        "Migration abgekündigter (obsoleter) Steuerungen auf moderne Systeme",
        "Weniger ungeplante Stillstände und bessere Ersatzteilverfügbarkeit",
        "Nachhaltige, kosteneffiziente Alternative zur Neuinvestition",
        "Minimale Stillstandzeit durch sorgfältige Umbauplanung",
      ],
      process: [
        {
          step: "Bestandsaufnahme",
          description:
            "Analyse der vorhandenen Steuerung, Mechanik und Dokumentation sowie Bewertung des Modernisierungspotenzials.",
        },
        {
          step: "Migrationskonzept",
          description:
            "Planung der Migration auf moderne Steuerungstechnik inkl. Schaltschrankbau und Risikobetrachtung.",
        },
        {
          step: "Umbau & Wiederinbetriebnahme",
          description:
            "Umsetzung mit minimaler Stillstandzeit, Test und Wiederinbetriebnahme der modernisierten Anlage.",
        },
      ],
      industries: [
        "Maschinen- und Anlagenbau",
        "Produktionsanlagen mit Altsteuerungen",
        "Sondermaschinen",
        "Förder- und Handhabungstechnik",
      ],
      faq: [
        {
          question: "Wann lohnt sich ein Retrofit gegenüber einem Neukauf?",
          answer:
            "Ein Retrofit lohnt sich, wenn die Mechanik der Maschine noch gut ist, aber die Steuerung veraltet oder abgekündigt ist. Er ist dann meist deutlich günstiger und nachhaltiger als eine Neuanschaffung.",
        },
        {
          question: "Können Sie eine SIMATIC S5 auf S7 migrieren?",
          answer:
            "Ja, die Migration veralteter Steuerungen wie SIMATIC S5 oder S7-300 auf aktuelle Systeme (z. B. S7-1500) gehört zu unseren Kernleistungen im Retrofit.", // TODO: bestätigen
        },
        {
          question: "Wie lange steht meine Anlage beim Retrofit still?",
          answer:
            "Durch sorgfältige Vorbereitung und ein durchdachtes Migrationskonzept halten wir die Stillstandzeit so kurz wie möglich. Den konkreten Zeitrahmen klären wir vorab anhand der Bestandsaufnahme.",
        },
      ],
    },
  ],
  en: [
    {
      id: "automation",
      pathname: "/automation",
      title: "Automation",
      shortDescription:
        "Industrial automation from concept and PLC programming through to commissioning – vendor-independent and from a single source.",
      highlights: [
        "Discrete machine automation & robotics",
        "PLC programming (CODESYS, IEC 61131-3)",
        "IIoT, visualization & commissioning",
      ],
      image: {
        src: "/services/automation.png",
        alt: "Modern control cabinet with PLC, HMI and drive technology in a production plant",
      },
      metaTitle: "Industrial Automation & PLC Programming",
      metaDescription:
        "End-to-end industrial automation: PLC programming, SCADA, HMI and commissioning. Vendor-independent, efficient and future-proof. Get in touch.",
      serviceType: "Industrial Automation",
      keywords: [
        "industrial automation",
        "PLC programming",
        "automation engineering",
        "SCADA",
        "HMI visualization",
        "control systems",
        "machine automation",
        "Siemens TIA Portal",
        "SIMATIC S7",
        "Beckhoff TwinCAT",
        "commissioning",
      ],
      lead: "Industrial automation covers the design, programming and commissioning of controls for machines and plants. Ingenieurbüro Jungen delivers these automation solutions vendor-independently and from a single source.",
      sections: [
        {
          heading: "Industrial automation from a single source",
          paragraphs: [
            "We design and implement tailored automation solutions for machines, plants and production processes. From the initial concept through engineering and PLC programming to on-site commissioning, you receive every service from a single source – with one dedicated contact and end-to-end responsibility.",
            "Your process is always at the centre: we analyse your requirements, identify optimization potential and implement automation that measurably increases availability, efficiency and process reliability.",
          ],
        },
        {
          heading: "PLC programming for machines and plants",
          paragraphs: [
            "PLC programming is the core of every automation project. We program programmable logic controllers (PLC) in a structured, standards-based and maintainable way – so your plant runs reliably and remains extensible for years.",
            "We rely on standardized, documented program structures and proven engineering methods. This reduces sources of error, speeds up commissioning and simplifies later maintenance.",
          ],
          bullets: [
            "PLC programming with Siemens SIMATIC S7 (TIA Portal, STEP 7)",
            "Beckhoff TwinCAT and other common control platforms",
            "Structured, documented and reusable code",
            "Interfaces to drives, sensors, robotics and IT systems",
          ],
        },
        {
          heading: "Visualization: HMI and SCADA",
          paragraphs: [
            "A good operator interface makes plants transparent and safe to operate. We develop HMI and SCADA visualizations that keep your staff in control of processes, detect faults quickly and enable targeted intervention.",
            "Whether local machine operation on an HMI panel or plant-wide process control via a SCADA system – we implement the right solution for your requirements, including alarming, trends and data connectivity.",
          ],
        },
        {
          heading: "Engineering, commissioning and support",
          paragraphs: [
            "Beyond programming, we handle the complete engineering: hardware design, control architecture and interface planning. During on-site commissioning we get your plant running reliably and optimize it in real operation.",
            "Even after the project we remain your contact – for adjustments, extensions and fast support in case of faults.",
          ],
        },
        {
          heading: "Vendor-independent automation",
          paragraphs: [
            "Because we work vendor-independently, we recommend the technology that makes most sense for your application – not what we happen to sell. The result is a future-proof solution with good spare-part availability and without unnecessary lock-in.",
          ],
        },
      ],
      benefits: [
        "Everything from one source: concept, engineering, programming and commissioning",
        "Vendor-independent automation (Siemens, Beckhoff, Rockwell and more)",
        "Higher availability, efficiency and process reliability",
        "Clean documentation and maintainable, standardized PLC code",
        "One dedicated contact throughout the project",
      ],
      process: [
        {
          step: "Analysis & concept",
          description:
            "Requirements capture, process analysis and a solid automation concept.",
        },
        {
          step: "Engineering & programming",
          description:
            "Hardware design, PLC programming and HMI/SCADA visualization to industry standards.",
        },
        {
          step: "Commissioning & support",
          description:
            "On-site commissioning, optimization during operation and reliable support.",
        },
      ],
      industries: [
        "Machinery and plant engineering",
        "Special-purpose machinery",
        "Production and process automation",
        "Conveying technology and logistics",
      ],
      faq: [
        {
          question: "Which PLC systems do you program?",
          answer:
            "We program vendor-independently, focusing on Siemens SIMATIC S7 (TIA Portal, STEP 7) as well as Beckhoff TwinCAT and other common controllers.",
        },
        {
          question: "Do you handle on-site commissioning?",
          answer:
            "Yes, we support automation from programming to on-site commissioning, including testing and optimization during operation.",
        },
        {
          question: "What is the difference between HMI and SCADA?",
          answer:
            "An HMI is used for local machine operation, whereas a SCADA system monitors and controls entire plants – including alarming, trends and data connectivity.",
        },
      ],
    },
    {
      id: "retrofit",
      pathname: "/retrofit",
      title: "Retrofit",
      shortDescription:
        "Modernization and retrofit of existing machines and controls – sustainable and economical instead of buying new.",
      highlights: [
        "Analysis & assessment of existing plants",
        "Replacement of outdated controls",
        "Longer service life instead of costly replacement",
      ],
      image: {
        src: "/services/retrofit.png",
        alt: "Modernized control cabinet on an existing machine – retrofit during ongoing operation",
      },
      metaTitle: "Retrofit & Machine Modernization",
      metaDescription:
        "Retrofit for machines and plants: control modernization, migration of obsolete PLCs and control cabinet construction. More lifetime, less downtime. Get in touch.",
      serviceType: "Retrofit / Modernization",
      keywords: [
        "retrofit",
        "machine retrofit",
        "control modernization",
        "PLC migration",
        "S5 to S7 migration",
        "plant modernization",
        "control cabinet construction",
        "obsolescence management",
        "machine upgrade",
      ],
      lead: "A retrofit is the modernization of existing machines by renewing the control technology. Ingenieurbüro Jungen extends the service life of your equipment, increases availability and replaces obsolete components – sustainably and more cost-effectively than buying new.",
      sections: [
        {
          heading: "What does retrofit mean?",
          paragraphs: [
            "In a retrofit, an existing machine or plant is modernized instead of being completely replaced. The proven mechanics are usually retained, while the outdated control and electrical technology is brought up to date.",
            "This brings your equipment into the present: better availability, modern operation, reliable spare-part supply – at significantly lower cost than a new investment.",
          ],
        },
        {
          heading: "Control modernization and PLC migration",
          paragraphs: [
            "Outdated or discontinued controls are a risk: spare parts become scarce, know-how is lost and a failure can cause lengthy downtime. With control modernization we migrate your plant to a current, long-term available platform.",
            "We migrate existing PLC programs to modern systems while preserving the function of your plant – with the goal of minimal downtime during the conversion.",
          ],
          bullets: [
            "Migration of obsolete PLCs to modern controllers (e.g. Siemens S7-1500)",
            "Upgrade from SIMATIC S5 or S7-300 to current systems",
            "Renewal of operating and visualization technology (HMI/SCADA)",
            "Preserving proven plant function with modern technology",
          ],
        },
        {
          heading: "Control cabinet construction and electrical planning",
          paragraphs: [
            "Modernization often involves a new or rebuilt control cabinet. We plan and implement control cabinet construction to match the new control technology – standards-compliant, well documented and designed for maintainability.",
          ],
        },
        {
          heading: "Retrofit or replacement?",
          paragraphs: [
            "A retrofit is usually the more economical and sustainable choice: you save the investment in a completely new machine, avoid long delivery times and reduce resource consumption. The prerequisite is fundamentally sound mechanics.",
            "In an assessment we honestly evaluate whether a retrofit is worthwhile for your plant – and show you the benefits to expect.",
          ],
        },
        {
          heading: "Obsolescence management",
          paragraphs: [
            "So you don't have to react only when something fails, we support you in proactively handling discontinued components. This lets you plan modernizations in time and avoid costly unplanned downtime.",
          ],
        },
      ],
      benefits: [
        "Significantly longer service life for your existing equipment",
        "Migration of discontinued (obsolete) controls to modern systems",
        "Fewer unplanned downtimes and better spare-part availability",
        "Sustainable, cost-efficient alternative to new investment",
        "Minimal downtime through careful conversion planning",
      ],
      process: [
        {
          step: "Assessment",
          description:
            "Analysis of the existing control, mechanics and documentation, plus modernization potential.",
        },
        {
          step: "Migration concept",
          description:
            "Planning the migration to modern control technology including control cabinet and risk assessment.",
        },
        {
          step: "Conversion & restart",
          description:
            "Implementation with minimal downtime, testing and restart of the modernized plant.",
        },
      ],
      industries: [
        "Machinery and plant engineering",
        "Production lines with legacy controls",
        "Special-purpose machines",
        "Conveying and handling technology",
      ],
      faq: [
        {
          question: "When is a retrofit worthwhile compared to buying new?",
          answer:
            "A retrofit is worthwhile when the machine's mechanics are still sound but the control is outdated or discontinued. It is then usually significantly cheaper and more sustainable than a replacement.",
        },
        {
          question: "Can you migrate a SIMATIC S5 to S7?",
          answer:
            "Yes, migrating obsolete controls such as SIMATIC S5 or S7-300 to current systems (e.g. S7-1500) is one of our core retrofit services.",
        },
        {
          question: "How long will my plant be down during a retrofit?",
          answer:
            "Through careful preparation and a sound migration concept we keep downtime as short as possible. We clarify the specific time frame in advance based on the assessment.",
        },
      ],
    },
  ],
};

export function getServices(locale: Locale): LocalizedService[] {
  return services[locale];
}

export function getService(
  locale: Locale,
  id: string,
): LocalizedService | undefined {
  return services[locale].find((service) => service.id === id);
}
