"use client";

import { useState } from "react";
import type { FieldDef } from "@/engines/fields";
import type { FieldValue, RepeatRow, Scalar } from "@/engines/types";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import { newId } from "@/lib/format";

const inputBase = `w-full border border-black bg-white px-4 py-3 font-medium placeholder:text-black/40 ${FOCUS_RING}`;

function asString(v: FieldValue | undefined): string {
  return typeof v === "string" ? v : "";
}
function asNumber(v: FieldValue | undefined): number | null {
  return typeof v === "number" ? v : null;
}
function asBool(v: FieldValue | undefined): boolean {
  return v === true;
}
function asStringArray(v: FieldValue | undefined): string[] {
  return Array.isArray(v) ? (v.filter((x) => typeof x === "string") as string[]) : [];
}
function asRows(v: FieldValue | undefined): RepeatRow[] {
  return Array.isArray(v)
    ? (v.filter((x) => typeof x === "object" && x !== null) as RepeatRow[])
    : [];
}

interface FieldRendererProps {
  field: FieldDef;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
}

export function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  const [tagDraft, setTagDraft] = useState("");
  const optionalMark = field.optional ? (
    <span className="font-normal text-black/50"> (facultatif)</span>
  ) : null;

  // --- Champs à contrôle unique (label htmlFor) ---
  if (
    field.type === "shortText" ||
    field.type === "longText" ||
    field.type === "number" ||
    field.type === "date" ||
    field.type === "time" ||
    field.type === "select"
  ) {
    return (
      <div>
        <label htmlFor={field.id} className="mb-1 block text-sm font-semibold">
          {field.label}
          {optionalMark}
        </label>
        {field.help ? <p className="mb-2 text-xs text-black/60">{field.help}</p> : null}
        {field.type === "longText" ? (
          <textarea
            id={field.id}
            className={inputBase}
            rows={4}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            value={asString(value)}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : field.type === "select" ? (
          <select
            id={field.id}
            className={inputBase}
            value={asString(value)}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">— Choisir —</option>
            {(field.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : field.type === "number" ? (
          <input
            id={field.id}
            type="number"
            className={inputBase}
            min={field.min}
            max={field.max}
            step={field.step}
            placeholder={field.placeholder}
            value={asNumber(value) ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        ) : (
          <input
            id={field.id}
            type={field.type === "date" ? "date" : field.type === "time" ? "time" : "text"}
            className={inputBase}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            value={asString(value)}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    );
  }

  // --- Checkbox ---
  if (field.type === "checkbox") {
    return (
      <div>
        <label className="flex items-start gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            className={`mt-0.5 h-5 w-5 border border-black ${FOCUS_RING}`}
            checked={asBool(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>
            {field.label}
            {optionalMark}
          </span>
        </label>
        {field.help ? <p className="mt-1 text-xs text-black/60">{field.help}</p> : null}
      </div>
    );
  }

  // --- Slider ---
  if (field.type === "slider") {
    const min = field.min ?? 0;
    const max = field.max ?? 100;
    const current = asNumber(value);
    return (
      <fieldset>
        <legend className="mb-1 text-sm font-semibold">
          {field.label}
          {optionalMark}
        </legend>
        {field.help ? <p className="mb-2 text-xs text-black/60">{field.help}</p> : null}
        <div className="flex items-center gap-3">
          <input
            type="range"
            className={`w-full accent-blue ${FOCUS_RING}`}
            min={min}
            max={max}
            step={field.step ?? 1}
            value={current ?? min}
            aria-valuetext={`${current ?? min}`}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          <span className="min-w-[3ch] text-right font-black tabular-nums">{current ?? "—"}</span>
        </div>
        {field.minLabel || field.maxLabel ? (
          <div className="mt-1 flex justify-between text-xs text-black/60">
            <span>{field.minLabel}</span>
            <span>{field.maxLabel}</span>
          </div>
        ) : null}
      </fieldset>
    );
  }

  // --- multiSelect (choix multiples par chips) ---
  if (field.type === "multiSelect") {
    const selected = asStringArray(value);
    const toggle = (v: string) =>
      onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
    return (
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          {field.label}
          {optionalMark}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(field.options ?? []).map((o) => {
            const on = selected.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(o.value)}
                className={`border px-3 py-1 text-sm font-semibold ${FOCUS_RING} ${
                  on ? "border-blue bg-blue text-white" : "border-black hover:border-blue"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  // --- tagList (étiquettes libres) ---
  if (field.type === "tagList") {
    const tags = asStringArray(value);
    const add = () => {
      const t = tagDraft.trim();
      if (t && !tags.includes(t)) onChange([...tags, t]);
      setTagDraft("");
    };
    return (
      <fieldset>
        <legend className="mb-1 text-sm font-semibold">
          {field.label}
          {optionalMark}
        </legend>
        {field.help ? <p className="mb-2 text-xs text-black/60">{field.help}</p> : null}
        <div className="flex gap-2">
          <input
            type="text"
            className={inputBase}
            placeholder={field.placeholder ?? "Ajouter…"}
            value={tagDraft}
            onChange={(e) => setTagDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
          <button
            type="button"
            className={`shrink-0 border border-black px-3 ${FOCUS_RING}`}
            onClick={add}
            aria-label="Ajouter"
          >
            <GameIcon name="plus" size={18} />
          </button>
        </div>
        {tags.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li
                key={t}
                className="flex items-center gap-1 border border-blue px-2 py-1 text-sm"
              >
                {t}
                <button
                  type="button"
                  onClick={() => onChange(tags.filter((x) => x !== t))}
                  aria-label={`Retirer ${t}`}
                  className={FOCUS_RING}
                >
                  <GameIcon name="x" size={14} className="text-red" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </fieldset>
    );
  }

  // --- repeatableList (lignes répétables) ---
  if (field.type === "repeatableList") {
    const rows = asRows(value);
    const schema = field.itemSchema ?? [];
    const addRow = () => {
      const row: RepeatRow = { _id: newId() };
      onChange([...rows, row]);
    };
    const updateRow = (id: Scalar, colId: string, v: FieldValue) => {
      onChange(
        rows.map((r) =>
          r["_id"] === id ? { ...r, [colId]: (typeof v === "object" ? "" : v) as Scalar } : r
        )
      );
    };
    const removeRow = (id: Scalar) => onChange(rows.filter((r) => r["_id"] !== id));

    return (
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">
          {field.label}
          {optionalMark}
        </legend>
        {field.help ? <p className="mb-2 text-xs text-black/60">{field.help}</p> : null}
        <div className="space-y-3">
          {rows.map((row, ri) => (
            <div key={String(row["_id"] ?? ri)} className="border border-black p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-blue">
                  #{ri + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeRow(row["_id"] ?? null)}
                  className={`text-red hover:underline ${FOCUS_RING}`}
                  aria-label={`Supprimer la ligne ${ri + 1}`}
                >
                  <GameIcon name="trash-2" size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {schema.map((col) => (
                  <FieldRenderer
                    key={col.id}
                    field={col}
                    value={row[col.id]}
                    onChange={(v) => updateRow(row["_id"] ?? null, col.id, v)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className={`mt-3 flex items-center gap-2 border border-black px-3 py-2 text-sm font-bold ${FOCUS_RING}`}
        >
          <GameIcon name="plus" size={16} />
          {field.addLabel ?? "Ajouter"}
        </button>
      </fieldset>
    );
  }

  return null;
}
