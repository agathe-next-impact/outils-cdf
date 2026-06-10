"use client";

/**
 * Bandeau RGPD de mesure d'audience — affiché tant qu'aucun choix n'est fait.
 *
 *  - Choix équivalents (« Accepter » / « Refuser ») : pas de dark pattern.
 *  - Tant qu'on n'accepte pas, AUCUN script Google n'est chargé (cf. `Analytics`).
 *  - Posé au-dessus de la `BottomNav` mobile (z > 50) et décalé du rail desktop.
 */
import Link from "next/link";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function ConsentBanner({ onAccept, onDecline }: ConsentBannerProps) {
  return (
    <div
      role="region"
      aria-label="Mesure d'audience et confidentialité"
      className="animate-slide-up fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-2xl rounded-[var(--radius-lg)] border border-border bg-card p-4 shadow-[var(--shadow)] lg:inset-x-auto lg:bottom-4 lg:left-24 lg:right-4"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden className="mt-0.5 shrink-0 text-accent">
          <GameIcon name="bar-chart-3" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">Mesure d&apos;audience</p>
          <p className="mt-1 text-sm leading-snug text-muted">
            Avec ton accord, on mesure la fréquentation des pages (Google&nbsp;Analytics) pour
            améliorer la plateforme.{" "}
            <strong className="font-medium text-foreground">
              Tes saisies dans les outils ne sont jamais concernées
            </strong>{" "}
            et rien n&apos;est envoyé sans ton accord.{" "}
            <Link
              href="/confidentialite"
              className={`text-accent underline underline-offset-2 ${FOCUS_RING}`}
            >
              En savoir plus
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={onAccept} className={`btn-primary ${FOCUS_RING}`}>
              Accepter
            </button>
            <button type="button" onClick={onDecline} className={`btn-ghost ${FOCUS_RING}`}>
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
