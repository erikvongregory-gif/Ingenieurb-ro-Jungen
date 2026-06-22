# SEO- & KI-Strategie – Ingenieurbüro Jungen

Ziel: In der Nische **Industrieautomation / Retrofit** in klassischer Suche
(Google/Bing) **und** in KI-/Antwortmaschinen (Google AI Overviews, ChatGPT,
Perplexity, Gemini) prominent und zitierfähig erscheinen.

## 1. Positionierung & Entität

- **Marke als Entität etablieren:** konsistenter Name „Ingenieurbüro Jungen“,
  einheitliche NAP-Daten überall (Website, Google Unternehmensprofil, Verzeichnisse).
- **Themen-Autorität (Topical Authority):** Die Seite soll als Fachquelle für
  Industrieautomation und Retrofit wahrgenommen werden → Content-Tiefe statt nur
  Leistungsseiten (siehe `CONTENT-PLAN.md`).
- **E-E-A-T:** Verantwortliche Person mit Qualifikation nennen (Impressum/Über uns),
  echte Referenzprojekte mit Ergebnissen, Fachartikel.

## 2. Technisches SEO (bereits im Code umgesetzt)

| Baustein | Status | Ort |
|---|---|---|
| Canonical-URLs | ✅ | `src/lib/seo/metadata.ts` |
| hreflang (de/en/x-default) | ✅ | metadata + `sitemap.ts` |
| Open Graph / Twitter | ✅ | metadata-Helper |
| Schema.org (Org, Service, FAQ, Breadcrumb, WebSite) | ✅ | `src/lib/seo/structured-data.ts` |
| sitemap.xml | ✅ | `src/app/sitemap.ts` |
| robots.txt | ✅ | `src/app/robots.ts` |
| llms.txt (KI) | ✅ | `public/llms.txt` |
| Sicherheits-Header | ✅ | `next.config.ts` |
| Semantisches HTML / A11y | ✅ | Layout-/Seitengerüst |

**Noch zu tun (Design-/Content-Phase):**
- Core Web Vitals optimieren (LCP-Bild, Schriftauslieferung, kein Layout-Shift).
- Bilder als `next/image` mit aussagekräftigen `alt`-Texten (Keyword-nah, natürlich).
- Interne Verlinkung zwischen Leistungen, Referenzen und Fachartikeln.
- OG-Bild `public/og/default-og.png` (1200×630) erstellen.

## 3. On-Page-Prinzipien

- **Eine H1 pro Seite**, klare H2/H3-Hierarchie (im Gerüst vorbereitet).
- **Title:** Primär-Keyword vorne, Marke hinten (≤ ~60 Zeichen).
- **Meta-Description:** Nutzenversprechen + Keyword (≤ ~155 Zeichen).
- **URLs:** kurz, sprechend, lokalisiert (`/automation`, `/en/references`).
- **Antwort-Boxen:** Jede wichtige Seite beantwortet die Kernfrage in den ersten
  2–3 Sätzen (gut für Featured Snippets **und** KI-Zitate).

## 4. Local SEO

- **Google Unternehmensprofil** anlegen/optimieren (Kategorie: „Ingenieurbüro“ o. ä.).
- NAP-Konsistenz in Branchenverzeichnissen (z. B. Wer liefert was, Branchenbuch).
- Einzugsgebiet/Regionen in `siteConfig.serviceAreas` pflegen → fließt in Schema ein.

## 5. KI-/Antwortmaschinen (GEO/AEO)

Siehe `KI-OPTIMIERUNG.md`. Kurz: strukturierte Daten, FAQ-Format, klare Fakten,
`llms.txt`, zitierfähige, eigenständige Aussagen, KI-Crawler in robots.txt erlaubt.

## 6. Off-Page

- Fach-PR und Gastbeiträge in Automatisierungs-/Industrie-Medien.
- Partner-/Lieferanten-Verlinkungen (Hersteller, deren Systeme eingesetzt werden).
- Projekt-Case-Studies, die natürlich verlinkt werden.

## 7. Messung

- **Google Search Console** + **Bing Webmaster Tools**: Sitemap einreichen, Abdeckung & Queries überwachen.
- Rankings für die Ziel-Keywords aus `KEYWORD-RECHERCHE.md` tracken.
- Conversions (Kontaktanfragen) als Hauptmetrik definieren.
