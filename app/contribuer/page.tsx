import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { ContributionGauge } from "@/components/contribution/ContributionGauge";
import { FOCUS_RING } from "@/lib/a11y";
import { CONTRIBUTION, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contribuer",
  description:
    "Soutenir Peer to Peer par une contribution à prix libre. La plateforme reste gratuite : contribuer ne débloque rien.",
};

export default function ContribuerPage() {
  return (
    <PageWrapper maxWidth="full" decor={["heart"]}>
      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div>
          <header className="mb-6">
            <div className="mb-3">
              <Logo size={40} showWordmark={false} />
            </div>
            <p className="eyebrow mb-2">Soutenir le projet</p>
            <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
              Contribuer
            </h1>
            <p className="mt-2 text-base text-muted">
              {SITE.name} est gratuit et le restera. Si tu le peux et le souhaites, tu peux
              le soutenir — librement. Cela sert déjà à maintenir le site en ligne, et à faire
              évoluer le projet dans le futur vers un espace personnel et des fonctionnalités
              avancées.
            </p>
          </header>

          <div className="grid gap-[18px]">
            {/* Jauge de collecte (valeurs statiques, maintenues à la main) */}
            <section className="card animate-slide-up">
              <h2 className="mb-3 text-lg">Où en est la collecte</h2>
              <ContributionGauge />
            </section>

            {/* Prix libre — le cœur du message */}
            <section
              className="card card-accent animate-slide-up"
              style={{ animationDelay: "0.06s" }}
            >
              <h2 className="mb-2 text-lg">Un don ponctuel, au montant libre</h2>
              <p className="text-base">
                Ce don se fait à <strong>prix libre</strong>, en une fois&nbsp;: tu décides du
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
                <li className="px-3 py-1 text-sm text-muted">…ou le montant de ton choix</li>
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
            </section>

            {/* Soutien mensuel — abonnement (paliers fixes) */}
            <section className="card animate-slide-up" style={{ animationDelay: "0.12s" }}>
              <h2 className="mb-2 text-lg">Ou un soutien mensuel</h2>
              <p className="text-base">
                Pour soutenir {SITE.name} dans la durée, tu peux mettre en place un don
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
            </section>
          </div>
        </div>

        <aside className="grid gap-[18px] lg:sticky lg:top-6">
          <div className="card card-accent">
            <div className="mb-3 flex items-center gap-3">
              <GameIcon name="lightbulb" size={22} aria-hidden />
              <h2 className="text-lg">Proposer une fonctionnalité</h2>
            </div>
            <p className="text-base text-muted">
              Une idée d&apos;outil ou d&apos;amélioration&nbsp;? Envoie-la par mail pour aider à
              prioriser les prochaines évolutions.
            </p>
            <a
              href={CONTRIBUTION.suggestionUrl}
              className={`btn-secondary mt-4 inline-flex items-center gap-2 ${FOCUS_RING}`}
            >
              <GameIcon name="message-circle" size={18} aria-hidden />
              Proposer une idée
            </a>
          </div>

          <div className="card">
            <div className="mb-3 flex items-center gap-3">
              <GameIcon name="heart-handshake" size={22} aria-hidden />
              <h2 className="text-lg">Continuité et gratuité</h2>
            </div>
            <p className="text-base text-muted">
              Le soutien permet de maintenir le site en ligne, de couvrir les coûts techniques et
              de garder les outils accessibles gratuitement, sans compte.
            </p>
          </div>

          <div className="card">
            <div className="mb-3 flex items-center gap-3">
              <GameIcon name="sparkles" size={22} aria-hidden />
              <h2 className="text-lg">Évolutions possibles</h2>
            </div>
            <p className="text-base text-muted">
              Si le soutien devient important, {SITE.name} pourra avancer vers un espace personnel
              optionnel et des fonctionnalités additionnelles issues des suggestions reçues.
            </p>
          </div>
        </aside>
      </div>

    </PageWrapper>
  );
}
