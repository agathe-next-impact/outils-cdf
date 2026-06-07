"use client";

/**
 * TrendLine — série temporelle (ex. intensité des attaques de panique au fil
 * du temps, qualité de sommeil par date). Ligne (par défaut) ou aire.
 */
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  accentColor,
  axisTick,
  GRID,
  numDomain,
  tooltipProps,
  useChartAnimation,
  type ChartAccent,
} from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export interface TrendPoint {
  x: string;
  value: number;
}

export function TrendLine({
  title,
  description,
  note,
  data,
  max,
  accent = "blue",
  valueLabel = "Valeur",
  area = false,
  height = 260,
}: {
  title: string;
  description?: string;
  note?: string;
  data: TrendPoint[];
  max?: number;
  accent?: ChartAccent;
  valueLabel?: string;
  area?: boolean;
  height?: number;
}) {
  const animate = useChartAnimation();
  const color = accentColor(accent);
  const domain = numDomain(max);

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div style={{ width: "100%", height }} aria-hidden>
        <ResponsiveContainer>
          {area ? (
            <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid vertical={false} stroke={GRID} />
              <XAxis dataKey="x" tick={axisTick} />
              <YAxis domain={domain} tick={axisTick} allowDecimals={false} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="value"
                name={valueLabel}
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                dot={{ r: 3, fill: color, stroke: color }}
                isAnimationActive={animate}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
              <CartesianGrid vertical={false} stroke={GRID} />
              <XAxis dataKey="x" tick={axisTick} />
              <YAxis domain={domain} tick={axisTick} allowDecimals={false} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="value"
                name={valueLabel}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 3, fill: color, stroke: color }}
                isAnimationActive={animate}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <SrDataTable
        caption={title}
        columns={["Repère", valueLabel]}
        rows={data.map((d) => [d.x, d.value])}
      />
    </ChartFigure>
  );
}
