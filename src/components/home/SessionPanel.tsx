"use client";

/**
 * SessionPanel — tuile « tableau de bord » de l'accueil, adaptée au fait que la
 * plateforme N'EST PAS un espace privé : aucun compte, aucune donnée durable.
 * Elle ne reflète QUE l'état de la session en cours (sessionStorage de l'onglet) :
 *   - propose de reprendre les outils commencés (liens) ;
 *   - permet de tout effacer ;
 *   - sinon, explique la promesse « session uniquement ».
 * Rien n'est jamais envoyé sur le réseau. Le rendu attend la réhydratation client
 * (`useHydrated`) pour éviter tout mismatch d'hydratation.
 */
import Link from "next/link";
import { useState } from "react";
import { BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";
import { useHydrated } from "@/store/hydration";
import { useSessionStore } from "@/store/sessionStore";

interface SessionTool {
  slug: string;
  title: string;
  iconName: string;
}

export function SessionPanel({
  tools,
  span = 2,
  index = 0,
}: {
  /** Outils disponibles (liste légère fournie par le serveur, sans le registre). */
  tools: SessionTool[];
  span?: 1 | 2 | 3;
  index?: number;
}) {
  const hydrated = useHydrated();
  const toolsState = useSessionStore((s) => s.tools);
  const resetAll = useSessionStore((s) => s.resetAll);
  const [confirming, setConfirming] = useState(false);

  const inProgress = hydrated ? tools.filter((t) => toolsState[t.slug] != null) : [];

  return (
    <BentoBox as="section" span={span} index={index}>
      <div className="mb-2 flex items-center gap-2">
        <GameIcon name="clipboard-check" size={20} className="text-accent" aria-hidden />
        <h2 className="text-lg font-semibold leading-none">Votre session</h2>
      </div>

      {!hydrated ? (
        <p className="text-sm text-muted" aria-live="polite">
          Chargement de votre session…
        </p>
      ) : inProgress.length === 0 ? (
        <p className="text-sm text-muted">
          Rien en cours. Quand vous commencez un outil, vos réponses restent ici le temps de
          l&apos;onglet — jamais envoyées sur Internet, et effacées à la fermeture.
        </p>
      ) : (
        <>
          <p className="mb-3 text-sm text-muted">
            {inProgress.length === 1
              ? "1 outil commencé dans cet onglet."
              : `${inProgress.length} outils commencés dans cet onglet.`}{" "}
            Reprenez où vous en étiez :
          </p>
          <ul className="flex flex-col gap-2">
            {inProgress.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/outils/${t.slug}`}
                  className={`flex items-center gap-2 text-sm font-medium text-info hover:underline ${FOCUS_RING}`}
                >
                  <GameIcon name={t.iconName} size={16} aria-hidden />
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            {confirming ? (
              <span className="flex flex-wrap items-center gap-2 text-sm">
                Effacer toute la session&nbsp;?
                <button
                  type="button"
                  onClick={() => {
                    resetAll();
                    setConfirming(false);
                  }}
                  className={`bg-danger px-3 py-1 font-semibold text-white ${FOCUS_RING}`}
                >
                  Oui, tout effacer
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className={`border border-border px-3 py-1 ${FOCUS_RING}`}
                >
                  Annuler
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className={`flex items-center gap-2 border border-border px-3 py-1 text-sm hover:text-danger ${FOCUS_RING}`}
              >
                <GameIcon name="trash-2" size={16} /> Tout effacer
              </button>
            )}
          </div>
        </>
      )}
    </BentoBox>
  );
}
