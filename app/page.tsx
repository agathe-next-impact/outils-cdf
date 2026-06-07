import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox, bentoSpan } from "@/components/layout/Bento";
import { SessionPanel } from "@/components/home/SessionPanel";
import { CatalogExplorer } from "@/components/catalogue/CatalogExplorer";
import { PathwayCards } from "@/components/pathways/PathwayCards";
import { CATEGORIES, getCatalog } from "@/data/catalog";
import { getPathwaySummaries } from "@/data/pathways";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { SITE } from "@/config/site";

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
  // Liste légère (sérialisable, sans le registre) pour la tuile de session client.
  const sessionTools = catalog
    .filter((e) => e.available)
    .map((e) => ({ slug: e.slug, title: e.shortTitle ?? e.title, iconName: e.iconName }));

  return (
    <PageWrapper maxWidth="4xl">
      {/* ===== Tableau de bord : identité · confidentialité · session · urgence · repères ===== */}
      <BentoGrid className="mb-4">
        {/* Identité + actions */}
        <BentoBox as="section" span={2} aria-label="Présentation" className="flex flex-col justify-center">
          <div className="mb-3">
            <Logo size={44} showWordmark={false} />
          </div>
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {SITE.name}
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-muted">
            Boîte à outils du rétablissement
          </p>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Des outils d&apos;auto-observation et de soutien, gratuits et sans compte. Ces outils ne
            posent aucun diagnostic.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="#tous-les-outils" className="btn-primary inline-flex items-center">
              Découvrir les outils
            </Link>
            <Link href="#parcours" className="btn-secondary inline-flex items-center">
              Par où commencer
            </Link>
          </div>
        </BentoBox>

        {/* Confidentialité */}
        <BentoBox tone="soft" index={1} className="flex flex-col justify-center">
          <GameIcon name="shield-check" size={28} className="mb-2 text-accent" aria-hidden />
          <h2 className="text-lg font-semibold leading-snug">Sans compte, rien n&apos;est envoyé</h2>
          <p className="mt-2 text-sm text-muted">
            Vos réponses restent dans votre navigateur, le temps de la session, et ne sont jamais
            envoyées sur Internet.
          </p>
        </BentoBox>

        {/* Session en cours (île client, sessionStorage) */}
        <SessionPanel tools={sessionTools} span={2} index={2} />

        {/* Aide immédiate */}
        <BentoBox as="section" index={3} aria-label="Aide immédiate" className="border-danger">
          <GameIcon name="phone-call" size={24} className="mb-2 text-danger" aria-hidden />
          <h2 className="text-lg font-semibold leading-snug">Besoin d&apos;aide tout de suite&nbsp;?</h2>
          <p className="mt-2 text-sm text-muted">
            En cas d&apos;urgence&nbsp;:{" "}
            <strong className="font-semibold text-foreground">3114</strong> (24h/24), 15 ou 112.
          </p>
          <Link
            href="/ressources"
            className={`mt-3 inline-flex items-center gap-1 text-sm font-medium text-info hover:underline ${FOCUS_RING}`}
          >
            <GameIcon name="arrow-right" size={16} aria-hidden /> Toutes les ressources
          </Link>
        </BentoBox>

        {/* Repères chiffrés (catalogue public, jamais personnel) */}
        <BentoBox index={4} className="flex flex-col items-center justify-center text-center">
          <span className="font-heading text-4xl font-semibold leading-none text-accent">
            {catalog.length}
          </span>
          <span className="mt-1 text-sm text-muted">outils au catalogue</span>
        </BentoBox>
        <BentoBox index={5} className="flex flex-col items-center justify-center text-center">
          <span className="font-heading text-4xl font-semibold leading-none text-accent">
            {pathways.length}
          </span>
          <span className="mt-1 text-sm text-muted">parcours guidés</span>
        </BentoBox>
        <BentoBox index={6} className="flex flex-col items-center justify-center text-center">
          <span className="font-heading text-4xl font-semibold leading-none text-accent">
            {CATEGORIES.length}
          </span>
          <span className="mt-1 text-sm text-muted">catégories</span>
        </BentoBox>
      </BentoGrid>

      {/* ===== Explorer par type ===== */}
      <h2 className="mb-3 mt-10 text-2xl font-semibold tracking-tight">Explorer par type</h2>
      <BentoGrid className="mb-4">
        {CATEGORIES.map((cat, i) => {
          const n = catalog.filter((e) => e.category === cat.key).length;
          return (
            <Link
              key={cat.key}
              href={`/categories/${cat.key}`}
              className={`card animate-slide-up flex flex-col gap-2 ${bentoSpan(1)} ${FOCUS_RING}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <GameIcon name={cat.iconName} size={28} className="text-accent" aria-hidden />
              <h3 className="text-lg font-semibold leading-snug">{cat.label}</h3>
              <p className="text-sm text-muted">{cat.description}</p>
              <span className="mt-auto pt-2 text-xs font-medium text-muted">
                {n} outil{n > 1 ? "s" : ""}
              </span>
            </Link>
          );
        })}
      </BentoGrid>

      {/* ===== Par où commencer ===== */}
      <h2 id="parcours" className="mb-1 mt-10 text-2xl font-semibold tracking-tight">
        Par où commencer&nbsp;?
      </h2>
      <p className="mb-4 text-sm text-muted">
        Chaque parcours enchaîne quelques outils qui se complètent, à votre rythme.
      </p>
      <PathwayCards pathways={pathways} />

      {/* ===== Comment ça marche ===== */}
      <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight">Comment ça marche</h2>
      <BentoGrid className="mb-4">
        {STEPS.map((s, i) => (
          <BentoBox key={s.title} index={i} className="flex items-start gap-3">
            <span className="font-heading text-3xl font-semibold leading-none text-accent">
              {i + 1}
            </span>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <GameIcon name={s.icon} size={20} className="text-accent" aria-hidden />
                <h3 className="text-lg font-semibold leading-none">{s.title}</h3>
              </div>
              <p className="text-sm text-muted">{s.text}</p>
            </div>
          </BentoBox>
        ))}
      </BentoGrid>

      {/* ===== Tous les outils ===== */}
      <h2 id="tous-les-outils" className="mb-4 mt-10 text-2xl font-semibold tracking-tight">
        Tous les outils
      </h2>
      <CatalogExplorer entries={catalog} categories={CATEGORIES} />
    </PageWrapper>
  );
}
