"use client";

import GameIcon from "@/components/GameIcon";
import { useSessionStore } from "@/store/sessionStore";
import { getDisclaimer } from "@/content/disclaimers";
import type { Sensitivity } from "@/engines/types";

interface ConsentGateProps {
  slug: string;
  sensitivity: Sensitivity;
  disclaimerKey: string;
  children: React.ReactNode;
}

/**
 * Consentement léger pour les outils sensibles (aucune donnée personnelle stockée,
 * juste un booléen de session). Les outils non « high » passent directement.
 * À rendre APRÈS hydratation du store (cf. ToolHost).
 */
export function ConsentGate({ slug, sensitivity, disclaimerKey, children }: ConsentGateProps) {
  const consented = useSessionStore((s) => s.consents[slug] === true);
  const setConsent = useSessionStore((s) => s.setConsent);

  if (sensitivity !== "high" || consented) {
    return <>{children}</>;
  }

  const d = getDisclaimer(disclaimerKey);
  return (
    <div className="card animate-slide-up border border-blue">
      <div className="mb-2 flex items-center gap-2">
        <GameIcon name="shield-check" size={24} className="text-blue" />
        <h2 className="text-lg font-black uppercase">Avant de commencer</h2>
      </div>
      <p className="mb-3 text-sm">{d.long}</p>
      <ul className="mb-4 ml-5 list-disc space-y-1 text-sm">
        <li>Vous pouvez vous arrêter à tout moment.</li>
        <li>Vous n&apos;êtes pas obligé·e de répondre à toutes les questions.</li>
        <li>Vos réponses restent dans votre navigateur et peuvent être effacées.</li>
      </ul>
      <button type="button" className="btn-primary" onClick={() => setConsent(slug, true)}>
        Commencer
      </button>
    </div>
  );
}
