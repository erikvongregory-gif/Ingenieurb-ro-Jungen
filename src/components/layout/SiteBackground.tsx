/**
 * Durchgehender Seiten-Hintergrund im FAQ-/Aurora-Stil.
 * Fixiert hinter dem gesamten Inhalt – der Hero hat einen eigenen, deckenden
 * Hintergrund und überdeckt diese Ebene, sodass die Aurora erst nach dem Hero
 * sichtbar wird und beim Scrollen ruhig/konstant bleibt.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 95% at 12% -5%, rgba(42, 166, 189, 0.07), transparent 60%), radial-gradient(ellipse 55% 85% at 92% 108%, rgba(42, 166, 189, 0.04), transparent 60%), #0a0c10",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(130deg, rgba(255,255,255,0.03) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
