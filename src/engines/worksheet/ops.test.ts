import { describe, it, expect } from "vitest";
import { sortRows, newRow, asRows } from "./ops";
import type { RepeatableTableDef } from "./types";
import type { RepeatRow } from "../types";

const table: RepeatableTableDef = {
  id: "t",
  label: "Situations",
  addLabel: "Ajouter",
  columns: [
    { id: "situation", type: "shortText", label: "Situation" },
    { id: "anxiete", type: "slider", label: "Anxiété", min: 0, max: 100 },
  ],
  sortable: { byColumnId: "anxiete", direction: "asc" },
};

describe("sortRows", () => {
  it("trie par anxiété croissante", () => {
    const rows: RepeatRow[] = [
      { _id: "a", situation: "Foule", anxiete: 80 },
      { _id: "b", situation: "Ascenseur", anxiete: 30 },
      { _id: "c", situation: "Téléphone", anxiete: 55 },
    ];
    const sorted = sortRows(rows, table.sortable);
    expect(sorted.map((r) => r["anxiete"])).toEqual([30, 55, 80]);
    // ne mute pas l'entrée
    expect(rows.map((r) => r["anxiete"])).toEqual([80, 30, 55]);
  });

  it("sans config de tri, renvoie l'ordre d'origine", () => {
    const rows: RepeatRow[] = [{ _id: "a", anxiete: 80 }, { _id: "b", anxiete: 30 }];
    expect(sortRows(rows, undefined)).toBe(rows);
  });
});

describe("newRow", () => {
  it("ajoute un horodatage si la table est horodatée", () => {
    const timestamped: RepeatableTableDef = { ...table, timestamped: true };
    const r = newRow(timestamped, "x", "2026-06-06T10:00:00.000Z");
    expect(r["_id"]).toBe("x");
    expect(r["_createdAt"]).toBe("2026-06-06T10:00:00.000Z");
  });

  it("n'ajoute pas d'horodatage sinon", () => {
    const r = newRow(table, "x", "2026-06-06T10:00:00.000Z");
    expect(r["_createdAt"]).toBeUndefined();
  });
});

describe("asRows", () => {
  it("filtre les valeurs non-objet", () => {
    expect(asRows(undefined)).toEqual([]);
    expect(asRows("x")).toEqual([]);
    expect(asRows([{ _id: "a" }])).toEqual([{ _id: "a" }]);
  });
});
