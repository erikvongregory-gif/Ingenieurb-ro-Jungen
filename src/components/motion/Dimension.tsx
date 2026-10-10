"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PX_TO_MM = 25.4 / 96;
export const formatMm = (px: number) =>
  `${(px * PX_TO_MM).toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mm`;

type Props = {
  /** id des Elements, dessen Breite bemaßt wird (muss im selben positionierten Container liegen). */
  of: string;
  /** "top" = Maßlinie über dem Element, "bottom" = darunter. */
  side?: "top" | "bottom";
  /** Fester Text statt Messwert. */
  label?: string;
  /** Text vor dem Messwert. */
  prefix?: string;
  delay?: number;
  /** "load" = beim Laden, "scroll" = beim Einscrollen. */
  trigger?: "load" | "scroll";
  className?: string;
};

/** Bemaßungslinie im Stil einer technischen Zeichnung. Misst die echte Breite des Elements. */
export function Dimension({ of, side = "top", label, prefix, delay = 0, trigger = "load", className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const done = useRef(false);
  const boxRef = useRef(box);
  useEffect(() => {
    boxRef.current = box;
  }, [box]);

  // Messwert nach dem Einzählen und bei Größenänderung aktualisieren
  useEffect(() => {
    const value = root.current?.querySelector<HTMLElement>("[data-dim-value]");
    if (box && value && !label && (done.current || prefersReducedMotion())) value.textContent = formatMm(box.width);
  }, [box, label]);

  useEffect(() => {
    const target = document.getElementById(of);
    if (!target) return;
    const measure = () => setBox({ left: target.offsetLeft, width: target.offsetWidth });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(target);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [of]);

  useGSAP(
    () => {
      if (!box) return;
      const value = root.current?.querySelector<HTMLElement>("[data-dim-value]");
      if (prefersReducedMotion()) return;
      const st = trigger === "scroll" ? { trigger: root.current, start: "top 85%" } : undefined;
      const tl = gsap.timeline({ delay, scrollTrigger: st, onComplete: () => {
          done.current = true;
          if (value && !label && boxRef.current) value.textContent = formatMm(boxRef.current.width);
        } });
      tl.from("[data-dim-tick]", { scaleY: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 })
        .from("[data-dim-line]", { scaleX: 0, duration: 1, ease: "expo.inOut" }, 0.1)
        .from("[data-dim-label]", { autoAlpha: 0, y: side === "top" ? 6 : -6, duration: 0.6, ease: "power2.out" }, 0.6);
      if (value && !label) {
        const obj = { v: 0 };
        tl.to(obj, { v: () => boxRef.current?.width ?? 0, duration: 1.1, ease: "power3.out", onUpdate: () => (value.textContent = formatMm(obj.v)) }, 0.6);
      }
    },
    { scope: root, dependencies: [box === null] },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className={cn(
        "pointer-events-none absolute flex h-5 items-center text-accent",
        side === "top" ? "-top-6" : "-bottom-5",
        !box && "invisible",
        className,
      )}
      style={box ? { left: box.left, width: box.width } : undefined}
    >
      <span data-dim-tick className="absolute left-0 h-full w-px origin-bottom bg-current" />
      <span data-dim-tick className="absolute right-0 h-full w-px origin-bottom bg-current" />
      <span data-dim-line className="absolute inset-x-0 top-1/2 flex h-px items-center bg-current">
        <svg viewBox="0 0 8 8" className="absolute -left-px size-2"><path d="M0 4 L8 1 V7 Z" fill="currentColor" /></svg>
        <svg viewBox="0 0 8 8" className="absolute -right-px size-2"><path d="M8 4 L0 1 V7 Z" fill="currentColor" /></svg>
      </span>
      <span
        data-dim-label
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-paper px-2 font-mono text-[0.68rem] tracking-[0.04em] md:text-xs"
      >
        {prefix && <span className="text-muted">{prefix} </span>}
        <span data-dim-value>{label ?? ""}</span>
      </span>
    </div>
  );
}
