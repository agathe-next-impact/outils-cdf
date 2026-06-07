"use client";

/**
 * Vue d'un parcours par objectif : l'objectif écrit par la personne (session),
 * l'itinéraire d'étapes avec leur statut d'avancement (lu dans la session,
 * partagé avec l'usage autonome des outils), un bouton « reprendre », une
 * célébration à la complétion, et l'export du plan.
 */
import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { Celebration } from "@/components/feedback/Celebration";
import { ExportBar } from "@/components/safety/ExportBar";
import { useToolSlice } from "@/store/useToolState";
import { useSessionStore } from "@/store/sessionStore";
import { FOCUS_RING } from "@/lib/a11y";
import { stepStatus, STATUS_LABEL, type ResolvedStep, type StepStatus } from "@/lib/pathwayTypes";
import { pathwayToNeutral } from "@/lib/export/pathwayToNeutral";
import type { Accent } from "@/engines/types";

interface ObjectiveSlice {
  objectif?: string;
  signe?: string;
}

const STATUS_ICON: Record<StepStatus, string> = {
  todo: "circle-help",
  started: "pen-line",
  done: "check-circle-2",
};

function statusClass(status: StepStatus): string {
  return status === "done"
    ? "text-success"
    : status === "started"
      ? "text-foreground"
      : "text-muted";
}

export function PathwayView({
  id,
  goal,
  steps,
  accent,
}: {
  id: string;
  goal: string;
  steps: ResolvedStep[];
  accent: Accent;
}) {
  const [obj, setObj] = useToolSlice<ObjectiveSlice>(`parcours:${id}`);
  const objectif = obj?.objectif ?? "";
  const signe = obj?.signe ?? "";
  const tools = useSessionStore((s) => s.tools);

  const statuses = steps.map((s) => stepStatus(s.checks, tools));
  const required = steps.filter((s) => !s.optional);
  const requiredDone = required.filter((s) => stepStatus(s.checks, tools) === "done").length;
  const allRequiredDone = required.length > 0 && requiredDone === required.length;
  const resumeIndex = statuses.findIndex((st) => st !== "done");

  const setField = (patch: Partial<ObjectiveSlice>) =>
    setObj({ objectif, signe, ...patch });

  return (
    <div className="space-y-6">
      {allRequiredDone ? (
        <Celebration
          title="Objectif parcouru"
          message="Vous avez traversé les étapes essentielles de ce parcours. Bravo — pensez à exporter votre plan pour le garder."
          confetti
          accent={accent}
        />
      ) : (
        <p className="text-sm font-semibold tracking-wide text-info">
          {requiredDone} / {required.length} étapes essentielles
        </p>
      )}

      {/* Objectif de la personne */}
      <section className="card">
        <h2 className="mb-1 text-lg font-semibold">Mon objectif, avec mes mots</h2>
        <p className="mb-3 text-xs text-muted">
          Facultatif. Cela reste dans votre navigateur et peut être exporté avec votre plan.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="obj-goal" className="mb-1 block text-sm font-semibold">
              Ce que j&apos;aimerais, c&apos;est…
            </label>
            <textarea
              id="obj-goal"
              value={objectif}
              onChange={(e) => setField({ objectif: e.target.value })}
              rows={2}
              placeholder={`Ex. ${goal.toLowerCase()}, à mon rythme.`}
              className={`w-full border border-border bg-card px-3 py-2 font-medium ${FOCUS_RING}`}
            />
          </div>
          <div>
            <label htmlFor="obj-sign" className="mb-1 block text-sm font-semibold">
              Ce qui me dirait que j&apos;avance
            </label>
            <input
              id="obj-sign"
              type="text"
              value={signe}
              onChange={(e) => setField({ signe: e.target.value })}
              placeholder="Ex. Je m'endors un peu plus vite."
              className={`w-full border border-border bg-card px-3 py-2 font-medium ${FOCUS_RING}`}
            />
          </div>
        </div>
      </section>

      {/* Itinéraire */}
      <section aria-label="Itinéraire du parcours">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">L&apos;itinéraire</h2>
          {resumeIndex >= 0 && steps[resumeIndex]?.available ? (
            <Link
              href={steps[resumeIndex]!.href}
              className={`inline-flex items-center gap-1 bg-accent px-3 py-1 text-sm font-semibold tracking-wide text-white ${FOCUS_RING}`}
            >
              Reprendre <GameIcon name="arrow-right" size={16} aria-hidden />
            </Link>
          ) : null}
        </div>

        <ol className="space-y-3">
          {steps.map((step, i) => {
            const status = statuses[i]!;
            return (
              <li
                key={step.ref}
                className="card flex items-start gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="font-heading text-2xl font-semibold leading-none text-accent">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <GameIcon
                      name={step.iconName}
                      size={20}
                      className="text-accent"
                      aria-hidden
                    />
                    <h3 className="text-base font-semibold leading-tight">{step.label}</h3>
                    {step.optional ? (
                      <span className="border border-border px-1.5 text-[10px] font-semibold tracking-wide text-muted">
                        Facultatif
                      </span>
                    ) : null}
                  </div>
                  {step.label !== step.toolTitle ? (
                    <p className="text-xs text-muted">dans « {step.toolTitle} »</p>
                  ) : null}
                  <p className="mt-1 text-sm text-muted">{step.why}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold tracking-wide ${statusClass(status)}`}
                    >
                      <GameIcon name={STATUS_ICON[status]} size={14} aria-hidden />
                      {STATUS_LABEL[status]}
                    </span>
                    {step.available ? (
                      <Link
                        href={step.href}
                        className={`inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline ${FOCUS_RING}`}
                      >
                        {status === "done" ? "Revoir" : status === "started" ? "Continuer" : "Ouvrir"}
                        <GameIcon name="arrow-right" size={14} aria-hidden />
                      </Link>
                    ) : (
                      <span className="text-xs font-semibold tracking-wide text-muted">
                        Bientôt
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <ExportBar
        slug={`parcours-${id}`}
        build={() => ({
          doc: pathwayToNeutral({
            id,
            goal,
            objectif,
            signe,
            steps: steps.map((s, i) => ({
              label: s.label,
              toolTitle: s.toolTitle,
              why: s.why,
              optional: s.optional,
              status: statuses[i]!,
            })),
          }),
          raw: { objectif, signe },
        })}
      />
    </div>
  );
}
