import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button-link";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Sticky Glass-Header im Hero-Stil: transparenter, unscharfer Hintergrund,
 * dezente untere Trennlinie, Marke + Hauptnavigation + Sprachumschalter + CTA.
 */
export function SiteHeader({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        {tc("skipToContent")}
      </a>

      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="font-sans font-extrabold tracking-tighter text-foreground text-lg"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.pathname}>
                <Link
                  href={item.pathname}
                  className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Click-to-call – stärkster Conversion-Hebel im lokalen B2B. */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            aria-label={`${tc("callNow")}: ${siteConfig.contact.phoneDisplay}`}
            className="inline-flex items-center gap-2 rounded-full text-foreground/80 transition-colors hover:text-foreground md:rounded-xl md:border md:border-border/60 md:bg-card/40 md:px-3.5 md:py-2"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="hidden text-sm font-semibold md:inline">
              {siteConfig.contact.phoneDisplay}
            </span>
          </a>
          <LanguageSwitcher locale={locale} />
          <ButtonLink
            href="/kontakt"
            className="hidden h-9 px-4 text-xs sm:inline-flex md:h-10 md:px-5 md:text-sm"
          >
            {tc("getInTouch")}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
