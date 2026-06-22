import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, Container } from "@/components/ui/section";
import { getPrivacy } from "@/content/legal";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildMetadata({
    locale,
    pathname: "/datenschutz",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyContent locale={locale} />;
}

/** Wandelt URLs in einem Text in klickbare Links um. */
function linkify(text: string): React.ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s]*[^\s.,;:!?)])/g);
  return parts.map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words text-primary underline-offset-2 hover:underline"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

function PrivacyContent({ locale }: { locale: Locale }) {
  const t = useTranslations("Privacy");
  const content = getPrivacy(locale);

  return (
    <article>
      <PageHeader title={t("h1")} />
      <Section className="pt-8 md:pt-10">
        <Container size="narrow">
          <div className="flex flex-col gap-12">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-sans font-extrabold tracking-tight text-foreground text-xl md:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-6">
                  {section.blocks.map((block, blockIndex) => (
                    <div key={block.heading ?? blockIndex}>
                      {block.heading && (
                        <h3 className="font-semibold text-foreground">
                          {block.heading}
                        </h3>
                      )}
                      {block.paragraphs?.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className="mt-2 text-sm md:text-base font-light leading-relaxed text-foreground/75"
                        >
                          {linkify(paragraph)}
                        </p>
                      ))}
                      {block.bullets && (
                        <ul className="mt-3 flex flex-col gap-2">
                          {block.bullets.map((bullet, bulletIndex) => (
                            <li
                              key={bulletIndex}
                              className="flex gap-2 text-sm md:text-base font-light leading-relaxed text-foreground/75"
                            >
                              <span
                                aria-hidden
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                              />
                              <span>{linkify(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </article>
  );
}
