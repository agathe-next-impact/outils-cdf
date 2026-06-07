import type { ContentBlock } from "../content";
import type { ToolMeta } from "../types";

export interface ScaleOption {
  value: number;
  label: string;
}

export interface ScaleDef {
  id: string;
  options: ScaleOption[];
}

export interface ScoredItem {
  id: string;
  label: string;
  /** Libellé de regroupement (ex. « Sentiments », « Pensées »). */
  group?: string;
  scaleId: string;
  /** Item inversé : score = (max + min) - réponse. */
  reverse?: boolean;
  optional?: boolean;
}

/**
 * Bande d'interprétation. `tone: "attention"` n'est PAS un diagnostic :
 * il déclenche un renforcement des ressources de soutien et un libellé prudent.
 */
export interface SeverityBand {
  code: string;
  /** Bornes inclusives, exprimées sur la base définie par `scoring.bandBasis`. */
  min: number;
  max: number;
  label: string;
  tone: "neutral" | "attention";
  /** Texte prudent, non diagnostique, orientant vers une ressource si utile. */
  guidance: string;
}

export interface SubscoreDef {
  id: string;
  label: string;
  itemIds: string[];
  /** false → libellé « exploratoire / non officiel » (ex. sous-scores RAS). */
  official: boolean;
}

export interface ScoringConfig {
  method: "sum" | "mean";
  /** Afficher aussi la moyenne et un pourcentage (utile pour les échelles Likert). */
  showMeanAndPercent?: boolean;
  bands: SeverityBand[];
  /** Base d'application des bandes (défaut = method). */
  bandBasis?: "sum" | "mean";
  subscores?: SubscoreDef[];
}

/** Corps réutilisable (sans métadonnées) — utilisable comme segment de composite. */
export interface ScoredBody {
  intro: ContentBlock[];
  /** Période de référence affichée, ex. « au cours des 7 derniers jours ». */
  referencePeriod?: string;
  scales: ScaleDef[];
  items: ScoredItem[];
  scoring: ScoringConfig;
  /** Autoriser un score partiel (affiché alors sans interprétation trompeuse). */
  allowIncomplete: boolean;
}

export type ScoredDefinition = ToolMeta & ScoredBody & { engine: "scored" };

/** État runtime persisté en session. */
export interface ScoredState {
  /** itemId → valeur choisie (ou null si non répondu). */
  responses: Record<string, number | null>;
  submitted: boolean;
}
