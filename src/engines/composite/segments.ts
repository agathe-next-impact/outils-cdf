import type { CompositeDefinition, CompositeSegment } from "./types";
import type { ScoredDefinition, ScoredState } from "../scored/types";
import type { WizardDefinition, WizardState } from "../wizard/types";
import type { WorksheetDefinition, WorksheetState } from "../worksheet/types";

export type SegmentDefinition = ScoredDefinition | WizardDefinition | WorksheetDefinition;

/** Clé de stockage d'un segment (slice indépendant réutilisant les runners). */
export function segmentSlug(parentSlug: string, segmentId: string): string {
  return `${parentSlug}::${segmentId}`;
}

/** Construit une définition complète à partir d'un segment (corps + méta héritée). */
export function buildSegmentDefinition(
  parent: CompositeDefinition,
  seg: CompositeSegment
): SegmentDefinition {
  const meta = {
    slug: segmentSlug(parent.slug, seg.id),
    title: seg.title,
    category: parent.category,
    iconName: seg.iconName ?? parent.iconName,
    accent: parent.accent,
    summary: seg.summary ?? "",
    sensitivity: parent.sensitivity,
    sourceCredit: parent.sourceCredit,
    disclaimerKey: parent.disclaimerKey,
    crisisLevel: parent.crisisLevel,
  };
  const ref = seg.ref;
  if (ref.engine === "scored") return { ...meta, engine: "scored", ...ref.body };
  if (ref.engine === "wizard") return { ...meta, engine: "wizard", ...ref.body };
  return { ...meta, engine: "worksheet", ...ref.body };
}

/** Indique si un segment est « terminé » (pour le déblocage du suivant). */
export function isSegmentDone(seg: CompositeSegment, state: unknown): boolean {
  if (!state || typeof state !== "object") return false;
  if (seg.ref.engine === "scored") return (state as ScoredState).submitted === true;
  if (seg.ref.engine === "wizard") return (state as WizardState).completed === true;
  const ws = state as WorksheetState;
  return (
    Object.keys(ws.values ?? {}).length > 0 || Object.keys(ws.tables ?? {}).length > 0
  );
}
