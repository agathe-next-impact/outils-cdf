/**
 * Définition déclarative d'un champ de saisie, partagée par les moteurs
 * wizard et worksheet (rendu par FieldRenderer).
 */

export type FieldType =
  | "shortText"
  | "longText"
  | "slider"
  | "number"
  | "select"
  | "multiSelect"
  | "tagList"
  | "date"
  | "time"
  | "checkbox"
  | "repeatableList";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  type: FieldType;
  label: string;
  help?: string;
  placeholder?: string;
  /** Par défaut, tout champ est facultatif (liberté de non-réponse). */
  optional?: boolean;
  /** slider / number */
  min?: number;
  max?: number;
  step?: number;
  /** Libellés des extrémités d'un slider (ex. "Pas du tout" → "Énormément"). */
  minLabel?: string;
  maxLabel?: string;
  /** select / multiSelect */
  options?: FieldOption[];
  /** shortText / longText */
  maxLength?: number;
  /** type "repeatableList" : schéma d'une ligne + libellé du bouton d'ajout. */
  itemSchema?: FieldDef[];
  addLabel?: string;
}
