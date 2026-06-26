"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactModal } from "@/lib/contact";
import { PixelCanvas } from "./pixel-perfect-hero";

/**
 * STARTSEITEN-HERO – minimalistisch / editorial.
 * ------------------------------------------------------------------
 * Kein Bild: große, zweigeteilte Typo (Serif-Kursiv + Sans-Extrabold,
 * Marken-Motiv) auf ruhigem Graphit mit dezentem Teal-Ambient und viel
 * Weißraum. Eyebrow, Lead, CTAs – darunter ein zurückhaltender
 * Marken-/Technologie-Strip (Logo-Wall unter dem Hero).
 */

type Brand = { name: string; src: string };

interface HomeHeroProps {
  eyebrow: string;
  word1: string;
  word2: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  brands: Brand[];
  brandsLabel: string;
}

function BrandLogo({ name, src }: Brand) {
  return (
    <span className="flex h-11 sm:h-12 items-center justify-center rounded-xl bg-white/95 px-4 ring-1 ring-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25)] opacity-80 transition-opacity duration-300 hover:opacity-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        loading="eager"
        className="h-5 sm:h-6 w-auto max-w-[130px] select-none object-contain"
      />
    </span>
  );
}

export function HomeHero({
  eyebrow,
  word1,
  word2,
  lead,
  primaryCta,
  secondaryCta,
  secondaryHref,
  brands,
  brandsLabel,
}: HomeHeroProps) {
  const [loaded, setLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    const id = window.setTimeout(() => setLoaded(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  // Theme-Farben (muted + Akzent) aus den CSS-Variablen lesen und an den
  // Pixel-Canvas geben – so läuft der Hintergrund automatisch in Teal.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const raf = requestAnimationFrame(() => {
      const div = document.createElement("div");
      document.body.appendChild(div);
      div.className = "text-muted-foreground";
      const muted = getComputedStyle(div).color;
      div.className = "text-primary";
      const primary = getComputedStyle(div).color;
      document.body.removeChild(div);
      setThemeColors([muted, muted, muted, muted, primary]);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = (delay: number, extra?: string) => ({
    className: cn(
      "transition-all duration-700 ease-out motion-reduce:!transition-none motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
      loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      extra,
    ),
    style: { transitionDelay: `${delay}ms` } as React.CSSProperties,
  });

  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden pt-28 pb-14 md:min-h-[100dvh] md:pt-32">
      <style>{`
        @keyframes hero-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .hero-marquee { animation: hero-marquee 34s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-marquee { animation: none; } }
      `}</style>

      {/* Animierter Pixel-Canvas-Hintergrund (Teal/Muted), bewusst dezent. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {themeColors.length > 0 && (
          <PixelCanvas
            colors={themeColors}
            gap={10}
            speed={30}
            interactive
            cursorRadius={150}
          />
        )}
        {/* Sanfte Randvignette: Pixel bleiben großflächig sichtbar (für den
            cursorfolgenden Cluster), nur die äußeren Ränder laufen aus. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_50%_45%,transparent_0%,transparent_58%,var(--background)_100%)]" />
        {/* Dezenter Teal-Hauch. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_46%_42%_at_28%_32%,rgba(42,166,189,0.08),transparent_62%)]" />
        {/* Weicher Auslauf nach unten zum Seiteninhalt. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background sm:h-40 md:h-56" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 sm:px-8">
        <div className="max-w-4xl">
          <p {...enter(0, "font-serif text-base italic text-primary/90 md:text-lg")}>
            {eyebrow}
          </p>
          <h1 className="mt-5 flex flex-col leading-[0.98] [text-wrap:balance]">
            <span
              {...enter(
                90,
                "font-serif text-[clamp(2.25rem,8vw,5rem)] font-medium italic text-foreground/95 [overflow-wrap:anywhere] hyphens-auto",
              )}
            >
              {word1}
            </span>
            <span
              {...enter(
                160,
                "font-sans text-[clamp(2.25rem,8vw,5rem)] font-extrabold tracking-tighter text-foreground [overflow-wrap:anywhere]",
              )}
            >
              {word2}
            </span>
          </h1>
          <p
            {...enter(
              250,
              "mt-7 max-w-xl text-base font-light leading-relaxed text-foreground/70 md:text-lg",
            )}
          >
            {lead}
          </p>
          <div {...enter(340, "mt-10 flex flex-wrap items-center gap-3")}>
            <button
              type="button"
              onClick={openContactModal}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-7 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_28px_rgba(42,166,189,0.25)] ring-1 ring-primary/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <a
              href={secondaryHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 px-7 text-sm font-semibold text-foreground/85 backdrop-blur-md transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
            >
              {secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Marken-Strip (zurückhaltend, unter dem Hero). */}
      <div
        {...enter(440, "mx-auto mt-16 w-full max-w-5xl px-5 sm:px-8 md:mt-24")}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
          {brandsLabel}
        </p>
        <div className="relative mt-5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]">
          <div className="hero-marquee flex w-max py-1">
            <div className="flex shrink-0 items-center gap-12 pr-12">
              {brands.map((brand, i) => (
                <BrandLogo key={i} {...brand} />
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-12 pr-12"
              aria-hidden="true"
            >
              {brands.map((brand, i) => (
                <BrandLogo key={`c-${i}`} {...brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
