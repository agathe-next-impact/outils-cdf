/**
 * Format pivot d'export. Chaque moteur sait produire un NeutralDocument à partir
 * de (définition, état) ; les sérialiseurs MD / JSON / impression ne consomment
 * QUE ce format. Un seul point d'intégration par moteur.
 */

export interface NeutralDocument {
  toolSlug: string;
  toolTitle: string;
  /** Date ISO, estampillée au moment de l'export. */
  generatedAt: string;
  /** Avertissement injecté systématiquement (garde-fou). */
  disclaimer: string;
  sections: NeutralSection[];
}

export interface NeutralSection {
  heading: string;
  blocks: NeutralBlock[];
}

export type NeutralBlock =
  | { kind: "kv"; pairs: { label: string; value: string }[] }
  | { kind: "scale"; label: string; value: number; max: number }
  | { kind: "score"; label: string; value: number; max: number; band?: string; guidance?: string }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | { kind: "text"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "heading"; level: 2 | 3; text: string };
