import type { ContentBlock } from "../content";
import type { ToolMeta, FieldValue } from "../types";
import type { FieldDef } from "../fields";

/** Détecteurs d'écueils — pédagogiques et JAMAIS bloquants. */
export type PitfallDetector =
  | "tooVague"
  | "tooShort"
  | "missingActionVerb"
  | "containsWorryBehavior"
  | "keyword"
  | "regex";

export interface PitfallRule {
  id: string;
  appliesToFieldId: string;
  detector: PitfallDetector;
  /** Motif pour `regex`, ou liste de mots-clés séparés par `|` pour `keyword`. */
  pattern?: string;
  /** Message doux, non culpabilisant, proposant une piste. */
  message: string;
}

export interface WizardStep {
  id: string;
  title: string;
  intro?: ContentBlock[];
  fields: FieldDef[];
  pitfalls?: PitfallRule[];
  /** Saut conditionnel : étape visible seulement si un champ vaut une valeur. */
  visibleWhen?: { fieldId: string; equals: string | number | boolean };
}

export interface WizardBody {
  intro: ContentBlock[];
  steps: WizardStep[];
  /** Récompense optionnelle à la synthèse (loi 7). */
  reward?: { confetti: boolean; message: string };
}

export type WizardDefinition = ToolMeta & WizardBody & { engine: "wizard" };

export interface WizardState {
  /** fieldId → valeur. */
  values: Record<string, FieldValue>;
  currentStep: number;
  completed: boolean;
}
