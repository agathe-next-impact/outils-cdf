import { CONTRIBUTION } from "@/config/site";

/**
 * Montant déjà récolté. Données STATIQUES (cf. config) : aucune requête
 * réseau, l'app reste session-only.
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
  const progressValue = Math.min(Math.max(raised, 0), goal);
  const pct = goal > 0 ? Math.min(100, Math.max(0, (raised / goal) * 100)) : 0;
  const roundedPct = Math.round(pct);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="mb-1 text-sm font-medium text-muted">Montant déjà récolté</p>
          <span className="font-heading text-2xl font-semibold leading-none">
            {eur(raised, currency)}
          </span>
        </div>
        <p className="text-sm font-medium text-muted">
          Objectif&nbsp;: <span className="text-foreground">{eur(goal, currency)}</span>
        </p>
      </div>

      <div
        className="h-4 w-full overflow-hidden bg-border"
        role="progressbar"
        aria-label="Progression de la collecte"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuetext={`${eur(raised, currency)} collectés sur ${eur(goal, currency)}`}
      >
        <div
          className="animate-contribution-gauge h-full bg-success"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="font-medium text-accent">
          {roundedPct}% du plafond de {eur(goal, currency)}
        </p>
        <p className="text-muted">Reste {eur(Math.max(goal - raised, 0), currency)} à financer</p>
      </div>

      <p className="mt-3 text-sm text-muted">
        Cette somme sert à rembourser la conception de Peer to Peer et sa maintenance.
      </p>

      {raised >= goal ? (
        <p className="mt-1 text-sm font-medium text-success">
          Objectif atteint&nbsp;: merci pour ce soutien.
        </p>
      ) : null}

      {updatedAt ? (
        <p className="mt-1 text-xs text-muted">Mis à jour le {updatedAt}</p>
      ) : null}
    </div>
  );
}
