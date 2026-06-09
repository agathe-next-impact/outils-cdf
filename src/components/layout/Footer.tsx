"use client";

import Link from "next/link";
import { useState } from "react";
import type { CSSProperties } from "react";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { useSessionStore } from "@/store/sessionStore";
import { useHydrated } from "@/store/hydration";
import { FOCUS_RING } from "@/lib/a11y";
import { EDITEUR, SITE } from "@/config/site";

// Mascotte lisible sur le plum : accent teal clair + visage plum (le wordmark
// reste en cream via la couleur héritée du footer).
const LOGO_ON_PLUM = {
  "--accent": "#5FC4C9",
  "--on-accent": "#16292C",
} as CSSProperties;

const NAVIGUER = [
  { href: "/", label: "Accueil" },
  { href: "/outils", label: "Outils" },
  { href: "/parcours", label: "Parcours" },
  { href: "/contribuer", label: "Contribuer" },
];

const EN_SAVOIR_PLUS = [
  { href: "/ressources", label: "Aide" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/a-propos", label: "À propos" },
];

export function Footer() {
  const hydrated = useHydrated();
  const resetAll = useSessionStore((s) => s.resetAll);
  const hasAny = useSessionStore((s) => Object.keys(s.tools).length > 0);
  const [confirming, setConfirming] = useState(false);

  return (
    <footer className="footer-plum px-6 pb-10 pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marque + description */}
          <div>
            <span style={LOGO_ON_PLUM} className="inline-flex text-lg text-hero-ink">
              <Logo size={28} />
            </span>
            <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-hero-ink/70">
              Plateforme libre d&apos;auto-observation, éditée par {EDITEUR.brand}. Aucun compte,
              aucune donnée envoyée : tes saisies restent dans ton navigateur, le temps de la
              session. Ces outils ne posent aucun diagnostic et ne remplacent pas un
              professionnel.
            </p>
          </div>

          {/* Naviguer */}
          <nav aria-label="Navigation du pied de page" className="flex flex-col">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-hero-ink/65">
              Naviguer
            </h2>
            {NAVIGUER.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1.5 text-sm text-hero-ink/85 ${FOCUS_RING}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* En savoir plus */}
          <nav aria-label="Ressources et informations légales" className="flex flex-col">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-hero-ink/65">
              En savoir plus
            </h2>
            {EN_SAVOIR_PLUS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1.5 text-sm text-hero-ink/85 ${FOCUS_RING}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Barre du bas : mention + réinitialisation de session + copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-hero-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-mono text-[11.5px] text-hero-ink/65">
            <GameIcon name="heart" size={13} aria-hidden />
            fait pour le rétablissement
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {hydrated && hasAny ? (
              confirming ? (
                <div className="flex items-center gap-2 text-sm text-hero-ink/85">
                  <span>Effacer toutes tes données de session&nbsp;?</span>
                  <button
                    type="button"
                    className={`bg-danger px-3 py-1 font-semibold text-on-accent ${FOCUS_RING}`}
                    onClick={() => {
                      resetAll();
                      setConfirming(false);
                    }}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`border border-hero-line px-3 py-1 ${FOCUS_RING}`}
                    onClick={() => setConfirming(false)}
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={`flex items-center gap-2 border border-hero-line px-3 py-1 text-sm text-hero-ink/85 hover:text-danger ${FOCUS_RING}`}
                  onClick={() => setConfirming(true)}
                >
                  <GameIcon name="trash-2" size={16} />
                  Tout effacer
                </button>
              )
            ) : null}
            <span className="font-mono text-[11.5px] text-hero-ink/65">
              © 2026 {SITE.name} · {EDITEUR.brand}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
