import Link from "next/link";

/**
 * Globale 404-Seite für Pfade außerhalb des Sprach-Routings.
 * Da es kein Root-Layout gibt, rendert diese Seite ihr eigenes <html>.
 */
export default function GlobalNotFound() {
  return (
    <html lang="de">
      <body>
        <h1>404 – Seite nicht gefunden / Page not found</h1>
        <p>
          <Link href="/">Zur Startseite / Back to home</Link>
        </p>
      </body>
    </html>
  );
}
