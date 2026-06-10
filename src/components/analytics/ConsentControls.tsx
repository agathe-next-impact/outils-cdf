"use client";

/**
 * Réglage du consentement à la mesure d'audience, sur la page Confidentialité.
 * Le RGPD impose que retirer son accord soit aussi simple que de le donner :
 * on peut basculer accepté / refusé à tout moment, sans conséquence sur l'accès.
 */
import { useEffect, useState } from "react";
import { CONSENT_EVENT, getConsent, setConsent, type Consent } from "@/lib/analytics-consent";
import { FOCUS_RING } from "@/lib/a11y";

export function ConsentControls() {
  const [consent, setConsentState] = useState<Consent>("unset");

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = (e: Event) =>
      setConsentState((e as CustomEvent<Consent>).detail ?? getConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const status =
    consent === "granted"
      ? "Actuellement : tu as accepté la mesure d'audience."
      : consent === "denied"
        ? "Actuellement : tu as refusé la mesure d'audience."
        : "Actuellement : aucun choix enregistré — par défaut, rien n'est mesuré.";

  return (
    <div>
      <p className="text-sm text-muted" aria-live="polite">
        {status}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          disabled={consent === "granted"}
          className={`btn-secondary ${FOCUS_RING}`}
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => setConsent("denied")}
          disabled={consent === "denied"}
          className={`btn-ghost ${FOCUS_RING}`}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
