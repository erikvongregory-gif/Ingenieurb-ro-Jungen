# Keyword-Recherche – Nische Industrieautomation / Retrofit

> Startpunkt-Keywordset für die deutschsprachige Nische (DACH). Vor dem Go-Live
> mit echten Suchvolumina (z. B. Google Keyword Planner, Ahrefs, Sistrix, Mangools)
> validieren und priorisieren. Suchintention beachten: **kommerziell/transaktional**
> (Dienstleistungssuche) vs. **informational** (Ratgeber → Content).

## 1. Money-Keywords (kommerziell – für Leistungsseiten)

| Keyword | Intention | Ziel-Seite |
|---|---|---|
| Industrieautomation | kommerziell | /automation |
| Automatisierungstechnik Ingenieurbüro | kommerziell | /automation |
| SPS-Programmierung | kommerziell | /automation |
| SPS Programmierung Dienstleister | transaktional | /automation |
| Steuerungstechnik | kommerziell | /automation |
| Anlagenautomatisierung | kommerziell | /automation |
| Retrofit Maschinen | kommerziell | /retrofit |
| Steuerungsmodernisierung | kommerziell | /retrofit |
| SPS Migration | kommerziell | /retrofit |
| Schaltschrankbau | kommerziell | /retrofit |
| Maschinen modernisieren | transaktional | /retrofit |

## 2. Long-Tail / Nischen-Keywords (geringeres Volumen, höhere Conversion)

- „SPS Programmierung Siemens TIA Portal Dienstleister“
- „Retrofit alte Maschine Steuerung erneuern“
- „SPS S5 auf S7 migrieren“ / „S7-300 auf S7-1500 migrieren“
- „Obsoleszenz Steuerung abgekündigt Ersatz“
- „HMI Visualisierung programmieren lassen“
- „SCADA System einrichten Ingenieurbüro“
- „Sondermaschinenbau Automatisierung“
- „Schaltschrankbau nach Norm EN 60204“
- „Inbetriebnahme Anlage Automatisierungstechnik“

## 3. Lokale Keywords (Local SEO)

> `[Stadt]`/`[Region]` durch echtes Einzugsgebiet ersetzen (siehe `siteConfig.serviceAreas`).

- „SPS Programmierung [Stadt]“
- „Automatisierungstechnik [Region]“
- „Retrofit Ingenieurbüro [Stadt]“
- „Industrieautomation [Bundesland]“

## 4. Informationale Keywords (Content-/Ratgeber – Topical Authority)

| Keyword / Frage | Format |
|---|---|
| „Was ist Retrofit (Maschine)?“ | Ratgeber / FAQ |
| „Retrofit vs. Neukauf – was lohnt sich?“ | Vergleichsartikel |
| „Was kostet ein Maschinen-Retrofit?“ | Ratgeber (Kostenfaktoren) |
| „SPS vs. SPS-Migration – Ablauf“ | How-to |
| „Unterschied SPS, HMI, SCADA“ | Erklärartikel |
| „Was macht ein Ingenieurbüro für Automatisierung?“ | FAQ (bereits eingebaut) |
| „Obsoleszenzmanagement in der Automatisierung“ | Fachartikel |

## 5. Englische Keywords (für /en)

- industrial automation services
- PLC programming services
- control system retrofit
- machine retrofit / control modernization
- PLC migration (Siemens S5 to S7 / S7-300 to S7-1500)
- control cabinet construction

## 6. Keyword-Mapping (1 Hauptkeyword je URL – Kannibalisierung vermeiden)

| URL | Primär-Keyword | Sekundär-Keywords |
|---|---|---|
| `/` | Industrieautomation Ingenieurbüro | Retrofit, Automatisierung, All About Industrial Automation |
| `/automation` | Industrieautomation | SPS-Programmierung, SCADA, HMI, Steuerungstechnik |
| `/retrofit` | Retrofit | Steuerungsmodernisierung, SPS-Migration, Schaltschrankbau |
| `/referenzen` | Referenzen Industrieautomation | Projekte, Case Studies |
| `/kontakt` | Kontakt + lokal | [Stadt] Automatisierung |

> Pflege: Keyword-Cluster pro Leistung liegen technisch in
> `src/content/services.ts` (`keywords`) und fließen in die Meta-Keywords ein.
