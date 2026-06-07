import type { CompositeDefinition } from "@/engines/composite/types";
import type { WizardBody } from "@/engines/wizard/types";
import type { WorksheetBody } from "@/engines/worksheet/types";

/* -------------------------------------------------------------------------- */
/* Contenu 100 % original, inspiré (sans copie) de l'approche de pair-aidance  */
/* et de rétablissement : auto-réflexion douce, trauma-informed, liberté de    */
/* rythme. Aucun diagnostic, aucune phrase reprise des sources.                */
/* -------------------------------------------------------------------------- */

/* --- Segment 1 : Premiers pas (wizard) ------------------------------------ */
const premiersPas: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Pour entrer en douceur, voici quelques questions tournées vers l'instant présent. " +
        "Il n'y a rien à réussir, ni à bien faire : quelques mots suffisent, et vous pouvez " +
        "laisser une question de côté, vous arrêter, ou y revenir un autre jour. " +
        "Ce cahier est le vôtre, et c'est vous qui en donnez le rythme.",
    },
  ],
  steps: [
    {
      id: "ici-maintenant",
      title: "Là, maintenant",
      fields: [
        {
          id: "etat",
          type: "longText",
          label: "Comment ça va pour vous, en ce moment ?",
          help: "Pas de bonne réponse à trouver : juste ce qui vous traverse, tel que ça vient.",
          placeholder: "Ex. Un peu fatigué·e, mais content·e d'avoir pris ce temps.",
        },
      ],
    },
    {
      id: "ce-qui-aide",
      title: "Ce qui m'aide déjà",
      intro: [
        {
          kind: "paragraph",
          text:
            "Vous avez probablement déjà des appuis, même petits ou discrets : une personne, " +
            "un geste, un lieu, une habitude. Les mettre en mots, c'est une façon de reconnaître " +
            "ce qui vous porte déjà, sans avoir à le construire de zéro.",
        },
      ],
      fields: [
        {
          id: "appuis",
          type: "tagList",
          label: "Ressources, personnes ou gestes qui m'aident",
          help: "Un mot ou une courte expression par appui. Notez seulement ce qui vous parle.",
        },
      ],
    },
    {
      id: "petite-chose",
      title: "Une petite chose",
      fields: [
        {
          id: "agreable",
          type: "shortText",
          label: "Une petite chose agréable de ces derniers jours",
          help: "Même infime : un rayon de soleil, un message reçu, une tasse de thé. Tout compte.",
          placeholder: "Ex. J'ai ri à une bêtise au téléphone.",
        },
      ],
    },
    {
      id: "prendre-soin",
      title: "Prendre soin de moi",
      fields: [
        {
          id: "attention",
          type: "shortText",
          label: "Une attention que j'aimerais m'offrir cette semaine",
          placeholder: "Ex. Aller marcher dix minutes dehors jeudi.",
        },
      ],
      pitfalls: [
        {
          id: "attention-vague",
          appliesToFieldId: "attention",
          detector: "tooVague",
          message:
            "Plus une attention est petite et concrète, plus elle devient facile à s'offrir. " +
            "Si vous le souhaitez, vous pouvez préciser quand ou comment — mais rien ne vous y oblige.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message: "Merci d'avoir pris ce temps pour vous. Rien que d'être là, c'est déjà un pas qui compte.",
  },
};

/* --- Segment 2 : Ma boîte à ressources (worksheet) ------------------------ */
const boiteRessources: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Cette boîte rassemble ce qui vous fait du bien, pour le garder à portée de main les jours " +
        "où c'est plus difficile et où l'on a tendance à tout oublier. Ajoutez ce que vous voulez, " +
        "quand vous le sentez : rien n'est obligatoire, et tout peut être modifié ou retiré plus tard.",
    },
  ],
  documentTitle: "Ma boîte à ressources",
  sections: [
    {
      id: "ressources",
      title: "Mes ressources",
      tables: [
        {
          id: "moyens",
          label: "Ce qui me fait du bien",
          addLabel: "Ajouter une ressource",
          emptyLabel:
            "Rien pour l'instant, et c'est très bien. Quand vous le sentez, vous pourrez ajouter une première chose qui vous aide.",
          timestamped: true,
          columns: [
            {
              id: "titre",
              type: "shortText",
              label: "Ressource",
              placeholder: "Ex. Écouter de la musique",
            },
            {
              id: "categorie",
              type: "select",
              label: "Catégorie",
              options: [
                { value: "physique", label: "Physique (corps, mouvement)" },
                { value: "relationnel", label: "Relationnel (lien, présence)" },
                { value: "creatif", label: "Créatif (expression, art)" },
                { value: "ancrage", label: "Ancrage (calme, présence à soi)" },
                { value: "pratique", label: "Pratique (organisation, quotidien)" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "comment",
              type: "longText",
              label: "En quoi ça m'aide, ou comment je m'y prends",
              placeholder: "Ex. Ça me sort un moment de mes pensées et ça apaise mon corps.",
            },
            {
              id: "duree",
              type: "number",
              label: "Durée (minutes)",
              min: 0,
              placeholder: "Ex. 15",
            },
            {
              id: "quand",
              type: "shortText",
              label: "Les moments où ça me fait du bien",
              placeholder: "Ex. Le soir, quand les pensées tournent en boucle.",
            },
          ],
        },
      ],
    },
  ],
};

/* --- Segment 3 : Temps d'écriture (wizard, 5 modules) --------------------- */
const tempsEcriture: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Voici cinq courts temps d'écriture pour réfléchir à votre cheminement, chacun à sa façon. " +
        "Il n'y a ni bonne réponse, ni ordre à suivre, ni rythme attendu. Vous pouvez répondre à " +
        "une seule question, laisser les autres de côté, vous arrêter quand vous le souhaitez et " +
        "revenir un autre jour.",
    },
    {
      kind: "callout",
      tone: "attention",
      iconName: "circle-alert",
      text:
        "Certains de ces thèmes peuvent faire remonter des souvenirs ou des émotions difficiles. " +
        "C'est normal, et vous n'avez rien à vous prouver : si cela devient trop lourd, faites une " +
        "pause, respirez, ou refermez le cahier. Si la détresse est forte, vous n'avez pas à rester " +
        "seul·e — vous pouvez joindre le 3114 (souffrance et prévention du suicide, 24h/24), le 15 " +
        "(Samu) ou le 112 (urgences), et vous tourner vers une personne de confiance.",
    },
  ],
  steps: [
    {
      id: "reprendre-pouvoir",
      title: "Reprendre du pouvoir sur ma vie",
      intro: [
        {
          kind: "paragraph",
          text:
            "Reprendre du pouvoir, ce n'est pas tout porter sur ses épaules, ni se reprocher ce qui " +
            "ne dépend pas de vous. C'est simplement repérer, sans pression, les petits espaces où " +
            "il vous reste un choix, même modeste. Ces espaces existent, même quand beaucoup de " +
            "choses semblent vous échapper.",
        },
        {
          kind: "example",
          good: "« Je peux choisir l'heure à laquelle je me lève le week-end. » (un espace de choix)",
          avoid: "« Tout m'échappe, je ne décide jamais de rien. » (un jugement global sur soi)",
        },
      ],
      fields: [
        {
          id: "espaces-choix",
          type: "longText",
          label: "Dans ma vie aujourd'hui, où est-ce qu'il me reste une part de choix ?",
        },
        {
          id: "petit-pas-pouvoir",
          type: "longText",
          label: "Un domaine où j'aimerais reprendre un peu la main, et un tout premier pas possible",
        },
      ],
    },
    {
      id: "me-connaitre",
      title: "Mieux me connaître",
      intro: [
        {
          kind: "paragraph",
          text:
            "Mieux se connaître, c'est s'observer avec curiosité plutôt qu'avec sévérité. " +
            "Vos réactions, même celles qui vous déroutent, ont une histoire et une logique : " +
            "elles ont souvent été des façons de vous protéger. Il n'y a rien à corriger ici, " +
            "juste à regarder de plus près, avec douceur.",
        },
      ],
      fields: [
        {
          id: "ce-qui-me-fait-vibrer",
          type: "longText",
          label: "Ce qui me touche, m'anime, ou me donne envie d'avancer",
        },
        {
          id: "ce-que-japprends",
          type: "longText",
          label: "Quelque chose que je comprends un peu mieux sur moi, ces derniers temps",
        },
      ],
    },
    {
      id: "injustice",
      title: "Faire face à l'injustice ressentie",
      intro: [
        {
          kind: "paragraph",
          text:
            "Le sentiment d'injustice est légitime, et il mérite d'être entendu plutôt que minimisé. " +
            "Le mettre en mots n'efface pas ce qui s'est passé et n'excuse personne, mais cela peut " +
            "alléger un peu le poids que ça laisse, et faire apparaître plus clairement ce dont vous " +
            "avez besoin aujourd'hui. Allez-y à votre mesure : ce thème peut peser, et vous pouvez " +
            "vous arrêter à tout moment.",
        },
        {
          kind: "example",
          good: "« On ne m'a pas écouté·e quand j'ai demandé de l'aide. » (un fait vécu)",
          avoid: "« Je ne mérite pas qu'on m'écoute. » (un jugement sur soi)",
        },
      ],
      fields: [
        {
          id: "injustice-vecue",
          type: "longText",
          label: "Une injustice que j'ai ressentie, et la trace qu'elle a laissée en moi",
        },
        {
          id: "besoin-injustice",
          type: "longText",
          label: "Ce dont j'aurais eu besoin alors, ou ce dont j'ai besoin aujourd'hui face à cela",
        },
      ],
    },
    {
      id: "ma-valeur",
      title: "Reconnaître ma valeur",
      intro: [
        {
          kind: "paragraph",
          text:
            "Votre valeur ne dépend pas de ce que vous produisez, ni du regard des autres, ni des " +
            "difficultés que vous traversez. Elle est là, entière, simplement parce que vous existez. " +
            "Le formuler peut sembler étrange, surtout si on vous a longtemps fait croire le contraire : " +
            "prenez ce qui vous parle, et laissez le reste sans vous forcer.",
        },
      ],
      fields: [
        {
          id: "qualites",
          type: "longText",
          label: "Des qualités ou des forces que je me reconnais, même discrètes",
        },
        {
          id: "fierte",
          type: "longText",
          label: "Un moment, petit ou grand, dont je peux être fier·ère",
        },
      ],
    },
    {
      id: "resilience",
      title: "Ma résilience",
      intro: [
        {
          kind: "paragraph",
          text:
            "Si vous êtes là, à lire ces lignes, c'est que vous avez déjà traversé bien des choses. " +
            "Ce n'est pas rien : ça veut dire que quelque chose, en vous ou autour de vous, vous a " +
            "aidé·e à tenir. Cela mérite d'être nommé, car ce sont des appuis bien réels sur lesquels " +
            "vous pouvez encore vous reposer.",
        },
      ],
      fields: [
        {
          id: "ce-qui-ma-fait-tenir",
          type: "longText",
          label: "Dans les moments difficiles, qu'est-ce qui m'a aidé·e à tenir ?",
        },
        {
          id: "ce-que-je-garde",
          type: "longText",
          label: "Ce que je veux garder de mon parcours pour la suite du chemin",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message:
      "Vous avez pris le temps de vous écouter, et ce n'est jamais facile. Quoi que vous ayez écrit, ou choisi de ne pas écrire, c'est précieux.",
  },
};

/* --- Segment 4 : Mon plan de mieux-être (worksheet) ----------------------- */
const planMieuxEtre: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce plan rassemble vos repères de mieux-être au jour le jour : ce qui vous aide, ce qui " +
        "vous fragilise, et les personnes vers qui vous tourner. Il est pensé pour soutenir le " +
        "quotidien et entretenir ce qui va, pas seulement pour les moments durs. Il n'a pas besoin " +
        "d'être complet pour servir : remplissez-le comme vous voulez, et revenez-y à votre rythme.",
    },
    {
      kind: "paragraph",
      text:
        "S'il vous arrive de traverser des crises plus aiguës, un outil dédié, « Mon plan de crise », " +
        "existe à côté de celui-ci pour préparer ces moments-là plus en détail.",
    },
  ],
  documentTitle: "Mon plan de mieux-être",
  sections: [
    {
      id: "moins-bien",
      title: "Quand je vais moins bien",
      intro: [
        {
          kind: "paragraph",
          text:
            "Apprendre à repérer tôt les signes que ça va moins bien permet de prendre soin de soi " +
            "avant que ça ne s'enracine. Il ne s'agit pas de se surveiller ni de se juger : juste de " +
            "noter, sans dramatiser, ce que vous remarquez chez vous quand le moral baisse.",
        },
      ],
      fields: [
        {
          id: "signes",
          type: "longText",
          label: "Les petits signes qui me disent que je vais moins bien",
          placeholder:
            "Ex. Je dors mal, je m'isole, je n'ai plus envie de répondre aux messages.",
        },
      ],
    },
    {
      id: "ce-qui-aide",
      title: "Ce qui m'aide",
      fields: [
        {
          id: "aides",
          type: "tagList",
          label: "Ce qui me fait du bien et m'aide à me remettre en mouvement",
          help: "Un mot ou une courte expression par élément. Notez seulement ce qui fonctionne pour vous.",
        },
      ],
    },
    {
      id: "ce-qui-fragilise",
      title: "Ce qui me fragilise",
      intro: [
        {
          kind: "paragraph",
          text:
            "Connaître ce qui pèse sur vous aide à l'anticiper, sans aucune culpabilité. " +
            "Beaucoup de ce qui nous fragilise ne dépend pas de nous : repérer ces éléments, " +
            "ce n'est pas en porter la faute, c'est mieux s'y préparer.",
        },
      ],
      fields: [
        {
          id: "fragilites",
          type: "tagList",
          label: "Ce qui a tendance à me fragiliser",
          help: "Un mot ou une courte expression par élément.",
        },
      ],
    },
    {
      id: "personnes-ressources",
      title: "Personnes ressources",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ces personnes sont celles vers qui vous pouvez vous tourner pour souffler, parler ou " +
            "vous sentir moins seul·e. Par prudence, notez seulement un prénom ou un surnom, jamais " +
            "de coordonnées complètes : ce cahier reste dans votre navigateur, mais autant garder " +
            "ces informations légères.",
        },
      ],
      tables: [
        {
          id: "personnes",
          label: "Mes personnes ressources",
          addLabel: "Ajouter une personne",
          emptyLabel:
            "Personne de noté pour l'instant. Vous pourrez ajouter qui vous voulez, quand vous le sentez.",
          columns: [
            {
              id: "alias",
              type: "shortText",
              label: "Prénom ou surnom",
              help: "Pas de nom complet ni de numéro ici.",
              placeholder: "Ex. Sam",
            },
            {
              id: "lien",
              type: "shortText",
              label: "Ce que cette personne représente pour moi",
              placeholder: "Ex. Un·e ami·e, un·e pair-aidant·e.",
            },
            {
              id: "comment_joindre",
              type: "shortText",
              label: "Comment je peux la joindre",
              placeholder: "Ex. Lui écrire en soirée, l'appeler le week-end.",
            },
          ],
        },
      ],
    },
    {
      id: "lieux-phrases",
      title: "Lieux et phrases qui m'aident",
      fields: [
        {
          id: "lieux_surs",
          type: "tagList",
          label: "Des lieux où je me sens en sécurité, ou plus apaisé·e",
          help: "Un lieu par étiquette.",
        },
        {
          id: "phrases",
          type: "longText",
          label: "Des phrases qui me font du bien, me rassurent ou me redonnent du courage",
          placeholder: "Ex. « Ça va passer. » « Je n'ai pas à tout porter seul·e. »",
        },
      ],
    },
    {
      id: "mini-actions",
      title: "Mini-actions",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ce sont de toutes petites actions, faciles à enclencher même les jours sans énergie. " +
            "Inutile de viser grand : plus c'est simple, concret et léger, plus ça reste à portée " +
            "de main quand le reste paraît trop lourd.",
        },
      ],
      tables: [
        {
          id: "actions",
          label: "Mes mini-actions",
          addLabel: "Ajouter une mini-action",
          emptyLabel: "Rien pour l'instant. Vous pourrez en ajouter une toute simple quand vous voulez.",
          columns: [
            {
              id: "action",
              type: "shortText",
              label: "Action",
              placeholder: "Ex. Ouvrir la fenêtre et respirer un moment.",
            },
            {
              id: "quand",
              type: "shortText",
              label: "Un bon moment pour m'y mettre",
              placeholder: "Ex. Au réveil, avant de regarder mon téléphone.",
            },
          ],
        },
      ],
    },
    {
      id: "urgence",
      title: "Ressources d'urgence",
      intro: [
        {
          kind: "callout",
          tone: "attention",
          iconName: "shield-alert",
          text:
            "Ce cahier accompagne le quotidien, mais si vous êtes en danger immédiat ou si des " +
            "pensées de vous faire du mal vous traversent, ne restez pas seul·e : ces moments-là " +
            "demandent un soutien tout de suite. Vous pouvez joindre le 3114 (souffrance et " +
            "prévention du suicide, gratuit, 24h/24), le 15 (Samu) ou le 112 (urgences), et appeler " +
            "une personne de confiance. Demander de l'aide n'est jamais une faiblesse : c'est un " +
            "geste qui prend soin de votre vie.",
        },
      ],
    },
  ],
};

/* --- Définition composite ------------------------------------------------- */
export const recoveryCraig: CompositeDefinition = {
  engine: "composite",
  dominant: "wizard",
  slug: "recovery-craig",
  title: "Cahier de rétablissement",
  shortTitle: "Cahier de rétablissement",
  category: "parcours",
  iconName: "sunrise",
  accent: "blue",
  summary:
    "Un cahier doux pour cheminer vers le mieux-être, à votre rythme et selon vos envies : premiers pas, ressources, temps d'écriture et plan personnel.",
  estimatedMinutes: 30,
  sensitivity: "high",
  sourceCredit:
    "Inspiré de l'esprit de la pair-aidance et du rétablissement porté par Craig Lewis — adaptation entièrement originale",
  disclaimerKey: "retablissement",
  crisisLevel: "elevated",
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce cahier vous accompagne dans une réflexion personnelle sur le rétablissement, dans " +
        "l'esprit de la pair-aidance : avec chaleur, sans jugement, et en partant du principe que " +
        "vous êtes la personne la mieux placée pour parler de votre vie. Il ne pose aucun diagnostic " +
        "et ne remplace pas un accompagnement. Il n'y a ni bonne réponse, ni rythme attendu : vous " +
        "pouvez répondre, passer une question, vous arrêter ou revenir quand vous le souhaitez.",
    },
    {
      kind: "paragraph",
      text:
        "Rien de ce que vous écrivez ici n'est envoyé sur Internet : tout reste dans votre navigateur " +
        "et s'efface à la fermeture de l'onglet. Si vous voulez en garder une trace, vous pouvez " +
        "exporter votre cahier à tout moment.",
    },
  ],
  segments: [
    {
      id: "premiers-pas",
      title: "Premiers pas",
      iconName: "sunrise",
      summary: "Entrer en douceur, à partir de l'instant présent.",
      optional: true,
      ref: { engine: "wizard", body: premiersPas },
    },
    {
      id: "boite-ressources",
      title: "Ma boîte à ressources",
      iconName: "heart-handshake",
      summary: "Rassembler ce qui vous fait du bien, pour le garder à portée de main.",
      optional: true,
      ref: { engine: "worksheet", body: boiteRessources },
    },
    {
      id: "temps-ecriture",
      title: "Temps d'écriture",
      iconName: "pen-line",
      summary: "Cinq courts modules pour réfléchir à votre parcours, librement.",
      optional: true,
      ref: { engine: "wizard", body: tempsEcriture },
    },
    {
      id: "plan-mieux-etre",
      title: "Mon plan de mieux-être",
      iconName: "notebook-pen",
      summary: "Vos repères, vos appuis et vos personnes ressources au quotidien.",
      optional: true,
      ref: { engine: "worksheet", body: planMieuxEtre },
    },
  ],
};
