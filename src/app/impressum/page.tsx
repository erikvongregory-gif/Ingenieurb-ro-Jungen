import type { Metadata } from "next";
import { site } from "@/content/site";
import { disclaimer } from "@/content/legal";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { LegalText } from "@/components/LegalText";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum des Ingenieurbüro Jungen, Inhaber Frank Jungen, Fuchstal-Leeder.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <>
      <PageHero label="Impressum" title={<>Impressum</>} />
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="space-y-8 text-lg leading-relaxed lg:col-span-4">
              <div>
                <p className="label">Angaben gemäß § 5 DDG</p>
                <p className="mt-3 text-ink-2">
                  Inhaber der Domains {site.url.replace("https://", "")} / {site.altDomain} und inhaltlich verantwortlich:
                </p>
                <p className="mt-4">
                  {site.person.name}
                  <br />
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </p>
              </div>
              <div>
                <p className="label">Kontakt</p>
                <p className="mt-3">
                  Mobil: <a href={`tel:${site.contact.phone}`} className="link-underline">{site.contact.phoneDisplay}</a>
                  <br />
                  E-Mail: <a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a>
                </p>
              </div>
              <div>
                <p className="label">Umsatzsteuer-ID</p>
                <p className="mt-3">Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {site.vatId}</p>
              </div>
              <div>
                <p className="label">Redaktionelle Verantwortung</p>
                <p className="mt-3">{site.person.name}</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <LegalText sections={[{ heading: "Haftungsausschluss", blocks: disclaimer }]} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
