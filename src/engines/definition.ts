/**
 * Union de toutes les définitions d'outils + gardes de type.
 * Importe les types de chaque moteur (sens unique : engines → ce fichier).
 */
import type { ScoredDefinition, ScoredState } from "./scored/types";
import type { WizardDefinition, WizardState } from "./wizard/types";
import type { WorksheetDefinition, WorksheetState } from "./worksheet/types";
import type { CompositeDefinition, CompositeState } from "./composite/types";

export type ToolDefinition =
  | ScoredDefinition
  | WizardDefinition
  | WorksheetDefinition
  | CompositeDefinition;

/** État runtime correspondant, selon le moteur. */
export type ToolState =
  | ScoredState
  | WizardState
  | WorksheetState
  | CompositeState;

export function isScored(def: ToolDefinition): def is ScoredDefinition {
  return def.engine === "scored";
}
export function isWizard(def: ToolDefinition): def is WizardDefinition {
  return def.engine === "wizard";
}
export function isWorksheet(def: ToolDefinition): def is WorksheetDefinition {
  return def.engine === "worksheet";
}
export function isComposite(def: ToolDefinition): def is CompositeDefinition {
  return def.engine === "composite";
}
