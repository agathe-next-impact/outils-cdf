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
    "Cet outil aide à observer et à réfléchir. Il ne pose aucun diagnostic et ne remplace pas un professionnel.",
  long:
    "Cet outil est un support d'auto-observation et de soutien. Il ne pose aucun diagnostic, " +
    "ne propose aucun traitement et ne remplace pas l'accompagnement d'un·e professionnel·le de santé. " +
    "Vous pouvez vous arrêter à tout moment, ne pas répondre à une question, et effacer vos réponses quand vous le souhaitez.",
};

const QUESTIONNAIRE: Disclaimer = {
  short:
    "Ce questionnaire est un repère personnel, pas un diagnostic. Les scores servent au suivi, pas à se juger.",
  long:
    "Ce questionnaire propose un repère pour mieux observer votre vécu sur une période donnée. " +
    "Le score obtenu n'est pas un diagnostic : il n'indique ni maladie, ni gravité « officielle ». " +
    "Il peut aider à suivre une évolution dans le temps et, si besoin, à en parler avec un·e professionnel·le. " +
    "Vous pouvez laisser des questions sans réponse.",
};

const CRISE: Disclaimer = {
  short:
    "Cet outil aide à préparer et anticiper. En cas de danger immédiat, contactez les ressources d'urgence.",
  long:
    "Cet outil vous aide à préparer, à votre rythme, un document qui vous appartient. " +
    "Il ne remplace pas un suivi ni une intervention d'urgence. Si vous êtes en danger immédiat ou " +
    "pensez à vous faire du mal, contactez sans attendre les ressources d'urgence indiquées sur cette page. " +
    "Vous restez seul·e maître·sse de ce que vous notez et partagez.",
};

const RETABLISSEMENT: Disclaimer = {
  short:
    "Le rétablissement est un cheminement personnel. Avancez à votre rythme, sans pression.",
  long:
    "Cet outil accompagne une réflexion personnelle sur le rétablissement. Il n'y a ni bonne ni mauvaise réponse, " +
    "ni rythme attendu. Vous êtes libre de répondre, de passer, de revenir plus tard, ou de vous arrêter. " +
    "Il ne pose aucun diagnostic et ne remplace pas un accompagnement professionnel.",
};

const PSYCHOSE: Disclaimer = {
  short:
    "Cet outil aide à observer et à composer avec des expériences intenses. Il ne pose aucun diagnostic. Ne modifiez jamais votre traitement sans en parler avec la personne qui vous le prescrit.",
  long:
    "Cet outil propose des repères pour comprendre et apprivoiser des expériences parfois déroutantes ou intenses, à votre rythme. " +
    "Il ne pose aucun diagnostic, ne met aucune étiquette à votre place et ne remplace pas l'accompagnement d'un·e professionnel·le de santé. " +
    "Il ne donne aucun conseil de traitement : ne commencez, n'arrêtez ni ne modifiez jamais un médicament sans en parler avec la personne qui vous le prescrit. " +
    "Vous êtes libre de répondre, de passer une question, de revenir plus tard ou de vous arrêter à tout moment ; rien de ce que vous notez n'est envoyé sur Internet : tout reste dans votre navigateur et s'efface à la fermeture de l'onglet. " +
    "Si vous vous sentez en danger, dépassé·e ou que certaines expériences vous effraient, ne restez pas seul·e : contactez une personne de confiance ou les ressources d'aide indiquées sur cette page.",
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
