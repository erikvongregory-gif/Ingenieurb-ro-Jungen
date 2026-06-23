/**
 * Zentrale, sichere Auflösung der Supabase-Umgebungsvariablen.
 * Beide Werte sind öffentlich (anon-Key ist durch RLS abgesichert).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

/**
 * True, wenn ein Supabase-Projekt konfiguriert ist. Ist das nicht der Fall,
 * fällt die Website automatisch auf die Inhalte aus src/content/* zurück.
 */
export function isSupabaseConfigured(): boolean {
  return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}
