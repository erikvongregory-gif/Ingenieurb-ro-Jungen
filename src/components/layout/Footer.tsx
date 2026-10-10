import Link from "next/link";
import { nav, site, usefulLinks } from "@/content/site";
import { Container } from "@/components/ui";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07] invert" aria-hidden />
      <Container className="relative">
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo inverted />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              Industrieautomation und Retrofit aus Bayern, für Maschinen und Anlagen im In- und Ausland. Herstellerunabhängig seit über 25 Jahren.
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="label !text-white/40">Seiten</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {[...nav, { href: "/kontakt", label: "Kontakt" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-white/80 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="label !text-white/40">Hersteller & Support</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-underline text-white/80 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <address className="not-italic md:col-span-2">
            <p className="label !text-white/40">Kontakt</p>
            <div className="mt-5 space-y-1 text-[0.95rem] text-white/80">
              <p>{site.address.street}</p>
              <p>
                {site.address.postalCode} {site.address.city}
              </p>
              <p className="pt-3">
                <a href={`tel:${site.contact.phone}`} className="link-underline hover:text-white">{site.contact.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-white">{site.contact.email}</a>
              </p>
            </div>
          </address>
        </div>
        <div className="flex flex-col gap-4 py-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ingenieurbüro Jungen. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <a href="https://evglab.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Website: evglab.com</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
