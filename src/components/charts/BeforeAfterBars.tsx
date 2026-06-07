"use client";

/**
 * BeforeAfterBars — comparaison « avant / après » groupée (ex. croyance et
 * émotion avant/après restructuration ; stress, détresse ou confiance
 * avant/après un exercice). « Avant » = barre neutre, « après » = accent.
 * Légende explicite → l'information ne dépend pas de la seule couleur.
 */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LabelList,
  Tooltip,
} from "recharts";
import {
  accentColor,
  axisTick,
  FG,
  GRID,
  NEUTRAL_BAR,
  numDomain,
  tooltipProps,
  useChartAnimation,
  type ChartAccent,
} from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export interface BeforeAfterDatum {
  label: string;
  before: number;
  after: number;
}

export function BeforeAfterBars({
  title,
  description,
  note,
  data,
  max,
  accent = "blue",
  beforeLabel = "Avant",
  afterLabel = "Après",
  height = 280,
}: {
  title: string;
  description?: string;
  note?: string;
  data: BeforeAfterDatum[];
  max?: number;
  accent?: ChartAccent;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
}) {
  const animate = useChartAnimation();
  const color = accentColor(accent);

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div style={{ width: "100%", height }} aria-hidden>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 4 }}>
            <CartesianGrid vertical={false} stroke={GRID} />
            <XAxis dataKey="label" tick={axisTick} />
            <YAxis domain={numDomain(max)} tick={axisTick} allowDecimals={false} />
            <Tooltip {...tooltipProps} />
            <Legend />
            <Bar dataKey="before" name={beforeLabel} fill={NEUTRAL_BAR} radius={6} isAnimationActive={animate}>
              <LabelList dataKey="before" position="top" fill={FG} fontSize={11} />
            </Bar>
            <Bar dataKey="after" name={afterLabel} fill={color} radius={6} isAnimationActive={animate}>
              <LabelList dataKey="after" position="top" fill={FG} fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SrDataTable
        caption={title}
        columns={["Mesure", beforeLabel, afterLabel]}
        rows={data.map((d) => [d.label, d.before, d.after])}
      />
    </ChartFigure>
  );
}
