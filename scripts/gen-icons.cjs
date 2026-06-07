/**
 * Génère les icônes PWA de « Peer to Peer » à partir du logo (carré rose
 * + point clair). Lancé manuellement : `node scripts/gen-icons.cjs`.
 * Dépend de `sharp` (déjà présent dans l'arbre de dépendances).
 */
const sharp = require("sharp");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");
const APP = path.join(__dirname, "..", "app");
const PINK = "#a05f5d"; // --accent (rose poudré, palette Adobe)

function squareSvg(size, withDot) {
  const d = Math.round(size * 0.18);
  const off = Math.round(size * 0.16);
  const x = size - off - d;
  const y = size - off - d;
  const dot = withDot
    ? `<rect x="${x}" y="${y}" width="${d}" height="${d}" fill="#ffffff"/>`
    : "";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<rect width="${size}" height="${size}" fill="${PINK}"/>${dot}</svg>`
  );
}

async function gen(dir, name, size, withDot) {
  const file = path.join(dir, name);
  await sharp(squareSvg(size, withDot)).png().toFile(file);
  console.log("écrit :", path.relative(path.join(__dirname, ".."), file));
}

(async () => {
  await gen(PUBLIC, "icon-192.png", 192, true);
  await gen(PUBLIC, "icon-512.png", 512, true);
  // Maskable : carré plein (sans point) pour rester lisible sous tout masque.
  await gen(PUBLIC, "icon-maskable-512.png", 512, false);
  // Apple touch icon (servi automatiquement par Next depuis app/apple-icon.png).
  await gen(APP, "apple-icon.png", 180, true);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
