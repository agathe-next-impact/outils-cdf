import type { FieldValue } from "../types";
import type { WizardStep } from "./types";

export function isStepVisible(
  step: WizardStep,
  values: Record<string, FieldValue>
): boolean {
  if (!step.visibleWhen) return true;
  return values[step.visibleWhen.fieldId] === step.visibleWhen.equals;
}

export function visibleSteps(
  steps: WizardStep[],
  values: Record<string, FieldValue>
): WizardStep[] {
  return steps.filter((s) => isStepVisible(s, values));
}
