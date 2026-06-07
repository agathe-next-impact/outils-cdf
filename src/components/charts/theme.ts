/**
 * Socle de thème pour les graphiques (Recharts) — conforme à la charte
 * « Comme des Fous » : palette verrouillée, carré (aucun arrondi de barre),
 * zéro ombre, couleurs thémées (clair/sombre), respect de prefers-reduced-motion.
 *
 * RÈGLES :
 *  - barres : toujours `radius={0}` (le reset CSS global n'agit PAS sur le SVG).
 *  - le jaune ne sert jamais à un texte/trait fin (uniquement remplissage de zone).
 *  - l'information n'est jamais portée par la seule couleur → légende + libellés +
 *    table accessible (voir ChartFrame).
 */
import { useEffect, useState } from "react";
import type { XAxisProps } from "recharts";

/* --- Accents fixes (mêmes valeurs qu'globals.css ; fallback si token non émis) --- */
export const CHART_BLUE = "var(--color-blue, oklch(62.3% 0.214 259.815))";
export const CHART_RED = "var(--color-red, oklch(63.7% 0.237 25.331))";
export const CHART_YELLOW = "var(--color-yellow, oklch(82.8% 0.189 84.429))";

export type ChartAccent = "blue" | "red" | "yellow";

export function accentColor(a: ChartAccent): string {
  return a === "red" ? CHART_RED : a === "yellow" ? CHART_YELLOW : CHART_BLUE;
}

/** Palette de séries multiples (3 accents — au-delà, préférer un bar à 1 couleur). */
export const SERIES_PALETTE = [CHART_BLUE, CHART_RED, CHART_YELLOW];

/* --- Couleurs thémées (s'inversent en mode sombre via les variables globales) --- */
export const FG = "var(--foreground)";
export const GRID = "color-mix(in srgb, var(--foreground) 14%, transparent)";
export const MUTED = "color-mix(in srgb, var(--foreground) 55%, transparent)";
export const TRACK = "color-mix(in srgb, var(--foreground) 10%, transparent)";
/** Barre « neutre » (ex. mesure « avant » dans une comparaison avant/après). */
export const NEUTRAL_BAR = "color-mix(in srgb, var(--foreground) 30%, transparent)";

/** Style de tooltip thémé (le carré + l'absence d'ombre sont déjà imposés globalement). */
export const tooltipProps = {
  contentStyle: {
    background: "var(--background)",
    border: `1px solid ${GRID}`,
    color: FG,
    fontSize: 12,
    padding: "6px 10px",
  },
  labelStyle: { color: FG, fontWeight: 700 },
  itemStyle: { color: FG },
  cursor: { fill: "color-mix(in srgb, var(--foreground) 6%, transparent)" },
} as const;

/** Style des graduations d'axe. */
export const axisTick = { fill: FG, fontSize: 12 } as const;
export const axisTickMuted = { fill: MUTED, fontSize: 10 } as const;

/** Domaine d'axe numérique typé (0 → max fixe, sinon 0 → auto). */
export type AxisDomainProp = NonNullable<XAxisProps["domain"]>;
export function numDomain(max?: number): AxisDomainProp {
  return (max != null ? [0, max] : [0, "auto"]) as AxisDomainProp;
}

/**
 * Renvoie `true` si l'animation est autorisée (faux si prefers-reduced-motion).
 * Initialisé à `false` (pas d'animation au premier rendu / SSR), activé après montage.
 */
export function useChartAnimation(): boolean {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAnimate(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return animate;
}
