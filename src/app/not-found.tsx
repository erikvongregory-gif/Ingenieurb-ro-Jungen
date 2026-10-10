import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <p className="label">Fehler 404 · Signal unterbrochen</p>
        <h1 className="mt-6 max-w-[14ch] text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
          Diese Seite gibt es nicht.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Zur Startseite</Button>
          <Button href="/kontakt" variant="secondary">Kontakt</Button>
        </div>
      </Container>
    </section>
  );
}
