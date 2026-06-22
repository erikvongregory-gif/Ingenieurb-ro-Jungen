"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* -----------------------------------------------------------------------------
 * BRAND-MARQUEE
 * Technologien & Partner, mit denen das Ingenieurbüro Jungen arbeitet.
 * Freigestellte Logo-Bilder auf hellen Chips (gute Lesbarkeit auf dunklem Grund).
 * -------------------------------------------------------------------------- */

type Brand = { name: string; src: string };

const DEFAULT_BRANDS: Brand[] = [
  { name: "Emerson", src: "/brands/emerson.png" },
  { name: "GE Digital", src: "/brands/ge-digital.png" },
  { name: "Beckhoff", src: "/brands/beckhoff.png" },
  { name: "Siemens", src: "/brands/siemens.png" },
  { name: "CODESYS", src: "/brands/codesys.png" },
  { name: "Linux", src: "/brands/linux.png" },
  { name: "Fieron Automation GmbH", src: "/brands/fieron-automation.png" },
];

function BrandLogo({ name, src }: Brand) {
  return (
    <span className="flex h-12 sm:h-14 items-center justify-center rounded-xl bg-white/95 px-4 sm:px-5 ring-1 ring-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25)] opacity-90 hover:opacity-100 transition-opacity duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="h-6 sm:h-7 w-auto max-w-[140px] object-contain select-none"
      />
    </span>
  );
}

/* -----------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE
 * Calibrated outward expansion ripple: extremely smooth and slightly relaxed
 * to feel cohesive, satisfyingly responsive, and visually distinct.
 * -------------------------------------------------------------------------- */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number,
  fill: { current: string | null },
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x,
    y,
    color,
    ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      if (fill.current !== p.color) {
        ctx.fillStyle = p.color;
        fill.current = p.color;
      }
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef<number>(0);
  const lastFrameRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const fillRef = useRef<{ current: string | null }>({ current: null });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current
      ? 0
      : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current
          ? 0
          : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(
          createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay, fillRef.current),
        );
      }
    }

    // Nach Farbe gruppieren -> weniger fillStyle-Wechsel pro Frame.
    pixels.sort((a, b) => (a.color < b.color ? -1 : a.color > b.color ? 1 : 0));

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fillRef.current.current = null;

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    // Animation nur laufen lassen, solange der Hero sichtbar ist.
    // Beim Wegscrollen wird die rAF-Schleife gestoppt -> kein Ruckeln/Akku-Drain.
    const wrap = wrapRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          animate("appear");
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0 },
    );
    if (wrap) io.observe(wrap);

    return () => {
      resizeObserver.disconnect();
      io.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * HERO COMPONENT
 * -------------------------------------------------------------------------- */

interface PixelHeroProps {
  word1?: string;
  word2?: string;
  description?: string;
  primaryCta?: string;
  primaryCtaMobile?: string;
  secondaryCta?: string;
  secondaryCtaMobile?: string;
  /** Ziel-URL primärer CTA (z. B. /kontakt). */
  primaryHref?: string;
  /** Ziel-URL sekundärer CTA (z. B. /referenzen). */
  secondaryHref?: string;
  /** Marken-/Partner-Logos im Marquee. */
  brands?: Brand[];
  /** Überschrift über dem Marquee. */
  brandsLabel?: string;
}

export function PixelHero({
  word1 = "Industrieautomation",
  word2 = "& Retrofit",
  description = "Messen Sie uns an Ihren Herausforderungen.",
  primaryCta = "Kontakt aufnehmen",
  primaryCtaMobile = "Kontakt",
  secondaryCta = "Referenzen ansehen",
  secondaryCtaMobile = "Referenzen",
  primaryHref = "#",
  secondaryHref = "#",
  brands = DEFAULT_BRANDS,
  brandsLabel = "Technologien & Partner, mit denen wir arbeiten",
}: PixelHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Theme-Farben aus den CSS-Variablen lesen und State außerhalb des
    // synchronen Effect-Körpers setzen (vermeidet kaskadierende Renders).
    const raf = requestAnimationFrame(() => {
      const div = document.createElement("div");
      document.body.appendChild(div);
      div.className = "text-muted-foreground";
      const muted = getComputedStyle(div).color;
      div.className = "text-primary";
      const primary = getComputedStyle(div).color;
      document.body.removeChild(div);

      setThemeColors([muted, muted, muted, muted, primary]);
    });

    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div className="relative w-full md:min-h-[100dvh] bg-background flex flex-col md:justify-center md:gap-6 pt-24 pb-16 md:py-0 px-4 sm:px-6 overflow-hidden select-none isolate">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .tahoe-glass-text {
            color: transparent;
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.9) 55%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 1) 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
            filter: drop-shadow(0 12px 28px rgba(0,0,0,0.35));
            animation: shimmer 8s linear infinite;
            will-change: background-position;
            contain: paint;
        }
        @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tahoe-glass-text { animation: none; }
          .animate-marquee { animation: none; }
        }
      `}</style>

      {/* Permanent canvas background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {themeColors.length > 0 && (
          <PixelCanvas colors={themeColors} gap={10} speed={30} />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] pointer-events-none opacity-80" />
      </div>

      {/* Top Container: Tahoe Glass Header */}
      <div className="flex flex-col items-center justify-center text-center order-1 md:order-1 mt-0 pointer-events-none w-full">
        <h1 className="tahoe-glass-text flex flex-col items-center justify-center gap-1.5 sm:gap-3 lg:gap-4 px-1 w-full text-[clamp(1.7rem,8vw,3.75rem)] md:text-8xl lg:text-9xl leading-tight md:leading-none [text-wrap:balance]">
          <span className="font-serif italic font-medium">{word1}</span>
          <span className="font-sans font-extrabold tracking-tighter">
            {word2}
          </span>
        </h1>
      </div>

      {/* Center Container: Description */}
      <div className="flex flex-col items-center justify-center text-center mt-5 md:mt-0 order-2 md:order-2 px-1 w-full pointer-events-none">
        <p className="text-sm sm:text-lg md:text-xl font-light text-foreground/85 max-w-[92%] sm:max-w-md md:max-w-xl px-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Container: CTA Row */}
      <div
        className={cn(
          "pointer-events-auto flex flex-row items-center justify-center gap-3 mt-7 md:mt-10 mb-0 md:mb-0 order-3 md:order-3 transition-all duration-1000 transform px-1",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        style={{ transitionDelay: "450ms" }}
      >
        <a
          href={primaryHref}
          className="relative inline-flex h-10 md:h-12 items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-4 md:px-8 text-xs md:text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span className="inline md:hidden">{primaryCtaMobile}</span>
          <span className="hidden md:inline">{primaryCta}</span>
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </a>
        <a
          href={secondaryHref}
          className="relative inline-flex h-10 md:h-12 items-center justify-center gap-1.5 md:gap-2 rounded-xl bg-gradient-to-b from-card/80 to-card px-4 md:px-8 text-xs md:text-sm font-semibold text-card-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(0,0,0,0.05)] ring-1 ring-border/50 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span className="inline md:hidden">{secondaryCtaMobile}</span>
          <span className="hidden md:inline">{secondaryCta}</span>
        </a>
      </div>

      {/* Mobile-only Marquee Block */}
      <div className="block md:hidden order-4 w-full mt-12 pointer-events-auto">
        <div className="mb-4 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
          {brandsLabel}
        </div>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex w-max py-1 animate-marquee">
            <div className="flex shrink-0 items-center gap-12 pr-12">
              {brands.map((brand, i) => (
                <BrandLogo key={i} name={brand.name} src={brand.src} />
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-12 pr-12"
              aria-hidden="true"
            >
              {brands.map((brand, i) => (
                <BrandLogo key={`c-${i}`} name={brand.name} src={brand.src} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop-only Marquee Block */}
      <div
        className={cn(
          "hidden md:flex absolute bottom-8 left-0 right-0 w-full z-10 pointer-events-auto flex-col items-center justify-center gap-4 transition-all duration-1000 transform order-3 md:order-4",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        style={{ transitionDelay: "600ms" }}
      >
        <span className="text-xs uppercase tracking-wider text-muted-foreground/80 font-medium select-none">
          {brandsLabel}
        </span>
        <div className="relative w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <div className="flex w-max py-3 animate-marquee">
            <div className="flex shrink-0 items-center gap-16 pr-16">
              {brands.map((brand, i) => (
                <BrandLogo key={i} name={brand.name} src={brand.src} />
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden="true">
              {brands.map((brand, i) => (
                <BrandLogo key={`c-${i}`} name={brand.name} src={brand.src} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
