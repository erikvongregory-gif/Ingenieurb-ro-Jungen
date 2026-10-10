import type { Metadata } from "next";
import { services } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Container, Label } from "@/components/ui";
import { ControlSchematic } from "@/components/home/ControlSchematic";
import { OpenSource } from "@/components/OpenSource";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Automation: Maschinenautomatisierung, Robotik & IIoT",
  description:
    "Innovative Automatisierungslösungen seit über 25 Jahren: diskrete Maschinenautomatisierung, Robotik und IIoT. Herstellerunabhängig, mit Open-Source-Technologien wie CODESYS, Node-RED und Grafana.",
  alternates: { canonical: "/automation" },
};

const partners = ["GE", "Emerson", "Siemens", "Schneider Electric", "Beckhoff"];

export default function AutomationPage() {
  const s = services.automation;
  return (
    <>
      <PageHero label="Automation" index={s.index} title={<>Automation</>} lead={s.summary} />

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Label>Leistungsspektrum</Label>
                <h2 data-reveal="lines" className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                  Lösungen, die heute und morgen überzeugen.
                </h2>
                <div className="mt-10 max-w-[480px]">
                  <ControlSchematic />
                </div>
              </div>
            </div>
            <ol className="lg:col-span-8">
              {s.scope.map((item, i) => (
                <li key={item.title} data-reveal="up" className="grid gap-4 border-t border-line py-10 md:grid-cols-8 md:gap-8 md:py-14">
                  <span className="font-mono text-sm text-accent md:col-span-1">0{i + 1}</span>
                  <div className="md:col-span-7">
                    <h3 className="text-3xl font-medium tracking-[-0.03em] md:text-[2.5rem]">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2/70 py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <Label>Unabhängig. Flexibel. Zukunftssicher.</Label>
              <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                Die beste Technik für Ihr Projekt, nicht für einen Hersteller.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-8">
              <p data-reveal="up">
                Als herstellerunabhängiger Dienstleister arbeiten wir mit führenden Unternehmen zusammen und kombinieren für jedes Projekt die optimalen Technologien.
              </p>
              <p data-reveal="up">
                So entstehen maßgeschneiderte Automatisierungs- und IIoT-Konzepte, die Ihre Anlagen effizienter, zuverlässiger und langfristig leistungsfähig machen. Jede Komponente wird sorgfältig ausgewählt.
              </p>
            </div>
          </div>
          <ul data-reveal="stagger" className="mt-16 flex flex-wrap gap-3">
            {partners.map((p) => (
              <li key={p} className="rounded-full border border-line-strong bg-surface px-6 py-3 text-lg font-medium tracking-tight">
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <OpenSource />
      <CtaBand title="Mehr über Automatisierung und IIoT erfahren?" />
    </>
  );
}
