import type { ScaleDef, ScoredBody, ScoredItem, SeverityBand } from "./types";

export interface SubscoreResult {
  id: string;
  label: string;
  official: boolean;
  sum: number;
  mean: number | null;
  count: number;
  total: number;
  /** Somme maximale possible des items de la dimension. */
  max: number;
}

export interface ScoreResult {
  totalItems: number;
  answered: number;
  complete: boolean;
  /** Somme des valeurs (items répondus, après inversion éventuelle). */
  sum: number;
  /** Moyenne des valeurs répondues. */
  mean: number | null;
  /** Position normalisée entre min et max possibles (0–100), items répondus. */
  percent: number | null;
  /** Bande d'interprétation (uniquement si complet). */
  band: SeverityBand | null;
  subscores: SubscoreResult[];
}

function scaleBounds(scale: ScaleDef): { min: number; max: number } {
  const values = scale.options.map((o) => o.value);
  return { min: Math.min(...values), max: Math.max(...values) };
}

function scoredValue(
  item: ScoredItem,
  raw: number,
  bounds: { min: number; max: number }
): number {
  return item.reverse ? bounds.max + bounds.min - raw : raw;
}

export function computeScore(
  body: ScoredBody,
  responses: Record<string, number | null>
): ScoreResult {
  const scaleById = new Map(body.scales.map((s) => [s.id, s]));
  let sum = 0;
  let answered = 0;
  let minPossible = 0;
  let maxPossible = 0;

  for (const item of body.items) {
    const scale = scaleById.get(item.scaleId);
    if (!scale) continue;
    const bounds = scaleBounds(scale);
    const raw = responses[item.id];
    if (raw === undefined || raw === null) continue;
    answered++;
    sum += scoredValue(item, raw, bounds);
    minPossible += bounds.min;
    maxPossible += bounds.max;
  }

  const totalItems = body.items.length;
  const complete = totalItems > 0 && answered === totalItems;
  const mean = answered > 0 ? sum / answered : null;
  const percent =
    answered > 0 && maxPossible > minPossible
      ? ((sum - minPossible) / (maxPossible - minPossible)) * 100
      : null;

  const basis = body.scoring.bandBasis ?? body.scoring.method;
  const basisValue = basis === "mean" ? mean : sum;
  const band =
    complete && basisValue !== null
      ? (body.scoring.bands.find((b) => basisValue >= b.min && basisValue <= b.max) ?? null)
      : null;

  const subscores: SubscoreResult[] = (body.scoring.subscores ?? []).map((def) => {
    let ssum = 0;
    let scount = 0;
    let stotal = 0;
    let smax = 0;
    for (const itemId of def.itemIds) {
      const item = body.items.find((i) => i.id === itemId);
      if (!item) continue;
      stotal++;
      const scale = scaleById.get(item.scaleId);
      if (!scale) continue;
      const bounds = scaleBounds(scale);
      smax += bounds.max;
      const raw = responses[itemId];
      if (raw === undefined || raw === null) continue;
      scount++;
      ssum += scoredValue(item, raw, bounds);
    }
    return {
      id: def.id,
      label: def.label,
      official: def.official,
      sum: ssum,
      mean: scount > 0 ? ssum / scount : null,
      count: scount,
      total: stotal,
      max: smax,
    };
  });

  return { totalItems, answered, complete, sum, mean, percent, band, subscores };
}

/** Valeur maximale possible de la somme (tous items répondus au maximum). */
export function maxSum(body: ScoredBody): number {
  const scaleById = new Map(body.scales.map((s) => [s.id, s]));
  let total = 0;
  for (const item of body.items) {
    const scale = scaleById.get(item.scaleId);
    if (!scale) continue;
    total += scaleBounds(scale).max;
  }
  return total;
}
