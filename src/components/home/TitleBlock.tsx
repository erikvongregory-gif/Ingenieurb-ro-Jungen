import { cn } from "@/lib/utils";

type Cell = { label: string; value: string; wide?: boolean; strong?: boolean };

const cells: Cell[] = [
  { label: "Firma", value: "Ingenieurbüro Jungen", wide: true, strong: true },
  { label: "Gezeichnet", value: "F. Jungen" },
  { label: "Blatt", value: "01 / 07" },
  { label: "Benennung", value: "Industrieautomation & Retrofit", wide: true },
  { label: "Qualifikation", value: "Dipl.-Ing." },
  { label: "Maßstab", value: "1 : 1" },
  { label: "Standort", value: "Fuchstal-Leeder" },
  { label: "Erfahrung", value: "25+ Jahre" },
  { label: "Herkunft", value: "GE · Emerson" },
  { label: "Index", value: "A" },
];

/** Schriftfeld wie auf einer Konstruktionszeichnung. Mobil 2-, ab sm 4-spaltig. */
export function TitleBlock({ className }: { className?: string }) {
  return (
    <div
      data-titleblock
      className={cn("grid grid-cols-2 gap-px border-[1.5px] border-ink bg-ink/70 sm:grid-cols-4", className)}
    >
      {cells.map((c) => (
        <div key={c.label} data-tb-cell className={cn("min-w-0 bg-surface px-3 py-2.5 md:px-4", c.wide && "col-span-2")}>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{c.label}</p>
          <p
            className={cn(
              "mt-1 leading-tight tracking-tight text-ink",
              c.strong ? "text-base font-semibold md:text-lg" : "text-[0.85rem] md:text-[0.95rem]",
            )}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
