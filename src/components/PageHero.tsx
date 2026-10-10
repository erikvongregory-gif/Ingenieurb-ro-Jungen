import Link from "next/link";
import { Container } from "@/components/ui";

type Props = {
  label: string;
  title: React.ReactNode;
  lead?: string;
  index?: string;
  aside?: React.ReactNode;
};

/** Kopfbereich der Unterseiten. */
export function PageHero({ label, title, lead, index, aside }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <nav aria-label="Brotkrumen" className="label flex items-center gap-2">
          <Link href="/" className="hover:text-ink">Start</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{label}</span>
        </nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {index && <p data-reveal="up" className="font-mono text-sm text-accent">{index}</p>}
            <h1 data-reveal="lines" className="mt-3 text-[clamp(2.8rem,7vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              {title}
            </h1>
          </div>
          {(lead || aside) && (
            <div data-reveal="up" className="lg:col-span-4">
              {lead && <p className="text-lg leading-relaxed text-ink-2">{lead}</p>}
              {aside}
            </div>
          )}
        </div>
        <div data-reveal="rule" className="mt-16 h-px w-full bg-line-strong" aria-hidden />
      </Container>
    </section>
  );
}
