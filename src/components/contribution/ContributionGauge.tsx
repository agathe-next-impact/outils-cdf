import { CONTRIBUTION } from "@/config/site";

/**
 * Jauge des sommes déjà récoltées. Données STATIQUES (cf. config) : aucune
 * requête réseau, l'app reste session-only. Accessible : barre `progressbar`
 * avec libellé textuel — l'info n'est jamais portée par la seule couleur.
 */
function eur(n: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function ContributionGauge() {
  const { raised, goal, currency, updatedAt } = CONTRIBUTION;
  const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const reached = raised >= goal && goal > 0;

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="font-heading text-2xl font-semibold leading-none">
          {eur(raised, currency)}
        </span>
        <span className="text-sm text-muted">objectif&nbsp;{eur(goal, currency)}</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-valuetext={`${eur(raised, currency)} récoltés sur ${eur(goal, currency)} (${pct} %)`}
        className="h-3 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-medium text-accent">
        {reached ? "Objectif atteint — merci infiniment !" : `${pct} % de l'objectif`}
      </p>
      {updatedAt ? (
        <p className="mt-0.5 text-xs text-muted">Mis à jour le {updatedAt}</p>
      ) : null}
    </div>
  );
}
