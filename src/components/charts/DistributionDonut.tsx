"use client";

/**
 * DistributionDonut — répartition par catégorie (ex. types d'inquiétudes :
 * pratique / hypothétique / peu d'emprise ; équilibre des attributions).
 * ⚠️ La palette de la charte ne compte que 3 accents : à n'utiliser que pour
 * ≤ 3 modalités. Au-delà, préférer `HBarRanking` (1 couleur + libellés d'axe).
 * Légende + libellés de valeur → information jamais portée par la seule couleur.
 */
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList,
  Tooltip,
} from "recharts";
import { SERIES_PALETTE, tooltipProps, useChartAnimation } from "./theme";
import { ChartFigure, SrDataTable } from "./ChartFrame";

export interface SliceDatum {
  label: string;
  value: number;
}

export function DistributionDonut({
  title,
  description,
  note,
  data,
  valueLabel = "Nombre",
  height = 280,
}: {
  title: string;
  description?: string;
  note?: string;
  data: SliceDatum[];
  valueLabel?: string;
  height?: number;
}) {
  const animate = useChartAnimation();

  return (
    <ChartFigure title={title} description={description} note={note}>
      <div style={{ width: "100%", height }} aria-hidden>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={1}
              stroke="var(--background)"
              strokeWidth={2}
              isAnimationActive={animate}
            >
              {data.map((d, i) => (
                <Cell key={d.label} fill={SERIES_PALETTE[i % SERIES_PALETTE.length]} />
              ))}
              <LabelList dataKey="value" position="outside" stroke="none" fill="var(--foreground)" fontSize={11} />
            </Pie>
            <Tooltip {...tooltipProps} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <SrDataTable
        caption={title}
        columns={["Catégorie", valueLabel]}
        rows={data.map((d) => [d.label, d.value])}
      />
    </ChartFigure>
  );
}
