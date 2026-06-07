import type { ScoredBody } from "./types";
import type { ScoreResult } from "./score";
import { maxSum } from "./score";
import { ProgressBar } from "@/components/form/ProgressBar";
import { Celebration } from "@/components/feedback/Celebration";
import GameIcon from "@/components/GameIcon";

export function ScoredResult({ body, result }: { body: ScoredBody; result: ScoreResult }) {
  const total = maxSum(body);
  const attention = result.band?.tone === "attention";

  return (
    <div className="space-y-4" aria-live="polite">
      <Celebration
        title="C'est noté"
        message="Merci d'avoir pris ce temps pour vous observer. Ce repère est à accueillir avec douceur, jamais comme un jugement."
        confetti={!attention && result.band != null}
        iconName="sparkles"
        accent="blue"
      />
      <div className="card border border-blue">
        <h2 className="mb-3 text-xl font-semibold">Votre résultat</h2>
        <ProgressBar value={result.sum} max={total} variant="result" label="Score total" />

        {body.scoring.showMeanAndPercent ? (
          <p className="mt-2 text-sm text-muted">
            {result.mean !== null ? `Moyenne ${result.mean.toFixed(2)}` : ""}
            {result.mean !== null && result.percent !== null ? " · " : ""}
            {result.percent !== null ? `${Math.round(result.percent)} %` : ""}
          </p>
        ) : null}

        {result.band ? (
          <div
            className={`mt-3 flex items-start gap-2 border p-3 text-sm ${attention ? "border-red" : "border-blue"}`}
          >
            <GameIcon
              name={attention ? "alert-triangle" : "info"}
              size={20}
              className={`mt-0.5 shrink-0 ${attention ? "text-red" : "text-blue"}`}
            />
            <div>
              <p className="font-semibold">{result.band.label}</p>
              <p>{result.band.guidance}</p>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            Complétez toutes les affirmations pour obtenir un repère d&apos;interprétation.
          </p>
        )}
        <p className="mt-3 text-xs text-muted">
          Ce score est un repère personnel, pas un diagnostic. Il peut aider à suivre une
          évolution dans le temps.
        </p>
      </div>

      {result.subscores.length > 0 ? (
        <div className="card">
          <h3 className="mb-1 text-lg font-semibold">Repères par dimension</h3>
          <p className="mb-3 text-xs text-muted">
            Indicateurs exploratoires, à interpréter avec prudence (non normés).
          </p>
          <ul className="space-y-3">
            {result.subscores.map((s) => (
              <li key={s.id}>
                <ProgressBar
                  value={s.sum}
                  max={s.max}
                  label={s.official ? s.label : `${s.label} (exploratoire)`}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
