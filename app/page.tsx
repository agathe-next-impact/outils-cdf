import { PageWrapper } from "@/components/layout/PageWrapper";
import { CatalogExplorer } from "@/components/catalogue/CatalogExplorer";
import { PathwayCards } from "@/components/pathways/PathwayCards";
import { CATEGORIES, getCatalog } from "@/data/catalog";
import { getPathwaySummaries } from "@/data/pathways";
import { DecodeText } from "@/components/DecodeText";
import GameIcon from "@/components/GameIcon";

const STEPS: { icon: string; title: string; text: string }[] = [
  {
    icon: "compass",
    title: "Choisir",
    text: "Parcourez les outils et ouvrez celui qui vous parle. Aucun compte, aucune inscription.",
  },
  {
    icon: "pen-line",
    title: "Remplir",
    text: "Avancez à votre rythme. Vous pouvez passer une question, vous arrêter, et reprendre.",
  },
  {
    icon: "download",
    title: "Exporter",
    text: "Gardez une trace si vous le souhaitez (PDF, Markdown, JSON). Rien n'est envoyé sur Internet.",
  },
];

export default function HomePage() {
  const catalog = getCatalog();
  const pathways = getPathwaySummaries();

  return (
    <PageWrapper maxWidth="4xl">
      {/* Hero color-blocké */}
      <section className="relative mb-10 overflow-hidden bg-blue px-6 py-12 text-center text-white">
        <span aria-hidden className="pointer-events-none absolute -left-5 -top-5 h-20 w-20 bg-yellow" />
        <span aria-hidden className="pointer-events-none absolute -right-4 bottom-6 h-12 w-12 bg-red" />
        <div className="relative">
          <GameIcon name="sparkles" size={48} className="mx-auto mb-4 text-white" />
          <h1 className="font-heading text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            <DecodeText>Comme des Fous</DecodeText>
          </h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-wide text-white/90">
            Boîte à outils du rétablissement
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
            Des outils d&apos;auto-observation et de soutien, gratuits et sans compte. Vos
            réponses restent dans votre navigateur, le temps de la session, et ne sont jamais
            envoyées sur Internet. Ces outils ne posent aucun diagnostic.
          </p>
        </div>
      </section>

      {/* Par où commencer ? — parcours par objectif */}
      <section className="mb-12" aria-label="Par où commencer">
        <h2 className="mb-1 text-2xl font-black uppercase tracking-tight">Par où commencer&nbsp;?</h2>
        <p className="mb-4 text-sm text-black/70">
          Choisissez ce qui vous parle en ce moment — chaque parcours enchaîne quelques outils qui
          se complètent, à votre rythme.
        </p>
        <PathwayCards pathways={pathways} />
      </section>

      {/* Comment ça marche */}
      <section className="mb-12" aria-label="Comment ça marche">
        <h2 className="mb-4 text-center text-2xl font-black uppercase tracking-tight">
          Comment ça marche
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="card flex items-start gap-3 border border-black animate-slide-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="font-heading text-3xl font-black leading-none text-blue">
                {i + 1}
              </span>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <GameIcon name={s.icon} size={20} className="text-blue" aria-hidden />
                  <h3 className="text-lg font-black uppercase leading-none">{s.title}</h3>
                </div>
                <p className="text-sm text-black/70">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explorer les outils */}
      <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">Tous les outils</h2>
      <CatalogExplorer entries={catalog} categories={CATEGORIES} />
    </PageWrapper>
  );
}
