# KI-Optimierung (GEO / AEO)

GEO = *Generative Engine Optimization*, AEO = *Answer Engine Optimization*.
Ziel: In Antworten von **Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot**
als Quelle erscheinen und korrekt zitiert werden.

## Warum das zählt

KI-Systeme bevorzugen Inhalte, die **klar strukturiert, faktisch, eindeutig der
Marke zuordenbar und maschinenlesbar** sind. Vieles davon überschneidet sich mit
gutem klassischem SEO, einige Punkte sind KI-spezifisch.

## Bereits umgesetzt

- **`public/llms.txt`** – kompaktes, KI-freundliches Profil der Marke + Leistungen.
- **Schema.org/JSON-LD** für Organisation, Leistungen, FAQ, Breadcrumbs → eindeutige Entität.
- **FAQ-Format** mit eigenständig zitierbaren Antworten (`src/content/faq.ts`).
- **KI-Crawler in robots.txt erlaubt** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- **Klare Antwort-Struktur:** Kernaussage in den ersten Sätzen jeder Seite.

## Prinzipien für Inhalte (bei der Content-Erstellung beachten)

1. **Frage-Antwort-Format:** Häufige Nutzerfragen wörtlich aufgreifen und in 1–3
   Sätzen faktisch beantworten (dann vertiefen). → in FAQ und Fließtext.
2. **Eigenständige Aussagen:** Sätze so formulieren, dass sie ohne Kontext zitierbar
   sind („Ein Retrofit modernisiert bestehende Maschinen durch Erneuerung der
   Steuerungstechnik.“).
3. **Fakten & Zahlen:** Konkrete Angaben (Systeme, Normen, Projektergebnisse) erhöhen
   Zitierfähigkeit. Belege/Quellen nennen, wo möglich.
4. **Konsistente Terminologie & Entität:** Markenname und Fachbegriffe einheitlich.
5. **Aktualität:** Inhalte mit Datum pflegen; veraltete Angaben vermeiden.
6. **Struktur:** Überschriften, Listen, Tabellen – maschinen- und menschenfreundlich.

## Pflege von `llms.txt`

- Bei neuen wichtigen Seiten dort verlinken.
- Fakten (Region, Leistungen, Systeme) synchron mit `siteConfig` und Content halten.
- Optional später: ausführliche `llms-full.txt` mit vollständigen Inhalten.

## Optional / fortgeschritten

- **`/about`- bzw. „Über uns“-Seite** mit Autoren-/Experten-Entität (Person-Schema,
  Qualifikationen) → stärkt E-E-A-T und KI-Vertrauen.
- **Wikidata/Wikipedia-Präsenz** und Branchenverzeichnisse → externe Entitäts-Signale.
- **Konsistente `sameAs`-Profile** (LinkedIn, Xing) in `siteConfig.social` pflegen.

## Kontroll-Checkliste vor Go-Live

- [ ] `llms.txt` enthält aktuelle Fakten und Links.
- [ ] Alle Seiten haben gültiges JSON-LD (Test: Google Rich Results Test).
- [ ] FAQ-Antworten sind eigenständig und korrekt.
- [ ] robots.txt erlaubt die gewünschten (KI-)Crawler.
- [ ] NAP-Daten konsistent (Website, llms.txt, Schema, Google-Profil).
