"use client";

import GameIcon from "@/components/GameIcon";
import { useSessionStore } from "@/store/sessionStore";
import type { Sensitivity } from "@/engines/types";
import { scrollToToolTop } from "@/lib/scrollToTool";

interface ConsentGateProps {
  slug: string;
  sensitivity: Sensitivity;
  children: React.ReactNode;
}

/**
 * Consentement léger pour les outils sensibles (aucune donnée personnelle stockée,
 * juste un booléen de session). Les outils non « high » passent directement.
 * À rendre APRÈS hydratation du store (cf. ToolHost).
 */
export function ConsentGate({ slug, sensitivity, children }: ConsentGateProps) {
  const consented = useSessionStore((s) => s.consents[slug] === true);
  const setConsent = useSessionStore((s) => s.setConsent);

  if (sensitivity !== "high" || consented) {
    return <>{children}</>;
  }

  return (
    <div className="card animate-slide-up border border-border">
      <div className="mb-2 flex items-center gap-2">
        <GameIcon name="shield-check" size={24} className="text-accent" />
        <h2 className="text-lg">Avant de commencer</h2>
      </div>
      <p className="mb-3 text-sm">
        Prenez le temps qu&apos;il vous faut : il n&apos;y a aucune attente, et c&apos;est vous qui
        menez.
      </p>
      <ul className="mb-4 ml-5 list-disc space-y-1 text-sm">
        <li>Vous pouvez vous arrêter à tout moment.</li>
        <li>Vous n&apos;êtes pas obligé·e de répondre à toutes les questions.</li>
        <li>Vos réponses restent dans votre navigateur et peuvent être effacées.</li>
      </ul>
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          setConsent(slug, true);
          scrollToToolTop();
        }}
      >
        Commencer
      </button>
    </div>
  );
}
