"use client";

/**
 * HBarRanking — barres HORIZONTALES classées (ex. hiérarchie d'exposition des
 * situations évitées, niveau de soutien par personne, répartition par catégorie
 * quand il y a plus de 3 modalités). Barres carrées (radius=0).
 */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
} from "recharts";
import {
  accentColor,
  axisTick,
  FG,
  GRID,
  numDomain,
  tooltipProps,
  useChartAnimation,
  type ChartAccent,
} from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export interface BarDatum {
  label: string;
  value: number;
}

export function HBarRanking({
  title,
  description,
  note,
  data,
  max,
  accent = "blue",
  valueLabel = "Valeur",
  labelWidth = 150,
  height,
}: {
  title: string;
  description?: string;
  note?: string;
  data: BarDatum[];
  max?: number;
  accent?: ChartAccent;
  valueLabel?: string;
  labelWidth?: number;
  height?: number;
}) {
  const animate = useChartAnimation();
  const color = accentColor(accent);
  const h = height ?? Math.max(140, data.length * 38 + 48);

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div style={{ width: "100%", height: h }} aria-hidden>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 32, bottom: 4, left: 4 }}
          >
            <CartesianGrid horizontal={false} stroke={GRID} />
            <XAxis
              type="number"
              domain={numDomain(max)}
              tick={axisTick}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={labelWidth}
              tick={axisTick}
            />
            <Tooltip {...tooltipProps} />
            <Bar dataKey="value" name={valueLabel} fill={color} radius={6} isAnimationActive={animate}>
              <LabelList dataKey="value" position="right" fill={FG} fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <SrDataTable
        caption={title}
        columns={["Élément", valueLabel]}
        rows={data.map((d) => [d.label, d.value])}
      />
    </ChartFigure>
  );
}
