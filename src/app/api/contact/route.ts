/**
 * Kontaktformular-Endpunkt (POST /api/contact)
 * ------------------------------------------------------------------
 * Validiert die Anfrage serverseitig (defensiv, unabhängig vom Client),
 * filtert Bots per Honeypot und ist als zentrale Stelle für den späteren
 * E-Mail-Versand vorbereitet.
 *
 * >>> TODO: Echten Versand anbinden (z. B. Resend, SMTP/Nodemailer oder ein
 *     Webhook). Setze dafür die nötigen Secrets als Umgebungsvariablen und
 *     sende die Nachricht an `siteConfig.contact.email`.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  topic?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown; // Honeypot
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: gefülltes (für Menschen unsichtbares) Feld => Bot. Still 200,
  // damit der Bot keinen Fehler zur Optimierung erhält.
  if (str(body.website) !== "") {
    return Response.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const consent = body.consent === true;

  if (!name || !email || !EMAIL_RE.test(email) || !message || !consent) {
    return Response.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const submission = {
    name,
    email,
    phone: str(body.phone),
    company: str(body.company),
    topic: str(body.topic) || "automation",
    message,
    receivedAt: new Date().toISOString(),
  };

  // TODO: An dieser Stelle die E-Mail tatsächlich versenden.
  // Bis dahin landet die Anfrage im Server-Log, damit nichts verloren geht.
  console.info("[contact] Neue Anfrage erhalten:", submission);

  return Response.json({ ok: true });
}
