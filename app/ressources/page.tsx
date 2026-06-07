import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CrisisResources } from "@/components/safety/CrisisResources";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "Ressources d'urgence",
  description:
    "Numéros et lignes d'écoute en cas de détresse ou de danger immédiat.",
};

export default function RessourcesPage() {
  return (
    <PageWrapper maxWidth="2xl" decor={["heart-handshake"]}>
      <header className="mb-6">
        <GameIcon name="siren" size={48} className="mb-2 text-red" />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          Ressources d&apos;urgence
        </h1>
        <p className="mt-2 text-base">
          Si vous traversez un moment difficile, vous pouvez demander de l&apos;aide. Ces
          lignes sont gratuites et confidentielles. En cas de danger immédiat, appelez le 15
          ou le 112.
        </p>
      </header>

      <CrisisResources level="elevated" />

      <section className="card mt-6 border border-blue">
        <h2 className="mb-2 text-lg font-black uppercase">Et au-delà de l&apos;urgence</h2>
        <p className="text-sm">
          Parler à un·e médecin généraliste, un·e psychologue, un Centre médico-psychologique
          (CMP) ou une association de pairs peut aider à trouver un soutien durable. Vous
          n&apos;avez pas à traverser cela seul·e.
        </p>
      </section>
    </PageWrapper>
  );
}
