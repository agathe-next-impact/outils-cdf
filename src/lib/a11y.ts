/**
 * Constantes d'accessibilité partagées.
 * Focus carré net (jamais d'ombre/arrondi) — voir aussi globals.css.
 */

/** Classe utilitaire de focus visible cohérente avec la charte. */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2";

/** Détermine la couleur d'accent (classes utilitaires) selon l'accent de l'outil. */
export function accentBorder(accent: "yellow" | "red" | "blue"): string {
  switch (accent) {
    case "yellow":
      return "border-yellow";
    case "red":
      return "border-red";
    case "blue":
      return "border-blue";
  }
}

export function accentBg(accent: "yellow" | "red" | "blue"): string {
  switch (accent) {
    case "yellow":
      return "bg-yellow text-black";
    case "red":
      return "bg-red text-white";
    case "blue":
      return "bg-blue text-white";
  }
}
