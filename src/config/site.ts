/**
 * Source de vérité de l'identité du site « Peer to Peer ».
 *
 * Le produit s'appelle **Peer to Peer** ; il est édité et porté par la société
 * **Next Impact**. Aucun lien avec une quelconque association : l'éditeur est
 * une entreprise, et la plateforme propose une contribution à prix libre.
 *
 * Ce fichier est purement statique (aucune saisie utilisateur) → il peut être
 * importé côté serveur comme côté client, et n'enfreint pas l'invariant de
 * confidentialité (aucune donnée d'outil n'y transite).
 */

export const SITE = {
  /** Nom du produit (marque). */
  name: "Peer to Peer",
  /** Accroche neutre, non culpabilisante. */
  tagline: "Des outils d'auto-observation et de soutien, en libre accès.",
  /** URL canonique (surchargée par NEXT_PUBLIC_SITE_URL en production). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://peer-to-peer.app",
} as const;

/**
 * Société éditrice. Le paiement / la contribution se fait sur une page hébergée
 * par un tiers (lien sortant) : aucune donnée bancaire ne transite par ce site.
 *
 * ⚠️ À COMPLÉTER avec les informations légales réelles de Next Impact.
 */
export const EDITEUR = {
  /** Marque de l'éditeur. */
  brand: "Next Impact",
  /** Raison sociale + forme juridique. Ex. « Next Impact SAS au capital de X € ». */
  legalName: "Next Impact",
  forme: "EI", // ex. "SAS au capital de 1 000 €"
  siret: "53267538600066", // n° SIRET
  rcs: "non enregistrée", // ex. "RCS Bordeaux 000 000 000"
  tvaIntra: "FR58532675386", // n° TVA intracommunautaire
  siege: "4 rue du Centre, 15400 Trizac", // adresse du siège social
  directeurPublication: "Agathe Karinthi-Martin", // nom du directeur / de la directrice de la publication
  email: "agathe@next-impact.digital", // contact
  /** Hébergeur — à confirmer selon le déploiement réel. */
  hebergeur: "Vercel",
} as const;

/**
 * Contribution à prix libre (don / versement libre, montant choisi par la
 * personne, pouvant être nul). Lien sortant vers une page de paiement hébergée
 * par un tiers (Stripe Payment Link « customer chooses price », ou équivalent).
 *
 * ⚠️ Remplacer par l'URL réelle du lien de paiement.
 */
export const CONTRIBUTION = {
  /** Don ponctuel : lien Stripe « le client choisit le montant » (prix libre). */
  url: "https://buy.stripe.com/cNi00i1y385716i5gbaVa00",
  /** Proposer une fonctionnalité ou une amélioration. */
  suggestionUrl: "mailto:agathe@next-impact.digital",
  /** Montants suggérés pour le don ponctuel (purement indicatifs, jamais imposés). */
  suggestions: [5, 10, 20] as const,

  /**
   * Soutien mensuel — paliers FIXES (Stripe n'autorise pas le montant libre en
   * récurrent). Chaque palier = un Payment Link Stripe en mode abonnement,
   * résiliable à tout moment depuis le portail client Stripe.
   * ⚠️ Remplacer chaque URL par le vrai lien d'abonnement.
   */
  monthly: [
    { amount: 5, url: "https://buy.stripe.com/5kQeVc2C7fxz7uG9wraVa01" },
    { amount: 10, url: "https://buy.stripe.com/5kQfZggsXgBD4iugYTaVa02" },
  ],

  /**
   * Portail client Stripe (no-code) : page hébergée où l'abonné gère ou
   * résilie son abonnement (« login link » du Customer Portal, Réglages →
   * Facturation → Portail client). Tant que cette URL est vide, le lien
   * « Gérer / résilier » n'apparaît pas sur le site (jamais de lien mort).
   * ⚠️ Coller l'URL réelle, au format https://billing.stripe.com/p/login/...
   */
  manageUrl: "https://billing.stripe.com/p/login/cNi00i1y385716i5gbaVa00",

  /**
   * Montant de la cagnotte. ⚠️ Valeurs STATIQUES mises à jour À LA MAIN
   * (relever le total sur le tableau de bord du prestataire, puis éditer ici).
   * Aucune donnée n'est tirée en direct : l'app reste 100 % front, sans `fetch`
   * ni backend — l'invariant de confidentialité est préservé.
   */
  currency: "EUR" as const,
  /** Somme déjà récoltée (dans la devise ci-dessus). */
  raised: 0,
  /** Objectif affiché par la jauge de contribution. */
  goal: 4000,
  /** Date de dernière mise à jour de la jauge (texte libre, ex. « 7 juin 2026 »). */
  updatedAt: "",
} as const;
