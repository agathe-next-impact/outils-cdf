import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et crédits des sources des outils.",
};

export default function MentionsLegalesPage() {
  return (
    <PageWrapper maxWidth="2xl">
      <header className="mb-6">
        <GameIcon name="scale" size={48} className="mb-2 text-blue" />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          Mentions légales
        </h1>
      </header>

      <section className="card mb-6 border border-blue">
        <h2 className="mb-2 text-lg font-black uppercase">Nature du service</h2>
        <p className="text-base">
          Plateforme d&apos;information et d&apos;auto-observation en libre accès. Les contenus
          sont fournis à titre informatif et éducatif. Ils ne constituent pas un avis médical et
          ne posent aucun diagnostic.
        </p>
      </section>

      <section className="card mb-6 border border-yellow">
        <h2 className="mb-2 text-lg font-black uppercase">Sources et droits</h2>
        <p className="text-base">
          Les outils s&apos;inspirent de guides, échelles et méthodes existants, crédités sur
          chaque page d&apos;outil. Les droits des œuvres originales appartiennent à leurs
          auteurs respectifs. Pour toute question relative aux droits, merci de nous contacter.
        </p>
      </section>

      <section className="card border border-black">
        <h2 className="mb-2 text-lg font-black uppercase">Données personnelles</h2>
        <p className="text-base">
          Aucune donnée personnelle n&apos;est collectée ni transmise. Voir la page{" "}
          <Link className="text-blue hover:underline" href="/confidentialite">
            Confidentialité
          </Link>
          .
        </p>
      </section>
    </PageWrapper>
  );
}
