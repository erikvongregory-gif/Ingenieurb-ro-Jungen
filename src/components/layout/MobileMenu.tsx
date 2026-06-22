"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNav } from "@/content/navigation";
import { siteConfig } from "@/config/site";
import { openContactModal } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Sanfte "Drawer"-Kurve (wie iOS-Sheets) für ein cleanes Auf-/Zugleiten.
const EASE = "cubic-bezier(0.32,0.72,0,1)";
const DURATION = 360;

/**
 * Mobiles Hauptmenü (< lg): Hamburger-Button öffnet einen Glass-Drawer mit
 * voller Navigation, Direktkontakt, CTA und Sprachumschalter.
 *
 * - sauberes Auf- und Zugleiten über echte Transitions (beide Richtungen)
 * - gestaffeltes Einblenden der Navigationspunkte
 * - schließt automatisch bei Routenwechsel, Escape und Backdrop-Klick
 * - Scroll-Lock, Focus-Trap und Fokus-Rückgabe; respektiert reduzierte Bewegung
 */
export function MobileMenu({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const pathname = usePathname();

  // `render` = im DOM, `show` = sichtbarer (eingeblendeter) Zustand.
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>(0);

  const open = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setRender(true);
  }, []);

  const close = useCallback(() => {
    setShow(false);
    closeTimer.current = window.setTimeout(() => {
      setRender(false);
      triggerRef.current?.focus?.();
    }, DURATION);
  }, []);

  // Nach dem Mounten im nächsten Frame einblenden -> Transition läuft sauber an.
  useEffect(() => {
    if (!render) return;
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [render]);

  // Bei Routenwechsel schließen (ohne Animation, Seite wechselt ohnehin).
  useEffect(() => {
    setShow(false);
    setRender(false);
  }, [pathname]);

  // Scroll-Lock + Erstfokus, solange offen.
  useEffect(() => {
    if (!render) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [render]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [close],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-label={tc("openMenu")}
        aria-expanded={render}
        aria-haspopup="dialog"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-foreground/80 transition-colors hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {render
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={tc("navigation")}
              onKeyDown={onKeyDown}
            >
              {/* Backdrop */}
              <button
                type="button"
                aria-label={tc("closeMenu")}
                tabIndex={-1}
                onClick={close}
                style={{ transitionDuration: `${DURATION}ms` }}
                className={cn(
                  "absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm transition-opacity ease-out motion-reduce:transition-none",
                  show ? "opacity-100" : "opacity-0",
                )}
              />

              {/* Drawer */}
              <div
                ref={panelRef}
                style={{
                  transitionDuration: `${DURATION}ms`,
                  transitionTimingFunction: EASE,
                }}
                className={cn(
                  "absolute right-0 top-0 flex h-[100dvh] w-[min(86vw,340px)] flex-col border-l border-border/60 bg-gradient-to-b from-card/95 to-card shadow-[0_8px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform will-change-transform motion-reduce:transition-none",
                  show ? "translate-x-0" : "translate-x-full",
                )}
              >
                {/* Kopf */}
                <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground/45">
                    {tc("navigation")}
                  </span>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={close}
                    aria-label={tc("closeMenu")}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav
                  aria-label={tc("navigation")}
                  className="flex-1 overflow-y-auto px-3 py-4"
                >
                  <ul className="flex flex-col gap-1">
                    {mainNav.map((item, index) => {
                      const active = isActive(item.pathname);
                      return (
                        <li key={item.pathname}>
                          <Link
                            href={item.pathname}
                            onClick={close}
                            aria-current={active ? "page" : undefined}
                            style={{
                              transitionDelay: show ? `${90 + index * 45}ms` : "0ms",
                            }}
                            className={cn(
                              "group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-[color,background-color,opacity,transform] duration-300 ease-out active:scale-[0.99] motion-reduce:transition-none",
                              show
                                ? "translate-x-0 opacity-100"
                                : "translate-x-3 opacity-0",
                              active
                                ? "bg-primary/10 text-foreground ring-1 ring-primary/25"
                                : "text-foreground/75 hover:bg-foreground/[0.04] hover:text-foreground",
                            )}
                          >
                            {t(item.labelKey)}
                            <ArrowUpRight
                              className={cn(
                                "h-4 w-4 transition-all",
                                active
                                  ? "text-primary opacity-100"
                                  : "text-foreground/30 opacity-0 group-hover:opacity-100",
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Fuß: CTA + Direktkontakt + Sprache */}
                <div className="mt-auto flex flex-col gap-3 border-t border-border/40 px-5 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      openContactModal();
                    }}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-6 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 active:scale-[0.98]"
                  >
                    {tc("getInTouch")}
                  </button>

                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm font-semibold text-foreground/85 transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {siteConfig.contact.phoneDisplay}
                  </a>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-foreground/45">
                      {tc("languageSwitch")}
                    </span>
                    <LanguageSwitcher locale={locale} />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
