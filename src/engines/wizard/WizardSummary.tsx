"use client";

import { useMemo } from "react";
import Confetti from "@/components/Confetti";
import GameIcon from "@/components/GameIcon";
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
      {reward?.confetti ? <Confetti /> : null}
      <div className="card animate-bounce-in border border-blue">
        <div className="mb-2 flex items-center gap-2">
          <GameIcon name="party-popper" size={24} className="text-red" />
          <h2 className="text-xl font-black uppercase">Synthèse</h2>
        </div>
        <p>{reward?.message ?? "Voici la synthèse de votre travail. Vous pouvez l'exporter pour la garder."}</p>
      </div>

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
