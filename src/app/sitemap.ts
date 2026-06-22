import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { absoluteUrl } from "@/config/site";

/**
 * Generiert die sitemap.xml inkl. hreflang-Alternates pro URL.
 * Erscheint automatisch unter /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = Object.keys(routing.pathnames) as Array<
    keyof typeof routing.pathnames
  >;

  const entries: MetadataRoute.Sitemap = [];

  for (const pathname of pathnames) {
    // Alternates (hreflang) für diese Route über alle Sprachen.
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = absoluteUrl(getPathname({ href: pathname, locale }));
    }
    // x-default verweist auf die Standardsprache (Deutsch).
    languages["x-default"] = absoluteUrl(
      getPathname({ href: pathname, locale: routing.defaultLocale }),
    );

    // Pro Sprache eine eigene URL eintragen, jeweils mit vollständigen Alternates.
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(getPathname({ href: pathname, locale })),
        lastModified: new Date(),
        changeFrequency: pathname === "/" ? "weekly" : "monthly",
        priority: pathname === "/" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
