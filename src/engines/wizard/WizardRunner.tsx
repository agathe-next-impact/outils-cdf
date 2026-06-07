"use client";

import { useMemo } from "react";
import type { WizardDefinition, WizardState } from "./types";
import type { FieldValue } from "../types";
import { visibleSteps } from "./visibility";
import { detectPitfalls } from "./pitfalls";
import { PitfallHint } from "./PitfallHint";
import { WizardSummary } from "./WizardSummary";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { FieldRenderer } from "@/components/form/FieldRenderer";
import { ProgressBar } from "@/components/form/ProgressBar";
import { ResetButton } from "@/components/safety/ResetButton";
import { useToolSlice } from "@/store/useToolState";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import { clamp } from "@/lib/format";

const INITIAL: WizardState = { values: {}, currentStep: 0, completed: false };

export function WizardRunner({ definition }: { definition: WizardDefinition }) {
  const [stored, setStored] = useToolSlice<WizardState>(definition.slug);
  const state = stored ?? INITIAL;
  const steps = useMemo(
    () => visibleSteps(definition.steps, state.values),
    [definition, state.values]
  );
  const total = steps.length;
  const index = clamp(state.currentStep, 0, Math.max(0, total - 1));
  const step = steps[index];

  if (state.completed) {
    return (
      <WizardSummary
        definition={definition}
        state={state}
        onEdit={() => setStored({ ...state, completed: false })}
        onRestart={() => setStored({ values: {}, currentStep: 0, completed: false })}
      />
    );
  }
  if (!step) return null;

  const setValue = (fieldId: string, v: FieldValue) =>
    setStored({ ...state, values: { ...state.values, [fieldId]: v } });
  const goTo = (i: number) => setStored({ ...state, currentStep: clamp(i, 0, total - 1) });
  const next = () =>
    index >= total - 1 ? setStored({ ...state, completed: true }) : goTo(index + 1);
  const prev = () => goTo(index - 1);

  const hits = detectPitfalls(step.pitfalls, state.values);

  return (
    <div className="space-y-6">
      {index === 0 ? (
        <ContentRenderer blocks={definition.intro} className="card border border-blue" />
      ) : null}

      <ProgressBar value={index + 1} max={total} label={`Étape ${index + 1} sur ${total}`} />

      <section key={step.id} className="card animate-slide-up border border-black">
        <h2 className="mb-1 text-xl font-black uppercase">{step.title}</h2>
        {step.intro ? <ContentRenderer blocks={step.intro} className="mb-4" /> : null}
        <div className="space-y-5">
          {step.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={state.values[field.id]}
              onChange={(v) => setValue(field.id, v)}
            />
          ))}
        </div>
        {hits.length > 0 ? (
          <div className="mt-4">
            <PitfallHint hits={hits} />
          </div>
        ) : null}
      </section>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className={`flex items-center gap-1 border border-black px-4 py-2 ${FOCUS_RING} ${index === 0 ? "opacity-0 pointer-events-none" : ""}`}
          onClick={prev}
          disabled={index === 0}
        >
          <GameIcon name="arrow-left" size={16} /> Précédent
        </button>
        <button type="button" className="btn-primary flex items-center gap-2" onClick={next}>
          {index >= total - 1 ? "Terminer" : "Suivant"}
          <GameIcon name={index >= total - 1 ? "check" : "arrow-right"} size={18} />
        </button>
      </div>

      <ResetButton slug={definition.slug} />
    </div>
  );
}
