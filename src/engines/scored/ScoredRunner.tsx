"use client";

import { useMemo } from "react";
import type { ScoredDefinition, ScoredItem, ScoredState } from "./types";
import { computeScore } from "./score";
import { ScoredResult } from "./ScoredResult";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { RadioScale } from "@/components/form/RadioScale";
import { ProgressBar } from "@/components/form/ProgressBar";
import { ExportBar } from "@/components/safety/ExportBar";
import { ResetButton } from "@/components/safety/ResetButton";
import { scoredToNeutral } from "@/lib/export/scoredToNeutral";
import { useToolSlice } from "@/store/useToolState";

const INITIAL: ScoredState = { responses: {}, submitted: false };

interface ItemGroup {
  key: string;
  label?: string;
  items: ScoredItem[];
}

function groupItems(items: ScoredItem[]): ItemGroup[] {
  const groups: ItemGroup[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.label === item.group) {
      last.items.push(item);
    } else {
      groups.push({ key: item.group ?? `g${groups.length}`, label: item.group, items: [item] });
    }
  }
  return groups;
}

export function ScoredRunner({ definition }: { definition: ScoredDefinition }) {
  const [stored, setStored] = useToolSlice<ScoredState>(definition.slug);
  const state = stored ?? INITIAL;
  const scaleById = useMemo(
    () => new Map(definition.scales.map((s) => [s.id, s])),
    [definition]
  );
  const groups = useMemo(() => groupItems(definition.items), [definition]);
  const result = computeScore(definition, state.responses);

  const setResponse = (itemId: string, value: number) =>
    setStored({ ...state, responses: { ...state.responses, [itemId]: value } });
  const submit = () => setStored({ ...state, submitted: true });
  const restart = () => setStored({ responses: {}, submitted: false });

  if (state.submitted) {
    return (
      <div className="space-y-6">
        <ScoredResult body={definition} result={result} />
        <ExportBar
          slug={definition.slug}
          build={() => ({ doc: scoredToNeutral(definition, state), raw: state })}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn-primary" onClick={restart}>
            Recommencer
          </button>
          <ResetButton slug={definition.slug} />
        </div>
      </div>
    );
  }

  const canSubmit = definition.allowIncomplete || result.complete;

  return (
    <div className="space-y-6">
      <ContentRenderer blocks={definition.intro} className="card border border-blue" />

      {definition.referencePeriod ? (
        <p className="text-sm font-bold uppercase tracking-wide text-blue">
          {definition.referencePeriod}
        </p>
      ) : null}

      <div className="sticky top-14 z-10 bg-white py-2">
        <ProgressBar value={result.answered} max={result.totalItems} label="Progression" />
      </div>

      {groups.map((group) => (
        <fieldset key={group.key} className="card border border-black">
          {group.label ? (
            <legend className="px-1 text-lg font-black uppercase">{group.label}</legend>
          ) : null}
          <ol className="space-y-5">
            {group.items.map((item, idx) => {
              const scale = scaleById.get(item.scaleId);
              if (!scale) return null;
              return (
                <li
                  key={item.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${Math.min(idx, 10) * 0.03}s` }}
                >
                  <p className="mb-2 font-semibold">
                    {item.label}
                    {item.optional ? (
                      <span className="text-black/50"> (facultatif)</span>
                    ) : null}
                  </p>
                  <RadioScale
                    name={item.id}
                    scale={scale}
                    value={state.responses[item.id] ?? null}
                    onChange={(v) => setResponse(item.id, v)}
                    ariaLabel={item.label}
                  />
                </li>
              );
            })}
          </ol>
        </fieldset>
      ))}

      <div className="flex flex-col gap-3">
        {!canSubmit ? (
          <p className="text-sm text-black/60">
            Répondez à toutes les affirmations pour voir votre résultat ({result.answered}/
            {result.totalItems}).
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn-primary" onClick={submit} disabled={!canSubmit}>
            Voir mon résultat
          </button>
          <ResetButton slug={definition.slug} label="Effacer" />
        </div>
      </div>
    </div>
  );
}
