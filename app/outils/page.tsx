import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/catalogue/CatalogExplorer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CATEGORIES, getCatalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Outils",
  description: "Explorer tous les outils Peer to Peer par recherche, catégorie, durée et tri.",
};

export default function OutilsPage() {
  const catalog = getCatalog();

  return (
    <PageWrapper maxWidth="full">
      <div className="section-head">
        <span className="eyebrow">Catalogue</span>
        <h1 className="font-heading text-3xl tracking-tight md:text-4xl">Tous les outils</h1>
        <span className="sub">
          Recherche un outil, filtre par type ou trouve un format adapté à ton temps.
        </span>
      </div>
      <CatalogExplorer entries={catalog} categories={CATEGORIES} />
    </PageWrapper>
  );
}
