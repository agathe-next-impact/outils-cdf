import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CategoryGrid } from "@/components/catalogue/CategoryGrid";
import { CATEGORIES, getCatalogByCategory } from "@/data/catalog";
import GameIcon from "@/components/GameIcon";

interface Params {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORIES.find((c) => c.key === category);
  if (!info) return {};
  return { title: info.label, description: info.description };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const info = CATEGORIES.find((c) => c.key === category);
  if (!info) notFound();

  const entries = getCatalogByCategory(info.key);
  const accentText =
    info.accent === "yellow" ? "text-black" : info.accent === "red" ? "text-red" : "text-blue";

  return (
    <PageWrapper maxWidth="4xl">
      <header className="mb-8">
        <GameIcon name={info.iconName} size={48} className={`mb-2 ${accentText}`} />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          {info.label}
        </h1>
        <p className="mt-2 text-base text-black/70">{info.description}</p>
      </header>
      <CategoryGrid entries={entries} />
    </PageWrapper>
  );
}
