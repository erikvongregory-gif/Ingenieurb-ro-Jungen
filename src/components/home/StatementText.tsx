"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/content/site";
import { Label } from "@/components/ui";

/** Schlüsselbegriff: wird beim Erreichen markiert und mit einer Positionsnummer versehen. */
function K({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span data-key className="relative [box-decoration-break:clone]">
      {children}
      <span
        data-tag
        aria-hidden
        className="relative -top-[1.7em] ml-[0.15em] inline-grid size-[max(22px,0.55em)] origin-bottom-left place-items-center rounded-full align-baseline border border-accent bg-paper font-mono text-[max(10px,0.24em)] font-medium leading-none tracking-normal text-accent"
      >
        0{n}
      </span>
    </span>
  );
}

/**
 * Gepinnter Statement-Text: Wörter schärfen sich beim Scrollen nacheinander aus der Unschärfe,
 * Schlüsselbegriffe werden wie mit einem Textmarker hervorgehoben und nummeriert.
 */
export function StatementText() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const text = root.current?.querySelector<HTMLElement>("[data-statement]");
      if (!text) return;
      const keys = Array.from(text.querySelectorAll<HTMLElement>("[data-key]"));
      const tags = Array.from(text.querySelectorAll<HTMLElement>("[data-tag]"));

      gsap.set(keys, {
        backgroundImage: "linear-gradient(var(--color-accent-soft), var(--color-accent-soft))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0% 88%",
        backgroundSize: "0% 42%",
      });

      if (prefersReducedMotion()) {
        gsap.set(keys, { backgroundSize: "100% 42%", color: "var(--color-accent)" });
        return;
      }

      const split = SplitText.create(text, { type: "words", ignore: "[data-tag]" });
      const words = split.words.filter((w) => !(w as HTMLElement).closest("[data-tag]"));
      const step = 0.12;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=170%",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.fromTo(
        words,
        { autoAlpha: 0.1, filter: "blur(10px)", yPercent: 18 },
        { autoAlpha: 1, filter: "blur(0px)", yPercent: 0, duration: 0.5, stagger: step, ease: "power2.out" },
        0,
      );

      keys.forEach((key, i) => {
        const first = words.findIndex((w) => key.contains(w));
        const at = Math.max(0, first) * step + 0.35;
        tl.to(key, { backgroundSize: "100% 42%", color: "var(--color-accent)", duration: 0.45, ease: "power2.inOut" }, at).fromTo(
          tags[i],
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(3)" },
          at + 0.2,
        );
      });

      tl.fromTo("[data-signature]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, ">-0.1")
        .fromTo("[data-signature-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "<")
        .to({}, { duration: 0.4 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="flex min-h-dvh flex-col justify-center py-24">
      <Label>Über das Ingenieurbüro</Label>
      <p
        data-statement
        className="mt-10 max-w-[28ch] text-[clamp(1.9rem,4.2vw,4rem)] font-medium leading-[1.14] tracking-[-0.03em] text-ink"
      >
        Seit über zwei Jahrzehnten entwickeln wir Automatisierungs&shy;lösungen, die <K n={1}>Technik</K>, <K n={2}>Effizienz</K> und{" "}
        <K n={3}>Zukunftsvision</K> verbinden. <K n={4}>Hersteller&shy;unabhängig</K>, mit <K n={5}>offenen Standards</K> und einem{" "}
        <K n={6}>Ansprechpartner</K>, der Ihre Anlage versteht.
      </p>
      <div data-signature className="mt-12 flex items-center gap-4">
        <span data-signature-line className="h-px w-12 origin-left bg-ink" />
        <span className="text-[0.95rem] text-ink-2">
          {site.person.name}, {site.person.role}
        </span>
      </div>
    </div>
  );
}
