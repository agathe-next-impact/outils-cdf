import type { WorksheetDefinition } from "@/engines/worksheet/types";

export const situationsEvitees: WorksheetDefinition = {
  engine: "worksheet",
  slug: "situations-evitees",
  title: "Liste des situations évitées",
  category: "carnets",
  iconName: "footprints",
  accent: "yellow",
  summary: "Lister et hiérarchiser les situations évitées par anxiété.",
  keywords: ["évitement", "exposition graduée", "anxiété", "phobies", "peurs", "situations anxiogènes", "déclencheurs", "TCC"],
  estimatedMinutes: 10,
  sensitivity: "medium",
  sourceCredit: "D'après les outils d'exposition graduée (TCC)",
  disclaimerKey: "default",
  crisisLevel: "standard",

  documentTitle: "Mes situations évitées",
  intro: [
    {
      kind: "paragraph",
      text:
        "Liste les situations que tu as tendance à éviter par peur ou anxiété, puis évalue " +
        "l'anxiété qu'elles provoquent (de 0 à 100). La liste se classe automatiquement, de la " +
        "moins à la plus anxiogène.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Cette « échelle » peut servir, à ton rythme et idéalement accompagné, à approcher " +
        "ces situations en commençant par les plus faciles. Rien ne presse.",
    },
  ],
  sections: [
    {
      id: "liste",
      title: "Mes situations",
      tables: [
        {
          id: "situations",
          label: "Situations évitées",
          addLabel: "Ajouter une situation",
          emptyLabel: "Ajoute une première situation pour commencer ta liste.",
          sortable: { byColumnId: "anxiete", direction: "asc" },
          columns: [
            { id: "situation", type: "shortText", label: "Situation" },
            {
              id: "anxiete",
              type: "slider",
              label: "Anxiété ressentie",
              min: 0,
              max: 100,
              minLabel: "0 — aucune",
              maxLabel: "100 — maximale",
            },
          ],
        },
      ],
    },
  ],
};
