"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Handgezeichneter, leicht gebogener Unterstrich ("animated underline" /
 * "line draw"): Sobald der umschlossene Text in den Viewport scrollt, wird nach
 * kurzer Verzögerung eine geschwungene Akzent-Linie (Signal-Teal) von links
 * nach rechts darunter gezeichnet (SVG-Pfad via stroke-dashoffset).
 *
 * - Kein Layout-Shift (Linie liegt absolut unter dem Text).
 * - Respektiert `prefers-reduced-motion` (Linie erscheint ohne Animation).
 */
export function AnimatedUnderline({
  children,
  delay = 1600,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            timer = window.setTimeout(() => setActive(true), delay);
            break;
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <span ref={ref} className={cn("relative inline-block pb-[0.2em]", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 14"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[0.45em] w-full overflow-visible"
      >
        {/* Leicht geschwungene, handgezeichnete Linie. */}
        <path
          d="M3 9 C 70 3 130 12 165 7 C 210 1 260 3 297 8"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          style={{ strokeDashoffset: active ? 0 : 1 }}
          className="text-primary transition-[stroke-dashoffset] duration-[850ms] ease-out motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}
