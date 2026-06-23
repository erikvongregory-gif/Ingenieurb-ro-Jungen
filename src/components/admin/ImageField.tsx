"use client";

import { useState } from "react";
import Image from "next/image";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

/** Wandelt einen Dateinamen in einen sicheren Storage-Pfad-Baustein um. */
function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot >= 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  const ext = dot >= 0 ? name.slice(dot + 1).toLowerCase() : "bin";
  return `${base || "bild"}.${ext}`;
}

export function ImageField({
  value,
  onChange,
  cmsKey,
}: {
  value: string;
  onChange: (url: string) => void;
  cmsKey: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = getBrowserSupabaseClient();
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert.");
      return;
    }

    setError(null);
    setUploading(true);

    const path = `${cmsKey.replace(/[^a-z0-9.-]+/gi, "-")}/${Date.now()}-${safeName(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "31536000", upsert: false });

    if (uploadError) {
      setUploading(false);
      setError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUploading(false);
    onChange(data.publicUrl);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-secondary/40">
            <Image
              src={value}
              alt="Vorschau"
              fill
              sizes="128px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
            kein Bild
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="inline-flex w-fit cursor-pointer items-center rounded-lg border border-border/70 px-3 py-1.5 text-sm transition hover:bg-secondary">
            {uploading ? "Lädt hoch …" : "Bild hochladen"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleFile}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-fit text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Bild entfernen
            </button>
          )}
        </div>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/pfad/zum/bild.png oder https://…"
        className="rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
