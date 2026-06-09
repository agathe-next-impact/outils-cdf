import type { ScoredDefinition, ScoredItem } from "@/engines/scored/types";

const FREQ = "freq";

const ITEMS_RAW: { label: string; group: string }[] = [
  // Sentiments anxieux
  { group: "Sentiments anxieux", label: "Anxiété, nervosité, inquiétude ou peur" },
  { group: "Sentiments anxieux", label: "Impression que ce qui vous entoure est étrange, irréel ou flou" },
  { group: "Sentiments anxieux", label: "Sentiment d'être détaché·e de tout ou partie de votre corps" },
  { group: "Sentiments anxieux", label: "Crises de panique soudaines et inattendues" },
  { group: "Sentiments anxieux", label: "Appréhension ou sentiment qu'un malheur va arriver" },
  { group: "Sentiments anxieux", label: "Sensation d'être tendu·e, stressé·e ou « à cran »" },
  // Pensées anxieuses
  { group: "Pensées anxieuses", label: "Difficulté à vous concentrer" },
  { group: "Pensées anxieuses", label: "Pensées qui défilent ou esprit qui saute d'une idée à l'autre" },
  { group: "Pensées anxieuses", label: "Images ou rêveries effrayantes" },
  { group: "Pensées anxieuses", label: "Impression d'être sur le point de perdre le contrôle" },
  { group: "Pensées anxieuses", label: "Peur de « craquer » ou de perdre la raison" },
  { group: "Pensées anxieuses", label: "Peur de vous évanouir" },
  { group: "Pensées anxieuses", label: "Peur d'une maladie physique, d'une crise cardiaque ou de mourir" },
  { group: "Pensées anxieuses", label: "Crainte d'avoir l'air ridicule ou incompétent·e devant les autres" },
  { group: "Pensées anxieuses", label: "Peur d'être seul·e, isolé·e ou abandonné·e" },
  { group: "Pensées anxieuses", label: "Peur de la critique ou de la désapprobation" },
  { group: "Pensées anxieuses", label: "Peur que quelque chose de terrible soit sur le point d'arriver" },
  // Symptômes physiques
  { group: "Symptômes physiques", label: "Cœur qui s'emballe, palpitations ou battements irréguliers" },
  { group: "Symptômes physiques", label: "Douleur, pression ou serrement dans la poitrine" },
  { group: "Symptômes physiques", label: "Picotements ou engourdissements dans les doigts ou les orteils" },
  { group: "Symptômes physiques", label: "Papillons ou inconfort dans le ventre" },
  { group: "Symptômes physiques", label: "Constipation ou diarrhée" },
  { group: "Symptômes physiques", label: "Agitation ou impossibilité de tenir en place" },
  { group: "Symptômes physiques", label: "Muscles tendus ou contractés" },
  { group: "Symptômes physiques", label: "Transpiration non liée à la chaleur" },
  { group: "Symptômes physiques", label: "Boule dans la gorge" },
  { group: "Symptômes physiques", label: "Tremblements ou frissons" },
  { group: "Symptômes physiques", label: "Jambes en coton ou « en gelée »" },
  { group: "Symptômes physiques", label: "Vertiges, étourdissements ou perte d'équilibre" },
  { group: "Symptômes physiques", label: "Sensation d'étouffement ou difficulté à respirer" },
  { group: "Symptômes physiques", label: "Maux de tête ou douleurs dans la nuque ou le dos" },
  { group: "Symptômes physiques", label: "Bouffées de chaleur ou frissons de froid" },
  { group: "Symptômes physiques", label: "Fatigue, faiblesse ou épuisement facile" },
];

const items: ScoredItem[] = ITEMS_RAW.map((it, i) => ({
  id: `q${i + 1}`,
  label: it.label,
  group: it.group,
  scaleId: FREQ,
}));

export const inventaireBurnsAnxiete: ScoredDefinition = {
  engine: "scored",
  slug: "inventaire-burns-anxiete",
  title: "Inventaire d'anxiété de Burns",
  shortTitle: "Inventaire de Burns",
  category: "questionnaires",
  iconName: "activity",
  accent: "blue",
  summary: "33 affirmations pour faire le point sur ton anxiété récente.",
  keywords: ["anxiété", "stress", "peur", "nervosité", "symptômes physiques", "questionnaire", "auto-évaluation", "TCC"],
  estimatedMinutes: 8,
  sensitivity: "medium",
  sourceCredit: "D'après l'inventaire d'anxiété de David D. Burns",
  disclaimerKey: "questionnaire",
  crisisLevel: "standard",

  referencePeriod: "Au cours de la semaine écoulée, aujourd'hui compris.",
  intro: [
    {
      kind: "paragraph",
      text:
        "Cet inventaire propose 33 affirmations sur des sensations, des pensées et des " +
        "symptômes parfois liés à l'anxiété. Pour chacune, indique à quel point cela t'a " +
        "concerné récemment.",
    },
    {
      kind: "callout",
      tone: "info",
      text: "Il n'y a pas de bonne réponse. Réponds spontanément, selon ton ressenti.",
    },
  ],
  scales: [
    {
      id: FREQ,
      options: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Un peu" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Beaucoup" },
      ],
    },
  ],
  items,
  scoring: {
    method: "sum",
    bandBasis: "sum",
    bands: [
      {
        code: "minimal",
        min: 0,
        max: 4,
        label: "Anxiété minime ou absente",
        tone: "neutral",
        guidance:
          "Tes réponses indiquent peu de signes d'anxiété sur cette période. C'est un repère, pas un verdict.",
      },
      {
        code: "borderline",
        min: 5,
        max: 10,
        label: "Anxiété légère (limite)",
        tone: "neutral",
        guidance:
          "Quelques signes d'anxiété apparaissent. Observer ce qui les déclenche peut déjà aider.",
      },
      {
        code: "mild",
        min: 11,
        max: 20,
        label: "Anxiété légère",
        tone: "neutral",
        guidance:
          "Des signes d'anxiété légère sont présents. Des techniques d'apaisement et de respiration peuvent être utiles.",
      },
      {
        code: "moderate",
        min: 21,
        max: 30,
        label: "Anxiété modérée",
        tone: "attention",
        guidance:
          "Une anxiété modérée ressort de tes réponses. En parler à un professionnel peut être une bonne idée.",
      },
      {
        code: "severe",
        min: 31,
        max: 50,
        label: "Anxiété importante",
        tone: "attention",
        guidance:
          "Tes réponses traduisent une anxiété importante. Tu n'as pas à gérer cela seul : un professionnel peut t'accompagner.",
      },
      {
        code: "extreme",
        min: 51,
        max: 99,
        label: "Anxiété très importante",
        tone: "attention",
        guidance:
          "Tes réponses traduisent une anxiété très intense. Pense à en parler rapidement ; en cas de détresse, les ressources d'urgence de cette page sont là pour toi.",
      },
    ],
  },
  allowIncomplete: false,
};
