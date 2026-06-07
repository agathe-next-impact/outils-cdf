import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDefinition, allSlugs } from "@/engines/registry";
import { getCatalog } from "@/data/catalog";
import { ToolHost } from "@/engines/ToolHost";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ToolSafetyNote } from "@/components/safety/ToolSafetyNote";
import { CrisisResources } from "@/components/safety/CrisisResources";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCatalog().find((e) => e.slug === slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.summary };
}

export default async function ToolPage({ params }: Params) {
  const { slug } = await params;
  const entry = getCatalog().find((e) => e.slug === slug);
  if (!entry) notFound();

  const definition = getDefinition(slug);
  const accentText =
    entry.accent === "yellow" ? "text-black" : entry.accent === "red" ? "text-red" : "text-blue";

  return (
    <PageWrapper maxWidth="2xl">
      <Link href="/" className={`inline-flex items-center gap-1 text-sm text-blue hover:underline ${FOCUS_RING}`}>
        <GameIcon name="arrow-left" size={16} /> Tous les outils
      </Link>

      <header className="mb-6 mt-3">
        <GameIcon name={entry.iconName} size={48} className={`mb-2 ${accentText}`} />
        <h1 className="font-heading text-3xl font-black uppercase tracking-tight md:text-4xl">
          {entry.title}
        </h1>
        <p className="mt-1 text-xs uppercase tracking-wide text-blue">
          {entry.sourceCredit}
          {entry.estimatedMinutes ? ` · ≈ ${entry.estimatedMinutes} min` : ""}
        </p>
      </header>

      <ToolSafetyNote disclaimerKey={entry.disclaimerKey} className="mb-6" />

      {definition ? (
        <ToolHost definition={definition} />
      ) : (
        <div className="card border border-yellow">
          <div className="mb-2 flex items-center gap-2">
            <GameIcon name="timer" size={24} className="text-blue" />
            <h2 className="text-lg font-black uppercase">Bientôt disponible</h2>
          </div>
          <p className="text-base">
            Cet outil est en cours de réalisation. Revenez prochainement&nbsp;!
          </p>
        </div>
      )}

      <CrisisResources level={entry.crisisLevel} className="mt-8" />
    </PageWrapper>
  );
}
