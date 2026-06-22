"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/consent";

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full ring-1 transition-colors duration-200",
        checked ? "bg-primary ring-primary/40" : "bg-foreground/15 ring-border/60",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

function Category({
  title,
  description,
  checked,
  onChange,
  locked,
  lockedLabel,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
  lockedLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/50 bg-background/40 p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/60">
          {description}
        </p>
      </div>
      {locked ? (
        <span className="whitespace-nowrap pt-0.5 text-xs font-medium text-primary/80">
          {lockedLabel}
        </span>
      ) : (
        <Toggle checked={checked} onChange={onChange ?? (() => {})} label={title} />
      )}
    </div>
  );
}

export function CookieConsent() {
  const t = useTranslations("Consent");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [maps, setMaps] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      const existing = readConsent();
      if (!existing) {
        setOpen(true);
      } else {
        setAnalytics(existing.analytics);
        setMaps(existing.maps);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      const existing = readConsent();
      if (existing) {
        setAnalytics(existing.analytics);
        setMaps(existing.maps);
      }
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, handleOpen);
  }, []);

  const persist = useCallback((a: boolean, m: boolean) => {
    writeConsent({ analytics: a, maps: m });
    setAnalytics(a);
    setMaps(m);
    setOpen(false);
    setShowSettings(false);
  }, []);

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
      role="dialog"
      aria-modal="false"
      aria-label={t("title")}
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-card/90 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Cookie className="h-4 w-4 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="font-sans font-bold tracking-tight text-foreground">
                {t("title")}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {t("description")}{" "}
                <span className="text-foreground/70">
                  {t("more")}{" "}
                  <Link
                    href="/datenschutz"
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {t("privacy")}
                  </Link>
                  .
                </span>
              </p>
            </div>
          </div>

          {showSettings && (
            <div className="mt-5 flex flex-col gap-3">
              <Category
                title={t("necessaryTitle")}
                description={t("necessaryDesc")}
                checked
                locked
                lockedLabel={t("alwaysActive")}
              />
              <Category
                title={t("analyticsTitle")}
                description={t("analyticsDesc")}
                checked={analytics}
                onChange={setAnalytics}
              />
              <Category
                title={t("mapsTitle")}
                description={t("mapsDesc")}
                checked={maps}
                onChange={setMaps}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
            {showSettings ? (
              <button
                type="button"
                onClick={() => persist(analytics, maps)}
                className="order-3 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-card/80 to-card px-5 text-sm font-semibold text-card-foreground ring-1 ring-border/60 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:order-1 sm:mr-auto"
              >
                {t("save")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="order-3 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-card/80 to-card px-5 text-sm font-semibold text-card-foreground ring-1 ring-border/60 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:order-1 sm:mr-auto"
              >
                {t("settings")}
              </button>
            )}

            <button
              type="button"
              onClick={() => persist(false, false)}
              className="order-2 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-card/80 to-card px-5 text-sm font-semibold text-card-foreground ring-1 ring-border/60 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("rejectAll")}
            </button>
            <button
              type="button"
              onClick={() => persist(true, true)}
              className="order-1 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-primary/90 to-primary px-5 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:order-3"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
