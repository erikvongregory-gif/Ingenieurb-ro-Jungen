/**
 * Globales Open-Event für das Kontaktmodal.
 *
 * Analog zum Cookie-Consent: Beliebige (auch server-gerenderte) Buttons können
 * das Modal öffnen, ohne dass ein React-Context die ganze App umschließen muss.
 * Der Trigger feuert ein CustomEvent auf `window`, das <ContactModal /> abhört.
 */
export const CONTACT_OPEN_EVENT = "contact:open";

/** Öffnet das global gemountete Kontaktmodal (no-op auf dem Server). */
export function openContactModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONTACT_OPEN_EVENT));
}
