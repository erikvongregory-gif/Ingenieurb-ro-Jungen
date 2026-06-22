import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Generiert robots.txt unter /robots.txt.
 * Erlaubt Crawling und verweist auf die Sitemap.
 *
 * Hinweis zu KI-Crawlern (GPTBot, ClaudeBot, PerplexityBot, Google-Extended):
 * Sie sind hier bewusst ERLAUBT, damit die Inhalte in KI-/Antwortmaschinen
 * auffindbar und zitierbar sind (GEO/AEO). Bei Bedarf hier sperren.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keine sinnvollen Bereiche zum Ausschließen vorhanden; bei Bedarf ergänzen:
        // disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
