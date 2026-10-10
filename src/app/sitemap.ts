import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/automation", "/retrofit", "/referenzen", "/kontakt", "/impressum", "/datenschutz"];
  return pages.map((p) => ({
    url: absoluteUrl(p),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : ["/impressum", "/datenschutz"].includes(p) ? 0.2 : 0.8,
  }));
}
