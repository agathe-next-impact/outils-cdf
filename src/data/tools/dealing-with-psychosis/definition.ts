import type { CompositeDefinition } from "@/engines/composite/types";
import type { ScoredBody, ScoredItem } from "@/engines/scored/types";
import type { WizardBody } from "@/engines/wizard/types";
import type { WorksheetBody } from "@/engines/worksheet/types";

/* -------------------------------------------------------------------------- */
/* S1 — Comprendre : les six facteurs (worksheet)                             */
/* -------------------------------------------------------------------------- */
const comprendre: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Il peut arriver d'entendre, de voir, de ressentir ou de penser des choses que les personnes " +
        "autour ne partagent pas. Ces moments sont parfois déroutants. Ce premier espace vous invite à " +
        "les décrire avec vos propres mots, sans étiquette imposée. Aucune réponse n'est attendue, et il " +
        "n'y a pas de bonne ou de mauvaise façon de remplir.",
    },
    {
      kind: "definition",
      term: "Un même vécu, plusieurs mots pour le dire",
      def:
        "Certaines personnes disent « psychose », d'autres « épisode », d'autres encore « expérience " +
        "difficile » ou « moment intense ». Ce sont autant de façons de nommer des instants où le " +
        "rapport à la réalité se modifie. Le mot qui vous parle le mieux est le bon : c'est le vôtre.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Regarder un même vécu sous plusieurs angles — ce qui se passe autour, dans le corps, dans les " +
        "pensées… — aide souvent à y voir un peu plus clair et à retrouver un peu de prise, à votre rythme.",
    },
  ],
  documentTitle: "Comprendre mon expérience",
  sections: [
    {
      id: "terme",
      title: "Le mot qui me convient",
      fields: [
        {
          id: "terme_prefere",
          type: "select",
          label: "Le mot que je préfère pour parler de ce que je vis",
          help: "Rien n'est définitif : vous pouvez en changer quand vous le souhaitez.",
          options: [
            { value: "psychose", label: "Psychose" },
            { value: "episode", label: "Épisode" },
            { value: "difficulte", label: "Difficulté" },
            { value: "autre", label: "Un autre mot, à moi" },
          ],
        },
      ],
    },
    {
      id: "facteurs",
      title: "Les six facteurs",
      intro: [
        {
          kind: "paragraph",
          text:
            "Un même moment peut se regarder selon six angles, qui souvent s'influencent les uns les " +
            "autres : la situation, le corps, les pensées, les perceptions, les émotions et les actions. " +
            "Remplissez ceux qui vous parlent et laissez les autres de côté, c'est très bien ainsi.",
        },
      ],
      fields: [
        {
          id: "facteur_situation",
          type: "longText",
          label: "La situation : où, avec qui, à quels moments cela m'arrive le plus souvent ?",
        },
        {
          id: "facteur_etat_physique",
          type: "longText",
          label: "Le corps : comment je me sens physiquement (fatigue, tension, faim, sommeil…) ?",
        },
        {
          id: "facteur_pensees",
          type: "longText",
          label: "Les pensées : quelles idées me traversent dans ces moments-là ?",
        },
        {
          id: "facteur_perceptions",
          type: "longText",
          label: "Les perceptions : qu'est-ce que je perçois (sons, voix, images, sensations) ?",
        },
        {
          id: "facteur_emotions",
          type: "longText",
          label: "Les émotions : qu'est-ce que je ressens (peur, colère, calme, curiosité…) ?",
        },
        {
          id: "facteur_actions",
          type: "longText",
          label: "Les actions : qu'est-ce que je fais alors, comment je réagis ?",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* S2 — Repérer ce qui revient (scored)                                       */
/* -------------------------------------------------------------------------- */
const REPERER_LABELS: string[] = [
  "Il m'arrive d'entendre des sons ou des voix que les personnes autour ne semblent pas entendre.",
  "Il m'arrive de voir des choses que les autres ne voient pas.",
  "Il m'arrive d'avoir l'impression qu'on me veut du mal ou qu'on m'observe.",
  "Mes pensées vont parfois si vite que j'ai du mal à les suivre.",
  "Il m'arrive d'avoir du mal à distinguer ce qui se passe vraiment de ce que j'imagine.",
  "Il m'arrive de me sentir coupé·e des autres ou du monde autour de moi.",
  "Mon sommeil change (je dors beaucoup moins, ou de façon très irrégulière).",
  "J'ai moins d'élan pour voir du monde ou faire mes activités habituelles.",
  "Il m'arrive d'avoir du mal à me concentrer ou à mener une tâche simple jusqu'au bout.",
  "Des idées inhabituelles prennent beaucoup de place dans mon esprit.",
];

const repererItems: ScoredItem[] = REPERER_LABELS.map((label, i) => ({
  id: `r${i + 1}`,
  label,
  scaleId: "frequence",
}));

const reperer: ScoredBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Voici quelques expériences que des personnes traversent parfois. Les parcourir n'est pas un " +
        "test : il s'agit simplement de remarquer, pour vous, ce qui revient en ce moment. Indiquer une " +
        "réponse ne veut rien dire en soi, et vous pouvez laisser autant de lignes que vous voulez sans " +
        "réponse.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Ce repère ne mesure rien et ne pose aucun diagnostic. Aucun résultat ne dira ce que vous " +
        "« avez ». Il peut seulement vous aider à voir ce qui, en ce moment, mériterait peut-être d'être " +
        "partagé avec une personne de confiance ou un·e professionnel·le.",
    },
  ],
  referencePeriod: "au cours des deux dernières semaines",
  scales: [
    {
      id: "frequence",
      options: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Parfois" },
        { value: 2, label: "Souvent" },
      ],
    },
  ],
  items: repererItems,
  scoring: {
    method: "sum",
    bandBasis: "sum",
    bands: [
      {
        code: "peu",
        min: 0,
        max: 9,
        label: "Peu de ces expériences reviennent en ce moment",
        tone: "neutral",
        guidance:
          "Pour l'instant, peu de ces expériences semblent fréquentes pour vous. Vous pouvez garder ce " +
          "repère en tête et revenir le parcourir plus tard, si quelque chose venait à changer.",
      },
      {
        code: "plusieurs",
        min: 10,
        max: 20,
        label: "Plusieurs de ces expériences reviennent",
        tone: "attention",
        guidance:
          "En ce moment, plusieurs de ces expériences reviennent souvent pour vous. Cela ne dit rien " +
          "d'un diagnostic et ne mesure aucune gravité. Si vous le souhaitez, en parler avec un·e " +
          "professionnel·le ou une personne de confiance peut être un appui : vous n'avez pas à attendre " +
          "que cela devienne plus difficile pour demander du soutien. Vous restez libre du moment et de " +
          "la manière.",
      },
    ],
  },
  allowIncomplete: true,
};

/* -------------------------------------------------------------------------- */
/* S3 — Prendre soin de soi (worksheet)                                       */
/* -------------------------------------------------------------------------- */
const prendreSoin: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Le sommeil, le mouvement, la façon dont on se nourrit ou dont on se détend pèsent beaucoup " +
        "dans notre équilibre. Ce carnet est là pour noter, sans pression et à votre rythme, quelques " +
        "repères du quotidien.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Il ne s'agit pas de tout remplir parfaitement, mais simplement de remarquer ce qui vous fait du bien.",
    },
  ],
  documentTitle: "Prendre soin de moi",
  sections: [
    {
      id: "sommeil",
      title: "Sommeil",
      intro: [
        {
          kind: "paragraph",
          text:
            "Noter quelques nuits suffit souvent pour repérer ce qui aide votre sommeil. Inutile de le " +
            "faire tous les jours : seulement quand vous en avez l'envie et l'énergie.",
        },
      ],
      tables: [
        {
          id: "sommeil_table",
          label: "Mes nuits",
          addLabel: "Noter une nuit",
          emptyLabel: "Notez une première nuit quand vous le souhaitez.",
          columns: [
            { id: "date", type: "date", label: "Date" },
            { id: "bedtime", type: "time", label: "Heure du coucher" },
            { id: "wake_time", type: "time", label: "Heure du réveil" },
            {
              id: "sleep_quality",
              type: "slider",
              label: "Qualité du sommeil",
              min: 1,
              max: 10,
              minLabel: "1 — très mauvaise",
              maxLabel: "10 — excellente",
            },
            { id: "caffeine_after_dinner", type: "checkbox", label: "Café / thé après le dîner" },
            {
              id: "alcohol_or_nicotine_before_bed",
              type: "checkbox",
              label: "Alcool ou nicotine avant de dormir",
            },
            { id: "nap_minutes", type: "number", label: "Sieste (minutes)", min: 0 },
            { id: "notes", type: "shortText", label: "Remarque" },
          ],
        },
      ],
    },
    {
      id: "activite",
      title: "Activité",
      intro: [
        {
          kind: "paragraph",
          text:
            "Bouger, même un peu, et faire des choses qui plaisent soutient l'humeur. Notez ce que " +
            "vous avez fait, à votre rythme.",
        },
      ],
      tables: [
        {
          id: "activite_table",
          label: "Mes activités",
          addLabel: "Noter une activité",
          emptyLabel: "Notez une première activité quand vous le souhaitez.",
          columns: [
            { id: "activity_type", type: "shortText", label: "Activité" },
            { id: "enjoyable", type: "checkbox", label: "Cela m'a fait du bien" },
            { id: "duration_minutes", type: "number", label: "Durée (minutes)", min: 0 },
            {
              id: "intensity",
              type: "slider",
              label: "Intensité",
              min: 1,
              max: 10,
              minLabel: "1 — très douce",
              maxLabel: "10 — très soutenue",
            },
            { id: "with_someone", type: "checkbox", label: "Avec quelqu'un" },
            { id: "notes", type: "shortText", label: "Remarque" },
          ],
        },
      ],
    },
    {
      id: "substances",
      title: "Alcool / autres substances",
      intro: [
        {
          kind: "paragraph",
          text:
            "Si l'alcool ou d'autres substances font partie de votre quotidien, vous pouvez réfléchir " +
            "ici à ce que vous y trouvez et à ce qui changerait si vous en consommiez moins. C'est un " +
            "espace de réflexion personnelle, sans jugement et sans réponse attendue.",
        },
        {
          kind: "callout",
          tone: "attention",
          text:
            "Cet espace n'est pas un programme de sevrage. Réduire ou arrêter certaines substances peut " +
            "demander un accompagnement, et certains arrêts brusques peuvent être inconfortables ou " +
            "risqués. Si un changement vous tente, parlez-en à un·e professionnel·le, et ne modifiez " +
            "jamais un traitement en cours sans en parler avec la personne qui vous le prescrit.",
        },
      ],
      fields: [
        {
          id: "substance_label",
          type: "shortText",
          label: "La substance dont je veux parler",
        },
        {
          id: "reduction_advantages",
          type: "longText",
          label: "Ce que je gagnerais à en consommer moins (pour moi, mon sommeil, mes proches…)",
        },
        {
          id: "slips_notes",
          type: "longText",
          label: "Ce qui rend cela difficile, et ce qui pourrait m'aider",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* S4 — Gérer le stress (worksheet)                                           */
/* -------------------------------------------------------------------------- */
const gererStress: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Le stress peut amplifier certaines expériences. Apprendre à le faire redescendre, un peu à la " +
        "fois, est quelque chose qui se cultive comme une habileté : sans urgence, par petites touches. " +
        "Ce carnet rassemble vos propres repères pour vous détendre.",
    },
  ],
  documentTitle: "Gérer mon stress",
  sections: [
    {
      id: "relaxantes",
      title: "Activités relaxantes",
      intro: [
        {
          kind: "paragraph",
          text:
            "Notez ce qui vous apaise, même les toutes petites choses : marcher, écouter de la musique, " +
            "respirer, caresser un animal… Tout ce qui vous fait du bien a sa place ici.",
        },
      ],
      fields: [
        {
          id: "activites_relaxantes",
          type: "tagList",
          label: "Ce qui m'apaise (un mot ou une expression par étiquette)",
          help: "Vous pourrez en ajouter, en retirer ou en changer au fil du temps.",
        },
      ],
    },
    {
      id: "pratiques",
      title: "Pratiques",
      intro: [
        {
          kind: "paragraph",
          text:
            "Notez les techniques que vous essayez et l'effet ressenti. Comparer le stress avant et " +
            "après aide à repérer ce qui marche pour vous.",
        },
      ],
      tables: [
        {
          id: "pratiques_table",
          label: "Mes pratiques de détente",
          addLabel: "Noter une pratique",
          emptyLabel: "Notez une première pratique quand vous le souhaitez.",
          columns: [
            {
              id: "technique",
              type: "select",
              label: "Technique",
              options: [
                { value: "respiration", label: "Respiration" },
                { value: "visualisation", label: "Visualisation" },
                { value: "relaxation_musculaire", label: "Relaxation musculaire" },
                { value: "activite_calme", label: "Activité calme" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "duration_minutes", type: "number", label: "Durée (minutes)", min: 0 },
            {
              id: "stress_before",
              type: "slider",
              label: "Stress avant",
              min: 1,
              max: 10,
              minLabel: "1 — calme",
              maxLabel: "10 — très tendu·e",
            },
            {
              id: "stress_after",
              type: "slider",
              label: "Stress après",
              min: 1,
              max: 10,
              minLabel: "1 — calme",
              maxLabel: "10 — très tendu·e",
            },
            { id: "notes", type: "shortText", label: "Remarque" },
          ],
        },
      ],
    },
    {
      id: "preparer",
      title: "Préparer une situation",
      intro: [
        {
          kind: "paragraph",
          text:
            "Une situation vous inquiète à l'avance ? La préparer, et même la répéter en pensée ou à " +
            "voix haute, peut alléger le stress le jour venu. Vous pouvez aussi la préparer avec une " +
            "personne de confiance, si vous le souhaitez.",
        },
      ],
      fields: [
        {
          id: "situation",
          type: "longText",
          label: "La situation que je veux préparer",
        },
        { id: "expected_date", type: "date", label: "Date prévue (si elle est connue)" },
        {
          id: "stress_before",
          type: "slider",
          label: "Mon stress quand j'y pense aujourd'hui",
          min: 1,
          max: 10,
          minLabel: "1 — calme",
          maxLabel: "10 — très tendu·e",
        },
        {
          id: "preparation_steps",
          type: "longText",
          label: "Ce que je peux préparer ou prévoir",
        },
        { id: "rehearsed", type: "checkbox", label: "Je l'ai répétée en pensée ou à voix haute" },
        {
          id: "stress_after",
          type: "slider",
          label: "Mon stress après préparation",
          min: 1,
          max: 10,
          minLabel: "1 — calme",
          maxLabel: "10 — très tendu·e",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* S5 — Résoudre un problème (wizard, 6 étapes)                               */
/* -------------------------------------------------------------------------- */
const resoudreProbleme: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Un problème qui tourne en boucle paraît souvent plus gros qu'il n'est en réalité. Le découper " +
        "en petites étapes aide à retrouver un peu de prise. Avancez une étape à la fois, sans vous " +
        "presser : vous pouvez faire une pause et revenir quand vous le voulez.",
    },
  ],
  steps: [
    {
      id: "choisir",
      title: "1. Choisir un problème",
      intro: [
        {
          kind: "paragraph",
          text:
            "Choisissez une seule difficulté à explorer pour commencer, de préférence une qui vous " +
            "paraît abordable. Les plus grandes pourront attendre un autre moment.",
        },
      ],
      fields: [
        {
          id: "problem_title",
          type: "shortText",
          label: "Le problème, en quelques mots",
          placeholder: "Ex. Je n'arrive plus à payer mes factures à temps.",
        },
        {
          id: "problem_description",
          type: "longText",
          label: "En quoi cela me pose problème, concrètement ?",
        },
        {
          id: "stress_rating",
          type: "slider",
          label: "À quel point ce problème me stresse en ce moment",
          min: 1,
          max: 10,
          minLabel: "1 — léger",
          maxLabel: "10 — très lourd",
        },
      ],
      pitfalls: [
        {
          id: "vague-problem",
          appliesToFieldId: "problem_title",
          detector: "tooVague",
          message:
            "Plus le problème est précis, plus il devient abordable. « Tout va mal » est difficile à " +
            "saisir ; « je n'arrive pas à me lever le matin » offre déjà un meilleur point de départ.",
        },
      ],
    },
    {
      id: "comprendre",
      title: "2. Comprendre",
      fields: [
        {
          id: "previous_occurrence",
          type: "longText",
          label: "Ce problème (ou un proche) m'est-il déjà arrivé ? Comment cela s'est passé ?",
        },
        {
          id: "missing_information",
          type: "longText",
          label: "Qu'est-ce que je ne sais pas encore et qui m'aiderait à décider ?",
        },
        {
          id: "other_ideas",
          type: "longText",
          label: "Y a-t-il d'autres façons de voir ce problème ?",
        },
      ],
    },
    {
      id: "idees",
      title: "3. Trouver des idées",
      intro: [
        {
          kind: "paragraph",
          text:
            "Notez toutes les pistes qui vous viennent, même celles qui semblent improbables. Rien n'est " +
            "à juger pour l'instant : le tri viendra à l'étape suivante.",
        },
      ],
      fields: [
        {
          id: "brainstorm_helpers",
          type: "tagList",
          label: "Qui ou quoi pourrait m'aider à trouver des idées ? (personnes, lieux, ressources)",
        },
        {
          id: "solution_options",
          type: "repeatableList",
          label: "Mes idées de solutions",
          help: "Une ligne par idée. On évaluera le pour et le contre à l'étape suivante.",
          addLabel: "Ajouter une idée",
          itemSchema: [
            { id: "description", type: "shortText", label: "Idée" },
            { id: "positives", type: "shortText", label: "Avantages" },
            { id: "negatives", type: "shortText", label: "Inconvénients" },
            {
              id: "comfort_rating",
              type: "slider",
              label: "À l'aise avec cette idée",
              min: 1,
              max: 10,
              minLabel: "1 — pas du tout",
              maxLabel: "10 — tout à fait",
            },
            { id: "feasible", type: "checkbox", label: "Réalisable pour moi" },
          ],
        },
      ],
    },
    {
      id: "comparer",
      title: "4. Comparer",
      intro: [
        {
          kind: "paragraph",
          text:
            "Reprenez vos idées et complétez, pour chacune, les avantages, les inconvénients et le " +
            "confort qu'elle vous inspire. Les pistes à la fois réalisables et confortables font souvent " +
            "un bon point de départ.",
        },
      ],
      fields: [
        {
          id: "comparison_notes",
          type: "longText",
          label: "Ce qui ressort de la comparaison",
        },
        {
          id: "weighing_helpers",
          type: "tagList",
          label: "Critères qui comptent le plus pour moi (coût, temps, soutien, calme…)",
        },
      ],
    },
    {
      id: "decider",
      title: "5. Décider",
      fields: [
        {
          id: "chosen_solution",
          type: "longText",
          label: "La solution que je choisis d'essayer",
        },
        {
          id: "chosen_solution_reason",
          type: "longText",
          label: "Pourquoi celle-ci ? Qu'est-ce qui me convient dedans ?",
        },
      ],
    },
    {
      id: "agir",
      title: "6. Agir",
      fields: [
        {
          id: "first_action",
          type: "longText",
          label: "La toute première action concrète que je peux faire",
          placeholder: "Ex. Appeler le secrétariat lundi matin.",
        },
        { id: "review_date", type: "date", label: "Date où je ferai le point" },
      ],
      pitfalls: [
        {
          id: "vague-first-action",
          appliesToFieldId: "first_action",
          detector: "tooVague",
          message:
            "Une action très concrète est plus facile à enclencher. « M'organiser » reste flou ; « ranger " +
            "les papiers pendant 15 minutes mardi » est un premier pas net.",
        },
        {
          id: "no-verb-first-action",
          appliesToFieldId: "first_action",
          detector: "missingActionVerb",
          message:
            "Commencer par un verbe d'action (appeler, écrire, demander, ranger…) aide à enclencher le mouvement.",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message:
      "Vous avez transformé un problème qui pesait en un premier pas concret. C'est déjà beaucoup. " +
      "Voici votre synthèse.",
  },
};

/* -------------------------------------------------------------------------- */
/* S6 — Se fixer un objectif (wizard)                                         */
/* -------------------------------------------------------------------------- */
const objectif: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Un objectif n'a pas besoin d'être grand pour compter. Ce qui importe, c'est qu'il vous tienne " +
        "à cœur et qu'il reste à votre portée. Un tout petit objectif atteint vaut mieux qu'un grand " +
        "rêve trop lourd. Définissons le vôtre ensemble, doucement.",
    },
  ],
  steps: [
    {
      id: "definir",
      title: "1. Mon objectif",
      fields: [
        {
          id: "title",
          type: "shortText",
          label: "Ce que j'aimerais faire ou atteindre",
          placeholder: "Ex. Marcher 10 minutes dehors.",
        },
        {
          id: "larger_goal_context",
          type: "shortText",
          label: "À quel projet ou envie plus large cela se rattache-t-il ?",
        },
      ],
      pitfalls: [
        {
          id: "vague-goal",
          appliesToFieldId: "title",
          detector: "tooVague",
          message:
            "Un objectif précis est plus facile à viser. « Aller mieux » est très large ; « sortir " +
            "marcher deux fois cette semaine » donne déjà un cap clair.",
        },
      ],
    },
    {
      id: "preciser",
      title: "2. Le rendre concret",
      fields: [
        { id: "frequency", type: "shortText", label: "À quelle fréquence ? (ex. deux fois par semaine)" },
        { id: "location", type: "shortText", label: "Où, dans quel cadre ?" },
        {
          id: "realistic_rating",
          type: "slider",
          label: "À quel point cet objectif me paraît réaliste",
          min: 1,
          max: 10,
          minLabel: "1 — difficile",
          maxLabel: "10 — tout à fait à ma portée",
        },
      ],
    },
    {
      id: "motiver",
      title: "3. Me motiver",
      intro: [
        {
          kind: "callout",
          tone: "info",
          text:
            "Si l'objectif n'est pas atteint, ce n'est pas un échec : c'est juste une information. On " +
            "peut le revoir à la baisse, le découper en plus petit, ou changer de moment. Avancer compte " +
            "bien plus que réussir du premier coup.",
        },
      ],
      fields: [
        {
          id: "reward",
          type: "shortText",
          label: "Une petite chose qui me ferait plaisir quand j'y arrive",
        },
        {
          id: "first_step",
          type: "longText",
          label: "Le tout premier petit pas vers cet objectif",
          placeholder: "Ex. Préparer mes chaussures ce soir.",
        },
      ],
      pitfalls: [
        {
          id: "vague-first-step",
          appliesToFieldId: "first_step",
          detector: "tooVague",
          message:
            "Un premier pas minuscule et concret est le plus facile à franchir. Plus c'est petit, mieux c'est.",
        },
      ],
    },
  ],
  reward: { confetti: true, message: "Bel objectif. Le premier pas est souvent le plus précieux." },
};

/* -------------------------------------------------------------------------- */
/* S7 — Se relier aux autres (worksheet)                                      */
/* -------------------------------------------------------------------------- */
const relier: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Le lien aux autres est un grand appui dans les moments difficiles. Ce carnet aide à repérer " +
        "qui compte autour de vous et quelles habiletés relationnelles vous aimeriez cultiver, à votre " +
        "mesure.",
    },
  ],
  documentTitle: "Me relier aux autres",
  sections: [
    {
      id: "cercle",
      title: "Cercle social",
      intro: [
        {
          kind: "paragraph",
          text:
            "Notez les personnes sur qui vous pouvez compter. Utilisez un prénom ou un surnom — pas " +
            "besoin de noms complets ni de coordonnées.",
        },
      ],
      tables: [
        {
          id: "cercle_table",
          label: "Les personnes de mon entourage",
          addLabel: "Ajouter une personne",
          emptyLabel: "Ajoutez une première personne quand vous le souhaitez.",
          columns: [
            { id: "name_or_alias", type: "shortText", label: "Prénom ou surnom" },
            {
              id: "category",
              type: "select",
              label: "Lien",
              options: [
                { value: "famille", label: "Famille" },
                { value: "amis", label: "Amis" },
                { value: "professionnels", label: "Professionnels" },
                { value: "autres", label: "Autres" },
              ],
            },
            {
              id: "support_level",
              type: "slider",
              label: "Soutien ressenti",
              min: 1,
              max: 10,
              minLabel: "1 — faible",
              maxLabel: "10 — fort",
            },
            { id: "notes", type: "shortText", label: "Remarque" },
          ],
        },
      ],
    },
    {
      id: "competences",
      title: "Compétences à pratiquer",
      intro: [
        {
          kind: "paragraph",
          text:
            "Les habiletés relationnelles s'apprennent et se travaillent comme les autres. Choisissez-en " +
            "une à la fois, et notez si vous le souhaitez comment vous vous sentez avant et après l'avoir " +
            "pratiquée.",
        },
      ],
      tables: [
        {
          id: "competences_table",
          label: "Mes compétences relationnelles",
          addLabel: "Ajouter une compétence",
          emptyLabel: "Ajoutez une première compétence quand vous le souhaitez.",
          columns: [
            {
              id: "skill",
              type: "select",
              label: "Compétence",
              options: [
                { value: "ecouter", label: "Écouter" },
                { value: "demander_aide", label: "Demander de l'aide" },
                { value: "exprimer_besoin", label: "Exprimer un besoin" },
                { value: "dire_non", label: "Dire non" },
                { value: "engager_conversation", label: "Engager une conversation" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "needs_practice", type: "checkbox", label: "À pratiquer" },
            { id: "practice_plan", type: "shortText", label: "Comment je vais m'entraîner" },
            {
              id: "confidence_before",
              type: "slider",
              label: "Confiance avant",
              min: 1,
              max: 10,
              minLabel: "1 — faible",
              maxLabel: "10 — forte",
            },
            {
              id: "confidence_after",
              type: "slider",
              label: "Confiance après",
              min: 1,
              max: 10,
              minLabel: "1 — faible",
              maxLabel: "10 — forte",
            },
          ],
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* S8 — Mon plan de prévention (worksheet)                                    */
/* -------------------------------------------------------------------------- */
const prevention: WorksheetBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Ce plan rassemble ce qui peut déclencher une période difficile, les signes qui l'annoncent, " +
        "et ce que vous — et les personnes de confiance autour de vous — pouvez faire. C'est un " +
        "document qui vous appartient : à garder, à relire et à partager avec qui vous voulez, ou à " +
        "garder pour vous.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Ce plan se construit bien avec une personne de confiance ou un·e professionnel·le qui vous " +
        "accompagne. Rien ne vous oblige à le remplir d'un seul coup : vous pouvez y revenir et le faire " +
        "évoluer dans le temps.",
    },
  ],
  documentTitle: "Mon plan de prévention",
  sections: [
    {
      id: "declencheurs",
      title: "Déclencheurs",
      intro: [
        {
          kind: "paragraph",
          text:
            "Ce qui, en ce moment, a tendance à fragiliser votre équilibre. Notez ce qui vous parle et " +
            "laissez le reste de côté.",
        },
      ],
      tables: [
        {
          id: "declencheurs_table",
          label: "Mes déclencheurs",
          addLabel: "Ajouter un déclencheur",
          emptyLabel: "Ajoutez un premier déclencheur quand vous le souhaitez.",
          columns: [
            {
              id: "declencheur",
              type: "select",
              label: "Type",
              options: [
                { value: "manque_sommeil", label: "Manque de sommeil" },
                { value: "stress", label: "Stress ou surcharge" },
                { value: "conflit", label: "Conflit / tension relationnelle" },
                { value: "isolement", label: "Isolement" },
                { value: "substances", label: "Alcool / substances" },
                { value: "changement", label: "Grand changement" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "description", type: "shortText", label: "Précision" },
            { id: "plan_de_controle", type: "longText", label: "Comment je peux le limiter ou m'y préparer" },
          ],
        },
      ],
    },
    {
      id: "signes",
      title: "Signes précoces",
      intro: [
        {
          kind: "paragraph",
          text:
            "Les premiers signaux qui, chez vous, annoncent qu'une période difficile approche. Les " +
            "repérer tôt laisse plus de marge pour réagir en douceur, avant que cela ne s'intensifie.",
        },
      ],
      tables: [
        {
          id: "signes_table",
          label: "Mes signes précoces",
          addLabel: "Ajouter un signe",
          emptyLabel: "Ajoutez un premier signe quand vous le souhaitez.",
          columns: [
            { id: "description", type: "shortText", label: "Le signe" },
            { id: "observable", type: "checkbox", label: "Visible aussi pour mes proches" },
            { id: "seuil", type: "shortText", label: "À partir de quand cela m'alerte" },
          ],
        },
      ],
    },
    {
      id: "actions",
      title: "Actions / urgence",
      intro: [
        {
          kind: "callout",
          tone: "attention",
          text:
            "Si vous le pouvez, construisez ces actions avec un·e professionnel·le qui vous accompagne. " +
            "N'indiquez aucune dose de médicament ici : tout ajustement de traitement se décide avec la " +
            "personne qui vous le prescrit, jamais seul·e. Et si vous vous sentez en danger immédiat, ne " +
            "restez pas seul·e : appelez le 3114 (prévention du suicide), le 15 (Samu) ou le 112, ou " +
            "contactez une personne de confiance sans attendre.",
        },
      ],
      fields: [
        {
          id: "actions_signes",
          type: "longText",
          label: "Ce que je fais dès que je repère mes signes précoces",
        },
        {
          id: "actions_urgence",
          type: "longText",
          label: "En cas d'urgence : qui contacter et quoi faire (sans détail de médicament)",
        },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* S9 — Faire face aux pensées difficiles (wizard)                            */
/* -------------------------------------------------------------------------- */
const penseesDifficiles: WizardBody = {
  intro: [
    {
      kind: "paragraph",
      text:
        "Certaines pensées ou certaines voix peuvent prendre beaucoup de place et devenir " +
        "envahissantes. Cet exercice propose de les regarder avec un peu de recul, étape par étape. Le " +
        "but n'est pas de prouver qu'elles ont tort, mais de desserrer un peu leur emprise.",
    },
  ],
  steps: [
    {
      id: "situation",
      title: "1. La situation",
      intro: [
        {
          kind: "callout",
          tone: "attention",
          text:
            "Cet exercice peut être éprouvant si les expériences sont intenses en ce moment. Si c'est " +
            "trop lourd, vous pouvez le faire avec une personne de confiance, ou le mettre de côté et y " +
            "revenir plus tard : rien ne presse. Et si une pensée vous fait peur ou si vous vous sentez " +
            "en danger, contactez une personne de confiance ou les ressources d'aide d'urgence (3114, " +
            "15 ou 112) sans attendre.",
        },
      ],
      fields: [
        {
          id: "situation_facts",
          type: "longText",
          label:
            "La situation, décrite comme une caméra l'aurait filmée : les faits seuls, sans interprétation",
        },
      ],
    },
    {
      id: "pensee",
      title: "2. Ce que la pensée ou la voix dit",
      intro: [
        {
          kind: "paragraph",
          text:
            "Notez ce que la pensée ou la voix affirme, comme une citation rapportée. Il ne s'agit pas " +
            "de trancher si c'est vrai ou faux, mais simplement de le mettre par écrit pour pouvoir le " +
            "regarder de l'extérieur.",
        },
      ],
      fields: [
        {
          id: "automatic_thoughts",
          type: "longText",
          label: "Ce que la pensée ou la voix me dit (entre guillemets, si possible)",
        },
      ],
    },
    {
      id: "pour",
      title: "3. Ce qui va dans son sens",
      fields: [
        {
          id: "evidence_for",
          type: "longText",
          label: "Qu'est-ce qui, dans les faits autour de moi, semble aller dans le sens de cette pensée ?",
        },
      ],
    },
    {
      id: "contre",
      title: "4. Ce qui va à l'encontre",
      fields: [
        {
          id: "evidence_against",
          type: "longText",
          label: "Qu'est-ce qui, dans les faits autour de moi, va plutôt à l'encontre de cette pensée ?",
        },
      ],
    },
    {
      id: "realiste",
      title: "5. Une lecture plus nuancée",
      intro: [
        {
          kind: "paragraph",
          text:
            "Une vérification se fait toujours mieux avec une personne en qui vous avez confiance, en " +
            "dehors de cet outil. Si une pensée vous inquiète ou vous fait peur, en parler à quelqu'un de " +
            "confiance est souvent bien plus apaisant que de rester seul·e avec elle.",
        },
      ],
      fields: [
        {
          id: "more_realistic_thoughts",
          type: "longText",
          label: "En tenant compte de tout cela, comment pourrais-je voir les choses autrement ?",
        },
        {
          id: "distress_before",
          type: "slider",
          label: "Ma détresse avant l'exercice",
          min: 1,
          max: 10,
          minLabel: "1 — légère",
          maxLabel: "10 — très forte",
        },
        {
          id: "distress_after",
          type: "slider",
          label: "Ma détresse après l'exercice",
          min: 1,
          max: 10,
          minLabel: "1 — légère",
          maxLabel: "10 — très forte",
        },
      ],
    },
  ],
  reward: {
    confetti: true,
    message:
      "Vous avez pris le temps de regarder une pensée difficile d'un peu plus près. C'est courageux, et " +
      "vous pouvez y revenir aussi souvent que vous le souhaitez.",
  },
};

/* -------------------------------------------------------------------------- */
/* Composite                                                                  */
/* -------------------------------------------------------------------------- */
export const dealingWithPsychosis: CompositeDefinition = {
  engine: "composite",
  dominant: "worksheet",
  slug: "dealing-with-psychosis",
  title: "Composer avec la psychose",
  shortTitle: "Composer avec la psychose",
  category: "parcours",
  iconName: "compass",
  accent: "blue",
  summary:
    "Une boîte à outils pour comprendre et apprivoiser des expériences intenses, à votre rythme et sans diagnostic.",
  keywords: ["psychose", "hallucinations", "entendre des voix", "voix", "idées délirantes", "paranoïa", "déclencheurs", "signes précurseurs"],
  estimatedMinutes: 25,
  sensitivity: "high",
  sourceCredit:
    "Inspiré de l'approche du toolkit Dealing with Psychosis (Fraser Health, Colombie-Britannique) — adaptation originale",
  disclaimerKey: "psychose",
  crisisLevel: "elevated",
  intro: [
    {
      kind: "paragraph",
      text:
        "Cette boîte à outils réunit neuf espaces pour comprendre, observer et composer avec des " +
        "expériences parfois déroutantes ou intenses. Explorez-les dans l'ordre qui vous convient, " +
        "remplissez ceux qui vous parlent et laissez les autres de côté : il n'y a ni parcours " +
        "obligatoire, ni bonne réponse, ni rythme attendu.",
    },
    {
      kind: "callout",
      tone: "info",
      text:
        "Aucun de ces espaces ne pose de diagnostic ni ne met d'étiquette à votre place. Vous êtes " +
        "libre de vous arrêter, de passer une question ou de revenir plus tard. Rien de ce que vous " +
        "notez n'est envoyé sur Internet : tout reste dans votre navigateur et s'efface à la fermeture " +
        "de l'onglet.",
    },
    {
      kind: "callout",
      tone: "attention",
      text:
        "Cet outil ne donne aucun conseil de traitement. Ne commencez, n'arrêtez ni ne modifiez jamais " +
        "un médicament sans en parler avec la personne qui vous le prescrit. Si vous vous sentez en " +
        "danger ou dépassé·e, ne restez pas seul·e : contactez une personne de confiance ou les " +
        "ressources d'aide indiquées sur cette page.",
    },
  ],
  segments: [
    {
      id: "comprendre",
      title: "Comprendre — les six facteurs",
      iconName: "lightbulb",
      summary: "Décrire son expérience sous six angles.",
      optional: true,
      ref: { engine: "worksheet", body: comprendre },
    },
    {
      id: "reperer",
      title: "Repérer ce qui revient",
      iconName: "eye",
      summary: "Remarquer, sans se juger, ce qui revient en ce moment.",
      optional: true,
      ref: { engine: "scored", body: reperer },
    },
    {
      id: "prendre-soin",
      title: "Prendre soin de soi",
      iconName: "heart-pulse",
      summary: "Sommeil, activité et substances, au jour le jour.",
      optional: true,
      ref: { engine: "worksheet", body: prendreSoin },
    },
    {
      id: "gerer-stress",
      title: "Gérer le stress",
      iconName: "wind",
      summary: "Des pratiques de détente et la préparation des situations.",
      optional: true,
      ref: { engine: "worksheet", body: gererStress },
    },
    {
      id: "resoudre-probleme",
      title: "Résoudre un problème",
      iconName: "target",
      summary: "Six étapes pour transformer un problème en premier pas.",
      optional: true,
      ref: { engine: "wizard", body: resoudreProbleme },
    },
    {
      id: "objectif",
      title: "Se fixer un objectif",
      iconName: "flag",
      summary: "Définir un objectif à sa portée, sans pression.",
      optional: true,
      ref: { engine: "wizard", body: objectif },
    },
    {
      id: "relier",
      title: "Se relier aux autres",
      iconName: "users",
      summary: "Repérer ses appuis et cultiver le lien.",
      optional: true,
      ref: { engine: "worksheet", body: relier },
    },
    {
      id: "prevention",
      title: "Mon plan de prévention",
      iconName: "shield-check",
      summary: "Déclencheurs, signes précoces et actions, à garder.",
      optional: true,
      ref: { engine: "worksheet", body: prevention },
    },
    {
      id: "pensees-difficiles",
      title: "Faire face aux pensées difficiles",
      iconName: "brain",
      summary: "Regarder une pensée ou une voix avec un peu de recul.",
      optional: true,
      ref: { engine: "wizard", body: penseesDifficiles },
    },
  ],
};
