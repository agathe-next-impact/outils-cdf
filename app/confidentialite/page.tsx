import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { ConsentControls } from "@/components/analytics/ConsentControls";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Comment tes données sont traitées : rien n'est envoyé, tout reste dans ton navigateur.",
};

export default function ConfidentialitePage() {
  return (
    <PageWrapper maxWidth="full" decor={["lock"]}>
      <header className="mb-6">
        <GameIcon name="lock" size={48} className="mb-2 text-accent" />
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
          Confidentialité
        </h1>
      </header>

      <BentoGrid>
        <BentoBox as="section" span={3}>
          <h2 className="mb-2 text-lg">Aucune donnée d&apos;outil envoyée</h2>
          <p className="text-base">
            Cette plateforme fonctionne entièrement dans ton navigateur. Tes réponses ne sont
            jamais transmises à un serveur, ni à nous, ni à un tiers. Il n&apos;y a ni compte, ni
            inscription, ni suivi du contenu que tu saisis. Seule exception, facultative et
            soumise à ton accord&nbsp;: une mesure d&apos;audience anonyme (voir «&nbsp;Mesure
            d&apos;audience&nbsp;» plus bas).
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={1}>
          <h2 className="mb-2 text-lg">Une mémoire de session</h2>
          <p className="text-base">
            Tes saisies sont conservées dans la mémoire de session de ton navigateur
            (<code className="font-mono">sessionStorage</code>). Concrètement&nbsp;:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1 text-base">
            <li>elles sont conservées si tu rafraîchis la page ou changes d&apos;outil&nbsp;;</li>
            <li>
              elles sont <strong>effacées automatiquement à la fermeture de l&apos;onglet</strong> ou
              du navigateur&nbsp;;
            </li>
            <li>tu peux les effacer à tout moment (bouton « Effacer », ou « Tout effacer »).</li>
          </ul>
        </BentoBox>

        <BentoBox as="section" span={3} index={2} className="border-danger">
          <h2 className="mb-2 text-lg">Attention aux postes partagés</h2>
          <p className="text-base">
            Sur un ordinateur public ou partagé, pense à fermer l&apos;onglet (ou à utiliser «
            Tout effacer ») avant de quitter, pour que personne d&apos;autre ne voie tes saisies.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={3}>
          <h2 className="mb-2 text-lg">Conserver une trace</h2>
          <p className="text-base">
            Comme rien n&apos;est sauvegardé durablement, l&apos;export (PDF, Markdown ou JSON) est
            le seul moyen de garder une trace de ton travail. Ces fichiers sont générés dans
            ton navigateur et restent sur ton appareil.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={4}>
          <h2 className="mb-2 text-lg">Mesure d&apos;audience, avec ton accord</h2>
          <p className="text-base">
            Pour comprendre quelles pages sont utiles et améliorer la plateforme, on peut
            mesurer la fréquentation à l&apos;aide de Google&nbsp;Analytics. Cette mesure&nbsp;:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1 text-base">
            <li>
              ne démarre <strong>qu&apos;après ton accord explicite</strong> — sans accord, rien
              n&apos;est chargé ni envoyé&nbsp;;
            </li>
            <li>
              ne porte <strong>jamais sur le contenu que tu saisis</strong>, seulement sur les
              pages consultées&nbsp;;
            </li>
            <li>
              peut être acceptée ou refusée ici à tout moment, sans aucune conséquence sur
              l&apos;accès aux outils.
            </li>
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <ConsentControls />
          </div>
        </BentoBox>

        <BentoBox as="section" span={3} index={5}>
          <h2 className="mb-2 text-lg">Et si je contribue&nbsp;?</h2>
          <p className="text-base">
            La <Link className="text-info hover:underline" href="/contribuer">contribution</Link> est
            entièrement facultative et indépendante des outils. Elle se déroule sur une page de
            paiement hébergée par un prestataire tiers&nbsp;: tes saisies dans les outils n&apos;y
            sont jamais associées, et aucune donnée bancaire ne transite par ce site.
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
