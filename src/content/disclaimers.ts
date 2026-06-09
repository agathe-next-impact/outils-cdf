/**
 * Avertissements (garde-fous). Chaque outil référence une clé via `disclaimerKey`.
 * Ton non culpabilisant, non diagnostique, rappelant la liberté d'arrêter.
 */

export interface Disclaimer {
  short: string;
  long: string;
}

const DEFAULT: Disclaimer = {
  short:
    "Cet outil t'aide à observer et à réfléchir. Il ne pose aucun diagnostic et ne remplace pas un professionnel.",
  long:
    "Cet outil est un support d'auto-observation et de soutien. Il ne pose aucun diagnostic, " +
    "ne propose aucun traitement et ne remplace pas l'accompagnement d'un professionnel de santé. " +
    "Tu peux t'arrêter à tout moment, laisser une question de côté, et effacer tes réponses quand tu veux.",
};

const QUESTIONNAIRE: Disclaimer = {
  short:
    "Ce questionnaire est un repère pour toi, pas un diagnostic. Le score sert à suivre, pas à te juger.",
  long:
    "Ce questionnaire t'offre un repère pour observer ton vécu sur une période donnée. " +
    "Le score obtenu n'est pas un diagnostic : il n'indique ni maladie, ni gravité « officielle ». " +
    "Il peut t'aider à suivre une évolution dans le temps et, si tu le souhaites, à en parler avec un professionnel. " +
    "Tu peux laisser des questions de côté.",
};

const CRISE: Disclaimer = {
  short:
    "Cet outil t'aide à préparer et à anticiper. En cas de danger immédiat, contacte les ressources d'urgence.",
  long:
    "Cet outil t'aide à préparer, à ton rythme, un document qui n'appartient qu'à toi. " +
    "Il ne remplace pas un suivi ni une intervention d'urgence. Si tu es en danger immédiat ou " +
    "que tu penses à te faire du mal, contacte sans attendre les ressources d'urgence indiquées sur cette page. " +
    "Ce que tu notes et ce que tu partages, c'est toi qui en décides.",
};

const RETABLISSEMENT: Disclaimer = {
  short:
    "Le rétablissement, c'est ton chemin. Ça peut être long — et ça vaut le coup. Un pas à la fois, à ton rythme.",
  long:
    "Cet outil accompagne ta réflexion sur le rétablissement. Il n'y a ni bonne ni mauvaise réponse, " +
    "ni rythme attendu : tu es libre de répondre, de passer, de revenir plus tard, ou de t'arrêter. " +
    "Avancer petit à petit, c'est déjà avancer. " +
    "Il ne pose aucun diagnostic et ne remplace pas un accompagnement professionnel.",
};

const PSYCHOSE: Disclaimer = {
  short:
    "Cet outil t'aide à observer et à composer avec des expériences intenses. Il ne pose aucun diagnostic. Ne modifie jamais ton traitement sans en parler avec la personne qui te le prescrit.",
  long:
    "Cet outil propose des repères pour comprendre et apprivoiser des expériences parfois déroutantes ou intenses, à ton rythme. " +
    "Il ne pose aucun diagnostic, ne met aucune étiquette à ta place et ne remplace pas l'accompagnement d'un professionnel de santé. " +
    "Il ne donne aucun conseil de traitement : ne commence, n'arrête ni ne modifie jamais un médicament sans en parler avec la personne qui te le prescrit. " +
    "Tu es libre de répondre, de laisser une question de côté, de revenir plus tard ou de t'arrêter à tout moment. Rien de ce que tu notes ne part sur Internet : tout reste sur ton appareil et s'efface à la fermeture de l'onglet. " +
    "Si tu te sens en danger, dépassé, ou que certaines expériences t'effraient, ne reste pas seul : contacte une personne de confiance ou les ressources d'aide indiquées sur cette page.",
};

export const DISCLAIMERS: Record<string, Disclaimer> = {
  default: DEFAULT,
  questionnaire: QUESTIONNAIRE,
  crise: CRISE,
  retablissement: RETABLISSEMENT,
  psychose: PSYCHOSE,
};

export function getDisclaimer(key: string): Disclaimer {
  return DISCLAIMERS[key] ?? DEFAULT;
}
