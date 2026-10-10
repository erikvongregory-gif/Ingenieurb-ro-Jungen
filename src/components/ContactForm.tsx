"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const topics = ["Automation", "Retrofit", "IIoT / Datenerfassung", "Sonstiges"];

/**
 * Anfrageformular ohne Server: erzeugt eine vorausgefüllte E-Mail im Mailprogramm.
 * Dadurch werden keine Daten über die Website gespeichert.
 */
export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Anfrage ${topic}: ${data.get("company") || data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Unternehmen: ${data.get("company")}`,
      `Telefon: ${data.get("phone")}`,
      `Thema: ${topic}`,
      "",
      String(data.get("message")),
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full border-b border-line-strong bg-transparent py-3 text-lg text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset>
        <legend className="label">Worum geht es?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.92rem] transition-colors",
                topic === t ? "border-ink bg-ink text-white" : "border-line-strong bg-surface text-ink-2 hover:border-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="block">
          <span className="label">Name *</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Ihr Name" />
        </label>
        <label className="block">
          <span className="label">Unternehmen</span>
          <input name="company" autoComplete="organization" className={field} placeholder="Firma" />
        </label>
      </div>
      <label className="block">
        <span className="label">Telefon (optional)</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="Für Rückfragen" />
      </label>
      <label className="block">
        <span className="label">Ihre Herausforderung *</span>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(field, "resize-none")}
          placeholder="Anlage, Steuerung, Ziel und gewünschter Zeitraum"
        />
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-muted">
          Beim Absenden öffnet sich Ihr E-Mail-Programm mit einer vorausgefüllten Nachricht. Über die Website werden keine Daten gespeichert.
        </p>
        <button type="submit" className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 font-medium text-white transition-colors hover:bg-accent">
          Anfrage senden
          <span className="grid size-8 place-items-center rounded-full bg-white/12">
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.8} />
          </span>
        </button>
      </div>
    </form>
  );
}
