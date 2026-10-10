import type { Metadata } from "next";
import { privacy } from "@/content/legal";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui";
import { LegalText } from "@/components/LegalText";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung des Ingenieurbüro Jungen.",
  alternates: { canonical: "/datenschutz" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Datenschutz" title={<>Datenschutz&shy;erklärung</>} />
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <LegalText sections={privacy} />
          </div>
        </Container>
      </section>
    </>
  );
}
