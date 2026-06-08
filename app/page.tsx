import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PrivateCatalogSearch } from "@/components/home/PrivateCatalogSearch";
import { StartPathwayCards } from "@/components/pathways/StartPathwayCards";
import { getCatalog } from "@/data/catalog";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { CONTRIBUTION, SITE } from "@/config/site";

const STEPS: { icon: string; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Trouver",
    text: "Cherchez un outil ou ouvrez le catalogue complet.",
  },
  {
    icon: "compass",
    title: "Choisir",
    text: "Suivez un parcours si vous préférez être guidé.",
  },
  {
    icon: "download",
    title: "Garder",
    text: "Exportez une trace si vous souhaitez la conserver.",
  },
];

const STEP_SPAN = ["c4", "c4", "c4"];

// Les 3 moteurs (scored / wizard / worksheet) traduits côté usager : aide à
// savoir ce qu'on va rencontrer, sans jargon. Cartes explicatives, non cliquables.
const WAYS: { icon: string; title: string; text: string }[] = [
  {
    icon: "list-checks",
    title: "Questionnaires",
    text: "Des échelles et inventaires pour faire le point sur un ressenti, à un instant donné.",
  },
  {
    icon: "compass",
    title: "Parcours",
    text: "Une suite d'étapes courtes qui avancent à votre rythme, sans ordre imposé.",
  },
  {
    icon: "notebook-pen",
    title: "Carnets",
    text: "Des espaces pour noter, formuler et garder le fil entre deux moments.",
  },
];

export default function HomePage() {
  const catalog = getCatalog();

  return (
    <PageWrapper maxWidth="full">
      <section className="bento">
        <div className="box box--fill c8 r2">
          <Logo size={40} showWordmark={false} />
          <span className="tagline" style={{ marginTop: 22 }}>
            Boîte à outils du rétablissement
          </span>
          <h1>{SITE.name}</h1>
          <p className="desc">
            Des outils d&apos;auto-observation et de soutien, gratuits et sans compte. Choisissez
            un outil directement, ou laissez-vous guider à votre rythme.
          </p>
          <div className="hero-cta">
            <Link href="/outils" className={`btn-primary ${FOCUS_RING}`}>
              Trouver un outil <GameIcon name="arrow-right" size={15} aria-hidden />
            </Link>
            <Link href="/parcours" className={`btn-ghost ${FOCUS_RING}`}>
              Me laisser guider
            </Link>
          </div>
        </div>

        <div className="box c4">
          <div className="ichip">
            <GameIcon name="search" size={20} aria-hidden />
          </div>
          <h3 style={{ fontSize: 21, marginTop: 14 }}>Recherche rapide</h3>
          <p className="body">Un mot-clé, un thème, une situation : tout reste local.</p>
          <PrivateCatalogSearch entries={catalog} />
        </div>

        <div className="box box--soft hero-suggest-box c4">
          <h3 style={{ fontSize: 21, marginBottom: 12 }}>Faire évoluer Peer to Peer</h3>
          <p className="body" style={{ maxWidth: "82ch" }}>
            Pour maintenir ce projet gratuit, et le faire évoluer vers un espace personnel et des fonctionnalités nouvelles, votre soutien est précieux. 
          </p>
          <div className="hero-cta">
            <Link href="/contribuer" className={`btn-primary ${FOCUS_RING}`}>
              <GameIcon name="heart" size={15} aria-hidden />
              Soutenir
            </Link>
            <a href={CONTRIBUTION.suggestionUrl} className={`btn-secondary ${FOCUS_RING}`}>
              <GameIcon name="lightbulb" size={15} aria-hidden />
              Proposer
            </a>
          </div>
        </div>
      </section>

      <div className="section-head" id="parcours">
        <span className="eyebrow">Point de départ</span>
        <h2>Par où commencer&nbsp;?</h2>
        <span className="sub">
          Deux portes d&apos;entrée possibles, sans obligation : vous pouvez aussi explorer librement.
        </span>
      </div>
      <section className="bento">
        <StartPathwayCards />
        <div className="box box--tint c12">
          <p className="body">
            Vous préférez choisir autrement&nbsp;? Les parcours restent disponibles par objectif,
            sans ordre imposé.
          </p>
          <Link href="/parcours" className={`tlink ${FOCUS_RING}`} style={{ marginTop: 12 }}>
            Voir tous les parcours <GameIcon name="arrow-right" size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <div className="section-head home-accent home-accent--blue">
        <span className="eyebrow">Mode d&apos;emploi</span>
        <h2>Trois gestes simples</h2>
      </div>
      <section className="bento home-accent home-accent--blue">
        {STEPS.map((s, i) => (
          <div key={s.title} className={`box home-accent-box ${STEP_SPAN[i] ?? "c4"}`}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ fontSize: 21, marginTop: 6 }}>{s.title}</h3>
            <p className="body">{s.text}</p>
          </div>
        ))}
      </section>

      <div className="section-head home-accent home-accent--sage">
        <span className="eyebrow">Les outils</span>
        <h2>Trois façons d&apos;avancer</h2>
        <span className="sub">
          Selon le moment, un outil vous propose de vous observer, d&apos;être guidé, ou d&apos;écrire.
        </span>
      </div>
      <section className="bento home-accent home-accent--sage">
        {WAYS.map((w) => (
          <div key={w.title} className="box home-accent-box c4">
            <div className="ichip">
              <GameIcon name={w.icon} size={20} aria-hidden />
            </div>
            <h3 style={{ fontSize: 21, marginTop: 14 }}>{w.title}</h3>
            <p className="body">{w.text}</p>
          </div>
        ))}
      </section>
    </PageWrapper>
  );
}
