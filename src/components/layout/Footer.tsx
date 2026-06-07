"use client";

import Link from "next/link";
import { useState } from "react";
import GameIcon from "@/components/GameIcon";
import { useSessionStore } from "@/store/sessionStore";
import { useHydrated } from "@/store/hydration";
import { FOCUS_RING } from "@/lib/a11y";

export function Footer() {
  const hydrated = useHydrated();
  const resetAll = useSessionStore((s) => s.resetAll);
  const hasAny = useSessionStore((s) => Object.keys(s.tools).length > 0);
  const [confirming, setConfirming] = useState(false);

  return (
    <footer className="border-t border-black/20 px-4 py-8 text-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link className={`hover:text-blue ${FOCUS_RING}`} href="/ressources">
            Ressources d&apos;urgence
          </Link>
          <Link className={`hover:text-blue ${FOCUS_RING}`} href="/confidentialite">
            Confidentialité
          </Link>
          <Link className={`hover:text-blue ${FOCUS_RING}`} href="/mentions-legales">
            Mentions légales
          </Link>
          <Link className={`hover:text-blue ${FOCUS_RING}`} href="/a-propos">
            À propos
          </Link>
        </nav>

        {hydrated && hasAny ? (
          confirming ? (
            <div className="flex items-center gap-2">
              <span>Effacer toutes vos données de session ?</span>
              <button
                type="button"
                className={`bg-red px-3 py-1 font-bold uppercase text-white ${FOCUS_RING}`}
                onClick={() => {
                  resetAll();
                  setConfirming(false);
                }}
              >
                Oui
              </button>
              <button
                type="button"
                className={`border border-black px-3 py-1 ${FOCUS_RING}`}
                onClick={() => setConfirming(false)}
              >
                Annuler
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={`flex items-center gap-2 border border-black px-3 py-1 hover:text-red ${FOCUS_RING}`}
              onClick={() => setConfirming(true)}
            >
              <GameIcon name="trash-2" size={16} />
              Tout effacer
            </button>
          )
        ) : null}
      </div>
      <p className="mx-auto mt-4 max-w-5xl text-xs text-black/60">
        Plateforme libre d&apos;auto-observation. Aucun compte, aucune donnée envoyée :
        vos saisies restent dans votre navigateur, le temps de la session. Ces outils ne
        posent aucun diagnostic et ne remplacent pas un·e professionnel·le.
      </p>
    </footer>
  );
}
