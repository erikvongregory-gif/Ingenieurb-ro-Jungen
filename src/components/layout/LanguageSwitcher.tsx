"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Sprachumschalter als kompaktes Glass-Pill (DE/EN), behält den aktuellen
 * (lokalisierten) Pfad beim Wechsel bei.
 */
export function LanguageSwitcher({ locale }: { locale: string }) {
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div
      aria-label={t("languageSwitch")}
      className="inline-flex items-center rounded-lg border border-border/60 bg-card/60 p-0.5 backdrop-blur-md"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          disabled={isPending || loc === locale}
          aria-current={loc === locale ? "true" : undefined}
          lang={loc}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
            loc === locale
              ? "bg-primary/15 text-foreground ring-1 ring-primary/30"
              : "text-foreground/55 hover:text-foreground",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
