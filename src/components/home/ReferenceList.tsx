import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { references } from "@/content/site";
import { Button, Container, Label } from "@/components/ui";

export function ReferenceList() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Label>Referenzen</Label>
            <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              Projekte, die im laufenden Betrieb bestehen.
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <Button href="/referenzen" variant="secondary">Alle Projekte</Button>
          </div>
        </div>

        <ul className="mt-16 border-t border-line">
          {references.map((r, i) => (
            <li key={r.slug} data-reveal="up" className="border-b border-line">
              <Link
                href={`/referenzen#${r.slug}`}
                className="group relative grid gap-4 py-8 transition-colors md:grid-cols-12 md:items-center md:gap-8 md:py-10"
              >
                <span className="pointer-events-none absolute inset-y-0 -left-5 -right-5 -z-10 origin-bottom scale-y-0 rounded-xl bg-surface transition-transform duration-500 ease-out-expo group-hover:scale-y-100 sm:-left-8 sm:-right-8" />
                <span className="font-mono text-sm text-muted md:col-span-1">0{i + 1}</span>
                <span className="label md:col-span-3 !text-ink-2">{r.sector}</span>
                <span className="text-2xl font-medium leading-tight tracking-[-0.02em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:col-span-6 md:text-[1.9rem]">
                  {r.title}
                </span>
                <span className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                  <span className="hidden text-sm text-muted xl:inline">{r.tags[0]}</span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.6} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
