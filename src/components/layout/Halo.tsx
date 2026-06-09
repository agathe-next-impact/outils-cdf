import type { CSSProperties } from "react";

type HaloColor = "myrtille" | "framboise" | "teal";

interface HaloProps {
  /** Teinte du halo (myrtille / framboise / teal de marque). */
  color?: HaloColor;
  /** Diamètre en px. */
  size?: number;
  /** Décalage d'animation (s) — varier pour désynchroniser les dérives. */
  delay?: number;
  /** Durée de la dérive (s). Défaut : valeur de `.halo`. */
  duration?: number;
  /** Positionnement (top/left/right/bottom) + overrides éventuels (opacity…). */
  style?: CSSProperties;
  className?: string;
}

/**
 * Cercle à halo décoratif — réutilise le décor du hero. Flou doux, faible
 * opacité, dérive très lente (« légèrement mouvant »). Purement décoratif
 * (aria-hidden, sans interaction). `prefers-reduced-motion` fige la dérive.
 *
 * Le parent doit être `position: relative; overflow: hidden;` et son contenu
 * doit passer au-dessus (z-index ≥ 1) — le halo se pose en z-index 0.
 */
export function Halo({
  color = "myrtille",
  size = 360,
  delay = 0,
  duration,
  style,
  className = "",
}: HaloProps) {
  return (
    <span
      aria-hidden
      className={`halo halo--${color} ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        ...(duration ? { animationDuration: `${duration}s` } : null),
        ...style,
      }}
    />
  );
}
