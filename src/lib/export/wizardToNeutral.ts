import type { WizardDefinition, WizardState } from "@/engines/wizard/types";
import { visibleSteps } from "@/engines/wizard/visibility";
import { fieldsToBlocks } from "./fieldBlocks";
import type { NeutralDocument, NeutralSection } from "./neutralDocument";
import { getDisclaimer } from "@/content/disclaimers";
import { nowIso } from "../format";

export function wizardToNeutral(def: WizardDefinition, state: WizardState): NeutralDocument {
  const steps = visibleSteps(def.steps, state.values);
  const sections: NeutralSection[] = steps
    .map((step) => ({
      heading: step.title,
      blocks: fieldsToBlocks(step.fields, state.values),
    }))
    .filter((s) => s.blocks.length > 0);

  return {
    toolSlug: def.slug,
    toolTitle: def.title,
    generatedAt: nowIso(),
    disclaimer: getDisclaimer(def.disclaimerKey).short,
    sections,
  };
}
