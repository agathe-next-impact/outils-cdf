"use client";

import { useMemo, useState } from "react";
import type { CompositeDefinition, CompositeSegment } from "./types";
import {
  buildSegmentDefinition,
  segmentSlug,
  isSegmentDone,
  type SegmentDefinition,
} from "./segments";
import { ScoredRunner } from "../scored/ScoredRunner";
import { WizardRunner } from "../wizard/WizardRunner";
import { WorksheetEditor } from "../worksheet/WorksheetEditor";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { Celebration } from "@/components/feedback/Celebration";
import { ExportBar } from "@/components/safety/ExportBar";
import { compositeToNeutral } from "@/lib/export/compositeToNeutral";
import { useToolSlice, readToolSlice } from "@/store/useToolState";
import { useSessionStore } from "@/store/sessionStore";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface CompositeUiState {
  openSegmentId: string | null;
}
const INITIAL: CompositeUiState = { openSegmentId: null };

function SegmentRunner({ definition }: { definition: SegmentDefinition }) {
  switch (definition.engine) {
    case "scored":
      return <ScoredRunner definition={definition} />;
    case "wizard":
      return <WizardRunner definition={definition} />;
    case "worksheet":
      return <WorksheetEditor definition={definition} />;
  }
}

export function CompositeRunner({ definition }: { definition: CompositeDefinition }) {
  const [ui, setUi] = useToolSlice<CompositeUiState>(definition.slug);
  const state = ui ?? INITIAL;
  const resetTool = useSessionStore((s) => s.resetTool);
  const [confirming, setConfirming] = useState(false);

  const segDefs = useMemo(
    () =>
      definition.segments.map((seg) => ({
        seg,
        def: buildSegmentDefinition(definition, seg),
      })),
    [definition]
  );

  // Vue d'un segment ouvert.
  if (state.openSegmentId) {
    const entry = segDefs.find((e) => e.seg.id === state.openSegmentId);
    if (entry) {
      return (
        <div className="space-y-4">
          <button
            type="button"
            className={`inline-flex items-center gap-1 text-sm text-blue hover:underline ${FOCUS_RING}`}
            onClick={() => setUi({ openSegmentId: null })}
          >
            <GameIcon name="arrow-left" size={16} /> Retour aux modules
          </button>
          <h2 className="text-xl font-black uppercase">{entry.seg.title}</h2>
          <SegmentRunner definition={entry.def} />
        </div>
      );
    }
  }

  const doneMap = new Map<string, boolean>(
    definition.segments.map((seg) => [
      seg.id,
      isSegmentDone(seg, readToolSlice(segmentSlug(definition.slug, seg.id))),
    ])
  );
  const isUnlocked = (seg: CompositeSegment) =>
    !seg.unlockAfter || doneMap.get(seg.unlockAfter) === true;

  const total = definition.segments.length;
  const doneCount = [...doneMap.values()].filter(Boolean).length;
  const allDone = total > 0 && doneCount === total;

  const resetAll = () => {
    resetTool(definition.slug);
    for (const seg of definition.segments) {
      resetTool(segmentSlug(definition.slug, seg.id));
    }
    setConfirming(false);
  };

  return (
    <div className="space-y-6">
      <ContentRenderer blocks={definition.intro} className="card border border-blue" />

      {allDone ? (
        <Celebration
          title="Parcours complété"
          message="Vous avez parcouru tous les modules — bravo pour ce cheminement. Pensez à exporter votre travail pour le garder."
          confetti
          accent="blue"
        />
      ) : (
        <p className="text-sm font-bold uppercase tracking-wide text-blue">
          {doneCount} / {total} modules explorés
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {definition.segments.map((seg, i) => {
          const done = doneMap.get(seg.id) === true;
          const unlocked = isUnlocked(seg);
          return (
            <div
              key={seg.id}
              className={`card border ${done ? "border-blue" : "border-black"} animate-slide-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <GameIcon
                  name={seg.iconName ?? definition.iconName}
                  size={32}
                  className={done ? "text-blue" : "text-black"}
                />
                {done ? (
                  <span className="flex items-center gap-1 text-xs font-bold uppercase text-blue">
                    <GameIcon name="check-circle-2" size={16} /> Terminé
                  </span>
                ) : null}
              </div>
              <h3 className="mb-1 text-lg font-black uppercase">{seg.title}</h3>
              {seg.summary ? <p className="text-sm text-black/70">{seg.summary}</p> : null}
              <div className="mt-3">
                {unlocked ? (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setUi({ openSegmentId: seg.id })}
                  >
                    {done ? "Revoir" : "Ouvrir"}
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-black/50">
                    <GameIcon name="lock" size={16} /> À débloquer
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ExportBar
        slug={definition.slug}
        build={() => ({
          doc: compositeToNeutral(definition, (segId) =>
            readToolSlice(segmentSlug(definition.slug, segId))
          ),
        })}
      />

      {confirming ? (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span>Tout réinitialiser, modules compris&nbsp;?</span>
          <button
            type="button"
            className={`bg-red px-3 py-1 font-bold uppercase text-black ${FOCUS_RING}`}
            onClick={resetAll}
          >
            Oui, effacer
          </button>
          <button
            type="button"
            className={`border border-black px-3 py-1 ${FOCUS_RING}`}
            onClick={() => setConfirming(false)}
          >
            Annuler
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={`flex items-center gap-2 border border-black px-3 py-1 text-sm hover:text-red ${FOCUS_RING}`}
          onClick={() => setConfirming(true)}
        >
          <GameIcon name="trash-2" size={16} /> Tout réinitialiser
        </button>
      )}
    </div>
  );
}
