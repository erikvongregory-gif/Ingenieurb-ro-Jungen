"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Button, Container } from "@/components/ui";
import { Dimension } from "@/components/motion/Dimension";
import { TitleBlock } from "./TitleBlock";

const lead =
  "Automation und Retrofit für Maschinen und Anlagen. Von der Prozesslogik bis zur Inbetriebnahme, herstellerunabhängig und mit über 25 Jahren Erfahrung.";

/** Eine Zeile der Headline mit Maske für den Einlauf. */
function Line({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative block ${className ?? ""}`}>
      <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
        <span data-hl className="invisible block">{children}</span>
      </span>
    </span>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set("[data-hl], [data-hf]", { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-h='meta']", { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.08 }, 0.1)
        .fromTo("[data-hl]", { yPercent: 108, autoAlpha: 1 }, { yPercent: 0, duration: 1.5, stagger: 0.11 }, 0.2)
        .fromTo("[data-hf]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.9)
        .from("[data-tb-cell]", { autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "power2.out" }, 1.3);

      // Headline driftet beim Scrollen leicht, das Raster bleibt stehen
      gsap.to("[data-h='title']", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-36">
      {/* Zeichenpapier: Feinraster + Hauptraster */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(14 26 43 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(14 26 43 / 0.07) 1px, transparent 1px), linear-gradient(to right, rgb(14 26 43 / 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgb(14 26 43 / 0.03) 1px, transparent 1px)",
          backgroundSize: "96px 96px, 96px 96px, 12px 12px, 12px 12px",
        }}
      />
      <Container className="relative">
        <div className="flex items-center justify-between gap-6">
          <p data-h="meta" className="label flex items-center gap-3">
            <span className="size-2 rounded-full bg-ok [animation:pulse-dot_2s_ease-in-out_infinite]" />
            Ingenieurbüro für Industrieautomation
          </p>
          <p data-h="meta" className="label hidden md:block">Blatt 01 · Maßstab 1:1</p>
        </div>

        <div data-h="title" className="relative mt-16 [--h1:min(calc((100vw_-_6rem)/8.7),8.8rem)] md:mt-20">
          <h1
            className="text-[clamp(2.6rem,11vw,5rem)] sm:text-[calc((100vw_-_4rem)/8.7)] lg:text-[length:var(--h1)] font-medium leading-[0.9] tracking-[-0.05em] text-ink"
          >
            <Line>
              <span id="dim-messen" className="inline-block">Messen</span> Sie uns
            </Line>
            <Line>an Ihren</Line>
            <Line>
              <span id="dim-heraus" className="inline-block text-accent">Heraus&shy;forderungen.</span>
            </Line>
          </h1>

          {/* Maßlinien liegen außerhalb der Masken, gemessen wird das echte Wort */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Dimension of="dim-messen" side="top" delay={1.1} className="-top-8" />
            <Dimension of="dim-heraus" side="bottom" prefix="Ihr Maßstab:" delay={1.5} className="-bottom-8" />
          </div>

          <p
            data-hf
            className="invisible absolute right-0 top-[calc(var(--h1)*0.98)] hidden max-w-[28rem] text-lg leading-relaxed text-ink-2 xl:block"
          >
            {lead}
          </p>
        </div>

        <p data-hf className="invisible mt-14 max-w-xl text-lg leading-relaxed text-ink-2 xl:hidden">
          {lead}
        </p>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <div data-hf className="invisible flex flex-wrap items-center gap-3 lg:col-span-5">
            <Button href="/kontakt">Herausforderung schildern</Button>
            <Button href="/referenzen" variant="secondary">Referenzen</Button>
          </div>
          <div data-hf className="invisible lg:col-span-6 lg:col-start-7">
            <TitleBlock />
          </div>
        </div>
      </Container>
    </section>
  );
}
