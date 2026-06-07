"use client";

import { useMemo } from "react";
import type { WorksheetDefinition, WorksheetState } from "./types";
import type { FieldValue, RepeatRow } from "../types";
import { asRows } from "./ops";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { Celebration } from "@/components/feedback/Celebration";
import { FieldRenderer } from "@/components/form/FieldRenderer";
import { RepeatableTable } from "@/components/form/RepeatableTable";
import { NeutralView } from "@/components/content/NeutralView";
import { ExportBar } from "@/components/safety/ExportBar";
import { ResetButton } from "@/components/safety/ResetButton";
import { worksheetToNeutral } from "@/lib/export/worksheetToNeutral";
import { useToolSlice } from "@/store/useToolState";

const INITIAL: WorksheetState = { values: {}, tables: {} };

export function WorksheetEditor({ definition }: { definition: WorksheetDefinition }) {
  const [stored, setStored] = useToolSlice<WorksheetState>(definition.slug);
  const state = stored ?? INITIAL;

  const setValue = (id: string, v: FieldValue) =>
    setStored({ ...state, values: { ...state.values, [id]: v } });
  const setTable = (id: string, rows: RepeatRow[]) =>
    setStored({ ...state, tables: { ...state.tables, [id]: rows } });

  const doc = useMemo(() => worksheetToNeutral(definition, state), [definition, state]);

  return (
    <div className="space-y-6">
      <ContentRenderer blocks={definition.intro} className="card border border-blue" />

      {definition.sections.map((section) => (
        <section key={section.id} className="card">
          <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
          {section.intro ? <ContentRenderer blocks={section.intro} className="mb-3" /> : null}
          <div className="space-y-5">
            {(section.fields ?? []).map((f) => (
              <FieldRenderer
                key={f.id}
                field={f}
                value={state.values[f.id]}
                onChange={(v) => setValue(f.id, v)}
              />
            ))}
            {(section.tables ?? []).map((t) => (
              <RepeatableTable
                key={t.id}
                table={t}
                rows={asRows(state.tables[t.id])}
                onChange={(rows) => setTable(t.id, rows)}
              />
            ))}
          </div>
        </section>
      ))}

      <Celebration
        title="Votre carnet"
        message="Ce carnet vous appartient. Quand vous le souhaitez, exportez-le ci-dessous pour en garder une trace."
        accent="yellow"
        iconName="heart"
      />

      <ExportBar
        slug={definition.slug}
        build={() => ({ doc: worksheetToNeutral(definition, state), raw: state })}
      />

      <details className="card">
        <summary className="cursor-pointer font-semibold">Aperçu du document</summary>
        <div className="mt-4">
          <NeutralView doc={doc} />
        </div>
      </details>

      <ResetButton slug={definition.slug} />
    </div>
  );
}
