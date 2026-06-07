import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Comment vos données sont traitées : rien n'est envoyé, tout reste dans votre navigateur.",
};

export default function ConfidentialitePage() {
  return (
    <PageWrapper maxWidth="2xl" decor={["lock"]}>
      <header className="mb-6">
        <GameIcon name="lock" size={48} className="mb-2 text-blue" />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          Confidentialité
        </h1>
      </header>

      <section className="card mb-6 border border-blue">
        <h2 className="mb-2 text-lg font-black uppercase">Aucune donnée envoyée</h2>
        <p className="text-base">
          Cette plateforme fonctionne entièrement dans votre navigateur. Vos réponses ne sont
          jamais transmises à un serveur, ni à nous, ni à un tiers. Il n&apos;y a ni compte, ni
          inscription, ni suivi du contenu que vous saisissez.
        </p>
      </section>

      <section className="card mb-6 border border-yellow">
        <h2 className="mb-2 text-lg font-black uppercase">Une mémoire de session</h2>
        <p className="text-base">
          Vos saisies sont conservées dans la mémoire de session de votre navigateur
          (<code className="font-mono">sessionStorage</code>). Concrètement&nbsp;:
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1 text-base">
          <li>elles sont conservées si vous rafraîchissez la page ou changez d&apos;outil&nbsp;;</li>
          <li>
            elles sont <strong>effacées automatiquement à la fermeture de l&apos;onglet</strong> ou
            du navigateur&nbsp;;
          </li>
          <li>vous pouvez les effacer à tout moment (bouton « Effacer », ou « Tout effacer »).</li>
        </ul>
      </section>

      <section className="card mb-6 border border-red">
        <h2 className="mb-2 text-lg font-black uppercase">Attention aux postes partagés</h2>
        <p className="text-base">
          Sur un ordinateur public ou partagé, pensez à fermer l&apos;onglet (ou à utiliser «
          Tout effacer ») avant de quitter, pour que personne d&apos;autre ne voie vos saisies.
        </p>
      </section>

      <section className="card border border-black">
        <h2 className="mb-2 text-lg font-black uppercase">Conserver une trace</h2>
        <p className="text-base">
          Comme rien n&apos;est sauvegardé durablement, l&apos;export (PDF, Markdown ou JSON) est
          le seul moyen de garder une trace de votre travail. Ces fichiers sont générés dans
          votre navigateur et restent sur votre appareil.
        </p>
      </section>
    </PageWrapper>
  );
}
