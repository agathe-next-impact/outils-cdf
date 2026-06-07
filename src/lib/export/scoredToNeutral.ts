import type { ScoredDefinition, ScoredState } from "@/engines/scored/types";
import { computeScore, maxSum } from "@/engines/scored/score";
import type { NeutralBlock, NeutralDocument, NeutralSection } from "./neutralDocument";
import { getDisclaimer } from "@/content/disclaimers";
import { nowIso } from "../format";

export function scoredToNeutral(def: ScoredDefinition, state: ScoredState): NeutralDocument {
  const result = computeScore(def, state.responses);
  const scaleById = new Map(def.scales.map((s) => [s.id, s]));

  const resultBlocks: NeutralBlock[] = [
    {
      kind: "score",
      label: "Score total",
      value: result.sum,
      max: maxSum(def),
      band: result.band?.label,
      guidance: result.band?.guidance,
    },
  ];
  if (def.scoring.showMeanAndPercent) {
    if (result.mean !== null) {
      resultBlocks.push({ kind: "text", text: `Moyenne : ${result.mean.toFixed(2)}` });
    }
    if (result.percent !== null) {
      resultBlocks.push({ kind: "text", text: `Position : ${Math.round(result.percent)} %` });
    }
  }
  if (!result.complete) {
    resultBlocks.push({
      kind: "text",
      text: `Questionnaire partiellement rempli (${result.answered}/${result.totalItems} affirmations).`,
    });
  }
  if (result.subscores.length > 0) {
    resultBlocks.push({ kind: "heading", level: 3, text: "Repères par dimension (exploratoires)" });
    resultBlocks.push({
      kind: "table",
      columns: ["Dimension", "Score", "Répondu"],
      rows: result.subscores.map((s) => [
        s.official ? s.label : `${s.label} (exploratoire)`,
        `${s.sum} / ${s.max}`,
        `${s.count}/${s.total}`,
      ]),
    });
  }

  const responseRows: string[][] = def.items.map((item) => {
    const scale = scaleById.get(item.scaleId);
    const raw = state.responses[item.id];
    const label =
      raw === undefined || raw === null
        ? "—"
        : (scale?.options.find((o) => o.value === raw)?.label ?? String(raw));
    return [item.label, label];
  });

  const sections: NeutralSection[] = [
    { heading: "Résultat", blocks: resultBlocks },
    {
      heading: "Vos réponses",
      blocks: [{ kind: "table", columns: ["Affirmation", "Réponse"], rows: responseRows }],
    },
  ];

  return {
    toolSlug: def.slug,
    toolTitle: def.title,
    generatedAt: nowIso(),
    disclaimer: getDisclaimer(def.disclaimerKey).short,
    sections,
  };
}
