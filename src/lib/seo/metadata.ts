import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/config/site";
import { routing, type Locale, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

type BuildMetadataOptions = {
  locale: Locale;
  /** Interner Pfad-Key aus routing.pathnames (z. B. "/automation"). */
  pathname: AppPathname;
  title: string;
  description: string;
  /** Optionale, seitenspezifische Keywords (ergänzen die globalen). */
  keywords?: string[];
  /** Optionales Sharing-Bild (überschreibt das Standard-OG-Bild). */
  image?: string;
  /** Seite von der Indexierung ausschließen (z. B. Danke-Seiten). */
  noindex?: boolean;
  /** Open-Graph-Typ. */
  type?: "website" | "article" | "profile";
};

/**
 * Erzeugt vollständige, konsistente Next.js-Metadata inkl.
 * Canonical-URL, hreflang-Alternates (x-default), Open Graph & Twitter Cards.
 *
 * Diese Funktion in JEDER Seite via `generateMetadata` verwenden,
 * damit alle SEO-Signale zentral und einheitlich gesetzt werden.
 */
export function buildMetadata({
  locale,
  pathname,
  title,
  description,
  keywords = [],
  image,
  noindex = false,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    const localizedPath = getPathname({ href: pathname, locale: loc });
    languages[loc] = absoluteUrl(localizedPath);
  }
  // x-default zeigt auf die Standardsprache (Deutsch).
  languages["x-default"] = absoluteUrl(
    getPathname({ href: pathname, locale: routing.defaultLocale }),
  );

  const canonical = absoluteUrl(getPathname({ href: pathname, locale }));
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);
  const fullTitle =
    pathname === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical,
      languages,
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? "en_US" : "de_DE",
      url: canonical,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
