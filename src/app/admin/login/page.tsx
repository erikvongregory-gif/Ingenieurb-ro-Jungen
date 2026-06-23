import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  if (configured) {
    const supabase = await getServerSupabaseClient();
    const {
      data: { user },
    } = (await supabase!.auth.getUser()) ?? { data: { user: null } };
    if (user) redirect("/admin");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-border/60 bg-card/60 p-8 shadow-xl">
        <h1 className="text-xl font-bold tracking-tight">Inhalte verwalten</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Bitte mit den Zugangsdaten anmelden, um Texte und Bilder zu bearbeiten.
        </p>

        {!configured && (
          <p className="mt-5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-400">
            Supabase ist noch nicht konfiguriert. Bitte zuerst ein Projekt
            anlegen und die Umgebungsvariablen in <code>.env.local</code> setzen
            (siehe <code>.env.example</code>).
          </p>
        )}

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
