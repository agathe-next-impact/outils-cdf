import type { FieldValue, RepeatRow, Scalar } from "../types";
import type { RepeatableTableDef } from "./types";

export function asRows(v: FieldValue | RepeatRow[] | undefined): RepeatRow[] {
  return Array.isArray(v)
    ? (v.filter((x) => typeof x === "object" && x !== null) as RepeatRow[])
    : [];
}

function toNumber(v: Scalar | undefined): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

function compareScalar(
  a: Scalar | undefined,
  b: Scalar | undefined,
  direction: "asc" | "desc"
): number {
  const an = toNumber(a);
  const bn = toNumber(b);
  let r: number;
  if (an !== null && bn !== null) {
    r = an - bn;
  } else {
    r = String(a ?? "").localeCompare(String(b ?? ""), "fr");
  }
  return direction === "desc" ? -r : r;
}

/** Trie une copie des lignes selon la config (sans muter l'entrée). */
export function sortRows(
  rows: RepeatRow[],
  sortable?: RepeatableTableDef["sortable"]
): RepeatRow[] {
  if (!sortable) return rows;
  const { byColumnId, direction } = sortable;
  return [...rows].sort((a, b) => compareScalar(a[byColumnId], b[byColumnId], direction));
}

/** Construit une nouvelle ligne (avec horodatage si la table est horodatée). */
export function newRow(
  table: RepeatableTableDef,
  id: string,
  createdAtIso: string
): RepeatRow {
  const row: RepeatRow = { _id: id };
  if (table.timestamped) row["_createdAt"] = createdAtIso;
  return row;
}
