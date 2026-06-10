/**
 * Lecture / écriture de la décision de consentement à la mesure d'audience.
 *
 * Un seul point de vérité, partagé par le bandeau (`ConsentBanner`), le moteur
 * GA (`Analytics`) et les réglages de la page Confidentialité (`ConsentControls`).
 * Tout changement émet `CONSENT_EVENT` pour synchroniser ces composants entre eux.
 */
import { ANALYTICS } from "@/config/analytics";

export type Consent = "unset" | "granted" | "denied";

/** Event interne (non réseau) émis à chaque changement de décision. */
export const CONSENT_EVENT = "p2p-consent-change";

/** Décision courante (jamais au SSR : à appeler dans un effet). */
export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(ANALYTICS.consentKey);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

/** Enregistre la décision et notifie les composants abonnés. */
export function setConsent(value: Consent): void {
  try {
    if (value === "unset") localStorage.removeItem(ANALYTICS.consentKey);
    else localStorage.setItem(ANALYTICS.consentKey, value);
  } catch {
    /* stockage indisponible : la décision ne vaut que pour cette page */
  }
  try {
    window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
  } catch {
    /* environnement sans window : rien à notifier */
  }
}
