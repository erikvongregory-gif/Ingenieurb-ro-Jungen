"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { seedDefaults } from "@/lib/cms/actions";

export function SeedButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  function handleClick() {
    setMessage(null);
    startTransition(async () => {
      const result = await seedDefaults(false);
      if (result.ok) {
        setIsError(false);
        setMessage("Standardinhalte importiert (fehlende ergänzt).");
        router.refresh();
      } else {
        setIsError(true);
        setMessage(result.error ?? "Import fehlgeschlagen.");
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="rounded-lg border border-border/70 px-3.5 py-2 text-sm font-medium transition hover:bg-secondary disabled:opacity-50"
      >
        {pending ? "Importiere …" : "Standardinhalte importieren"}
      </button>
      {message && (
        <p className={`text-sm ${isError ? "text-red-400" : "text-emerald-400"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
