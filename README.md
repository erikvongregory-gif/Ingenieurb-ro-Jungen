# Ingenieurbüro Jungen – Website (Next.js)

SEO- und KI-optimiertes Web-Grundgerüst für [ib-jungen.de](https://ib-jungen.de) –
**All About Industrial Automation**.

> Status: Durchstrukturiertes Grundgerüst. Die **visuelle Gestaltung ist bewusst
> noch nicht umgesetzt** – die Seiten/Komponenten enthalten nur semantisches Markup
> als Ausgangspunkt für das Design.

## Tech-Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (Styling-Setup vorhanden, Design offen)
- **next-intl** – Zweisprachigkeit **Deutsch (Standard)** + **Englisch**
- Deployment-Ziel: **Vercel**

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
npm run lint     # ESLint
npm run typecheck
```

## Projektstruktur

```
src/
  app/
    [locale]/              # Sprach-Routing (de = ohne Präfix, en = /en)
      layout.tsx           # Root-Layout (html, Provider, globales JSON-LD)
      page.tsx             # Startseite
      automation/          # Leistungsseite Automation
      retrofit/            # Leistungsseite Retrofit
      referenzen/          # Referenzen (en: /references)
      kontakt/             # Kontakt (en: /contact)
      links/
      impressum/           # (en: /imprint)
      datenschutz/         # (en: /privacy)
      not-found.tsx        # lokalisierte 404
    not-found.tsx          # globale 404
    sitemap.ts             # /sitemap.xml (inkl. hreflang)
    robots.ts              # /robots.txt
    manifest.ts            # /manifest.webmanifest
    globals.css
  components/
    layout/                # Header, Footer, LanguageSwitcher (Struktur-Platzhalter)
    pages/                 # Wiederverwendbare Seiteninhalte (ServicePageContent)
    seo/JsonLd.tsx         # JSON-LD-Renderer
  config/site.ts           # ZENTRALE Stammdaten (NAP, SEO-Defaults) -> hier pflegen!
  content/                 # Content-Layer (services, faq, navigation) DE/EN
  i18n/                    # next-intl Routing/Navigation/Request
  lib/seo/                 # metadata-Helper + Schema.org-Bausteine
  middleware.ts            # i18n-Middleware
messages/                  # Übersetzungen (de.json, en.json)
public/llms.txt            # KI-/Antwortmaschinen-Profil (GEO/AEO)
docs/                      # SEO-Strategie, Keyword-Recherche, KI-Optimierung, Content-Plan
```

## Wichtigste nächste Schritte

1. **`src/config/site.ts`** mit echten Unternehmensdaten füllen (alle `TODO`).
2. **Impressum & Datenschutz** rechtskonform vervollständigen.
3. **Content** in `src/content/` und `messages/` verfeinern (siehe `docs/`).
4. **OG-Bild** unter `public/og/default-og.png` (1200×630) anlegen.
5. **Design** umsetzen (Layout-Komponenten + Seiten sind als Gerüst vorbereitet).

## SEO- & KI-Features (bereits eingebaut)

- Pro Seite: dynamische `title`/`description`, **Canonical**, **hreflang** (inkl. `x-default`)
- **Open Graph** + **Twitter Cards**
- **Schema.org/JSON-LD**: ProfessionalService/Organization, WebSite, Service, BreadcrumbList, FAQPage
- Automatische **sitemap.xml** (mit hreflang) und **robots.txt**
- **llms.txt** für KI-/Antwortmaschinen (GEO/AEO)
- Saubere, semantische HTML-Struktur + Skip-Link (A11y)
- Sicherheits-Header (Trust-Signale)

## Deployment auf Vercel

1. Repository zu Vercel verbinden (Framework wird automatisch als Next.js erkannt).
2. Domain `ib-jungen.de` in Vercel hinterlegen; `www` → non-`www` Redirect setzen.
3. Nach dem Go-Live: Sitemap in der Google Search Console & Bing Webmaster Tools einreichen.

Details siehe [`docs/`](./docs).
