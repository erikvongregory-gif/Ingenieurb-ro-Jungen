import type { Metadata } from "next";
import Link from "next/link";
import { references, services } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Label } from "@/components/ui";
import { MigrationArt } from "@/components/illustrations";
import { CtaBand } from "@/components/CtaBand";
import { RetrofitScrub } from "@/components/RetrofitScrub";

export const metadata: Metadata = {
  title: "Retrofit: Modernisierung automatisierter Systeme",
  description:
    "Retrofit für Maschinen und Anlagen: Analyse, Retrofit-Konzept, Implementierung moderner Steuerungs- und Softwarelösungen, Schulung und Support. Mehr Effizienz und Lebensdauer statt Neukauf.",
  alternates: { canonical: "/retrofit" },
};

export default function RetrofitPage() {
  const s = services.retrofit;
  const featured = references[0];
  return (
    <>
      <PageHero label="Retrofit" index={s.index} title={<>Retrofit</>} lead={s.summary} />

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Label>Warum Retrofit</Label>
              <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                Bewährte Mechanik behalten. Steuerung erneuern.
              </h2>
              <p data-reveal="up" className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
                Abgekündigte Steuerungen sind ein Risiko: Ersatzteile werden knapp, Know-how geht verloren, ein Ausfall kann lange Stillstände verursachen. Ein Retrofit bringt Ihr System auf den neuesten Stand und verlängert die Lebensdauer Ihrer Anlage.
              </p>
            </div>
            <div className="rounded-[22px] border border-line bg-surface p-8 text-ink lg:col-span-6">
              <MigrationArt className="h-auto w-full" />
              <div className="mt-4 flex justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted">
                <span>Bestand</span>
                <span>Stand der Technik</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <RetrofitScrub />

      <section className="py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Label>Warum mit uns</Label>
              <ul className="mt-8 border-t border-line">
                {s.why.map((w) => (
                  <li key={w} data-reveal="up" className="flex gap-4 border-b border-line py-5 text-lg">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={`/referenzen#${featured.slug}`}
              data-reveal="up"
              className="group flex flex-col justify-between rounded-[22px] bg-ink p-8 text-white transition-colors duration-500 hover:bg-[#13233a] md:p-12 lg:col-span-6 lg:col-start-7"
            >
              <p className="label !text-white/50">Referenz · {featured.sector}</p>
              <div className="mt-14">
                <h3 className="text-3xl font-medium leading-tight tracking-[-0.03em] md:text-[2.5rem]">{featured.title}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">{featured.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-white/80 group-hover:text-white">
                  Projekt ansehen <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </div>
          <div className="mt-16">
            <Button href="/referenzen" variant="secondary">Alle Referenzen</Button>
          </div>
        </Container>
      </section>

      <CtaBand title="Lohnt sich ein Retrofit für Ihre Anlage?" />
    </>
  );
}
