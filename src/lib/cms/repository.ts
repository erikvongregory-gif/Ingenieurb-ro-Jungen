import { unstable_cache } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { CMS_TAG, cmsTag } from "./keys";

/**
 * Liest ein CMS-Dokument (key + locale) aus Supabase – serverseitig gecached
 * und über Tags invalidierbar. Liefert `null`, wenn kein Eintrag existiert,
 * kein Supabase-Projekt konfiguriert ist oder ein Fehler auftritt. Aufrufer
 * fallen dann auf die Default-Inhalte aus src/content/* zurück.
 */
async function fetchDocument(key: string, locale: Locale): Promise<unknown | null> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cms_documents")
    .select("data")
    .eq("key", key)
    .eq("locale", locale)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { data: unknown }).data ?? null;
}

/**
 * Gecachte Variante von `fetchDocument`. Cache-Key und Tags hängen an
 * key + locale, sodass `revalidateTag` gezielt invalidieren kann.
 */
export async function getCmsDocument<T>(
  key: string,
  locale: Locale,
): Promise<T | null> {
  const cached = unstable_cache(
    () => fetchDocument(key, locale),
    ["cms-document", key, locale],
    { tags: [CMS_TAG, cmsTag(key, locale)] },
  );
  return (await cached()) as T | null;
}

/**
 * Liest ein CMS-Dokument mit Fallback auf den lokalen Default-Inhalt.
 */
export async function getCmsDocumentOr<T>(
  key: string,
  locale: Locale,
  fallback: T,
): Promise<T> {
  const doc = await getCmsDocument<T>(key, locale);
  return doc ?? fallback;
}
