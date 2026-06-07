import type { ContentBlock } from "../content";
import type { ToolMeta, FieldValue, RepeatRow } from "../types";
import type { FieldDef } from "../fields";

export interface RepeatableTableDef {
  id: string;
  label: string;
  /** Colonnes = champs d'une ligne (rendus par FieldRenderer). */
  columns: FieldDef[];
  addLabel: string;
  /** Tri automatique à l'affichage (ex. anxiété croissante). */
  sortable?: { byColumnId: string; direction: "asc" | "desc" };
  /** Ajoute un horodatage (`_createdAt`) à la création d'une ligne (ex. GAAP). */
  timestamped?: boolean;
  emptyLabel?: string;
}

export interface WorksheetSection {
  id: string;
  title: string;
  /** Texte informatif non modifiable (versionné via le contenu de l'outil). */
  intro?: ContentBlock[];
  fields?: FieldDef[];
  tables?: RepeatableTableDef[];
  collapsible?: boolean;
}

export interface WorksheetBody {
  intro: ContentBlock[];
  documentTitle: string;
  sections: WorksheetSection[];
}

export type WorksheetDefinition = ToolMeta & WorksheetBody & { engine: "worksheet" };

export interface WorksheetState {
  /** fieldId → valeur (champs de section). */
  values: Record<string, FieldValue>;
  /** tableId → lignes. */
  tables: Record<string, RepeatRow[]>;
}
