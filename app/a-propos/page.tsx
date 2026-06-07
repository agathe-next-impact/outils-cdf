import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import GameIcon from "@/components/GameIcon";
import { EDITEUR, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Une plateforme libre d'outils d'auto-observation et de soutien au rétablissement.",
};

export default function AProposPage() {
  return (
    <PageWrapper maxWidth="2xl" decor={["sparkles", "flower"]}>
      <header className="mb-6">
        <GameIcon name="book-open" size={48} className="mb-2 text-accent" />
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          À propos
        </h1>
      </header>

      <BentoGrid>
        <BentoBox as="section" span={3}>
          <h2 className="mb-2 text-lg font-semibold">Une boîte à outils libre</h2>
          <p className="text-base">
            {SITE.name} rassemble des outils d&apos;auto-observation et de soutien au
            rétablissement en santé mentale, adaptés de guides et de méthodes existants. Ils
            sont proposés en accès libre, sans compte ni inscription.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={1}>
          <h2 className="mb-2 text-lg font-semibold">Qui porte ce projet</h2>
          <p className="text-base">
            {SITE.name} est édité et porté par <strong>{EDITEUR.brand}</strong>. La plateforme
            est et reste gratuite&nbsp;; si vous le souhaitez, vous pouvez la soutenir par une{" "}
            <Link className="text-info hover:underline" href="/contribuer">
              contribution à prix libre
            </Link>
            . Cela ne change rien à votre accès.
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={2}>
          <h2 className="mb-2 text-lg font-semibold">Ce que ces outils ne sont pas</h2>
          <ul className="ml-5 list-disc space-y-1 text-base">
            <li>Ils ne posent aucun diagnostic.</li>
            <li>Ils ne remplacent pas un·e professionnel·le de santé.</li>
            <li>Ils ne proposent ni traitement, ni conseil médical.</li>
          </ul>
          <p className="mt-3 text-sm text-muted">
            En cas de difficulté, consultez la page{" "}
            <Link className="text-info hover:underline" href="/ressources">
              Ressources d&apos;urgence
            </Link>
            .
          </p>
        </BentoBox>

        <BentoBox as="section" span={3} index={3}>
          <h2 className="mb-2 text-lg font-semibold">Vos données vous appartiennent</h2>
          <p className="text-base">
            Aucune donnée n&apos;est envoyée sur Internet. Vos saisies restent dans votre
            navigateur, le temps de la session.{" "}
            <Link className="text-info hover:underline" href="/confidentialite">
              En savoir plus sur la confidentialité
            </Link>
            .
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
