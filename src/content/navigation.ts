import type { AppPathname } from "@/i18n/routing";

/**
 * Zentrale Navigationsstruktur.
 * `labelKey` referenziert einen Schlüssel im "Nav"-Namespace der messages.
 * `pathname` ist der interne Routing-Key (wird automatisch lokalisiert).
 */
export type NavItem = {
  labelKey: string;
  pathname: AppPathname;
};

/** Hauptnavigation (Header). */
export const mainNav: NavItem[] = [
  { labelKey: "home", pathname: "/" },
  { labelKey: "automation", pathname: "/automation" },
  { labelKey: "retrofit", pathname: "/retrofit" },
  { labelKey: "references", pathname: "/referenzen" },
  { labelKey: "contact", pathname: "/kontakt" },
  { labelKey: "links", pathname: "/links" },
];

/** Rechtliche Links (Footer). */
export const legalNav: NavItem[] = [
  { labelKey: "imprint", pathname: "/impressum" },
  { labelKey: "privacy", pathname: "/datenschutz" },
];
