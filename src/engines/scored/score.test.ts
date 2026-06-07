import { describe, it, expect } from "vitest";
import { computeScore, maxSum } from "./score";
import type { ScoredDefinition } from "./types";
import { inventaireBurnsAnxiete } from "@/data/tools/inventaire-burns-anxiete/definition";
import { recoveryAssessmentScale } from "@/data/tools/recovery-assessment-scale/definition";

function fillAll(def: ScoredDefinition, value: number): Record<string, number | null> {
  const r: Record<string, number | null> = {};
  for (const item of def.items) r[item.id] = value;
  return r;
}

describe("Inventaire de Burns", () => {
  it("a un maximum de 99", () => {
    expect(maxSum(inventaireBurnsAnxiete)).toBe(99);
    expect(inventaireBurnsAnxiete.items).toHaveLength(33);
  });

  it("tout à 0 → score 0, bande minimale", () => {
    const res = computeScore(inventaireBurnsAnxiete, fillAll(inventaireBurnsAnxiete, 0));
    expect(res.sum).toBe(0);
    expect(res.complete).toBe(true);
    expect(res.band?.code).toBe("minimal");
  });

  it("tout à 3 → score 99, bande extrême (attention)", () => {
    const res = computeScore(inventaireBurnsAnxiete, fillAll(inventaireBurnsAnxiete, 3));
    expect(res.sum).toBe(99);
    expect(res.band?.code).toBe("extreme");
    expect(res.band?.tone).toBe("attention");
  });

  it("réponses partielles → pas de bande d'interprétation", () => {
    const responses = fillAll(inventaireBurnsAnxiete, 1);
    responses["q1"] = null;
    const res = computeScore(inventaireBurnsAnxiete, responses);
    expect(res.complete).toBe(false);
    expect(res.band).toBeNull();
    expect(res.answered).toBe(32);
  });
});

describe("Échelle RAS", () => {
  it("a 24 items et 5 sous-scores", () => {
    expect(recoveryAssessmentScale.items).toHaveLength(24);
    expect(recoveryAssessmentScale.scoring.subscores).toHaveLength(5);
  });

  it("tout à 1 → somme 24, moyenne 1, 0 %", () => {
    const res = computeScore(recoveryAssessmentScale, fillAll(recoveryAssessmentScale, 1));
    expect(res.sum).toBe(24);
    expect(res.mean).toBe(1);
    expect(Math.round(res.percent ?? -1)).toBe(0);
    expect(res.band?.code).toBe("emerging");
  });

  it("tout à 3 → somme 72, moyenne 3, 50 %", () => {
    const res = computeScore(recoveryAssessmentScale, fillAll(recoveryAssessmentScale, 3));
    expect(res.sum).toBe(72);
    expect(res.mean).toBe(3);
    expect(Math.round(res.percent ?? -1)).toBe(50);
    expect(res.band?.code).toBe("developing");
  });

  it("tout à 5 → somme 120, moyenne 5, 100 %", () => {
    const res = computeScore(recoveryAssessmentScale, fillAll(recoveryAssessmentScale, 5));
    expect(res.sum).toBe(120);
    expect(res.mean).toBe(5);
    expect(Math.round(res.percent ?? -1)).toBe(100);
    expect(res.band?.code).toBe("strong");
  });

  it("chaque sous-score couvre bien ses items", () => {
    const res = computeScore(recoveryAssessmentScale, fillAll(recoveryAssessmentScale, 5));
    const totalItemsInSubscores = res.subscores.reduce((acc, s) => acc + s.total, 0);
    expect(totalItemsInSubscores).toBe(24);
    for (const s of res.subscores) expect(s.official).toBe(false);
  });
});
