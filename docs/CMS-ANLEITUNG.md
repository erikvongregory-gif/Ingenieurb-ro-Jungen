# Inhalte verwalten (CMS)

Die Website liest ihre Inhalte aus einem eigenen Supabase-Projekt. Solange kein
Supabase-Projekt konfiguriert ist, nutzt die Seite automatisch die fest im Code
hinterlegten Standardtexte (`src/content/*`). Es kann also nichts kaputtgehen.

## Einrichtung (einmalig, technisch)

1. Eigenes Supabase-Projekt anlegen: https://supabase.com → New project.
2. SQL-Migration ausführen: Inhalt von `supabase/migrations/0001_cms.sql` im
   Supabase **SQL Editor** einfügen und ausführen (legt Tabelle, Sicherheits-
   regeln und den Bild-Speicher „media" an).
3. Zugangsdaten eintragen: `.env.example` nach `.env.local` kopieren und
   `NEXT_PUBLIC_SUPABASE_URL` sowie `NEXT_PUBLIC_SUPABASE_ANON_KEY` aus
   „Project Settings → API" einsetzen. Dieselben Variablen beim Hoster
   (z. B. Vercel) hinterlegen.
4. Redakteur-Login anlegen: in Supabase unter **Authentication → Users** einen
   Benutzer mit E-Mail + Passwort erstellen (Empfehlung: „Auto Confirm").
5. Erststart: unter `/admin` anmelden und einmalig
   **„Standardinhalte importieren"** klicken. Damit werden die aktuellen Texte
   in die Datenbank übernommen und sind danach bearbeitbar.

## Bedienung (für den Kunden)

- Aufruf: `https://DEINE-DOMAIN/admin` → mit E-Mail und Passwort anmelden.
- Übersicht: Bereiche wie Startseite, Leistungen, Referenzen, FAQ, Kontakt.
- Sprache: oben rechts zwischen **DE** und **EN** umschalten – jede Sprache wird
  getrennt gepflegt.
- Bearbeiten: Felder ausfüllen, Listeneinträge mit „+" hinzufügen, mit den
  Pfeil-Symbolen sortieren, mit dem Papierkorb löschen.
- Bilder: über „Bild hochladen" auswählen – das Bild landet automatisch im
  Speicher und wird verknüpft.
- Speichern: Button unten. Die Website aktualisiert sich danach automatisch.

## Gut zu wissen

- Ändert man nichts an einem Bereich, bleibt er, wie er ist.
- Interne Felder (z. B. die Seiten-Zuordnung einer Leistung) werden nicht
  angezeigt, bleiben beim Speichern aber erhalten.
- Wird die Datenbank einmal nicht erreicht, zeigt die Seite weiterhin die zuletzt
  bekannten bzw. die Standardinhalte an.
