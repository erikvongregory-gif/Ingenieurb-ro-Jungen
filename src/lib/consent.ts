/**
 * Cookie-/Consent-Verwaltung (DSGVO, Opt-in).
 * Speichert die Einwilligung lokal und informiert per Event über Änderungen.
 * Nicht notwendige Dienste (Analytics, externe Medien) dürfen erst geladen
 * werden, wenn die jeweilige Kategorie zugestimmt wurde -> hasConsent().
 */

export const CONSENT_STORAGE_KEY = "iaa-consent";
export const CONSENT_VERSION = 1;
/** Wird ausgelöst, wenn sich die Einwilligung ändert. */
export const CONSENT_EVENT = "iaa:consent-changed";
/** Wird ausgelöst, um den Consent-Dialog erneut zu öffnen (z. B. Footer-Link). */
export const CONSENT_OPEN_EVENT = "iaa:open-consent";

export type ConsentCategory = "analytics" | "maps";
export type ConsentCategories = Record<ConsentCategory, boolean>;

export type ConsentState = {
  v: number;
  necessary: true;
  analytics: boolean;
  maps: boolean;
  ts: number;
};

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.v !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories): ConsentState {
  const state: ConsentState = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: categories.analytics,
    maps: categories.maps,
    ts: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage nicht verfügbar – Auswahl gilt nur für diese Sitzung. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

/** Öffnet den Consent-Dialog erneut (z. B. über einen Footer-Link). */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Prüft, ob für eine Kategorie eine Einwilligung vorliegt. */
export function hasConsent(category: ConsentCategory): boolean {
  const state = readConsent();
  return state ? Boolean(state[category]) : false;
}
