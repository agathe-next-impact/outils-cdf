import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { EDITEUR, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et crédits des sources des outils.",
};

/** Valeur légale ou marqueur explicite si elle reste à renseigner. */
function val(v: string) {
  return v ? v : <span className="text-muted">à compléter</span>;
}

export default function MentionsLegalesPage() {
  return (
    <PageWrapper maxWidth="full">
      <header className="mb-6">
        <GameIcon name="scale" size={48} className="mb-2 text-accent" />
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
          Mentions légales
        </h1>
      </header>

      <BentoGrid>
        <BentoBox as="section" span={3}>
          <h2 className="mb-2 text-lg">Éditeur</h2>
          <p className="text-base">
            {SITE.name} est édité par <strong>{EDITEUR.legalName}</strong>.
          </p>
          <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="font-semibold">Forme</dt>
            <dd>{val(EDITEUR.forme)}</dd>
            <dt className="font-semibold">Siège</dt>
            <dd>{val(EDITEUR.siege)}</dd>
            <dt className="font-semibold">SIRET</dt>
            <dd>{val(EDITEUR.siret)}</dd>
            <dt className="font-semibold">RCS</dt>
            <dd>{val(EDITEUR.rcs)}</dd>
            <dt className="font-semibold">TVA</dt>
            <dd>{val(EDITEUR.tvaIntra)}</dd>
            <dt className="font-semibold">Publication</dt>
            <dd>{val(EDITEUR.directeurPublication)}</dd>
            <dt className="font-semibold">Contact</dt>
            <dd>{val(EDITEUR.email)}</dd>
          </dl>
        </BentoBox>

        <BentoBox as="section" span={3} index={1}>
          <h2 className="mb-2 text-lg">Hébergeur</h2>
          <p className="text-base">{val(EDITEUR.hebergeur)}</p>
        </BentoBox>

        <BentoBox as="section" span={3} index={2}>
          <h2 className="mb-2 text-lg">Nature du service</h2>
          <p className="text-base">
            Plateforme d&apos;information et d&apos;auto-observation en libre accès. Les contenus
            sont fournis à titre informatif et éducatif. Ils ne constituent pas un avis médical et
            ne posent aucun diagnostic.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={3}>
          <h2 className="mb-2 text-lg">Sources et droits</h2>
          <p className="text-base">
            Les outils s&apos;inspirent de guides, échelles et méthodes existants, crédités sur
            chaque page d&apos;outil. Les droits des œuvres originales appartiennent à leurs
            auteurs respectifs. Pour toute question relative aux droits, merci de nous contacter.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={4}>
          <h2 className="mb-2 text-lg">Données personnelles</h2>
          <p className="text-base">
            Les outils ne collectent ni ne transmettent aucune donnée : vos saisies restent dans
            votre navigateur. Une éventuelle <Link className="text-info hover:underline" href="/contribuer">contribution</Link>{" "}
            se fait sur une page de paiement hébergée par un prestataire tiers ; aucune donnée
            bancaire ne transite par ce site. Voir la page{" "}
            <Link className="text-info hover:underline" href="/confidentialite">
              Confidentialité
            </Link>
            .
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
