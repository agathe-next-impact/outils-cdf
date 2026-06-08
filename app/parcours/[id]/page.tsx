import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BentoGrid, BentoBox } from "@/components/layout/Bento";
import { PathwayView } from "@/components/pathways/PathwayView";
import { allPathwayIds, getPathway, resolvePathway } from "@/data/pathways";
import GameIcon from "@/components/GameIcon";
import { FOCUS_RING } from "@/lib/a11y";

interface Params {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allPathwayIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = getPathway(id);
  if (!p) return {};
  return { title: `Parcours : ${p.goal}`, description: p.pitch };
}

export default async function PathwayPage({ params }: Params) {
  const { id } = await params;
  const resolved = resolvePathway(id);
  if (!resolved) notFound();

  return (
    <PageWrapper maxWidth="full">
      <Link
        href="/"
        className={`inline-flex items-center gap-1 text-sm text-info hover:underline ${FOCUS_RING}`}
      >
        <GameIcon name="arrow-left" size={16} /> Accueil
      </Link>

      <BentoGrid className="mb-4">
        <BentoBox as="header" span={3} className="mt-3">
          <div className="flex items-center gap-3 border border-border border-l-[3px] border-l-accent bg-surface-2 px-5 py-4">
            <GameIcon
              name={resolved.iconName}
              size={40}
              className="text-accent"
              aria-hidden
            />
            <div>
              <p className="eyebrow">Parcours</p>
              <h1 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl">
                {resolved.goal}
              </h1>
            </div>
          </div>
          <p className="mt-3 text-base text-muted">{resolved.pitch}</p>
          <p className="mt-1 text-sm text-muted">
            Les étapes sont suggérées : piochez dans l&apos;ordre que vous voulez, passez ce qui ne
            vous parle pas, et avancez à votre rythme.
          </p>
        </BentoBox>
      </BentoGrid>

      <PathwayView
        id={resolved.id}
        goal={resolved.goal}
        steps={resolved.steps}
        accent={resolved.accent}
      />
    </PageWrapper>
  );
}
