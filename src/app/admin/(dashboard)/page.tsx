import Link from "next/link";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { DOC_SCHEMAS, type DocSchema } from "@/lib/cms/schemas";
import { SeedButton } from "@/components/admin/SeedButton";

type SearchParams = Promise<{ locale?: string }>;

function resolveLocale(value?: string): Locale {
  return (routing.locales as readonly string[]).includes(value ?? "")
    ? (value as Locale)
    : routing.defaultLocale;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { locale: localeParam } = await searchParams;
  const locale = resolveLocale(localeParam);

  // Dokumente nach Gruppe bündeln (Anzeigereihenfolge aus DOC_SCHEMAS).
  const groups = DOC_SCHEMAS.reduce<Record<string, DocSchema[]>>(
    (acc, schema) => {
      (acc[schema.group] ??= []).push(schema);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inhalte</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Wähle einen Bereich, um Texte und Bilder zu bearbeiten.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/60 p-1">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={`/admin?locale=${l}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                l === locale
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {Object.entries(groups).map(([group, schemas]) => (
        <section key={group} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {schemas.map((schema) => (
              <Link
                key={schema.key}
                href={`/admin/edit/${encodeURIComponent(schema.key)}?locale=${locale}`}
                className="group rounded-xl border border-border/60 bg-card/50 p-5 transition hover:border-primary/40 hover:bg-card"
              >
                <p className="font-semibold tracking-tight transition group-hover:text-primary">
                  {schema.label}
                </p>
                {schema.description && (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {schema.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-2 flex flex-col gap-3 rounded-xl border border-border/50 bg-secondary/30 p-5">
        <div>
          <h2 className="font-semibold tracking-tight">Erste Einrichtung</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Übernimmt die aktuell auf der Website hinterlegten Standardtexte in
            die Datenbank. Bereits bearbeitete Inhalte bleiben unverändert.
          </p>
        </div>
        <SeedButton />
      </section>
    </div>
  );
}
