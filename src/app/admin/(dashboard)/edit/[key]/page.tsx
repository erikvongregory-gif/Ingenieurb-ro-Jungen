import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { getDocSchema } from "@/lib/cms/schemas";
import { getCmsDocument } from "@/lib/cms/repository";
import { getDefaultData } from "@/lib/cms/defaults";
import { SchemaForm } from "@/components/admin/SchemaForm";

type Params = Promise<{ key: string }>;
type SearchParams = Promise<{ locale?: string }>;

function resolveLocale(value?: string): Locale {
  return (routing.locales as readonly string[]).includes(value ?? "")
    ? (value as Locale)
    : routing.defaultLocale;
}

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const { locale: localeParam } = await searchParams;
  const locale = resolveLocale(localeParam);

  const schema = getDocSchema(key);
  if (!schema) notFound();

  const fromDb = await getCmsDocument<Record<string, unknown>>(key, locale);
  const value =
    fromDb ?? (getDefaultData(key, locale) as Record<string, unknown>) ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/admin?locale=${locale}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            {schema.label}
          </h1>
          {schema.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {schema.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/60 p-1">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={`/admin/edit/${encodeURIComponent(key)}?locale=${l}`}
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

      <SchemaForm
        key={`${key}:${locale}`}
        schema={schema}
        initialValue={value}
        locale={locale}
        cmsKey={key}
      />
    </div>
  );
}
