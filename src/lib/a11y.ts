/**
 * Constantes d'accessibilité partagées.
 * Focus doux : anneau bleu qui suit l'arrondi (jamais une ombre seule) — voir aussi globals.css.
 */

/** Classe utilitaire de focus visible cohérente avec la charte (anneau bleu). */
export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

/**
 * Couleur sémantique (classes utilitaires) selon l'accent de l'outil, conforme à la
 * charte « Minimalisme éditorial chaleureux » (paires vérifiées AA dans les deux thèmes).
 */
export function accentBorder(accent: "yellow" | "red" | "blue"): string {
  switch (accent) {
    case "yellow":
      return "border-warning";
    case "red":
      return "border-danger";
    case "blue":
      return "border-info";
  }
}

export function accentBg(accent: "yellow" | "red" | "blue"): string {
  switch (accent) {
    case "yellow":
      return "bg-warning-soft text-foreground";
    case "red":
      return "bg-danger text-on-accent";
    case "blue":
      return "bg-surface-2 text-foreground";
  }
}
