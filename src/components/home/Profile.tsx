import Image from "next/image";
import { profile, site } from "@/content/site";
import { Button, Container, Label } from "@/components/ui";

export function Profile() {
  return (
    <section id="profil" className="scroll-mt-24 py-24 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="max-w-[28rem] lg:sticky lg:top-28">
              <figure data-reveal="image" className="relative aspect-square overflow-hidden rounded-[22px] bg-paper-2">
                <Image
                  src={site.person.image}
                  alt={`${site.person.name}, ${site.person.role}, Ingenieurbüro Jungen`}
                  fill
                  sizes="(min-width: 1680px) 28rem, (min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                  priority={false}
                />
              </figure>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium tracking-tight">{site.person.name}</p>
                  <p className="text-sm text-muted">{site.person.role}</p>
                </div>
                <a
                  href={site.person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2]"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <Label>Ihr Ansprechpartner</Label>
            <h2 data-reveal="lines" className="mt-6 text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              {profile.heading}
            </h2>
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-2">
              {profile.bio.map((p) => (
                <p key={p.slice(0, 20)} data-reveal="up">{p}</p>
              ))}
            </div>

            <div className="mt-14">
              <p className="label">Werdegang</p>
              <ol className="relative mt-6">
                <span className="absolute bottom-3 left-[5px] top-3 w-px bg-line" aria-hidden />
                {profile.career.map((c, i) => (
                  <li key={c.org} data-reveal="up" data-delay={i * 0.1} className="relative flex gap-6 pb-7 last:pb-0">
                    <span className={`relative mt-2 size-[11px] shrink-0 rounded-full border-2 ${i === profile.career.length - 1 ? "border-accent bg-accent" : "border-line-strong bg-paper"}`} />
                    <div>
                      <p className="text-xl font-medium tracking-tight">{c.org}</p>
                      <p className="mt-1 text-[0.95rem] text-muted">{c.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <blockquote data-reveal="up" className="mt-14 rounded-[22px] border border-line bg-surface p-8 md:p-10">
              <p className="text-2xl font-medium leading-snug tracking-[-0.02em] md:text-[1.75rem]">
                „Wir verstehen, dass die Modernisierung Ihrer Automatisierungssysteme eine strategische Entscheidung ist. Lassen Sie uns gemeinsam daran arbeiten, die Effizienz Ihrer Anlagen zu steigern.“
              </p>
              <footer className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm text-muted">{site.person.name}</span>
                <Button href="/kontakt">Gespräch vereinbaren</Button>
              </footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
