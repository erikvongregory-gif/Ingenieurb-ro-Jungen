import fs from "node:fs";
import sharp from "sharp";

const OUT = "public/icons";
fs.mkdirSync(OUT, { recursive: true });

const BG = "#116275"; // Hintergrundfarbe des Original-Favicons
const FG = "#eaf3f6"; // heller Bogen (leicht bläuliches Weiß)

// Bogen-Motiv, rekonstruiert aus dem 16x16-Original (viewBox 0 0 16 16):
// steiler Anstieg links -> Scheitel -> sanfter Abfall nach rechts.
const arcPath =
  "M0.6 9.7 C1.1 7.7 2.3 5.9 4.3 5.6 C5.3 5.45 6.3 5.6 7.5 6.1 C9.7 7.0 12.5 8.2 15.3 8.6";

function svg(stroke) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="${BG}"/>
  <path d="${arcPath}" fill="none" stroke="${FG}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

// Master-SVG (skalierbar, auch als modernes Favicon nutzbar).
fs.writeFileSync(`${OUT}/icon.svg`, svg(1.7));

async function render(size, stroke) {
  return sharp(Buffer.from(svg(stroke)), { density: 384 })
    .resize(size, size, { fit: "fill" })
    .png();
}

// Full-bleed Icons (gleiches Framing wie das Original-Favicon).
for (const size of [192, 512]) {
  await (await render(size, 1.7)).toFile(`${OUT}/icon-${size}.png`);
}
await (await render(180, 1.7)).toFile(`${OUT}/apple-touch-icon.png`);

// Maskable: Bogen etwas kleiner -> bleibt in der Safe-Zone (kein Beschnitt).
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
  <rect width="16" height="16" fill="${BG}"/>
  <g transform="translate(8 8) scale(0.62) translate(-8 -7.1)">
    <path d="${arcPath}" fill="none" stroke="${FG}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
await sharp(Buffer.from(maskSvg), { density: 384 })
  .resize(512, 512, { fit: "fill" })
  .png()
  .toFile(`${OUT}/icon-maskable-512.png`);

console.log("Vektor-Icons erzeugt in", OUT);
