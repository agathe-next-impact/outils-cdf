import type { NeutralBlock, NeutralDocument } from "./neutralDocument";
import { formatDateFr } from "../format";

function escapeCell(s: string): string {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function blockToMarkdown(block: NeutralBlock): string {
  switch (block.kind) {
    case "heading":
      return `${"#".repeat(block.level)} ${block.text}`;
    case "text":
      return block.text;
    case "kv":
      return block.pairs
        .map((p) => `- **${p.label}** : ${p.value || "—"}`)
        .join("\n");
    case "scale":
      return `- **${block.label}** : ${block.value} / ${block.max}`;
    case "score": {
      const lines = [`- **${block.label}** : ${block.value} / ${block.max}`];
      if (block.band) lines.push(`  - Repère : ${block.band}`);
      if (block.guidance) lines.push(`  - ${block.guidance}`);
      return lines.join("\n");
    }
    case "list":
      return block.items
        .map((it, i) => (block.ordered ? `${i + 1}. ${it}` : `- ${it}`))
        .join("\n");
    case "table": {
      if (block.rows.length === 0) return "_(aucune entrée)_";
      const header = `| ${block.columns.map(escapeCell).join(" | ")} |`;
      const sep = `| ${block.columns.map(() => "---").join(" | ")} |`;
      const rows = block.rows
        .map((r) => `| ${r.map((c) => escapeCell(c || "—")).join(" | ")} |`)
        .join("\n");
      return [header, sep, rows].join("\n");
    }
  }
}

export function toMarkdown(doc: NeutralDocument): string {
  const parts: string[] = [];
  parts.push(`# ${doc.toolTitle}`);
  parts.push(`_Exporté le ${formatDateFr(doc.generatedAt)}_`);
  parts.push(`> ${doc.disclaimer}`);
  for (const section of doc.sections) {
    parts.push(`## ${section.heading}`);
    for (const block of section.blocks) {
      parts.push(blockToMarkdown(block));
    }
  }
  return parts.join("\n\n") + "\n";
}
