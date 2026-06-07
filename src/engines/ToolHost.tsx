"use client";

import { useHydrated } from "@/store/hydration";
import { ConsentGate } from "@/components/safety/ConsentGate";
import { ScoredRunner } from "./scored/ScoredRunner";
import { WizardRunner } from "./wizard/WizardRunner";
import { WorksheetEditor } from "./worksheet/WorksheetEditor";
import { CompositeRunner } from "./composite/CompositeRunner";
import type { ToolDefinition } from "./definition";

function ToolSkeleton() {
  return (
    <div className="card border border-blue" aria-busy="true">
      <p className="text-xl text-blue animate-pulse">Chargement…</p>
    </div>
  );
}

function EngineRouter({ definition }: { definition: ToolDefinition }) {
  switch (definition.engine) {
    case "scored":
      return <ScoredRunner definition={definition} />;
    case "wizard":
      return <WizardRunner definition={definition} />;
    case "worksheet":
      return <WorksheetEditor definition={definition} />;
    case "composite":
      return <CompositeRunner definition={definition} />;
  }
}

/**
 * Hôte d'un outil : attend l'hydratation de la session (évite le mismatch SSR
 * et le flash de l'état sauvegardé), applique le consentement, puis aiguille
 * vers le moteur correspondant.
 */
export function ToolHost({ definition }: { definition: ToolDefinition }) {
  const hydrated = useHydrated();
  if (!hydrated) return <ToolSkeleton />;

  return (
    <ConsentGate
      slug={definition.slug}
      sensitivity={definition.sensitivity}
      disclaimerKey={definition.disclaimerKey}
    >
      <EngineRouter definition={definition} />
    </ConsentGate>
  );
}
