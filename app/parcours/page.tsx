import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PathwayCards } from "@/components/pathways/PathwayCards";
import { getPathwaySummaries } from "@/data/pathways";

export const metadata: Metadata = {
  title: "Parcours par objectif",
  description:
    "Des itinéraires guidés selon ce que vous souhaitez travailler : apprivoiser l'anxiété, mieux dormir, reprendre confiance, préparer les moments difficiles.",
};

export default function PathwaysIndexPage() {
  const pathways = getPathwaySummaries();
  return (
    <PageWrapper maxWidth="full">
      <header className="mb-8">
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
          Par où commencer&nbsp;?
        </h1>
        <p className="mt-2 text-base text-muted">
          Choisissez ce qui vous parle en ce moment. Chaque parcours enchaîne, à votre rythme,
          quelques outils qui se complètent — rien d&apos;obligatoire.
        </p>
      </header>
      <PathwayCards pathways={pathways} />
    </PageWrapper>
  );
}
