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
            "radial-gradient(ellipse 50% 100% at 10% 0%, rgba(226, 232, 240, 0.15), transparent 65%), #000000",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(130deg, rgba(255,255,255,0.04) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
