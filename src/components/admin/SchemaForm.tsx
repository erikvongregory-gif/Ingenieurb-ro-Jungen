"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { DocSchema, Field } from "@/lib/cms/schemas";
import type { Locale } from "@/i18n/routing";
import { saveDocument } from "@/lib/cms/actions";
import { ImageField } from "./ImageField";

type Obj = Record<string, unknown>;

/** Leerer Startwert für ein Feld (beim Hinzufügen neuer Listeneinträge). */
function emptyForField(field: Field): unknown {
  switch (field.type) {
    case "text":
    case "textarea":
    case "image":
      return "";
    case "stringList":
    case "objectList":
      return [];
    case "group": {
      const o: Obj = {};
      for (const f of field.fields) o[f.name] = emptyForField(f);
      return o;
    }
  }
}

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

const inputClass =
  "w-full rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20";

function FieldView({
  field,
  value,
  onChange,
  cmsKey,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
  cmsKey: string;
}) {
  if (field.type === "text") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">{field.label}</span>
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        {field.help && <span className="text-xs text-muted-foreground">{field.help}</span>}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">{field.label}</span>
        <textarea
          rows={4}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
        {field.help && <span className="text-xs text-muted-foreground">{field.help}</span>}
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground/80">{field.label}</span>
        <ImageField
          value={(value as string) ?? ""}
          onChange={(url) => onChange(url)}
          cmsKey={cmsKey}
        />
        {field.help && <span className="text-xs text-muted-foreground">{field.help}</span>}
      </div>
    );
  }

  if (field.type === "stringList") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground/80">{field.label}</span>
        <div className="flex flex-col gap-2">
          {arr.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <textarea
                rows={1}
                value={item ?? ""}
                onChange={(e) => {
                  const next = arr.slice();
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className={`${inputClass} resize-y`}
              />
              <ListItemControls
                onUp={() => onChange(moveItem(arr, i, i - 1))}
                onDown={() => onChange(moveItem(arr, i, i + 1))}
                onRemove={() => onChange(arr.filter((_, j) => j !== i))}
              />
            </div>
          ))}
        </div>
        <AddButton
          label={field.itemLabel ?? "Eintrag"}
          onAdd={() => onChange([...arr, ""])}
        />
        {field.help && <span className="text-xs text-muted-foreground">{field.help}</span>}
      </div>
    );
  }

  if (field.type === "objectList") {
    const arr = Array.isArray(value) ? (value as Obj[]) : [];
    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground/80">{field.label}</span>
        <div className="flex flex-col gap-4">
          {arr.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/60 bg-secondary/20 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {(field.itemLabel ?? "Eintrag")} {i + 1}
                </span>
                <ListItemControls
                  onUp={() => onChange(moveItem(arr, i, i - 1))}
                  onDown={() => onChange(moveItem(arr, i, i + 1))}
                  onRemove={() => onChange(arr.filter((_, j) => j !== i))}
                />
              </div>
              <div className="flex flex-col gap-4">
                {field.fields.map((sub) => (
                  <FieldView
                    key={sub.name}
                    field={sub}
                    value={(item as Obj)?.[sub.name]}
                    cmsKey={cmsKey}
                    onChange={(v) => {
                      const next = arr.slice();
                      next[i] = { ...(item as Obj), [sub.name]: v };
                      onChange(next);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <AddButton
          label={field.itemLabel ?? "Eintrag"}
          onAdd={() =>
            onChange([
              ...arr,
              Object.fromEntries(
                field.fields.map((f) => [f.name, emptyForField(f)]),
              ),
            ])
          }
        />
        {field.help && <span className="text-xs text-muted-foreground">{field.help}</span>}
      </div>
    );
  }

  // group
  const obj = (value as Obj) ?? {};
  return (
    <fieldset className="flex flex-col gap-4 rounded-xl border border-border/50 p-4">
      <legend className="px-1 text-sm font-medium text-foreground/80">
        {field.label}
      </legend>
      {field.fields.map((sub) => (
        <FieldView
          key={sub.name}
          field={sub}
          value={obj[sub.name]}
          cmsKey={cmsKey}
          onChange={(v) => onChange({ ...obj, [sub.name]: v })}
        />
      ))}
    </fieldset>
  );
}

function ListItemControls({
  onUp,
  onDown,
  onRemove,
}: {
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition hover:bg-secondary hover:text-foreground";
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={onUp} className={btn} title="Nach oben">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" onClick={onDown} className={btn} title="Nach unten">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className={`${btn} hover:border-red-500/40 hover:text-red-400`}
        title="Entfernen"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function AddButton({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border/70 px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
    >
      <Plus className="h-4 w-4" />
      {label} hinzufügen
    </button>
  );
}

export function SchemaForm({
  schema,
  initialValue,
  locale,
  cmsKey,
}: {
  schema: DocSchema;
  initialValue: Obj;
  locale: Locale;
  cmsKey: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<Obj>(initialValue ?? {});
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  function handleSave() {
    setStatus(null);
    startTransition(async () => {
      const result = await saveDocument(cmsKey, locale, data);
      if (result.ok) {
        setStatus({ ok: true, msg: "Gespeichert. Die Website wird aktualisiert." });
        router.refresh();
      } else {
        setStatus({ ok: false, msg: result.error ?? "Speichern fehlgeschlagen." });
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {schema.fields.map((field) => (
          <FieldView
            key={field.name}
            field={field}
            value={data[field.name]}
            cmsKey={cmsKey}
            onChange={(v) => setData((prev) => ({ ...prev, [field.name]: v }))}
          />
        ))}
      </div>

      <div className="sticky bottom-0 -mx-6 flex items-center gap-4 border-t border-border/50 bg-background/85 px-6 py-3.5 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Speichern …" : "Speichern"}
        </button>
        {status && (
          <p className={`text-sm ${status.ok ? "text-emerald-400" : "text-red-400"}`}>
            {status.msg}
          </p>
        )}
      </div>
    </div>
  );
}
