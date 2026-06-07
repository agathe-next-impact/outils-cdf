/**
 * Types et prédicats PURS des parcours par objectif — sans aucune dépendance au
 * registre des outils (donc importables côté CLIENT sans gonfler le bundle).
 * La résolution des refs (qui a besoin du registre) vit dans `src/data/pathways.ts`.
 */
import type { Accent } from "@/engines/types";

/** Moteur « feuille » d'un slice (un segment ou un outil mono-moteur). */
export type LeafEngine = "scored" | "wizard" | "worksheet";

/** Un slice à interroger pour connaître l'avancement d'une étape. */
export interface StepCheck {
  /** Clé de slice dans le store (slug, ou `parent::segment`). */
  sliceKey: string;
  engine: LeafEngine;
}

/** Étape résolue (sérialisable), prête à passer du serveur au client. */
export interface ResolvedStep {
  ref: string;
  /** Libellé de l'étape (titre d'outil ou de segment). */
  label: string;
  /** Outil porteur (contexte affiché sous le libellé pour un segment). */
  toolTitle: string;
  why: string;
  optional: boolean;
  iconName: string;
  accent: Accent;
  /** Lien vers l'outil. */
  href: string;
  checks: StepCheck[];
  /** L'outil est-il réellement implémenté (sinon « bientôt »). */
  available: boolean;
}

export type StepStatus = "todo" | "started" | "done";

/** Reprend la logique de complétion des moteurs (cf. composite/segments.ts). */
function leafDone(engine: LeafEngine, state: unknown): boolean {
  if (!state || typeof state !== "object") return false;
  if (engine === "scored") return (state as { submitted?: boolean }).submitted === true;
  if (engine === "wizard") return (state as { completed?: boolean }).completed === true;
  const ws = state as { values?: Record<string, unknown>; tables?: Record<string, unknown> };
  return Object.keys(ws.values ?? {}).length > 0 || Object.keys(ws.tables ?? {}).length > 0;
}

/**
 * Statut d'une étape à partir des slices courants :
 *  - « done » si TOUS les checks sont complétés (un outil composite n'est
 *    « terminé » que si tous ses segments le sont) ;
 *  - « started » si au moins un slice existe ;
 *  - « todo » sinon.
 */
export function stepStatus(checks: StepCheck[], tools: Record<string, unknown>): StepStatus {
  if (checks.length === 0) return "todo";
  const slices = checks.map((c) => tools[c.sliceKey]);
  const allDone = checks.every((c, i) => leafDone(c.engine, slices[i]));
  if (allDone) return "done";
  return slices.some((s) => s != null) ? "started" : "todo";
}

export const STATUS_LABEL: Record<StepStatus, string> = {
  todo: "À faire",
  started: "En cours",
  done: "Terminé",
};
