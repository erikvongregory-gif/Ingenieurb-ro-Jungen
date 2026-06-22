"use client";

import { usePathname } from "@/i18n/navigation";

/**
 * Sanfter Übergang beim Seitenwechsel.
 *
 * Der Wrapper trägt einen `key` aus dem aktuellen Pfad. Bei jeder Navigation
 * ändert sich der Key → React mountet den Teilbaum neu → die CSS-Einblend-
 * Animation (`.page-transition`) läuft erneut. Bewusst rein CSS-basiert,
 * damit es framework-versionsunabhängig und performant bleibt.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
