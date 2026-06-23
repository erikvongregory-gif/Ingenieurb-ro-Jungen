import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/**
 * Zustandsloser anon-Client für ÖFFENTLICHE Lesezugriffe (kein Login-Kontext).
 *
 * Bewusst ohne Cookies/Session, damit er auch innerhalb von `unstable_cache`
 * (außerhalb des Request-Scopes) verwendet werden kann. Liefert `null`, wenn
 * kein Supabase-Projekt konfiguriert ist → Aufrufer nutzt dann den Fallback.
 */
export function getPublicSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
