/**
 * Ressources de soutien et d'urgence, configurables par pays.
 * Affichées par le composant CrisisResources (renforcées sur les outils sensibles).
 */

export interface CrisisContact {
  name: string;
  detail: string;
  phone?: string;
  /** Lien (site, tchat). */
  href?: string;
  iconName: string;
}

export interface CrisisResourceSet {
  country: string;
  label: string;
  intro: string;
  contacts: CrisisContact[];
}

export const DEFAULT_COUNTRY = "FR";

const FR_RESOURCES: CrisisResourceSet = {
  country: "FR",
  label: "France",
  intro:
    "Si tu traverses un moment difficile ou que tu penses à te faire du mal, sache que tu n'es pas seul. " +
    "Ces lignes sont gratuites, confidentielles et joignables à toute heure.",
  contacts: [
    {
      name: "3114",
      detail: "Numéro national de prévention du suicide — 24h/24, 7j/7, gratuit.",
      phone: "3114",
      iconName: "phone-call",
    },
    {
      name: "SAMU — 15",
      detail: "Urgences médicales (détresse vitale).",
      phone: "15",
      iconName: "siren",
    },
    {
      name: "Urgences — 112",
      detail: "Numéro d'urgence européen.",
      phone: "112",
      iconName: "siren",
    },
    {
      name: "SOS Amitié",
      detail: "Écoute anonyme, 24h/24.",
      phone: "09 72 39 40 50",
      href: "https://www.sos-amitie.com/",
      iconName: "heart-handshake",
    },
  ],
};

export const CRISIS_RESOURCES: Record<string, CrisisResourceSet> = {
  FR: FR_RESOURCES,
};

export function getCrisisResources(country: string): CrisisResourceSet {
  return CRISIS_RESOURCES[country] ?? FR_RESOURCES;
}
