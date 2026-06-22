# Content-Plan – Topical Authority Industrieautomation / Retrofit

Ziel: über reine Leistungsseiten hinaus **Themenautorität** aufbauen, um für
informationale Suchanfragen und KI-Antworten zu ranken und intern auf die
Leistungsseiten zu verlinken.

## Seitenarchitektur (Soll)

```
/ (Startseite)
├── /automation            (Money-Page)
│   └── (optional Unterseiten: SPS-Programmierung, SCADA/HMI, Inbetriebnahme)
├── /retrofit              (Money-Page)
│   └── (optional Unterseiten: Steuerungsmodernisierung, SPS-Migration, Schaltschrankbau)
├── /referenzen            (Vertrauen/E-E-A-T)  → einzelne Case Studies
├── /kontakt
├── /links
└── /wissen (Blog/Ratgeber – EMPFEHLUNG, noch nicht angelegt)
    ├── Was ist Retrofit?
    ├── Retrofit vs. Neukauf
    ├── SPS-Migration S5/S7 → S7-1500
    └── Unterschied SPS / HMI / SCADA
```

## Empfohlene Ratgeber-Artikel (Reihenfolge = Priorität)

1. **„Was ist ein Retrofit? Definition, Ablauf, Vorteile“** – Pillar zu /retrofit.
2. **„Retrofit vs. Neukauf: Wann lohnt sich was?“** – Vergleich, hohe Kaufrelevanz.
3. **„SPS-Migration: von S5/S7-300 zu S7-1500“** – Fachartikel, Long-Tail.
4. **„Was kostet ein Maschinen-Retrofit?“** – Kostenfaktoren (ohne Fixpreis).
5. **„SPS, HMI, SCADA – einfach erklärt“** – Grundlagen, Einstieg/KI-zitierfähig.
6. **„Obsoleszenzmanagement in der Automatisierung“** – B2B-Entscheider.

Jeder Artikel: 1 Primär-Keyword, Antwort in den ersten Sätzen, FAQ-Block,
interne Links zu /automation bzw. /retrofit und /kontakt-CTA.

## Referenzen / Case Studies (Struktur-Vorschlag)

Empfohlen: Daten-Layer `src/content/references.ts` mit Feldern:
`titel, branche, ausgangslage, loesung, ergebnis, eingesetzteSysteme, jahr, bild`.
Pro Case Study: messbare Ergebnisse nennen (z. B. „Stillstandzeit −30 %“) → stark
für E-E-A-T und KI-Zitate. Schema: `CreativeWork`/`Article` oder `CaseStudy`.

## Redaktionelle Hinweise

- Zielgruppe: technische Entscheider (Instandhaltungs-/Produktionsleiter, Werkleiter).
- Ton: fachlich, präzise, nutzenorientiert; Fachbegriffe korrekt verwenden.
- Jede Seite endet mit klarem CTA (Kontakt/Anfrage).
- Inhalte zweisprachig pflegen (DE primär, EN nachziehen).

## Umsetzung im Code

- Statische Inhalte: `src/content/*` + `messages/*` erweitern.
- Für einen Blog: Verzeichnis `src/app/[locale]/wissen/[slug]/` + Content-Quelle
  (MDX oder Daten-Layer) anlegen; Artikel-Schema (`Article`) ergänzen.
