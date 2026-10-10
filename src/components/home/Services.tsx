"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Container, Label } from "@/components/ui";
import { MigrationArt, RobotArt } from "@/components/illustrations";

const cards = [
  {
    ...services.automation,
    points: services.automation.scope.map((s) => s.title),
    Art: RobotArt,
  },
  {
    ...services.retrofit,
    points: services.retrofit.steps.map((s) => s.title),
    Art: MigrationArt,
  },
];

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card, i) => {
        const inner = card.querySelector<HTMLElement>("[data-card-inner]")!;

        // Karte klappt beim Scrollen aus der Tiefe auf
        gsap.fromTo(
          card,
          { rotateX: 28, y: 140 + i * 60, scale: 0.9, autoAlpha: 0.2, transformOrigin: "50% 100%" },
          {
            rotateX: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top 45%", scrub: 0.8 },
          },
        );

        // Inhalte werden eingezeichnet
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 60%" },
          defaults: { ease: "expo.out" },
        });
        tl.from(card.querySelector("[data-card-index]"), { yPercent: 100, duration: 0.9 }, 0)
          .from(card.querySelector("[data-card-title]"), { yPercent: 105, duration: 1.1 }, 0.05)
          .from(card.querySelector("[data-card-lead]"), { autoAlpha: 0, y: 14, duration: 0.9 }, 0.2)
          .from(card.querySelectorAll("[data-card-rule]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1, ease: "power3.inOut", stagger: 0.08 }, 0.25)
          .from(card.querySelectorAll("[data-card-point]"), { autoAlpha: 0, x: -18, duration: 0.8, stagger: 0.08 }, 0.4)
          .from(card.querySelector("[data-card-arrow]"), { scale: 0, rotate: -90, duration: 0.8, ease: "back.out(2)" }, 0.3);

        // Maus: leichte 3D-Neigung und Lichtkegel
        mm.add("(hover: hover) and (pointer: fine)", () => {
          const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
          const arrow = card.querySelector<HTMLElement>("[data-card-arrow]")!;
          const ax = gsap.quickTo(arrow, "x", { duration: 0.5, ease: "power3.out" });
          const ay = gsap.quickTo(arrow, "y", { duration: 0.5, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const r = inner.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            rx((0.5 - py) * 5);
            ry((px - 0.5) * 6);
            ax((px - 0.85) * 18);
            ay((py - 0.1) * 12);
            inner.style.setProperty("--mx", `${px * 100}%`);
            inner.style.setProperty("--my", `${py * 100}%`);
          };
          const onLeave = () => {
            rx(0);
            ry(0);
            ax(0);
            ay(0);
          };
          card.addEventListener("pointermove", onMove);
          card.addEventListener("pointerleave", onLeave);
          return () => {
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerleave", onLeave);
          };
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="pb-24 md:pb-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Label>Leistungen</Label>
            <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              Zwei Disziplinen. Ein durchgängiger Lebenszyklus.
            </h2>
          </div>
          <p data-reveal="up" className="text-lg leading-relaxed text-ink-2 md:col-span-5">
            Neue Anlagen automatisieren wir von Grund auf. Bestehende bringen wir per Retrofit auf den Stand der Technik. So begleiten wir Ihre Maschinen über ihre gesamte Lebensdauer.
          </p>
        </div>

        <div className="mt-16 grid gap-5 [perspective:1400px] lg:grid-cols-2">
          {cards.map(({ Art, ...c }) => (
            <Link key={c.href} href={c.href} data-card className="group block [transform-style:preserve-3d]">
              <div
                data-card-inner
                className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 [--mx:50%] [--my:0%] group-hover:border-line-strong group-hover:shadow-[0_40px_80px_-40px_rgb(14_26_43/0.35)] md:p-10"
              >
                {/* Lichtkegel */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), rgb(31 70 196 / 0.08), transparent 60%)" }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="overflow-hidden font-mono text-sm text-accent">
                    <span data-card-index className="block">{c.index}</span>
                  </span>
                  <span
                    data-card-arrow
                    className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-white"
                  >
                    <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.6} />
                  </span>
                </div>
                <div className="relative mx-auto my-6 aspect-[32/22] w-full max-w-[360px] text-ink transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                  <Art className="h-full w-full" />
                </div>
                <h3 className="relative overflow-hidden pb-[0.08em] text-4xl font-medium tracking-[-0.03em] md:text-6xl">
                  <span data-card-title className="block">{c.title}</span>
                </h3>
                <p data-card-lead className="relative mt-3 max-w-md text-[1.05rem] leading-relaxed text-ink-2">
                  {c.lead}
                </p>
                <ul className="relative mt-8">
                  <li data-card-rule className="h-px bg-line" aria-hidden />
                  {c.points.map((p, i) => (
                    <li key={p}>
                      <div data-card-point className="flex items-center gap-4 py-3.5 text-[0.98rem] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-1">
                        <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                        {p}
                      </div>
                      <div data-card-rule className="h-px bg-line" aria-hidden />
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
