import type { ContentBlock } from "../content";
import type { ToolMeta } from "../types";
import type { ScoredBody, ScoredState } from "../scored/types";
import type { WizardBody, WizardState } from "../wizard/types";
import type { WorksheetBody, WorksheetState } from "../worksheet/types";

/**
 * Un segment renvoie au CORPS d'un moteur existant (sans métadonnées) : la
 * composition réutilise les runners A/B/C sans logique nouvelle.
 */
export type SegmentRef =
  | { engine: "scored"; body: ScoredBody }
  | { engine: "wizard"; body: WizardBody }
  | { engine: "worksheet"; body: WorksheetBody };

export interface CompositeSegment {
  id: string;
  title: string;
  iconName?: string;
  summary?: string;
  ref: SegmentRef;
  /** Débloqué seulement après complétion du segment référencé (ordre pédagogique). */
  unlockAfter?: string;
  /** Segment non obligatoire (liberté de rythme). */
  optional?: boolean;
}

export interface CompositeDefinition extends ToolMeta {
  engine: "composite";
  /** Moteur dominant — pour le classement dans le catalogue. */
  dominant: "wizard" | "worksheet";
  intro: ContentBlock[];
  segments: CompositeSegment[];
}

/** État runtime : un état par segment, indexé par segmentId. */
export interface CompositeState {
  segments: Record<string, ScoredState | WizardState | WorksheetState>;
}
