import { services } from "@/content/site";
import { Container, Label } from "@/components/ui";

export function OpenSource() {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label>Offene Standards</Label>
            <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              Open Source als Grundlage für Zukunfts&shy;sicherheit.
            </h2>
            <p data-reveal="up" className="mt-8 max-w-md text-lg leading-relaxed text-ink-2">
              Wo es technisch sinnvoll und wirtschaftlich vorteilhaft ist, setzen wir auf flexible, transparente Lösungen. Sie bieten Stabilität, hohe Sicherheit und maximale Anpassungsfähigkeit, ohne Abhängigkeit von einem einzelnen Hersteller.
            </p>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {services.automation.openSource.map((t, i) => (
              <li key={t.name} className="group bg-surface p-7 transition-colors duration-500 hover:bg-paper md:p-9">
                <div data-reveal="up" data-delay={i * 0.08}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-line-strong transition-all duration-500 ease-out-expo group-hover:w-14 group-hover:bg-accent" />
                </div>
                <p className="mt-14 text-3xl font-medium tracking-[-0.03em]">{t.name}</p>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{t.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
