import type { Metadata } from "next";
import { references } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Referenzen: Projekte in Automation und Retrofit",
  description:
    "Ausgewählte Projekte: Migration GE-Fanuc 90-30 auf Emerson RX3i, Datenerfassung mit Node-RED und Grafana, Crossflow-Filtersystem und ein Vibrating Compactor für Xinfa Aluminium in China.",
  alternates: { canonical: "/referenzen" },
};

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        label="Referenzen"
        title={<>Referenzen</>}
        lead="Über 25 Jahre Erfahrung, unter anderem in technischen Funktionen bei GE Automation & Controls und Emerson Machine Automation Solutions. Diese Einblicke fließen in jedes Projekt ein."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          {references.map((r, i) => (
            <article key={r.slug} id={r.slug} className="scroll-mt-28 border-t border-line py-16 first:border-t-0 first:pt-0 md:py-24">
              <div className="grid gap-10 lg:grid-cols-12">
                <header className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="font-mono text-sm text-accent">0{i + 1} / 0{references.length}</p>
                    <p className="label mt-4">{r.sector}</p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line-strong bg-surface px-3 py-1.5 text-[0.82rem] text-ink-2">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </header>
                <div className="lg:col-span-8">
                  <h2 data-reveal="lines" className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em]">
                    {r.title}
                  </h2>
                  <p data-reveal="up" className="mt-6 text-xl leading-relaxed text-ink">{r.summary}</p>
                  <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
                    {r.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)} data-reveal="up">{p}</p>
                    ))}
                  </div>
                  <div data-reveal="up" className="mt-10 rounded-[22px] border border-line bg-surface p-7 md:p-8">
                    <p className="label">Ergebnis</p>
                    <ul className="mt-5 grid gap-4 md:grid-cols-3">
                      {r.results.map((res) => (
                        <li key={res} className="flex gap-3 text-[1rem] leading-snug">
                          <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden>
                            <path d="M3 8.5 L6.5 12 L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CtaBand title="Ihr Projekt als nächste Referenz?" />
    </>
  );
}
