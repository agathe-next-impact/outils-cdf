import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { ContributionGauge } from "@/components/contribution/ContributionGauge";
import { FOCUS_RING } from "@/lib/a11y";
import { CONTRIBUTION, EDITEUR, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contribuer",
  description:
    "Soutenir Peer to Peer par une contribution à prix libre. La plateforme reste gratuite : contribuer ne débloque rien.",
};

export default function ContribuerPage() {
  return (
    <PageWrapper maxWidth="full" decor={["heart"]}>
      <header className="mb-6">
        <div className="mb-3">
          <Logo size={40} showWordmark={false} />
        </div>
        <p className="eyebrow mb-2">Soutenir le projet</p>
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
          Contribuer
        </h1>
        <p className="mt-2 text-base text-muted">
          {SITE.name} est gratuit et le restera. Si vous le pouvez et le souhaitez, vous pouvez
          le soutenir — librement.
        </p>
      </header>

      <BentoGrid>
        {/* Jauge de collecte (valeurs statiques, maintenues à la main) */}
        <BentoBox as="section" span={3}>
          <h2 className="mb-3 text-lg">Où en est la collecte</h2>
          <ContributionGauge />
        </BentoBox>

        {/* Prix libre — le cœur du message */}
        <BentoBox as="section" span={3} index={1} className="card-accent">
          <h2 className="mb-2 text-lg">Un don ponctuel, au montant libre</h2>
          <p className="text-base">
            Ce don se fait à <strong>prix libre</strong>, en une fois&nbsp;: vous décidez du
            montant. Aucune somme n&apos;est imposée.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Montants donnés à titre indicatif">
            {CONTRIBUTION.suggestions.map((m) => (
              <li
                key={m}
                className="rounded-full border border-border px-3 py-1 text-sm font-medium"
                aria-hidden
              >
                {m}&nbsp;€
              </li>
            ))}
            <li className="px-3 py-1 text-sm text-muted">…ou le montant de votre choix</li>
          </ul>

          <a
            href={CONTRIBUTION.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex items-center gap-2 bg-foreground px-8 py-4 text-lg font-semibold tracking-wide text-background transition-transform hover:-translate-y-1 ${FOCUS_RING}`}
          >
            <GameIcon name="heart" size={20} aria-hidden />
            Faire une contribution
          </a>
          <p className="mt-2 text-xs text-muted">
            Le paiement s&apos;ouvre dans un nouvel onglet, sur une page sécurisée hébergée par
            notre prestataire.
          </p>
        </BentoBox>

        {/* Soutien mensuel — abonnement (paliers fixes) */}
        <BentoBox as="section" span={3} index={2}>
          <h2 className="mb-2 text-lg">Ou un soutien mensuel</h2>
          <p className="text-base">
            Pour soutenir {SITE.name} dans la durée, vous pouvez mettre en place un don
            mensuel — résiliable à tout moment, sans engagement.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {CONTRIBUTION.monthly.map((tier) => (
              <a
                key={tier.amount}
                href={tier.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary inline-flex items-center gap-2 ${FOCUS_RING}`}
              >
                <GameIcon name="repeat" size={18} aria-hidden />
                {tier.amount}&nbsp;€ / mois
              </a>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Le paiement s&apos;ouvre dans un nouvel onglet, sur une page sécurisée hébergée par
            notre prestataire.
          </p>
          {CONTRIBUTION.manageUrl ? (
            <p className="mt-3 text-sm">
              <a
                href={CONTRIBUTION.manageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-info hover:underline ${FOCUS_RING}`}
              >
                <GameIcon name="settings" size={15} aria-hidden />
                Gérer ou résilier mon abonnement
              </a>
            </p>
          ) : null}
        </BentoBox>

        {/* Garde-fou : ne débloque rien */}
        <BentoBox as="section" span={3} index={3}>
          <h2 className="mb-2 text-lg">Contribuer ne débloque rien</h2>
          <p className="text-base">
            Tous les outils restent accessibles à tout le monde, gratuitement, sans compte. Votre
            contribution ne vous donne aucun avantage&nbsp;: elle soutient simplement le projet et
            son maintien.
          </p>
        </BentoBox>

        {/* À quoi ça sert : maintien en ligne + évolution future */}
        <BentoBox as="section" span={3} index={4}>
          <h2 className="mb-2 text-lg">À quoi sert votre soutien</h2>
          <p className="text-base">
            Votre contribution permet d&apos;abord de{" "}
            <strong>maintenir le site en ligne</strong>&nbsp;: hébergement, maintenance,
            accessibilité et amélioration des outils existants.
          </p>
          <p className="mt-3 text-base">
            Au-delà, elle peut permettre de faire évoluer {SITE.name} vers une véritable
            application&nbsp;: à terme, un <strong>espace personnel</strong> (optionnel) et
            d&apos;autres <strong>fonctionnalités avancées</strong>. L&apos;accès aux outils, lui,
            restera toujours libre et gratuit.
          </p>
          <p className="mt-3 text-sm text-muted">
            {SITE.name} est édité et porté par <strong>{EDITEUR.brand}</strong>. Aucune donnée
            saisie dans les outils n&apos;est liée à votre contribution.
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
