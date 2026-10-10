import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site, absoluteUrl } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Animate } from "@/components/motion/Animate";
import { CursorPulse } from "@/components/motion/CursorPulse";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ingenieurbüro Jungen | Industrieautomation & Retrofit",
    template: "%s | Ingenieurbüro Jungen",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: "Ingenieurbüro Jungen | Industrieautomation & Retrofit",
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f4f0",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.tagline,
      url: site.url,
      email: site.contact.email,
      telephone: site.contact.phone,
      vatID: site.vatId,
      description: site.description,
      slogan: site.claim,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postalCode,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
      founder: { "@id": `${site.url}/#person` },
      knowsAbout: ["Industrieautomation", "Retrofit", "SPS-Programmierung", "IIoT", "Robotik", "Emerson RX3i", "CODESYS", "Node-RED", "Grafana", "OPC UA"],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.person.name,
      jobTitle: site.person.role,
      image: absoluteUrl(site.person.image),
      worksFor: { "@id": `${site.url}/#organization` },
      sameAs: [site.person.linkedin],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Zum Inhalt springen
        </a>
        <SmoothScroll />
        <CursorPulse />
        <Header />
        <Animate>
          <main id="inhalt">{children}</main>
          <Footer />
        </Animate>
      </body>
    </html>
  );
}
