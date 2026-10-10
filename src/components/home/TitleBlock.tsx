import { cn } from "@/lib/utils";

type Cell = { label: string; value: string; span?: 1 | 2; strong?: boolean };

const rows: Cell[][] = [
  [
    { label: "Firma", value: "Ingenieurbüro Jungen", span: 2, strong: true },
    { label: "Gezeichnet", value: "F. Jungen" },
    { label: "Blatt", value: "01 / 07" },
  ],
  [
    { label: "Benennung", value: "Industrieautomation & Retrofit", span: 2 },
    { label: "Qualifikation", value: "Dipl.-Ing." },
    { label: "Maßstab", value: "1 : 1" },
  ],
  [
    { label: "Standort", value: "Fuchstal-Leeder" },
    { label: "Erfahrung", value: "25+ Jahre" },
    { label: "Herkunft", value: "GE · Emerson" },
    { label: "Index", value: "A" },
  ],
];

/** Schriftfeld wie auf einer Konstruktionszeichnung. */
export function TitleBlock({ className }: { className?: string }) {
  return (
    <div data-titleblock className={cn("relative border-[1.5px] border-ink bg-surface/70 backdrop-blur-[2px]", className)}>
      {rows.map((row, r) => (
        <div key={r} className={cn("grid grid-cols-4", r > 0 && "border-t border-ink/70")}>
          {row.map((c, i) => (
            <div
              key={c.label}
              data-tb-cell
              className={cn("min-w-0 px-3 py-2.5 md:px-4", c.span === 2 && "col-span-2", i > 0 && "border-l border-ink/70")}
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{c.label}</p>
              <p className={cn("mt-1 leading-tight tracking-tight text-ink", c.strong ? "text-base font-semibold md:text-lg" : "text-[0.85rem] md:text-[0.95rem]")}>
                {c.value}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
