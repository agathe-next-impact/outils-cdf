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
  const { raised, currency, updatedAt } = CONTRIBUTION;

  return (
    <div>
      <div className="mb-1">
        <p className="mb-1 text-sm font-medium text-muted">Montant déjà récolté</p>
        <span className="font-heading text-2xl font-semibold leading-none">
          {eur(raised, currency)}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-accent">Cagnotte ouverte, sans plafond.</p>
      {updatedAt ? (
        <p className="mt-0.5 text-xs text-muted">Mis à jour le {updatedAt}</p>
      ) : null}
    </div>
  );
}
