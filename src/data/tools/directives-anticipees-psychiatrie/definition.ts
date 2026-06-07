import type { WorksheetDefinition } from "@/engines/worksheet/types";

export const directivesAnticipeesPsychiatrie: WorksheetDefinition = {
  engine: "worksheet",
  slug: "directives-anticipees-psychiatrie",
  title: "Directives anticipées en psychiatrie",
  shortTitle: "Directives anticipées",
  category: "carnets",
  iconName: "scale",
  accent: "red",
  summary: "Exprimer à l'avance vos préférences de soin, au calme.",
  estimatedMinutes: 25,
  sensitivity: "high",
  sourceCredit: "D'après les directives anticipées en psychiatrie",
  disclaimerKey: "crise",
  crisisLevel: "standard",

  documentTitle: "Mes directives anticipées",
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce document vous permet d'exprimer, à l'avance et au calme, vos préférences pour le cas " +
        "où vous traverseriez une période où il vous serait difficile de vous exprimer. Il vous " +
        "appartient ; vous pouvez le modifier quand vous voulez.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Vous remplissez seulement ce que vous souhaitez. Pour qu'il ait une portée auprès des " +
        "soignants, parlez-en avec votre médecin et conservez-en une copie (export ci-dessous).",
    },
  ],
  sections: [
    {
      id: "identite",
      title: "Mon identité (facultatif)",
      fields: [
        { id: "nom", type: "shortText", label: "Nom / prénom", optional: true },
        { id: "naissance", type: "date", label: "Date de naissance", optional: true },
      ],
    },
    {
      id: "confiance",
      title: "Ma personne de confiance",
      tables: [
        {
          id: "personneConfiance",
          label: "Personne(s) de confiance",
          addLabel: "Ajouter une personne",
          columns: [
            { id: "nom", type: "shortText", label: "Nom / prénom" },
            { id: "lien", type: "shortText", label: "Lien" },
            { id: "tel", type: "shortText", label: "Téléphone" },
          ],
        },
      ],
    },
    {
      id: "signes",
      title: "Mes signes avant-coureurs",
      fields: [
        {
          id: "signes",
          type: "longText",
          label: "Comment reconnaître que je vais moins bien ?",
        },
      ],
    },
    {
      id: "aide",
      title: "Ce qui m'aide et ce qui ne m'aide pas",
      fields: [
        { id: "aide", type: "longText", label: "Ce qui m'aide en période difficile" },
        { id: "nAidePas", type: "longText", label: "Ce qui ne m'aide pas (à éviter)" },
      ],
    },
    {
      id: "traitements",
      title: "Traitements",
      tables: [
        {
          id: "traitementsAidants",
          label: "Traitements qui m'aident",
          addLabel: "Ajouter",
          emptyLabel: "À remplir si cela vous concerne.",
          columns: [
            { id: "nom", type: "shortText", label: "Traitement" },
            { id: "note", type: "shortText", label: "Remarque" },
          ],
        },
        {
          id: "traitementsNonAidants",
          label: "Traitements à éviter",
          addLabel: "Ajouter",
          emptyLabel: "À remplir si cela vous concerne.",
          columns: [
            { id: "nom", type: "shortText", label: "Traitement" },
            { id: "raison", type: "shortText", label: "Raison (effets, vécu…)" },
          ],
        },
      ],
    },
    {
      id: "lieux",
      title: "Lieux de soin",
      tables: [
        {
          id: "lieuxSouhaites",
          label: "Lieux souhaités",
          addLabel: "Ajouter un lieu",
          columns: [{ id: "lieu", type: "shortText", label: "Lieu" }],
        },
        {
          id: "lieuxRefuses",
          label: "Lieux que je préfère éviter",
          addLabel: "Ajouter un lieu",
          columns: [
            { id: "lieu", type: "shortText", label: "Lieu" },
            { id: "raison", type: "shortText", label: "Raison" },
          ],
        },
      ],
    },
    {
      id: "accompagnants",
      title: "Personnes à prévenir / accompagnants",
      tables: [
        {
          id: "accompagnants",
          label: "Personnes à prévenir",
          addLabel: "Ajouter une personne",
          columns: [
            { id: "nom", type: "shortText", label: "Nom / prénom" },
            { id: "role", type: "shortText", label: "Rôle" },
            { id: "tel", type: "shortText", label: "Téléphone" },
          ],
        },
      ],
    },
    {
      id: "volontes",
      title: "Mes autres volontés",
      fields: [
        {
          id: "volontes",
          type: "longText",
          label: "Tout ce que je souhaite ajouter",
          help: "Préférences, besoins, choses importantes pour moi (animaux, responsabilités, etc.).",
        },
      ],
    },
  ],
};
