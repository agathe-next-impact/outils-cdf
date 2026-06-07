"use client";

/**
 * RadarProfile — profil multi-dimensionnel (ex. les 5 facteurs du RAS,
 * l'équilibre des attributions, une « fleur » de pétales notés).
 */
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import {
  accentColor,
  axisTick,
  axisTickMuted,
  GRID,
  numDomain,
  tooltipProps,
  useChartAnimation,
  type ChartAccent,
} from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export interface RadarPoint {
  axis: string;
  value: number;
}

export function RadarProfile({
  title,
  description,
  note,
  data,
  max,
  accent = "blue",
  valueLabel = "Valeur",
  height = 300,
}: {
  title: string;
  description?: string;
  note?: string;
  data: RadarPoint[];
  /** Borne haute de l'axe radial (sinon auto). */
  max?: number;
  accent?: ChartAccent;
  valueLabel?: string;
  height?: number;
}) {
  const animate = useChartAnimation();
  const color = accentColor(accent);

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div style={{ width: "100%", height }} aria-hidden>
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid stroke={GRID} />
            <PolarAngleAxis dataKey="axis" tick={axisTick} />
            <PolarRadiusAxis domain={numDomain(max)} tick={axisTickMuted} angle={90} />
            <Radar
              dataKey="value"
              name={valueLabel}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              isAnimationActive={animate}
            />
            <Tooltip {...tooltipProps} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <SrDataTable
        caption={title}
        columns={["Dimension", valueLabel]}
        rows={data.map((d) => [d.axis, d.value])}
      />
    </ChartFigure>
  );
}
