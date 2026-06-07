import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PathwayView } from "@/components/pathways/PathwayView";
import { CrisisResources } from "@/components/safety/CrisisResources";
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

  const band =
    resolved.accent === "yellow"
      ? "bg-yellow text-black"
      : resolved.accent === "red"
        ? "bg-red text-white"
        : "bg-blue text-white";
  const onYellow = resolved.accent === "yellow";

  return (
    <PageWrapper maxWidth="2xl">
      <Link
        href="/"
        className={`inline-flex items-center gap-1 text-sm text-blue hover:underline ${FOCUS_RING}`}
      >
        <GameIcon name="arrow-left" size={16} /> Accueil
      </Link>

      <header className="mb-4 mt-3">
        <div className={`flex items-center gap-3 px-5 py-4 ${band}`}>
          <GameIcon
            name={resolved.iconName}
            size={40}
            className={onYellow ? "text-black" : "text-white"}
            aria-hidden
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide opacity-90">Parcours</p>
            <h1 className="font-heading text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
              {resolved.goal}
            </h1>
          </div>
        </div>
        <p className="mt-3 text-base text-black/70">{resolved.pitch}</p>
        <p className="mt-1 text-sm text-black/60">
          Les étapes sont suggérées : piochez dans l&apos;ordre que vous voulez, passez ce qui ne
          vous parle pas, et avancez à votre rythme.
        </p>
      </header>

      <PathwayView
        id={resolved.id}
        goal={resolved.goal}
        steps={resolved.steps}
        accent={resolved.accent}
      />

      <CrisisResources level="standard" className="mt-8" />
    </PageWrapper>
  );
}
