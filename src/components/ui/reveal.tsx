"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-Reveal: blendet Inhalte beim Eintritt in den Viewport sanft ein
 * (Fade + leichtes Hochgleiten). Per IntersectionObserver, einmalig.
 *
 * - `delay` ermöglicht gestaffelte Einblendungen (z. B. Grid-Items).
 * - `as` rendert das passende Element (z. B. "li" in Listen).
 * - Respektiert `prefers-reduced-motion` (zeigt Inhalt sofort).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  spotlight = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  /**
   * Mobile-Ersatz für :hover. Auf Touch-Geräten (kein Hover) bekommt das
   * Element `data-active="true"`, sobald es sich in der Bildschirmmitte
   * befindet – so lässt sich die Desktop-Hover-Wirkung per Scroll auslösen.
   */
  spotlight?: boolean;
}) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  // Spotlight nur auf Touch-Geräten ohne echtes :hover.
  useEffect(() => {
    if (!node || !spotlight) return;
    if (!window.matchMedia("(hover: none) and (pointer: coarse)").matches)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setActive(entry.isIntersecting);
      },
      // Schmales Band um die vertikale Bildschirmmitte.
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, spotlight]);

  return (
    <Tag
      ref={setNode}
      data-active={spotlight ? (active ? "true" : "false") : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-out will-change-[opacity,transform] motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
