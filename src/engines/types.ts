/**
 * Types transverses des moteurs.
 * Ce fichier ne dépend d'aucun autre module des moteurs (évite les cycles).
 */

export type EngineKind = "scored" | "wizard" | "worksheet" | "composite";

export type ToolCategory = "questionnaires" | "parcours" | "carnets";

/** Sensibilité du contenu — pilote l'affichage du ConsentGate. */
export type Sensitivity = "low" | "medium" | "high";

/** Accent de la charte associé à l'outil (couleur de section). */
export type Accent = "yellow" | "red" | "blue";

/** Niveau de mise en avant des ressources de crise. */
export type CrisisLevel = "standard" | "elevated";

/** Métadonnées communes à tout outil (catalogue, en-tête, garde-fous). */
export interface ToolMeta {
  /** Identifiant d'URL, ex. "inventaire-burns-anxiete". */
  slug: string;
  title: string;
  shortTitle?: string;
  category: ToolCategory;
  /** Clé GameIcon (lucide-react). */
  iconName: string;
  accent: Accent;
  /** Résumé court pour le catalogue. */
  summary: string;
  estimatedMinutes?: number;
  sensitivity: Sensitivity;
  /** Crédit de la source (auteur, méthode). */
  sourceCredit: string;
  /** Clé d'avertissement (src/content/disclaimers.ts). */
  disclaimerKey: string;
  crisisLevel: CrisisLevel;
}

/* --- Valeurs de champ (partagées wizard / worksheet) ---------------------- */

export type Scalar = string | number | boolean | null;

/** Une ligne de liste répétable : un enregistrement de scalaires par colonne. */
export type RepeatRow = Record<string, Scalar>;

/** Valeur possible d'un champ rendu par FieldRenderer. */
export type FieldValue = Scalar | string[] | RepeatRow[];
