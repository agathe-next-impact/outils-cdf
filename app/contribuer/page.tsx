import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { CONTRIBUTION, EDITEUR, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contribuer",
  description:
    "Soutenir Peer to Peer par une contribution à prix libre. La plateforme reste gratuite : contribuer ne débloque rien.",
};

export default function ContribuerPage() {
  return (
    <PageWrapper maxWidth="2xl" decor={["heart"]}>
      <header className="mb-6">
        <div className="mb-3">
          <Logo size={40} showWordmark={false} />
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Contribuer
        </h1>
        <p className="mt-2 text-base text-muted">
          {SITE.name} est gratuit et le restera. Si vous le pouvez et le souhaitez, vous pouvez
          le soutenir — librement.
        </p>
      </header>

      <BentoGrid>
        {/* Prix libre — le cœur du message */}
        <BentoBox as="section" span={3} className="card-accent">
          <h2 className="mb-2 text-lg font-semibold">Un montant que vous choisissez</h2>
          <p className="text-base">
            La contribution se fait à <strong>prix libre</strong>&nbsp;: vous décidez du montant,
            ponctuel ou régulier. Aucune somme n&apos;est imposée.
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
            className={`mt-5 inline-flex items-center gap-2 bg-accent px-8 py-4 text-lg font-semibold tracking-wide text-white transition-transform hover:-translate-y-1 ${FOCUS_RING}`}
          >
            <GameIcon name="heart" size={20} aria-hidden />
            Faire une contribution
          </a>
          <p className="mt-2 text-xs text-muted">
            Le paiement s&apos;ouvre dans un nouvel onglet, sur une page sécurisée hébergée par
            notre prestataire.
          </p>
        </BentoBox>

        {/* Garde-fou : ne débloque rien */}
        <BentoBox as="section" span={3} index={1}>
          <h2 className="mb-2 text-lg font-semibold">Contribuer ne débloque rien</h2>
          <p className="text-base">
            Tous les outils restent accessibles à tout le monde, gratuitement, sans compte. Votre
            contribution ne vous donne aucun avantage&nbsp;: elle soutient simplement le projet et
            son maintien.
          </p>
        </BentoBox>

        {/* À quoi ça sert + qui reçoit */}
        <BentoBox as="section" span={3} index={2}>
          <h2 className="mb-2 text-lg font-semibold">À quoi sert votre soutien</h2>
          <p className="text-base">
            Les contributions aident à faire vivre la plateforme&nbsp;: hébergement, maintenance,
            accessibilité et nouveaux outils. {SITE.name} est édité et porté par{" "}
            <strong>{EDITEUR.brand}</strong>. Aucune donnée saisie dans les outils n&apos;est liée
            à votre contribution.
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
