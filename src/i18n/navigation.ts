import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lokalisierungs-bewusste Navigations-APIs.
 * IMMER diese statt `next/link` / `next/navigation` verwenden,
 * damit Sprache und lokalisierte Pfade automatisch korrekt gesetzt werden.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
