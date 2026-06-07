"use client";

/**
 * ScoreGauge — jauge radiale d'un score unique rapporté à son maximum
 * (ex. total Burns, moyenne RAS, estime de soi, repérage). Le libellé central
 * (valeur + éventuelle bande) est un overlay DOM (police de la charte).
 *
 * NON-DIAGNOSTIC : un score est un repère, jamais un verdict. Le ton de la
 * bande (`neutral` → bleu, `attention` → rouge) colore l'arc, mais le texte de
 * bande reste descriptif et l'appelant doit afficher le rappel d'usage.
 */
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { CHART_BLUE, CHART_RED, TRACK, useChartAnimation } from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export function ScoreGauge({
  title,
  description,
  note,
  value,
  max,
  bandLabel,
  bandTone = "neutral",
  unit,
  height = 220,
}: {
  title: string;
  description?: string;
  note?: string;
  value: number;
  max: number;
  bandLabel?: string;
  bandTone?: "neutral" | "attention";
  /** Suffixe affiché après la valeur (ex. " / 40", " %"). Sinon « value / max ». */
  unit?: string;
  height?: number;
}) {
  const animate = useChartAnimation();
  const color = bandTone === "attention" ? CHART_RED : CHART_BLUE;
  const data = [{ name: title, value }];

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div className="relative" style={{ width: "100%", height }} aria-hidden>
        <ResponsiveContainer>
          <RadialBarChart
            data={data}
            innerRadius="72%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
            <RadialBar
              dataKey="value"
              angleAxisId={0}
              background={{ fill: TRACK }}
              cornerRadius={0}
              fill={color}
              isAnimationActive={animate}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-heading text-3xl font-black leading-none">
            {unit ? `${value}${unit}` : `${value} / ${max}`}
          </span>
          {bandLabel ? (
            <span
              className={`mt-1 text-xs font-bold uppercase tracking-wide ${
                bandTone === "attention" ? "text-red" : "text-blue"
              }`}
            >
              {bandLabel}
            </span>
          ) : null}
        </div>
      </div>
      <SrDataTable
        caption={title}
        columns={["Indicateur", "Valeur"]}
        rows={[
          ["Score", unit ? `${value}${unit}` : `${value} / ${max}`],
          ...(bandLabel ? [["Repère", bandLabel] as [string, string]] : []),
        ]}
      />
    </ChartFigure>
  );
}
