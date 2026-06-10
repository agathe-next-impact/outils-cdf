/**
 * Mesure d'audience (Google Analytics 4).
 *
 * Invariant de confidentialité (cf. CLAUDE.md) : aucune donnée d'outil n'est
 * jamais envoyée. GA ne reçoit QUE la mesure d'audience (pages consultées),
 * et UNIQUEMENT après le consentement explicite de la personne (bandeau RGPD /
 * Google Consent Mode v2). Tant que rien n'est accepté, aucun script tiers
 * n'est chargé et rien ne part sur le réseau.
 *
 * Fichier purement statique (aucune saisie utilisateur) → importable serveur
 * comme client.
 */
export const ANALYTICS = {
  /** ID de mesure GA4. Surchargé par `NEXT_PUBLIC_GA_ID` si défini. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-1WXE51J5PF",
  /**
   * Clé de stockage de la DÉCISION de consentement.
   *
   * ⚠️ Volontairement en `localStorage` (et non `sessionStorage`) : ce n'est pas
   * une saisie d'outil mais un choix RGPD, que la CNIL autorise à conserver pour
   * ne pas re-solliciter à chaque visite et pour respecter durablement un refus.
   * Aucune donnée d'outil ne transite par cette clé.
   */
  consentKey: "p2p-analytics-consent",
} as const;
