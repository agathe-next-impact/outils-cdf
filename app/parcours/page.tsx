import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PathwayCards } from "@/components/pathways/PathwayCards";
import { StartPathwayCards } from "@/components/pathways/StartPathwayCards";
import { getPathwaySummaries } from "@/data/pathways";

export const metadata: Metadata = {
  title: "Parcours par objectif",
  description:
    "Des itinéraires guidés selon ce que tu souhaites travailler : apprivoiser l'anxiété, mieux dormir, reprendre confiance, préparer les moments difficiles.",
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
          Choisis ce qui te parle en ce moment. Chaque parcours enchaîne, à ton rythme,
          quelques outils qui se complètent — rien d&apos;obligatoire.
        </p>
      </header>
      <section className="bento mb-8">
        <StartPathwayCards />
      </section>
      <PathwayCards pathways={pathways} />
    </PageWrapper>
  );
}
