import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDefinition, allSlugs } from "@/engines/registry";
import { getCatalog } from "@/data/catalog";
import { ToolHost } from "@/engines/ToolHost";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ContentRenderer } from "@/components/content/ContentRenderer";
import { ToolSafetyNote } from "@/components/safety/ToolSafetyNote";
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

  return (
    <PageWrapper maxWidth="full">
      <Link href="/outils" className={`inline-flex items-center gap-1 text-sm text-info hover:underline ${FOCUS_RING}`}>
        <GameIcon name="arrow-left" size={16} /> Tous les outils
      </Link>

      <header className="mb-5 mt-5">
        <div className="mb-3 flex items-start gap-3 max-w-5xl">
          <GameIcon name={entry.iconName} size={32} className="mt-1 shrink-0 text-accent" />
          <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
            {entry.title}
          </h1>
        </div>
        {definition ? (
          <ContentRenderer blocks={definition.intro} className="tool-intro" />
        ) : null}
        <p className="source-credit">
          <span>Source&nbsp;:</span> {entry.sourceCredit}
          {entry.estimatedMinutes ? ` · ≈ ${entry.estimatedMinutes} min` : ""}
        </p>
      </header>

      <ToolSafetyNote disclaimerKey={entry.disclaimerKey} className="mb-6" />

      {definition ? (
        <ToolHost definition={definition} />
      ) : (
        <section className="box">
          <div className="mb-2 flex items-center gap-2">
            <GameIcon name="timer" size={24} className="text-accent" />
            <h2 className="text-lg">Bientôt disponible</h2>
          </div>
          <p className="text-base">
            Cet outil est en cours de réalisation. Revenez prochainement&nbsp;!
          </p>
        </section>
      )}
    </PageWrapper>
  );
}
