"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Dezenter Puls, der dem Mauszeiger folgt (wie eine Status-LED).
 * Über Links und Buttons wird der Ring etwas größer. Nur auf Geräten mit Maus.
 */
export function CursorPulse() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ring = el.querySelector<HTMLElement>("[data-ring]")!;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.4, overwrite: "auto" });
      const interactive = (e.target as Element | null)?.closest("a, button, [role='button'], input, textarea, label");
      gsap.to(ring, { scale: interactive ? 1.8 : 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };
    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.4, overwrite: "auto" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[45] hidden opacity-0 [@media(hover:hover)_and_(pointer:fine)]:block">
      <div data-ring className="absolute -left-4 -top-4 size-8">
        <span className="absolute inset-0 rounded-full border border-accent/40 [animation:cursor-pulse_2.4s_ease-out_infinite]" />
        <span className="absolute inset-0 rounded-full border border-accent/30 [animation:cursor-pulse_2.4s_ease-out_1.2s_infinite]" />
      </div>
    </div>
  );
}
