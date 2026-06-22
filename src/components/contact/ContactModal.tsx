"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import {
  AlertCircle,
  Check,
  Loader2,
  Mail,
  Phone,
  Send,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CONTACT_OPEN_EVENT } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<
  Record<"name" | "email" | "message" | "consent", string>
>;

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  topic: "automation",
  message: "",
  consent: false,
  website: "", // Honeypot (für Menschen unsichtbar)
};

const inputBase =
  "w-full rounded-xl border bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ContactModal() {
  const t = useTranslations("ContactModal");

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ ...EMPTY });
  const [errors, setErrors] = useState<FieldErrors>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    // Fokus zurück auf das auslösende Element.
    lastFocusedRef.current?.focus?.();
  }, []);

  // Öffnen über globales Event.
  useEffect(() => {
    const onOpen = () => {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      setStatus("idle");
      setErrors({});
      setValues({ ...EMPTY });
      setOpen(true);
    };
    window.addEventListener(CONTACT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_OPEN_EVENT, onOpen);
  }, []);

  // Scroll-Lock + Erstfokus, solange offen.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && status !== "submitting") {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [close, status],
  );

  const validate = useCallback((): FieldErrors => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = t("nameRequired");
    if (!values.email.trim()) next.email = t("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = t("emailInvalid");
    if (!values.message.trim()) next.message = t("messageRequired");
    if (!values.consent) next.consent = t("consentRequired");
    return next;
  }, [values, t]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const found = validate();
      setErrors(found);
      if (Object.keys(found).length > 0) {
        const firstKey = Object.keys(found)[0];
        const el = dialogRef.current?.querySelector<HTMLElement>(
          `[name="${firstKey}"]`,
        );
        el?.focus();
        return;
      }
      setStatus("submitting");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("request failed");
        setStatus("success");
      } catch {
        setStatus("error");
      }
    },
    [validate, values],
  );

  if (!mounted || !open) return null;

  const set = <K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) => setValues((v) => ({ ...v, [key]: value }));

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onKeyDown={onKeyDown}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t("close")}
        tabIndex={-1}
        onClick={() => status !== "submitting" && close()}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm motion-safe:animate-[fadeIn_200ms_ease-out]"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-gradient-to-b from-card/95 to-card shadow-[0_8px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl motion-safe:animate-[modalIn_240ms_cubic-bezier(0.16,1,0.3,1)] sm:rounded-3xl"
      >
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.98) }
            to { opacity: 1; transform: translateY(0) scale(1) }
          }
          @media (prefers-reduced-motion: reduce) {
            .motion-safe\\:animate-\\[fadeIn_200ms_ease-out\\],
            .motion-safe\\:animate-\\[modalIn_240ms_cubic-bezier\\(0\\.16\\,1\\,0\\.3\\,1\\)\\] { animation: none !important }
          }
        `}</style>

        {/* Close-Button */}
        <button
          type="button"
          onClick={() => status !== "submitting" && close()}
          aria-label={t("close")}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-40"
          disabled={status === "submitting"}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto px-6 pb-6 pt-7 sm:px-8 sm:pb-8">
          {status === "success" ? (
            <SuccessView t={t} onClose={close} />
          ) : (
            <>
              {/* Kopf */}
              <div className="pr-8">
                <p className="font-serif text-sm italic text-primary/90">
                  {siteConfig.name}
                </p>
                <h2
                  id="contact-modal-title"
                  className="mt-1 font-sans text-2xl font-extrabold tracking-tight text-foreground"
                >
                  {t("title")}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {t("subtitle")}
                </p>
              </div>

              {/* Direktkontakt */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/45">
                  {t("orDirect")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.contact.phoneDisplay && (
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  )}
                  {siteConfig.contact.email && (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      {t("email")}
                    </a>
                  )}
                </div>
              </div>

              <div className="my-5 h-px w-full bg-border/50" />

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-sm"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {t("errorTitle")}
                    </p>
                    <p className="mt-0.5 text-foreground/70">{t("errorText")}</p>
                  </div>
                </div>
              )}

              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                {/* Honeypot */}
                <div aria-hidden className="hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => set("website", e.target.value)}
                    />
                  </label>
                </div>

                <Field
                  id="cm-name"
                  label={t("name")}
                  error={errors.name}
                  required
                >
                  <input
                    ref={firstFieldRef}
                    id="cm-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "cm-name-err" : undefined}
                    className={cn(
                      inputBase,
                      errors.name ? "border-destructive/70" : "border-border/60",
                    )}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="cm-email"
                    label={t("emailField")}
                    error={errors.email}
                    required
                  >
                    <input
                      id="cm-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("emailPlaceholder")}
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "cm-email-err" : undefined}
                      className={cn(
                        inputBase,
                        errors.email
                          ? "border-destructive/70"
                          : "border-border/60",
                      )}
                    />
                  </Field>

                  <Field id="cm-phone" label={t("phone")} optional={t("optional")}>
                    <input
                      id="cm-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t("phonePlaceholder")}
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={cn(inputBase, "border-border/60")}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="cm-company"
                    label={t("company")}
                    optional={t("optional")}
                  >
                    <input
                      id="cm-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder={t("companyPlaceholder")}
                      value={values.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={cn(inputBase, "border-border/60")}
                    />
                  </Field>

                  <Field id="cm-topic" label={t("topic")}>
                    <select
                      id="cm-topic"
                      name="topic"
                      value={values.topic}
                      onChange={(e) => set("topic", e.target.value)}
                      className={cn(inputBase, "border-border/60 appearance-none")}
                    >
                      <option value="automation">{t("topicAutomation")}</option>
                      <option value="retrofit">{t("topicRetrofit")}</option>
                      <option value="other">{t("topicOther")}</option>
                    </select>
                  </Field>
                </div>

                <Field
                  id="cm-message"
                  label={t("message")}
                  error={errors.message}
                  required
                >
                  <textarea
                    id="cm-message"
                    name="message"
                    rows={4}
                    placeholder={t("messagePlaceholder")}
                    value={values.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "cm-message-err" : undefined
                    }
                    className={cn(
                      inputBase,
                      "resize-y min-h-[7rem]",
                      errors.message
                        ? "border-destructive/70"
                        : "border-border/60",
                    )}
                  />
                </Field>

                {/* Einwilligung */}
                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/75">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border/60 accent-primary"
                    />
                    <span className="leading-relaxed">
                      {t.rich("consent", {
                        link: (chunks) => (
                          <Link
                            href="/datenschutz"
                            target="_blank"
                            className="text-primary underline underline-offset-2 hover:text-primary/80"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 pl-7 text-xs text-destructive">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Absenden */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-primary/90 to-primary px-6 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.15),0_12px_24px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("submit")}
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  id,
  label,
  error,
  required,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-medium text-foreground/70"
      >
        {label}
        {required && <span className="text-primary">*</span>}
        {optional && (
          <span className="font-normal text-foreground/40">({optional})</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessView({
  t,
  onClose,
}: {
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
        <Check className="h-8 w-8 text-primary" />
      </span>
      <h2
        id="contact-modal-title"
        className="mt-5 font-sans text-2xl font-extrabold tracking-tight text-foreground"
      >
        {t("successTitle")}
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/70">
        {t("successText")}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-b from-card/80 to-card px-6 text-sm font-semibold text-card-foreground ring-1 ring-border/60 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {t("close")}
      </button>
    </div>
  );
}
