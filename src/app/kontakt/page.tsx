import type { Metadata } from "next";
import Image from "next/image";
import { site, usefulLinks } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt zum Ingenieurbüro Jungen in Fuchstal-Leeder: Frank Jungen, +49 172 566 9504, fjungen@ib-jungen.de. Unverbindliches Beratungsgespräch zu Automation und Retrofit.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Kontakt"
        title={<>Sprechen wir über Ihr Projekt.</>}
        lead="Ob Fragen, weitere Informationen oder eine konkrete Zusammenarbeit: Wir sind gerne für Sie da und melden uns zeitnah persönlich."
      />

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div data-reveal="up" className="rounded-[22px] border border-line bg-surface p-7 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="relative size-16 overflow-hidden rounded-full bg-paper-2">
                    <Image src={site.person.image} alt={site.person.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-lg font-medium tracking-tight">{site.person.name}</p>
                    <p className="text-sm text-muted">{site.person.role}</p>
                  </div>
                </div>
                <dl className="mt-8 space-y-5 border-t border-line pt-6">
                  <div>
                    <dt className="label">Mobil</dt>
                    <dd className="mt-1 text-xl font-medium tracking-tight">
                      <a href={`tel:${site.contact.phone}`} className="link-underline">{site.contact.phoneDisplay}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="label">E-Mail</dt>
                    <dd className="mt-1 text-lg">
                      <a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Anschrift</dt>
                    <dd className="mt-1 text-lg leading-snug">
                      {site.name}
                      <br />
                      {site.address.street}
                      <br />
                      {site.address.postalCode} {site.address.city}
                    </dd>
                  </div>
                </dl>
              </div>

              <div data-reveal="up" className="mt-10">
                <p className="label">Hersteller & Support</p>
                <ul className="mt-4 border-t border-line">
                  {usefulLinks.map((l) => (
                    <li key={l.href} className="border-b border-line">
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-3 text-[0.95rem] text-ink-2 transition-colors hover:text-accent">
                        {l.label}
                        <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
