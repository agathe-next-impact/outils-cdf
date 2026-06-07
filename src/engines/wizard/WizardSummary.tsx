"use client";

import { useMemo } from "react";
import { Celebration } from "@/components/feedback/Celebration";
import { NeutralView } from "@/components/content/NeutralView";
import { ExportBar } from "@/components/safety/ExportBar";
import { ResetButton } from "@/components/safety/ResetButton";
import { wizardToNeutral } from "@/lib/export/wizardToNeutral";
import type { WizardDefinition, WizardState } from "./types";

interface WizardSummaryProps {
  definition: WizardDefinition;
  state: WizardState;
  onEdit: () => void;
  onRestart: () => void;
}

export function WizardSummary({ definition, state, onEdit, onRestart }: WizardSummaryProps) {
  const doc = useMemo(() => wizardToNeutral(definition, state), [definition, state]);
  const reward = definition.reward;

  return (
    <div className="space-y-6">
      <Celebration
        title="Synthèse"
        message={
          reward?.message ??
          "Voici la synthèse de votre travail. Vous pouvez l'exporter pour la garder."
        }
        confetti={!!reward?.confetti}
        accent="blue"
      />

      <NeutralView doc={doc} />

      <ExportBar
        slug={definition.slug}
        build={() => ({ doc: wizardToNeutral(definition, state), raw: state })}
      />

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={onEdit}>
          Modifier mes réponses
        </button>
        <button type="button" className="btn-secondary" onClick={onRestart}>
          Recommencer
        </button>
        <ResetButton slug={definition.slug} />
      </div>
    </div>
  );
}
