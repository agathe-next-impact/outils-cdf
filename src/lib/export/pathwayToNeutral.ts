/**
 * Export d'un parcours par objectif vers le format pivot : l'objectif écrit par
 * la personne + l'itinéraire d'étapes avec leur statut. Fonction pure, utilisable
 * côté client (aucune dépendance au registre).
 */
import type { NeutralBlock, NeutralDocument, NeutralSection } from "./neutralDocument";
import { getDisclaimer } from "@/content/disclaimers";
import { nowIso } from "../format";
import { STATUS_LABEL, type StepStatus } from "../pathwayTypes";

export interface PathwayExportStep {
  label: string;
  toolTitle: string;
  why: string;
  optional: boolean;
  status: StepStatus;
}

export function pathwayToNeutral(args: {
  id: string;
  goal: string;
  objectif?: string;
  signe?: string;
  steps: PathwayExportStep[];
}): NeutralDocument {
  const sections: NeutralSection[] = [];

  const objectif = (args.objectif ?? "").trim();
  const signe = (args.signe ?? "").trim();
  const objBlocks: NeutralBlock[] = [
    { kind: "kv", pairs: [{ label: "Objectif visé", value: objectif || args.goal }] },
  ];
  if (signe) {
    objBlocks.push({ kind: "kv", pairs: [{ label: "Ce qui me dirait que j'avance", value: signe }] });
  }
  sections.push({ heading: "Mon objectif", blocks: objBlocks });

  sections.push({
    heading: "Mon itinéraire",
    blocks: [
      {
        kind: "table",
        columns: ["Étape", "Statut", "Pourquoi"],
        rows: args.steps.map((s) => [
          `${s.label}${s.label !== s.toolTitle ? ` — ${s.toolTitle}` : ""}${s.optional ? " (facultatif)" : ""}`,
          STATUS_LABEL[s.status],
          s.why,
        ]),
      },
    ],
  });

  return {
    toolSlug: `parcours:${args.id}`,
    toolTitle: `Parcours — ${args.goal}`,
    generatedAt: nowIso(),
    disclaimer: getDisclaimer("retablissement").short,
    sections,
  };
}
