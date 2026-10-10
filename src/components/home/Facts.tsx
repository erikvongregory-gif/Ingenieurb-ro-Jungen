"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { facts } from "@/content/site";

const STRIP = [...Array(20)].map((_, i) => i % 10);
/** Endposition einer Ziffernrolle (zweite Runde, damit sie sichtbar rollt). */
const restPercent = (d: number) => -((10 + d) * 100) / STRIP.length;

/** Zählwerk: jede Ziffer ist eine Rolle von 0–9. */
function Odometer({ value }: { value: number }) {
  return (
    <span className="inline-flex tabular-nums" aria-label={String(value)}>
      {String(value)
        .split("")
        .map((d, i) => (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden">
            <span data-reel={d} className="block" style={{ transform: `translateY(${restPercent(Number(d))}%)` }}>
              {STRIP.map((n, j) => (
                <span key={j} className="block h-[1em] leading-none">
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
    </span>
  );
}

export function Facts() {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cells = gsap.utils.toArray<HTMLElement>("[data-fact]");
      cells.forEach((cell, i) => {
        const tl = gsap.timeline({
          delay: i * 0.12,
          scrollTrigger: { trigger: root.current, start: "top 82%" },
          defaults: { ease: "expo.out" },
        });
        const reels = cell.querySelectorAll<HTMLElement>("[data-reel]");
        // Ruheposition aus dem Style an GSAP übergeben
        reels.forEach((reel) => (reel.style.transform = ""));
        tl.from(cell.querySelector("[data-fact-label]"), { autoAlpha: 0, y: 8, duration: 0.6 }, 0)
          .from(cell.querySelector("[data-fact-ticks]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: "power2.inOut" }, 0)
          .from(cell.querySelector("[data-fact-fill]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 2.2, ease: "power3.inOut" }, 0.2)
          .from(cell.querySelector("[data-fact-needle]"), { left: "0%", duration: 2.2, ease: "power3.inOut" }, 0.2)
          .from(cell.querySelector("[data-fact-text]"), { autoAlpha: 0, y: 12, duration: 0.9 }, 0.6)
          .from(cell.querySelector("[data-fact-suffix]"), { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: "back.out(3)" }, 1.9);
        reels.forEach((reel, r) => {
          tl.fromTo(
            reel,
            { yPercent: 0, y: 0 },
            { yPercent: restPercent(Number(reel.dataset.reel)), duration: 2.2 + r * 0.25, ease: "power4.inOut" },
            0.15,
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {facts.map((f, i) => (
        <li key={f.label} data-fact className="group relative bg-paper p-6 transition-colors duration-500 hover:bg-surface md:p-8">
          <p data-fact-label className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
            Messwert 0{i + 1}
          </p>
          <p className="mt-5 flex items-start text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.04em] text-ink">
            <Odometer value={f.value} />
            {f.suffix && (
              <span data-fact-suffix className="text-accent">
                {f.suffix}
              </span>
            )}
          </p>

          {/* Messskala mit Zeiger */}
          <div className="relative mt-6 h-3" aria-hidden>
            <div
              data-fact-ticks
              className="absolute inset-x-0 bottom-0 h-2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgb(14 26 43 / 0.35) 0 1px, transparent 1px 10px), repeating-linear-gradient(to right, rgb(14 26 43 / 0.55) 0 1px, transparent 1px 50px)",
                backgroundSize: "100% 50%, 100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left bottom, left bottom",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
            <div data-fact-fill className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
            <span data-fact-needle className="absolute -top-1.5 left-full -translate-x-1/2">
              <svg viewBox="0 0 10 8" className="size-2.5 text-accent">
                <path d="M0 0 H10 L5 8 Z" fill="currentColor" />
              </svg>
            </span>
          </div>

          <p data-fact-text className="mt-4 max-w-[24ch] text-sm leading-snug text-muted">
            {f.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
