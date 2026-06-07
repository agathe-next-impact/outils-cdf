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

  return (
    <PageWrapper maxWidth="full">
      <header className="mb-8">
        <div className="flex items-center gap-3 border border-border border-l-[3px] border-l-accent bg-surface-2 px-5 py-4">
          <GameIcon name={info.iconName} size={40} className="text-accent" />
          <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
            {info.label}
          </h1>
        </div>
        <p className="mt-3 text-base text-muted">{info.description}</p>
      </header>
      <CategoryGrid entries={entries} />
    </PageWrapper>
  );
}
