import { ImageResponse } from "next/og";

export const alt = "Ingenieurbüro Jungen – Messen Sie uns an Ihren Herausforderungen. Industrieautomation & Retrofit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0e1a2b";
const muted = "#5d6877";
const accent = "#1f46c4";
const paper = "#f5f4f0";

/** Open-Graph-Bild im Stil der Website: Zeichenpapier, Headline mit Bemaßung. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: paper,
          backgroundImage:
            "linear-gradient(to right, rgba(14,26,43,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,26,43,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: ink,
        }}
      >
        {/* Kopfzeile */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="44" height="44" viewBox="0 0 32 32">
              <rect x="1" y="1" width="30" height="30" rx="7" fill={ink} />
              <rect x="8" y="8" width="6" height="16" rx="1.5" fill="#fff" />
              <rect x="18" y="8" width="6" height="9" rx="1.5" fill="#fff" />
              <circle cx="21" cy="21.5" r="2.5" fill="#e2731f" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 26, letterSpacing: -0.5 }}>Ingenieurbüro Jungen</span>
              <span style={{ fontSize: 13, letterSpacing: 2.5, color: muted, marginTop: 2 }}>ALL ABOUT INDUSTRIAL AUTOMATION</span>
            </div>
          </div>
          <span style={{ fontSize: 14, letterSpacing: 2.5, color: muted }}>BLATT 01 · MASSSTAB 1:1</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: -5 }}>
            <span>Messen Sie uns</span>
            <span>an Ihren</span>
            <span style={{ color: accent }}>Herausforderungen.</span>
          </div>
          {/* Maßlinie */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 22, width: 850, color: accent }}>
            <div style={{ width: 1, height: 18, background: accent }} />
            <div style={{ flex: 1, height: 1, background: accent }} />
            <span style={{ fontSize: 15, letterSpacing: 1, padding: "0 12px", color: accent }}>Ihr Maßstab</span>
            <div style={{ flex: 1, height: 1, background: accent }} />
            <div style={{ width: 1, height: 18, background: accent }} />
          </div>
        </div>

        {/* Fußzeile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1.5px solid ${ink}`,
            paddingTop: 18,
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex", gap: 28, color: muted }}>
            <span style={{ color: ink }}>Automation & Retrofit</span>
            <span>Herstellerunabhängig</span>
            <span>25+ Jahre Erfahrung</span>
          </div>
          <span style={{ color: ink }}>ib-jungen.de</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
