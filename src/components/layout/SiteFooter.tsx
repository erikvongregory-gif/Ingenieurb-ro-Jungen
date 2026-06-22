import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { legalNav, mainNav } from "@/content/navigation";
import { siteConfig } from "@/config/site";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";

/**
 * Footer im Dark-Stil: Marke + Claim, Navigation, NAP-Daten (Local-SEO) und
 * rechtliche Links. Obere Trennlinie für klare Abgrenzung.
 */
export function SiteFooter() {
  const t = useTranslations("Nav");
  const tf = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marke */}
          <div className="lg:col-span-2">
            <p className="font-sans font-extrabold tracking-tighter text-foreground text-xl">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/70">
              {tf("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer-Navigation">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {mainNav.map((item) => (
                <li key={item.pathname}>
                  <Link
                    href={item.pathname}
                    className="text-sm text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt / NAP */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
              {t("contact")}
            </p>
            <address className="mt-4 flex flex-col gap-2 not-italic text-sm text-foreground/75">
              <span className="font-medium text-foreground/80">
                {siteConfig.name}
              </span>
              {siteConfig.address.street && (
                <span>{siteConfig.address.street}</span>
              )}
              {siteConfig.address.postalCode && siteConfig.address.city && (
                <span>
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              )}
              {siteConfig.contact.phoneDisplay && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              )}
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              )}
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-foreground/50">
            © {year} {siteConfig.name}. {tf("rights")}
          </p>
          <nav aria-label="Rechtliches">
            <ul className="flex items-center gap-6">
              {legalNav.map((item) => (
                <li key={item.pathname}>
                  <Link
                    href={item.pathname}
                    className="text-xs text-foreground/50 transition-colors hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
