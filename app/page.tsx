import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CategoryGrid } from "@/components/catalogue/CategoryGrid";
import { CATEGORIES, getCatalogByCategory } from "@/data/catalog";
import { DecodeText } from "@/components/DecodeText";
import GameIcon from "@/components/GameIcon";

export default function HomePage() {
  return (
    <PageWrapper maxWidth="4xl" decor={["flower", "brain"]}>
      <header className="mb-10 text-center">
        <GameIcon name="sparkles" size={48} className="mx-auto mb-4 text-blue" />
        <h1 className="font-heading text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
          <DecodeText>Comme des Fous</DecodeText>
        </h1>
        <p className="mt-3 text-sm uppercase tracking-wide text-blue">
          Boîte à outils du rétablissement
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base">
          Des outils d&apos;auto-observation et de soutien, gratuits et sans compte. Vos
          réponses restent dans votre navigateur, le temps de la session, et ne sont jamais
          envoyées sur Internet. Ces outils ne posent aucun diagnostic.
        </p>
      </header>

      {CATEGORIES.map((cat) => {
        const entries = getCatalogByCategory(cat.key);
        return (
          <section key={cat.key} className="mb-12">
            <div className="mb-2 flex items-center gap-2">
              <GameIcon
                name={cat.iconName}
                size={28}
                className={
                  cat.accent === "yellow"
                    ? "text-black"
                    : cat.accent === "red"
                      ? "text-red"
                      : "text-blue"
                }
              />
              <h2 className="text-2xl font-black uppercase">
                <Link href={`/categories/${cat.key}`} className="hover:text-blue">
                  {cat.label}
                </Link>
              </h2>
            </div>
            <p className="mb-4 text-sm text-black/70">{cat.description}</p>
            <CategoryGrid entries={entries} />
          </section>
        );
      })}
    </PageWrapper>
  );
}
