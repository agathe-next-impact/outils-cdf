import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox, bentoSpan } from "@/components/layout/Bento";
import { CrisisResources } from "@/components/safety/CrisisResources";
import GameIcon from "@/components/GameIcon";

export const metadata: Metadata = {
  title: "Ressources d'urgence",
  description:
    "Numéros et lignes d'écoute en cas de détresse ou de danger immédiat.",
};

export default function RessourcesPage() {
  return (
    <PageWrapper maxWidth="full" decor={["heart-handshake"]}>
      <header className="mb-6">
        <GameIcon name="siren" size={48} className="mb-2 text-danger" />
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
          Ressources d&apos;urgence
        </h1>
        <p className="mt-2 text-base">
          Si vous traversez un moment difficile, vous pouvez demander de l&apos;aide. Ces
          lignes sont gratuites et confidentielles. En cas de danger immédiat, appelez le 15
          ou le 112.
        </p>
      </header>

      {/* Bento : ressources d'urgence en tuile vedette + soutien durable en tuile régulière */}
      <BentoGrid>
        <div className={bentoSpan(2)}>
          <CrisisResources level="elevated" />
        </div>

        <BentoBox as="section" index={1} className="border border-info">
          <h2 className="mb-2 text-lg">Et au-delà de l&apos;urgence</h2>
          <p className="text-sm">
            Parler à un·e médecin généraliste, un·e psychologue, un Centre médico-psychologique
            (CMP) ou une association de pairs peut aider à trouver un soutien durable. Vous
            n&apos;avez pas à traverser cela seul·e.
          </p>
        </BentoBox>
      </BentoGrid>
    </PageWrapper>
  );
}
