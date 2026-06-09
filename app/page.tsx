import Link from "next/link";
import { PrivateCatalogSearch } from "@/components/home/PrivateCatalogSearch";
import { StartPathwayCards } from "@/components/pathways/StartPathwayCards";
import { getCatalog } from "@/data/catalog";
import GameIcon from "@/components/GameIcon";
import { Logo } from "@/components/Logo";
import { FOCUS_RING } from "@/lib/a11y";
import { CONTRIBUTION, SITE } from "@/config/site";
import { Halo } from "@/components/layout/Halo";

// Les 3 gestes : trouver / choisir / garder (icônes lucide via GameIcon).
const STEPS: { icon: string; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Trouver",
    text: "Cherche un outil, ou ouvre le catalogue complet — à ta façon.",
  },
  {
    icon: "compass",
    title: "Choisir",
    text: "Suis un parcours, ou avance à ta main — pas à pas, sans pression.",
  },
  {
    icon: "download",
    title: "Garder",
    text: "Exporte une trace si tu veux la conserver — sinon, rien n'est gardé.",
  },
];

// Les 3 moteurs (scored / wizard / worksheet) traduits côté usager, sans jargon.
// Cartes explicatives, non cliquables ; la 2e (Parcours) est mise en avant (teal plein).
const WAYS: {
  cat: "questionnaires" | "parcours" | "carnets";
  badge: string;
  title: string;
  text: string;
  tag: string;
}[] = [
  {
    cat: "questionnaires",
    badge: "Questionnaires",
    title: "Faire le point",
    text: "Des échelles et inventaires pour observer un ressenti, à un instant donné.",
    tag: "échelles · inventaires",
  },
  {
    cat: "parcours",
    badge: "Parcours",
    title: "Avancer pas à pas",
    text: "Une suite d'étapes qui avancent à ton rythme, sans ordre imposé.",
    tag: "pas à pas · sans pression",
  },
  {
    cat: "carnets",
    badge: "Carnets",
    title: "Écrire & garder",
    text: "Des espaces pour noter, formuler et garder le fil entre deux moments.",
    tag: "noter · relier",
  },
];

export default function HomePage() {
  const catalog = getCatalog();

  return (
    <main
      id="contenu"
      tabIndex={-1}
      className="home-lg min-h-[calc(100vh-80px)] focus:outline-none"
    >
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <Halo color="myrtille" size={420} delay={0} style={{ right: -160, top: -120, opacity: 0.22 }} />
        <Halo color="framboise" size={340} delay={-9} duration={22} style={{ left: -140, bottom: -150, opacity: 0.2 }} />
        <div className="wrap hero-grid">
          <div>
            <span className="pill" style={{ marginBottom: 22 }}>
              <span className="dot" aria-hidden /> gratuit · sans compte · tout reste local
            </span>
            <h1 className="display">
              Avance à ton rythme,
              <br />
              <span className="hl">en confiance.</span>
            </h1>
            <p className="lede">
              Des outils d&apos;auto-observation et de soutien au rétablissement. Choisis un
              outil directement, ou avance pas à pas — sans obligation, sans jugement.{" "}
              <strong>Ces ressources sont à toi. Et en toi.</strong>
            </p>
            <div className="hero-ctas">
              <Link href="/outils" className={`btn-primary ${FOCUS_RING}`}>
                Trouver un outil <GameIcon name="arrow-right" size={15} aria-hidden />
              </Link>
              <Link href="/parcours" className={`btn-ghost ${FOCUS_RING}`}>
                Avancer pas à pas
              </Link>
            </div>
            <div className="hero-fine">
              <span>aucun compte</span>
              <span aria-hidden>·</span>
              <span>aucune donnée envoyée</span>
              <span aria-hidden>·</span>
              <span>rien à installer</span>
            </div>
          </div>

          {/* Recherche rapide — vraie recherche locale (sessionStorage, aucun réseau) */}
          <div className="preview">
            <div className="preview-head">
              <span className="ph-brand">
                <Logo size={18} showWordmark={false} /> Recherche rapide
              </span>
              <span className="mono">local · session</span>
            </div>
            <div className="search-card">
              <PrivateCatalogSearch
                entries={catalog}
                quickKeywords={["triggers", "anxiété", "ressources", "sommeil"]}
              />
              <p className="local-note">
                <GameIcon name="lock" size={13} aria-hidden />
                Un mot-clé, un thème, une situation : tout reste sur ton appareil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── PAR OÙ COMMENCER ───────── */}
      <section className="band band-lav" id="parcours">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Point de départ</span>
            <h2>Par où commencer&nbsp;?</h2>
            <p>
              Deux portes d&apos;entrée possibles, sans obligation : tu peux aussi explorer
              librement.
            </p>
          </div>
          <div className="entries">
            <StartPathwayCards variant="entry" />
          </div>
          <div className="entry-note">
            <span>
              Tu préfères choisir autrement&nbsp;? Les parcours restent disponibles par objectif,
              sans ordre imposé.
            </span>
            <Link href="/parcours" className={`btn-secondary ${FOCUS_RING}`}>
              Voir tous les parcours
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── TROIS GESTES ───────── */}
      <section className="band">
        <Halo color="myrtille" size={380} delay={-11} duration={21} style={{ right: -140, top: -50 }} />
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Mode d&apos;emploi</span>
            <h2>Trois gestes pour t&apos;y retrouver</h2>
          </div>
          <div className="home-steps">
            {STEPS.map((s, i) => (
              <div key={s.title} className="hstep">
                <span className="snum">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="ic">
                  <GameIcon name={s.icon} size={34} aria-hidden />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── LES OUTILS ───────── */}
      <section className="band band-peach" id="outils">
        <Halo color="framboise" size={420} delay={-7} duration={24} style={{ right: -160, bottom: -90 }} />
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Les outils</span>
            <h2>Trois façons d&apos;avancer</h2>
            <p>
              Selon le moment, un outil te propose de t&apos;observer, d&apos;avancer pas à pas, ou
              d&apos;écrire.
            </p>
          </div>
          <div className="home-ways">
            {WAYS.map((w, i) => (
              <div
                key={w.badge}
                data-cat={w.cat}
                className={`way ${i === 1 ? "way-fill" : "way-soft"}`}
              >
                <span className="wbadge">{w.badge}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className="tagm">{w.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SOUTENIR ───────── */}
      <section className="band" id="soutenir">
        <div className="wrap">
          <div className="support-card">
            <span
              className="blob"
              aria-hidden
              style={{ right: -70, top: -70, width: 240, height: 240, background: "var(--tile-rose)", opacity: 0.34 }}
            />
            <span
              className="blob"
              aria-hidden
              style={{ left: -50, bottom: -70, width: 200, height: 200, background: "var(--tile-peach)", opacity: 0.3 }}
            />
            <div>
              <span className="eyebrow">Faire évoluer le projet</span>
              <h2 style={{ marginTop: 16 }}>Aide {SITE.name} à grandir.</h2>
              <p>
                Pour maintenir ce projet gratuit, et le faire évoluer vers un espace personnel et
                de nouvelles fonctionnalités, ton soutien est précieux.
              </p>
            </div>
            <div className="support-actions">
              <Link href="/contribuer" className={`btn-cream ${FOCUS_RING}`}>
                <GameIcon name="heart" size={15} aria-hidden /> Soutenir le projet
              </Link>
              <a href={CONTRIBUTION.suggestionUrl} className={`btn-outline-cream ${FOCUS_RING}`}>
                <GameIcon name="lightbulb" size={15} aria-hidden /> Proposer une idée
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
