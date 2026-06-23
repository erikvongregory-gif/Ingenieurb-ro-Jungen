"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import { CMS_TAG, cmsTag } from "./keys";
import { getDocSchema } from "./schemas";
import { collectDefaultDocuments } from "./defaults";

export type ActionResult = { ok: boolean; error?: string };

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

/** Stellt sicher, dass ein eingeloggter Nutzer existiert; liefert dessen ID. */
async function requireUserId(): Promise<string> {
  const supabase = await getServerSupabaseClient();
  if (!supabase) throw new Error("Supabase ist nicht konfiguriert.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return user.id;
}

/**
 * Speichert ein CMS-Dokument und invalidiert den zugehörigen Cache.
 */
export async function saveDocument(
  key: string,
  locale: string,
  data: unknown,
): Promise<ActionResult> {
  if (!getDocSchema(key)) return { ok: false, error: "Unbekannter Inhalt." };
  if (!isLocale(locale)) return { ok: false, error: "Ungültige Sprache." };

  const supabase = await getServerSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase ist nicht konfiguriert." };

  const userId = await requireUserId();

  const { error } = await supabase.from("cms_documents").upsert(
    { key, locale, data, updated_by: userId },
    { onConflict: "key,locale" },
  );

  if (error) return { ok: false, error: error.message };

  updateTag(CMS_TAG);
  updateTag(cmsTag(key, locale));
  return { ok: true };
}

/**
 * Importiert die fest hinterlegten Default-Inhalte in die Datenbank.
 * Standardmäßig werden nur fehlende Dokumente angelegt (bestehende, ggf. bereits
 * bearbeitete Inhalte bleiben unangetastet).
 */
export async function seedDefaults(overwrite = false): Promise<ActionResult> {
  const supabase = await getServerSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase ist nicht konfiguriert." };

  const userId = await requireUserId();
  const rows = collectDefaultDocuments().map((doc) => ({
    ...doc,
    updated_by: userId,
  }));

  const { error } = await supabase
    .from("cms_documents")
    .upsert(rows, { onConflict: "key,locale", ignoreDuplicates: !overwrite });

  if (error) return { ok: false, error: error.message };

  updateTag(CMS_TAG);
  return { ok: true };
}

/** Meldet den aktuellen Nutzer ab. */
export async function signOut(): Promise<void> {
  const supabase = await getServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
