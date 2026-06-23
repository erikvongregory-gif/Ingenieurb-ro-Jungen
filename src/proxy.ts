import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: "proxy" ersetzt die frühere "middleware"-Konvention.
// next-intl liefert die Routing-/Locale-Verarbeitung (Spracherkennung,
// Präfix-Handling, lokalisierte Pfade).
export default createMiddleware(routing);

export const config = {
  // Alle Pfade außer API, Admin-Bereich, Next.js-Interna, Vercel-Interna und
  // Dateien mit Endung (z. B. robots.txt, sitemap.xml, llms.txt, Bilder) werden
  // verarbeitet. Der Admin-Bereich (/admin) ist bewusst vom i18n-Routing
  // ausgenommen, damit dort keine Sprach-Präfixe erzwungen werden.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
