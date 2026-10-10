# Ingenieurbüro Jungen – Website

Website für das Ingenieurbüro Jungen (Frank Jungen), Industrieautomation und Retrofit.

**Stack:** Next.js 16 (App Router, statisch), Tailwind CSS 4, GSAP 3 (ScrollTrigger, SplitText, DrawSVG), Lenis Smooth Scroll.

## Entwicklung

```bash
npm install
npm run dev
```

## Struktur

- `src/content/site.ts` – alle Inhalte und Stammdaten (Kontakt, Leistungen, Referenzen, Profil)
- `src/content/legal.ts` – Haftungsausschluss und Datenschutzerklärung
- `src/app/` – Seiten: Start, Automation, Retrofit, Referenzen, Kontakt, Impressum, Datenschutz
- `src/components/motion/` – Lenis (`SmoothScroll`) und deklarative Scroll-Animationen (`Animate`, gesteuert über `data-reveal`, `data-count`, `data-scrub-words`, `data-parallax`)
- `src/components/home/` – Sektionen der Startseite, u. a. animiertes Steuerungs-Schema im Hero

Animationen respektieren `prefers-reduced-motion`.
