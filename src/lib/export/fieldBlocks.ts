import type { FieldDef } from "@/engines/fields";
import type { FieldValue, RepeatRow, Scalar } from "@/engines/types";
import type { NeutralBlock } from "./neutralDocument";

function optionLabel(field: FieldDef, val: Scalar): string {
  return field.options?.find((o) => String(o.value) === String(val))?.label ?? String(val);
}

export function formatCell(col: FieldDef, val: Scalar | undefined): string {
  if (val === undefined || val === null || val === "") return "";
  if (col.type === "select") return optionLabel(col, val);
  if (col.type === "checkbox") return val === true ? "Oui" : "Non";
  return String(val);
}

/** Convertit un ensemble de champs + valeurs en blocs neutres pour l'export. */
export function fieldsToBlocks(
  fields: FieldDef[],
  values: Record<string, FieldValue>
): NeutralBlock[] {
  const blocks: NeutralBlock[] = [];
  const pairs: { label: string; value: string }[] = [];

  for (const field of fields) {
    const v = values[field.id];
    switch (field.type) {
      case "multiSelect": {
        const arr = Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
        if (arr.length) {
          blocks.push({ kind: "heading", level: 3, text: field.label });
          blocks.push({ kind: "list", items: arr.map((x) => optionLabel(field, x)) });
        }
        break;
      }
      case "tagList": {
        const arr = Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
        if (arr.length) {
          blocks.push({ kind: "heading", level: 3, text: field.label });
          blocks.push({ kind: "list", items: arr });
        }
        break;
      }
      case "repeatableList": {
        const rows = Array.isArray(v)
          ? (v.filter((x) => typeof x === "object" && x !== null) as RepeatRow[])
          : [];
        const schema = field.itemSchema ?? [];
        if (rows.length) {
          blocks.push({ kind: "heading", level: 3, text: field.label });
          blocks.push({
            kind: "table",
            columns: schema.map((c) => c.label),
            rows: rows.map((r) => schema.map((c) => formatCell(c, r[c.id]))),
          });
        }
        break;
      }
      case "checkbox":
        if (v === true) pairs.push({ label: field.label, value: "Oui" });
        break;
      case "select": {
        const s = typeof v === "string" ? v : "";
        if (s) pairs.push({ label: field.label, value: optionLabel(field, s) });
        break;
      }
      case "slider":
        if (typeof v === "number") {
          pairs.push({
            label: field.label,
            value: field.max !== undefined ? `${v} / ${field.max}` : String(v),
          });
        }
        break;
      case "number":
        if (typeof v === "number") pairs.push({ label: field.label, value: String(v) });
        break;
      default: {
        const s = typeof v === "string" ? v.trim() : "";
        if (s) pairs.push({ label: field.label, value: s });
      }
    }
  }

  if (pairs.length) blocks.unshift({ kind: "kv", pairs });
  return blocks;
}
