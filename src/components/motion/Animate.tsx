"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Deklarative Scroll-Animationen für Server-Komponenten.
 * Elemente im Inhalt werden über Attribute gesteuert:
 *  data-reveal="lines"   Zeilen gleiten aus einer Maske
 *  data-reveal="up"      sanft von unten einblenden
 *  data-reveal="stagger" direkte Kinder nacheinander einblenden
 *  data-reveal="rule"    Linie wächst von links
 *  data-reveal="draw"    SVG-Striche zeichnen sich
 *  data-reveal="image"   Bild per Clip-Path aufdecken
 *  data-count="25"       Zahl zählt hoch
 *  data-scrub-words      Wörter färben sich beim Scrollen ein
 *  data-parallax="-12"   leichte Parallaxe (yPercent)
 */
export function Animate({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element = HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T & Element>(sel));

      if (prefersReducedMotion()) {
        gsap.set(q("[data-reveal]"), { autoAlpha: 1 });
        q("[data-count]").forEach((n) => (n.textContent = n.getAttribute("data-count")));
        return;
      }

      const start = "top 86%";

      q("[data-reveal='lines']").forEach((node) => {
        const split = SplitText.create(node, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.set(node, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          delay: Number(node.getAttribute("data-delay") ?? 0),
          scrollTrigger: { trigger: node, start },
        });
      });

      q("[data-reveal='up']").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(node.getAttribute("data-delay") ?? 0),
            scrollTrigger: { trigger: node, start },
          },
        );
      });

      q("[data-reveal='stagger']").forEach((node) => {
        gsap.set(node, { autoAlpha: 1 });
        gsap.from(node.children, {
          autoAlpha: 0,
          y: 32,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: node, start },
        });
      });

      q("[data-reveal='rule']").forEach((node) => {
        gsap.fromTo(
          node,
          { autoAlpha: 1, scaleX: 0, transformOrigin: "0% 50%" },
          { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: node, start } },
        );
      });

      q("[data-reveal='draw']").forEach((node) => {
        gsap.set(node, { autoAlpha: 1 });
        const shapes = Array.from(node.querySelectorAll("path, line, polyline, rect, circle")).filter(
          (s) => !s.closest("[data-nodraw]"),
        );
        gsap.from(shapes, {
          drawSVG: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: 0.04,
          scrollTrigger: { trigger: node, start: "top 80%" },
        });
      });

      q("[data-reveal='image']").forEach((node) => {
        const img = node.querySelector("img");
        gsap.set(node, { autoAlpha: 1 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: node, start: "top 80%" } });
        tl.fromTo(node, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        if (img) tl.from(img, { scale: 1.25, duration: 1.8, ease: "expo.out" }, 0);
      });

      q("[data-count]").forEach((node) => {
        const target = Number(node.getAttribute("data-count"));
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start },
          onUpdate: () => (node.textContent = String(Math.round(obj.v))),
        });
      });

      q("[data-scrub-words]").forEach((node) => {
        const split = SplitText.create(node, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: node, start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
      });

      q("[data-parallax]").forEach((node) => {
        gsap.fromTo(
          node,
          { yPercent: -Number(node.getAttribute("data-parallax")) },
          {
            yPercent: Number(node.getAttribute("data-parallax")),
            ease: "none",
            scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Schriften können Zeilenumbrüche verschieben
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
