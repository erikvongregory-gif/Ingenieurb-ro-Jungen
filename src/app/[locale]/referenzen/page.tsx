import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Section,
  Container,
  Eyebrow,
  SectionHeading,
  Card,
} from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getReferencesPage } from "@/content/pages";
import { getReferences } from "@/content/references";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "References" });
  return buildMetadata({
    locale,
    pathname: "/referenzen",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: [
      "Referenzen Industrieautomation",
      "Automatisierung Projekte",
      "Retrofit Projekte",
      "Emerson RX3i",
      "GE Cimplicity",
    ],
  });
}

export default async function ReferencesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [content, refs] = await Promise.all([
    getReferencesPage(locale),
    getReferences(locale),
  ]);

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: refs.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        about: project.tags,
      },
    })),
  };

  return (
    <article>
      <JsonLd data={projectsSchema} />
      <PageHeader title={content.h1} lead={content.lead} />
      <Section className="pt-12 md:pt-16">
        <Container>
          <Reveal className="flex max-w-3xl flex-col gap-4">
            {refs.intro.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm md:text-lg font-light leading-relaxed text-foreground/80"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <Eyebrow>{content.h1}</Eyebrow>
              <SectionHeading className="mt-3">
                {refs.projectsHeading}
              </SectionHeading>
            </Reveal>

            <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
              {refs.projects.map((project, index) => (
                <Reveal
                  key={project.title}
                  delay={(index % 2) * 120}
                  spotlight
                  className="spotlight-card"
                >
                  <Card className="tap-press flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.4)] md:p-8">
                  <h3 className="font-sans font-bold tracking-tight text-foreground text-lg md:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base font-light leading-relaxed text-foreground/75">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    {project.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-relaxed text-foreground/75"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {project.results && (
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                        {refs.resultsLabel}
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {project.results.map((result) => (
                          <li
                            key={result}
                            className="flex gap-2.5 text-sm leading-relaxed text-foreground/75"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs text-foreground/60 transition-colors duration-300 hover:border-primary/40 hover:text-foreground/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
