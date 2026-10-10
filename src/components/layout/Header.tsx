"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      setScrolled(y > 24);
      // Kleine Bewegungen ignorieren, damit der Header nicht flackert
      if (y < 120) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schließen
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(menuRef.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
        .from("[data-menu-item]", { yPercent: 120, duration: 0.8, ease: "expo.out", stagger: 0.06 }, "-=0.35")
        .from("[data-menu-foot]", { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out" }, "-=0.5");
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      tl.current?.timeScale(1).play();
    } else {
      lenis?.start();
      tl.current?.timeScale(1.6).reverse();
    }
  }, [open]);

  // Ein- und Ausblenden des Headers
  const firstRun = useRef(true);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const items = el.querySelectorAll("[data-hdr-item]");
    const line = el.querySelector("[data-hdr-line]");
    gsap.killTweensOf([el, ...items, line]);
    if (hidden && !open) {
      gsap.to(el, { yPercent: -110, duration: 0.55, ease: "power3.in" });
      return;
    }
    if (gsap.getProperty(el, "yPercent") === 0) return;
    gsap
      .timeline()
      .to(el, { yPercent: 0, duration: 0.9, ease: "expo.out" })
      .fromTo(
        items,
        { y: -14, autoAlpha: 0, filter: "blur(4px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out", stagger: 0.05, clearProps: "filter" },
        0.08,
      )
      .fromTo(line, { scaleX: 0, autoAlpha: 1 }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" }, 0.1)
      .to(line, { autoAlpha: 0, duration: 0.6 }, 1.0);
  }, [hidden, open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-out-expo",
          scrolled && !open ? "border-b border-line/80 bg-paper/85 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div data-hdr-item>
            <Logo />
          </div>
          <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-hdr-item
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.92rem] transition-colors",
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {isActive(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" />}
              </Link>
            ))}
          </nav>
          <div data-hdr-item className="hidden lg:block">
            <Button href="/kontakt" className="py-2 pl-5 pr-2 text-[0.88rem]">
              Projekt anfragen
            </Button>
          </div>
          <button
            type="button"
            data-hdr-item
            onClick={() => setOpen((o) => !o)}
            className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line-strong bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
          >
            <span className="relative block h-3 w-5">
              <span className={cn("absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-out-expo", open && "translate-y-[5px] rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-500 ease-out-expo", open && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </div>
        <span data-hdr-line aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent" />
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col bg-paper px-5 pb-8 pt-28 sm:px-8 lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile Navigation" className="flex flex-col">
          {[{ href: "/", label: "Start" }, ...nav, { href: "/kontakt", label: "Kontakt" }].map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="overflow-hidden border-b border-line py-3">
              <span data-menu-item className="flex items-baseline gap-4 text-4xl font-medium tracking-tight text-ink">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div data-menu-foot className="mt-auto flex flex-col gap-1 text-sm text-muted">
          <a href={`mailto:${site.contact.email}`} className="text-ink">{site.contact.email}</a>
          <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}
