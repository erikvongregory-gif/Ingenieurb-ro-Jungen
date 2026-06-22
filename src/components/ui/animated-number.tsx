"use client";

import { useEffect, useState } from "react";

/**
 * Zahl mit "Scramble/Decrypt"-Effekt: rattert beim Eintritt in den Viewport
 * kurz durch Zufallsziffern und rastet auf dem Zielwert ein (2-stellig).
 *
 * - SSR/No-JS zeigt direkt den Zielwert (kein Hydration-Mismatch, SEO-sicher).
 * - `delay` synchronisiert den Start mit gestaffelten Reveals.
 * - Respektiert `prefers-reduced-motion` (kein Effekt).
 */
export function AnimatedNumber({
  value,
  delay = 0,
  className,
}: {
  value: number;
  delay?: number;
  className?: string;
}) {
  const target = String(value).padStart(2, "0");
  const [display, setDisplay] = useState(target);
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let startTimeout = 0;
    let done = false;

    const run = () => {
      const duration = 750;
      const stepEvery = 55; // ms zwischen Zufallsziffern (Slot-Machine-Feel)
      const start = performance.now();
      let lastStep = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        if (elapsed >= duration) {
          setDisplay(target);
          return;
        }
        if (now - lastStep >= stepEvery) {
          lastStep = now;
          setDisplay(String(Math.floor(Math.random() * 100)).padStart(2, "0"));
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done) {
            done = true;
            observer.disconnect();
            startTimeout = window.setTimeout(run, delay);
            break;
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimeout);
    };
  }, [node, target, delay]);

  return (
    <span ref={setNode} aria-hidden="true" className={className}>
      {display}
    </span>
  );
}
