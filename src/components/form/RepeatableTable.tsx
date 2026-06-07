"use client";

import type { RepeatableTableDef } from "@/engines/worksheet/types";
import type { FieldValue, RepeatRow, Scalar } from "@/engines/types";
import { FieldRenderer } from "./FieldRenderer";
import { sortRows, newRow } from "@/engines/worksheet/ops";
import { newId, nowIso, formatDateShortFr } from "@/lib/format";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

function coerce(v: FieldValue): Scalar {
  if (Array.isArray(v)) return v.map((x) => (typeof x === "string" ? x : "")).join(", ");
  if (typeof v === "object" && v !== null) return "";
  return v;
}

interface RepeatableTableProps {
  table: RepeatableTableDef;
  rows: RepeatRow[];
  onChange: (rows: RepeatRow[]) => void;
}

export function RepeatableTable({ table, rows, onChange }: RepeatableTableProps) {
  const display = sortRows(rows, table.sortable);

  const add = () => onChange([...rows, newRow(table, newId(), nowIso())]);
  const update = (id: Scalar, colId: string, v: FieldValue) =>
    onChange(rows.map((r) => (r["_id"] === id ? { ...r, [colId]: coerce(v) } : r)));
  const remove = (id: Scalar) => onChange(rows.filter((r) => r["_id"] !== id));

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{table.label}</legend>

      {display.length === 0 ? (
        <p className="mb-2 text-sm text-muted">{table.emptyLabel ?? "Aucune entrée pour l'instant."}</p>
      ) : (
        <div className="space-y-3">
          {display.map((row, ri) => {
            const id = row["_id"] ?? null;
            const createdAt = row["_createdAt"];
            return (
              <div key={String(id ?? ri)} className="border border-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wide text-muted">
                    {table.timestamped && typeof createdAt === "string"
                      ? formatDateShortFr(createdAt)
                      : `#${ri + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    className={`text-red hover:underline ${FOCUS_RING}`}
                    aria-label={`Supprimer l'entrée ${ri + 1}`}
                  >
                    <GameIcon name="trash-2" size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {table.columns.map((col) => (
                    <FieldRenderer
                      key={col.id}
                      field={col}
                      value={row[col.id]}
                      onChange={(v) => update(id, col.id, v)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={add}
        className={`mt-3 flex items-center gap-2 border border-border px-3 py-2 text-sm font-semibold ${FOCUS_RING}`}
      >
        <GameIcon name="plus" size={16} />
        {table.addLabel}
      </button>
    </fieldset>
  );
}
