import type { CompositeDefinition } from "@/engines/composite/types";
import { buildSegmentDefinition } from "@/engines/composite/segments";
import type { ScoredState } from "@/engines/scored/types";
import type { WizardState } from "@/engines/wizard/types";
import type { WorksheetState } from "@/engines/worksheet/types";
import { scoredToNeutral } from "./scoredToNeutral";
import { wizardToNeutral } from "./wizardToNeutral";
import { worksheetToNeutral } from "./worksheetToNeutral";
import type { NeutralBlock, NeutralDocument, NeutralSection } from "./neutralDocument";
import { getDisclaimer } from "@/content/disclaimers";
import { nowIso } from "../format";

/** `getState(segmentId)` fournit l'état runtime de chaque segment (lu en session). */
export function compositeToNeutral(
  def: CompositeDefinition,
  getState: (segmentId: string) => unknown
): NeutralDocument {
  const sections: NeutralSection[] = [];

  for (const seg of def.segments) {
    const segDef = buildSegmentDefinition(def, seg);
    const state = getState(seg.id);
    if (!state) continue;

    let subDoc: NeutralDocument;
    if (segDef.engine === "scored") {
      subDoc = scoredToNeutral(segDef, state as ScoredState);
    } else if (segDef.engine === "wizard") {
      subDoc = wizardToNeutral(segDef, state as WizardState);
    } else {
      subDoc = worksheetToNeutral(segDef, state as WorksheetState);
    }

    if (subDoc.sections.length === 0) continue;

    const blocks: NeutralBlock[] = [];
    for (const sub of subDoc.sections) {
      blocks.push({ kind: "heading", level: 2, text: sub.heading });
      blocks.push(...sub.blocks);
    }
    sections.push({ heading: seg.title, blocks });
  }

  return {
    toolSlug: def.slug,
    toolTitle: def.title,
    generatedAt: nowIso(),
    disclaimer: getDisclaimer(def.disclaimerKey).short,
    sections,
  };
}
