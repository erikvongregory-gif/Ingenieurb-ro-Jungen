"use client";

import { useTranslations } from "next-intl";
import { openConsentSettings } from "@/lib/consent";

/** Footer-Link, der den Cookie-/Consent-Dialog erneut öffnet. */
export function CookieSettingsButton() {
  const t = useTranslations("Consent");
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-xs text-foreground/50 transition-colors hover:text-foreground"
    >
      {t("manage")}
    </button>
  );
}
