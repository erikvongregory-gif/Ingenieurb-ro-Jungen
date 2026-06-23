import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/**
 * Cookie-bewusster Supabase-Client für den Server (Admin-Bereich, Auth).
 *
 * Liest/schreibt die Session über die Next.js-Cookies, damit Login-Status
 * zwischen Browser und Server-Components/Server-Actions synchron bleibt.
 * Liefert `null`, wenn kein Supabase-Projekt konfiguriert ist.
 */
export async function getServerSupabaseClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }: {
              name: string;
              value: string;
              options: CookieOptions;
            }) => cookieStore.set(name, value, options),
          );
        } catch {
          // `setAll` wird aus Server-Components heraus aufgerufen – dort sind
          // Cookies read-only. Das ist unkritisch, wenn die Session ohnehin
          // über die (Proxy-)Middleware aufgefrischt wird.
        }
      },
    },
  });
}
