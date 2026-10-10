import Link from "next/link";
import { cn } from "@/lib/utils";

/** Bildmarke: stilisierter Steuerungsbaustein (zwei Module, ein Signal). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="7" fill="currentColor" />
      <rect x="8" y="8" width="6" height="16" rx="1.5" fill="var(--logo-fg, #fff)" />
      <rect x="18" y="8" width="6" height="9" rx="1.5" fill="var(--logo-fg, #fff)" />
      <circle cx="21" cy="21.5" r="2.5" fill="var(--color-signal)" />
    </svg>
  );
}

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label="Ingenieurbüro Jungen, Startseite">
      <LogoMark className={inverted ? "text-white [--logo-fg:var(--color-navy)]" : "text-ink"} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[0.98rem] font-semibold tracking-tight", inverted ? "text-white" : "text-ink")}>
          Ingenieurbüro Jungen
        </span>
        <span className={cn("mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em]", inverted ? "text-white/55" : "text-muted")}>
          All About Industrial Automation
        </span>
      </span>
    </Link>
  );
}
