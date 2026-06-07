/**
 * Socle de graphiques « Comme des Fous » (sur Recharts), conforme à la charte :
 * carré, zéro ombre, palette verrouillée, mode sombre, prefers-reduced-motion,
 * accessibilité (légende + table sr-only). Tout est rendu côté client à partir
 * de l'état en sessionStorage : aucune donnée n'est envoyée sur le réseau.
 *
 * Les 6 familles (cf. docs/charts/recommandations-par-outil.md) :
 *  - RadarProfile      → profils multi-facteurs (RAS, attributions, fleur notée)
 *  - HBarRanking       → classements (hiérarchie d'exposition, soutien par personne)
 *  - BeforeAfterBars   → comparaisons avant/après (croyance, stress, détresse…)
 *  - TrendLine         → séries temporelles (intensité panique, sommeil)
 *  - DistributionDonut → répartitions ≤ 3 catégories (types d'inquiétudes…)
 *  - ScoreGauge        → score unique vs maximum/bandes (Burns, estime…)
 */
export { RadarProfile, type RadarPoint } from "./RadarProfile";
export { HBarRanking, type BarDatum } from "./HBarRanking";
export { BeforeAfterBars, type BeforeAfterDatum } from "./BeforeAfterBars";
export { TrendLine, type TrendPoint } from "./TrendLine";
export { DistributionDonut, type SliceDatum } from "./DistributionDonut";
export { ScoreGauge } from "./ScoreGauge";
export { ChartFigure, SrDataTable } from "./ChartFrame";
export type { ChartAccent } from "./theme";
