"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Technische Illustration: SPS-Rack mit Feldgeräten, HMI und IIoT-Anbindung.
 * Signale laufen als Impulse über die Leitungen, Messwerte ändern sich live.
 */
const wires = [
  { id: "w-hmi", d: "M262 150 V96 H300" },
  { id: "w-iot", d: "M196 150 V118 H120 V94" },
  { id: "w-motor", d: "M160 278 V340 H96 V378" },
  { id: "w-valve", d: "M214 278 V412" },
  { id: "w-sensor", d: "M268 278 V340 H340 V378" },
  { id: "w-io", d: "M322 214 H420 V300" },
];

const readouts = [
  { id: "r-flow", label: "Durchfluss", unit: "m³/h", base: 18.6, spread: 0.6, x: 392, y: 356 },
  { id: "r-press", label: "Druck", unit: "bar", base: 2.41, spread: 0.08, x: 392, y: 392 },
  { id: "r-cycle", label: "Zykluszeit", unit: "ms", base: 4, spread: 0, x: 392, y: 428 },
];

export function ControlSchematic() {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      if (!reduced) {
        tl.from("[data-s='frame']", { autoAlpha: 0, y: 24, duration: 1.2 })
          .from("[data-s='wire']", { drawSVG: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.08 }, 0.3)
          .from("[data-s='module']", { autoAlpha: 0, y: 10, duration: 0.8, stagger: 0.06 }, 0.4)
          .from("[data-s='device']", { autoAlpha: 0, scale: 0.85, transformOrigin: "50% 50%", duration: 0.9, stagger: 0.08 }, 0.8)
          .from("[data-s='trend']", { drawSVG: 0, duration: 1.6, ease: "power1.inOut" }, 1.1)
          .from("[data-s='text']", { autoAlpha: 0, duration: 0.6, stagger: 0.03 }, 1.0);

        // Signalimpulse entlang der Leitungen
        gsap.utils.toArray<SVGPathElement>("[data-s='pulse']").forEach((p, i) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: `14 ${len}`, strokeDashoffset: 14 });
          gsap.to(p, {
            strokeDashoffset: -len,
            duration: 1.6 + (i % 3) * 0.35,
            ease: "none",
            repeat: -1,
            delay: 1.8 + i * 0.27,
            repeatDelay: 0.6 + (i % 2) * 0.9,
          });
        });

        // LEDs der Module
        gsap.utils.toArray<SVGCircleElement>("[data-s='led']").forEach((led) => {
          gsap.to(led, {
            opacity: 0.25,
            duration: gsap.utils.random(0.12, 0.3),
            repeat: -1,
            yoyo: true,
            repeatDelay: gsap.utils.random(0.2, 1.6),
            delay: gsap.utils.random(1.5, 2.5),
          });
        });

        // Motor dreht
        gsap.to("[data-s='rotor']", { rotation: 360, transformOrigin: "50% 50%", duration: 2.4, ease: "none", repeat: -1 });
      }

      // Live-Messwerte
      const interval = window.setInterval(() => {
        readouts.forEach((r) => {
          const el = root.current?.querySelector<SVGTextElement>(`#${r.id}`);
          if (!el || !r.spread) return;
          const v = r.base + (Math.random() - 0.5) * r.spread;
          el.textContent = v.toFixed(r.base < 10 ? 2 : 1);
        });
      }, 1100);
      return () => window.clearInterval(interval);
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 520 480"
      className="h-auto w-full"
      role="img"
      aria-label="Schema einer Steuerung mit Feldgeräten, Bedienpanel und IIoT-Anbindung"
    >
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#0e1a2b" opacity="0.12" />
        </pattern>
        <linearGradient id="trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f46c4" stopOpacity="0.18" />
          <stop offset="1" stopColor="#1f46c4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g data-s="frame">
        <rect x="0.5" y="0.5" width="519" height="479" rx="18" fill="#fff" stroke="#dcdad2" />
        <rect x="1" y="1" width="518" height="478" rx="18" fill="url(#dots)" />
        <path d="M1 36 H519" stroke="#ecebe5" />
        <circle cx="22" cy="18.5" r="4" fill="#2f9e6a" />
        <text x="34" y="22.5" className="fill-[#5d6877] font-mono text-[10px] uppercase tracking-[0.12em]">Anlage 01 · Run</text>
        <text x="498" y="22.5" textAnchor="end" className="fill-[#5d6877] font-mono text-[10px] uppercase tracking-[0.12em]">OPC UA · verbunden</text>
      </g>

      {/* Leitungen */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {wires.map((w) => (
          <path key={w.id} data-s="wire" d={w.d} stroke="#c4c1b6" strokeWidth="1.5" />
        ))}
        {wires.map((w) => (
          <path key={`${w.id}-p`} data-s="pulse" d={w.d} stroke="#1f46c4" strokeWidth="2.5" strokeDasharray="0 9999" />
        ))}
      </g>

      {/* SPS-Rack */}
      <g>
        <rect data-s="module" x="128" y="150" width="194" height="128" rx="8" fill="#0e1a2b" />
        {["CPU", "DI", "DO", "AI", "COM"].map((m, i) => (
          <g key={m} data-s="module">
            <rect x={140 + i * 36} y="164" width="30" height="100" rx="3" fill={i === 0 ? "#1f46c4" : "#1c2a3f"} />
            <circle data-s="led" cx={149 + i * 36} cy="176" r="2.4" fill={i === 4 ? "#e2731f" : "#4ade80"} />
            <circle data-s="led" cx={157 + i * 36} cy="176" r="2.4" fill="#4ade80" opacity={i % 2 ? 1 : 0.4} />
            {[0, 1, 2, 3, 4].map((r) => (
              <rect key={r} x={146 + i * 36} y={194 + r * 10} width="18" height="3" rx="1.5" fill="#fff" opacity="0.14" />
            ))}
            <text x={155 + i * 36} y="256" textAnchor="middle" className="fill-white/70 font-mono text-[8px]">{m}</text>
          </g>
        ))}
      </g>

      {/* IIoT / Dashboard */}
      <g transform="translate(0 36)">
      <g data-s="device">
        <rect x="52" y="10" width="136" height="48" rx="8" fill="#fff" stroke="#c4c1b6" />
        <text data-s="text" x="64" y="28" className="fill-[#5d6877] font-mono text-[8.5px] uppercase tracking-[0.1em]">IIoT · Grafana</text>
        <path data-s="trend" d="M64 48 L80 42 L94 45 L108 36 L122 39 L136 31 L150 34 L164 26 L176 29" fill="none" stroke="#1f46c4" strokeWidth="1.6" />
      </g>
      </g>

      {/* HMI */}
      <g data-s="device">
        <rect x="300" y="44" width="170" height="104" rx="10" fill="#fff" stroke="#c4c1b6" />
        <rect x="310" y="54" width="150" height="72" rx="4" fill="#f5f4f0" />
        <path d="M316 116 L332 104 L348 108 L364 92 L380 98 L396 82 L412 88 L428 74 L452 78 V120 H316 Z" fill="url(#trend-fill)" />
        <path data-s="trend" d="M316 116 L332 104 L348 108 L364 92 L380 98 L396 82 L412 88 L428 74 L452 78" fill="none" stroke="#1f46c4" strokeWidth="1.8" />
        <text data-s="text" x="316" y="68" className="fill-[#0e1a2b] font-mono text-[8.5px] uppercase tracking-[0.1em]">HMI · Prozess</text>
        <circle cx="318" cy="138" r="3" fill="#2f9e6a" />
        <rect x="328" y="135.5" width="40" height="5" rx="2.5" fill="#dcdad2" />
        <rect x="420" y="133" width="40" height="10" rx="5" fill="#0e1a2b" />
      </g>

      {/* Motor */}
      <g data-s="device">
        <circle cx="96" cy="402" r="26" fill="#fff" stroke="#0e1a2b" strokeWidth="1.5" />
        <g data-s="rotor">
          <path d="M96 384 V420 M78 402 H114" stroke="#c4c1b6" strokeWidth="1.2" />
        </g>
        <text x="96" y="406.5" textAnchor="middle" className="fill-[#0e1a2b] text-[13px] font-semibold">M</text>
        <text data-s="text" x="96" y="446" textAnchor="middle" className="fill-[#5d6877] font-mono text-[8.5px] uppercase tracking-[0.1em]">Antrieb</text>
      </g>

      {/* Ventil */}
      <g data-s="device">
        <path d="M196 412 L232 436 V412 L196 436 Z" fill="#fff" stroke="#0e1a2b" strokeWidth="1.5" strokeLinejoin="round" />
        <text data-s="text" x="214" y="458" textAnchor="middle" className="fill-[#5d6877] font-mono text-[8.5px] uppercase tracking-[0.1em]">Ventil</text>
      </g>

      {/* Sensor */}
      <g data-s="device">
        <rect x="324" y="378" width="32" height="32" rx="16" fill="#fff" stroke="#0e1a2b" strokeWidth="1.5" />
        <circle cx="340" cy="394" r="5" fill="#e2731f" />
        <text data-s="text" x="340" y="430" textAnchor="middle" className="fill-[#5d6877] font-mono text-[8.5px] uppercase tracking-[0.1em]">Sensor</text>
      </g>

      {/* Remote-I/O + Messwerte */}
      <g data-s="device">
        <rect x="380" y="300" width="124" height="156" rx="10" fill="#fff" stroke="#c4c1b6" />
        <text data-s="text" x="392" y="322" className="fill-[#0e1a2b] font-mono text-[8.5px] uppercase tracking-[0.1em]">Remote I/O</text>
        <path d="M392 332 H492" stroke="#ecebe5" />
        {readouts.map((r) => (
          <g key={r.id} data-s="text">
            <text x={r.x} y={r.y - 12} className="fill-[#5d6877] text-[8.5px]">{r.label}</text>
            <text id={r.id} x={r.x} y={r.y + 4} className="fill-[#0e1a2b] font-mono text-[15px] font-medium">
              {r.base < 10 ? r.base.toFixed(2) : r.base.toFixed(1)}
            </text>
            <text x="492" y={r.y + 4} textAnchor="end" className="fill-[#5d6877] font-mono text-[9px]">{r.unit}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
