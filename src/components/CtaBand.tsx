import { site } from "@/content/site";
import { Button, Container } from "@/components/ui";

export function CtaBand({ title = "Sprechen wir über Ihre Anlage." }: { title?: string }) {
  return (
    <section className="pb-24 md:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-7 py-14 md:px-14 md:py-20">
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,transparent_30%,#000)]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label">Unverbindliches Beratungsgespräch</p>
              <h2 data-reveal="lines" className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.8rem)] font-medium leading-[1] tracking-[-0.035em]">
                {title}
              </h2>
              <p data-reveal="up" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
                Schildern Sie uns Ihre Herausforderung. Sie erhalten eine ehrliche Einschätzung und einen konkreten Vorschlag für das weitere Vorgehen.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Button href="/kontakt">Projekt anfragen</Button>
              <a href={`tel:${site.contact.phone}`} className="link-underline text-lg font-medium tracking-tight">
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="link-underline text-muted">
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
