"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { services } from "@/content/site";
import { Label } from "@/components/ui";

const MODULES = ["PWR", "CPU", "DI", "DI", "DO", "DO", "AI", "COM"];
const SLOT_X = (i: number) => 84 + i * 60;
const OLD = { fill: "#ece7db", stroke: "#a39878", text: "#8a7f63" };

/**
 * Scroll-gesteuerte Szene: Ein Schaltschrank wird von einer abgekündigten
 * GE-Fanuc 90-30 auf eine Emerson RX3i umgebaut, synchron zu den vier Retrofit-Phasen.
 */
export function RetrofitScrub() {
  const root = useRef<HTMLElement>(null);
  const steps = services.retrofit.steps;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const items = q("[data-phase]");
      const fills = q("[data-phase-fill]");
      const pct = q("[data-pct]")[0];

      const setPhase = (p: number) => {
        const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
        items.forEach((el) => el.setAttribute("data-active", String(Number(el.dataset.phase) === idx)));
        fills.forEach((el) => gsap.set(el, { scaleX: gsap.utils.clamp(0, 1, p * steps.length - Number(el.dataset.phaseFill)) }));
        if (pct) pct.textContent = `${Math.round(p * 100)} %`;
      };

      // Wire-Pfade vorbereiten
      q("[data-wire]").forEach((w) => gsap.set(w, { drawSVG: 0 }));

      if (prefersReducedMotion()) {
        // Endzustand zeigen
        gsap.set(q("[data-old]"), { autoAlpha: 0 });
        gsap.set(q("[data-new], [data-run], [data-led-on]"), { autoAlpha: 1, y: 0 });
        gsap.set(q("[data-wire], [data-trend]"), { drawSVG: "100%" });
        gsap.set(q("[data-legacy], [data-nosignal]"), { autoAlpha: 0 });
        setPhase(1);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=340%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => setPhase(self.progress),
        },
      });

      // Phase 1: Analyse – Scanner fährt über den Schrank, alte Module werden markiert
      tl.fromTo(q("[data-scan]"), { y: 0, autoAlpha: 1 }, { y: 470, duration: 0.8, ease: "power1.inOut" }, 0)
        .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.1 }, 0.8)
        .from(q("[data-warn]"), { scale: 0, transformOrigin: "50% 100%", stagger: 0.07, duration: 0.2, ease: "back.out(3)" }, 0.15)
        .from(q("[data-measure]"), { drawSVG: 0, duration: 0.5 }, 0.3)
        .from(q("[data-measure-label]"), { autoAlpha: 0, duration: 0.2 }, 0.6)

        // Phase 2: Konzept – Geisterumrisse der neuen Module
        .from(q("[data-ghost]"), { autoAlpha: 0, y: -8, stagger: 0.06, duration: 0.3 }, 1.05)
        .from(q("[data-plan]"), { autoAlpha: 0, duration: 0.3 }, 1.4)
        .to(q("[data-warn]"), { autoAlpha: 0, duration: 0.2 }, 1.7)

        // Phase 3: Implementierung – alt raus, neu rein, verdrahten
        .to(q("[data-old]"), { y: 36, autoAlpha: 0, stagger: 0.07, duration: 0.3, ease: "power2.in" }, 2.0)
        .fromTo(q("[data-new]"), { y: -40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.35, ease: "power3.out" }, 2.2)
        .to(q("[data-ghost], [data-plan]"), { autoAlpha: 0, duration: 0.2 }, 2.6)
        .to(q("[data-wire]"), { drawSVG: "100%", stagger: 0.03, duration: 0.4 }, 2.5)

        // Phase 4: Übergabe – Anlage läuft
        .to(q("[data-legacy], [data-nosignal]"), { autoAlpha: 0, duration: 0.15 }, 3.05)
        .fromTo(q("[data-run]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 3.15)
        .fromTo(q("[data-led-on]"), { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.03, duration: 0.1 }, 3.1)
        .fromTo(q("[data-trend]"), { drawSVG: 0 }, { drawSVG: "100%", duration: 0.6 }, 3.2)
        .from(q("[data-check]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.2, ease: "back.out(3)" }, 3.6)
        .to({}, { duration: 0.25 });

      setPhase(0);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden border-y border-line bg-paper-2/70">
      <div className="mx-auto grid h-dvh max-h-[62.5rem] min-h-[40rem] w-full max-w-[82.5rem] grid-rows-[auto_1fr_auto] gap-6 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-12 lg:px-12 lg:py-24">
        {/* Text */}
        <div className="lg:col-span-4">
          <Label>Retrofit in Echtzeit</Label>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            Scrollen Sie durch ein Retrofit.
          </h2>
          <p className="mt-5 hidden max-w-md text-lg leading-relaxed text-ink-2 xl:block">
            Von der abgekündigten GE-Fanuc 90-30 zur Emerson RX3i, so wie in unserer Referenz für Nuklearmedizin und Kläranlagen.
          </p>

          <ol className="mt-8 hidden border-t border-line lg:block">
            {steps.map((s, i) => (
              <li key={s.title} data-phase={i} data-active={i === 0} className="group border-b border-line py-3 text-muted transition-colors duration-300 data-[active=true]:text-ink">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs group-data-[active=true]:text-accent">0{i + 1}</span>
                  <span className="text-xl font-medium tracking-tight">{s.title}</span>
                </div>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-expo group-data-[active=true]:grid-rows-[1fr]">
                  <p className="overflow-hidden pl-9 text-[0.95rem] leading-relaxed text-ink-2">
                    <span className="block pt-2">{s.text}</span>
                  </p>
                </div>
                <div className="ml-9 mt-3 h-px bg-line">
                  <div data-phase-fill={i} className="h-px origin-left scale-x-0 bg-accent" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Zeichnung */}
        <div className="relative min-h-0 lg:col-span-8">
          <div className="relative mx-auto h-full max-h-full w-full max-w-[51rem] lg:h-auto">
            <CabinetSvg />
            <div className="absolute right-3 top-3 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] tabular-nums text-ink-2">
              Fortschritt <span data-pct>0 %</span>
            </div>
          </div>
        </div>

        {/* Mobile: aktive Phase */}
        <div className="relative h-28 lg:hidden">
          {steps.map((s, i) => (
            <div key={s.title} data-phase={i} data-active={i === 0} className="absolute inset-0 opacity-0 transition-opacity duration-300 data-[active=true]:opacity-100">
              <p className="font-mono text-xs text-accent">Phase 0{i + 1}</p>
              <p className="mt-1 text-xl font-medium tracking-tight">{s.title}</p>
              <p className="mt-1 line-clamp-2 text-[0.95rem] leading-snug text-ink-2">{s.text}</p>
              <div className="mt-3 h-px bg-line">
                <div data-phase-fill={i} className="h-px origin-left scale-x-0 bg-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CabinetSvg() {
  return (
    <svg viewBox="0 0 640 560" className="h-full w-full" role="img" aria-label="Schaltschrank: Austausch einer GE-Fanuc 90-30 gegen eine Emerson RX3i">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#c4c1b6" strokeWidth="1" />
        </pattern>
        <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f46c4" stopOpacity="0" />
          <stop offset="0.85" stopColor="#1f46c4" stopOpacity="0.16" />
          <stop offset="1" stopColor="#1f46c4" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id="cab-clip">
          <rect x="40" y="44" width="560" height="480" />
        </clipPath>
      </defs>

      {/* Schrank */}
      <rect x="20" y="20" width="600" height="520" rx="8" fill="#fff" stroke="#0e1a2b" strokeWidth="1.5" />
      <rect x="40" y="44" width="560" height="480" fill="#faf9f6" stroke="#dcdad2" />
      <text x="40" y="36" className="fill-[#5d6877] font-mono text-[10px] uppercase tracking-[0.12em]">=A1 · Schaltschrank Steuerung</text>
      <text x="600" y="36" textAnchor="end" className="fill-[#5d6877] font-mono text-[10px] uppercase tracking-[0.12em]">Blatt 02</text>

      {/* Kabelkanäle */}
      <rect x="56" y="58" width="528" height="20" fill="url(#hatch)" stroke="#c4c1b6" />
      <rect x="56" y="262" width="528" height="20" fill="url(#hatch)" stroke="#c4c1b6" />

      {/* Tragschiene */}
      <rect x="56" y="160" width="528" height="10" fill="#e4e2db" stroke="#c4c1b6" />

      {/* Maß über dem Rack (Analyse) */}
      <g stroke="#1f46c4" strokeWidth="1" fill="none">
        <path data-measure d="M78 92 H562" />
        <path data-measure d="M78 86 V98 M562 86 V98" />
      </g>
      <text data-measure-label x="320" y="89" textAnchor="middle" className="fill-[#1f46c4] font-mono text-[9px]">
        8 Slots · Bestand erfasst
      </text>

      {/* Alte Module (GE-Fanuc 90-30) */}
      {MODULES.map((m, i) => (
        <g key={`old-${i}`} data-old>
          <rect x={SLOT_X(i)} y="106" width="52" height="128" rx="3" fill={OLD.fill} stroke={OLD.stroke} strokeDasharray="3 3" />
          <circle cx={SLOT_X(i) + 12} cy="120" r="2.6" fill={i === 1 ? "#e2731f" : "#cfc8b4"} />
          <circle cx={SLOT_X(i) + 21} cy="120" r="2.6" fill="#cfc8b4" />
          <text x={SLOT_X(i) + 26} y="196" textAnchor="middle" className="font-mono text-[9px]" fill={OLD.text}>{m}</text>
          <text x={SLOT_X(i) + 26} y="222" textAnchor="middle" className="font-mono text-[7.5px]" fill={OLD.text}>IC693</text>
          <g data-warn>
            <path d={`M${SLOT_X(i) + 40} 98 l8 14 h-16 z`} fill="#e2731f" />
            <text x={SLOT_X(i) + 40} y="110" textAnchor="middle" className="fill-white text-[9px] font-bold">!</text>
          </g>
        </g>
      ))}

      {/* Planung: Geisterumrisse */}
      {MODULES.map((_, i) => (
        <rect key={`ghost-${i}`} data-ghost x={SLOT_X(i) - 3} y="103" width="58" height="134" rx="4" fill="none" stroke="#1f46c4" strokeDasharray="5 4" />
      ))}
      <text data-plan x="320" y="252" textAnchor="middle" className="fill-[#1f46c4] font-mono text-[10px] uppercase tracking-[0.1em]">
        Konzept: Migration auf Emerson RX3i
      </text>

      {/* Neue Module (Emerson RX3i) */}
      {MODULES.map((m, i) => (
        <g key={`new-${i}`} data-new style={{ opacity: 0, visibility: "hidden" }}>
          <rect x={SLOT_X(i)} y="106" width="52" height="128" rx="3" fill={i === 1 ? "#1f46c4" : "#0e1a2b"} />
          <rect x={SLOT_X(i) + 6} y="136" width="40" height="40" rx="2" fill="#fff" opacity="0.06" />
          <circle cx={SLOT_X(i) + 12} cy="120" r="2.6" fill="#33445c" />
          <circle cx={SLOT_X(i) + 21} cy="120" r="2.6" fill="#33445c" />
          <circle data-led-on cx={SLOT_X(i) + 12} cy="120" r="2.6" fill="#4ade80" style={{ opacity: 0 }} />
          <circle data-led-on cx={SLOT_X(i) + 21} cy="120" r="2.6" fill={i === 7 ? "#e2731f" : "#4ade80"} style={{ opacity: 0 }} />
          <text x={SLOT_X(i) + 26} y="196" textAnchor="middle" className="fill-white font-mono text-[9px]">{m}</text>
          <text x={SLOT_X(i) + 26} y="222" textAnchor="middle" className="fill-white/60 font-mono text-[7.5px]">IC695</text>
        </g>
      ))}

      {/* Klemmleiste */}
      <rect x="56" y="300" width="528" height="8" fill="#e4e2db" stroke="#c4c1b6" />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={`t-${i}`} x={64 + i * 21.5} y="290" width="15" height="40" rx="2" fill="#fff" stroke="#9aa3ae" />
      ))}

      {/* Verdrahtung */}
      <g fill="none" stroke="#1f46c4" strokeWidth="1.4" strokeLinecap="round">
        {MODULES.map((_, i) =>
          [0, 1, 2].map((k) => {
            const x1 = SLOT_X(i) + 14 + k * 12;
            const t = Math.min(23, i * 3 + k);
            const x2 = 71.5 + t * 21.5;
            return <path key={`w-${i}-${k}`} data-wire d={`M${x1} 234 V${250 + k * 3} H${x2} V290`} />;
          }),
        )}
      </g>

      {/* HMI */}
      <rect x="56" y="360" width="300" height="148" rx="8" fill="#fff" stroke="#0e1a2b" strokeWidth="1.2" />
      <rect x="68" y="372" width="276" height="112" rx="4" fill="#eef0f3" />
      <text data-nosignal x="206" y="432" textAnchor="middle" className="fill-[#9aa3ae] font-mono text-[10px] uppercase tracking-[0.12em]">Kein Signal</text>
      <path data-trend d="M78 466 L110 452 L138 458 L166 434 L196 442 L224 418 L254 426 L284 402 L334 408" fill="none" stroke="#1f46c4" strokeWidth="2" style={{ strokeDasharray: "0 9999" }} />
      <text x="68" y="499" className="fill-[#5d6877] font-mono text-[8.5px] uppercase tracking-[0.1em]">HMI · Prozess</text>

      {/* Status */}
      <rect x="376" y="360" width="208" height="148" rx="8" fill="#fff" stroke="#c4c1b6" />
      <text x="392" y="384" className="fill-[#5d6877] font-mono text-[9px] uppercase tracking-[0.12em]">Systemstatus</text>
      <g data-legacy>
        <text x="392" y="418" className="fill-[#0e1a2b] text-[17px] font-medium">GE-Fanuc 90-30</text>
        <rect x="392" y="436" width="122" height="24" rx="12" fill="#fbeee3" />
        <circle cx="406" cy="448" r="3.5" fill="#e2731f" />
        <text x="416" y="452" className="fill-[#b5560f] font-mono text-[10px] uppercase tracking-[0.08em]">Abgekündigt</text>
        <text x="392" y="488" className="fill-[#5d6877] text-[10.5px]">Ersatzteile: kritisch</text>
      </g>
      <g data-run style={{ opacity: 0 }}>
        <text x="392" y="418" className="fill-[#0e1a2b] text-[17px] font-medium">Emerson RX3i</text>
        <rect x="392" y="436" width="66" height="24" rx="12" fill="#e3f4ec" />
        <circle cx="406" cy="448" r="3.5" fill="#2f9e6a" />
        <text x="416" y="452" className="fill-[#1f7a50] font-mono text-[10px] uppercase tracking-[0.08em]">Run</text>
        <text x="392" y="488" className="fill-[#5d6877] text-[10.5px]">SCADA: GE Cimplicity</text>
        <g data-check>
          <circle cx="556" cy="390" r="12" fill="#2f9e6a" />
          <path d="M550 390 L554.5 394.5 L562 386" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* Scanner */}
      <g clipPath="url(#cab-clip)">
        <g data-scan style={{ opacity: 0 }}>
          <rect x="40" y="-16" width="560" height="60" fill="url(#scan)" />
          <rect x="40" y="43" width="560" height="1.5" fill="#1f46c4" />
        </g>
      </g>
    </svg>
  );
}
