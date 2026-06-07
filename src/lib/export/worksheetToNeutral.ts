import type { WorksheetDefinition, WorksheetState } from "@/engines/worksheet/types";
import { sortRows, asRows } from "@/engines/worksheet/ops";
import { fieldsToBlocks, formatCell } from "./fieldBlocks";
import type { NeutralBlock, NeutralDocument, NeutralSection } from "./neutralDocument";
import { getDisclaimer } from "@/content/disclaimers";
import { nowIso, formatDateShortFr } from "../format";

export function worksheetToNeutral(
  def: WorksheetDefinition,
  state: WorksheetState
): NeutralDocument {
  const sections: NeutralSection[] = [];

  for (const section of def.sections) {
    const blocks: NeutralBlock[] = [];

    if (section.fields && section.fields.length > 0) {
      blocks.push(...fieldsToBlocks(section.fields, state.values));
    }

    for (const table of section.tables ?? []) {
      const rows = sortRows(asRows(state.tables[table.id]), table.sortable);
      if (rows.length === 0) continue;
      const tsCols = table.timestamped ? ["Enregistré le"] : [];
      blocks.push({ kind: "heading", level: 3, text: table.label });
      blocks.push({
        kind: "table",
        columns: [...tsCols, ...table.columns.map((c) => c.label)],
        rows: rows.map((r) => {
          const ts = table.timestamped
            ? [typeof r["_createdAt"] === "string" ? formatDateShortFr(r["_createdAt"]) : "—"]
            : [];
          return [...ts, ...table.columns.map((c) => formatCell(c, r[c.id]))];
        }),
      });
    }

    if (blocks.length > 0) sections.push({ heading: section.title, blocks });
  }

  return {
    toolSlug: def.slug,
    toolTitle: def.title,
    generatedAt: nowIso(),
    disclaimer: getDisclaimer(def.disclaimerKey).short,
    sections,
  };
}
